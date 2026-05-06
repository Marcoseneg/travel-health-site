import type { CountryInfo } from "./types";

// ── Mauritania (West Africa) — lean ────────────────────────────────────────
export const mauritania: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Yellow fever (south)", "Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or treated water. Healthcare access is limited.",
  mosquito:
    "Mosquito-bite prevention is essential in southern regions where malaria is present. Risk concentrates in the rainy season (July–October).",
};
