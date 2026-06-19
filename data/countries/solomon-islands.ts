import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health & Yellow Book 2024 (public domain); EKRM /
// HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch);
// WHO. Framing reflects Swiss BAG schedule. Notable: one of the few Pacific
// regions with significant malaria (chloroquine-resistant P. vivax and
// P. falciparum) present throughout the country — chemoprophylaxis commonly
// recommended. Strong dengue. No domestic yellow fever, but a YF certificate is
// required on entry if arriving from a country with YF transmission risk.
// AI-drafted — pending physician review.
export const solomonIslands: CountryInfo = {
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
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce risk of traveler's diarrhea, hepatitis A, and typhoid — particularly relevant for rural travel and stays outside the main resorts.",
  mosquito:
    "Round-the-clock mosquito protection is important. Daytime-biting Aedes mosquitoes transmit dengue and Zika, while night-biting Anopheles transmit malaria throughout the islands. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated bed net in rural and lowland areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/solomon-islands",

  countryAlerts: [
    {
      level: "warning",
      title: "Malaria present — chemoprophylaxis commonly recommended",
      message:
        "The Solomon Islands have year-round malaria transmission throughout the country (predominantly P. vivax, with chloroquine-resistant P. falciparum). Malaria chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine) is commonly recommended in addition to strict mosquito protection. Discuss the right regimen with your travel medicine specialist before departure.",
      source: "CDC Yellow Book 2024 / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever certificate if arriving from a risk country",
      message:
        "There is no yellow fever in the Solomon Islands, but a valid YF vaccination certificate is required on entry for travelers arriving from a country with risk of yellow fever transmission (generally those aged 9 months and over). Direct travel from Switzerland is not affected.",
      source: "WHO / Solomon Islands immigration guidance",
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
      note: "Recommended for travel to the Solomon Islands, particularly for rural travel, longer stays, visiting friends and relatives, or staying in poor hygienic conditions.",
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
      note: "Consider for long stays, remote travel, those working with animals, and small children. Post-exposure care can be hard to obtain quickly on outer islands.",
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
        "Year-round transmission throughout the country, including the main islands and Honiara. Predominantly P. vivax (about 70%) with chloroquine-resistant P. falciparum (about 30%) and rare P. ovale. Chemoprophylaxis is commonly recommended alongside strict mosquito protection.",
      keyFacts: [
        { label: "Risk area", value: "Throughout the country, all islands" },
        { label: "Species", value: "P. vivax (~70%), P. falciparum (~30%)" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + mosquito protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/solomon-islands",
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
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/solomon-islands",
    },
  },
};
