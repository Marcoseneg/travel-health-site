// ─────────────────────────────────────────────────────────────────────────────
// Insights system types
//
// "Insights" are in-depth, physician-authored analysis pieces — study/paper
// reviews, vaccine deep-dives, and public-health commentary. They are distinct
// from "Guides" (practical how-to content): Insights are evidence-led editorial
// for clinicians and informed travelers.
// ─────────────────────────────────────────────────────────────────────────────

export type InsightCategory =
  | "expert-analysis"
  | "paper-review"
  | "public-health"
  | "data-insight"
  | "outbreak-analysis";

export type Insight = {
  /** URL slug — the /insights/[slug] route key. */
  id: string;
  /** Human date, ISO string (YYYY-MM-DD). */
  date: string;
  title: string;
  /** One-line summary shown in cards and under the title. */
  subtitle: string;
  category: InsightCategory;
  /** Author byline — defaults to the site physician. */
  author: string;
  /** Estimated reading time in minutes. */
  readingTime: number;
  tags?: string[];
  /** Markdown body. */
  content: string;
  /** Optional self-hosted cover image (under /public/images/insights/...). */
  coverImage?: { src: string; alt: string; credit?: string };
  /** Gradient fallback used for cards/headers when no coverImage is set. */
  coverGradient?: string;
  /** Surfaced in the homepage research strip + disease-page right rail. */
  featured?: boolean;
  /**
   * Primary peer-reviewed source this article discusses. Rendered as a
   * "cited study" card in the article rail and as schema.org `citation` in the
   * Article JSON-LD, so readers (and crawlers) can verify the source.
   */
  citation?: {
    authors: string;
    title: string;
    journal: string;
    year: string;
    url: string;
  };
};
