export type CountryInfo = {
  vaccinesRecommended: string[];
  vaccinesConsider: string[];
  malariaRisk: "none" | "limited" | "present" | "high";
  yellowFever: "none" | "possible" | "required-or-recommended";
  foodWater: string;
  mosquito: string;
};

export const countries: Record<string, CountryInfo> = {



  thailand: {
    vaccinesRecommended: ["Hepatitis A"],
    vaccinesConsider: ["Typhoid"],
    malariaRisk: "limited",
    yellowFever: "none",
    foodWater:
      "Pay attention to food hygiene. Avoid unsafe water and undercooked foods to reduce risk of traveler’s diarrhea.",
    mosquito:
      "Use repellents, protective clothing, and mosquito avoidance measures to reduce the risk of dengue and other mosquito-borne infections.",
  },

  kenya: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid"],
    vaccinesConsider: ["Rabies"],
    malariaRisk: "present",
    yellowFever: "required-or-recommended",
    foodWater:
      "Careful food and water hygiene is important to reduce gastrointestinal infection risk.",
    mosquito:
      "Strict mosquito protection is recommended, including repellents, long sleeves, and bed nets where appropriate.",
  },



  peru: {
    vaccinesRecommended: ["Hepatitis A"],
    vaccinesConsider: ["Typhoid", "Yellow fever"],
    malariaRisk: "limited",
    yellowFever: "possible",
    foodWater:
      "Food and water precautions are important, especially for travelers visiting remote regions.",
    mosquito:
      "Mosquito protection is important in endemic areas, especially in tropical lowland regions.",
  },


brazil: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid"],
    vaccinesConsider: ["Yellow fever", "Rabies"],
    malariaRisk: "present",
    yellowFever: "required-or-recommended",
    foodWater:
      "Food and water precautions are important, particularly outside major urban centers. Avoid tap water and uncooked street food.",
    mosquito:
      "Strong mosquito protection is essential due to risk of dengue, Zika, chikungunya, and malaria in certain regions. Use DEET-based repellents and protective clothing.",
  },






};