import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/utils";
import { PortableTextComponents } from "@portabletext/react";
import { CTAButton } from "./CTAButton";

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
            <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },

    callout: ({ value }) => {
      const typeStyles = {
        info: "bg-blue-50 border-blue-200 text-blue-800",
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
                <h4 className="font-semibold mb-1">{value.title}</h4>
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
        <div className="my-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center space-x-2">
            <span className="text-blue-600">🔗</span>
            <Link
              href={`/${value.reference._type}s/${value.reference.slug.current}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {value.linkText || value.reference.title}
            </Link>
          </div>
        </div>
      );
    },

    video: ({ value }) => (
      <figure className="my-8">
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={value.url}
            className="w-full h-full"
            allowFullScreen
            title={value.caption || "Video embed"}
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-600 mt-2 italic">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),

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
      <h1 className="text-4xl font-bold mt-12 mb-6 text-gray-900">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-10 mb-4 text-gray-900">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-8 mb-3 text-gray-900">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-6 my-6 italic text-lg text-gray-700">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-gray-700">{children}</p>
    ),
  },

  marks: {
    link: ({ children, value }) => (
      <Link
        href={value.href}
        target={value.blank ? "_blank" : "_self"}
        rel={value.blank ? "noopener noreferrer" : undefined}
        className="text-blue-600 hover:text-blue-800 underline"
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
