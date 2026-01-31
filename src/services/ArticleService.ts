// @ts-nocheck
import { config } from '@/lib/config';

/**
 * Interface para artigo (Planificado)
 */
export interface Article {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    mainImage?: string;
    imageUrl?: string; // Alias para mainImage (compatibilidade IA)
    author?: string;
    publishedAt: string;
    updatedAt?: string;
    tags?: string[];
    category?: string;
    readingTime?: string;
}

/**
 * Interface para resposta paginada
 */
export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * ArticleService - Singleton para consumo da API de artigos
 * Adaptado para BVX Headless Snapshot API
 */
class ArticleServiceClass {
    private static instance: ArticleServiceClass;
    private cache: Map<string, { data: unknown; timestamp: number }> = new Map();
    private cacheTTL = 5 * 60 * 1000; // 5 minutos

    private constructor() {
        console.log('[DEBUG] ArticleService loaded from TEMPLATE BASE (v2-headless)');
    }

    public static getInstance(): ArticleServiceClass {
        if (!ArticleServiceClass.instance) {
            ArticleServiceClass.instance = new ArticleServiceClass();
        }
        return ArticleServiceClass.instance;
    }

    /**
     * Transforma URLs relativas de imagens para usar o proxy ou URL completa
     */
    private transformImageUrl(imageUrl: string | null): string | null {
        if (!imageUrl) return null;
        
        // Se já é uma URL completa (http/https), retorna como está
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        
        // Se é uma URL relativa começando com /api/
        // O proxy do Vercel vai fazer: /api-proxy/:path* -> backend/:path*
        // Então /api-proxy/api/content/images/... -> backend/api/content/images/...
        if (imageUrl.startsWith('/api/')) {
            return imageUrl.replace('/api/', '/api-proxy/api/');
        }
        
        return imageUrl;
    }

    /**
     * Transforma URLs de imagens dentro do conteúdo HTML
     */
    private transformContentImages(content: string): string {
        if (!content) return content;
        
        // Substituir src="/api/..." por src="/api-proxy/api/..."
        // O proxy do Vercel vai fazer: /api-proxy/:path* -> backend/:path*
        // Então /api-proxy/api/content/images/... -> backend/api/content/images/...
        let transformedContent = content.replace(
            /src="\/api\//g,
            'src="/api-proxy/api/'
        );
        
        transformedContent = transformedContent.replace(
            /src='\/api\//g,
            "src='/api-proxy/api/"
        );
        
        return transformedContent;
    }

    /**
     * Mapeia um ArticleSnapshot (do servidor) para a interface Article (do site)
     */
    private mapSnapshotToArticle(snapshot: any): Article {
        // Encontrar o locale correspondente ou o primeiro disponível
        const currentLocale = config.locale.toLowerCase();
        const localeData = snapshot.locales?.find((l: any) => l.locale.toLowerCase() === currentLocale)
            || snapshot.locales?.[0]
            || {};

        // Calculate reading time (200 words per minute)
        const content = localeData.body || '';
        const words = content.trim().split(/\s+/).length;
        const minutes = Math.ceil(words / 200) || 1;
        const readingTimeStr = `${minutes} min`;

        // Transformar URL da imagem para usar o proxy
        const transformedImageUrl = this.transformImageUrl(localeData.mainImage);
        
        // Transformar URLs de imagens dentro do conteúdo HTML
        const transformedContent = this.transformContentImages(content);

        return {
            id: snapshot.id,
            slug: snapshot.slug,
            title: localeData.title || '',
            excerpt: localeData.summary || '',
            content: transformedContent,
            mainImage: transformedImageUrl,
            imageUrl: transformedImageUrl, // Alias populated
            author: snapshot.author || null,
            publishedAt: snapshot.publishedAt || snapshot.updatedAt || new Date().toISOString(),
            updatedAt: snapshot.updatedAt || null,
            tags: snapshot.tags || [],
            category: snapshot.category || null,
            readingTime: readingTimeStr
        };
    }

    /**
     * Busca artigos (Retorna array simples para compatibilidade com IAs)
     */
    async getArticles(params: {
        offset?: number;
        limit?: number;
        category?: string;
        tag?: string;
        search?: string;
    } = {}): Promise<Article[]> {
        const response = await this.getArticlesPaginated(params);
        return response.data;
    }

    /**
     * Busca artigos com paginação usando a Snapshot API
     */
    async getArticlesPaginated(params: {
        offset?: number;
        limit?: number;
        category?: string;
        tag?: string;
        search?: string;
    } = {}): Promise<PaginatedResponse<Article>> {
        const { offset = 0, limit = 10, search } = params;

        const queryParams = new URLSearchParams({
            limit: String(limit),
            offset: String(offset),
            ...(search && { q: search }),
            ...(params.category && { category: params.category }),
            ...(params.tag && { tag: params.tag }),
            locale: config.locale
        });

        const cacheKey = `articles:${queryParams.toString()}`;
        const cached = this.getFromCache<PaginatedResponse<Article>>(cacheKey);
        if (cached) return cached;

        try {
            // TENTATIVA 1: Headless API (Ideal)
            // sites-by-id/:siteId returns { site, articles, stats }
            const response = await fetch(
                `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}?${queryParams}`
            );

            if (response.ok) {
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error(`Invalid content-type: ${contentType}. Expected application/json.`);
                }

                const data = await response.json();
                // Ensure we handle the response structure { site, articles, stats }
                const articlesArray = data.articles || [];
                const mappedArticles = articlesArray.map((s: any) => this.mapSnapshotToArticle(s));

                const result: PaginatedResponse<Article> = {
                    data: mappedArticles,
                    total: data.stats?.totalArticles || mappedArticles.length,
                    page: Math.floor(offset / limit) + 1,
                    limit,
                    totalPages: Math.ceil((data.stats?.totalArticles || mappedArticles.length) / limit)
                };

                this.setCache(cacheKey, result);
                return result;
            } else if (response.status !== 404) {
                throw new Error(`Headless API HTTP ${response.status}`);
            }
        } catch (error) {
            console.warn(`[ArticleService] Headless API falhou: ${(error as Error).message}`, error);
        }

