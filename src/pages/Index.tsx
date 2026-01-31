// @ts-nocheck
import { config } from '@/lib/config';
import { ArticleCard } from '@/components/ArticleCard';
import { AdSpot } from '@/components/AdSpot';
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { HeroFeature } from "@/components/HeroFeature";
import { Newsletter } from "@/components/Newsletter";
import { Sidebar } from "@/components/Sidebar";
import { ArticleService, Article } from "@/services/ArticleService";

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ArticleService.getArticles({ offset: 0, limit: 12 })
      .then((articles) => setArticles(articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const marketsArticles = articles.slice(0, 4);
  const investmentsArticles = articles.slice(4, 8);
  const economyArticles = articles.slice(8, 12);

  return (
    <Layout>
      <SEO
        title="Finance, Investment and Market News"
        description="Your portal for financial market news and analysis. Find the best investment tips, market analyses and tools for your finances."
      />

      <div className="container py-6">
        <h1 className="sr-only">{"Intern Action Functions"} - Finance and Investment Portal</h1>

        {/* Hero Section */}
        <section className="mb-8">
          <HeroFeature />
        </section>

        {/* Newsletter */}
        <section className="mb-8">
          <Newsletter />
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Markets Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="im-section-title flex-1">Markets</h2>
                <Link
                  to="/artigos?category=markets"
                  className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  data-bvx-track="SECTION_MARKETS_MORE"
                >
                  See more <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="aspect-[16/10] bg-muted rounded mb-3" />
                      <div className="h-3 bg-muted rounded w-20 mb-2" />
                      <div className="h-5 bg-muted rounded w-full mb-1" />
                      <div className="h-5 bg-muted rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {marketsArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="medium" />
                  ))}
                </div>
              )}
            </section>

            {/* ========== AD ZONE: IN-ARTICLE 1 ========== */}
            <AdSpot position="in-content" zoneId={config.reviveZoneInArticle1} className="w-full" />

            {/* Investments Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="im-section-title flex-1">Investments</h2>
                <Link
                  to="/artigos?category=investments"
                  className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  data-bvx-track="SECTION_INVESTMENTS_MORE"
                >
                  See more <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse flex gap-3 pb-3 border-b border-border">
                      <div className="w-24 h-16 bg-muted rounded flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-muted rounded w-16" />
                        <div className="h-4 bg-muted rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  {investmentsArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="small" />
                  ))}
                </div>
              )}
            </section>

            {/* ========== AD ZONE: IN-ARTICLE 2 ========== */}
            <AdSpot position="in-content" zoneId={config.reviveZoneInArticle2} className="w-full" />

            {/* Economy Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="im-section-title flex-1">Economy</h2>
                <Link
                  to="/artigos?category=economy"
                  className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  data-bvx-track="SECTION_ECONOMY_MORE"
                >
                  See more <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse py-3 border-b border-border">
                      <div className="h-3 bg-muted rounded w-16 mb-2" />
                      <div className="h-4 bg-muted rounded w-full mb-1" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-0">
                  {economyArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="list" />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
