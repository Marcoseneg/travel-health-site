import type { CountryInfo } from "./types";

// ── Togo (West Africa) — lean ──────────────────────────────────────────────
export const togo: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
};
