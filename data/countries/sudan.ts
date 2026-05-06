import type { CountryInfo } from "./types";

// ── Sudan (North Africa) — lean ────────────────────────────────────────────
export const sudan: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever (south)", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is severely limited; the country has been affected by ongoing armed conflict.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high in most areas. Meningococcal disease risk in the dry season.",
};
