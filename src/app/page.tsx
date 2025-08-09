import { client } from "@/lib/sanity.client";
import Link from "next/link";
import Image from "next/image";
import { Article, Category } from "@/types/article";

export default async function HomePage() {
  const articles: Article[] = await client.fetch(`
    *[_type == "article" && status == "published"] | order(publishedAt desc) {
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
    }
  `);

  const featuredArticles = articles.filter((a) => a.featured).slice(0, 2);
  const regularArticles = articles.filter((a) => !a.featured).slice(0, 6);

  return (
    <main className="max-w-6xl mx-auto p-4 space-y-12">
      <header>
        <h1 className="sr-only">Numbers & Nostalgia</h1>
      </header>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold mb-8">Featured Stories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <FeaturedArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Regular Articles */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}

// Featured Article Card Component
function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug.current}`}
      className="group block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
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
        <h3 className="text-2xl text-black font-bold mb-3 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        {article.intro && (
          <p className="text-gray-600 mb-4 line-clamp-3">{article.intro}</p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              by {article.author.name}
            </span>
          </div>
          <time className="text-sm text-gray-500">
            {new Date(article.publishedAt).toLocaleDateString()}
          </time>
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
        <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h3>
        {article.intro && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.intro}
          </p>
        )}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{article.author.name}</span>
          <time>{new Date(article.publishedAt).toLocaleDateString()}</time>
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
      className={`inline-block bg-white/90 backdrop-blur-sm rounded-full font-medium ${sizeClasses}`}
      style={{ color: category.color || "#3B82F6" }}
    >
      {category.name}
    </span>
  );
}
