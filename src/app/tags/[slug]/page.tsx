import { client } from "@/lib/sanity.client";
import { Article } from "@/types/article";
import { Typography } from "@/components/ui/Typography";
import { ArticleCard } from "@/app/articles/page";

type TagPageProps = {
  params: { slug: string };
};

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = params;

  // Fetch articles with a matching tag slug
  const articles: Article[] = await client.fetch(
    `
    *[_type == "article" && status == "published" && "${slug}" in tags[]->slug.current] 
      | order(publishedAt desc) {
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
    `,
    { slug }
  );

  // Get the tag name for header (optional)
  const tag = await client.fetch(
    `*[_type == "tag" && slug.current == $slug][0]{ name }`,
    { slug }
  );

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          Articles tagged with “{tag?.name || slug}”
        </Typography>
        <Typography variant="lead" color="muted">
          Explore all articles related to this topic
        </Typography>
        {articles.length > 0 && (
          <Typography variant="small" color="muted" className="mt-4">
            {articles.length} article{articles.length !== 1 ? "s" : ""} found
          </Typography>
        )}
      </header>

      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Typography variant="h3" color="muted">
            No articles found for this tag
          </Typography>
        </div>
      )}
    </main>
  );
}

// Optional: dynamic metadata
export async function generateMetadata({ params }: TagPageProps) {
  const tag = await client.fetch(
    `*[_type == "tag" && slug.current == $slug][0]{ name }`,
    { slug: params.slug }
  );

  return {
    title: tag?.name ? `Articles tagged "${tag.name}"` : "Tag",
    description: tag?.name
      ? `Browse all articles tagged with ${tag.name}`
      : "Articles by tag",
  };
}
