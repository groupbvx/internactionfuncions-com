// @ts-nocheck
import { config } from '@/lib/config';

/**
 * Tipos de posição de anúncio
 */
export type AdPosition = 'header' | 'sidebar' | 'in-content' | 'footer' | 'sticky-bottom';

/**
 * AdService - Gerenciamento de anúncios Revive
 * Simplificado para seguir o padrão que funciona
 */
export const AdService = {
    initialize: () => {
        if (typeof window === 'undefined') return;

        const reviveUrl = config.reviveUrl || import.meta.env.VITE_REVIVE_URL;
        if (!reviveUrl) {
            console.warn('[AdService] VITE_REVIVE_URL não encontrado nas variáveis de ambiente.');
            return;
        }

        const baseUrl = reviveUrl.replace(/^https?:\/\//, '').replace(/^\/\//, '');
        const scriptUrl = `//${baseUrl}/delivery/asyncjs.php`;

        // Verificar se o script já existe
        if (document.querySelector(`script[src="${scriptUrl}"]`)) {
            console.log('[AdService] Script do Revive já está carregado');
            return;
        }

        const script = document.createElement('script');
        script.src = scriptUrl;
        script.async = true;
        
        // Adicionar parâmetros de targeting (opcional, mas pode ajudar)
        // script.dataset.source = config.siteDescription || '';
        // script.dataset.target = config.siteUrl || '';
        
        document.head.appendChild(script);
        console.log('[AdService] Script do Revive carregado:', scriptUrl);
    },
};
