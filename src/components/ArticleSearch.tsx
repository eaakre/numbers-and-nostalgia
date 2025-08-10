"use client";

import { useState, useEffect } from "react";
import { client } from "@/lib/sanity.client";
import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";

export function ArticleSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchTimeout = setTimeout(async () => {
      setIsLoading(true);

      try {
        const searchResults = await client.fetch<Article[]>(
          /* groq */ `
            *[_type == "article" && status == "published" && (
              title match $searchTerm + "*" ||
              intro match $searchTerm + "*" ||
              pt::text(body) match $searchTerm + "*"
            )] | order(_score desc) [0...5] {
              _id,
              title,
              slug,
              intro,
              hero {
                asset->{url},
                alt
              },
              author->{name}
            }
          `,
          { searchTerm: query }
        );

        setResults(searchResults);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="search"
        placeholder="Search articles..."
        aria-label="Search articles"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {query.length >= 2 && (isLoading || results.length > 0) && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : (
            <div className="py-2">
              {results.map((article) => (
                <Link
                  key={article._id}
                  href={`/articles/${article.slug.current}`}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  onClick={() => setQuery("")}
                >
                  {article.hero?.asset?.url && (
                    <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={article.hero.asset.url}
                        alt={article.hero.alt || article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {article.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      by {article.author.name}
                    </p>
                  </div>
                </Link>
              ))}
              {results.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No articles found for &quot;{query}&quot;
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
