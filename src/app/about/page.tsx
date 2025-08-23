import { Typography } from "@/components/ui/Typography";
import Link from "next/link";
import Script from "next/script";

export default async function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    mainEntity: {
      "@type": "Organization",
      name: "Numbers & Nostalgia",
      url: "https://www.numbersandnostalgia.com",
      logo: "https://www.numbersandnostalgia.com/logo.png",
      sameAs: [
        "https://twitter.com/your_twitter",
        "https://www.linkedin.com/company/your_linkedin",
        "https://github.com/your_github",
      ],
    },
    description:
      "Numbers & Nostalgia is a baseball history blog dedicated to uncovering the stories of legendary players, memorable games, and America's pastime.",
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <Script
        type="application/ld+json"
        id="about-page-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          About Numbers & Nostalgia
        </Typography>
        <Typography variant="lead" color="muted">
          Discover the stories behind baseball&apos;s most memorable moments and
          the players who made them unforgettable.
        </Typography>
      </header>

      <section className="space-y-6">
        <Typography variant="h2" className="mb-2">
          Our Mission
        </Typography>
        <Typography variant="p" color="muted">
          Numbers & Nostalgia is dedicated to exploring baseball history through
          engaging storytelling and detailed statistics. We highlight legendary
          players, unforgettable games, and the unique moments that have shaped
          America&apos;s pastime.
        </Typography>

        <Typography variant="h2" className="mb-2">
          Meet Our Writers
        </Typography>
        <Typography variant="p" color="muted">
          Our talented writers bring history to life, combining in-depth
          research with a passion for the game. Learn more about our
          contributors on the{" "}
          <Link href="/authors" className="text-blue-600 underline">
            Authors page
          </Link>
          .
        </Typography>

        <Typography variant="h2" className="mb-2">
          Why We Do It
        </Typography>
        <Typography variant="p" color="muted">
          Baseball is more than just a game, it&apos;s a story of strategy,
          records, and unforgettable characters. Our goal is to share that story
          with fans, enthusiasts, and anyone curious about the rich history of
          the sport.
        </Typography>
      </section>
    </main>
  );
}

export const metadata = {
  title: "About Us | Numbers & Nostalgia",
  description:
    "Learn about Numbers & Nostalgia, a baseball history blog dedicated to uncovering the stories of legendary players, memorable games, and America's pastime.",
};
