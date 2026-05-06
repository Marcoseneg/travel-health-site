import type { CountryInfo } from "./types";

// ── Mali (West Africa) — lean ──────────────────────────────────────────────
export const mali: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential. Malaria risk is high year-round; meningococcal disease risk in the dry season.",
};
