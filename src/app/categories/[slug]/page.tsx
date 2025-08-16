import { client } from "@/lib/sanity.client";
import { Article, Category } from "@/types/article";
import { Typography } from "@/components/ui/Typography";
import { ArticleCard } from "@/components/ArticleCard";
import { notFound } from "next/navigation";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category: Category | null = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{
      _id,
      name,
      description
    }`,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!category) {
    notFound();
  }
  // Fetch articles with a matching tag slug
  const articles: Article[] = await client.fetch(
    `
    *[_type == "article" && status == "published" && category->slug.current == $slug] 
      | order(publishedAt desc){
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
    { slug },
    { next: { revalidate: 900 } }
  );

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header>
        <Typography variant="h1">{category.name}</Typography>
        {category.description && (
          <Typography variant="p" className="text-gray-600 mt-2">
            {category.description}
          </Typography>
        )}
      </header>

      {articles.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </main>
  );
}

// Optional: dynamic metadata
export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const tag = await client.fetch(
    `*[_type == "tag" && slug.current == $slug][0]{ name }`,
    { slug }
  );

  return {
    title: tag?.name ? `Articles tagged "${tag.name}"` : "Tag",
    description: tag?.name
      ? `Browse all articles tagged with ${tag.name}`
      : "Articles by tag",
  };
}
