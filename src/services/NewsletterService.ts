// @ts-nocheck
import { config } from '@/lib/config';

/**
 * Interface para dados de inscrição
 */
export interface NewsletterSubscription {
    email: string;
    name?: string;
    source?: string;
}

/**
 * Interface para resposta da API
 */
export interface NewsletterResponse {
    success: boolean;
    message: string;
}

/**
 * NewsletterService - Singleton para gerenciamento de newsletter
 * 
 * @pattern Singleton
 * @pattern Strategy (pode trocar provider facilmente)
 * 
 * Usa config.siteId (que vem de VITE_SITE_ID) para isolamento entre sites
 */
class NewsletterServiceClass {
    private static instance: NewsletterServiceClass;

    private constructor() { }

    public static getInstance(): NewsletterServiceClass {
        if (!NewsletterServiceClass.instance) {
            NewsletterServiceClass.instance = new NewsletterServiceClass();
        }
        return NewsletterServiceClass.instance;
    }

    /**
     * Retorna o endpoint da newsletter
     */
    private getEndpoint(): string {
        return config.newsletterEndpoint || `${config.apiUrl}/api/public/newsletter/subscribe`;
    }

    /**
     * Inscreve email na newsletter
     */
    public async subscribe(data: NewsletterSubscription): Promise<NewsletterResponse> {
        try {
            const response = await fetch(this.getEndpoint(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    websiteId: config.siteId, // O backend espera websiteId, não siteId
                    website_url: '', // Honeypot field - deve estar vazio
                }),
            });

            // Verify if response is JSON
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                console.error('[NewsletterService] Resposta não é JSON:', await response.text());
                throw new Error("Erro de configuração: A API retornou HTML em vez de JSON. Verifique VITE_API_URL.");
            }

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                return {
                    success: false,
                    message: error.message || 'Erro ao inscrever. Tente novamente.',
                };
            }

            // Consumir o JSON
            await response.json();

            return {
                success: true,
                message: 'Inscrição realizada com sucesso!',
            };
        } catch (error) {
            console.error('[NewsletterService] Erro:', error);
            return {
                success: false,
                message: 'Erro de conexão. Verifique sua internet.',
            };
        }
    }

    /**
     * Valida formato de email
     */
    public validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

export const NewsletterService = NewsletterServiceClass.getInstance();
