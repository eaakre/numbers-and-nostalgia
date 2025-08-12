import { Article } from "@/types/article";
import { Typography } from "@/components/ui/Typography";
import Image from "next/image";
import Link from "next/link";

export function ArticleCard({
  article,
  isRelatedArticle = false,
}: {
  article: Article;
  isRelatedArticle?: boolean;
}) {
  return (
    <article className="bg-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {/* Hero Image */}
      {article.hero && (
        <Link href={`/articles/${article.slug.current}`}>
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={article.hero.asset.url}
              alt={article.hero.alt || article.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}

      <div className="p-6">
        {/* Category Badge */}
        {article.category && (
          <div className="mb-3">
            <span
              className="inline-block px-3 py-1 text-xs font-semibold rounded-full"
              style={{
                backgroundColor: article.category.color || "#f3f4f6",
                color: article.category.color ? "#ffffff" : "#374151",
              }}
            >
              {article.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <Typography variant="h3" noMargin className="mb-3">
          <Link
            href={`/articles/${article.slug.current}`}
            className="hover:text-accent transition-colors"
          >
            {article.title}
          </Link>
        </Typography>

        {/* Intro/Excerpt */}
        {article.intro && (
          <Typography
            variant="p"
            color="muted"
            noMargin
            className="mb-4 line-clamp-3"
          >
            {article.intro}
          </Typography>
        )}

        {/* Author and Date */}
        {!isRelatedArticle && (
          <div className="flex items-center justify-between text-sm text-secondary-foreground">
            <div className="flex items-center space-x-3">
              {article.author.avatar && (
                <Image
                  src={article.author.avatar.asset.url}
                  alt={article.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <div>
                <Link
                  href={`/authors/${article.author.slug.current}`}
                  className="font-medium hover:text-accent transition-colors"
                >
                  {article.author.name}
                </Link>
              </div>
            </div>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
        )}

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag.slug.current}
                href={`/tags/${tag.slug.current}`}
                className="px-2 py-1 bg-primary hover:bg-accent hover:text-primary text-primary-foreground rounded text-xs transition-colors"
              >
                #{tag.name}
              </Link>
            ))}
            {article.tags.length > 3 && (
              <span className="px-2 py-1 text-xs text-secondary-foreground">
                +{article.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
