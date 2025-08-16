import { client } from "@/lib/sanity.client";
import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import Image from "next/image";

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
  articleCount: number;
};

export default async function AuthorsPage() {
  const authors: Author[] = await client.fetch(
    `
    *[_type == "author"] | order(name asc) {
      _id,
      name,
      slug,
      avatar {
        asset->{url}
      },
      bio,
      email,
      website,
      socialMedia,
      "articleCount": count(*[_type == "article" && status == "published" && references(^._id)])
    }
    `,
    {},
    { next: { revalidate: 900 } }
  );

  return (
    <main className="max-w-6xl mx-auto p-4">
      <header className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          Authors
        </Typography>
        <Typography variant="lead" color="muted">
          Meet the talented writers behind our content
        </Typography>
        {authors.length > 0 && (
          <Typography variant="small" color="muted" className="mt-4">
            {authors.length} author{authors.length !== 1 ? "s" : ""}
          </Typography>
        )}
      </header>

      {authors.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <Link
              key={author._id}
              href={`/authors/${author.slug.current}`}
              className="block bg-card rounded-lg p-6 border hover:shadow-lg transition-shadow"
            >
              <div className="text-center">
                {author.avatar?.asset?.url && (
                  <div className="mb-4">
                    <Image
                      src={author.avatar.asset.url}
                      alt={author.name}
                      width={80}
                      height={80}
                      className="rounded-full mx-auto object-cover"
                    />
                  </div>
                )}
                <Typography variant="h3" className="mb-2">
                  {author.name}
                </Typography>
                {author.bio && (
                  <Typography variant="small" color="muted" className="mb-3">
                    {author.bio}
                  </Typography>
                )}
                <Typography variant="small" color="muted">
                  {author.articleCount} article
                  {author.articleCount !== 1 ? "s" : ""}
                </Typography>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Typography variant="h3" color="muted">
            No authors found
          </Typography>
        </div>
      )}
    </main>
  );
}

export const metadata = {
  title: "Authors",
  description: "Meet the talented writers behind our content",
};
