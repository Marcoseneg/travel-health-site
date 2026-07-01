"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  // ── Pan + zoom (markers variant) ──────────────────────────────────────────
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: W / 2, y: H / 2 });
  const drag = useRef({ active: false, x: 0, y: 0, moved: false });

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
  const vw = W / zoom;
  const vh = H / zoom;
  const vx = clamp(center.x - vw / 2, 0, W - vw);
  const vy = clamp(center.y - vh / 2, 0, H - vh);

  function zoomBy(factor: number) {
    setZoom((z) => {
      const nz = clamp(z * factor, 1, 5);
      if (nz === 1) setCenter({ x: W / 2, y: H / 2 });
      return nz;
    });
  }
  function onPointerDown(e: React.PointerEvent) {
    if (zoom === 1) return; // nothing to pan at full extent
    drag.current = { active: true, x: e.clientX, y: e.clientY, moved: false };
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scale = vw / rect.width; // map units per screen pixel
    if (Math.abs(e.clientX - drag.current.x) + Math.abs(e.clientY - drag.current.y) > 3) drag.current.moved = true;
    const dx = (e.clientX - drag.current.x) * scale;
    const dy = (e.clientY - drag.current.y) * scale;
    drag.current.x = e.clientX;
    drag.current.y = e.clientY;
    setCenter((c) => ({ x: clamp(c.x - dx, vw / 2, W - vw / 2), y: clamp(c.y - dy, vh / 2, H - vh / 2) }));
  }
  function endDrag() { drag.current.active = false; }

  const zoomBtnStyle: React.CSSProperties = {
    width: "30px", height: "30px", display: "inline-flex", alignItems: "center", justifyContent: "center",
    border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text-2)",
    borderRadius: "8px", cursor: "pointer", fontSize: "17px", fontWeight: 700, lineHeight: 1,
    boxShadow: "0 2px 8px rgba(15,23,42,0.10)",
  };

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
      <svg
        ref={svgRef}
        viewBox={decorative ? `0 0 ${W} ${H}` : `${vx} ${vy} ${vw} ${vh}`}
        width="100%"
        role="img"
        aria-label={decorative ? "Decorative world map" : "World map of outbreak locations"}
        onPointerDown={decorative ? undefined : onPointerDown}
        onPointerMove={decorative ? undefined : onPointerMove}
        onPointerUp={decorative ? undefined : endDrag}
        onPointerLeave={decorative ? undefined : endDrag}
        style={{ display: "block", overflow: decorative ? "visible" : "hidden", borderRadius: decorative ? 0 : "10px", touchAction: !decorative && zoom > 1 ? "none" : "auto", cursor: !decorative && zoom > 1 ? "grab" : "default" }}
      >
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
            <rect x={0} y={0} width={W} height={H} rx={10} fill="var(--map-ocean)" />
            <g>
              {countryPaths.map((d, i) => (
                <path key={i} d={d} fill="var(--map-land)" stroke="var(--map-border)" strokeWidth={0.6} strokeLinejoin="round" />
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
            onClick={() => { if (drag.current.moved) { drag.current.moved = false; return; } goToAnchor(p.anchor); }}
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

      {/* Marker tooltip (positioned in current viewBox space) */}
      {!decorative && hover && (
        <div style={{
          position: "absolute", left: `${((hover.x - vx) / vw) * 100}%`, top: `${((hover.y - vy) / vh) * 100}%`,
          transform: "translate(12px, -120%)", background: "var(--c-surface)", border: "1px solid var(--c-border)",
          borderRadius: "10px", padding: "7px 11px", boxShadow: "0 10px 26px rgba(15,23,42,0.16)", pointerEvents: "none", whiteSpace: "nowrap", maxWidth: "260px", zIndex: 5,
        }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--c-text)", overflow: "hidden", textOverflow: "ellipsis" }}>{hover.title}</div>
          <div className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>{hover.place}</div>
        </div>
      )}

      {/* Zoom controls */}
      {!decorative && (
        <div style={{ position: "absolute", right: "10px", bottom: "10px", display: "flex", flexDirection: "column", gap: "6px", zIndex: 4 }}>
          <button type="button" aria-label="Zoom in" onClick={() => zoomBy(1.6)} style={zoomBtnStyle}>+</button>
          <button type="button" aria-label="Zoom out" onClick={() => zoomBy(1 / 1.6)} style={zoomBtnStyle}>−</button>
        </div>
      )}
    </div>
  );
}
