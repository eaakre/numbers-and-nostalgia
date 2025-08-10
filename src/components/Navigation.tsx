import Link from "next/link";
import { ArticleSearch } from "./ArticleSearch";

export function Navigation() {
  return (
    <nav className="bg-primary sticky top-0 z-50 md:px-20">
      <div className="max-w-6xl mx-auto px-4 border-b-2 ">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            Numbers & Nostalgia
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/articles"
              className="hover:text-primary-hover hover:scale-105 transition-colors"
            >
              Articles
            </Link>
            <Link
              href="/categories"
              className="hover:text-primary-hover hover:scale-105 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/authors"
              className="hover:text-primary-hover hover:scale-105 transition-colors"
            >
              Authors
            </Link>
            <Link
              href="/about"
              className="hover:text-primary-hover hover:scale-105 transition-colors"
            >
              About
            </Link>
          </div>

          <div className="w-64">
            <ArticleSearch />
          </div>
        </div>
      </div>
    </nav>
  );
}
