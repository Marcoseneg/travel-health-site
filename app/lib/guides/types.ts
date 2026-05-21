// ─────────────────────────────────────────────────────────────────────────────
// Article system types
// ─────────────────────────────────────────────────────────────────────────────

export type ArticleCategory =
  | "gear-review"
  | "destination-guide"
  | "prevention"
  | "travel-story"
  | "explainer";

export type QuickRecCard = {
  icon: string;
  scenario: string;
  recommendation: string;
  detail?: string;
};

export type QuickFact = {
  icon: string;
  label: string;
  value: string;
};

export type CoverImage = {
  src: string;
  alt: string;
  credit?: string;
  focusPoint?: string;
};

/**
 * One side of a SymptomComparison block.
 */
export type SymptomCard = {
  /** Main label, e.g., "Mild (acute mountain sickness)" */
  title: string;
  /** Short directive under the title, e.g., "Stay at current altitude" */
  action: string;
  /** Symptoms displayed as bullets */
  bullets: string[];
  /** Optional small footer note shown at the bottom in muted style */
  footer?: string;
};

/**
 * Side-by-side mild-vs-severe comparison rendered inline within an
 * article section. The component renders only the two cards — the
 * section heading itself stays in the markdown (H2). Position within
 * the section is controlled by an <!-- SYMPTOM_COMPARISON --> marker
 * in the article's markdown content.
 */
export type SymptomComparisonData = {
  mild: SymptomCard;
  severe: SymptomCard;
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
  /** When set, renders side-by-side comparison cards at the position
   *  of the <!-- SYMPTOM_COMPARISON --> marker in `content`. */
  symptomComparison?: SymptomComparisonData;
  coverIllustration?: "malaria-pills" | "cruise-ship" | "repellent-sprays" | "child-travel-kit";
  coverImage?: CoverImage;
};
