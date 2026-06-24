"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { getDiseaseRisk, destinationRows, NAME_TO_SLUG } from "../lib/diseaseRisk";

// ─────────────────────────────────────────────────────────────────────────────
// The centerpiece of a Disease Radar page: a flat 2D choropleth for ONE disease
// with a Map view / List view toggle. Map view shades every country by its risk
// level for this disease; List view is the full sorted country table. Reuses the
// shared risk plumbing in lib/diseaseRisk. Renders nothing if the disease has no
// country-level data (the page shows a text region summary instead).
// ─────────────────────────────────────────────────────────────────────────────

const W = 980;
const H = 440;

// Diseases whose risk sits in one compact region read better framed to that
// region than shown on a full world map. Everything else stays global.
const AUTO_FRAME = new Set(["oropouche", "yellow-fever"]);

type GeoFeature = { type: string; geometry: unknown; properties: { NAME?: string; ADMIN?: string } };
type GeoJson = { type: string; features: GeoFeature[] };

function featureName(f: GeoFeature): string {
  return f.properties?.NAME || f.properties?.ADMIN || "";
}

export default function DiseaseRadarMap({ slug }: { slug: string }) {
  const router = useRouter();
  const [geo, setGeo] = useState<GeoJson | null>(null);
  const [view, setView] = useState<"map" | "list">("map");
  const [hover, setHover] = useState<{ name: string; level: string; x: number; y: number; countrySlug?: string } | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const dr = getDiseaseRisk(slug);

  useEffect(() => {
    let alive = true;
    fetch("/data/countries.geojson")
      .then((r) => r.json())
      .then((d) => { if (alive) setGeo(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const paths = useMemo(() => {
    if (!geo || !dr) return [];
    const features = geo.features.filter((f) => featureName(f) !== "Antarctica");
    // Most diseases keep the full world view. A few that sit in one compact
    // region read much better framed to that region (the rest of the world
    // looks empty when zoomed). Only those opt in.
    let fitFC: GeoJson;
    let extent: [[number, number], [number, number]];
    if (AUTO_FRAME.has(slug)) {
      const riskFeatures = features.filter((f) => {
        const lvl = dr.risk[featureName(f)];
        return lvl && lvl !== "none";
      });
      fitFC = { type: "FeatureCollection", features: riskFeatures.length >= 2 ? riskFeatures : features } as unknown as GeoJson;
      extent = [[W * 0.08, H * 0.12], [W * 0.92, H * 0.88]];
    } else {
      fitFC = { type: "FeatureCollection", features } as unknown as GeoJson;
      extent = [[6, 6], [W - 6, H - 6]];
    }
    const projection = geoNaturalEarth1().fitExtent(extent, fitFC as never);
    const path = geoPath(projection);
    return features.map((f) => ({ name: featureName(f), d: path(f as never) || "" }));
  }, [geo, dr, slug]);

  const { colorForLevel, labelForLevel, noneColor } = useMemo(() => {
    const colorForLevel: Record<string, string> = {};
    const labelForLevel: Record<string, string> = {};
    dr?.legend.forEach((l) => { colorForLevel[l.level] = l.color; labelForLevel[l.level] = l.label; });
    return { colorForLevel, labelForLevel, noneColor: colorForLevel["none"] || "rgba(100,116,139,0.3)" };
  }, [dr]);

  const rows = useMemo(() => destinationRows(slug), [slug]);

  if (!dr) return null;

  const onMove = (name: string, level: string, e: React.MouseEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHover({ name, level, countrySlug: NAME_TO_SLUG[name], x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border)", borderRadius: "16px", padding: "20px 20px 16px" }}>
      {/* Header: title + view toggle */}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "14px" }}>
        <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)" }}>Global risk map</div>
        <div style={{ display: "inline-flex", padding: "3px", borderRadius: "999px", background: "var(--c-surface-2)", border: "1px solid var(--c-border)" }}>
          {(["map", "list"] as const).map((v) => {
            const active = view === v;
            return (
              <button
                key={v}
                onClick={() => setView(v)}
                className="t-label"
                style={{
                  padding: "5px 14px", borderRadius: "999px", cursor: "pointer", border: "none",
                  background: active ? "var(--c-surface)" : "transparent",
                  color: active ? "var(--c-text)" : "var(--c-text-3)",
                  fontFamily: "inherit", fontWeight: 600,
                  boxShadow: active ? "0 1px 3px rgba(15,23,42,0.10)" : "none",
                }}
              >
                {v === "map" ? "Map view" : "List view"}
              </button>
            );
          })}
        </div>
      </div>

      {view === "map" ? (
        <>
          <div ref={wrapRef} style={{ position: "relative" }}>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`World map shaded by ${slug} risk level`} style={{ display: "block" }}>
              <defs>
                <clipPath id={`drm-clip-${slug}`}><rect x={0} y={0} width={W} height={H} rx={12} /></clipPath>
              </defs>
              <rect x={0} y={0} width={W} height={H} fill="var(--c-surface-2)" rx={12} />
              <g clipPath={`url(#drm-clip-${slug})`} stroke="var(--c-surface)" strokeWidth={0.4} strokeLinejoin="round">
                {paths.map((p, i) => {
                  const level = dr.risk[p.name];
                  const fill = level ? (colorForLevel[level] || noneColor) : noneColor;
                  const cslug = NAME_TO_SLUG[p.name];
                  return (
                    <path
                      key={i}
                      d={p.d}
                      fill={fill}
                      style={{ transition: "fill 0.25s", cursor: cslug ? "pointer" : "default" }}
                      onMouseMove={(e) => onMove(p.name, level || "none", e)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => { if (cslug) router.push(`/country/${cslug}`); }}
                    />
                  );
                })}
              </g>
            </svg>

            {/* Floating legend — sits over the empty southern ocean (bottom-left) so the map runs full width */}
            <div style={{ position: "absolute", bottom: "14px", left: "12px", display: "flex", flexDirection: "column", gap: "7px", padding: "10px 12px", borderRadius: "10px", background: "var(--c-surface)", border: "1px solid var(--c-border)", boxShadow: "0 2px 10px rgba(15,23,42,0.08)" }}>
              <div className="t-micro" style={{ color: "var(--c-text-3)" }}>Risk level</div>
              {dr.legend.map((l) => (
                <div key={l.level} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: l.color, border: "1px solid var(--c-border)", flexShrink: 0 }} />
                  <span className="t-label" style={{ color: "var(--c-text-2)" }}>{l.label}</span>
                </div>
              ))}
            </div>

            {hover && (
              <div style={{
                position: "absolute", left: `${hover.x}%`, top: `${hover.y}%`,
                transform: "translate(14px, -120%)", background: "var(--c-surface)",
                border: "1px solid var(--c-border)", borderRadius: "10px", padding: "7px 11px",
                boxShadow: "0 10px 26px rgba(15,23,42,0.14)", pointerEvents: "none", whiteSpace: "nowrap", zIndex: 5,
              }}>
                <div style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--c-text)" }}>{hover.name}</div>
                <div className="t-label" style={{ color: "var(--c-text-2)", fontWeight: 600 }}>{labelForLevel[hover.level] || "No data"}</div>
                {hover.countrySlug && <div className="t-micro" style={{ color: "var(--c-accent-strong)", textTransform: "none", letterSpacing: "normal", marginTop: "3px", fontWeight: 700 }}>View {hover.name} →</div>}
              </div>
            )}
          </div>
          <p className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", margin: "12px 2px 0" }}>
            Risk levels reflect overall risk for travelers and may vary by season and location.
          </p>
        </>
      ) : (
        <RiskTable rows={rows} />
      )}
    </div>
  );
}

