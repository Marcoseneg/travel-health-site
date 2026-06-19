import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Lesotho) + CDC Yellow Book 2024;
// EKRM/HealthyTravel (Swiss travel medicine authority, https://www.healthytravel.ch).
// Framing reflects Swiss BAG schedule. Notable: Lesotho is a high-altitude
// country (lowest point ~1400m) with essentially NO malaria and NO yellow fever
// risk, and no YF entry requirement. Emphasis is on routine vaccines, hepatitis A,
// rabies, and altitude. Draft brief — pending physician review.
export const lesotho: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Hepatitis B", "Rabies"],
  malariaRisk: "none",
  yellowFever: "none",
  foodWater:
    "Use bottled or treated water outside major hotels, avoid ice from unverified sources, and eat thoroughly cooked food. Standard hygiene reduces the risk of traveler's diarrhea, hepatitis A, and typhoid.",
  mosquito:
    "No malaria risk — Lesotho's high altitude keeps it malaria-free. General mosquito- and tick-bite prevention is still sensible during warmer months (African tick-bite fever occurs).",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/lesotho",

  countryAlerts: [
    {
      level: "info",
      title: "No yellow fever requirement",
      message:
        "Lesotho has no yellow fever risk and does not require a YF vaccination certificate for entry. Direct travel from Switzerland is unaffected. (Some neighbouring countries may apply a certificate requirement only if arriving from a YF-risk country — check each leg of multi-country itineraries.)",
      source: "CDC / WHO — Lesotho entry requirements",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/lesotho",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "High altitude",
      message:
        "Lesotho is the world's highest country by lowest point (~1400m), with mountain passes and trekking routes above 3000m. Travelers ascending quickly to high elevations should be aware of acute mountain sickness — ascend gradually, stay hydrated, and discuss prevention with your travel medicine specialist if planning high-altitude hiking.",
      source: "EKRM / CDC Yellow Book 2024",
      sourceUrl: "https://www.healthytravel.ch",
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
      note: "Recommended for most travelers, especially those visiting rural areas or staying with friends and relatives.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (adults need a one-time booster), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Verify MMR status given rising measles activity.",
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
      note: "Recommended for long stays, remote trekking and pony-trekking, cycling trips, children, and those working with animals. Dog rabies occurs in Lesotho and access to post-exposure care can be limited in rural mountain areas — strengthening the case for pre-exposure vaccination.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "No malaria risk anywhere in Lesotho — the country's high altitude keeps it malaria-free. No chemoprophylaxis is needed.",
      keyFacts: [
        { label: "Risk", value: "None — high-altitude country" },
        { label: "Prophylaxis", value: "Not required" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/lesotho",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Lesotho and no vaccination certificate required for entry. Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "Status", value: "No risk in country" },
        { label: "Entry rule", value: "No certificate required" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/lesotho",
    },
  },
};
