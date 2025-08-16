"use client";

import { useState } from "react";
import Link from "next/link";
import { ArticleSearch } from "./ArticleSearch";
import { Menu, ChevronRight } from "lucide-react";
import Drawer from "./ui/Drawer";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-primary sticky top-0 z-50 md:px-20">
      <div className="max-w-6xl mx-auto px-4 border-b-2 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold py-8">
          Numbers & Nostalgia
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks />
        </div>

        <button
          className="md:hidden"
          aria-label="Open Navigation Menu"
          onClick={() => setIsOpen(true)}
        >
          <Menu />
        </button>

        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          direction="right"
        >
          <nav className="space-y-4 mt-8">
            <div className="flex flex-col divide-y divide-secondary-foreground gap-y-5">
              <NavLinks />
              <ArticleSearch />
            </div>
          </nav>
        </Drawer>
      </div>
    </nav>
  );
}

function NavLinks() {
  return (
    <>
      <Link
        href="/articles"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
      >
        Articles
        <ChevronRight className="md:hidden" />
      </Link>
      <Link
        href="/categories"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
      >
        Categories
        <ChevronRight className="md:hidden" />
      </Link>
      <Link
        href="/authors"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
      >
        Authors
        <ChevronRight className="md:hidden" />
      </Link>
      <Link
        href="/about"
        className="flex w-full justify-between md:w-auto hover:text-primary-hover py-5 md:py-0"
      >
        About
        <ChevronRight className="md:hidden" />
      </Link>
    </>
  );
}
