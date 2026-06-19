import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Yellow Book 2024 / CDC Travelers' Health,
// PAHO. Framing reflects the Swiss BAG schedule. Notable: malaria limited to a
// few provinces (P. falciparum, chloroquine-sensitive); the main resort hub of
// La Altagracia (Punta Cana / Bávaro) has historically carried low-level risk.
// Strong year-round dengue with periodic Zika and chikungunya activity. No
// yellow fever risk in country; YF certificate only required if arriving from a
// YF-endemic country.
export const dominicanRepublic: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Rabies",
    "Chikungunya",
    "Dengue",
  ],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant outside large all-inclusive resorts. Avoid wading in floodwater (leptospirosis).",
  mosquito:
    "Year-round dengue risk — with periodic Zika and chikungunya activity — means daytime mosquito protection (DEET or picaridin repellent, long sleeves) is important, including in resort areas. For travel to the malaria-risk provinces, including La Altagracia (Punta Cana / Bávaro), also protect at dawn and dusk and discuss prophylaxis with a travel medicine specialist.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/dominican-republic",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever — entry certificate only if arriving from a risk country",
      message:
        "There is no yellow fever risk in the Dominican Republic and the vaccine is not recommended for the destination itself. A YF vaccination certificate is required only for travelers arriving from (or transiting) a country with yellow fever transmission risk (including certain states of Brazil). Direct travel from Switzerland is not affected.",
      source: "CDC / WHO",
      sourceUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/dominican-republic",
      date: "Updated 2026",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers from one year of age. Note for Swiss travelers: Hepatitis A is not part of the routine Swiss BAG childhood schedule, so most adult travelers will need vaccination.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Ensure measles protection is up to date.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, those visiting friends and relatives, travelers to rural areas, or those staying in poor hygienic conditions.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals). Stray dogs are the main rabies vector.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination indicated during chikungunya outbreaks; may also be considered for travelers with elevated exposure (see EKRM statement). The Dominican Republic experienced a large chikungunya epidemic in 2014 and continues to report periodic activity.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination is currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited and present year-round in certain provinces; the parasite is P. falciparum and remains chloroquine-sensitive. Risk areas include Azua, Elías Piña, La Altagracia, San Juan, and parts of Greater Santo Domingo. Notably, La Altagracia contains the main resort zone of Punta Cana / Bávaro, which has historically carried low-level risk — discuss prophylaxis or standby treatment for stays there with a travel medicine specialist. All other provinces need mosquito protection only.",
      keyFacts: [
        { label: "Risk areas", value: "Azua, Elías Piña, La Altagracia, San Juan, parts of Santo Domingo" },
        { label: "Resorts", value: "Punta Cana / Bávaro (La Altagracia) — low-level risk historically" },
        { label: "Parasite", value: "P. falciparum, chloroquine-sensitive" },
        { label: "Prevention", value: "Mosquito protection; prophylaxis/standby for risk areas" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/dominican-republic",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/dominican-republic.jpg",
      mapCaption: "Malaria risk areas in Dominican Republic (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round, with peaks during and after the rainy season. Transmission occurs across the country including resort areas. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, including resort areas" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "The Dominican Republic was heavily affected during the 2014 Caribbean chikungunya epidemic and continues to report periodic activity, including travel-associated regional spread. The same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination is considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
    zika: {
      riskSummary:
        "Zika transmission has been reported in the Dominican Republic. Because Zika infection in pregnancy can cause serious birth defects, pregnant travelers are advised not to travel to areas with risk; those planning pregnancy should discuss timing and precautions with their doctor. Zika can also be sexually transmitted, so condom use and bite prevention are advised for couples.",
      keyFacts: [
        { label: "Pregnancy", value: "Avoid travel if pregnant; risk of birth defects" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
        { label: "Sexual", value: "Can be sexually transmitted — use condoms" },
      ],
      cdcMapUrl: "https://wwwnc.cdc.gov/travel/destinations/traveler/none/dominican-republic",
    },
  },
};
