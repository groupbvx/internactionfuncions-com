// @ts-nocheck
import { config } from '@/lib/config';
import { AdSpot } from '@/components/AdSpot';
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { ArticleGrid } from "@/components/ArticleGrid";
import { ArticleService, Article } from "@/services/ArticleService";
// useSearchTracking will be REPLACED by the one from base-site during scaffold
import { useSearchTracking, trackSearchResultClick } from "@/hooks/useSearchTracking";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      ArticleService.getArticles({ search: query, limit: 12 })
        .then((articles) => setArticles(articles || []))
        .catch(() => setArticles([]))
        .finally(() => setLoading(false));
    } else {
      setArticles([]);
      setLoading(false);
    }
  }, [query]);

  // Track search automatically (hook will be copied from base-site)
  useSearchTracking(query, articles.length, "search-page");

  return (
    <Layout>
      <SEO
        title={query ? `Search: ${query}` : "Search"}
        description={`Search results for "${query}" on the finance portal.`}
      />

      <div className="container py-8">
        <section className="mb-8">
          <h1 className="im-headline-hero mb-4 flex items-center gap-4">
            <SearchIcon className="h-8 w-8 text-primary" />
            Search Results
          </h1>

          {query && (
            <p className="body-lg text-muted-foreground">
              {loading
                ? "Searching..."
                : articles.length > 0
                ? `${articles.length} result${articles.length > 1 ? "s" : ""} for "${query}"`
                : `No results found for "${query}"`}
            </p>
          )}
        </section>

        {!query ? (
          <div className="bg-card border border-border rounded p-12 text-center">
            <SearchIcon className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
            <h2 className="im-headline-section mb-2">Type something to search</h2>
            <p className="text-muted-foreground">
              Use the search bar in the header to find articles.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {articles.length > 0 ? (
              <div id="bvx-main-grid" className="space-y-6">
                {articles.map((article, index) => (
                  <article
                    key={article.id}
                    className="border-b pb-6 last:border-b-0"
                  >
                    <Link
                      to={`/artigo/${article.slug}`}
                      onClick={() => {
                        trackSearchResultClick(query, index, article.title);
                      }}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
                      {article.excerpt && (
                        <p className="text-muted-foreground mb-2">{article.excerpt}</p>
                      )}
                      {article.publishedAt && (
                        <time className="text-sm text-muted-foreground">
                          {new Date(article.publishedAt).toLocaleDateString("en-US")}
                        </time>
                      )}
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <ArticleGrid articles={articles} loading={loading} />
            )}

            {/* In-Article Ad */}
            <AdSpot position="in-content" zoneId={config.reviveZoneInArticle1} className="w-full" />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
