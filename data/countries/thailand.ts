import type { CountryInfo } from "./types";

// Sources: EKRM/HealthyTravel (Swiss travel medicine authority), CDC Yellow
// Book 2024. Framing reflects Swiss BAG schedule. Notable: HIV entry
// restriction; YF entry rule with Thai T8 form; malaria limited to small
// border areas, with major tourist destinations all low- or no-risk.
export const thailand: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Routine vaccines",
  ],
  vaccinesConsider: [
    "Typhoid",
    "Hepatitis B",
    "Rabies",
    "Japanese encephalitis",
    "Chikungunya",
    "Dengue",
  ],
  malariaRisk: "limited",
  yellowFever: "required-or-recommended",
  foodWater:
    "Use bottled or filtered water, avoid ice from unverified sources, and pay attention to food hygiene. Standard tropical precautions reduce risk of traveler's diarrhea, hepatitis A, and typhoid — especially relevant when eating outside major hotels and resorts.",
  mosquito:
    "Year-round dengue and chikungunya risk in urban and rural areas means daytime mosquito protection (DEET or picaridin repellent, long sleeves) is essential — including in tourist destinations like Phuket and Koh Samui. For travel near Myanmar border or rural rice-growing areas, also protect at dawn/dusk for malaria and Japanese encephalitis.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/thailand",

  countryAlerts: [
    {
      level: "info",
      title: "HIV entry restriction",
      message:
        "Thailand may deny entry to travelers with confirmed or suspected HIV infection. Travelers with HIV should consult their travel medicine specialist before booking, particularly for long-term stays or work permits, as additional documentation may be required.",
      source: "EKRM / Thai immigration guidance",
      sourceUrl: "https://www.healthytravel.ch",
      date: "Updated 2026",
    },
    {
      level: "info",
      title: "Yellow fever entry rule — T8 form required",
      message:
        "Travelers arriving in Thailand within 10 days of leaving (or in transit through) a yellow-fever-risk country must carry a YF vaccination certificate AND complete the T8 health declaration form at thaihealthpass.com, uploading the certificate. Exempt: children under 1 year, passengers in transit who don't leave the airport transit zone, and passengers whose only YF-country contact was airport transit without disembarking. Direct travel from Switzerland is not affected.",
      source: "Thailand Ministry of Public Health",
      sourceUrl: "https://thaihealthpass.com/",
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
      name: "Routine vaccines",
      audience: "all",
      note: "Polio basic immunization, Diphtheria-Tetanus-Pertussis, Measles-Mumps-Rubella, Varicella — per Swiss BAG schedule.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-term travelers, visiting friends and relatives, those staying in poor hygienic conditions, or with individual risk factors.",
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
      note: "Particularly recommended for: long stays; high individual risk regardless of duration (cycling/motorbike trips, hiking in remote areas, infants and children, those working with animals, cavers — bats!). Stray dogs and macaques (especially in temple complexes) are common rabies vectors in Thailand.",
    },
    {
      name: "Japanese encephalitis",
      slug: "japanese-encephalitis",
      audience: "specific",
      note: "Consider for travelers spending significant time in rural rice-growing areas, particularly during transmission season (varies by region). Not needed for typical urban or beach-resort itineraries.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga® vaccination currently recommended only for travelers with documented prior dengue infection who will be exposed in a region with high dengue transmission.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "Vaccination indicated during chikungunya outbreaks; may also be considered for countries with elevated risk (see EKRM statement).",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Risk is limited to small border areas; the vast majority of tourist destinations are low- or no-risk. Moderate risk on Little Koh Chang (Andaman Sea, Ranong province near Myanmar border) and along the belt bordering Myanmar — emergency standby treatment may be discussed for these areas. The rest of the country including major beach destinations (Phuket, Koh Samui, Koh Phangan, Koh Phi Phi, Koh Yao Noi, Koh Yao Yai, Koh Lanta) is low risk with mosquito protection only. Bangkok, Chiang Mai, Chiang Rai, and Pattaya are no-risk.",
      keyFacts: [
        { label: "Moderate risk", value: "Little Koh Chang (Andaman); Myanmar border belt" },
        { label: "Low risk", value: "Rest of country incl. Phuket, Koh Samui, Koh Phangan, Koh Phi Phi, Koh Yao Noi, Koh Yao Yai, Koh Lanta, other islands" },
        { label: "No risk", value: "Bangkok, Chiang Mai, Chiang Rai, Pattaya" },
        { label: "Prevention", value: "Mosquito protection in low-risk areas; consider standby treatment for border areas" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/thailand",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/thailand.jpg",
      mapCaption: "Malaria risk areas in Thailand (CDC).",
    },
    dengue: {
      riskSummary:
        "Endemic year-round throughout Thailand, with peaks during rainy season (May–November). All major tourist destinations including Bangkok, Chiang Mai, Phuket, and the southern islands have year-round transmission. Daytime mosquito-bite prevention is the main protection.",
      keyFacts: [
        { label: "Distribution", value: "Nationwide, all major cities and islands" },
        { label: "Season", value: "Year-round; peaks May–November (rainy season)" },
        { label: "Mosquito", value: "Aedes aegypti — bites during daytime" },
      ],
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. Thailand requires YF certificate plus T8 health declaration via thaihealthpass.com for travelers arriving within 10 days of YF-endemic country. See country alert for full details. Direct travel from Switzerland not affected.",
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/thailand",
    },
    chikungunya: {
      riskSummary:
        "Sporadic transmission with periodic outbreaks, including notable activity in southern Thailand. Same daytime Aedes mosquito vector as dengue, so dengue prevention also protects against chikungunya. Vaccination considered in outbreak settings (see EKRM statement).",
      cdcMapUrl: "https://www.cdc.gov/chikungunya/geo/",
    },
  },
};
