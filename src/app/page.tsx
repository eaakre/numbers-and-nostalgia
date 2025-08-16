import { client } from "@/lib/sanity.client";
import Link from "next/link";
import Image from "next/image";
import { Article, Category } from "@/types/article";
import { Typography } from "@/components/ui/Typography";

export default async function HomePage() {
  const articles: Article[] = await client.fetch(
    `*[_type == "article" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    intro,
    hero {
      asset->{url},
      alt
    },
    author->{
      name,
      slug
    },
    category->{
      name,
      slug,
      color
    },
    publishedAt,
    featured
  }`,
    {},
    { next: { revalidate: 60 } }
  );

  const featuredArticles = articles.filter((a) => a.featured).slice(0, 2);
  const regularArticles = articles.filter((a) => !a.featured).slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header>
        <Typography variant="h1" className="sr-only">
          Numbers & Nostalgia
        </Typography>
      </header>

      <div className="space-y-12">
        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section>
            <Typography variant="h2">Featured Stories</Typography>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <FeaturedArticleCard key={article._id} article={article} />
              ))}
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section>
          <Typography variant="h2">Latest Articles</Typography>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

// Featured Article Card Component
function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug.current}`}
      className="group block bg-foreground rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      {article.hero && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={article.hero.asset.url}
            alt={article.hero.alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <CategoryBadge category={article.category} />
          </div>
        </div>
      )}
      <div className="p-6">
        <Typography
          variant="h3"
          color="background"
          className="font-bold mb-3 group-hover:text-secondary transition-colors"
        >
          {article.title}
        </Typography>
        {article.intro && (
          <Typography
            variant="p"
            color="background-secondary"
            className="mb-4 line-clamp-3"
          >
            {article.intro}
          </Typography>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Typography variant="small" color="background-secondary">
              by {article.author.name}
            </Typography>
          </div>
          <Typography variant="small" color="background-secondary">
            <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
          </Typography>
        </div>
      </div>
    </Link>
  );
}

// Regular Article Card Component
function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug.current}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {article.hero && (
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={article.hero.asset.url}
            alt={article.hero.alt || article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3">
            <CategoryBadge category={article.category} size="sm" />
          </div>
        </div>
      )}
      <div className="p-4">
        <Typography
          variant="h3"
          color="background"
          className="font-bold mb-3 group-hover:text-secondary transition-colors"
        >
          {article.title}
        </Typography>
        {article.intro && (
          <Typography
            variant="p"
            color="background-secondary"
            className="mb-4 line-clamp-3"
          >
            {article.intro}
          </Typography>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <Typography variant="small" color="background-secondary">
            by {article.author.name}
          </Typography>
          <Typography variant="small" color="background-secondary">
            <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
          </Typography>
        </div>
      </div>
    </Link>
  );
}

// Category Badge Component
function CategoryBadge({
  category,
  size = "default",
}: {
  category: Category;
  size?: "sm" | "default";
}) {
  const sizeClasses = size === "sm" ? "px-2 py-1 text-xs" : "px-3 py-1 text-sm";

  return (
    <span
      className={`inline-block bg-primary-foreground text-primary backdrop-blur-sm rounded-full font-medium ${sizeClasses}`}
    >
      {category.name}
    </span>
  );
}
