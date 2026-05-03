// ─────────────────────────────────────────────────────────────────────────────
// Country health data
// ─────────────────────────────────────────────────────────────────────────────
//
// SCHEMA NOTES
//
// Two layers of fields per country:
//
//   1. CORE FIELDS (always required) — used by the globe coloring,
//      itinerary summary, and any code that doesn't need rich detail.
//      Simple enums and string arrays.
//
//   2. DETAILED FIELDS (all optional) — used by the country detail page
//      when present. CDC-aligned, deliberately lightweight: brief summaries
//      and outbound links. Depth is opt-in via clicking through to:
//        - Internal disease pages (/diseases/[slug]) for clinical detail
//        - CDC Yellow Book / Travelers' Health pages for maps & definitive guidance
//
// CONTENT SOURCES
// All CDC content is US Government work and public domain. Swiss BAG
// (Bundesamt für Gesundheit) publications are also in the public domain.
// We cite both, never reproduce verbatim, and link to originals.
//
// HOW TO ADD A CDC MAP TO A DISEASE
// -----------------------------------------------------------------------------
// 1. Open the CDC page for that country, e.g.
//    https://wwwnc.cdc.gov/travel/destinations/traveler/none/afghanistan
// 2. Right-click on the malaria/YF map image → "Copy Image Address"
// 3. Paste into `cdcMapImageUrl`. Example:
//      malaria: { ..., cdcMapImageUrl: "https://wwwnc.cdc.gov/travel/.../map.png" }
// 4. Or self-host: download the image, save to `public/maps/malaria/<slug>.png`,
//    set `localMapImageUrl: "/maps/malaria/<slug>.png"`. Self-hosted is preferred
//    long-term; hotlinking can break if CDC restructures URLs.
// 5. If the image URL is wrong/broken, the page automatically falls back to
//    the text-only view with the existing "View on CDC ↗" link.
//
// ─────────────────────────────────────────────────────────────────────────────

// ── Core types (existing, unchanged) ──────────────────────────────────────────
export type CountryInfo = {
  vaccinesRecommended: string[];
  vaccinesConsider: string[];
  malariaRisk: "none" | "limited" | "present" | "high";
  yellowFever: "none" | "possible" | "required-or-recommended";
  foodWater: string;
  mosquito: string;

  // ── Optional CDC-aligned detail fields ──────────────────────────────────────
  cdcCountryUrl?: string;
  countryAlerts?: CountryAlert[];
  vaccinesDetail?: VaccineEntry[];
  diseases?: {
    malaria?: DiseaseSummary;
    yellowFever?: DiseaseSummary;
    dengue?: DiseaseSummary;
    chikungunya?: DiseaseSummary;
  };
};

export type CountryAlert = {
  level: "info" | "warning";
  title: string;
  message?: string;
  source?: string;
  sourceUrl?: string;
  date?: string;
};

export type VaccineEntry = {
  name: string;
  slug?: string;            // links to /diseases/[slug] if a page exists
  audience: "all" | "specific";
  note?: string;            // brief: "for stays >1 week", "long-term stays"
};

export type DiseaseSummary = {
  riskSummary: string;        // 1-2 short sentences, plain English
  cdcMapUrl?: string;         // direct link to CDC's relevant page (text + map)
  // Optional inline map images. localMapImageUrl is preferred over
  // cdcMapImageUrl when both are set. If neither loads, the card renders
  // text-only without a broken-image gap.
  cdcMapImageUrl?: string;    // hotlinked from CDC (may fail if blocked)
  localMapImageUrl?: string;  // path under /public/maps/... (self-hosted)
  mapCaption?: string;        // optional small caption under the image
  // Optional structured key facts. When present, renders as a small
  // labeled-row table inside the disease card. Use sparingly — 3–5 facts max.
  // Examples: { label: "Regions", value: "Below 2000m" }, { label: "Season",
  // value: "April–December" }, { label: "Resistance", value: "Chloroquine" }.
  keyFacts?: KeyFact[];
};

export type KeyFact = {
  label: string;  // short, ALL CAPS in render — keep <= 12 chars (e.g. "Season")
  value: string;  // the data point — keep concise, ideally < 40 chars
};

// ─────────────────────────────────────────────────────────────────────────────
// COUNTRIES
// ─────────────────────────────────────────────────────────────────────────────

