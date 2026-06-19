import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health & Yellow Book 2024 (public domain); EKRM /
// HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch);
// WHO. Framing reflects Swiss BAG schedule. Notable: one of the few Pacific
// regions with malaria (predominantly P. vivax, chloroquine-resistant) — present
// across the country, though the southern Tafea Province (incl. Tanna, Aneityum)
// is at the southern limit of transmission and has been declared malaria-free.
// Strong dengue. No domestic yellow fever, but a YF certificate is required on
// entry if arriving from a country with YF transmission risk.
// AI-drafted — pending physician review.
export const vanuatu: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Rabies",
    "Dengue",
  ],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce risk of traveler's diarrhea, hepatitis A, and typhoid — particularly relevant for rural travel and stays outside the main resorts. Note also the local risk of ciguatera fish poisoning from large reef fish.",
  mosquito:
    "Round-the-clock mosquito protection is important. Daytime-biting Aedes mosquitoes transmit dengue and Zika, while night-biting Anopheles transmit malaria across most of the country. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated bed net in rural and lowland areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/vanuatu",

  countryAlerts: [
    {
      level: "warning",
      title: "Malaria present — discuss prevention before travel",
      message:
        "Vanuatu has year-round malaria transmission across most of the country (predominantly P. vivax, with rare chloroquine-resistant P. falciparum). Chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine) is commonly recommended alongside strict mosquito protection; the southern Tafea Province has achieved malaria-free status. Discuss the right approach for your itinerary with your travel medicine specialist.",
      source: "CDC Yellow Book 2024 / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever certificate if arriving from a risk country",
      message:
        "There is no yellow fever in Vanuatu, but a valid YF vaccination certificate is required on entry for travelers arriving from a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / Vanuatu immigration guidance",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to tropical and subtropical countries. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "all",
      note: "Recommended given local prevalence and limited healthcare. Routine in the Swiss BAG childhood schedule since 1998, so younger travelers are usually already covered.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for travel to Vanuatu, particularly for rural travel, longer stays, visiting friends and relatives, or staying in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Low risk overall — rabies is not commonly found in local dogs — but consider for long stays or remote travel where post-exposure care would be hard to obtain quickly.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Year-round transmission across most of the country, predominantly P. vivax with rare chloroquine-resistant P. falciparum and P. ovale. Risk is focal and concentrated in northern and central provinces (e.g. Sanma); the southern Tafea Province (incl. Tanna and Aneityum) is at the southern limit of transmission and has been declared malaria-free. Chemoprophylaxis is commonly recommended alongside mosquito protection.",
      keyFacts: [
        { label: "Risk area", value: "Most of the country; focal, north/central" },
        { label: "Low/no risk", value: "Southern Tafea Province (declared malaria-free)" },
        { label: "Species", value: "Predominantly P. vivax" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + mosquito protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/vanuatu",
    },
    dengue: {
      riskSummary:
        "Endemic with year-round risk and periodic outbreaks. Daytime mosquito-bite prevention is the main protection and also reduces Zika risk.",
      keyFacts: [
        { label: "Distribution", value: "Throughout the islands" },
        { label: "Season", value: "Year-round" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A YF vaccination certificate is required on entry for travelers arriving from a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/vanuatu",
    },
  },
};
