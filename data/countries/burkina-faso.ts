import type { CountryInfo } from "./types";

// ── Burkina Faso (West Africa) — lean ──────────────────────────────────────
export const burkinaFaso: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is limited outside Ouagadougou.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round. Meningococcal disease risk peaks in the dry season (December–June).",
};
