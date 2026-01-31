// @ts-nocheck
import { config } from '@/lib/config';

/**
 * Tipos de eventos de analytics
 */
export type AnalyticsEvent = 
    | 'page_view'
    | 'article_view'
    | 'newsletter_subscribe'
    | 'ad_click'
    | 'search'
    | 'tool_use'
    | 'contact_submit'
    | 'scroll_depth';

/**
 * Propriedades do evento
 */
export interface EventProperties {
    [key: string]: string | number | boolean | undefined;
}

/**
 * AnalyticsService - Singleton para tracking com PostHog
 * 
 * @pattern Singleton
 * @pattern Facade (simplifica API do PostHog)
 * 
 * Usa config (que vem de VITE_*) para configuração dinâmica
 */
class AnalyticsServiceClass {
    private static instance: AnalyticsServiceClass;
    private initialized = false;
    private posthog: any = null;
    private queue: Array<{ event: string; properties: EventProperties }> = [];

    private constructor() {}

    public static getInstance(): AnalyticsServiceClass {
        if (!AnalyticsServiceClass.instance) {
            AnalyticsServiceClass.instance = new AnalyticsServiceClass();
        }
        return AnalyticsServiceClass.instance;
    }

    /**
     * Inicializa o PostHog
     */
    public async initialize(): Promise<void> {
        if (this.initialized || !config.posthogKey) return;

        try {
            // @ts-ignore - posthog-js pode não estar instalado em todos os projetos
            const posthogModule = await import('posthog-js');
            this.posthog = posthogModule.default;
            
            this.posthog.init(config.posthogKey, {
                api_host: config.posthogHost,
                persistence: 'localStorage',
                autocapture: true,
                capture_pageview: false,
                loaded: () => {
                    this.initialized = true;
                    this.flushQueue();
                    this.captureUTMParams();
                }
            });
        } catch (error) {
            console.warn('[AnalyticsService] PostHog não disponível:', error);
        }
    }

    /**
     * Captura evento
     */
    public capture(event: AnalyticsEvent | string, properties: EventProperties = {}): void {
        const enrichedProps = {
            ...properties,
            site_id: config.siteId, // Mantido para compatibilidade
            website_id: config.siteId, // Adicionado para compatibilidade com queries do analytics
            site_name: config.siteName,
            timestamp: new Date().toISOString(),
        };

        if (!this.initialized) {
            this.queue.push({ event, properties: enrichedProps });
            return;
        }

        this.posthog?.capture(event, enrichedProps);
    }

    /**
     * Captura visualização de página
     */
    public capturePageView(path?: string): void {
        this.capture('page_view', {
            path: path || window.location.pathname,
            url: window.location.href,
            referrer: document.referrer,
            title: document.title,
        });
    }

    /**
     * Captura visualização de artigo
     */
    public captureArticleView(article: { slug: string; title: string; category?: string }): void {
        this.capture('article_view', {
            article_slug: article.slug,
            article_title: article.title,
            article_category: article.category,
        });
    }

    /**
     * Captura profundidade de scroll
     */
    public captureScrollDepth(depth: number, path?: string): void {
        this.capture('scroll_depth', {
            depth_percent: depth,
            path: path || window.location.pathname,
        });
    }

    /**
     * Captura scroll profundo em artigo (article_scroll_deep)
     */
    public captureArticleScrollDeep(articleId?: string, articleSlug?: string, scrollPercentage: number = 50): void {
        this.capture('article_scroll_deep', {
            article_id: articleId,
            article_slug: articleSlug,
            scroll_percentage: Math.round(scrollPercentage),
            page_url: window.location.pathname,
            page_full_url: window.location.href,
        });
    }

    /**
     * Captura clique em banner de patrocínio
     */
    public captureSponsorBannerClick(sponsorLocation: string, sponsorId?: string, sponsorName?: string): void {
        this.capture('sponsor_banner_clicked', {
            page_url: window.location.pathname,
            page_full_url: window.location.href,
            sponsor_location: sponsorLocation,
            sponsor_id: sponsorId,
            sponsor_name: sponsorName,
        });
    }

    /**
     * Captura clique em banner AdSense
     */
    public captureAdSenseBannerClick(adsLocation: string, adsSlot?: string): void {
        this.capture('adsense_banner_clicked', {
            page_url: window.location.pathname,
            page_full_url: window.location.href,
            ads_location: adsLocation,
            ads_slot: adsSlot,
        });
    }

    /**
     * Captura uso de ferramenta/calculadora
     */
    public captureToolUsed(toolName: string, toolType: string = 'calculator', toolCategory: string = 'general', toolLocation?: string): void {
        this.capture('tool_used', {
            tool_name: toolName,
            tool_type: toolType,
            tool_category: toolCategory,
            tool_location: toolLocation || window.location.pathname,
        });
    }

    /**
     * Captura busca realizada
     */
    public captureSearchPerformed(searchQuery: string, searchResultsCount: number, searchLocation: string = 'search-page'): void {
        this.capture('search_performed', {
            search_query: searchQuery,
            search_results_count: searchResultsCount,
            search_location: searchLocation,
        });
    }

    /**
     * Captura clique em resultado de busca
     */
    public captureSearchResultClick(searchQuery: string, resultPosition: number, resultTitle: string): void {
        this.capture('search_result_clicked', {
            search_query: searchQuery,
            result_position: resultPosition,
            result_title: resultTitle,
        });
    }

    /**
     * Identifica usuário
     */
    public identify(userId: string, properties: EventProperties = {}): void {
        if (!this.initialized) return;
        this.posthog?.identify(userId, properties);
    }

    /**
     * Reseta identificação
     */
    public reset(): void {
        if (!this.initialized) return;
        this.posthog?.reset();
    }

    private captureUTMParams(): void {
        const params = new URLSearchParams(window.location.search);
        const utmParams: EventProperties = {};
        
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
            const value = params.get(param);
            if (value) utmParams[param] = value;
        });

        if (Object.keys(utmParams).length > 0) {
            this.posthog?.people?.set(utmParams);
        }
    }

    private flushQueue(): void {
        while (this.queue.length > 0) {
            const { event, properties } = this.queue.shift()!;
            this.posthog?.capture(event, properties);
        }
    }

    public isReady(): boolean {
        return this.initialized;
    }
}

export const AnalyticsService = AnalyticsServiceClass.getInstance();
