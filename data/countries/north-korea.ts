import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024, WHO.
// Framing reflects Swiss BAG schedule. Detailed, country-specific health data
// for North Korea is limited; guidance here is deliberately conservative and
// general. Notable: P. vivax malaria persists in some southern provinces and
// areas near the DMZ; Japanese encephalitis is a regional risk; access to
// medical care is very limited. Independent travel is heavily restricted.
export const northKorea: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Rabies",
    "Japanese encephalitis",
  ],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay close attention to food hygiene. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid. Medical care is very limited, so prevention is especially important.",
  mosquito:
    "Daytime and evening mosquito protection (DEET or picaridin repellent, long sleeves) is sensible, particularly in rural and agricultural areas. Protect at dawn/dusk against Japanese encephalitis and malaria where present, mainly in southern provinces and near the demilitarized zone during the warmer months.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/north-korea",

  countryAlerts: [
    {
      level: "warning",
      title: "Very limited medical care and consular support",
      message:
        "Medical facilities in North Korea are limited and may not meet international standards; serious problems usually require medical evacuation. Switzerland maintains a cooperation office in Pyongyang, but consular support is constrained. Travelers should hold comprehensive travel and evacuation insurance and consult a travel medicine specialist before departure.",
      source: "EKRM / general travel medicine guidance",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry rule — certificate if arriving from a risk country",
      message:
        "There is no yellow fever in North Korea. A vaccination certificate may be required for travelers arriving from a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      source: "WHO / entry requirements",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for essentially all travelers. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "all",
      note: "Recommended given limited local medical care and the possibility of unscreened medical exposure. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection in particular before travel.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for most travelers, especially longer stays, travel outside the capital, or stays in poor hygienic conditions.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Consider pre-exposure vaccination, particularly for longer stays or higher individual risk. Rabies in dogs is reported, and reliable post-exposure care may be very difficult to obtain locally — pre-exposure vaccination simplifies management if exposed.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural areas, or shorter stays with significant rural/outdoor exposure during the transmission season (mainly summer and early autumn). Not generally needed for short, supervised urban itineraries.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "P. vivax malaria persists in parts of North Korea, concentrated in some southern provinces and areas bordering the demilitarized zone, with seasonal transmission in the warmer months (roughly spring to autumn). Only P. vivax occurs and no drug resistance has been documented. Whether chemoprophylaxis or mosquito protection alone is appropriate depends on the specific itinerary and season — discuss with a travel medicine specialist.",
      keyFacts: [
        { label: "Species", value: "P. vivax (100%)" },
        { label: "Areas", value: "Some southern provinces; near the DMZ" },
        { label: "Season", value: "Warmer months (approx. spring–autumn)" },
        { label: "Prevention", value: "Mosquito protection; prophylaxis per itinerary" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/north-korea",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in North Korea. A vaccination certificate may be required only for travelers arriving from a country with risk of yellow fever transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/north-korea",
    },
  },
};
