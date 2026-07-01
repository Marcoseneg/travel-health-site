"use client";

import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";

// ─────────────────────────────────────────────────────────────────────────────
// Stippled (dot-matrix) world map. Two modes:
//   • decorative — just the map texture (used in the Disease Explorer hero).
//   • markers    — plots caller-supplied outbreak markers, colored by status,
//                  with a hover tooltip; clicking scrolls to the matching alert
//                  card (via `anchor`). Used on /outbreaks.
// ─────────────────────────────────────────────────────────────────────────────

const W = 1000;
const H = 520;
const STEP = 9; // px between land dots

export type MapMarker = {
  lat: number;
  lng: number;
  color: string;
  title: string;
  place: string;
  anchor?: string; // element id to scroll to on click
};

type GeoFeature = { type: string; geometry: unknown; properties: { NAME?: string; ADMIN?: string } };
type GeoJson = { type: string; features: GeoFeature[] };
type Point = MapMarker & { x: number; y: number };

export default function OutbreakMap({
  decorative = false,
  markers,
  scrollContainerId,
}: {
  decorative?: boolean;
  markers?: MapMarker[];
  scrollContainerId?: string;
} = {}) {
  const [geo, setGeo] = useState<GeoJson | null>(null);
  const [hover, setHover] = useState<Point | null>(null);

  // Scroll to the alert. If a scroll container is given and is scrollable,
  // scroll *within it* (so the page doesn't jump); otherwise scroll the page.
  function goToAnchor(anchor?: string) {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (!el) return;
    const container = scrollContainerId ? document.getElementById(scrollContainerId) : null;
    if (container && container.scrollHeight > container.clientHeight + 4) {
      // Scroll only within the panel. Assigning scrollTop is reliable here;
      // scrollTo({behavior:'smooth'}) doesn't animate this container.
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      container.scrollTop = container.scrollTop + (eRect.top - cRect.top) - 12;
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    el.classList.add("ob-flash");
    setTimeout(() => el.classList.remove("ob-flash"), 1400);
  }

  useEffect(() => {
    let alive = true;
    fetch("/data/countries.geojson").then((r) => r.json()).then((d) => { if (alive) setGeo(d); }).catch(() => {});
    return () => { alive = false; };
  }, []);

  const { dots, countryPaths, points } = useMemo(() => {
    if (!geo) return { dots: [] as { x: number; y: number }[], countryPaths: [] as string[], points: [] as Point[] };
    const features = geo.features.filter((f) => (f.properties?.NAME || f.properties?.ADMIN) !== "Antarctica");
    const fc = { type: "FeatureCollection", features } as unknown as GeoJson;
    const projection = geoNaturalEarth1().fitExtent([[3, 3], [W - 3, H - 3]], fc as never);
    const path = geoPath(projection);

    // One SVG path per country → filled land with visible borders.
    const countryPaths = features.map((f) => path(f as never) || "").filter(Boolean);

    // Land dots only for the decorative variant (sampled via point-in-path).
    const dots: { x: number; y: number }[] = [];
    if (decorative && typeof document !== "undefined") {
      const ctx = document.createElement("canvas").getContext("2d");
      if (ctx) {
        const p2d = new Path2D(countryPaths.join(" "));
        for (let x = STEP / 2; x < W; x += STEP) {
          for (let y = STEP / 2; y < H; y += STEP) {
            if (ctx.isPointInPath(p2d, x, y)) dots.push({ x, y });
          }
        }
      }
    }

    // Project caller-supplied markers to screen space.
    const points: Point[] = [];
    (markers ?? []).forEach((m) => {
      const pt = projection([m.lng, m.lat]);
      if (!pt) return;
      points.push({ ...m, x: pt[0], y: pt[1] });
    });

    return { dots, countryPaths, points };
  }, [geo, markers, decorative]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={decorative ? "Decorative world map" : "World map of outbreak locations"} style={{ display: "block", overflow: "visible" }}>
        {decorative ? (
          <>
            {/* Soft land silhouette + dot texture (Disease Explorer hero). */}
            <path d={countryPaths.join(" ")} fill="var(--c-accent)" opacity={0.18} stroke="none" />
            <g style={{ color: "var(--c-accent)" }}>
              {dots.map((d, i) => (
                <circle key={i} cx={d.x} cy={d.y} r={1.7} fill="currentColor" opacity={0.62} />
              ))}
            </g>
          </>
        ) : (
          <>
            {/* Geographic map: ocean + filled countries with borders. */}
            <rect x={0} y={0} width={W} height={H} rx={10} fill="var(--c-accent-soft)" />
            <g>
              {countryPaths.map((d, i) => (
                <path key={i} d={d} fill="var(--c-surface)" stroke="var(--c-border-strong)" strokeWidth={0.5} strokeLinejoin="round" />
              ))}
            </g>
          </>
        )}

        {/* Outbreak markers */}
        {!decorative && points.map((p, i) => (
          <g
            key={i}
            transform={`translate(${p.x} ${p.y})`}
            style={{ cursor: p.anchor ? "pointer" : "default" }}
            onMouseEnter={() => setHover(p)}
            onMouseLeave={() => setHover(null)}
            onClick={() => goToAnchor(p.anchor)}
          >
            <circle r={18} fill="transparent" />
            <circle r={4} fill={p.color} stroke="var(--c-surface)" strokeWidth={1} />
            <circle r={4} fill="none" stroke={p.color} strokeWidth={1.4} opacity={0.7}>
              <animate attributeName="r" values="4;14" dur="2.6s" begin={`${(i % 8) * 0.32}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="2.6s" begin={`${(i % 8) * 0.32}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
      </svg>

      {/* Marker tooltip */}
      {!decorative && hover && (
        <div style={{
          position: "absolute", left: `${(hover.x / W) * 100}%`, top: `${(hover.y / H) * 100}%`,
          transform: "translate(12px, -120%)", background: "var(--c-surface)", border: "1px solid var(--c-border)",
          borderRadius: "10px", padding: "7px 11px", boxShadow: "0 10px 26px rgba(15,23,42,0.16)", pointerEvents: "none", whiteSpace: "nowrap", maxWidth: "260px", zIndex: 5,
        }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--c-text)", overflow: "hidden", textOverflow: "ellipsis" }}>{hover.title}</div>
          <div className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>{hover.place}</div>
        </div>
      )}
    </div>
  );
}
