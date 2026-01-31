// @ts-nocheck
import { AnalyticsService } from '../services/AnalyticsService';

/**
 * Hook helper para rastrear buscas
 * Use este hook na página de busca para rastrear automaticamente
 */
export function useSearchTracking(searchQuery: string | null, resultsCount: number, searchLocation: string = 'search-page'): void {
    // Rastrear busca quando query mudar
    if (searchQuery && searchQuery.trim().length > 0) {
        AnalyticsService.captureSearchPerformed(
            searchQuery.trim(),
            resultsCount,
            searchLocation
        );
    }
}

/**
 * Helper para rastrear clique em resultado de busca
 */
export function trackSearchResultClick(searchQuery: string, resultPosition: number, resultTitle: string): void {
    AnalyticsService.captureSearchResultClick(searchQuery, resultPosition, resultTitle);
}
