import type { CountryInfo } from "./types";

// ── Niger (West Africa) — lean ─────────────────────────────────────────────
export const niger: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever (south)", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is severely limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential. Malaria year-round in southern regions; meningococcal disease risk in the dry season.",
};
