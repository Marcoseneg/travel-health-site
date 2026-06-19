import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024, WHO.
// Framing reflects Swiss BAG schedule. Notable: Tajikistan was certified
// malaria-free by WHO in 2023 (last indigenous case 2014) — no malaria
// chemoprophylaxis is recommended. Main concerns are food/water-borne disease,
// rabies, and tick-borne Crimean-Congo haemorrhagic fever. No yellow fever risk
// and no certificate required. Medical care is limited outside Dushanbe.
export const tajikistan: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Rabies",
  ],
  malariaRisk: "none",
  yellowFever: "none",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay close attention to food hygiene. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant outside Dushanbe and in rural areas.",
  mosquito:
    "Malaria is no longer present (WHO-certified malaria-free since 2023). The main vector-borne concern is tick-borne Crimean-Congo haemorrhagic fever in rural and livestock areas — use long clothing, repellent, and tick checks during outdoor activity, and avoid contact with livestock and unpasteurised dairy. Sandfly-borne leishmaniasis also occurs in some areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/tajikistan",

  countryAlerts: [
    {
      level: "info",
      title: "Country is malaria-free since 2023",
      message:
        "Tajikistan was certified malaria-free by WHO in 2023, having recorded its last indigenous case in 2014. No malaria chemoprophylaxis is recommended for travel to Tajikistan.",
      source: "WHO",
      sourceUrl: "https://www.who.int/news/item/29-03-2023-who-certifies-azerbaijan-and-tajikistan-as-malaria-free",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Limited medical care outside Dushanbe",
      message:
        "Medical facilities are limited, particularly outside the capital, and may not meet international standards. Travelers should hold comprehensive travel and evacuation insurance and consult a travel medicine specialist before departure, especially for high-altitude or remote itineraries (e.g. the Pamir region).",
      source: "EKRM / general travel medicine guidance",
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
      note: "Recommended given limited local medical care and possible unscreened medical exposure. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually covered.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles and polio protection in particular before travel to Central Asia.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for most travelers, especially longer stays, those visiting friends and relatives, travel to rural areas, or stays in poor hygienic conditions.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Consider pre-exposure vaccination, particularly for longer stays, rural/remote travel, cycling or trekking, work with animals, and for children. Rabies in dogs is reported in Tajikistan and reliable post-exposure care may be hard to obtain locally.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Tajikistan, and no vaccination certificate is required for entry.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/tajikistan",
    },
  },
};
