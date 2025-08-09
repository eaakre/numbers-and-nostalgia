import { client } from "@/lib/sanity.client";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await client.fetch(
    `
    *[_type == "article" && slug.current == $slug][0] {
      title,
      seoTitle,
      seoDescription,
      hero {
        asset->{url}
      }
    }
  `,
    { slug: params.slug }
  );

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription,
    openGraph: {
      title: article.seoTitle || article.title,
      description: article.seoDescription,
      images: article.hero ? [article.hero.asset.url] : [],
    },
  };
}

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
