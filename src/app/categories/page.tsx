import { client } from "@/lib/sanity.client";
import Link from "next/link";
import Image from "next/image";
import { Typography } from "@/components/ui/Typography";

type Category = {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  color?: string;
  image?: { asset: { url: string } };
};

export default async function CategoriesPage() {
  const categories: Category[] = await client.fetch(
    `*[_type == "category"]{
      _id,
      name,
      slug,
      description,
      color,
      image{asset->{url}}
    }`,
    {},
    { next: { revalidate: 900 } }
  );

  return (
    <main className="max-w-6xl mx-auto p-4">
      <Typography variant="h1">Categories</Typography>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/categories/${cat.slug.current}`}
            className="group block rounded-lg border p-4 shadow hover:shadow-md transition"
          >
            {cat.image?.asset?.url && (
              <div className="relative aspect-video mb-4 overflow-hidden rounded">
                <Image
                  src={cat.image.asset.url}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
            )}
            <Typography variant="h2" className="text-lg font-bold">
              {cat.name}
            </Typography>
            {cat.description && (
              <Typography
                variant="p"
                className="text-gray-600 mt-2 line-clamp-2"
              >
                {cat.description}
              </Typography>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}
