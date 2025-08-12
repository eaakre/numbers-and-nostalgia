// app/articles/page.tsx
import { client } from "@/lib/sanity.client";
import { Article } from "@/types/article";
import { Typography } from "@/components/ui/Typography";
import { ArticleCard } from "@/components/ArticleCard";

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
