// ─────────────────────────────────────────────────────────────────────────────
// Structured, practitioner-grade vaccine data for /diseases/[slug] (Vaccines tab).
//
// This supplements the prose `preventionDetails` (type "vaccine") with a
// formulation table — product, age band, dose/route, primary series, booster,
// and duration of protection — the way a prescriber needs it. Diseases without
// an entry here fall back to the prose vaccine cards.
//
// Sourced from the Swiss Compendium (compendium.ch) and BAG/EKRM guidance.
// Each entry should carry a `source` so clinicians can verify.
// ─────────────────────────────────────────────────────────────────────────────

export type VaccineSchedule = {
  product: string;
  /** Approved age band for this formulation. */
  ageGroup: string;
  /** Volume + route (+ antigen content). */
  dose: string;
  /** Primary series. */
  primary: string;
  /** Booster / second dose. */
  booster: string;
  /** Duration of protection. */
  protection: string;
};

export type DiseaseVaccine = {
  summary?: string;
  /** Age-banded formulations, shown as a comparison table. */
  schedules: VaccineSchedule[];
  /** Combination vaccines (e.g. Twinrix) — shown as cards under the table. */
  combos?: { product: string; detail: string }[];
  /** Practitioner notes (efficacy, special populations, interchangeability). */
  notes?: string[];
  source?: { label: string; url?: string };
};

