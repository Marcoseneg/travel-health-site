import "./globals.css";
import SiteHeader from "./components/SiteHeader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

const SITE_URL = "https://travelmed.ch";
const SITE_DESCRIPTION =
  "Evidence-based vaccine recommendations, malaria prophylaxis, outbreak alerts, and destination-specific prevention advice for international travelers.";

// ─────────────────────────────────────────────────────────────────────────────
// Page metadata
//
// `metadataBase` is required for OpenGraph and Twitter image URLs to resolve
// correctly across all pages — without it, Next.js logs a build-time warning
// and uses a generic localhost-ish base.
//
// The `title.template` lets child pages set just their own page title and
// have it composed automatically (e.g. "Botswana · TravelMed").
// ─────────────────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TravelMed — Physician-Built Travel Health",
    template: "%s · TravelMed",
  },
  description: SITE_DESCRIPTION,
  applicationName: "TravelMed",
  authors: [{ name: "Marco Seneghini, MD" }],
  creator: "Marco Seneghini, MD",
  publisher: "TravelMed",
  openGraph: {
    type: "website",
    siteName: "TravelMed",
    title: "TravelMed — Physician-Built Travel Health",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TravelMed — Physician-Built Travel Health",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      // Inline SVG favicon: tilted-globe glyph in cyan on transparent
      // — matches the header logo. Keeps the bundle small (no PNG).
      {
        url:
          "data:image/svg+xml;utf8," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="9" stroke="%237dd3fc" stroke-width="1.6" fill="none"/><ellipse cx="16" cy="16" rx="9" ry="3.5" stroke="%237dd3fc" stroke-width="1.2" fill="none"/><line x1="7" y1="16" x2="25" y2="16" stroke="%237dd3fc" stroke-width="1.2"/></svg>`
          ),
      },
    ],
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Structured data (JSON-LD)
//
// Sent to Google to describe the site. Two blocks:
//
//   1. WebSite — declares the site identity and a SearchAction so Google
//      knows how to deep-link to internal search.
//   2. ItemList of SiteNavigationElement — explicitly tells Google what
//      the main sections are. This is the single biggest signal you can
//      give for sitelinks (the subpage links under your search result).
//
// You cannot force Google to show sitelinks, but without this markup it
// has to guess your structure from internal links alone.
// ─────────────────────────────────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TravelMed",
  alternateName: "TravelMed.ch",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/countries?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const navSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "TravelMed main navigation",
  itemListElement: [
    { "@type": "SiteNavigationElement", position: 1, name: "Countries",  url: `${SITE_URL}/countries` },
    { "@type": "SiteNavigationElement", position: 2, name: "Diseases",   url: `${SITE_URL}/diseases` },
    { "@type": "SiteNavigationElement", position: 3, name: "Outbreaks",  url: `${SITE_URL}/outbreaks` },
    { "@type": "SiteNavigationElement", position: 4, name: "Itinerary",  url: `${SITE_URL}/itinerary` },
    { "@type": "SiteNavigationElement", position: 5, name: "Guides",     url: `${SITE_URL}/guides` },
    { "@type": "SiteNavigationElement", position: 6, name: "About",      url: `${SITE_URL}/about` },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Apply the saved theme before first paint to avoid a flash.
            Light is the default; dark is opt-in via the header toggle. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();",
          }}
        />
      </head>
      <body
        style={{
          background: "var(--c-bg)",
          color: "var(--c-text)",
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        <SiteHeader />
        {children}

        {/* Structured data — invisible to users, read by search crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(navSchema) }}
        />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
