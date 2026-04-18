"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";
import {
  malariaRiskByCountry,
  MALARIA_COLORS,
  type MalariaRisk,
} from "../lib/malariaData";
import {
  yellowFeverByCountry,
  YELLOW_FEVER_COLORS,
  type YellowFeverRisk,
} from "../lib/yellowFeverData";
import {
  dengueRiskByCountry,
  DENGUE_COLORS,
  type DengueRisk,
} from "../lib/dengueData";
import {
  chikungunyaRiskByCountry,
  CHIKUNGUNYA_COLORS,
  type ChikungunyaRisk,
} from "../lib/chikungunyaData";
import DiseaseFilterBar, { type FilterMode } from "./DiseaseFilterBar";

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
      const w = window.innerWidth;
      if (w < 640) setSize(420);
      else if (w < 1024) setSize(540);
      else if (w < 1280) setSize(660);
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
  const globeRef = useRef<any>(null);
  const [allCountries, setAllCountries] = useState<Feature[]>([]);
  const [hovered, setHovered] = useState<Feature | null>(null);
  const [hoveredName, setHoveredName] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterMode>("none");
  const globeSize = useGlobeSize();

  useEffect(() => {
    fetch("/data/countries.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load GeoJSON: ${res.status}`);
        return res.json();
      })
      .then((data) => setAllCountries(data.features || []))
      .catch((err) => console.error("Failed to load countries.geojson", err));
  }, []);

  // Reset controls whenever globe size changes
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.28;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.minDistance = 300;
    controls.maxDistance = 300;
    globeRef.current.pointOfView({ lat: 18, lng: -32, altitude: 0.72 }, 0);
  }, [globeSize]);

  // Also reset on mount (handles back-navigation)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!globeRef.current) return;
      const controls = globeRef.current.controls();
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.enableRotate = false;
      controls.minDistance = 300;
      controls.maxDistance = 300;
      globeRef.current.pointOfView({ lat: 18, lng: -32, altitude: 0.72 }, 0);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getCountryName = (feature: Feature) =>
    feature.properties?.NAME || feature.properties?.ADMIN || feature.properties?.name || "";

  const slugByLabel = useMemo(() => {
    return Object.fromEntries(
      Object.entries(SUPPORTED_COUNTRIES).map(([slug, c]) => [c.label, slug])
    ) as Record<string, CountrySlug>;
  }, []);

  const findSlug = (feat: Feature): CountrySlug | undefined => {
    const name = feat.properties?.NAME || "";
    const admin = feat.properties?.ADMIN || "";
    return slugByLabel[name] || slugByLabel[admin];
  };

  const isSupportedFeat = (feat: Feature): boolean => findSlug(feat) !== undefined;

  // ── Risk lookups ──────────────────────────────────────────────────────────
  const getMalariaRisk = (name: string): MalariaRisk => malariaRiskByCountry[name] || "none";
  const getYFRisk = (name: string): YellowFeverRisk => yellowFeverByCountry[name] || "none";
  const getDengueRisk = (name: string): DengueRisk => dengueRiskByCountry[name] || "none";
  const getChikungunyaRisk = (name: string): ChikungunyaRisk => chikungunyaRiskByCountry[name] || "none";

  // ── Hovered state ─────────────────────────────────────────────────────────
  const hoveredIsSupported = hovered ? isSupportedFeat(hovered) : false;
  const hoveredSlug = hovered ? findSlug(hovered) : undefined;
  const hoveredIsSelected = hoveredSlug ? selectedCountries.includes(hoveredSlug) : false;

  // ── Hovered risk for tooltip ──────────────────────────────────────────────
  const hoveredRiskInfo = useMemo(() => {
    if (!hoveredName || activeFilter === "none") return null;

    if (activeFilter === "malaria") {
      const risk = getMalariaRisk(hoveredName);
      return { risk, label: risk === "none" ? "No malaria" : `${risk} risk` };
    }
    if (activeFilter === "dengue") {
      const risk = getDengueRisk(hoveredName);
      return { risk, label: risk === "none" ? "No dengue" : `${risk} risk` };
    }
    if (activeFilter === "chikungunya") {
      const risk = getChikungunyaRisk(hoveredName);
      return { risk, label: risk === "none" ? "No chikungunya" : `${risk} risk` };
    }
    if (activeFilter === "yellow-fever") {
      const risk = getYFRisk(hoveredName);
      const labels: Record<YellowFeverRisk, string> = {
        required: "Required",
        recommended: "Recommended",
        "generally-not": "Generally not required",
        none: "Not applicable",
      };
      return { risk, label: labels[risk] };
    }
    return null;
  }, [hoveredName, activeFilter]);

  const getRiskBadgeStyle = (risk: string): { background: string; color: string } => {
    const base: Record<string, { background: string; color: string }> = {
      high: { background: "rgba(239,68,68,0.2)", color: "#fca5a5" },
      moderate: { background: "rgba(245,158,11,0.2)", color: "#fcd34d" },
      low: { background: "rgba(250,204,21,0.2)", color: "#fef08a" },
      none: { background: "rgba(100,116,139,0.15)", color: "#94a3b8" },
      required: { background: "rgba(245,158,11,0.25)", color: "#fcd34d" },
      recommended: { background: "rgba(251,191,36,0.2)", color: "#fde68a" },
      "generally-not": { background: "rgba(253,224,71,0.15)", color: "#fef9c3" },
    };
    if (activeFilter === "chikungunya") {
      if (risk === "high") return { background: "rgba(168,85,247,0.25)", color: "#c4b5fd" };
      if (risk === "moderate") return { background: "rgba(192,132,252,0.2)", color: "#d8b4fe" };
      if (risk === "low") return { background: "rgba(216,180,254,0.15)", color: "#e9d5ff" };
    }
    if (activeFilter === "dengue") {
      if (risk === "high") return { background: "rgba(239,68,68,0.2)", color: "#fca5a5" };
      if (risk === "moderate") return { background: "rgba(251,146,60,0.2)", color: "#fdba74" };
      if (risk === "low") return { background: "rgba(253,224,71,0.2)", color: "#fef08a" };
    }
    return base[risk] || base.none;
  };

  // ── Globe coloring ────────────────────────────────────────────────────────
  const getFilterColor = (name: string): string => {
    if (activeFilter === "malaria") return MALARIA_COLORS[getMalariaRisk(name)];
    if (activeFilter === "yellow-fever") return YELLOW_FEVER_COLORS[getYFRisk(name)];
    if (activeFilter === "dengue") return DENGUE_COLORS[getDengueRisk(name)];
    if (activeFilter === "chikungunya") return CHIKUNGUNYA_COLORS[getChikungunyaRisk(name)];
    return "rgba(0,0,0,0)";
  };

  const getFilterRiskLevel = (name: string): string => {
    if (activeFilter === "malaria") return getMalariaRisk(name);
    if (activeFilter === "yellow-fever") return getYFRisk(name);
    if (activeFilter === "dengue") return getDengueRisk(name);
    if (activeFilter === "chikungunya") return getChikungunyaRisk(name);
    return "none";
  };

  return (
    <div
      onWheel={(e) => {
        // Prevent the globe's Three.js controls from capturing scroll — let the page scroll instead
        e.stopPropagation();
      }}
      style={{
        width: `${globeSize}px`,
        height: `${globeSize}px`,
        position: "relative",
        flexShrink: 0,
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.22) 0%, rgba(56,189,248,0.10) 30%, rgba(56,189,248,0.03) 50%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Filter bar (top of globe) ────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        <DiseaseFilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* ── Tooltip ──────────────────────────────────────────────────── */}
      {hoveredName && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "22%",
            transform: "translateX(-50%)",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(8,12,24,0.88)",
              padding: "10px 16px",
              textAlign: "center",
              backdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                fontSize: "15px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "-0.02em",
              }}
            >
              {hoveredName}
            </div>

            {hoveredRiskInfo && (() => {
              const badgeStyle = getRiskBadgeStyle(hoveredRiskInfo.risk);
              return (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    background: badgeStyle.background,
                    color: badgeStyle.color,
                  }}
                >
                  {hoveredRiskInfo.label}
                </span>
              );
            })()}

            {hoveredIsSupported ? (
              <span
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  color: hoveredIsSelected
                    ? "rgba(248,113,113,0.8)"
                    : "rgba(125,211,252,0.8)",
                }}
              >
                {hoveredIsSelected ? "Click to remove" : "Click to add"}
              </span>
            ) : (
              <span
                style={{
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "rgba(100,116,139,0.6)",
                }}
              >
                Coming soon
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── Globe ────────────────────────────────────────────────────── */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Globe
          ref={globeRef}
          width={globeSize}
          height={globeSize}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor="rgba(80,200,255,1)"
          atmosphereAltitude={0.25}
          showGraticules={true}
          polygonsData={allCountries}
          polygonAltitude={(d: object) => {
            const feat = d as Feature;
            const name = getCountryName(feat);
            const slug = findSlug(feat);
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            const supported = isSupportedFeat(feat);

            if (isSelected) return 0.018;
            if (feat === hovered && supported) return 0.02;
            if (feat === hovered) return 0.01;

            if (activeFilter !== "none") {
              const risk = getFilterRiskLevel(name);
              if (risk === "high" || risk === "required") return 0.01;
              if (risk === "moderate" || risk === "recommended") return 0.007;
              if (risk === "low" || risk === "generally-not") return 0.004;
              return 0.001;
            }

            if (supported) return 0.004;
            return 0.001;
          }}
          polygonCapColor={(d: object) => {
            const feat = d as Feature;
            const name = getCountryName(feat);
            const slug = findSlug(feat);
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            const supported = isSupportedFeat(feat);

            if (isSelected) return "rgba(56,189,248,0.9)";

            if (activeFilter !== "none") {
              if (feat === hovered && supported) return "rgba(255,255,255,0.95)";
              if (feat === hovered) return "rgba(255,255,255,0.4)";
              return getFilterColor(name);
            }

            if (feat === hovered && supported) return "rgba(255,255,255,0.95)";
            if (feat === hovered) return "rgba(255,255,255,0.25)";
            if (supported) return "rgba(56,189,248,0.2)";
            return "rgba(0,0,0,0)";
          }}
          polygonSideColor={(d: object) => {
            const feat = d as Feature;
            const slug = findSlug(feat);
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            if (isSelected) return "rgba(56,189,248,0.15)";
            return "rgba(255,255,255,0.02)";
          }}
          polygonStrokeColor={(d: object) => {
            const feat = d as Feature;
            const name = getCountryName(feat);
            const slug = findSlug(feat);
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            const supported = isSupportedFeat(feat);

            if (isSelected) return "rgba(56,189,248,0.7)";

            if (activeFilter !== "none") {
              const risk = getFilterRiskLevel(name);
              if (risk !== "none") return "rgba(255,255,255,0.35)";
              return "rgba(255,255,255,0.15)";
            }

            if (supported) return "rgba(255,255,255,0.3)";
            return "rgba(255,255,255,0.15)";
          }}
          polygonsTransitionDuration={400}
          onPolygonHover={(polygon: object | null) => {
            const feat = polygon as Feature | null;
            setHovered(feat);
            if (!feat) {
              setHoveredName("");
              return;
            }
            setHoveredName(getCountryName(feat));
          }}
          onPolygonClick={(polygon: object) => {
            const feat = polygon as Feature;
            const slug = findSlug(feat);
            if (slug) onToggleCountry(slug);
          }}
        />
      </div>
    </div>
  );
}
