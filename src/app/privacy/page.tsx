import { Typography } from "@/components/ui/Typography";

export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <header className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          Privacy Policy
        </Typography>
        <Typography variant="lead" color="muted">
          Your privacy is important to us. Learn how we handle your data.
        </Typography>
      </header>

      <section className="space-y-6">
        <Typography variant="h2" className="mb-2">
          Information We Collect
        </Typography>
        <Typography variant="p" color="muted">
          We may collect information such as cookies, analytics data, and any
          data you provide when contacting us. This information helps us improve
          your experience.
        </Typography>

        <Typography variant="h2" className="mb-2">
          How We Use Your Information
        </Typography>
        <Typography variant="p" color="muted">
          Information is used to provide better service, improve our website,
          and respond to inquiries. We do not sell or share your personal
          information with third parties for marketing purposes.
        </Typography>

        <Typography variant="h2" className="mb-2">
          Contact Us
        </Typography>
        <Typography variant="p" color="muted">
          If you have questions about our privacy practices, you can reach us
          through our{" "}
          <a href="/contact" className="text-blue-600 underline">
            Contact page
          </a>
          .
        </Typography>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Privacy Policy | Numbers & Nostalgia",
  description:
    "Read the Privacy Policy of Numbers & Nostalgia to learn how we collect, use, and protect your data.",
};
