// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/components/DiseaseDistributionGlobe.tsx
// NEW FILE  — create it inside app/components/ next to GlobeHero.tsx
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import GlobeHero from "./GlobeHero";
import { MALARIA_LEGEND } from "../lib/malariaData";
import { YELLOW_FEVER_LEGEND } from "../lib/yellowFeverData";
import { DENGUE_LEGEND } from "../lib/dengueData";
import { CHIKUNGUNYA_LEGEND } from "../lib/chikungunyaData";

// ─────────────────────────────────────────────────────────────────────────────
// A static reference globe for a single disease, used inside the
// "Endemic regions" section of /diseases/[slug] pages. It's a thin wrapper
// around <GlobeHero/> that:
//
//   • Locks the disease overlay via the `fixedFilter` prop (hiding chips)
//   • Passes an empty selected-countries list (the disease page is not a
//     trip builder, so the globe shouldn't show trip-builder visuals)
//   • Discards country-clicks with a no-op (clicks on disease pages don't
//     add countries to a trip — that interaction only makes sense on the
//     homepage)
//   • Renders a small static legend below so readers can decode the colors
//     without having to hover every country
//
// Currently supports the four diseases with geographic risk data:
// malaria, yellow fever, dengue, chikungunya.
// ─────────────────────────────────────────────────────────────────────────────

export type DistributionDisease =
  | "malaria"
  | "yellow-fever"
  | "dengue"
  | "chikungunya";

type LegendItem = { level: string; color: string; label: string };

const LEGENDS: Record<DistributionDisease, readonly LegendItem[]> = {
  "malaria": MALARIA_LEGEND,
  "yellow-fever": YELLOW_FEVER_LEGEND,
  "dengue": DENGUE_LEGEND,
  "chikungunya": CHIKUNGUNYA_LEGEND,
};

type Props = {
  disease: DistributionDisease;
};

export default function DiseaseDistributionGlobe({ disease }: Props) {
  const legend = LEGENDS[disease];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      {/* ── Globe (locked to this disease's overlay, chips hidden) ─────── */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <GlobeHero
          selectedCountries={[]}
          onToggleCountry={() => {
            /* clicks intentionally disabled on disease pages */
          }}
          fixedFilter={disease}
        />
      </div>

      {/* ── Static legend ──────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
          marginTop: "8px",
        }}
      >
        {legend.map((item) => (
          <div
            key={item.level}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              color: "#cbd5e1",
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "3px",
                background: item.color,
                display: "inline-block",
                border: "1px solid rgba(255,255,255,0.1)",
                flexShrink: 0,
              }}
            />
            {item.label}
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: "11.5px",
          color: "#475569",
          marginTop: "10px",
          marginBottom: 0,
          fontStyle: "italic",
          textAlign: "center",
        }}
      >
        Drag to rotate · hover a country for its risk level
      </p>
    </div>
  );
}
