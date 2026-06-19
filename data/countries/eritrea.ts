import type { CountryInfo } from "./types";

// Sources: CDC Travelers' Health (Eritrea) and Yellow Book 2024; WHO; EKRM /
// HealthyTravel (https://www.healthytravel.ch). Framing reflects Swiss BAG
// schedule. Notable: malaria in lowland areas below 2,200 m (Asmara malaria-
// free); meningitis-belt country; YF not endemic but a certificate is required
// for entry from a YF-risk country.
export const eritrea: CountryInfo = {
  vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
  vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies", "Meningococcal"],
  malariaRisk: "present",
  yellowFever: "possible",
  foodWater:
    "Use bottled or treated water, avoid ice and unpeeled produce, and eat thoroughly cooked food. Standard precautions reduce the risk of traveler's diarrhea, hepatitis A and typhoid. Healthcare access is limited, especially outside Asmara.",
  mosquito:
    "Mosquito-bite prevention (DEET or picaridin repellent, long sleeves, treated bed nets) is essential below 2,200 m, where malaria is present year-round. Asmara and other high-altitude areas are malaria-free. Dengue and sand-fly-borne leishmaniasis also occur in lowland areas.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/eritrea",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — entry certificate may be required",
      message:
        "Eritrea is not a yellow-fever-endemic country, but a vaccination certificate is required for travelers arriving from (or transiting through) a country with risk of YF transmission. Direct travel from Switzerland is not affected. Carry your International Certificate of Vaccination if combining Eritrea with other African destinations.",
      source: "WHO / Eritrean entry requirements",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Meningitis belt — seasonal meningococcal risk",
      message:
        "Eritrea lies in the African meningitis belt. Meningococcal vaccination is recommended for travelers visiting affected areas during the dry season (roughly December–June) and for closer contact with the local population.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/eritrea",
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
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure MMR is complete given rising global measles cases.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Not recommended by CDC for the main inhabited regions and not endemic; relevant mainly for the entry certificate when arriving from a YF-risk country (see country alert).",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider per individual risk and stay duration. Routine in Swiss childhood schedule since 1998 — younger travelers usually covered.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Recommended for long stays, rural travel, cycling/motorbike trips, work with animals, and for infants and children. Rabid dogs are common and post-exposure vaccine may be limited outside urban areas.",
    },
    {
      name: "Meningococcal",
      audience: "specific",
      note: "Recommended for travel to meningitis-belt areas during the dry season (December–June) and for close contact with the local population. The quadrivalent ACWY vaccine is used.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Malaria is present year-round in all areas below 2,200 m. The capital Asmara (~2,325 m) and other high-altitude areas have no malaria transmission. P. falciparum predominates (~80–85%) and is chloroquine-resistant. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine or tafenoquine) is recommended for lowland travel.",
      keyFacts: [
        { label: "Risk area", value: "All areas <2,200 m" },
        { label: "No risk", value: "Asmara and other high-altitude areas" },
        { label: "Species", value: "P. falciparum ~80–85%, P. vivax ~15–20%" },
        { label: "Resistance", value: "Chloroquine-resistant" },
        { label: "Prevention", value: "Chemoprophylaxis + bite protection below 2,200 m" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/eritrea",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/eritrea.jpg",
      mapCaption: "Malaria risk areas in Eritrea (CDC).",
    },
    yellowFever: {
      riskSummary:
        "Eritrea is not yellow-fever-endemic, and CDC does not recommend the vaccine for the main regions. A vaccination certificate is, however, required for travelers arriving from a YF-risk country (see country alert). Direct travel from Switzerland is not affected.",
      keyFacts: [
        { label: "CDC", value: "Not recommended (not endemic)" },
        { label: "Entry rule", value: "Cert required if arriving from YF-risk country" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/eritrea",
    },
    dengue: {
      riskSummary:
        "Dengue transmission occurs in lowland and coastal areas via daytime-biting Aedes mosquitoes. Mosquito-bite prevention is the main protection; risk is lower in the cooler highlands.",
      keyFacts: [
        { label: "Distribution", value: "Lowland and coastal areas" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
  },
};
