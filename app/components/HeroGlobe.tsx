"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { geoOrthographic, geoPath, geoGraticule10 } from "d3-geo";

// Lightweight, light-themed hero globe — a static orthographic SVG rendering of
// the world (d3-geo), not the heavy 3D react-globe.gl canvas. It is decorative
// (destination selection lives in the search), so it has no zoom and no camera
// state to glitch on remount. Pale teal land on a soft sphere, a dashed flight
// arc, and a destination pin linking to a featured country.

const VB = 560; // viewBox size
const C = VB / 2;
const R = 250; // globe radius
// Rotate so Africa/Europe sit center-left and SE Asia (the pin) is on the right.
const ROTATE: [number, number, number] = [-50, -12, 0];
const PIN: [number, number] = [100.5, 13.7]; // Bangkok, Thailand

type GeoJson = { features: { type: string; geometry: unknown; properties: unknown }[] };

export default function HeroGlobe() {
  const [geo, setGeo] = useState<GeoJson | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/data/countries.geojson")
      .then((r) => r.json())
      .then((d) => { if (alive) setGeo(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const { sphere, graticule, countries, pin } = useMemo(() => {
    const projection = geoOrthographic().scale(R).translate([C, C]).rotate(ROTATE);
    const path = geoPath(projection);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countryPaths = (geo?.features ?? []).map((f) => path(f as any) || "");
    const pinPos = projection(PIN);
    // Only show the pin when the point is on the near (visible) hemisphere.
    const visible = pinPos && geoPath(projection)({ type: "Point", coordinates: PIN } as never);
    return {
      sphere: path({ type: "Sphere" } as never) || "",
      graticule: path(geoGraticule10()) || "",
      countries: countryPaths,
      pin: visible ? pinPos : null,
    };
  }, [geo]);

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "560px", margin: "0 auto" }}>
      <svg viewBox={`0 0 ${VB} ${VB}`} width="100%" role="img" aria-label="Interactive world globe highlighting travel destinations" style={{ display: "block", overflow: "visible" }}>
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

        {/* soft halo for depth */}
        <circle cx={C} cy={C} r={R + 26} fill="url(#hg-halo)" />
        {/* sphere */}
        <path d={sphere} fill="url(#hg-sphere)" stroke="rgba(8,145,178,0.18)" strokeWidth={1} />
        {/* graticule */}
        <path d={graticule} fill="none" stroke="rgba(8,145,178,0.10)" strokeWidth={0.6} />
        {/* land */}
        <g fill="#a7d8da" stroke="#ffffff" strokeWidth={0.5} strokeLinejoin="round">
          {countries.map((d, i) => (d ? <path key={i} d={d} /> : null))}
        </g>

        {/* dashed flight arc (decorative) */}
        <path
          d={`M ${C - 150} ${C - 150} Q ${C + 40} ${C - 230} ${pin ? pin[0] : C + 150} ${pin ? pin[1] - 6 : C - 40}`}
          fill="none"
          stroke="#0891b2"
          strokeWidth={1.6}
          strokeDasharray="2 7"
          strokeLinecap="round"
          opacity={0.7}
        />
        {/* plane */}
        <path d={`M ${C - 156} ${C - 156} l 16 -7 l -4 7 l 4 7 z`} fill="#0891b2" />

        {/* destination pin */}
        {pin && (
          <g transform={`translate(${pin[0]}, ${pin[1]})`}>
            <circle r={12} fill="rgba(8,145,178,0.18)" />
            <circle r={5.5} fill="#0891b2" stroke="#ffffff" strokeWidth={1.5} />
          </g>
        )}
      </svg>

      {/* Tooltip card anchored near the pin */}
      {pin && (
        <Link
          href="/country/thailand"
          style={{
            position: "absolute",
            left: `${(pin[0] / VB) * 100}%`,
            top: `${(pin[1] / VB) * 100}%`,
            transform: "translate(14px, -130%)",
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "12px",
            padding: "9px 13px",
            boxShadow: "0 10px 26px rgba(15,23,42,0.12)",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--c-text)" }}>Thailand</div>
          <div className="t-label" style={{ color: "var(--c-accent-strong)", fontWeight: 600 }}>
            View health guide →
          </div>
        </Link>
      )}
    </div>
  );
}
