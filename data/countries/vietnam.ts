import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority,
// https://www.healthytravel.ch), CDC Travelers' Health & Yellow Book 2024.
// Framing reflects Swiss BAG schedule. Notable: malaria limited to defined
// rural/highland provinces with all major cities and the deltas no-risk;
// no domestic yellow fever risk but a YF certificate is required when
// arriving from a YF-risk country; year-round dengue.
export const vietnam: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Hepatitis B",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Rabies",
    "Japanese encephalitis",
    "Dengue",
  ],
  malariaRisk: "limited",
  yellowFever: "possible",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce the risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating at street stalls and outside major hotels.",
  mosquito:
    "Dengue circulates year-round across the country, including Hanoi, Ho Chi Minh City, and coastal resorts, so daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential. For trips to the central highlands and rural southern/central provinces, also protect at dawn and dusk against malaria and Japanese encephalitis.",

  reviewStatus: "draft",
  lastReviewed: "June 2026",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/vietnam",

  countryAlerts: [
    {
      level: "info",
      title: "Yellow fever entry certificate",
      message:
        "Vietnam requires a yellow fever vaccination certificate from travelers (over 1 year of age) arriving from — or having transited through the airport of — a country with risk of yellow fever transmission. There is no yellow fever in Vietnam itself. Direct travel from Switzerland is not affected.",
      source: "WHO / EKRM",
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
      note: "CDC recommends Hepatitis B for unvaccinated travelers of all ages to Vietnam. Routine in the Swiss childhood schedule since 1998 — younger travelers are usually already covered; older travelers should check their status.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for most travelers, particularly those visiting friends and relatives, smaller cities or rural areas, long-term travelers, or those with individual risk factors.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Rabid dogs are found in Vietnam and post-exposure care can be hard to access in rural areas.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending a month or more in rural rice-growing areas, or shorter stays involving extensive rural/outdoor exposure. Not needed for typical urban or short beach itineraries.",
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
        "Risk is limited to defined rural and highland provinces; the major cities, the deltas, and the main tourist circuit are no-risk. Higher risk in the central highland and south-central provinces (e.g. Đắk Lắk, Đắk Nông, Gia Lai, Kon Tum, Lâm Đồng, Bình Phước, Ninh Thuận, Khánh Hòa, Tây Ninh). No risk in Hanoi, Ho Chi Minh City, Da Nang, Nha Trang, Hai Phong, Quy Nhon, Halong Bay, and the Mekong and Red River Deltas — mosquito protection only.",
      keyFacts: [
        { label: "Higher risk", value: "Central highlands & south-central rural provinces" },
        { label: "No risk", value: "Hanoi, HCMC, Da Nang, Nha Trang, Halong Bay, Mekong & Red River Deltas" },
        { label: "Resistance", value: "Chloroquine resistant" },
        { label: "Prevention", value: "Chemoprophylaxis for highland provinces; bite protection elsewhere" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/vietnam",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/vietnam.jpg",
      mapCaption: "Malaria risk areas in Vietnam (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Vietnam, with peaks during the rainy season. All major destinations including Hanoi, Ho Chi Minh City, Da Nang, and the coastal resorts have transmission. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, all major cities" },
        { label: "Season", value: "Year-round; peaks in rainy season" },
        { label: "Mosquito", value: "Aedes — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A YF certificate is required for travelers arriving from (or transiting the airport of) a YF-risk country. See country alert for details. Direct travel from Switzerland is not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/vietnam",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission via the same daytime Aedes mosquito as dengue, so dengue bite-prevention measures also protect against chikungunya. Routine vaccination is generally not recommended; it may be considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
