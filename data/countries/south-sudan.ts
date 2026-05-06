import type { CountryInfo } from "./types";

// ── South Sudan (East Africa) — lean ───────────────────────────────────────
export const southSudan: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is severely limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
};
