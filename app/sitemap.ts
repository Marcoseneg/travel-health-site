import type { MetadataRoute } from "next";
import { SUPPORTED_COUNTRIES } from "./lib/travelData";
import { DISEASE_LIST } from "./lib/diseaseData";
import { articles } from "./lib/guidesData";

// ─────────────────────────────────────────────────────────────────────────────
// sitemap.ts
//
// Next.js auto-serves this at /sitemap.xml. Google reads it to know
// what pages exist on the site. We list every page we want indexed,
// with a hint about update frequency and relative priority.
//
// Country, disease, and guide pages are generated dynamically from the
// underlying data, so the sitemap stays in sync as you add more.
//
// Guides: only articles that have actual content (`content` field set)
// are included. Placeholders are excluded so Google doesn't index empty
// "Coming soon" pages.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://travelmed.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // ── Static top-level pages ────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,           lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/countries`,  lastModified, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/diseases`,   lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/outbreaks`,  lastModified, changeFrequency: "hourly",  priority: 0.7 },
    { url: `${BASE_URL}/itinerary`,  lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/guides`,     lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/about`,      lastModified, changeFrequency: "yearly",  priority: 0.4 },
  ];

  // ── One entry per country brief ──────────────────────────────────────────
  const countryPages: MetadataRoute.Sitemap = Object.keys(SUPPORTED_COUNTRIES).map(
    (slug) => ({
      url: `${BASE_URL}/country/${slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // ── One entry per disease ────────────────────────────────────────────────
  const diseasePages: MetadataRoute.Sitemap = DISEASE_LIST.map((slug) => ({
    url: `${BASE_URL}/diseases/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // ── One entry per published guide ────────────────────────────────────────
  // The `content` filter ensures placeholder articles ("Coming soon" pages)
  // are excluded — they'd otherwise be indexed as thin content, which can
  // hurt the site's overall quality signal.
  const guidePages: MetadataRoute.Sitemap = articles
    .filter((a) => a.content)
    .map((a) => ({
      url: `${BASE_URL}/guides/${a.id}`,
      lastModified: new Date(a.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...countryPages, ...diseasePages, ...guidePages];
}
