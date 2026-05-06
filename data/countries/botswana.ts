import type { CountryInfo } from "./types";

// ── Botswana (Southern Africa) — full brief ────────────────────────────────
export const botswana: CountryInfo = {
  vaccinesRecommended: [
    "Hepatitis A",
    "Polio (booster)",
    "Routine vaccines (MMR, Tdap, varicella, COVID-19)",
  ],
  vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies", "Cholera"],
  malariaRisk: "high",
  yellowFever: "none",
  foodWater:
    "Standard food and water precautions apply, especially outside Gaborone and the safari camps. Bottled or boiled water for drinking and brushing teeth; avoid ice of unknown origin and uncooked produce you cannot peel yourself.",
  mosquito:
    "Strict mosquito-bite prevention is essential in the northern half of the country. DEET- or picaridin-based repellent, long sleeves and trousers from dusk, and bed nets at lodges that do not provide screens. Chemoprophylaxis is recommended for travel to the northern districts (see malaria card below).",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/botswana",

  countryAlerts: [
    {
      level: "warning",
      title: "Polio booster recommended",
      message:
        "Vaccine-derived poliovirus has been detected in Botswana, with regional spillover from the Democratic Republic of the Congo. Adults whose primary series was completed should receive a single lifetime IPV booster before travel.",
      source: "CDC Global Polio Alert",
      sourceUrl: "https://wwwnc.cdc.gov/travel/notices/level1/global-polio",
    },
    {
      level: "info",
      title: "Yellow fever certificate required for some itineraries",
      message:
        "A valid yellow fever vaccination certificate is required for travelers ≥1 year of age arriving within 6 days of leaving — or transiting through — a country with risk of YF transmission. This applies even to airport transits where the traveler passes immigration. The vaccine is not medically recommended for Botswana itself.",
      source: "WHO / Government of Botswana",
      sourceUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing-international-travelers/yellow-fever-vaccine-and-malaria-prevention-information-by-country",
    },
    {
      level: "info",
      title: "Active malaria transmission in the north",
      message:
        "Northern Botswana — including the Okavango Delta and Chobe National Park — is currently classified as high malaria risk by NHS Fit-for-Travel due to ongoing transmission. Chemoprophylaxis is essential for any safari itinerary entering these zones.",
      source: "NHS Fit for Travel",
      sourceUrl: "https://www.fitfortravel.nhs.uk/destinations/africa/botswana",
    },
  ],

  vaccinesDetail: [
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Botswana. Two doses, 6–12 months apart, give long-term protection; a single dose protects for the trip.",
    },
    {
      name: "Polio",
      slug: "polio",
      audience: "all",
      note: "A one-time adult IPV booster is recommended given recent vaccine-derived poliovirus detection in Botswana and the broader southern-African region.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, COVID-19 — per Swiss BAG schedule. Measles outbreaks are ongoing globally; both doses of MMR are essential.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for longer stays, travelers visiting friends or relatives, off-the-beaten-track itineraries, and travelers with reduced gastric acidity. Less essential for short luxury safari circuits.",
    },
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "specific",
      note: "Not recommended for medical reasons. A valid ICVP certificate is required only if entering Botswana within 6 days of leaving a YF-risk country (including airport transit through one).",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider for travelers who may have sexual contact with new partners, receive medical or dental care, get tattoos or piercings, or stay >4 weeks. HIV prevalence in Botswana remains among the highest worldwide.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Pre-exposure recommended for cyclists, motorcyclists, hikers in remote areas, young children, anyone working with animals, and cavers (bat exposure). Pre-exposure simplifies post-exposure management — only 2 vaccine doses are needed afterwards, and immunoglobulin is not required.",
    },
    {
      name: "Cholera",
      audience: "specific",
      note: "Selective vaccination only — for humanitarian workers, healthcare staff in outbreak settings, or travelers with reduced gastric acidity heading to areas with active transmission. Not routinely needed for tourism.",
    },
  ],

  diseases: {
    malaria: {
      riskSummary:
        "Plasmodium falciparum predominates and is chloroquine-resistant. Risk is geographic and seasonal: highest in the northern districts year-round, peaking September–May. The Okavango Delta and Chobe — the country's two main safari destinations — both fall in high-risk zones.",
      keyFacts: [
        { label: "High year-round", value: "N. Ngamiland, N. Chobe NP" },
        { label: "Seasonal high", value: "Sep–May, north of Kalahari" },
        { label: "Seasonal med", value: "Jun–Aug, same belt" },
        { label: "Year-round mod", value: "SE incl. Francistown" },
        { label: "Low risk", value: "Gaborone, Serowe, Molepolole" },
        { label: "No risk", value: "Tsabong" },
        { label: "Prophylaxis", value: "AP, doxy, mefloquine, tafenoquine" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/botswana",
    },
    yellowFever: {
      riskSummary:
        "No yellow fever risk in country. A vaccination certificate is required at entry for travelers ≥1 year of age arriving within 6 days of leaving — or transiting through — a country on the WHO yellow fever risk list.",
      keyFacts: [
        { label: "Medical risk", value: "None" },
        { label: "Entry rule", value: "Cert if from YF-risk country" },
        { label: "Min age", value: "≥1 year" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/botswana",
    },
    dengue: {
      riskSummary:
        "Dengue is not a major endemic disease in Botswana, though sporadic cases do occur. Mosquito-bite prevention as already advised for malaria covers dengue risk too. The Qdenga vaccine is not routinely recommended for Botswana.",
      cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is not currently circulating at outbreak levels in Botswana. The newer chikungunya vaccine (IXCHIQ) is reserved for outbreak destinations or travelers with elevated individual risk.",
    },
  },
};
