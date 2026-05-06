import type { CountryInfo } from "./types";

// ── Gabon (Central Africa) — lean ──────────────────────────────────────────
export const gabon: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
};
