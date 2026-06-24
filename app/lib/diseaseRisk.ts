// ─────────────────────────────────────────────────────────────────────────────
// Shared disease ↔ country risk plumbing.
//
// Centralizes the four diseases that have country-level geographic risk data so
// the /diseases index choropleth, the /diseases/[slug] Disease Radar map, and
// the "risk by destination" table all read from one place. Keys in every
// *RiskByCountry map are geojson NAME values (e.g. "Dem. Rep. Congo"), which
// also match SUPPORTED_COUNTRIES[...].label — so NAME_TO_SLUG bridges a map
// country back to its /country/[slug] route.
// ─────────────────────────────────────────────────────────────────────────────

import { malariaRiskByCountry, MALARIA_LEGEND } from "./malariaData";
import { dengueRiskByCountry, DENGUE_LEGEND } from "./dengueData";
import { chikungunyaRiskByCountry, CHIKUNGUNYA_LEGEND } from "./chikungunyaData";
import { yellowFeverByCountry, YELLOW_FEVER_LEGEND } from "./yellowFeverData";
import { zikaRiskByCountry, ZIKA_LEGEND } from "./zikaData";
import { tbeRiskByCountry, TBE_LEGEND } from "./tbeData";
import { japaneseEncephalitisRiskByCountry, JAPANESE_ENCEPHALITIS_LEGEND } from "./jeData";
import { oropoucheRiskByCountry, OROPOUCHE_LEGEND } from "./oropoucheData";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "./travelData";

export type LegendItem = { level: string; color: string; label: string };

export type DiseaseRisk = {
  /** geojson NAME → risk level for this disease. */
  risk: Record<string, string>;
  /** Ordered highest → "none". First entry is the top-severity level. */
  legend: readonly LegendItem[];
};

export const DISEASE_RISK: Record<string, DiseaseRisk> = {
  malaria: { risk: malariaRiskByCountry, legend: MALARIA_LEGEND },
  dengue: { risk: dengueRiskByCountry, legend: DENGUE_LEGEND },
  chikungunya: { risk: chikungunyaRiskByCountry, legend: CHIKUNGUNYA_LEGEND },
  "yellow-fever": { risk: yellowFeverByCountry, legend: YELLOW_FEVER_LEGEND },
  zika: { risk: zikaRiskByCountry, legend: ZIKA_LEGEND },
  tbe: { risk: tbeRiskByCountry, legend: TBE_LEGEND },
  "japanese-encephalitis": { risk: japaneseEncephalitisRiskByCountry, legend: JAPANESE_ENCEPHALITIS_LEGEND },
  oropouche: { risk: oropoucheRiskByCountry, legend: OROPOUCHE_LEGEND },
};

export function getDiseaseRisk(slug: string): DiseaseRisk | null {
  return DISEASE_RISK[slug] ?? null;
}

export function hasRiskMap(slug: string): boolean {
  return slug in DISEASE_RISK;
}

// geojson NAME / country label → /country/[slug] key.
export const NAME_TO_SLUG: Record<string, CountrySlug> = Object.fromEntries(
  (Object.entries(SUPPORTED_COUNTRIES) as [CountrySlug, { label: string }][]).map(
    ([slug, c]) => [c.label, slug]
  )
) as Record<string, CountrySlug>;

export type DestinationRisk = {
  name: string;
  slug?: CountrySlug;
  flag?: string;
  region?: string;
  level: string;
  color: string;
  label: string;
};

// Build a sorted (highest risk first) list of countries for one disease, ready
// for the "Risk by destination" table.
export function destinationRows(slug: string): DestinationRisk[] {
  const dr = getDiseaseRisk(slug);
  if (!dr) return [];
  const order = dr.legend.map((l) => l.level); // highest → none
  const colorFor: Record<string, string> = {};
  const labelFor: Record<string, string> = {};
  dr.legend.forEach((l) => { colorFor[l.level] = l.color; labelFor[l.level] = l.label; });

  return Object.entries(dr.risk)
    .filter(([, level]) => level !== "none")
    .map(([name, level]) => {
      const cslug = NAME_TO_SLUG[name];
      const c = cslug ? SUPPORTED_COUNTRIES[cslug] : undefined;
      return {
        name,
        slug: cslug,
        flag: c?.flag,
        region: c?.region,
        level,
        color: colorFor[level] || "rgba(100,116,139,0.3)",
        label: labelFor[level] || level,
      };
    })
    .sort((a, b) => {
      const d = order.indexOf(a.level) - order.indexOf(b.level);
      return d !== 0 ? d : a.name.localeCompare(b.name);
    });
}
