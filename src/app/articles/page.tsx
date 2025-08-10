// app/articles/page.tsx
import { client } from "@/lib/sanity.client";
import { Article } from "@/types/article";
import { Typography } from "@/components/ui/Typography";
import Image from "next/image";
import Link from "next/link";

// ArticleCard component for the listing
function ArticleCard({ article }: { article: Article }) {
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

export default async function ArticlesPage() {
  // Fetch all published articles
  const articles: Article[] = await client.fetch(`
    *[_type == "article" && status == "published"] | order(publishedAt desc) {
      _id,
      title,
      seoTitle,
      seoDescription,
      slug,
      intro,
      hero {
        asset->{url},
        alt
      },
      author->{
        _id,
        name,
        slug,
        avatar {
          asset->{url}
        }
      },
      category->{
        name,
        slug,
        color
      },
      tags[]->{
        name,
        slug
      },
      publishedAt
    }
  `);

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Page Header */}
      <header className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          All Articles
        </Typography>
        <Typography variant="lead" color="muted">
          Discover our latest insights, tutorials, and stories
        </Typography>
        {articles.length > 0 && (
          <Typography variant="small" color="muted" className="mt-4">
            {articles.length} article{articles.length !== 1 ? "s" : ""}{" "}
            published
          </Typography>
        )}
      </header>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Typography variant="h3" color="muted">
            No articles published yet
          </Typography>
          <Typography variant="p" color="muted">
            Check back soon for new content!
          </Typography>
        </div>
      )}
    </main>
  );
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: "All Articles",
    description: "Browse all our published articles, tutorials, and insights",
  };
}
