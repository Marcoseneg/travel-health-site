import type { MetadataRoute } from "next";

// ─────────────────────────────────────────────────────────────────────────────
// robots.ts
//
// Next.js auto-serves this at /robots.txt. It tells search engine
// crawlers what they can and cannot index.
//
// Defaults: allow everything except the API and Next.js internals.
// Points crawlers at the sitemap so they discover all pages.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://travelmed.ch";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
