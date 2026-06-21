"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10, type GeoProjection } from "d3-geo";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";

// Interactive, light-themed hero globe — a hand-rolled orthographic SVG globe
// (d3-geo), NOT the heavy 3D react-globe.gl canvas. It auto-spins, pauses on
// hover, highlights countries, and lets you click to add a destination to the
// trip. Light by design, no WebGL camera state, so none of the dark/zoom
// glitches of the 3D globe.

const VB = 560;
const C = VB / 2;
const R = 250;
const SPEED = 5; // degrees / second
const TILT = -12;

type GeoFeature = { type: string; geometry: unknown; properties: { NAME?: string; ADMIN?: string } };
type GeoJson = { features: GeoFeature[] };

// Reverse map: geojson country NAME -> our supported slug.
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
  const lambdaRef = useRef(20);
  const pausedRef = useRef(false);
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

  const features = geo?.features ?? [];

  // Static layers (sphere + graticule) recomputed only when not spinning would
  // change them — but they don't change with rotation shape much; we redraw
  // them each frame cheaply alongside the countries via the same projection.
  const slugs = useMemo(() => features.map((f) => slugForFeature(f)), [features]);

  useEffect(() => {
    if (!features.length) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let last = performance.now();
    let lastDraw = -999;

    const draw = (proj: GeoProjection) => {
      const path = geoPath(proj);
      const sel = selectedRef.current;
      for (let i = 0; i < features.length; i++) {
        const el = pathEls.current[i];
        if (!el) continue;
        el.setAttribute("d", path(features[i] as never) || "");
        const slug = slugs[i];
        const fill = slug && sel.has(slug)
          ? "#0891b2"
          : slug
          ? "#9fd6d8"
          : "#cfe3e4";
        el.setAttribute("fill", fill);
      }
      const gr = document.getElementById("hg-grat") as unknown as SVGPathElement | null;
      if (gr) gr.setAttribute("d", path(geoGraticule10()) || "");
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const spinning = !pausedRef.current && !reduce && !document.hidden;
      if (spinning) lambdaRef.current = (lambdaRef.current + SPEED * dt) % 360;
      // throttle redraw to ~30fps
      if (spinning ? now - lastDraw > 33 : now - lastDraw > 120) {
        lastDraw = now;
        const proj = geoOrthographic().scale(R).translate([C, C]).rotate([lambdaRef.current, TILT]).clipAngle(90);
        draw(proj);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [features, slugs]);

  const onEnter = (i: number, e: React.MouseEvent<SVGPathElement>) => {
    pausedRef.current = true;
    const f = features[i];
    const name = f.properties?.NAME || f.properties?.ADMIN || "";
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setHover({ name, slug: slugs[i], x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div
      style={{ position: "relative", width: "100%", maxWidth: "540px", margin: "0 auto" }}
      onMouseLeave={() => { pausedRef.current = false; setHover(null); }}
    >
      <svg viewBox={`0 0 ${VB} ${VB}`} width="100%" role="img" aria-label="Interactive world globe — click a country to add it to your trip" style={{ display: "block", overflow: "visible" }}>
        <defs>
          <radialGradient id="hg-sphere" cx="40%" cy="34%" r="72%">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#eef7f8" />
            <stop offset="100%" stopColor="#d6ebee" />
          </radialGradient>
          <radialGradient id="hg-halo" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="rgba(8,145,178,0.10)" />
            <stop offset="100%" stopColor="rgba(8,145,178,0)" />
          </radialGradient>
        </defs>

        <circle cx={C} cy={C} r={R + 26} fill="url(#hg-halo)" />
        <circle cx={C} cy={C} r={R} fill="url(#hg-sphere)" stroke="rgba(8,145,178,0.18)" strokeWidth={1} />
        <path id="hg-grat" fill="none" stroke="rgba(8,145,178,0.10)" strokeWidth={0.6} />

        <g stroke="#ffffff" strokeWidth={0.5} strokeLinejoin="round">
          {features.map((f, i) => {
            const slug = slugs[i];
            return (
              <path
                key={i}
                ref={(el) => { pathEls.current[i] = el; }}
                fill="#cfe3e4"
                style={{ cursor: slug ? "pointer" : "default", transition: "fill 0.15s" }}
                onMouseEnter={(e) => onEnter(i, e)}
                onMouseMove={(e) => onEnter(i, e)}
                onClick={() => { if (slug) onToggleCountry(slug); }}
              />
            );
          })}
        </g>
      </svg>

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
