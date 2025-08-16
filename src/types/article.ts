import { PortableTextBlock } from "@portabletext/types";

export type Author = {
  _id: string;
  name: string;
  slug: { current: string };
  avatar?: {
    asset: {
      url: string;
    };
  };
  bio?: string;
};

export type Category = {
  _id: string;
  name: string;
  slug: { current: string };
  color?: string;
  description?: string;
};

export type Tag = {
  _id: string;
  name: string;
  slug: { current: string };
};

export type CTA = {
  text: string;
  href: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
};

export type Article = {
  _id: string;
  title: string;
  seoTitle?: string;
  seoDescription?: string;
  slug: { current: string };
  intro?: string;
  body?: PortableTextBlock[];
  hero?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author: Author;
  category: Category;
  tags?: Tag[];
  publishedAt: string;
  featured: boolean;
  status: "draft" | "published" | "archived";
  conclusion?: string;
  quote?: {
    text: string;
    author: string;
    authorTitle?: string;
  };
  gallery?: Array<{
    _type: "galleryImage" | "galleryVideo";
    image?: {
      asset: { url: string };
    };
    caption?: string;
    alt?: string;
    url?: string;
  }>;
  relatedArticles?: Article[];
  ctaBlocks?: CTA[];
  showTableOfContents: boolean;
  showNewsletterSignup: boolean;
};
