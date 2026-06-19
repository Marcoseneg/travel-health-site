import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health & Yellow Book 2024 (public domain); EKRM /
// HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch);
// WHO. Framing reflects Swiss BAG schedule. Notable: one of the few Pacific
// regions with intense, high-risk malaria (chloroquine-resistant P. falciparum
// and P. vivax) throughout <2000 m — chemoprophylaxis is generally recommended.
// Japanese encephalitis present. Strong dengue. Limited healthcare
// infrastructure. No domestic yellow fever, but a YF certificate is required on
// entry if arriving from (or transiting) a country with YF transmission risk.
// AI-drafted — pending physician review.
export const papuaNewGuinea: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Rabies",
    "Japanese encephalitis",
    "Dengue",
  ],
  malariaRisk: "high",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay close attention to food hygiene. Standard tropical precautions reduce risk of traveler's diarrhea, hepatitis A, and typhoid. Outside Port Moresby and a handful of resorts, hygiene standards are variable, so these precautions matter throughout the trip.",
  mosquito:
    "Rigorous round-the-clock mosquito protection is essential. Daytime-biting Aedes mosquitoes transmit dengue and Zika, while night-biting Anopheles transmit malaria across most of the country below 2000 m. Use DEET or picaridin repellent, cover up at dawn and dusk, and sleep under an insecticide-treated bed net in rural and lowland areas. Japanese encephalitis is also present in rural areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/papua-new-guinea",

  countryAlerts: [
    {
      level: "warning",
      title: "High malaria risk — chemoprophylaxis generally recommended",
      message:
        "Papua New Guinea has year-round, high-intensity malaria transmission (mostly chloroquine-resistant P. falciparum) throughout the country below 2000 m, including coastal and island areas popular with travelers. Malaria chemoprophylaxis (atovaquone-proguanil, doxycycline, or mefloquine) is generally recommended in addition to strict mosquito protection. Discuss the right regimen with your travel medicine specialist well before departure.",
      source: "CDC Yellow Book 2024 / EKRM",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever certificate if arriving from a risk country",
      message:
        "There is no yellow fever in Papua New Guinea, but a valid YF vaccination certificate is required on entry for travelers aged 1 year and over arriving from — or having transited the airport of — a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / PNG immigration guidance",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Limited healthcare and remote areas",
      message:
        "Medical facilities outside Port Moresby are limited, and serious illness or injury may require evacuation. Comprehensive travel and repatriation insurance is strongly advised. Carrying a personal first-aid kit and discussing emergency standby malaria treatment with your travel clinic is sensible for remote itineraries.",
      source: "EKRM / CDC",
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
      note: "Recommended for Papua New Guinea given high local prevalence and limited healthcare. Routine in the Swiss BAG childhood schedule since 1998, so younger travelers are usually already covered.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for travel to Papua New Guinea, particularly for rural travel, longer stays, visiting friends and relatives, or staying in poor hygienic conditions.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (a polio booster is advised — poliovirus has recently been detected in-country), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Consider for long stays, remote and rural travel, cyclists and motorbike riders, those working with animals, and small children. Post-exposure care can be hard to obtain quickly in remote areas.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Present in Papua New Guinea. Recommended for travelers relocating or spending a month or more in endemic rural areas, and consider for shorter trips with substantial rural or outdoor exposure. Not needed for brief urban itineraries.",
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
        "High, year-round transmission throughout the country in areas below 2000 m, including coastal and island destinations. Most infections are chloroquine-resistant P. falciparum (about 75%), with P. vivax (about 25%) and rare P. malariae and P. ovale. Chemoprophylaxis is generally recommended alongside strict mosquito protection; only the highland areas above 2000 m are essentially risk-free.",
      keyFacts: [
        { label: "Risk area", value: "Countrywide below 2000 m, incl. coast & islands" },
        { label: "No risk", value: "Highlands above 2000 m" },
        { label: "Species", value: "P. falciparum (~75%), P. vivax (~25%)" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + mosquito protection" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/papua-new-guinea",
    },
    dengue: {
      riskSummary:
        "Endemic with year-round risk and periodic outbreaks, particularly in urban and lowland areas. Daytime mosquito-bite prevention is the main protection and also reduces Zika risk.",
      keyFacts: [
        { label: "Distribution", value: "Urban and lowland areas nationwide" },
        { label: "Season", value: "Year-round" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A YF vaccination certificate is required on entry for travelers aged 1 year and over arriving from — or having transited the airport of — a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/papua-new-guinea",
    },
  },
};
