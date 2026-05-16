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

export type Article = {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  tags: string[];
  readingTime: number; // minutes
  coverGradient: string; // CSS gradient for the card header
  featured?: boolean;
  /** Full article body in Markdown. When omitted, the slug page shows a
   *  "Coming soon" state — useful for placeholder articles in the index. */
  content?: string;
  /** Optional row of scenario→recommendation cards rendered above the
   *  markdown body. Useful for decision-oriented articles. */
  quickRecommendations?: QuickRecCard[];
  /** Optional named illustration rendered as a cover image at the top
   *  of the article. Components are mapped in the article renderer. */
  coverIllustration?: "malaria-pills" | "cruise-ship" | "repellent-sprays" | "child-travel-kit";
};
