"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10, type GeoProjection } from "d3-geo";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";

// Interactive, light-themed hero globe — a hand-rolled orthographic SVG globe
// (d3-geo), NOT the heavy 3D react-globe.gl canvas. It auto-spins, can be
// dragged to rotate, zoomed with +/- buttons (no wheel zoom → no scroll-jack,
// nothing to persist, so none of the dark/zoom glitches of the 3D globe), and
// clicking a country adds it to the trip.

const VB = 560;
const C = VB / 2;
const R = 250;
const SPEED = 7; // degrees / second (full rotation ~51s)
const ZOOM_MIN = 0.75;
const ZOOM_MAX = 2.4;

type GeoFeature = { type: string; geometry: unknown; properties: { NAME?: string; ADMIN?: string } };
type GeoJson = { features: GeoFeature[] };

const LABEL_TO_SLUG: Record<string, CountrySlug> = Object.fromEntries(
  (Object.entries(SUPPORTED_COUNTRIES) as [CountrySlug, { label: string }][]).map(
    ([slug, c]) => [c.label, slug]
  )
) as Record<string, CountrySlug>;

function slugForFeature(f: GeoFeature): CountrySlug | undefined {
  const name = f.properties?.NAME || f.properties?.ADMIN || "";
  return LABEL_TO_SLUG[name];
}

type Props = {
  selectedCountries: CountrySlug[];
  onToggleCountry: (slug: CountrySlug) => void;
};

