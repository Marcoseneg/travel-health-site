import type { CountryInfo } from "./types";

// ── Ethiopia (East Africa) — lean ──────────────────────────────────────────
export const ethiopia: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever (most areas)", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Strict food and water precautions are essential. Healthcare access outside Addis Ababa is limited.",
  mosquito:
    "Mosquito-bite prevention essential below 2500m. Addis Ababa and the highlands are malaria-free. Chemoprophylaxis recommended for low-altitude travel.",
};
