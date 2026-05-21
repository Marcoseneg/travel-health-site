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
  /**
   * Optional structured "Quick facts" reference data displayed at the
   * top of the article body. Renders as a grid of icon + label + value
   * rows. Omit on articles where it doesn't add value.
   */
  quickFacts?: QuickFact[];
  /** Identifier for the cover illustration component to render on top
   *  of the article. Components are mapped in the article renderer. */
  coverIllustration?: "malaria-pills" | "cruise-ship" | "repellent-sprays" | "child-travel-kit";
};