export const DISEASE_VACCINES: Record<string, DiseaseVaccine> = {
  "hepatitis-a": {
    summary:
      "Inactivated hepatitis A vaccine, dosed by age. A single dose protects for the trip; a second dose at 6–12 months confers long-term (likely lifelong) protection.",
    schedules: [
      {
        product: "Havrix 1440",
        ageGroup: "Adults ≥ 19 yrs",
        dose: "1.0 mL IM (deltoid) · 1440 EL.U.",
        primary: "1 dose, ≥ 2 wks before travel",
        booster: "1 dose at 6–12 months",
        protection: "Long-term, likely lifelong after 2 doses",
      },
      {
        product: "Havrix 720",
        ageGroup: "Children 1–18 yrs",
        dose: "0.5 mL IM (deltoid/thigh) · 720 EL.U.",
        primary: "1 dose, ≥ 2 wks before travel",
        booster: "1 dose at 6–12 months",
        protection: "Long-term, likely lifelong after 2 doses",
      },
    ],
    combos: [
      {
        product: "Twinrix (Hep A + Hep B)",
        detail:
          "Combined vaccine. Adults ≥ 16 yrs: 3 doses at 0, 1, 6 months. Accelerated 0 / 7 / 21 days + a 12-month booster for last-minute travel. Paediatric Twinrix 720/20 covers 1–15 yrs.",
      },
    ],
    notes: [
      "~95–100% seroconvert 2–4 weeks after dose 1 — a single dose covers most trips; the 6–12 month booster locks in long-term immunity.",
      "Inactivated vaccine — may be given in pregnancy and to immunocompromised travellers when indicated.",
      "Interchangeable: a series begun with Havrix can be completed with another hepatitis A vaccine (e.g. Vaqta, Avaxim).",
    ],
    source: {
      label: "Swiss Compendium — Havrix",
      url: "https://compendium.ch/product/1610811-havrix-1440-inj-susp-n-fertspr/mpro",
    },
  },

  chikungunya: {
    summary:
      "Two single-dose chikungunya vaccines are now licensed. They differ in technology and eligibility — which guides the choice for a given traveller.",
    schedules: [
      {
        product: "Vimkunya (VLP)",
        ageGroup: "≥ 12 yrs",
        dose: "0.8 mL IM · adjuvanted VLP (non-live)",
        primary: "1 dose",
        booster: "None established",
        protection: "Neutralising antibodies in ~98% by 3 wks; onset from ~1 wk",
      },
      {
        product: "Ixchiq (live-attenuated)",
        ageGroup: "Adults ≥ 18 yrs",
        dose: "0.5 mL IM · live-attenuated",
        primary: "1 dose",
        booster: "None established",
        protection: "Seroresponse in ~99% by 4 wks; durable ≥ 2 yrs",
      },
    ],
    notes: [
      "Vimkunya is non-live (VLP) — usable in immunocompromised travellers and licensed from age 12; no live-vaccine contraindications.",
      "Ixchiq is live-attenuated — contraindicated in immunocompromised and (caution) pregnancy. After 2025 reports of serious chikungunya-like illness in older adults, the FDA paused use in ≥60 then lifted it with a tightened label; use in ≥65 with chronic conditions only after careful risk–benefit assessment.",
      "Both are single-dose with no established booster yet. Reserve for travellers with meaningful exposure to areas with active transmission.",
    ],
    source: { label: "FDA & EMA prescribing information (Ixchiq · Vimkunya); EKRM" },
  },

  "yellow-fever": {
    summary:
      "A single dose of the live-attenuated 17D vaccine gives lifelong protection (WHO, 2013) and validates the International Certificate (ICVP) from day 10.",
    schedules: [
      {
        product: "Stamaril / YF-VAX (17D)",
        ageGroup: "≥ 9 months",
        dose: "0.5 mL SC · live-attenuated",
        primary: "1 dose, ≥ 10 days before travel",
        booster: "None for most — protection is lifelong",
        protection: "Lifelong (WHO 2013); certificate valid for life",
      },
    ],
    notes: [
      "Must be given at an approved yellow-fever centre; the ICVP (“yellow card”) is valid from day 10 and for life.",
      "Live vaccine — contraindicated in significant immunosuppression, thymus disorders, and infants < 6 months; precaution in pregnancy/breastfeeding and severe egg allergy.",
      "First vaccination at age ≥ 60: higher risk of rare serious reactions (YEL-AVD / YEL-AND) — vaccinate only with genuine exposure risk.",
    ],
    source: { label: "WHO position paper (2013); Swiss Compendium — Stamaril; EKRM" },
  },

  typhoid: {
    summary:
      "Two options — an injectable polysaccharide vaccine and an oral live vaccine — both moderately effective (~50–70%). Neither replaces food and water hygiene.",
    schedules: [
      {
        product: "Typhim Vi (polysaccharide)",
        ageGroup: "≥ 2 yrs",
        dose: "0.5 mL IM · Vi polysaccharide (inactivated)",
        primary: "1 dose, ≥ 2 wks before travel",
        booster: "Every 3 years with continued exposure",
        protection: "~55–72%; onset ~2 wks",
      },
      {
        product: "Vivotif (Ty21a, oral)",
        ageGroup: "≥ 5 yrs",
        dose: "3 enteric-coated capsules, days 1·3·5 · live-attenuated",
        primary: "Complete ≥ 1 wk before travel",
        booster: "After 1–3 years with continued exposure",
        protection: "~50–80%",
      },
    ],
    notes: [
      "Vivotif is live — not for immunocompromised travellers; take on an empty stomach, keep refrigerated, and avoid antibiotics and some antimalarials during the course.",
      "Neither vaccine is fully protective — safe food and water practices remain essential.",
    ],
    source: { label: "Swiss Compendium — Typhim Vi / Vivotif; EKRM" },
  },

  "japanese-encephalitis": {
    summary:
      "Inactivated Vero-cell vaccine (Ixiaro) for travellers with substantial rural exposure in endemic Asia — especially stays ≥ 1 month in farming areas during the transmission season.",
    schedules: [
      {
        product: "Ixiaro (adult/child)",
        ageGroup: "≥ 3 yrs",
        dose: "0.5 mL IM · inactivated (Vero cell)",
        primary: "2 doses, days 0 and 28",
        booster: "1 booster at 12–24 months if ongoing exposure",
        protection: "> 95% after 2 doses",
      },
      {
        product: "Ixiaro (paediatric)",
        ageGroup: "2 months – < 3 yrs",
        dose: "0.25 mL IM · inactivated",
        primary: "2 doses, days 0 and 28",
        booster: "Per ongoing exposure",
        protection: "> 95% after 2 doses",
      },
    ],
    combos: [
      { product: "Accelerated schedule", detail: "Adults 18–65: 2 doses on days 0 and 7 — useful for last-minute travel; complete ≥ 1 week before departure." },
    ],
    notes: [
      "Inactivated — may be used in immunocompromised travellers.",
      "Recommended for ≥ 1 month rural/agricultural stays, or shorter high-intensity exposure in the monsoon / post-monsoon season.",
    ],
    source: { label: "Swiss Compendium — Ixiaro; EKRM" },
  },

  rabies: {
    summary:
      "Pre-exposure prophylaxis (PrEP) primes immunity so that, after a bite, only 2 booster doses are needed and rabies immunoglobulin can be omitted. Modern cell-culture vaccines (Rabipur, Verorab) are used.",
    schedules: [
      {
        product: "PrEP — accelerated",
        ageGroup: "All ages",
        dose: "Rabipur / Verorab IM or ID · cell-culture (inactivated)",
        primary: "2 doses, days 0 and 7",
        booster: "Per exposure / titre for continued high risk",
        protection: "Primes a rapid anamnestic response",
      },
      {
        product: "PrEP — classic",
        ageGroup: "All ages",
        dose: "Cell-culture (inactivated)",
        primary: "3 doses, days 0, 7, 21–28",
        booster: "Titre check / booster for ongoing risk",
        protection: "Long-lasting immune memory",
      },
    ],
    notes: [
      "PrEP does NOT remove the need for post-exposure care: after any bite/scratch, wash the wound 15 min and still give 2 booster doses (days 0 and 3) — but rabies immunoglobulin is then not needed.",
      "Recommended for endemic areas with limited PEP access, long rural stays, cycling/running, high animal contact, and young children.",
      "Inactivated — safe in immunocompromised, though antibody titres should be checked.",
    ],
    source: { label: "WHO position paper (2018); Swiss Compendium — Rabipur / Verorab; EKRM" },
  },

  tbe: {
    summary:
      "Two clinically equivalent inactivated vaccines (FSME-Immun, Encepur). The Swiss BAG recommends TBE vaccination for all residents and travellers except the cantons of Genève and Ticino.",
    schedules: [
      {
        product: "FSME-Immun / Encepur (adult)",
        ageGroup: "≥ 16 yrs",
        dose: "0.5 mL IM · inactivated",
        primary: "3 doses: 0, 1–3 mo, 5–12 mo",
        booster: "Every 10 years (Swiss BAG, 2022)",
        protection: "> 99% after the 3-dose series",
      },
      {
        product: "FSME-Immun / Encepur (junior)",
        ageGroup: "1 – 15 yrs",
        dose: "0.25 mL IM · inactivated",
        primary: "3 doses: 0, 1–3 mo, 5–12 mo",
        booster: "Every 10 years",
        protection: "> 99% after the 3-dose series",
      },
    ],
    combos: [
      { product: "Accelerated schedule", detail: "Encepur 0 / 7 / 21 days, or FSME-Immun 0 / 14 days — protection within ~2 weeks of dose 2; consolidate with a booster at 12–18 months." },
    ],
    notes: [
      "Inactivated — may be given in pregnancy and immunocompromised when indicated.",
      "Post-exposure vaccination after a tick bite is NOT effective and not recommended.",
    ],
    source: { label: "Swiss BAG/FOPH 2025 schedule; Compendium — FSME-Immun / Encepur" },
  },

  cholera: {
    summary:
      "Oral cholera vaccine for travellers to active outbreak or humanitarian settings. In Switzerland the inactivated whole-cell vaccine (Dukoral) is used; it also gives partial short-term protection against ETEC traveller's diarrhoea.",
    schedules: [
      {
        product: "Dukoral (oral)",
        ageGroup: "≥ 6 yrs",
        dose: "Oral suspension in buffer · WC-rBS (inactivated)",
        primary: "2 doses, 1–6 wks apart; finish ≥ 1 wk before travel",
        booster: "Single dose within 2 years",
        protection: "~65% for ~2 years; partial ETEC cross-protection",
      },
      {
        product: "Dukoral (young child)",
        ageGroup: "2 – 6 yrs",
        dose: "Oral · WC-rBS",
        primary: "3 doses, 1–6 wks apart",
        booster: "Single dose within 6 months",
        protection: "~65%; shorter duration in young children",
      },
    ],
    notes: [
      "Avoid food and drink for 1 hour before and after each dose; don't take other oral vaccines within 1 hour.",
      "Vaxchora (single-dose live oral) is the US alternative — not generally available in Switzerland.",
      "Most travellers are low risk — reserve for outbreak zones, relief/health work, or remote travel with poor water access.",
    ],
    source: { label: "Swiss Compendium — Dukoral; EKRM" },
  },

  mpox: {
    summary:
      "Non-replicating modified vaccinia Ankara (MVA-BN) vaccine — JYNNEOS / Imvanex — for high-risk groups and post-exposure use. Safe in immunocompromised and HIV.",
    schedules: [
      {
        product: "JYNNEOS / Imvanex (MVA-BN)",
        ageGroup: "≥ 18 yrs",
        dose: "0.5 mL SC (or 0.1 mL ID dose-sparing) · non-replicating",
        primary: "2 doses, 28 days apart",
        booster: "Not routine; per ongoing risk",
        protection: "Substantial; full ~2 wks after dose 2",
      },
    ],
    notes: [
      "Recommended for: MSM with multiple partners, sex workers, healthcare/lab staff handling orthopoxviruses, and close contacts of cases.",
      "Post-exposure: a dose within 4 days of exposure may prevent disease (up to 14 days may attenuate it).",
      "Non-replicating — safe in immunocompromised individuals, unlike older smallpox vaccines.",
    ],
    source: { label: "Swiss Compendium — Jynneos / Imvanex; WHO; EKRM" },
  },

  dengue: {
    summary:
      "Live-attenuated tetravalent vaccine (Qdenga, TAK-003). Travel-medicine bodies advise it mainly for travellers with a documented prior dengue infection heading to high-transmission areas.",
    schedules: [
      {
        product: "Qdenga (TAK-003)",
        ageGroup: "≥ 4 yrs",
        dose: "0.5 mL SC · live-attenuated tetravalent",
        primary: "2 doses, 0 and 3 months",
        booster: "None established",
        protection: "High vs DENV-1/2; less certain vs DENV-3/4 in the dengue-naïve",
      },
    ],
    notes: [
      "Recommended primarily for travellers ≥ 6 yrs with a documented previous dengue infection going to high-transmission regions; benefit in the seronegative is less certain.",
      "Live vaccine — contraindicated in pregnancy, breastfeeding, and immunocompromise; give ≥ 2 wks before such states where possible.",
      "The older vaccine Dengvaxia is no longer used.",
    ],
    source: { label: "WHO position paper (2024); Swiss Compendium — Qdenga; EKRM" },
  },
};

export function getDiseaseVaccine(slug: string): DiseaseVaccine | null {
  return DISEASE_VACCINES[slug] ?? null;
}
