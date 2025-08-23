import { Typography } from "@/components/ui/Typography";

export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto p-4">
      <header className="mb-12 text-center">
        <Typography variant="h1" className="mb-4">
          Contact Us
        </Typography>
        <Typography variant="lead" color="muted">
          We’d love to hear from you! Reach out with any questions or feedback.
        </Typography>
      </header>

      <section className="space-y-6">
        <Typography variant="h2" className="mb-2">
          General Inquiries
        </Typography>
        <Typography variant="p" color="muted">
          For general questions or feedback about Numbers & Nostalgia, email us
          at{" "}
          <a
            href="mailto:numbersandnostalgia@gmail.com"
            className="text-blue-600 underline"
          >
            numbersandnostalgia@gmail.com
          </a>
          .
        </Typography>

        <Typography variant="h2" className="mb-2">
          Feedback and Suggestions
        </Typography>
        <Typography variant="p" color="muted">
          Have ideas for new articles or features? Let us know by sending a
          message to our team via the email above.
        </Typography>

        <Typography variant="h2" className="mb-2">
          Connect on Social Media
        </Typography>
        <Typography variant="p" color="muted">
          Follow us on social media for updates and behind-the-scenes content:
        </Typography>
        <ul className="list-disc list-inside mt-2">
          {/* <li>
            <a
              href="https://twitter.com/your_twitter"
              className="text-blue-600 underline"
            >
              Twitter
            </a>
          </li> */}
          <li>
            <a
              href="https://www.youtube.com/@NumbersNostalgia-z9l"
              className="text-blue-600 underline"
            >
              YouTube
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

export const metadata = {
  title: "Contact Us | Numbers & Nostalgia",
  description:
    "Get in touch with the Numbers & Nostalgia team for questions, feedback, or suggestions about our baseball history blog.",
};