export default function HeroGlobe({ selectedCountries, onToggleCountry }: Props) {
  const [geo, setGeo] = useState<GeoJson | null>(null);
  const [hover, setHover] = useState<{ name: string; slug?: CountrySlug; x: number; y: number } | null>(null);

  const pathEls = useRef<(SVGPathElement | null)[]>([]);
  const sphereEl = useRef<SVGPathElement | null>(null);
  const haloEl = useRef<SVGCircleElement | null>(null);
  const limbEl = useRef<SVGCircleElement | null>(null);
  const shadowEl = useRef<SVGEllipseElement | null>(null);
  const gratEl = useRef<SVGPathElement | null>(null);

  const lambdaRef = useRef(20);
  const phiRef = useRef(-12);
  const zoomRef = useRef(1);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const dragStart = useRef({ x: 0, y: 0, lambda: 0, phi: 0 });
  const drawRef = useRef<() => void>(() => {});
  const selectedRef = useRef<Set<string>>(new Set());

  useEffect(() => { selectedRef.current = new Set(selectedCountries); }, [selectedCountries]);

  useEffect(() => {
    let alive = true;
    fetch("/data/countries.geojson")
      .then((r) => r.json())
      .then((d) => { if (alive) setGeo(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const features = useMemo(() => geo?.features ?? [], [geo]);
  const slugs = useMemo(() => features.map((f) => slugForFeature(f)), [features]);

  useEffect(() => {
    if (!features.length) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const buildProj = () =>
      geoOrthographic()
        .scale(R * zoomRef.current)
        .translate([C, C])
        .rotate([lambdaRef.current, phiRef.current])
        .clipAngle(90);

    const draw = (proj: GeoProjection) => {
      const path = geoPath(proj);
      const sel = selectedRef.current;
      // Theme-aware palette. Land is teal-green vs a blue-teal ocean (two hues)
      // so the globe doesn't read as flat monochrome plastic.
      const dark = document.documentElement.getAttribute("data-theme") === "dark";
      const cLand = dark ? "#2f7077" : "#79c2b3";
      const cLandU = dark ? "#244e55" : "#a9d8d0";
      const cSel = dark ? "#38bdf8" : "#0891b2";
      if (sphereEl.current) {
        sphereEl.current.setAttribute("d", path({ type: "Sphere" } as never) || "");
        sphereEl.current.setAttribute("fill", dark ? "url(#hg-sphere-dark)" : "url(#hg-sphere-light)");
        sphereEl.current.setAttribute("stroke", dark ? "rgba(255,255,255,0.10)" : "rgba(8,145,178,0.18)");
      }
      if (haloEl.current) haloEl.current.setAttribute("r", String(R * zoomRef.current + 26));
      if (limbEl.current) limbEl.current.setAttribute("r", String(R * zoomRef.current));
      if (shadowEl.current) {
        const rr = R * zoomRef.current;
        shadowEl.current.setAttribute("cx", String(C - rr * 0.12));
        shadowEl.current.setAttribute("cy", String(C + rr + 6));
        shadowEl.current.setAttribute("rx", String(rr * 0.74));
      }
      if (gratEl.current) {
        gratEl.current.setAttribute("d", path(geoGraticule10()) || "");
        gratEl.current.setAttribute("stroke", dark ? "rgba(255,255,255,0.07)" : "rgba(8,145,178,0.10)");
      }
      for (let i = 0; i < features.length; i++) {
        const el = pathEls.current[i];
        if (!el) continue;
        el.setAttribute("d", path(features[i] as never) || "");
        const slug = slugs[i];
        el.setAttribute("fill", slug ? (sel.has(slug) ? cSel : cLand) : cLandU);
      }
    };
    drawRef.current = () => draw(buildProj());

    let raf = 0;
    let last = performance.now();
    let lastDraw = -999;
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const spinning = !pausedRef.current && !draggingRef.current && !reduce && !document.hidden;
      if (spinning) lambdaRef.current = (lambdaRef.current + SPEED * dt) % 360;
      const active = spinning || draggingRef.current;
      if (active ? now - lastDraw > 33 : now - lastDraw > 200) {
        lastDraw = now;
        draw(buildProj());
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [features, slugs]);

  // ── Drag to rotate ─────────────────────────────────────────────────────────
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    movedRef.current = false;
    pausedRef.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY, lambda: lambdaRef.current, phi: phiRef.current };
    // NOTE: deliberately NOT using setPointerCapture — capturing the pointer on
    // the container retargets all later events to it, which swallows the click
    // on country paths and the zoom buttons. Drag works fine without it.
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) movedRef.current = true;
    const sens = 0.28 / zoomRef.current;
    lambdaRef.current = dragStart.current.lambda + dx * sens;
    phiRef.current = Math.max(-89, Math.min(89, dragStart.current.phi - dy * sens));
    drawRef.current();
  };
  const onPointerUp = () => {
    if (movedRef.current) {
      suppressClickRef.current = true;
      setTimeout(() => { suppressClickRef.current = false; }, 0);
    }
    draggingRef.current = false;
  };

  const onEnter = (i: number, e: React.MouseEvent<SVGPathElement>) => {
    if (draggingRef.current) return;
    pausedRef.current = true;
    const f = features[i];
    const name = f.properties?.NAME || f.properties?.ADMIN || "";
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setHover({ name, slug: slugs[i], x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  const zoom = (factor: number) => {
    zoomRef.current = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomRef.current * factor));
    drawRef.current();
  };

  const zoomBtn: React.CSSProperties = {
    width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "8px", background: "var(--c-surface)", border: "1px solid var(--c-border)",
    color: "var(--c-text-2)", cursor: "pointer", fontSize: "18px", lineHeight: 1, fontFamily: "inherit",
    boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
  };

  return (
    <div
      style={{ position: "relative", width: "100%", maxWidth: "516px", margin: "0 auto", touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onMouseLeave={() => { pausedRef.current = false; draggingRef.current = false; setHover(null); }}
    >
      <svg viewBox={`0 0 ${VB} ${VB}`} width="100%" role="img" aria-label="Interactive world globe — drag to rotate, click a country to add it to your trip" style={{ display: "block", overflow: "visible", cursor: "grab" }}>
        <defs>
          <radialGradient id="hg-sphere-light" cx="38%" cy="32%" r="76%">
            <stop offset="0" stopColor="#eef8f9" />
            <stop offset="55%" stopColor="#d2e9ec" />
            <stop offset="100%" stopColor="#aed7dc" />
          </radialGradient>
          <radialGradient id="hg-sphere-dark" cx="38%" cy="32%" r="80%">
            <stop offset="0" stopColor="#163a42" />
            <stop offset="55%" stopColor="#0e2a31" />
            <stop offset="100%" stopColor="#08191e" />
          </radialGradient>
          <radialGradient id="hg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(8,145,178,0.12)" />
            <stop offset="100%" stopColor="rgba(8,145,178,0)" />
          </radialGradient>
          {/* Contact shadow under the globe. */}
          <radialGradient id="hg-shadow" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(15,23,42,0.22)" />
            <stop offset="65%" stopColor="rgba(15,23,42,0.08)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0)" />
          </radialGradient>
          {/* Limb darkening — shades the rim so the disc reads as a sphere. */}
          <radialGradient id="hg-limb" cx="42%" cy="38%" r="62%">
            <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
            <stop offset="88%" stopColor="rgba(3,18,24,0.10)" />
            <stop offset="100%" stopColor="rgba(3,18,24,0.32)" />
          </radialGradient>
        </defs>

        {/* Contact shadow — sits behind/below the globe so it looks grounded */}
        <ellipse ref={shadowEl} cx={C - R * 0.12} cy={C + R + 6} rx={R * 0.74} ry={26} fill="url(#hg-shadow)" style={{ pointerEvents: "none" }} />
        <circle ref={haloEl} cx={C} cy={C} r={R + 26} fill="url(#hg-halo)" />
        <path ref={sphereEl} fill="url(#hg-sphere-light)" strokeWidth={1} />
        <path ref={gratEl} fill="none" strokeWidth={0.6} />

        <g stroke="#ffffff" strokeWidth={0.5} strokeLinejoin="round">
          {features.map((f, i) => {
            const slug = slugs[i];
            return (
              <path
                key={i}
                ref={(el) => { pathEls.current[i] = el; }}
                fill={slug ? "#79c2b3" : "#a9d8d0"}
                style={{ cursor: slug ? "pointer" : "default", transition: "fill 0.15s" }}
                onMouseEnter={(e) => onEnter(i, e)}
                onMouseMove={(e) => onEnter(i, e)}
                onClick={() => { if (slug && !suppressClickRef.current) onToggleCountry(slug); }}
              />
            );
          })}
        </g>

        {/* Limb-darkening overlay for 3D depth — non-interactive */}
        <circle ref={limbEl} cx={C} cy={C} r={R} fill="url(#hg-limb)" style={{ pointerEvents: "none" }} />

        {/* Decorative flight trail + plane near the globe's upper-left */}
        <g style={{ pointerEvents: "none" }}>
          <path className="hg-trail" d="M28 40 Q92 36 150 78" fill="none" stroke="var(--c-accent)" strokeWidth="1.8" strokeDasharray="2 8" strokeLinecap="round" opacity="0.55" />
          {/* Airplane silhouette (Tabler "plane"), nose pointed along the trail */}
          <g transform="translate(150 78) rotate(80) scale(0.95) translate(-12 -12)">
            <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" fill="var(--c-accent)" />
          </g>
        </g>
      </svg>

      {/* Zoom controls — discrete, no wheel zoom */}
      <div style={{ position: "absolute", right: "2%", bottom: "6%", display: "flex", flexDirection: "column", gap: "6px", zIndex: 6 }}>
        <button aria-label="Zoom in" style={zoomBtn} onClick={() => zoom(1.25)}>+</button>
        <button aria-label="Zoom out" style={zoomBtn} onClick={() => zoom(0.8)}>−</button>
      </div>

      {hover && (
        <div
          style={{
            position: "absolute",
            left: `${hover.x}%`,
            top: `${hover.y}%`,
            transform: "translate(14px, -120%)",
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "10px",
            padding: "7px 11px",
            boxShadow: "0 10px 26px rgba(15,23,42,0.14)",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            zIndex: 5,
          }}
        >
          <div style={{ fontSize: "12.5px", fontWeight: 700, color: "var(--c-text)" }}>{hover.name}</div>
          <div className="t-label" style={{ color: hover.slug ? "var(--c-accent-strong)" : "var(--c-text-3)", fontWeight: 600 }}>
            {hover.slug
              ? selectedCountries.includes(hover.slug)
                ? "Added ✓ · click to remove"
                : "Click to add to trip"
              : "Not yet covered"}
          </div>
        </div>
      )}
    </div>
  );
}
