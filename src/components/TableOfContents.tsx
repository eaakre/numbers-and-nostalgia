"use client";
import { useState, useEffect } from "react";
import { PortableTextBlock, PortableTextSpan } from "@portabletext/types";

type TOCItem = {
  id: string;
  text: string;
  level: number;
  children?: TOCItem[];
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function TableOfContents({ body }: { body: PortableTextBlock[] }) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Step 1: Extract headings from Portable Text
    const flatHeadings: TOCItem[] = body
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
          children: [],
        };
      });

    // Step 2: Nest headings
    const nested: TOCItem[] = [];
    let lastH1: TOCItem | null = null;
    let lastH2: TOCItem | null = null;

    flatHeadings.forEach((heading) => {
      if (heading.level === 1) {
        nested.push(heading);
        lastH1 = heading;
        lastH2 = null;
      } else if (heading.level === 2) {
        if (lastH1) {
          lastH1.children?.push(heading);
          lastH2 = heading;
        } else {
          nested.push(heading); // no h1 before
        }
      } else if (heading.level === 3) {
        if (lastH2) {
          lastH2.children?.push(heading);
        } else if (lastH1) {
          lastH1.children?.push(heading);
        } else {
          nested.push(heading); // orphan
        }
      }
    });

    setTocItems(nested);

    // Step 3: Observe active headings
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

  const renderItems = (items: TOCItem[]) => (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={`block text-sm transition-colors hover:primary-hover ${
              activeId === item.id
                ? "text-accent font-medium"
                : "text-secondary-foreground"
            }`}
          >
            {item.text}
          </a>
          {item.children && item.children.length > 0 && (
            <div className="ml-4">{renderItems(item.children)}</div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <nav className="bg-secondary p-6 rounded-lg shadow-sm border">
      <h4 className="font-semibold mb-4">Table of Contents</h4>
      {renderItems(tocItems)}
    </nav>
  );
}
