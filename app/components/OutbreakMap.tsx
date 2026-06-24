"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { NAME_TO_SLUG } from "../lib/diseaseRisk";
import { CAPITALS } from "../lib/capitalsData";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";
import { outbreakAlerts, type AlertSeverity } from "../lib/outbreakData";

// Disease label (as used in outbreakAlerts.disease) → /diseases/[slug] key.
const LABEL_TO_SLUG: Record<string, string> = Object.fromEntries(
  DISEASE_LIST.map((s) => [diseases[s].label.toLowerCase(), s])
);

// ─────────────────────────────────────────────────────────────────────────────
// A decorative-but-real "outbreak radar": a stippled (dot-matrix) world map with
// live outbreak hotspots pulsing over the affected countries. Land dots are
// sampled by drawing the projected countries to an offscreen canvas and testing
// a pixel grid with isPointInPath (fast + native). Hotspots come from
// outbreakAlerts, placed at each affected country's capital. Used in the
// /diseases Disease Explorer hero.
// ─────────────────────────────────────────────────────────────────────────────

const W = 1000;
const H = 520;
const STEP = 9; // px between land dots

const SEVERITY: Record<AlertSeverity, { color: string; level: string }> = {
  warning: { color: "#ef4444", level: "High" },
  advisory: { color: "#f59e0b", level: "Moderate" },
  watch: { color: "#fbbf24", level: "Low" },
};

type GeoFeature = { type: string; geometry: unknown; properties: { NAME?: string; ADMIN?: string } };
type GeoJson = { type: string; features: GeoFeature[] };

type Hotspot = { x: number; y: number; color: string; title: string; place: string; disease: string; slug?: string };

export default function OutbreakMap({ decorative = false }: { decorative?: boolean } = {}) {
  const router = useRouter();
  const [geo, setGeo] = useState<GeoJson | null>(null);
  const [hover, setHover] = useState<{ x: number; y: number; title: string; place: string; disease: string; slug?: string } | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/data/countries.geojson").then((r) => r.json()).then((d) => { if (alive) setGeo(d); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  const { dots, hotspots, landPath } = useMemo(() => {
    if (!geo) return { dots: [] as { x: number; y: number }[], hotspots: [] as Hotspot[], landPath: "" };
    const features = geo.features.filter((f) => (f.properties?.NAME || f.properties?.ADMIN) !== "Antarctica");
    const fc = { type: "FeatureCollection", features } as unknown as GeoJson;
    const projection = geoNaturalEarth1().fitExtent([[3, 3], [W - 3, H - 3]], fc as never);
    const path = geoPath(projection);

    // Combine all country outlines into one Path2D for fast point-in-path tests.
    const combined = features.map((f) => path(f as never) || "").join(" ");
    const dots: { x: number; y: number }[] = [];
    if (typeof document !== "undefined") {
      const ctx = document.createElement("canvas").getContext("2d");
      if (ctx) {
        const p2d = new Path2D(combined);
        for (let x = STEP / 2; x < W; x += STEP) {
          for (let y = STEP / 2; y < H; y += STEP) {
            if (ctx.isPointInPath(p2d, x, y)) dots.push({ x, y });
          }
        }
      }
    }

    // Live outbreak hotspots → projected capital of the first affected country.
    const hotspots: Hotspot[] = [];
    outbreakAlerts.filter((a) => a.active).forEach((a) => {
      const name = a.countries[0];
      const countrySlug = NAME_TO_SLUG[name];
      const cap = countrySlug ? CAPITALS[countrySlug] : undefined;
      if (!cap) return;
      const pt = projection([cap.lng, cap.lat]);
      if (!pt) return;
      hotspots.push({ x: pt[0], y: pt[1], color: SEVERITY[a.severity].color, title: a.title, place: `${cap.name}, ${name}`, disease: a.disease, slug: LABEL_TO_SLUG[a.disease.toLowerCase()] });
    });

    return { dots, hotspots, landPath: combined };
  }, [geo]);

  return (
    <div ref={wrapRef} style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={decorative ? "Decorative world map" : "World map with live outbreak hotspots"} style={{ display: "block", overflow: "visible" }}>
        {/* Soft land silhouette so continents read as a map… */}
        <path d={landPath} fill="var(--c-accent)" opacity={decorative ? 0.18 : 0.1} stroke="none" />
        {/* …with a dot texture on top. */}
        <g style={{ color: "var(--c-accent)" }}>
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={decorative ? 1.7 : 1.5} fill="currentColor" opacity={decorative ? 0.62 : 0.4} />
          ))}
        </g>

        {/* Outbreak hotspots — only in the live (non-decorative) variant */}
        {!decorative && hotspots.map((h, i) => (
          <g key={i} transform={`translate(${h.x} ${h.y})`} style={{ cursor: h.slug ? "pointer" : "default" }}
             onMouseEnter={() => setHover({ x: h.x, y: h.y, title: h.title, place: h.place, disease: h.disease, slug: h.slug })}
             onMouseLeave={() => setHover(null)}
             onClick={() => { if (h.slug) router.push(`/diseases/${h.slug}`); }}>
            <circle r={18} fill="transparent" />
            <circle r={3.6} fill={h.color} />
            <circle r={3.6} fill="none" stroke={h.color} strokeWidth={1.4} opacity={0.7}>
              <animate attributeName="r" values="3.6;13" dur="2.6s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.6s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Legend — only in the live variant (decorative map carries no data) */}
      {!decorative && (
      <div style={{ position: "absolute", top: "8px", right: "0", padding: "11px 13px", borderRadius: "12px", background: "var(--c-surface)", border: "1px solid var(--c-border)", boxShadow: "0 4px 16px rgba(15,23,42,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "10px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
          <span className="t-micro" style={{ color: "var(--c-text-2)", fontWeight: 700, textTransform: "none", letterSpacing: "normal" }}>{hotspots.length} live outbreaks</span>
        </div>
        {[
          ["#ef4444", "Warning"],
          ["#f59e0b", "Advisory"],
          ["#fbbf24", "Watch"],
        ].map(([color, label], i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: i === 0 ? 0 : "6px" }}>
            <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: color, flexShrink: 0 }} />
            <span className="t-label" style={{ color: "var(--c-text-2)" }}>{label}</span>
          </div>
        ))}
        <div className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", marginTop: "10px", maxWidth: "130px", lineHeight: 1.4 }}>Tap a marker to open the disease →</div>
      </div>
      )}

      {/* Hotspot tooltip */}
      {!decorative && hover && (
        <div style={{
          position: "absolute", left: `${(hover.x / W) * 100}%`, top: `${(hover.y / H) * 100}%`,
          transform: "translate(12px, -120%)", background: "var(--c-surface)", border: "1px solid var(--c-border)",
          borderRadius: "10px", padding: "7px 11px", boxShadow: "0 10px 26px rgba(15,23,42,0.16)", pointerEvents: "none", whiteSpace: "nowrap", zIndex: 5,
        }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--c-text)" }}>{hover.title}</div>
          <div className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>{hover.place}</div>
          {hover.slug && <div className="t-micro" style={{ color: "var(--c-accent-strong)", textTransform: "none", letterSpacing: "normal", marginTop: "4px", fontWeight: 700 }}>View {hover.disease} guide →</div>}
        </div>
      )}
    </div>
  );
}
