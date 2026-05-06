import type { CountryInfo } from "./types";

// ── Egypt ──────────────────────────────────────────────────────────────────
// Sources: CDC Travelers' Health, CDC Yellow Book, WHO, Swiss BAG.
export const egypt: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Polio (booster)",
    "Routine vaccines (MMR, Tdap, varicella, COVID-19)",
  ],
  vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
  malariaRisk: "none",
  yellowFever: "possible",
  foodWater:
    "Tap water in most large international tourist hotels is adequately chlorinated, but bottled water is generally provided for drinking. Outside major hotels, tap water is not safe. Avoid raw or undercooked meat and shellfish; the safety of uncooked vegetables and salads is questionable.",
  mosquito:
    "Daytime and evening mosquito-bite prevention reduces risk of dengue and other vector-borne infections. Use DEET- or picaridin-based repellent and protective clothing.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/egypt",

  countryAlerts: [
    {
      level: "info",
      title: "Polio booster recommended",
      message:
        "Vaccine-derived poliovirus has been detected in environmental samples in Egypt. Ensure polio vaccination is up to date — adult travelers who completed primary vaccination should receive a single lifetime booster dose. Documented polio vaccination may be requested at entry for travelers arriving from certain countries.",
      source: "CDC Yellow Book — Egypt",
      sourceUrl: "https://wwwnc.cdc.gov/travel/yellowbook/2024/itineraries/egypt",
      date: "Updated 2024",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Risk in Egypt is high. Recommended for all travelers.",
    },
    {
      name: "Polio",
      slug: "polio",
      audience: "all",
      note: "Booster recommended for adult travelers; documentation may be requested at entry from certain countries.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, COVID-19 — per Swiss BAG schedule. Ensure measles immunity.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Consider for long-stay travelers, those visiting friends and relatives, or eating outside major tourist hotels.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "For long stays, rural travel, occupational animal exposure, or activities with potential animal contact.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Egypt was declared malaria-free by the WHO in 2024. Rare imported cases can occur due to ongoing travel from endemic regions and presence of competent vector mosquitoes, but routine chemoprophylaxis is not recommended.",
      keyFacts: [
        { label: "Status", value: "Malaria-free (WHO, 2024)" },
        { label: "Last local case", value: "Aswan Governorate, 2014" },
        { label: "Prophylaxis", value: "Not recommended" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/egypt",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A vaccination certificate is required at entry for travelers ≥9 months of age arriving from countries with yellow fever transmission risk, including airport transits longer than 12 hours in such countries.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/egypt",
    },
    dengue: {
      riskSummary:
        "Dengue cases are increasingly reported in Egypt, particularly among returning travelers. No vaccine routinely recommended for travelers without prior dengue infection. Daytime mosquito-bite prevention is the main protection.",
      cdcMapUrl:
        "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
