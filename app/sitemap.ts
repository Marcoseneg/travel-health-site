import type { MetadataRoute } from "next";
import { SUPPORTED_COUNTRIES } from "./lib/travelData";
import { DISEASE_LIST } from "./lib/diseaseData";

// ─────────────────────────────────────────────────────────────────────────────
// sitemap.ts
//
// Next.js auto-serves this at /sitemap.xml. Google reads it to know
// what pages exist on the site. We list every page we want indexed,
// with a hint about update frequency and relative priority.
//
// The country and disease pages are generated dynamically from the
// underlying data, so the sitemap stays in sync as you add more.
// ─────────────────────────────────────────────────────────────────────────────

const BASE_URL = "https://travelmed.ch";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // ── Static top-level pages ────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,           lastModified, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/countries`,  lastModified, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE_URL}/diseases`,   lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/outbreaks`,  lastModified, changeFrequency: "daily",   priority: 0.7 },
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

  return [...staticPages, ...countryPages, ...diseasePages];
}
