// @ts-nocheck
import { useEffect, useRef } from 'react';
import { AnalyticsService } from '../services/AnalyticsService';

interface GoogleAdSenseProps {
    adSlot: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    location: 'sidebar' | 'header' | 'footer' | 'inline';
    className?: string;
}

/**
 * GoogleAdSense - Componente para anúncios Google AdSense com tracking automático
 * 
 * Rastreia automaticamente cliques usando o evento 'adsense_banner_clicked'
 */
export function GoogleAdSense({
    adSlot,
    adFormat = 'auto',
    location,
    className = '',
}: GoogleAdSenseProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasTrackedView = useRef(false);

    // Rastrear visualização do anúncio quando ele aparece
    useEffect(() => {
        const container = containerRef.current;
        if (!container || hasTrackedView.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTrackedView.current) {
                        hasTrackedView.current = true;
                        // Opcional: rastrear visualização
                        // AnalyticsService.capture('adsense_banner_viewed', { ... });
                    }
                });
            },
            { threshold: 0.5 }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
        };
    }, []);

    // Rastrear cliques em anúncios AdSense
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleClick = (e: MouseEvent) => {
            // Verificar se o clique foi em um link dentro do anúncio
            const target = e.target as HTMLElement;
            const link = target.closest('a');
            
            if (link) {
                AnalyticsService.captureAdSenseBannerClick(location, adSlot);
            }
        };

        container.addEventListener('click', handleClick, true); // Use capture phase

        return () => {
            container.removeEventListener('click', handleClick, true);
        };
    }, [location, adSlot]);

    return (
        <div
            ref={containerRef}
            id={`adsense-${location}`}
            className={className}
            data-ph-capture="adsense_banner_viewed"
            data-ph-location={location}
            data-ph-ads-slot={adSlot}
        >
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={import.meta.env.VITE_ADSENSE_CLIENT_ID}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
}