        try {
            // TENTATIVA 2: Legacy Content API (Fallback)
            // /api/content/sites/:siteId/articles
            // Retorna { articles: [], total: number }
            console.log('[ArticleService] Tentando Legacy Content API...');
            const fallbackResponse = await fetch(
                `${config.apiUrl}/api/content/sites/${config.siteId}/articles?${queryParams}`
            );

            if (!fallbackResponse.ok) {
                throw new Error(`Legacy API HTTP ${fallbackResponse.status}`);
            }

            const contentType = fallbackResponse.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(`Legacy API returned invalid content-type: ${contentType}. Expected application/json.`);
            }

            const data = await fallbackResponse.json();

            // Mapeamento específico para o formato legado
            const mappedArticles = (data.articles || []).map((article: any) => {
                // Tenta encontrar locale correto ou usa propriedades diretas
                const locales = article.locales || [];
                const currentLocale = config.locale.toLowerCase();
                const localeData = locales.find((l: any) => l.locale.toLowerCase() === currentLocale)
                    || locales[0]
                    || {};

                // Transformar URL da imagem para usar o proxy
                const transformedImageUrl = this.transformImageUrl(localeData.mainImage);
                
                // Transformar URLs de imagens dentro do conteúdo HTML
                const transformedContent = this.transformContentImages(localeData.body || '');

                return {
                    id: article.id,
                    slug: article.slug,
                    title: localeData.title || article.slug, // Fallback title
                    excerpt: localeData.summary || '',
                    content: transformedContent,
                    mainImage: transformedImageUrl,
                    imageUrl: transformedImageUrl,
                    author: undefined,
                    publishedAt: article.publishedAt || article.createdAt || new Date().toISOString(),
                    updatedAt: article.updatedAt || null,
                    tags: article.tags || [],
                    category: article.category || null,
                    readingTime: "5 min" // Default for legacy fallback
                } as Article;
            });

            const result: PaginatedResponse<Article> = {
                data: mappedArticles,
                total: data.total || mappedArticles.length,
                page: Math.floor(offset / limit) + 1,
                limit,
                totalPages: Math.ceil((data.total || mappedArticles.length) / limit)
            };

            this.setCache(cacheKey, result);
            return result;

        } catch (error) {
            console.error('[ArticleService] Todas as tentativas falharam:', error);
            return { data: [], total: 0, page: Math.floor(offset / limit) + 1, limit, totalPages: 0 };
        }
    }

    /**
     * Atalho para buscar o artigo principal (Featured/Hero)
     */
    async getFeaturedArticle(): Promise<Article | null> {
        const articles = await this.getArticles({ limit: 1 });
        return articles[0] || null;
    }

    /**
     * Busca artigo por slug
     */
    async getArticleBySlug(slug: string): Promise<Article | null> {
        const cacheKey = `article:${slug}`;
        const cached = this.getFromCache<Article>(cacheKey);
        if (cached) return cached;

        try {
            const response = await fetch(
                `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}/articles/${slug}?locale=${config.locale}`
            );

            if (!response.ok) {
                if (response.status === 404) return null;
                throw new Error(`HTTP ${response.status}`);
            }

            const snapshot = await response.json();
            const mapped = this.mapSnapshotToArticle(snapshot);

            this.setCache(cacheKey, mapped);
            return mapped;
        } catch (error) {
            console.error('[ArticleService] Erro ao buscar artigo:', error);
            return null;
        }
    }

    /**
     * Busca artigos relacionados (simulado via categoria se disponível)
     */
    async getRelatedArticles(slug: string, limit = 3): Promise<Article[]> {
        // Por simplicidade na Snapshot API, pegamos os últimos artigos
        // Em uma implementação real, poderíamos filtrar por categoria
        const articles = await this.getArticles({ limit: limit + 1 });
        return articles.filter((a: Article) => a.slug !== slug).slice(0, limit);
    }

    /**
     * Busca categorias disponíveis
     */
    async getCategories(): Promise<string[]> {
        const cacheKey = 'categories';
        const cached = this.getFromCache<string[]>(cacheKey);
        if (cached) return cached;

        try {
            // No headless, as categorias podem vir do snapshot do site
            const response = await fetch(
                `${config.apiUrl}/api/headless/sites-by-id/${config.siteId}?limit=0`
            );

            if (!response.ok) return [];

            await response.json();
            // Extrair categorias únicas dos artigos ou do plano do site se existissem
            // Para simplificar, retornamos fixas ou Vazias para o Gemini preencher
            return ["Geral", "Novidades", "Guia"];
        } catch {
            return [];
        }
    }

    private getFromCache<T>(key: string): T | null {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
            return cached.data as T;
        }
        return null;
    }

    private setCache(key: string, data: unknown): void {
        this.cache.set(key, { data, timestamp: Date.now() });
    }

    public clearCache(): void {
        this.cache.clear();
    }
}

export const ArticleService = ArticleServiceClass.getInstance();
