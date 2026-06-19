"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "../app//lib/travelData";

import type { GlobeMethods } from "react-globe.gl";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

type Feature = {
  properties?: {
    NAME?: string;
    ADMIN?: string;
    name?: string;
  };
};

function useGlobeSize() {
  const [size, setSize] = useState(760);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) setSize(420);
      else if (width < 1024) setSize(540);
      else if (width < 1280) setSize(660);
      else setSize(760);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

type Props = {
  selectedCountries: CountrySlug[];
  onToggleCountry: (country: CountrySlug) => void;
};

export default function GlobeHero({ selectedCountries, onToggleCountry }: Props) {
  const globeRef = useRef<GlobeMethods>(undefined);
  const [countries, setCountries] = useState<Feature[]>([]);
  const [hovered, setHovered] = useState<Feature | null>(null);
  const [hoveredName, setHoveredName] = useState("");
  const globeSize = useGlobeSize();

  useEffect(() => {
    fetch("/data/countries.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load GeoJSON: ${res.status}`);
        return res.json();
      })
      .then((data) => setCountries(data.features || []))
      .catch((err) => console.error("Failed to load countries.geojson", err));
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.28;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    globeRef.current.pointOfView({ lat: 18, lng: -32, altitude: 0.72 }, 0);
  }, [globeSize]);

  const getCountryName = (feature: Feature) =>
    feature.properties?.NAME || feature.properties?.ADMIN || feature.properties?.name || "";

  const slugByLabel = useMemo(() => {
    return Object.fromEntries(
      Object.entries(SUPPORTED_COUNTRIES).map(([slug, c]) => [c.label, slug])
    ) as Record<string, CountrySlug>;
  }, []);

  const supportedCountryNames = useMemo<string[]>(
    () => Object.values(SUPPORTED_COUNTRIES).map((c) => c.label),
    []
  );

  const clickableCountries = useMemo(
    () => countries.filter((feature) => supportedCountryNames.includes(getCountryName(feature))),
    [countries, supportedCountryNames]
  );

  return (
    <div style={{ width: `${globeSize}px`, height: `${globeSize}px`, position: "relative", flexShrink: 0 }}>
      {/* Outer glow */}
      <div style={{ position: "absolute", inset: "-15%", borderRadius: "9999px", background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.06) 40%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Inner rim */}
      <div style={{ position: "absolute", inset: "-4%", borderRadius: "9999px", border: "1px solid rgba(56,189,248,0.08)", boxShadow: "0 0 80px rgba(56,189,248,0.12), 0 0 160px rgba(56,189,248,0.06), inset 0 0 60px rgba(56,189,248,0.04)", pointerEvents: "none", zIndex: 0 }} />

      {/* Tooltip */}
      {hoveredName && (
        <div style={{ position: "absolute", left: "50%", top: "14%", transform: "translateX(-50%)", zIndex: 20, pointerEvents: "none" }}>
          <div style={{ borderRadius: "14px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(8,12,24,0.88)", padding: "10px 16px", textAlign: "center", backdropFilter: "blur(16px)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff", letterSpacing: "-0.02em" }}>{hoveredName}</div>
            <div style={{ marginTop: "3px", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(125,211,252,0.8)" }}>Click to add</div>
          </div>
        </div>
      )}

      {/* Globe */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Globe
          ref={globeRef}
          width={globeSize}
          height={globeSize}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="rgba(56,189,248,1)"
          atmosphereAltitude={0.18}
          polygonsData={clickableCountries}
          polygonAltitude={(d: object) => {
            const feat = d as Feature;
            const name = getCountryName(feat);
            const slug = slugByLabel[name];
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            if (feat === hovered) return 0.015;
            if (isSelected) return 0.012;
            return 0.004;
          }}
          polygonCapColor={(d: object) => {
            const feat = d as Feature;
            const name = getCountryName(feat);
            const slug = slugByLabel[name];
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            if (feat === hovered) return "rgba(255,255,255,0.95)";
            if (isSelected) return "rgba(56,189,248,0.85)";
            return "rgba(56,189,248,0.22)";
          }}
          polygonSideColor={() => "rgba(255,255,255,0.04)"}
          polygonStrokeColor={() => "rgba(255,255,255,0.08)"}
          polygonsTransitionDuration={180}
          onPolygonHover={(polygon: object | null) => {
            const feat = polygon as Feature | null;
            setHovered(feat);
            if (!feat) { setHoveredName(""); return; }
            setHoveredName(getCountryName(feat));
          }}
          onPolygonClick={(polygon: object) => {
            const feat = polygon as Feature;
            const name = getCountryName(feat);
            const slug = slugByLabel[name];
            if (slug) onToggleCountry(slug);
          }}
        />
      </div>
    </div>
  );
}
