// @ts-nocheck
/**
 * Configuração centralizada do site
 * Todas as variáveis de ambiente em um único lugar
 * 
 * IMPORTANTE: Usa import.meta.env.VITE_SITE_ID para isolamento entre sites
 * 
 * @pattern Singleton Configuration
 */
export const config = {
    // Site - CRÍTICO para isolamento
    siteId: import.meta.env.VITE_SITE_ID || '',
    siteName: import.meta.env.VITE_SITE_NAME || 'Site',
    siteUrl: import.meta.env.VITE_SITE_URL || '',
    siteDescription: import.meta.env.VITE_SITE_DESCRIPTION || '',
    siteKeywords: import.meta.env.VITE_SITE_KEYWORDS || '',

    // API
    apiUrl: import.meta.env.VITE_API_URL || '',
    contentApiUrl: import.meta.env.VITE_CONTENT_API_BASE_URL || '',

    // Analytics (PostHog)
    posthogKey: import.meta.env.VITE_POSTHOG_KEY || '',
    posthogHost: import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com',

    // Ads (Revive)
    reviveUrl: import.meta.env.VITE_REVIVE_URL || '',
    reviveId: import.meta.env.VITE_REVIVE_ID || '',
    reviveZoneHeader: import.meta.env.VITE_REVIVE_ZONE_HEADER || '',
    reviveZoneSidebar: import.meta.env.VITE_REVIVE_ZONE_SIDEBAR || '',
    reviveZoneInArticle1: import.meta.env.VITE_REVIVE_ZONE_INARTICLE_1 || '',
    reviveZoneInArticle2: import.meta.env.VITE_REVIVE_ZONE_INARTICLE_2 || '',
    reviveZoneStickyFooter: import.meta.env.VITE_REVIVE_ZONE_STICKY_FOOTER || '',

    // Newsletter
    newsletterEndpoint: import.meta.env.VITE_NEWSLETTER_ENDPOINT || '',

    // Locale
    locale: import.meta.env.VITE_LOCALE || 'en-US',
} as const;

// Debug: Log configuration on initialization (only in browser)
if (typeof window !== 'undefined') {
    console.log('[Config] 🔧 Configurações carregadas:', {
        reviveUrl: config.reviveUrl,
        reviveId: config.reviveId,
        reviveZoneHeader: config.reviveZoneHeader,
        reviveZoneSidebar: config.reviveZoneSidebar,
        hasReviveUrl: !!config.reviveUrl,
        hasReviveId: !!config.reviveId,
        environment: import.meta.env.MODE,
    });
    
    // Alerta se variáveis críticas estão faltando
    if (!config.reviveUrl) {
        console.warn('[Config] ⚠️ VITE_REVIVE_URL não está definido! Anúncios não funcionarão.');
    }
    if (!config.reviveId) {
        console.warn('[Config] ⚠️ VITE_REVIVE_ID não está definido! Anúncios não funcionarão.');
    }
}

export type Config = typeof config;

/**
 * Valida se as variáveis críticas estão configuradas
 */
export function validateConfig(): { valid: boolean; missing: string[] } {
    const missing: string[] = [];

    if (!config.siteId) missing.push('VITE_SITE_ID');
    if (!config.apiUrl) missing.push('VITE_API_URL');

    return { valid: missing.length === 0, missing };
}
