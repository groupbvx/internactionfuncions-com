// @ts-nocheck
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import type { Article } from "@/services/ArticleService";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "medium" | "small" | "list";
}

export const ArticleCard = ({ article, variant = "medium" }: ArticleCardProps) => {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
  });

  // Featured - Large hero style
  if (variant === "featured") {
    return (
      <article className="group">
        <Link to={`/artigo/${article.slug}`} className="block" data-bvx-track="ARTICLE_FEATURED_CLICK">
          <div className="relative aspect-[16/9] overflow-hidden rounded mb-4">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <span className="im-category mb-2 inline-block bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs">
                {article.category}
              </span>
              <h2 className="im-headline-hero text-white mb-2">
                {article.title}
              </h2>
              <p className="text-white/80 text-sm line-clamp-2 hidden md:block">
                {article.excerpt}
              </p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Medium - Standard card with image
  if (variant === "medium") {
    return (
      <article className="im-card im-card-hover group pb-4">
        <Link to={`/artigo/${article.slug}`} className="block" data-bvx-track="ARTICLE_CARD_CLICK">
          <div className="aspect-[16/10] overflow-hidden rounded mb-3">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <span className="im-category mb-1 inline-block">{article.category}</span>
          <h3 className="im-headline-card mb-2 line-clamp-3">{article.title}</h3>
          <div className="flex items-center gap-2 im-caption">
            <span>{formattedDate}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {article.readTime} min
            </span>
          </div>
        </Link>
      </article>
    );
  }

  // Small - Compact card with small image
  if (variant === "small") {
    return (
      <article className="im-card im-card-hover group pb-3">
        <Link to={`/artigo/${article.slug}`} className="flex gap-3" data-bvx-track="ARTICLE_SMALL_CLICK">
          <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="im-category text-xs mb-0.5 inline-block">{article.category}</span>
            <h3 className="im-headline-list line-clamp-2">{article.title}</h3>
          </div>
        </Link>
      </article>
    );
  }

  // List - Text only, no image
  return (
    <article className="im-card im-card-hover group py-3 border-b border-border">
      <Link to={`/artigo/${article.slug}`} className="block" data-bvx-track="ARTICLE_LIST_CLICK">
        <span className="im-category text-xs mb-1 inline-block">{article.category}</span>
        <h3 className="im-headline-list line-clamp-2 mb-1">{article.title}</h3>
        <span className="im-caption">{formattedDate}</span>
      </Link>
    </article>
  );
};