function RiskTable({ rows }: { rows: ReturnType<typeof destinationRows> }) {
  return (
    <div style={{ overflow: "hidden", borderRadius: "12px", border: "1px solid var(--c-border)" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13.5px" }}>
        <thead>
          <tr style={{ background: "var(--c-surface-2)" }}>
            <th className="t-micro" style={thStyle}>Country</th>
            <th className="t-micro" style={thStyle}>Risk level</th>
            <th className="t-micro" style={{ ...thStyle, textAlign: "left" }}>Region</th>
            <th className="t-micro" style={{ ...thStyle, width: "44px" }} />
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const inner = (
              <>
                <td style={tdStyle}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "9px" }}>
                    <span style={{ fontSize: "16px" }}>{r.flag || "🏳️"}</span>
                    <span style={{ fontWeight: 600, color: "var(--c-text)" }}>{r.name}</span>
                  </span>
                </td>
                <td style={tdStyle}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "7px" }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                    <span style={{ color: "var(--c-text-2)" }}>{r.label}</span>
                  </span>
                </td>
                <td style={{ ...tdStyle, color: "var(--c-text-3)" }}>{r.region || "—"}</td>
                <td style={{ ...tdStyle, textAlign: "right", color: "var(--c-text-3)" }}>
                  {r.slug ? "→" : ""}
                </td>
              </>
            );
            const rowStyle: React.CSSProperties = { borderTop: i === 0 ? "none" : "1px solid var(--c-border)" };
            return r.slug ? (
              <tr
                key={r.name}
                style={{ ...rowStyle, cursor: "pointer", textDecoration: "none" }}
                onClick={() => { window.location.href = `/country/${r.slug}`; }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--c-surface-2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {inner}
              </tr>
            ) : (
              <tr key={r.name} style={rowStyle}>{inner}</tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: "left", padding: "10px 14px", color: "var(--c-text-3)",
  fontWeight: 600, whiteSpace: "nowrap",
};
const tdStyle: React.CSSProperties = { padding: "10px 14px", verticalAlign: "middle" };
