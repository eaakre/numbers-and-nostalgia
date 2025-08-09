"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Replace with your newsletter signup logic
    try {
      // await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-2xl font-bold mb-2">Stay in the Loop</h3>
        <p className="mb-6 opacity-90">
          Get the latest stories and insights delivered to your inbox weekly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading"}
            className="w-full px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <p className="mt-4 text-green-200">Thanks for subscribing!</p>
        )}
        {status === "error" && (
          <p className="mt-4 text-red-200">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
