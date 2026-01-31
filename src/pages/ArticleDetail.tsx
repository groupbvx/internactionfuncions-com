// @ts-nocheck
import { config } from '@/lib/config';
import { AdSpot } from '@/components/AdSpot';
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArticleService, Article } from "@/services/ArticleService";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Newsletter } from "@/components/Newsletter";
// useScrollDepth will be REPLACED by the one from base-site during scaffold
import { useScrollDepth } from "@/hooks/useScrollDepth";
// AnalyticsService will be REPLACED by the one from base-site during scaffold
import { AnalyticsService } from "@/services/AnalyticsService";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

/**
 * ArticleDetail - Article detail page
 *
 * ALREADY INCLUDES:
 * - AdSpot before content
 * - AdSpot after content
 * - Newsletter after article
 * - SEO meta tags
 * - Analytics tracking (article_view and article_scroll_deep)
 */
export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;

      setLoading(true);
      try {
        const data = await ArticleService.getArticleBySlug(slug);
        if (data) {
          setArticle(data);
          // Track article view
          AnalyticsService?.capture("article_view", {
            article_slug: slug,
            article_title: data.title,
            article_category: data.category,
          });
        } else {
          setError("Article not found");
        }
      } catch (err) {
        setError("Error loading article");
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  // Track deep scroll in article (hook will be copied from base-site)
  if (article) {
    useScrollDepth(article.id, article.slug, true, 50);
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">{error || "Article not found"}</h1>
          <Link to="/artigos" className="text-primary hover:underline">
            Back to articles
          </Link>
        </div>
      </Layout>
    );
  }

  const publishDate = article.publishedAt;

  return (
    <Layout>
      <SEO
        title={article.title}
        description={article.excerpt || article.title}
        image={article.imageUrl}
      />

      <article className="container max-w-4xl mx-auto py-8">
        {/* Back link */}
        <Link
          to="/artigos"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to articles
        </Link>

        {/* AD SPOT: Before Article */}
        <AdSpot
          position="in-content"
          zoneId={config.reviveZoneInArticle1}
          className="mb-8"
        />

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="im-headline-hero mb-4">{article.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
            {publishDate && (
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(publishDate).toLocaleDateString("en-US")}
              </span>
            )}
            {article.readTime && (
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTime} min read
              </span>
            )}
            {article.category && (
              <span className="px-2 py-1 bg-secondary rounded text-xs">
                {article.category}
              </span>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto rounded-lg mb-8"
          />
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* AD SPOT: After Article */}
        <AdSpot
          position="in-content"
          zoneId={config.reviveZoneInArticle2}
          className="mt-8"
        />

        {/* Newsletter CTA */}
        <div className="mt-12 border-t pt-8">
          <Newsletter />
        </div>
      </article>
    </Layout>
  );
}
