import type { CountryInfo } from "./types";

// ── DR Congo (Central Africa) — lean ───────────────────────────────────────
export const drCongo: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access is severely limited; consider evacuation insurance.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential — malaria is high year-round, country-wide. Active outbreaks of Ebola and Mpox have been reported in recent years.",
};
