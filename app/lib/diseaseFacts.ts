// ─────────────────────────────────────────────────────────────────────────────
// Curated "key facts" per disease — short, standard CDC/WHO summary values used
// for the stat cards and "Key facts at a glance" rail on /diseases/[slug].
//
// These are concise summaries of the same evidence already in diseaseData.ts;
// incubation periods and seasonality are well-established CDC/WHO figures.
// `burden` is only filled where a widely-cited global estimate exists; cards
// for missing fields simply don't render.
// ─────────────────────────────────────────────────────────────────────────────

export type DiseaseFacts = {
  /** Primary vector / route, one short phrase. */
  transmissionShort: string;
  /** Incubation period range. */
  incubation: string;
  /** When risk peaks. */
  seasonality: string;
  /** Short vaccine status line for the stat card. */
  vaccineShort: string;
  /** Widely-cited global burden estimate (omit if none is solid). */
  burden?: string;
};

export const DISEASE_FACTS: Record<string, DiseaseFacts> = {
  malaria: {
    transmissionShort: "Anopheles mosquitoes · night-biting",
    incubation: "7–30 days",
    seasonality: "Year-round; peaks in rainy season",
    vaccineShort: "No traveler vaccine",
    burden: "~249 million cases/yr (WHO 2022)",
  },
  dengue: {
    transmissionShort: "Aedes mosquitoes · day-biting",
    incubation: "4–10 days",
    seasonality: "Year-round; peaks in rainy season",
    vaccineShort: "Qdenga® · prior infection only",
    burden: "~390 million infections/yr",
  },
  chikungunya: {
    transmissionShort: "Aedes mosquitoes · day-biting",
    incubation: "3–7 days",
    seasonality: "Peaks in rainy season",
    vaccineShort: "2 vaccines · single dose",
  },
  "yellow-fever": {
    transmissionShort: "Aedes / Haemagogus mosquitoes",
    incubation: "3–6 days",
    seasonality: "Year-round in endemic zones",
    vaccineShort: "Single dose · lifelong · entry cert",
  },
  typhoid: {
    transmissionShort: "Contaminated food & water",
    incubation: "6–30 days (avg 1–2 wk)",
    seasonality: "Year-round",
    vaccineShort: "Vi polysaccharide / oral Ty21a",
  },
  "hepatitis-a": {
    transmissionShort: "Contaminated food & water",
    incubation: "15–50 days (avg 28)",
    seasonality: "Year-round",
    vaccineShort: "2 doses · long-term protection",
  },
  rabies: {
    transmissionShort: "Mammal bite or scratch (dogs)",
    incubation: "Weeks to months (variable)",
    seasonality: "Year-round",
    vaccineShort: "Pre-exposure · 2–3 doses",
  },
  cholera: {
    transmissionShort: "Contaminated water & food",
    incubation: "12 hours – 5 days",
    seasonality: "Outbreak / crisis settings",
    vaccineShort: "Oral · Dukoral / Vaxchora",
  },
  "japanese-encephalitis": {
    transmissionShort: "Culex mosquitoes · rural, dusk–dawn",
    incubation: "5–15 days",
    seasonality: "Monsoon / post-monsoon",
    vaccineShort: "Ixiaro® · 2 doses",
  },
  tbe: {
    transmissionShort: "Ixodes ticks",
    incubation: "4–28 days",
    seasonality: "Tick season Mar–Nov (peak May–Jul)",
    vaccineShort: "FSME-Immun / Encepur · 3 doses",
  },
  zika: {
    transmissionShort: "Aedes mosquitoes + sexual",
    incubation: "3–14 days",
    seasonality: "Year-round in endemic areas",
    vaccineShort: "None · avoid travel in pregnancy",
  },
  mpox: {
    transmissionShort: "Close skin & sexual contact",
    incubation: "5–21 days",
    seasonality: "Outbreak-driven",
    vaccineShort: "JYNNEOS / Imvanex · 2 doses",
  },
  oropouche: {
    transmissionShort: "Culicoides midges (+ some mosquitoes)",
    incubation: "3–8 days",
    seasonality: "Rainy season · Amazon basin",
    vaccineShort: "None · bite avoidance",
  },
};
