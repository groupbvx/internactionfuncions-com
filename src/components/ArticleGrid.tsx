// @ts-nocheck
import { ArticleCard } from "./ArticleCard";
import type { Article } from "@/services/ArticleService";

interface ArticleGridProps {
  articles: Article[];
  loading?: boolean;
}

export const ArticleGrid = ({ articles, loading = false }: ArticleGridProps) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse pb-4 border-b border-border">
            <div className="flex gap-3">
              <div className="w-24 h-16 bg-muted rounded flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-4 bg-muted rounded w-full" />
                <div className="h-4 bg-muted rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
      </div>
    );
  }

  return (
    <div id="bvx-main-grid" className="space-y-1">
      {/* BVX_CONTENT_GRID */}
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} variant="small" />
      ))}
    </div>
  );
};
