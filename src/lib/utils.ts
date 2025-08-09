// import { type ClassValue, clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// export function formatDate(date: string) {
//   return new Date(date).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// export function readingTime(text: string) {
//   const wordsPerMinute = 200;
//   const words = text.split(" ").length;
//   return Math.ceil(words / wordsPerMinute);
// }

import { client } from "./sanity.client"; // adjust path if needed
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
