// @ts-nocheck
import { config } from '@/lib/config';
import { AdService } from '@/services/AdService';
import { useEffect } from "react";
import { AnalyticsService } from "@/services/AnalyticsService";

export function Scripts() {
    useEffect(() => {
        // 1. Initialize Analytics (PostHog)
        if (config.posthogKey) {
            AnalyticsService.initialize().catch((err) =>
                console.warn("Failed to init analytics:", err)
            );
        }

        // 2. Initialize Revive Ads
        if (config.reviveUrl) {
            AdService.initialize();
        }
    }, []);

    return null;
}
