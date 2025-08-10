import { client } from "@/lib/sanity.client";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/article";
import { CustomPortableTextComponents } from "@/components/PortableTextComponents";
import { CTAButton } from "@/components/CTAButton";
import EmblaGallery from "@/components/EmblaGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  const article: Article = await client.fetch(
    `
    *[_type == "article" && slug.current == $slug && status == "published"][0] {
      _id,
      title,
      seoTitle,
      seoDescription,
      slug,
      intro,
      body,
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
        },
        bio
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
      publishedAt,
      conclusion,
      quote,
      gallery[] {
        _type,
        _type == "galleryImage" => {
          image {
            asset->{url}
          },
          caption,
          alt
        },
        _type == "galleryVideo" => {
          url,
          caption
        }
      },
      relatedArticles[]->{
        _id,
        title,
        slug,
        intro,
        hero {
          asset->{url},
          alt
        },
        author->{name}
      },
      ctaBlocks,
      showNewsletterSignup
    }
  `,
    { slug }
  );

  if (!article) {
    notFound();
  }

  console.log({ article });
  return (
    <article className="max-w-6xl mx-auto p-4">
      {/* Article Header */}
      <header className="mb-8">
        {/* <div className="mb-4">
          <CategoryBadge category={article.category} />
        </div> */}

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {article.title}
        </h1>

        {article.intro && (
          <p className="text-xl text-secondary-foreground leading-relaxed mb-6">
            {article.intro}
          </p>
        )}

        <div className="flex items-center space-x-4 pb-6 border-b">
          {article.author.avatar && (
            <Image
              src={article.author.avatar.asset.url}
              alt={article.author.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div>
            <Link
              href={`/authors/${article.author.slug.current}`}
              className="font-semibold text-secondary-foreground hover:primary-hover transition-colors"
            >
              {article.author.name}
            </Link>
            <div className="text-sm text-secondary-foreground">
              {new Date(article.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {article.hero && (
        <div className="aspect-video relative rounded-lg overflow-hidden mb-8">
          <Image
            src={article.hero.asset.url}
            alt={article.hero.alt || article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Body */}
      <div className="prose prose-lg max-w-none mb-8">
        <PortableText
          value={article.body}
          components={CustomPortableTextComponents}
        />
      </div>

      {/* Featured Quote */}
      {article.quote && (
        <blockquote className="border-l-4 border-secondary-foreground pl-6 my-8 bg-secondary p-6 rounded-r-lg">
          <p className="text-xl italic text-secondary-foreground mb-2">
            &quot;{article.quote.text}&quot;
          </p>
          <cite className="not-italic">
            — {article.quote.author}
            {article.quote.authorTitle && (
              <span className="text-sm">, {article.quote.authorTitle}</span>
            )}
          </cite>
        </blockquote>
      )}

      {/* Gallery */}
      {article.gallery && article.gallery.length > 0 && (
        <EmblaGallery items={article.gallery} />
      )}

      {/* Conclusion */}
      {article.conclusion && (
        <div className="bg-secondary p-6 rounded-lg my-8">
          <h3 className="text-xl font-semibold mb-3">Conclusion</h3>
          <p className="text-secondary-foreground">{article.conclusion}</p>
        </div>
      )}

      {/* CTA Blocks */}
      {article.ctaBlocks && article.ctaBlocks.length > 0 && (
        <div className="space-y-4 my-8">
          {article.ctaBlocks.map((cta, index) => (
            <div key={index} className="text-center">
              <CTAButton {...cta} />
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 my-8">
          {article.tags.map((tag) => (
            <Link
              key={tag.slug.current}
              href={`/tags/${tag.slug.current}`}
              className="px-3 py-1 bg-primary-foreground hover:bg-secondary-foreground rounded-full text-sm text-primary transition-colors"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      {/* Related Articles */}
      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <section className="mt-12 pt-8 border-t">
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* {article.relatedArticles.map((related) => (
              <ArticleCard key={related._id} article={related} />
            ))} */}
          </div>
        </section>
      )}
    </article>
  );
}
