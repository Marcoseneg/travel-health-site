// ─────────────────────────────────────────────────────────────────────────────
// Country health data
// ─────────────────────────────────────────────────────────────────────────────
//
// SCHEMA NOTES
//
// We have two layers of fields per country:
//
//   1. CORE FIELDS (always required) — used by the globe coloring,
//      itinerary summary, and any code that doesn't need the rich detail.
//      These remain simple enums and string arrays.
//
//   2. DETAILED FIELDS (all optional) — used by the country detail page
//      (/country/[slug]) when present. Sourced from EKRM/healthytravel.ch.
//      A country with detailed data shows the rich brief; a country with
//      only core fields shows a simpler view.
//
// The detailed fields preserve the structure of the EKRM source:
//   - Vaccines split into "for all travelers" vs "for selected travelers"
//   - Malaria broken down by zones (high/moderate/none with regional notes)
//   - Other risks (dengue, chikungunya, zika, altitude, etc.) as a list
//   - General notes for country-level context (political situation,
//     healthcare quality, etc.)
//
// All English-language. When German/French i18n is added, translations
// will live in a separate i18n layer rather than here.
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

  // ── New optional detailed fields ────────────────────────────────────────────
  source?: SourceInfo;
  vaccinesRoutine?: VaccineRec[];   // "Impfungen für alle Reisende"
  vaccinesSelective?: VaccineRec[]; // "Impfungen für gewisse Reisende"
  malaria?: MalariaDetail;
  yellowFeverDetail?: YellowFeverDetail;
  otherRisks?: HealthRisk[];
  generalNotes?: string[];
};

export type SourceInfo = {
  name: string;        // e.g. "EKRM / healthytravel.ch"
  url?: string;        // direct link to country page if available
  lastUpdated?: string; // ISO date if available
};

export type VaccineRec = {
  disease: string;            // human-readable label, e.g. "Hepatitis A"
  diseaseSlug?: string;       // links to /diseases/[slug] if a page exists
  recommendation: string;     // prose summary
  conditions?: string[];      // optional bullet list (e.g. duration tiers)
  whoTemporary?: boolean;     // true for WHO temporary recommendations (polio etc.)
};

export type MalariaZoneRisk = "high" | "moderate" | "low" | "none";

export type MalariaZone = {
  risk: MalariaZoneRisk;
  regions: string;
  prevention: string[];        // ["Mosquito protection", "Chemoprophylaxis"]
  notes?: string;
};

export type MalariaDetail = {
  // overallRisk == "mixed" when zones span multiple risk levels.
  // The simple `malariaRisk` enum above always reflects the highest zone.
  overallRisk: "high" | "moderate" | "low" | "none" | "mixed";
  zones?: MalariaZone[];
  seasonality?: string;
  notes?: string[];
};

export type YellowFeverDetail = {
  requirement: "required" | "recommended" | "not-required" | "generally-not";
  note?: string;
};

export type HealthRisk = {
  topic: string;
  topicSlug?: string;
  recommendation?: string;
  level?: "info" | "caution" | "warning";
};

// ─────────────────────────────────────────────────────────────────────────────
// COUNTRIES
// ─────────────────────────────────────────────────────────────────────────────

