import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/utils";
import { PortableTextComponents } from "@portabletext/react";
import { CTAButton } from "./CTAButton";
import { Typography } from "./ui/Typography";

export const CustomPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      const imgUrl = urlFor(value).url();
      return (
        <figure className="my-8">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={imgUrl}
              alt={value.alt || value.caption || ""}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-secondary-foreground mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    callout: ({ value }) => {
      const typeStyles = {
        info: "bg-secondary-foreground border-primary-foreground text-secondary",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        success: "bg-green-50 border-green-200 text-green-800",
        error: "bg-red-50 border-red-200 text-red-800",
      };

      const iconMap = {
        info: "💡",
        warning: "⚠️",
        success: "✅",
        error: "❌",
      };

      return (
        <div
          className={`border-l-4 p-4 my-6 rounded-r-lg ${typeStyles[value.type as keyof typeof typeStyles]}`}
        >
          <div className="flex items-start space-x-3">
            <span className="text-2xl">
              {iconMap[value.type as keyof typeof iconMap]}
            </span>
            <div>
              {value.title && (
                <Typography
                  variant="h4"
                  color="background-secondary"
                  className="mb-1"
                >
                  {value.title}
                </Typography>
              )}
              <p className="text-sm">{value.content}</p>
            </div>
          </div>
        </div>
      );
    },

    internalLink: ({ value }) => {
      if (!value?.reference?._type || !value?.reference?.slug?.current)
        return null;

      return (
        <div className="my-6 p-4 rounded-lg border-l-4 border-secondary">
          <div className="flex items-center space-x-2">
            <span>🔗</span>
            <Link
              href={`/${value.reference._type}s/${value.reference.slug.current}`}
              className="text-secondary-foreground hover:primary-hover font-medium"
            >
              {value.linkText || value.reference.title}
            </Link>
          </div>
        </div>
      );
    },

    video: ({ value }) => {
      // Helper: convert normal YouTube URLs to embed URLs
      const getYouTubeEmbedUrl = (url: string) => {
        try {
          const parsed = new URL(url);
          if (parsed.hostname.includes("youtu.be")) {
            // Short link: https://youtu.be/VIDEO_ID
            return `https://www.youtube.com/embed/${parsed.pathname.slice(1)}`;
          } else if (parsed.hostname.includes("youtube.com")) {
            const videoId = parsed.searchParams.get("v");
            return `https://www.youtube.com/embed/${videoId}`;
          }
          return url; // fallback
        } catch {
          return url;
        }
      };

      const embedUrl = getYouTubeEmbedUrl(value.url);

      return (
        <figure className="my-8">
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              className="w-full h-full"
              allowFullScreen
              title={value.caption || "Video embed"}
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-secondary-foreground mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    cta: ({ value }) => (
      <div className="my-8 text-center">
        <div className="inline-block p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <CTAButton {...value} />
        </div>
      </div>
    ),
  },

  block: {
    h1: ({ children }) => (
      <Typography variant="h1" className="mt-12">
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h2" className="mt-10">
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h3" className="mt-8">
        {children}
      </Typography>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 my-6 italic text-lg text-secondary-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <Typography variant="p" color="secondary" className="mt-4">
        {children}
      </Typography>
    ),
  },

  marks: {
    link: ({ children, value }) => (
      <Link
        href={value.href}
        target={value.blank ? "_blank" : "_self"}
        rel={value.blank ? "noopener noreferrer" : undefined}
        className="text-secondary-foreground hover:primary-hover underline"
      >
        {children}
      </Link>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};
