// app/lib/utils/formatDate.ts
//
// Small shared helpers used across the article page and guide components.
// Consolidating these here avoids re-implementing the same logic in every file.

/**
 * Format an ISO date string as a short, human-readable date.
 * Example: "2026-05-09" → "May 9, 2026"
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Convert a heading string into a URL-safe slug.
 * Used to generate `id` attributes on H2 headings so the in-page TOC
 * can scroll-link to them.
 * Example: "Why Malarone is my default" → "why-malarone-is-my-default"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // strip punctuation
    .trim()
    .replace(/\s+/g, "-");
}
