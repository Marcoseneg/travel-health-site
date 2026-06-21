// ─────────────────────────────────────────────────────────────────────────────
// Insights — index
//
// One file per insight article in this folder. To ADD an insight:
//   1. Create `<slug>.ts` exporting a typed `Insight` const.
//   2. Add an import + an entry in the `insights` array below (newest first).
// ─────────────────────────────────────────────────────────────────────────────

import type { Insight, InsightCategory } from "./types";

import { wolbachiaDengue2026 } from "./wolbachia-dengue-2026";
import { qdengaRealWorldData } from "./qdenga-real-world-data";
import { dengueExpandingBeyondTropics } from "./dengue-expanding-beyond-tropics";
import { climateChangeVectorBorne } from "./climate-change-vector-borne";
import { nextGenMalariaVaccines } from "./next-gen-malaria-vaccines";

export const INSIGHT_CATEGORY_LABELS: Record<
  InsightCategory,
  { label: string; color: string }
> = {
  "expert-analysis": { label: "Expert analysis", color: "#0891b2" },
  "paper-review": { label: "Paper review", color: "#0e7490" },
  "public-health": { label: "Public health", color: "#047857" },
  "data-insight": { label: "Data insight", color: "#7c3aed" },
  "outbreak-analysis": { label: "Outbreak analysis", color: "#b91c1c" },
};

// Newest first.
export const insights: Insight[] = [
  wolbachiaDengue2026,
  qdengaRealWorldData,
  dengueExpandingBeyondTropics,
  climateChangeVectorBorne,
  nextGenMalariaVaccines,
];

export function getInsight(id: string): Insight | undefined {
  return insights.find((i) => i.id === id);
}

export * from "./types";
