// @ts-nocheck
import { config } from '@/lib/config';
import { AdSpot } from '@/components/AdSpot';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { ArticleGrid } from "@/components/ArticleGrid";
import { Sidebar } from "@/components/Sidebar";
import { ArticleService, Article } from "@/services/ArticleService";

const Articles = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    ArticleService.getArticles({ page, limit: 12, category })
      .then((articles) => setArticles(articles || []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, [page, category]);

  return (
    <Layout>
      <SEO
        title={category ? `${category} - Articles` : "Articles"}
        description="Check out all articles about finance, investments, markets and economy. In-depth analyses and practical tips for your financial decisions."
      />

      <div className="container py-8">
        <section className="mb-8">
          <h1 className="im-headline-hero mb-4">
            {category ? category : "All Articles"}
          </h1>
          <p className="im-body text-muted-foreground max-w-2xl">
            {category
              ? `Articles about ${category.toLowerCase()} to keep you informed.`
              : "Explore our complete collection of articles about finance and investments."}
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ArticleGrid articles={articles} loading={loading} />

            {/* In-Article Ad */}
            <AdSpot position="in-content" zoneId={config.reviveZoneInArticle1} className="w-full" />

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
                data-bvx-track="ARTICLES_PREV_PAGE"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-muted-foreground">Page {page}</span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={articles.length < 12}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-secondary/80 transition-colors"
                data-bvx-track="ARTICLES_NEXT_PAGE"
              >
                Next
              </button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