export const countries: Record<string, CountryInfo> = {

  // ── Afghanistan ─────────────────────────────────────────────────────────────
  // Source: EKRM / healthytravel.ch (Swiss Expert Committee for Travel Medicine)
  afghanistan: {
    // Core fields
    vaccinesRecommended: [
      "Hepatitis A",
      "Polio",
      "DTP",
      "MMR",
      "Varicella",
      "Typhoid",
    ],
    vaccinesConsider: ["Rabies", "Hepatitis B", "Chikungunya"],
    malariaRisk: "high",
    yellowFever: "none",
    foodWater:
      "Standard food and water precautions apply: drink bottled or treated water, avoid raw produce that you haven't peeled yourself, and eat thoroughly cooked food. Healthcare access is very limited — preventing traveler's diarrhea is especially important.",
    mosquito:
      "Use DEET-based repellent, sleep under treated bed nets, and wear long sleeves at dusk and dawn. Particularly important in malaria-risk areas (everywhere below 2500m altitude).",

    // Detailed fields
    source: {
      name: "EKRM / healthytravel.ch",
      url: "https://www.healthytravel.ch/de/destinations/afghanistan",
    },

    vaccinesRoutine: [
      {
        disease: "Hepatitis A",
        diseaseSlug: "hepatitis-a",
        recommendation:
          "Recommended for all travelers visiting tropical or subtropical countries.",
      },
      {
        disease: "Polio",
        diseaseSlug: "polio",
        recommendation:
          "WHO temporary recommendations apply to travelers from Afghanistan.",
        conditions: [
          "Stays >4 weeks: a polio booster is required at the time of exit if the last dose was >12 months ago. Documentation in the international yellow card is mandatory.",
          "Stays <4 weeks: booster recommended every 20 years for immunocompetent travelers <65; every 10 years for those ≥65 or immunocompromised.",
        ],
        whoTemporary: true,
      },
      {
        disease: "Diphtheria-Tetanus-Pertussis",
        diseaseSlug: "tetanus",
        recommendation:
          "All travelers should have basic immunization and boosters per the Swiss vaccination schedule.",
      },
      {
        disease: "Measles-Mumps-Rubella",
        diseaseSlug: "measles",
        recommendation:
          "All travelers should have basic immunization and boosters per the Swiss vaccination schedule.",
      },
      {
        disease: "Varicella",
        recommendation:
          "Travelers should be immune. Catch-up vaccination (2 doses ≥4 weeks apart) is recommended for unvaccinated individuals aged 13 months–39 years who have not had chickenpox.",
      },
      {
        disease: "Typhoid",
        diseaseSlug: "typhoid",
        recommendation:
          "Recommended for all travelers staying more than 1 week.",
      },
    ],

    vaccinesSelective: [
      {
        disease: "Rabies",
        diseaseSlug: "rabies",
        recommendation:
          "Particularly recommended for long-term stays, and for any duration if individual risk is elevated.",
        conditions: [
          "Long-term stays",
          "Cycling or motorcycling",
          "Hiking in remote areas",
          "Young children",
          "Animal workers",
          "Cavers (bat exposure)",
        ],
      },
      {
        disease: "Hepatitis B",
        diseaseSlug: "hepatitis-b",
        recommendation:
          "Consider per individual risk profile and duration of stay.",
      },
      {
        disease: "Chikungunya",
        diseaseSlug: "chikungunya",
        recommendation:
          "Indicated during a chikungunya outbreak; may be considered for areas with elevated risk (per EKRM statement).",
      },
    ],

    malaria: {
      overallRisk: "mixed",
      zones: [
        {
          risk: "high",
          regions: "Northeastern provinces (see EKRM map)",
          prevention: ["Mosquito protection", "Chemoprophylaxis"],
          notes:
            "Discuss appropriate prophylaxis with a travel medicine specialist before departure.",
        },
        {
          risk: "moderate",
          regions: "All areas below 2500m altitude, including Kabul",
          prevention: ["Mosquito protection"],
          notes:
            "Transmission mainly May–November, very low rest of year. Due to political situation and very limited healthcare, all travelers visiting moderate-risk areas are advised to carry emergency self-treatment medication.",
        },
        {
          risk: "none",
          regions: "Above 2500m altitude",
          prevention: [],
        },
      ],
    },

    yellowFeverDetail: {
      requirement: "not-required",
      note: "No yellow fever risk in Afghanistan and no entry requirement.",
    },

    otherRisks: [
      {
        topic: "Dengue",
        topicSlug: "dengue",
        recommendation:
          "Qdenga® vaccination is currently recommended only for travelers with prior dengue infection AND exposure to high-transmission regions.",
        level: "info",
      },
      {
        topic: "COVID-19",
        recommendation:
          "Vaccination per Swiss BAG recommendations. Check IATA for country-specific entry requirements.",
        level: "info",
      },
      {
        topic: "Influenza",
        recommendation:
          "Standard seasonal vaccination recommendations apply.",
        level: "info",
      },
    ],

    generalNotes: [
      "Political situation and very limited healthcare infrastructure in country — factor this into all clinical recommendations and emergency planning. Travelers should carry emergency medications and have evacuation insurance.",
    ],
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
