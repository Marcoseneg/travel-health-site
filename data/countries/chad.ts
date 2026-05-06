import type { CountryInfo } from "./types";

// ── Chad (Central Africa) — lean ───────────────────────────────────────────
export const chad: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever (south)", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is severely limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential. Malaria year-round country-wide. Meningococcal disease risk in the dry season.",
};
