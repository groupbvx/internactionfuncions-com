// @ts-nocheck
import { config } from '@/lib/config';
import { useRef, useEffect } from 'react';
import { AnalyticsService } from '../services/AnalyticsService';

export type AdPosition = 'header' | 'sidebar' | 'in-content' | 'footer' | 'sticky-bottom';

interface AdSpotProps {
    position: AdPosition;
    zoneId?: string;
    className?: string;
}

/**
 * AdSpot - Componente para exibição de anúncios
 * Simplificado para seguir o padrão que funciona
 */
export function AdSpot({ position, zoneId, className = '' }: AdSpotProps) {
    const insRef = useRef<HTMLModElement>(null);
    const reviveId = config.reviveId || import.meta.env.VITE_REVIVE_ID || '';
    const containerRef = useRef<HTMLDivElement>(null);

    // Map position to default zoneId from config if not provided
    const effectiveZoneId = zoneId && zoneId.length > 0 && !zoneId.includes('ZONE_ID')
        ? zoneId
        : (position === 'header' ? config.reviveZoneHeader :
            position === 'sidebar' ? config.reviveZoneSidebar :
                position === 'in-content' ? config.reviveZoneInArticle1 :
                    position === 'sticky-bottom' ? config.reviveZoneStickyFooter :
                        config.reviveZoneHeader);

    // Rastrear cliques em anúncios (Revive Ads)
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleClick = (e: MouseEvent) => {
            // Verificar se o clique foi em um link dentro do anúncio
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            
            if (link) {
                // Rastrear clique em anúncio (usando adsense_banner_clicked para compatibilidade)
                AnalyticsService.captureAdSenseBannerClick(
                    position,
                    effectiveZoneId
                );
            }
        };

        container.addEventListener('click', handleClick, true); // Use capture phase

        return () => {
            container.removeEventListener('click', handleClick, true);
        };
    }, [position, effectiveZoneId]);

    const getPositionStyles = () => {
        switch (position) {
            case 'header':
                return 'min-h-[90px]';
            case 'sidebar':
                return 'min-h-[250px]';
            case 'in-content':
                return 'min-h-[90px] my-8';
            case 'sticky-bottom':
                return 'fixed bottom-0 left-0 right-0 min-h-[50px] z-50 bg-card shadow-lg border-t border-border';
            default:
                return '';
        }
    };

    return (
        <div
            ref={containerRef}
            className={`flex items-center justify-center bg-muted/10 overflow-hidden ${getPositionStyles()} ${className}`}
            data-bvx-track={`AD_VIEW_${position.toUpperCase().replace(/-/g, '_')}`}
        >
            <ins
                ref={insRef}
                className="adsbyrevive"
                data-revive-zoneid={effectiveZoneId}
                data-revive-id={reviveId}
            />
        </div>
    );
}
