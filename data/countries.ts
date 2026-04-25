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

  // ── Kenya ──────────────────────────────────────────────────────────────────
  kenya: {
    vaccinesRecommended: ["Hepatitis A", "Typhoid"],
    vaccinesConsider: ["Rabies"],
    malariaRisk: "present",
    yellowFever: "required-or-recommended",
    foodWater:
      "Careful food and water hygiene is important to reduce gastrointestinal infection risk.",
    mosquito:
      "Strict mosquito protection is recommended, including repellents, long sleeves, and bed nets where appropriate.",
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
