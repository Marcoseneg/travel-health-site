// ─────────────────────────────────────────────────────────────────────────────
// Article system types
// ─────────────────────────────────────────────────────────────────────────────
//
// Defines the shape of a guide article. Each article lives in its own file
// in this folder; `index.ts` assembles them into the `articles` array that
// the rest of the app imports.

export type ArticleCategory =
  | "gear-review"
  | "destination-guide"
  | "prevention"
  | "travel-story"
  | "explainer";

export type QuickRecCard = {
  /** Emoji shown in the round badge at top-left of the card */
  icon: string;
  /** Short uppercase tag describing when this advice applies */
  scenario: string;
  /** The actual recommendation — drug name, action, or "Avoid X" */
  recommendation: string;
  /** Optional fine-print line (e.g. generic name, dosing schedule) */
  detail?: string;
};

/**
 * One row in the "Quick facts" box rendered at the top of an article.
 * Used for at-a-glance reference data — risk areas, dosing schedule,
 * cost range, key contraindications.
 */
export type QuickFact = {
  /** Emoji shown at the left of the fact row */
  icon: string;
  /** Short label, e.g. "First-line Rx" */
  label: string;
  /** The actual value, e.g. "Atovaquone-proguanil (Malarone)" */
  value: string;
};

/**
 * Optional cover photo for the article. When set, the article page
 * renders a full-bleed photographic hero with title overlay instead
 * of the default contained gradient + SVG cover. Best suited for
 * destination guides where a real-place photograph carries more
 * editorial weight than an illustration.
 */
export type CoverImage = {
  /** Public-relative path, e.g. "/images/articles/altitude-sickness-peru-cover.jpg" */
  src: string;
  /** Alt text describing the image for accessibility and SEO */
  alt: string;
  /** Optional photo credit displayed in the bottom-right of the hero */
  credit?: string;
  /**
   * Optional CSS `object-position` value to control where the photo
   * focuses when it's cropped to the hero's aspect ratio. Defaults
   * to "center". Use "center 30%" to bias toward the upper portion,
   * "center top" to anchor to the top edge, etc.
   */
  focusPoint?: string;
};

export type Article = {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  category: ArticleCategory;
  tags?: string[];
  readingTime: number;
  coverGradient: string;
  featured?: boolean;
  content?: string;
  quickRecommendations?: QuickRecCard[];
  quickFacts?: QuickFact[];
  physicianTake?: string;
  /** Identifier for the cover illustration component to render on top
   *  of the article. Components are mapped in the article renderer.
   *  Ignored when `coverImage` is also set. */
  coverIllustration?: "malaria-pills" | "cruise-ship" | "repellent-sprays" | "child-travel-kit";
  /** Real photograph cover — takes precedence over `coverIllustration`
   *  when set. The article page renders a full-bleed photographic
   *  hero with title overlay. */
  coverImage?: CoverImage;
};
