import type { CountryInfo } from "./types";

// ── Cameroon (Central Africa) — lean ───────────────────────────────────────
export const cameroon: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Use bottled or treated water and avoid raw produce.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Meningococcal disease risk in northern regions during the dry season.",
};
