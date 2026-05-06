import type { CountryInfo } from "./types";

// ── Liberia (West Africa) — lean ───────────────────────────────────────────
export const liberia: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is limited.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
};
