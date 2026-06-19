import type { CountryInfo } from "./types";

// ── Kenya (East Africa) — full brief ───────────────────────────────────────
// Sources: CDC Yellow Book 2024 (Kenya chapter), CDC Travelers' Health,
// WHO yellow fever risk map (December 2024), Swiss BAG.
export const kenya: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Yellow fever (most areas)", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera", "Meningococcal"],
  malariaRisk: "high",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or treated water and eat thoroughly cooked food. Resort areas and lodges generally have safer food but precautions still apply elsewhere.",
  mosquito:
    "Aggressive mosquito-bite prevention is essential below 2500m. Chemoprophylaxis recommended for safari and coastal travel. Nairobi city centre and the highlands above 2500m are malaria-free.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/kenya",

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for travel to most low- and middle-income countries.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Recommended for most itineraries. Generally NOT recommended if travel is limited to Nairobi city, the coast (Mombasa, Malindi, Kilifi, Kwale, Lamu), or the northeast (Wajir, Mandera).",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for travelers eating outside major hotels or staying with local hosts.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio booster, COVID-19 — per Swiss BAG schedule. Ensure measles immunity.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Consider for long-term stays or travel to dry-season areas of northern Kenya.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "High risk year-round in all areas below 2500m, including coastal regions and most safari destinations (Tsavo, Amboseli, Masai Mara). Chemoprophylaxis is recommended together with strict mosquito-bite protection.",
      keyFacts: [
        { label: "High risk", value: "All areas below 2500m" },
        { label: "Low / no risk", value: "Nairobi city centre, highlands above 2500m" },
        { label: "Species", value: "P. falciparum (predominant)" },
        { label: "Season", value: "Year-round" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/kenya",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/kenya.jpg",
      mapCaption: "Malaria risk areas in Kenya (CDC).",
    },
    yellowFever: {
      riskSummary:
        "Yellow fever vaccination is recommended for most travelers visiting Kenya. The vaccine is generally NOT recommended if your itinerary is limited to Nairobi city, the coastal regions (Mombasa, Malindi, Kilifi, Kwale, Lamu), or the northeast (Wajir, Mandera). A vaccination certificate is required at entry for travelers ≥1 year old arriving from countries with yellow fever risk.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/kenya",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/kenya.jpg",
      mapCaption: "Yellow fever vaccine recommendation areas in Kenya (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue circulates particularly along the coast (Mombasa region) with periodic outbreaks. Daytime mosquito-bite prevention is the main protection. Vaccination is not routinely recommended for travelers without prior dengue infection.",
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
