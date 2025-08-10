"use client";
import { useState, useEffect } from "react";
import { PortableTextBlock, PortableTextSpan } from "@portabletext/types";
import { slugify } from "@/lib/slugify"; // shared helper

type TOCItem = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents({ body }: { body: PortableTextBlock[] }) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings: TOCItem[] = body
      .filter(
        (block) =>
          block._type === "block" &&
          ["h1", "h2", "h3"].includes(block.style || "")
      )
      .map((block) => {
        const text =
          block.children
            ?.map((child) =>
              (child as PortableTextSpan)?._type === "span"
                ? (child as PortableTextSpan).text
                : ""
            )
            .join("") || "";

        return {
          id: slugify(text),
          text,
          level: block.style === "h1" ? 1 : block.style === "h2" ? 2 : 3,
        };
      });

    setTocItems(headings);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    const headingElements = document.querySelectorAll("h1, h2, h3");
    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [body]);

  if (tocItems.length === 0) return null;

  return (
    <nav className="bg-white p-6 rounded-lg shadow-sm border">
      <h4 className="font-semibold text-gray-900 mb-4">Table of Contents</h4>
      <ul className="space-y-2">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors hover:text-blue-600 ${
                activeId === item.id
                  ? "text-blue-600 font-medium"
                  : "text-gray-600"
              } ${item.level > 1 ? `ml-${(item.level - 1) * 4}` : ""}`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
