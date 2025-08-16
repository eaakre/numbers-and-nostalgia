import { client } from "@/lib/sanity.client";
import { Article } from "@/types/article";
import { Typography } from "@/components/ui/Typography";
import { ArticleCard } from "@/components/ArticleCard";
import Image from "next/image";
import { notFound } from "next/navigation";

type Author = {
  _id: string;
  name: string;
  slug: { current: string };
  avatar?: {
    asset: { url: string };
  };
  bio?: string;
  email?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
};

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  // Fetch the author details
  const author: Author | null = await client.fetch(
    `
    *[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      avatar {
        asset->{url}
      },
      bio,
      email,
      website,
      socialMedia
    }
    `,
    { slug },
    { next: { revalidate: 900 } }
  );

  if (!author) {
    notFound();
  }

  // Fetch articles by this author
  const articles: Article[] = await client.fetch(
    `
    *[_type == "article" && status == "published" && author->slug.current == $slug] 
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
    { slug },
    { next: { revalidate: 900 } }
  );

  return (
    <main className="max-w-6xl mx-auto p-4">
      {/* Author Header */}
      <header className="mb-12 text-center">
        {author.avatar?.asset?.url && (
          <div className="mb-6">
            <Image
              src={author.avatar.asset.url}
              alt={author.name}
              width={120}
              height={120}
              className="rounded-full mx-auto object-cover"
            />
          </div>
        )}
        <Typography variant="h1" className="mb-4">
          {author.name}
        </Typography>
        {author.bio && (
          <Typography variant="lead" color="muted" className="mb-6">
            {author.bio}
          </Typography>
        )}

        {/* Contact/Social Links */}
        <div className="flex justify-center gap-4 flex-wrap mb-6">
          {author.email && (
            <a
              href={`mailto:${author.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Email
            </a>
          )}
          {author.website && (
            <a
              href={author.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Website
            </a>
          )}
          {author.socialMedia?.twitter && (
            <a
              href={`https://twitter.com/${author.socialMedia.twitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
          )}
          {author.socialMedia?.linkedin && (
            <a
              href={author.socialMedia.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          )}
          {author.socialMedia?.github && (
            <a
              href={`https://github.com/${author.socialMedia.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </a>
          )}
        </div>

        {articles.length > 0 && (
          <Typography variant="small" color="muted">
            {articles.length} article{articles.length !== 1 ? "s" : ""}{" "}
            published
          </Typography>
        )}
      </header>

      {/* Articles */}
      {articles.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Typography variant="h3" color="muted">
            No published articles yet
          </Typography>
          <Typography variant="small" color="muted" className="mt-2">
            This author hasn't published any articles yet.
          </Typography>
        </div>
      )}
    </main>
  );
}

// Generate metadata for author pages
export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{ name, bio }`,
    { slug }
  );

  if (!author) {
    return {
      title: "Author Not Found",
    };
  }

  return {
    title: `${author.name} - Author`,
    description: author.bio || `Articles and posts by ${author.name}`,
  };
}
