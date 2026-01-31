// @ts-nocheck
import { AnalyticsService } from '../services/AnalyticsService';

interface SponsorBannerProps {
    href: string;
    imageUrl: string;
    alt: string;
    location: 'sidebar' | 'header' | 'footer' | 'in-content';
    sponsorId?: string;
    sponsorName?: string;
    className?: string;
}

/**
 * SponsorBanner - Componente para banners de patrocínio com tracking automático
 * 
 * Rastreia automaticamente cliques usando o evento 'sponsor_banner_clicked'
 */
export function SponsorBanner({
    href,
    imageUrl,
    alt,
    location,
    sponsorId,
    sponsorName,
    className = '',
}: SponsorBannerProps) {
    const handleClick = () => {
        AnalyticsService.captureSponsorBannerClick(location, sponsorId, sponsorName);
    };

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className={`block ${className}`}
            data-bvx-track="sponsor_banner_clicked"
            data-ph-location={location}
            data-ph-sponsor-id={sponsorId}
            data-ph-label={sponsorName}
        >
            <img
                src={imageUrl}
                alt={alt}
                className="w-full h-auto"
            />
        </a>
    );
}
