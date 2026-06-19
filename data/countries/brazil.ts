import type { CountryInfo } from "./types";

// ── Brazil (South America) — full brief ────────────────────────────────────
// Sources: EKRM/ECTM Swiss Expert Committee for Travel Medicine country page
// (April 2026 revision); CDC Yellow Book Brazil chapter; PAHO dengue
// surveillance; WHO Disease Outbreak News.
//
// Notable Swiss-specific positions reflected here:
//   • EKRM recommends considering yellow fever vaccination for ALL regions
//     of Brazil, going further than WHO's region-by-region recommendation,
//     given continued geographic expansion of YF since the 2016 outbreak.
//   • Qdenga (dengue vaccine) is recommended only for previously-infected
//     travelers heading to high-transmission regions — not for first-timers,
//     due to severity risk in a primary infection.
export const brazil: CountryInfo = {
  vaccinesRecommended: [
    "Yellow fever",
    "Hepatitis A",
    "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
  ],
  vaccinesConsider: [
    "Hepatitis B",
    "Rabies",
    "Typhoid",
    "Chikungunya",
    "Dengue (selective)",
  ],
  malariaRisk: "present",
  yellowFever: "required-or-recommended",
  foodWater:
    "Standard food and water precautions, particularly outside major cities and resort areas. Bottled or filtered water for drinking and brushing teeth, especially in the Amazon and rural northeast. Street food in tourist hubs is generally safer than in remote regions.",
  mosquito:
    "Strict mosquito-bite prevention is essential. Brazil has year-round transmission of dengue, Zika, and chikungunya in addition to malaria in Amazonian regions. Daytime-biting Aedes mosquitoes (dengue, Zika, chikungunya) demand daytime protection; Anopheles (malaria) bite from dusk into the night. DEET 30%+ or picaridin 20%, long sleeves at peaks, screened or air-conditioned accommodation.",

  cdcCountryUrl:
    "https://wwwnc.cdc.gov/travel/destinations/traveler/none/brazil",

  countryAlerts: [

    {
      level: "warning",
      title: "Major dengue activity ongoing",
      message:
        "Brazil declared a national dengue emergency in 2024 and case numbers have remained elevated through 2025–2026. Risk is highest in urban areas and during the rainy season (December–May). Strict daytime mosquito protection is essential for every traveler, including those visiting cities with no malaria risk.",
      source: "PAHO — Pan American Health Organization",
      sourceUrl: "https://www.paho.org/en/topics/dengue",
    },
  ],

  vaccinesDetail: [
    {
      name: "Yellow fever",
      slug: "yellow-fever",
      audience: "all",
      note: "Per the Swiss Expert Committee (EKRM/ECTM), yellow fever vaccination should be considered for ALL regions of Brazil — not only the historical risk zones — given continued geographic expansion since 2016. A single dose provides lifelong protection. Must be given at least 10 days before travel at an authorized Swiss YF center. Live vaccine: contraindicated in immunosuppressed patients, pregnant women, and adults >60 starting a primary series (specialist consultation required for these groups).",
    },
    {
      name: "Hepatitis A",
      slug: "hepatitis-a",
      audience: "all",
      note: "Recommended for all travelers to Brazil. Two doses 6–12 months apart give long-term protection; a single dose covers the trip.",
    },
    {
      name: "Routine vaccines",
      audience: "all",
      note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Measles outbreaks remain ongoing globally; both doses of MMR are essential. Adults whose polio primary series is complete should have had at least one IPV booster as adults.",
    },
    {
      name: "Hepatitis B",
      slug: "hepatitis-b",
      audience: "specific",
      note: "Consider for travelers who may receive medical or dental care, get tattoos or piercings, have new sexual contacts, or stay >4 weeks. Already part of routine Swiss childhood vaccination since 2019 — most younger travelers are likely already protected.",
    },
    {
      name: "Rabies",
      slug: "rabies",
      audience: "specific",
      note: "Pre-exposure recommended for long stays, cyclists, motorcyclists, hikers in remote areas, young children, animal workers, and cavers (significant bat exposure in some regions). Pre-exposure simplifies post-bite management — only 2 vaccine doses needed afterwards, and immunoglobulin is not required.",
    },
    {
      name: "Typhoid",
      slug: "typhoid",
      audience: "specific",
      note: "Recommended for long-stay travelers, those visiting friends and relatives, off-the-beaten-track itineraries, and travelers with reduced gastric acidity. Less essential for short stays in tourist hubs.",
    },
    {
      name: "Chikungunya",
      slug: "chikungunya",
      audience: "specific",
      note: "The IXCHIQ vaccine can be considered in case of an active local outbreak or for travelers heading to high-incidence regions for extended stays. Not routine for short tourist visits.",
    },
    {
      name: "Dengue",
      slug: "dengue",
      audience: "specific",
      note: "Qdenga is recommended only for travelers with a prior confirmed dengue infection who are travelling to high-transmission regions. Two doses, 3 months apart. Not for first-time visitors — primary infection after vaccination can be more severe.",
    },
  ],

  diseases: {
    yellowFever: {
      riskSummary:
        "Yellow fever is endemic across most of Brazil, with circulation expanding since 2016 to areas previously declared free — including São Paulo and Rio de Janeiro. The Swiss Expert Committee (EKRM/ECTM) now recommends considering vaccination for ALL of Brazil, beyond the WHO's regional list. No entry certificate is required; the rationale is medical protection.",
      keyFacts: [
        { label: "Vaccine", value: "Single dose, lifelong protection" },
        { label: "Timing", value: "≥10 days before travel" },
        { label: "Where to get it", value: "Authorized Swiss YF centers only" },
        { label: "Entry rule", value: "Not required" },
        { label: "Swiss recommendation", value: "Consider for ALL regions" },
        { label: "Iguaçu Falls", value: "Vaccination advised" },
      ],
      cdcMapUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/brazil.jpg",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/yellow-fever/brazil.jpg"

    },
    malaria: {
      riskSummary:
        "Plasmodium vivax predominates in Brazil (unusual compared to Africa where P. falciparum dominates), with falciparum more frequent in parts of the Amazon. Risk is highly geographic: high in Amazon basin areas, none in the major tourist cities (Rio, São Paulo, Brasília, Iguaçu Falls). Itinerary — not the country itself — determines whether prophylaxis is needed.",
      keyFacts: [
        { label: "High risk", value: "Amazon: parts of Acre, Amapá, Amazonas, Roraima; NE/SW Pará" },
        { label: "Moderate", value: "Parts of Amapá, Rondônia, W Pará, W Mato Grosso; Manaus, Boa Vista, Porto Velho" },
        { label: "Low risk", value: "Rest of Amazon states, Pantanal, rural NE forests" },
        { label: "No risk", value: "Brasília, Rio, São Paulo, Recife, Salvador, Fortaleza, Iguaçu Falls" },
        { label: "Predominant species", value: "P. vivax (most areas)" },
        { label: "Prophylaxis", value: "AP or doxycycline for high-risk Amazon" },
        { label: "Standby treatment", value: "Consider for moderate-risk regions" },
      ],
      cdcMapUrl:
        "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/brasil",
      cdcMapImageUrl:
        "https://www.cdc.gov/yellow-book/media/images/malaria/brazil.jpg",
      mapCaption: "Malaria risk areas in Brasil (CDC).",
    },
    dengue: {
      riskSummary:
        "Dengue is hyperendemic across Brazil, with year-round transmission and large outbreaks during the rainy season (December–May). 2024 saw the largest outbreak on record, with elevated transmission continuing through 2026. All four serotypes circulate. Daytime mosquito protection is essential for every traveler, including those staying only in cities with no malaria risk.",
      keyFacts: [
        { label: "Transmission", value: "Year-round, all of Brazil" },
        { label: "Peak season", value: "December–May (rainy)" },
        { label: "Vector", value: "Aedes aegypti — daytime biter" },
        { label: "Serotypes", value: "All 4 circulating" },
        { label: "Vaccine (Qdenga)", value: "Only if previously infected" },
      ],
      cdcMapUrl:
        "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
    },
    chikungunya: {
      riskSummary:
        "Chikungunya is endemic in Brazil with periodic outbreaks, particularly in the Northeast and Southeast. Same Aedes mosquito vector as dengue, so the same daytime protection applies. Joint pain can persist for months after acute infection. The IXCHIQ vaccine is considered for outbreak settings or extended high-risk stays.",
    },
    zika: {
      riskSummary:
        "Zika circulates at low background levels across Brazil following the major 2015–2016 epidemic. Pregnancy and pre-conception planning remain the key clinical concerns: pregnant women should avoid travel to Brazil, and couples should use condoms during travel and for 3 months after return.",
    },
  },
};
