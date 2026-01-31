// @ts-nocheck
import { useEffect, useState } from "react";
import { ArticleCard } from "./ArticleCard";
import { ArticleService, Article } from "@/services/ArticleService";

export const HeroFeature = () => {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [secondaryArticles, setSecondaryArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      ArticleService.getFeaturedArticle(),
      ArticleService.getArticles({ offset: 0, limit: 4 })
    ])
      .then(([featured, articles]) => {
        setFeaturedArticle(featured);
        setSecondaryArticles(articles?.slice(0, 3) || []);
      })
      .catch(() => {
        setFeaturedArticle(null);
        setSecondaryArticles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div id="bvx-hero-feature" className="animate-pulse">
        {/* BVX_CONTENT_FEATURE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="aspect-[16/9] bg-muted rounded" />
          </div>
          <div className="space-y-4">
            <div className="h-24 bg-muted rounded" />
            <div className="h-24 bg-muted rounded" />
            <div className="h-24 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!featuredArticle) {
    return (
      <div id="bvx-hero-feature" className="bg-muted rounded p-8 text-center">
        {/* BVX_CONTENT_FEATURE */}
        <h2 className="im-headline-section mb-2">Welcome to {"Intern Action Functions"}</h2>
        <p className="text-muted-foreground">Your portal for financial market news and analysis.</p>
      </div>
    );
  }

  return (
    <div id="bvx-hero-feature">
      {/* BVX_CONTENT_FEATURE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured */}
        <div className="lg:col-span-2">
          <ArticleCard article={featuredArticle} variant="featured" />
        </div>

        {/* Secondary Articles */}
        <div className="space-y-4">
          <h2 className="im-section-title">Highlights</h2>
          {secondaryArticles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="list" />
          ))}
        </div>
      </div>
    </div>
  );
};
