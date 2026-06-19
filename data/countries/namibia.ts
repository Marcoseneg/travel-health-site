import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Namibia) + CDC Yellow Book 2024;
// EKRM/HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch).
// Framing reflects Swiss BAG schedule. Notable: no domestic yellow fever, but a
// YF certificate is required if arriving from a YF-risk country. Malaria is
// seasonal and confined to the northern regions (Caprivi/Zambezi, Kavango,
// Ovambo regions); Windhoek, the central/southern highlands and the coast are
// no-risk. Draft brief — pending physician review.
export const namibia: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Tap water in Windhoek and major towns is generally safe; use bottled or treated water in rural areas. Eat thoroughly cooked food and observe standard hygiene to reduce risk of traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "Malaria risk is seasonal (November–June) and concentrated in the northern regions (Zambezi/Caprivi, Kavango East & West, Ohangwena, Omusati, Oshana, Oshikoto, Kunene, Otjozondjupa, Omaheke). Use DEET- or picaridin-based repellent, treated bed nets, and long sleeves at dusk and dawn when travelling there; chemoprophylaxis is recommended during the transmission season. Windhoek, the central/southern highlands and the coast are no-risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/namibia",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever certificate if arriving from a risk country",
      message:
        "Namibia has no domestic yellow fever transmission, so direct travel from Switzerland is not affected. However, a valid YF vaccination certificate is required for travelers aged 9 months and older arriving from (or having transited through) a country with risk of YF transmission — relevant for multi-country African itineraries (e.g. via Angola or Zambia).",
      source: "CDC / WHO — Namibia entry requirements",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/namibia",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, especially those visiting rural areas, staying with friends and relatives, or on longer or self-catering trips.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (adults need a one-time booster), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Recommended for long stays, remote or self-drive travel, cycling/motorbike trips, children, and those working with animals. Note: rabies circulates in wildlife including Cape fur seals along the Namibian coast — keep distance from seals and other animals.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Oral cholera vaccine may be considered for travelers heading to areas with localized active transmission (notably Kunene and Otjozondjupa) or with elevated individual risk.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Seasonal risk (November–June) confined to the northern regions — Zambezi/Caprivi, Kavango East & West, Ohangwena, Omusati, Oshana, Oshikoto, Kunene, Otjozondjupa and Omaheke. Chloroquine-resistant P. falciparum predominates; chemoprophylaxis is recommended for these areas during the transmission season. Windhoek, the central/southern highlands and the coast (Swakopmund, Walvis Bay, Sossusvlei) are no-risk.",
      keyFacts: [
        { label: "Risk area", value: "Northern regions (Zambezi/Caprivi, Kavango, Ovambo, Kunene)" },
        { label: "Season", value: "November–June" },
        { label: "No risk", value: "Windhoek, central/south highlands, coast" },
        { label: "Species", value: "P. falciparum (chloroquine-resistant)" },
        { label: "Prophylaxis", value: "Atovaquone-proguanil, doxycycline, or mefloquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/namibia",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/namibia.jpg",
      mapCaption: "Malaria risk areas in Namibia (CDC).",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Namibia. A YF certificate is required only for travelers ≥9 months arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Status", value: "No risk in country" },
        { label: "Entry rule", value: "Certificate only if arriving from a risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/namibia",
    },
    dengue: {
      riskSummary:
        "Sporadic dengue transmission can occur, carried by daytime-biting Aedes mosquitoes. Daytime bite-prevention measures reduce risk, particularly in the warmer, wetter north.",
      keyFacts: [
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Prevention", value: "Daytime repellent, covering clothing" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