export const countries: Record<string, CountryInfo> = {

  // ── Afghanistan ─────────────────────────────────────────────────────────────
  // Sources: CDC Travelers' Health, CDC Yellow Book, Swiss BAG vaccination schedule.
  afghanistan: {
    vaccinesRecommended: [
      "Hepatitis A",
      "Typhoid",
      "Polio (booster)",
      "Measles (MMR)",
    ],
    vaccinesConsider: ["Rabies", "Hepatitis B", "Cholera"],
    malariaRisk: "present",
    yellowFever: "none",
    foodWater:
      "Use bottled or treated water. Eat thoroughly cooked food and avoid raw produce you haven't peeled yourself. Healthcare access is limited — preventing traveler's diarrhea is especially important.",
    mosquito:
      "Use DEET- or picaridin-based repellent, sleep under treated bed nets, and wear long sleeves at dusk and dawn. Particularly important in malaria-risk areas (below 2000m altitude, April–December).",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/afghanistan",

    countryAlerts: [
      {
        level: "info",
        title: "Active polio circulation",
        message:
          "Wild poliovirus continues to circulate in Afghanistan. Ensure polio vaccination is up to date. For stays longer than 4 weeks, a booster received 4 weeks to 12 months before exit may be required, documented on an International Certificate of Vaccination.",
        source: "CDC Travel Health Notices",
        sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
        date: "Updated March 2026",
      },
    ],

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for travel to most low- and middle-income countries.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "all",
        note: "Recommended for travelers eating outside major hotels/restaurants, or stays >1 week.",
      },
      {
        name: "Polio",
        slug: "polio",
        audience: "all",
        note: "Booster recommended for adults; documentation may be requested at exit for stays >4 weeks.",
      },
      {
        name: "Measles (MMR)",
        slug: "measles",
        audience: "all",
        note: "All travelers should be fully vaccinated — two documented doses for those born after 1957.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "Tdap, varicella, influenza, COVID-19 — per Swiss BAG schedule.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long-term stays, rural travel, occupational animal exposure, or activities like cycling and hiking in remote areas.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
      {
        name: "Cholera",
        audience: "specific",
        note: "For high-risk settings (humanitarian aid, refugee camps, outbreak areas).",
      },
    ],

    diseases: {
      malaria: {
        riskSummary:
          "Risk varies sharply by altitude and season. Discuss chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) with a travel medicine specialist before departure.",
        keyFacts: [
          { label: "Regions", value: "All areas below 2000m" },
          { label: "Above 2000m", value: "No risk" },
          { label: "Season", value: "April–December" },
          { label: "Species", value: "P. vivax (primary), P. falciparum" },
          { label: "Resistance", value: "Chloroquine-resistant" },
        ],
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/afghanistan",
        cdcMapImageUrl:
          "https://www.cdc.gov/yellow-book/media/images/malaria/afghanistan.jpg",
        mapCaption: "Malaria risk areas in Afghanistan (CDC).",
      },
      yellowFever: {
        riskSummary:
          "No yellow fever risk in country. A vaccination certificate is required at entry only for travelers ≥9 months of age arriving from countries with yellow fever transmission risk.",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/afghanistan",
      },
      dengue: {
        riskSummary:
          "Present, primarily in eastern provinces. No vaccine routinely recommended for travelers without prior dengue infection. Daytime mosquito-bite prevention is the main protection.",
        cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
      },
    },
  },

  // ── Albania ────────────────────────────────────────────────────────────────
  // Sources: CDC Travelers' Health, CDC Yellow Book, Swiss BAG.
  albania: {
    vaccinesRecommended: [
      "Hepatitis A",
      "Routine vaccines (MMR, Tdap, varicella, polio, COVID-19)",
    ],
    vaccinesConsider: ["Hepatitis B", "Tick-borne encephalitis", "Rabies"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Tap water quality varies. Outside major hotels, prefer bottled or treated water and avoid uncooked produce you haven't peeled yourself. Most cooked food in restaurants is safe.",
    mosquito:
      "Tick exposure is the more relevant arthropod risk. Use repellent and check for ticks after hiking or outdoor activities, especially in spring and summer in forested areas.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/albania",

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for travel to most low- and middle-income countries.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Ensure measles immunity in particular.",
      },
      {
        name: "Tick-borne encephalitis (TBE)",
        slug: "tick-borne-encephalitis",
        audience: "specific",
        note: "Consider for travelers planning extended outdoor activity (hiking, camping, forestry) in spring through autumn.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like hiking and cycling in remote areas.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
    ],

    diseases: {
      yellowFever: {
        riskSummary:
          "No yellow fever risk in country. A vaccination certificate is required at entry only for travelers ≥1 year of age arriving from countries with yellow fever transmission risk (within 6 days of departure or transit through such countries).",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/albania",
      },
    },
  },

  // ── Egypt ──────────────────────────────────────────────────────────────────
  // Sources: CDC Travelers' Health, CDC Yellow Book, WHO, Swiss BAG.
  egypt: {
    vaccinesRecommended: [
      "Hepatitis A",
      "Polio (booster)",
      "Routine vaccines (MMR, Tdap, varicella, COVID-19)",
    ],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Tap water in most large international tourist hotels is adequately chlorinated, but bottled water is generally provided for drinking. Outside major hotels, tap water is not safe. Avoid raw or undercooked meat and shellfish; the safety of uncooked vegetables and salads is questionable.",
    mosquito:
      "Daytime and evening mosquito-bite prevention reduces risk of dengue and other vector-borne infections. Use DEET- or picaridin-based repellent and protective clothing.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/egypt",

    countryAlerts: [
      {
        level: "info",
        title: "Polio booster recommended",
        message:
          "Vaccine-derived poliovirus has been detected in environmental samples in Egypt. Ensure polio vaccination is up to date — adult travelers who completed primary vaccination should receive a single lifetime booster dose. Documented polio vaccination may be requested at entry for travelers arriving from certain countries.",
        source: "CDC Yellow Book — Egypt",
        sourceUrl: "https://wwwnc.cdc.gov/travel/yellowbook/2024/itineraries/egypt",
        date: "Updated 2024",
      },
    ],

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Risk in Egypt is high. Recommended for all travelers.",
      },
      {
        name: "Polio",
        slug: "polio",
        audience: "all",
        note: "Booster recommended for adult travelers; documentation may be requested at entry from certain countries.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, COVID-19 — per Swiss BAG schedule. Ensure measles immunity.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "specific",
        note: "Consider for long-stay travelers, those visiting friends and relatives, or eating outside major tourist hotels.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal exposure, or activities with potential animal contact.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
    ],

    diseases: {
      malaria: {
        riskSummary:
          "Egypt was declared malaria-free by the WHO in 2024. Rare imported cases can occur due to ongoing travel from endemic regions and presence of competent vector mosquitoes, but routine chemoprophylaxis is not recommended.",
        keyFacts: [
          { label: "Status", value: "Malaria-free (WHO, 2024)" },
          { label: "Last local case", value: "Aswan Governorate, 2014" },
          { label: "Prophylaxis", value: "Not recommended" },
        ],
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/egypt",
      },
      yellowFever: {
        riskSummary:
          "No yellow fever risk in country. A vaccination certificate is required at entry for travelers ≥9 months of age arriving from countries with yellow fever transmission risk, including airport transits longer than 12 hours in such countries.",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/egypt",
      },
      dengue: {
        riskSummary:
          "Dengue cases are increasingly reported in Egypt, particularly among returning travelers. No vaccine routinely recommended for travelers without prior dengue infection. Daytime mosquito-bite prevention is the main protection.",
        cdcMapUrl:
          "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
      },
    },
  },

  // ── Algeria (North Africa) — lean ──────────────────────────────────────────
  algeria: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines (MMR, Tdap, polio)"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Tap water quality varies. Outside major hotels, prefer bottled or treated water and avoid raw produce you haven't peeled. Risk of traveler's diarrhea is moderate.",
    mosquito:
      "Mosquito-bite prevention is sensible during warm months but disease risk from mosquito-borne infections is low.",
  },

  // ── Angola (Central Africa) — lean ─────────────────────────────────────────
  angola: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Use bottled or treated water and avoid raw produce. Healthcare access outside Luanda is limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Use DEET- or picaridin-based repellent, treated bed nets, and long sleeves at dusk and dawn.",
  },

  // ── Benin (West Africa) — lean ─────────────────────────────────────────────
  benin: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Use bottled or treated water and eat only thoroughly cooked food. Traveler's diarrhea is common.",
    mosquito:
      "Strict mosquito-bite prevention is essential year-round. Malaria transmission is high country-wide. Meningococcal disease risk peaks in the dry season (December–June).",
  },

  // ── Botswana (Southern Africa) — lean ──────────────────────────────────────
  botswana: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Tap water in major cities is generally safe; in rural areas use bottled or treated water. Eat thoroughly cooked food.",
    mosquito:
      "Malaria risk is seasonal (November–June) and concentrated in the northern districts (Okavango, Chobe, Ngamiland). Mosquito-bite prevention essential in those areas; chemoprophylaxis recommended for travel there.",
  },

  // ── Burkina Faso (West Africa) — lean ──────────────────────────────────────
  "burkina-faso": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is limited outside Ouagadougou.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round. Meningococcal disease risk peaks in the dry season (December–June).",
  },

  // ── Burundi (East Africa) — lean ───────────────────────────────────────────
  burundi: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Use bottled or treated water and avoid raw produce.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential. Malaria transmission is high year-round, country-wide.",
  },

  // ── Cameroon (Central Africa) — lean ───────────────────────────────────────
  cameroon: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Use bottled or treated water and avoid raw produce.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Meningococcal disease risk in northern regions during the dry season.",
  },

  // ── Cape Verde (West Africa) — lean ────────────────────────────────────────
  "cape-verde": {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "limited",
    yellowFever: "possible",
    foodWater:
      "Use bottled water in less-developed areas. Most resort areas have safe food and water.",
    mosquito:
      "Malaria risk is very limited (occasional outbreaks on Santiago and Boa Vista). Dengue and Aedes-borne viruses occur. Use repellent during the day.",
  },

  // ── Central African Republic (Central Africa) — lean ───────────────────────
  "central-african-republic": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited; consider evacuation insurance.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide.",
  },

  // ── Chad (Central Africa) — lean ───────────────────────────────────────────
  chad: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever (south)", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential. Malaria year-round country-wide. Meningococcal disease risk in the dry season.",
  },

  // ── Comoros (East Africa) — lean ───────────────────────────────────────────
  comoros: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Use bottled water and eat thoroughly cooked food. Healthcare facilities are limited.",
    mosquito:
      "Mosquito-bite prevention essential — malaria and dengue both present. Chemoprophylaxis recommended for stays involving overnight stays outside resorts.",
  },

  // ── Republic of the Congo (Central Africa) — lean ──────────────────────────
  congo: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access outside Brazzaville is limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide.",
  },

  // ── Côte d'Ivoire (West Africa) — lean ─────────────────────────────────────
  "cote-divoire": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential, especially outside major hotels.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Djibouti (East Africa) — lean ──────────────────────────────────────────
  djibouti: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Use bottled or treated water. Eat thoroughly cooked food.",
    mosquito:
      "Mosquito-bite prevention is essential. Malaria transmission peaks during and after rainy season (October–April).",
  },

  // ── DR Congo (Central Africa) — lean ───────────────────────────────────────
  "dr-congo": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited; consider evacuation insurance.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria is high year-round, country-wide. Active outbreaks of Ebola and Mpox have been reported in recent years.",
  },

  // ── Equatorial Guinea (Central Africa) — lean ──────────────────────────────
  "equatorial-guinea": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide.",
  },

  // ── Eritrea (East Africa) — lean ───────────────────────────────────────────
  eritrea: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies", "Meningococcal"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Use bottled or treated water. Healthcare access is limited.",
    mosquito:
      "Mosquito-bite prevention essential below 2200m. Malaria year-round in low-altitude areas; no risk in Asmara or other high-altitude regions.",
  },

  // ── eSwatini (Southern Africa) — lean ──────────────────────────────────────
  eswatini: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Tap water in major hotels is generally safe; otherwise use bottled water.",
    mosquito:
      "Malaria risk is seasonal (November–May) in the northeastern lowveld (especially Big Bend, Mhlume, Tshaneni). Use repellent and consider chemoprophylaxis if visiting affected areas.",
  },

  // ── Ethiopia (East Africa) — lean ──────────────────────────────────────────
  ethiopia: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever (most areas)", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "present",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access outside Addis Ababa is limited.",
    mosquito:
      "Mosquito-bite prevention essential below 2500m. Addis Ababa and the highlands are malaria-free. Chemoprophylaxis recommended for low-altitude travel.",
  },

  // ── Gabon (Central Africa) — lean ──────────────────────────────────────────
  gabon: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Gambia (West Africa) — lean ────────────────────────────────────────────
  gambia: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Use bottled or treated water and avoid raw produce. Resort areas have safer food but precautions still apply.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Ghana (West Africa) — lean ─────────────────────────────────────────────
  ghana: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential outside major hotels.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide.",
  },

  // ── Guinea (West Africa) — lean ────────────────────────────────────────────
  guinea: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Guinea-Bissau (West Africa) — lean ─────────────────────────────────────
  "guinea-bissau": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Kenya (East Africa) — full brief ───────────────────────────────────────
  // Sources: CDC Yellow Book 2024 (Kenya chapter), CDC Travelers' Health,
  // WHO yellow fever risk map (December 2024), Swiss BAG.
  kenya: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever (most areas)", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera", "Meningococcal"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Use bottled or treated water and eat thoroughly cooked food. Resort areas and lodges generally have safer food but precautions still apply elsewhere.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential below 2500m. Chemoprophylaxis recommended for safari and coastal travel. Nairobi city centre and the highlands above 2500m are malaria-free.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/kenya",

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for travel to most low- and middle-income countries.",
      },
      {
        name: "Yellow fever",
        slug: "yellow-fever",
        audience: "all",
        note: "Recommended for most itineraries. Generally NOT recommended if travel is limited to Nairobi city, the coast (Mombasa, Malindi, Kilifi, Kwale, Lamu), or the northeast (Wajir, Mandera).",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "all",
        note: "Recommended for travelers eating outside major hotels or staying with local hosts.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, polio booster, COVID-19 — per Swiss BAG schedule. Ensure measles immunity.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
      {
        name: "Meningococcal",
        audience: "specific",
        note: "Consider for long-term stays or travel to dry-season areas of northern Kenya.",
      },
    ],

    diseases: {
      malaria: {
        riskSummary:
          "High risk year-round in all areas below 2500m, including coastal regions and most safari destinations (Tsavo, Amboseli, Masai Mara). Chemoprophylaxis is recommended together with strict mosquito-bite protection.",
        keyFacts: [
          { label: "High risk", value: "All areas below 2500m" },
          { label: "Low / no risk", value: "Nairobi city centre, highlands above 2500m" },
          { label: "Species", value: "P. falciparum (predominant)" },
          { label: "Season", value: "Year-round" },
        ],
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/kenya",
      },
      yellowFever: {
        riskSummary:
          "Yellow fever vaccination is recommended for most travelers visiting Kenya. The vaccine is generally NOT recommended if your itinerary is limited to Nairobi city, the coastal regions (Mombasa, Malindi, Kilifi, Kwale, Lamu), or the northeast (Wajir, Mandera). A vaccination certificate is required at entry for travelers ≥1 year old arriving from countries with yellow fever risk.",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/kenya",
      },
      dengue: {
        riskSummary:
          "Dengue circulates particularly along the coast (Mombasa region) with periodic outbreaks. Daytime mosquito-bite prevention is the main protection. Vaccination is not routinely recommended for travelers without prior dengue infection.",
        cdcMapUrl: "https://www.cdc.gov/dengue/areas-with-risk/around-the-world.html",
      },
    },
  },

  // ── Lesotho (Southern Africa) — lean ───────────────────────────────────────
  lesotho: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Use bottled water outside major hotels. Eat thoroughly cooked food.",
    mosquito:
      "No malaria risk. General mosquito-bite prevention sensible during warmer months.",
  },

  // ── Liberia (West Africa) — lean ───────────────────────────────────────────
  liberia: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Libya (North Africa) — lean ────────────────────────────────────────────
  libya: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Use bottled water and eat thoroughly cooked food. Healthcare infrastructure has been disrupted by years of conflict.",
    mosquito:
      "Disease risk from mosquitoes is low. General precautions during warm months.",
  },

  // ── Madagascar (East Africa) — full brief ──────────────────────────────────
  // Sources: CDC Yellow Book 2024 (Madagascar chapter), CDC Travelers' Health,
  // WHO yellow fever risk map (December 2024), Swiss BAG.
  madagascar: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "possible",
    foodWater:
      "Strict food and water precautions are essential. Use bottled or treated water and avoid raw produce. Healthcare access outside Antananarivo is limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential. Malaria transmission is high in coastal lowlands; the central highland plateau (including Antananarivo) is moderate risk. Chemoprophylaxis recommended for most itineraries.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/madagascar",

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for travel to most low- and middle-income countries.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "all",
        note: "Recommended; risk of foodborne and waterborne illness is significant.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, polio booster, COVID-19 — per Swiss BAG schedule.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
      {
        name: "Cholera",
        audience: "specific",
        note: "For high-risk settings (humanitarian aid, outbreak areas).",
      },
    ],

    diseases: {
      malaria: {
        riskSummary:
          "High risk year-round across the country. Chemoprophylaxis (atovaquone-proguanil, doxycycline, mefloquine, or tafenoquine) recommended in addition to strict mosquito-bite protection. Antananarivo and the central highlands carry moderate rather than high risk; emergency standby treatment may be discussed instead of full prophylaxis for these limited itineraries.",
        keyFacts: [
          { label: "High risk", value: "Coastal lowlands, country-wide" },
          { label: "Moderate", value: "Antananarivo + central highlands" },
          { label: "Species", value: "P. falciparum (predominant)" },
          { label: "Season", value: "Year-round" },
        ],
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/madagascar",
      },
      yellowFever: {
        riskSummary:
          "No yellow fever risk in country. Vaccination certificate required at entry for travelers arriving from countries with yellow fever risk (within 6 days of departure or transit through such countries).",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/madagascar",
      },
      chikungunya: {
        riskSummary:
          "Periodic chikungunya outbreaks have been reported. Vaccination may be considered during active outbreaks. Daytime mosquito-bite prevention is the main protection.",
      },
    },
  },

  // ── Malawi (East Africa) — lean ────────────────────────────────────────────
  malawi: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "possible",
    foodWater:
      "Use bottled or treated water and eat thoroughly cooked food.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide.",
  },

  // ── Mali (West Africa) — lean ──────────────────────────────────────────────
  mali: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential. Malaria risk is high year-round; meningococcal disease risk in the dry season.",
  },

  // ── Mauritania (West Africa) — lean ────────────────────────────────────────
  mauritania: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever (south)", "Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "present",
    yellowFever: "required-or-recommended",
    foodWater:
      "Use bottled or treated water. Healthcare access is limited.",
    mosquito:
      "Mosquito-bite prevention is essential in southern regions where malaria is present. Risk concentrates in the rainy season (July–October).",
  },

  // ── Mauritius (East Africa) — lean ─────────────────────────────────────────
  mauritius: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Tap water in tourist areas is generally safe. Use bottled water in rural areas if uncertain.",
    mosquito:
      "No malaria risk. Daytime mosquito-bite prevention recommended due to occasional dengue and chikungunya activity.",
  },

  // ── Morocco (North Africa) — full brief ────────────────────────────────────
  // Sources: CDC Yellow Book 2024 (Morocco chapter), CDC Travelers' Health,
  // WHO yellow fever risk map, Swiss BAG.
  morocco: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Use bottled water; tap water quality varies, especially outside major cities. Be cautious with raw produce, salads, and unpasteurized dairy. Traveler's diarrhea is common — many short-stay travelers experience it at least once.",
    mosquito:
      "No malaria. General mosquito-bite prevention reasonable during warm months in rural areas.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/morocco",

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for all travelers.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Ensure measles immunity.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "specific",
        note: "Consider for long stays, travelers visiting friends and relatives, or those eating outside major tourist hotels.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking. Stray dogs are common.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
    ],

    diseases: {
      yellowFever: {
        riskSummary:
          "No yellow fever risk in country. A vaccination certificate may be required at entry for travelers arriving from countries with yellow fever risk.",
      },
    },
  },

  // ── Mozambique (East Africa) — lean ────────────────────────────────────────
  mozambique: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "possible",
    foodWater:
      "Strict food and water precautions are essential. Cholera outbreaks occur periodically.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide.",
  },

  // ── Namibia (Southern Africa) — lean ───────────────────────────────────────
  namibia: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Tap water in major cities is generally safe. Use bottled water in rural areas.",
    mosquito:
      "Malaria risk is seasonal (November–June) and concentrated in the northern regions (Caprivi, Kavango, Ohangwena, Omusati, Oshana, Oshikoto, Otjozondjupa, Kunene). Chemoprophylaxis recommended for travel there during transmission season.",
  },

  // ── Niger (West Africa) — lean ─────────────────────────────────────────────
  niger: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever (south)", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential. Malaria year-round in southern regions; meningococcal disease risk in the dry season.",
  },

  // ── Nigeria (West Africa) — lean ───────────────────────────────────────────
  nigeria: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential outside major hotels.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Mpox circulates endemically.",
  },

  // ── Réunion (East Africa) — lean ───────────────────────────────────────────
  reunion: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Tap water is generally safe. Standard French overseas department healthcare available.",
    mosquito:
      "No malaria. Daytime mosquito-bite prevention recommended due to dengue and chikungunya activity.",
  },

  // ── Rwanda (East Africa) — lean ────────────────────────────────────────────
  rwanda: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Use bottled or treated water. Eat thoroughly cooked food.",
    mosquito:
      "Malaria risk in lower-altitude areas; Kigali and high-altitude regions (Volcanoes National Park) are low-risk. Chemoprophylaxis recommended for low-altitude itineraries.",
  },

  // ── São Tomé & Príncipe (Central Africa) — lean ────────────────────────────
  "sao-tome-and-principe": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies"],
    malariaRisk: "present",
    yellowFever: "required-or-recommended",
    foodWater:
      "Use bottled water and eat thoroughly cooked food.",
    mosquito:
      "Mosquito-bite prevention essential. Malaria risk has declined significantly but remains present.",
  },

  // ── Senegal (West Africa) — full brief ─────────────────────────────────────
  // Sources: CDC Yellow Book 2024 (Senegal chapter), CDC Travelers' Health,
  // WHO yellow fever risk map (December 2024), Swiss BAG.
  senegal: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Use bottled or treated water and eat thoroughly cooked food. Resort areas (Saly, Cap Skirring) have safer food but precautions still apply elsewhere.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round country-wide. Meningococcal disease risk during the dry season (December–June).",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/senegal",

    vaccinesDetail: [
      {
        name: "Yellow fever",
        slug: "yellow-fever",
        audience: "all",
        note: "Recommended for all travelers — Senegal is in the WHO yellow fever endemic zone. Vaccination is also widely required at the country borders for onward travel.",
      },
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for all travelers.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "all",
        note: "Recommended; risk of foodborne and waterborne illness is significant.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, polio booster, COVID-19 — per Swiss BAG schedule.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
      },
      {
        name: "Meningococcal",
        audience: "specific",
        note: "Consider for long-term stays during the dry season (December–June), especially in northern Senegal.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
    ],

    diseases: {
      malaria: {
        riskSummary:
          "High year-round risk in the southern and eastern half of the country (south of The Gambia and in Matam in the northeast). Seasonal risk (June–December) in the north and northwest, including the coast north of Delta du Saloum National Park. Chemoprophylaxis recommended for most itineraries; insect-bite protection essential everywhere.",
        keyFacts: [
          { label: "High risk", value: "South & east, year-round" },
          { label: "Seasonal", value: "North/NW: high Jun–Dec, moderate Jan–May" },
          { label: "Species", value: "P. falciparum (predominant)" },
        ],
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/senegal",
      },
      yellowFever: {
        riskSummary:
          "Yellow fever vaccination is recommended for all travelers ≥9 months old (no contraindication). Senegal is in the WHO endemic zone; vaccination certificate is widely accepted as required for entry from neighboring countries.",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/senegal",
      },
    },
  },

  // ── Seychelles (East Africa) — lean ────────────────────────────────────────
  seychelles: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Tap water in tourist areas is generally safe.",
    mosquito:
      "No malaria. Daytime mosquito-bite prevention recommended due to occasional dengue and chikungunya activity.",
  },

  // ── Sierra Leone (West Africa) — lean ──────────────────────────────────────
  "sierra-leone": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Somalia (East Africa) — lean ───────────────────────────────────────────
  somalia: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever", "Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited.",
    mosquito:
      "Mosquito-bite prevention essential. Active conflict makes much of the country unsafe for travel.",
  },

  // ── South Africa (Southern Africa) — full brief ────────────────────────────
  // Sources: CDC Yellow Book 2024 (South Africa chapter), CDC Travelers' Health,
  // WHO yellow fever risk map (December 2024), Swiss BAG.
  "south-africa": {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "limited",
    yellowFever: "possible",
    foodWater:
      "Tap water in major cities is generally safe and meets international standards. Restaurants in tourist areas have reliable food standards. Outside major centers, use bottled water.",
    mosquito:
      "Malaria risk is limited and concentrated in low-altitude eastern areas, primarily Kruger National Park and the surrounding lowveld. No risk in Cape Town, Johannesburg, Durban, or Garden Route. Chemoprophylaxis recommended for travel to malaria areas during peak season.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/south-africa",

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for all travelers.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, polio booster, COVID-19 — per Swiss BAG schedule.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "specific",
        note: "Consider for travel outside major tourist areas, longer stays, or visiting friends and relatives.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
    ],

    diseases: {
      malaria: {
        riskSummary:
          "Malaria risk is geographically and seasonally concentrated. High risk in the lowveld of Mpumalanga (including Kruger National Park) and northeastern Limpopo from September to May; moderate risk in the same areas June to August. Lower year-round risk in northern KwaZulu-Natal (Tembe, Ndumu, iSimangaliso, Hluhluwe-iMfolozi) and elsewhere in northern Limpopo and Mpumalanga. No risk in Cape Town, Johannesburg, Durban, Garden Route, or southern South Africa.",
        keyFacts: [
          { label: "High risk", value: "Kruger + NE Limpopo (Sept–May)" },
          { label: "Moderate", value: "Same areas (Jun–Aug)" },
          { label: "Low risk", value: "Northern KwaZulu-Natal year-round" },
          { label: "No risk", value: "Cape Town, Joburg, Durban, Garden Route" },
        ],
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-africa",
      },
      yellowFever: {
        riskSummary:
          "No yellow fever risk in country. A vaccination certificate is required at entry for travelers arriving from countries with yellow fever risk. Note: travelers from Zambia, Tanzania, Eritrea, Somalia, São Tomé and Príncipe, and Rwanda are exempted.",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/south-africa",
      },
    },
  },

  // ── South Sudan (East Africa) — lean ───────────────────────────────────────
  "south-sudan": {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Sudan (North Africa) — lean ────────────────────────────────────────────
  sudan: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever (south)", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential. Healthcare access is severely limited; the country has been affected by ongoing armed conflict.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high in most areas. Meningococcal disease risk in the dry season.",
  },

  // ── Tanzania (East Africa) — full brief ────────────────────────────────────
  // Sources: CDC Yellow Book 2024 (Tanzania chapter), CDC Travelers' Health,
  // WHO yellow fever risk map (December 2024), Swiss BAG.
  tanzania: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever (entry)", "Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "possible",
    foodWater:
      "Use bottled or treated water and eat thoroughly cooked food. Safari lodges and Zanzibar resorts generally have safer food but precautions still apply elsewhere.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential. Malaria is high-risk on the entire mainland (including Dar es Salaam) and on Zanzibar, Pemba, and Mafia islands. Mt Kilimanjaro climbing routes above 2500m are malaria-free. Chemoprophylaxis recommended for safari and beach itineraries.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/tanzania",

    countryAlerts: [
      {
        level: "info",
        title: "Polio booster recommended",
        message:
          "Per WHO temporary recommendations, travelers staying in Tanzania longer than 4 weeks should have a documented polio booster within 12 months prior to exit, recorded on an International Certificate of Vaccination.",
        source: "CDC Travelers' Health",
        sourceUrl: "https://wwwnc.cdc.gov/travel/notices",
      },
    ],

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for all travelers.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "all",
        note: "Recommended; risk of foodborne and waterborne illness is significant.",
      },
      {
        name: "Polio (booster)",
        slug: "polio",
        audience: "all",
        note: "Adult booster recommended; required documentation for stays longer than 4 weeks.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, COVID-19 — per Swiss BAG schedule.",
      },
      {
        name: "Yellow fever",
        slug: "yellow-fever",
        audience: "specific",
        note: "Not medically recommended (low transmission risk). Required at entry only when arriving from a country with yellow fever risk; not required when arriving directly from Switzerland or other non-endemic countries.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
    ],

    diseases: {
      malaria: {
        riskSummary:
          "High year-round risk on the entire mainland (including Dar es Salaam) and on Zanzibar, Pemba, Mafia, and other islands. Low risk only above 2500m elevation (e.g. upper Kilimanjaro climbing routes). Chemoprophylaxis recommended for all standard tourist itineraries.",
        keyFacts: [
          { label: "High risk", value: "Mainland + all islands" },
          { label: "Low risk", value: "Above 2500m only" },
          { label: "Species", value: "P. falciparum (predominant)" },
          { label: "Season", value: "Year-round" },
        ],
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/tanzania",
        cdcMapImageUrl:
          "https://www.cdc.gov/yellow-book/media/images/malaria/tanzania.jpg",
        mapCaption: "Malaria risk areas in Tanzania (CDC).",
      },
      yellowFever: {
        riskSummary:
          "Yellow fever is not medically recommended for travel from non-endemic countries. Entry requirements vary: travelers arriving within 6 days from a YF-endemic country (or from Rwanda) without a vaccination certificate may be vaccinated on arrival. Travelers arriving directly from Switzerland do not need yellow fever vaccination either as a medical necessity or for entry. EKRM advises carrying current entry-requirement documents from the Tanzanian / Zanzibar Ministries of Health, since policies can vary at points of entry.",
        cdcMapUrl:
          "https://wwwnc.cdc.gov/travel/yellowbook/2024/preparing/yellow-fever-vaccine-malaria-prevention-by-country/tanzania",
      },
    },
  },

  // ── Togo (West Africa) — lean ──────────────────────────────────────────────
  togo: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Meningococcal", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Strict food and water precautions are essential.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round.",
  },

  // ── Tunisia (North Africa) — full brief ────────────────────────────────────
  // Sources: CDC Yellow Book 2024 (Tunisia chapter), CDC Travelers' Health,
  // WHO yellow fever risk map, Swiss BAG.
  tunisia: {
    vaccinesRecommended: ["Hepatitis A", "Routine vaccines"],
    vaccinesConsider: ["Typhoid", "Hepatitis B", "Rabies"],
    malariaRisk: "none",
    yellowFever: "possible",
    foodWater:
      "Use bottled water; tap water quality varies, especially outside major cities and resorts. Resort buffets are generally safe but precautions still apply outside them. Traveler's diarrhea is common.",
    mosquito:
      "No malaria. General mosquito-bite prevention reasonable during warm months.",

    cdcCountryUrl:
      "https://wwwnc.cdc.gov/travel/destinations/traveler/none/tunisia",

    vaccinesDetail: [
      {
        name: "Hepatitis A",
        slug: "hepatitis-a",
        audience: "all",
        note: "Recommended for all travelers.",
      },
      {
        name: "Routine vaccines",
        audience: "all",
        note: "MMR, Tdap, varicella, polio, COVID-19 — per Swiss BAG schedule. Ensure measles immunity.",
      },
      {
        name: "Typhoid",
        slug: "typhoid",
        audience: "specific",
        note: "Consider for long stays, travelers visiting friends and relatives, or those eating outside major tourist hotels.",
      },
      {
        name: "Rabies",
        slug: "rabies",
        audience: "specific",
        note: "For long stays, rural travel, occupational animal contact, or activities like cycling and hiking. Stray dogs are common.",
      },
      {
        name: "Hepatitis B",
        slug: "hepatitis-b",
        audience: "specific",
        note: "Consider per individual risk and stay duration.",
      },
    ],

    diseases: {
      yellowFever: {
        riskSummary:
          "No yellow fever risk in country. A vaccination certificate may be required at entry for travelers arriving from countries with yellow fever risk.",
      },
    },
  },

  // ── Uganda (East Africa) — lean ────────────────────────────────────────────
  uganda: {
    vaccinesRecommended: ["Hepatitis A", "Yellow fever", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "required-or-recommended",
    foodWater:
      "Use bottled or treated water and eat thoroughly cooked food.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide.",
  },

  // ── Zambia (East Africa) — lean ────────────────────────────────────────────
  zambia: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Yellow fever (parts)", "Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "high",
    yellowFever: "possible",
    foodWater:
      "Use bottled or treated water. Eat thoroughly cooked food.",
    mosquito:
      "Aggressive mosquito-bite prevention is essential — malaria risk is high year-round, country-wide. Chemoprophylaxis recommended for all travelers.",
  },

  // ── Zimbabwe (Southern Africa) — lean ──────────────────────────────────────
  zimbabwe: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid", "Routine vaccines"],
    vaccinesConsider: ["Hepatitis B", "Rabies", "Cholera"],
    malariaRisk: "present",
    yellowFever: "possible",
    foodWater:
      "Use bottled or treated water. Eat thoroughly cooked food. Cholera outbreaks occur periodically.",
    mosquito:
      "Mosquito-bite prevention essential below 1200m. Malaria risk year-round in low-altitude areas (Zambezi valley, Lake Kariba); seasonal in others. Harare and high-altitude areas are low-risk.",
  },

  // ── Brazil ──────────────────────────────────────────────────────────────────
  brazil: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid"],
    vaccinesConsider: ["Yellow fever", "Rabies"],
    malariaRisk: "present",
    yellowFever: "required-or-recommended",
    foodWater:
      "Food and water precautions are important, particularly outside major urban centers. Avoid tap water and uncooked street food.",
    mosquito:
      "Strong mosquito protection is essential due to risk of dengue, Zika, chikungunya, and malaria in certain regions. Use DEET-based repellents and protective clothing.",
  },

  // ── Peru ───────────────────────────────────────────────────────────────────
  peru: {
    vaccinesRecommended: ["Hepatitis A"],
    vaccinesConsider: ["Typhoid", "Yellow fever"],
    malariaRisk: "limited",
    yellowFever: "possible",
    foodWater:
      "Food and water precautions are important, especially for travelers visiting remote regions.",
    mosquito:
      "Mosquito protection is important in endemic areas, especially in tropical lowland regions.",
  },

  // ── Thailand ───────────────────────────────────────────────────────────────
  thailand: {
    vaccinesRecommended: ["Hepatitis A"],
    vaccinesConsider: ["Typhoid"],
    malariaRisk: "limited",
    yellowFever: "none",
    foodWater:
      "Pay attention to food hygiene. Avoid unsafe water and undercooked foods to reduce risk of traveler's diarrhea.",
    mosquito:
      "Use repellents, protective clothing, and mosquito avoidance measures to reduce the risk of dengue and other mosquito-borne infections.",
  },

};
