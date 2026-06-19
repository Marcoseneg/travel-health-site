import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024,
// WHO Polio IHR Emergency Committee (PHEIC, updated 2026). Framing reflects
// Swiss BAG schedule. Notable: malaria and Japanese encephalitis are
// concentrated in the southern Terai lowlands below ~2,000 m; Kathmandu,
// Pokhara, and the classic Himalayan trekking routes are malaria-free. Acute
// mountain sickness is a central concern for trekkers (Everest/Annapurna). No
// YF risk; certificate only if arriving from a YF-endemic country.
export const nepal: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Typhoid",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Japanese encephalitis",
    "Cholera",
  ],
  malariaRisk: "limited",
  yellowFever: "none",
  foodWater:
    "Traveler's diarrhea, typhoid, and hepatitis A are very common, including on the trekking trail. Use bottled or properly treated water, avoid ice from unverified sources, and favor thoroughly cooked food and fruit you peel yourself. Cholera circulates seasonally — careful food and water hygiene matters, especially outside major hotels.",
  mosquito:
    "Mosquito-borne risk is concentrated in the southern Terai lowlands. There, use daytime protection (DEET or picaridin repellent, long sleeves) against dengue and at dawn/dusk and overnight against Japanese encephalitis, plus malaria bite protection below ~2,000 m. Kathmandu, Pokhara, and high trekking routes have little to no mosquito-borne risk.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/nepal",

  countryAlerts: [
    {
      level: "warning",
      title: "Altitude — acute mountain sickness on treks",
      message:
        "Nepal's classic treks (Everest Base Camp, Annapurna, and high passes) routinely exceed 4,000–5,000 m, where acute mountain sickness, and the more dangerous high-altitude cerebral and pulmonary edema (HACE/HAPE), are real risks. Ascend gradually, build in acclimatization days, and learn to recognize warning signs and when to descend. Discuss preventive measures and standby medication (e.g. acetazolamide) with your travel medicine specialist before departure.",
      source: "EKRM / CDC",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Polio — WHO recommends a booster for some travelers",
      message:
        "Nepal is among the states WHO lists in connection with the standing polio public-health emergency. Travelers should be fully immunized against polio per the Swiss BAG schedule; adults who completed their childhood series are generally advised to have had one lifetime IPV booster. Discuss with your travel medicine specialist, particularly for longer stays.",
      source: "WHO Polio IHR Emergency Committee / CDC",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever — certificate only if arriving from a risk country",
      message:
        "There is no yellow fever risk in Nepal. A YF vaccination certificate is required only for travelers arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      source: "CDC / WHO",
      sourceUrl: "https://www.healthytravel.ch",
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
      name: "Typhoid",
      slug: "typhoid",
      audience: "all",
      note: "Recommended for most travelers, and particularly for trekkers, those visiting friends and relatives, staying in rural areas, or for longer stays.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization (plus adult booster — see alert), Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule. Confirm measles (MMR) protection given ongoing global resurgence.",
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
      note: "Particularly recommended for long stays, trekking and travel to remote areas with limited access to post-exposure care, cyclists/motorbike trips, infants and children, and those working with animals. Stray dogs are a common rabies vector, including in Kathmandu.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending extended time (typically a month or more, or shorter with high-risk rural exposure) in the southern Terai rice-growing lowlands during transmission season. Not needed for typical Kathmandu/Pokhara or high-altitude trekking itineraries.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "May be considered for aid/relief workers or travelers heading to areas of active transmission under poor sanitary conditions. Not needed for typical tourist travel.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited to the southern Terai lowlands below about 2,000 m. Chemoprophylaxis is recommended for the higher-risk districts of Sudurpashchim and Karnali provinces below 2,000 m; other lowland areas below 2,000 m have only rare cases and call for mosquito-avoidance measures. Kathmandu, Pokhara, and the classic Himalayan trekking routes are malaria-free.",
      keyFacts: [
        { label: "Chemoprophylaxis", value: "Sudurpashchim & Karnali provinces below 2,000 m" },
        { label: "Bite protection", value: "Other Terai areas below 2,000 m (rare cases)" },
        { label: "No risk", value: "Kathmandu, Pokhara, Himalayan trekking routes" },
        { label: "Species", value: "Mostly P. vivax (chloroquine-resistant); <10% P. falciparum" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/nepal",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/nepal.jpg",
      mapCaption: "Malaria risk areas in Nepal (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue has expanded in recent years, with large outbreaks in the Terai and in Kathmandu Valley during and after the monsoon. Risk falls off at higher elevations. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Terai and Kathmandu Valley; less at altitude" },
        { label: "Season", value: "Peaks during/after monsoon (roughly Aug–Nov)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in Nepal. A YF certificate is required only for travelers arriving from a country with risk of YF transmission. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/nepal",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission occurs, mainly in the lowlands, sharing the same daytime Aedes mosquito vector as dengue — so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
