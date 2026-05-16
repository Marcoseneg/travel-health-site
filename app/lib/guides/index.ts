// ─────────────────────────────────────────────────────────────────────────────
// Guide articles — index
// ─────────────────────────────────────────────────────────────────────────────
//
// Each article is its own file in this folder. To EDIT a guide: open
// the matching `<slug>.ts` file. To ADD a new guide:
//   1. Create `<slug>.ts` exporting a typed const
//      (e.g. `export const mySlug: Article = { ... };`).
//   2. Add an `import` line below and a matching entry in the
//      `articles` array — both lists are kept in source order
//      (newest first by convention).
//
// Types and CATEGORY_LABELS are re-exported here so existing imports
// like `import { articles, CATEGORY_LABELS } from "../lib/guidesData"`
// keep working unchanged (via the thin shim at `../guidesData.ts`).
// ─────────────────────────────────────────────────────────────────────────────

import type { Article, ArticleCategory } from "./types";

import { bestDeetSprays2026 } from "./best-deet-sprays-2026";
import { cubaTravelHealth2026 } from "./cuba-travel-health-2026";
import { malariaProphylaxisCompared } from "./malaria-prophylaxis-compared";
import { altitudeSicknessPeru } from "./altitude-sickness-peru";
import { permethrinClothingGuide } from "./permethrin-clothing-guide";
import { travelersDiarrheaSurvival } from "./travelers-diarrhea-survival";
import { safariHealthKit } from "./safari-health-kit";
import { japaneseEncephalitisWhoNeedsIt } from "./japanese-encephalitis-who-needs-it";
import { cruiseHealthPhysicianGuide } from "./cruise-health-physician-guide";
import { travellingWithChildren } from "./travelling-with-children";

export const CATEGORY_LABELS: Record<ArticleCategory, { label: string; color: string }> = {
  "gear-review": { label: "Gear review", color: "#38bdf8" },
  "destination-guide": { label: "Destination guide", color: "#34d399" },
  prevention: { label: "Prevention", color: "#f59e0b" },
  "travel-story": { label: "Travel story", color: "#a78bfa" },
  explainer: { label: "Explainer", color: "#fb923c" },
};

export const articles: Article[] = [
  bestDeetSprays2026,
  cubaTravelHealth2026,
  malariaProphylaxisCompared,
  altitudeSicknessPeru,
  permethrinClothingGuide,
  travelersDiarrheaSurvival,
  safariHealthKit,
  japaneseEncephalitisWhoNeedsIt,
  cruiseHealthPhysicianGuide,
  travellingWithChildren,
];

export * from "./types";
