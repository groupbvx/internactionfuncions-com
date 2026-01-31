// @ts-nocheck
import { config } from '@/lib/config';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { AdSpot } from "./AdSpot";
import { ArticleService, Article } from "@/services/ArticleService";

export const Sidebar = () => {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ArticleService.getArticles({ offset: 0, limit: 5 })
      .then((articles) => setRecentArticles(articles || []))
      .catch(() => setRecentArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <aside className="space-y-6">
      {/* ========== AD ZONE: SIDEBAR ========== */}
      <AdSpot position="sidebar" zoneId={config.reviveZoneSidebar} className="w-full rounded" />

      {/* Most Read */}
      <div className="bg-card border border-border rounded p-4">
        <h3 className="im-section-title">Most Read</h3>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse flex gap-3">
                <div className="text-2xl font-bold text-muted w-6">{i + 1}</div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : recentArticles.length > 0 ? (
          <div className="space-y-3">
            {recentArticles.map((article, index) => (
              <Link
                key={article.id}
                to={`/artigo/${article.slug}`}
                className="flex gap-3 group py-2 border-b border-border last:border-0"
                data-bvx-track="SIDEBAR_MOST_READ"
              >
                <span className="text-2xl font-bold text-muted font-display">{index + 1}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="im-headline-list line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <span className="im-caption">{article.category}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No articles available.</p>
        )}

        <Link
          to="/artigos"
          className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          data-bvx-track="SIDEBAR_VIEW_ALL"
        >
          View all articles
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Categories */}
      <div className="bg-card border border-border rounded p-4">
        <h3 className="im-section-title">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {["Markets", "Investments", "Economy", "Business", "Personal Finance"].map((category) => (
            <Link
              key={category}
              to={`/artigos?category=${encodeURIComponent(category.toLowerCase())}`}
              className="px-3 py-1.5 text-xs font-medium bg-muted text-muted-foreground rounded hover:bg-primary hover:text-primary-foreground transition-colors"
              data-bvx-track={`SIDEBAR_CAT_${category.toUpperCase()}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* Second Sidebar Ad */}
      <AdSpot position="sidebar" zoneId={config.reviveZoneSidebar} className="w-full rounded" />
    </aside>
  );
};
