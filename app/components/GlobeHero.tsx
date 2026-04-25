"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { CAPITALS } from "../lib/capitalsData";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

type Feature = {
  properties?: {
    NAME?: string;
    ADMIN?: string;
    name?: string;
  };
  geometry?: {
    type: string;
    coordinates: any;
  };
};

function useGlobeSize() {
  const [size, setSize] = useState(820);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setSize(460);
      else if (w < 1024) setSize(600);
      else if (w < 1280) setSize(720);
      else setSize(820);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return size;
}

// ── Bounding-box centroid of the largest polygon in a country feature.
// Used for label placement so labels sit near the visual middle of each
// country, instead of at the capital city which can be off-center
// (e.g. coastal capitals near a neighbouring country).
type LngLat = { lat: number; lng: number };

function computeFeatureCenter(feat: any): LngLat | null {
  const geom = feat?.geometry;
  if (!geom) return null;

  // Find the largest ring across all polygons. For multi-part countries
  // (e.g. mainland + small islands), this picks the main landmass and
  // ignores territories that would skew the bounding box.
  let largestRing: number[][] | null = null;
  let largestSize = 0;

  const evaluate = (ring: number[][]) => {
    if (ring.length > largestSize) {
      largestSize = ring.length;
      largestRing = ring;
    }
  };

  if (geom.type === "Polygon") {
    geom.coordinates.forEach((ring: number[][]) => evaluate(ring));
  } else if (geom.type === "MultiPolygon") {
    geom.coordinates.forEach((poly: number[][][]) => {
      poly.forEach((ring: number[][]) => evaluate(ring));
    });
  }

  if (!largestRing) return null;

  let minLng = Infinity, maxLng = -Infinity;
  let minLat = Infinity, maxLat = -Infinity;
  (largestRing as number[][]).forEach(([lng, lat]) => {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  });

  return {
    lat: (minLat + maxLat) / 2,
    lng: (minLng + maxLng) / 2,
  };
}

type Props = {
  selectedCountries: CountrySlug[];
  onToggleCountry: (country: CountrySlug) => void;
};

export default function GlobeHero({ selectedCountries, onToggleCountry }: Props) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [allCountries, setAllCountries] = useState<Feature[]>([]);
  const [hovered, setHovered] = useState<Feature | null>(null);
  const [hoveredName, setHoveredName] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterMode>("none");
  const globeSize = useGlobeSize();

  // Toggle handler: clicking the active filter deselects it
  const handleFilterChange = useCallback((filter: FilterMode) => {
    setActiveFilter((current) => (current === filter ? "none" : filter));
  }, []);

  // Inject marker animation CSS
  useEffect(() => {
    const styleId = "globe-marker-styles";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes markerFadeIn {
        from { opacity: 0; transform: translateY(10px) scale(0.8); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Ensure Three.js doesn't capture wheel events for zoom
  // (enableZoom=false handles this, but we also set the canvas to not intercept wheel)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Find the canvas inside and make it pass wheel events through
    const observer = new MutationObserver(() => {
      const canvas = container.querySelector("canvas");
      if (canvas) {
        canvas.style.touchAction = "pan-y";
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });
    
    // Also check immediately
    const canvas = container.querySelector("canvas");
    if (canvas) {
      canvas.style.touchAction = "pan-y";
      observer.disconnect();
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("/data/countries.geojson")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load GeoJSON: ${res.status}`);
        return res.json();
      })
      .then((data) => setAllCountries(data.features || []))
      .catch((err) => console.error("Failed to load countries.geojson", err));
  }, []);

  // Set up globe controls
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 0.6;
    globeRef.current.pointOfView({ lat: 18, lng: -32, altitude: 0.62 }, 0);

    // Zoom bounds: can zoom IN up to ~3x, cannot zoom OUT past the default.
    // Scrolling out therefore returns naturally to the default view.
    requestAnimationFrame(() => {
      if (!globeRef.current) return;
      const camera = globeRef.current.camera();
      const defaultDist = camera.position.length();
      const ctrl = globeRef.current.controls();
      ctrl.minDistance = defaultDist * 0.35;
      ctrl.maxDistance = defaultDist;
    });
  }, [globeSize]);

  // Ensure auto-rotate starts on mount (delayed to catch late initialization)
  useEffect(() => {
    const timers = [100, 500, 1000].map((delay) =>
      setTimeout(() => {
        if (!globeRef.current) return;
        const controls = globeRef.current.controls();
        controls.autoRotate = selectedCountries.length === 0;
        controls.autoRotateSpeed = 0.3;
        controls.enableZoom = true;
        controls.enablePan = false;

        const camera = globeRef.current.camera();
        if (camera) {
          const defaultDist = camera.position.length();
          controls.minDistance = defaultDist * 0.35;
          controls.maxDistance = defaultDist;
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Stop/start auto-rotate based on whether countries are selected
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = selectedCountries.length === 0;
  }, [selectedCountries]);

  // Rotate to country when a new one is added (no zoom)
  const prevCountriesRef = useRef<CountrySlug[]>([]);
  useEffect(() => {
    if (!globeRef.current) return;
    const prev = prevCountriesRef.current;
    const added = selectedCountries.filter(c => !prev.includes(c));
    prevCountriesRef.current = [...selectedCountries];

    if (added.length === 0) return;

    const lastAdded = added[added.length - 1];
    const countryInfo = SUPPORTED_COUNTRIES[lastAdded];
    if (!countryInfo) return;

    // Rotate to the country, keep same altitude
    globeRef.current.pointOfView(
      { lat: countryInfo.lat, lng: countryInfo.lng },
      1000
    );
  }, [selectedCountries]);

  const getCountryName = (feature: Feature) =>
    feature.properties?.NAME || feature.properties?.ADMIN || feature.properties?.name || "";

  // ── Stable country label renderer ────────────────────────────────────────
  // Defined outside JSX (via useCallback) so its reference doesn't change on
  // every render — critical to avoid react-globe.gl re-creating all markers
  // on every hover event.
  const renderCountryLabel = useCallback((d: any) => {
    const isSelected = d.state === "selected";

    // Style tokens — selected (cyan, persistent) vs hovered (white, prominent).
    // Both are visually strong; color is what differentiates them.
    const pillBg = "rgba(8,14,28,0.94)";
    const pillBorder = isSelected
      ? "1.5px solid rgba(125,211,252,0.8)"
      : "1.5px solid rgba(255,255,255,0.7)";
    const pillShadow = isSelected
      ? "0 0 22px rgba(56,189,248,0.45), 0 4px 18px rgba(0,0,0,0.6)"
      : "0 0 18px rgba(255,255,255,0.18), 0 4px 18px rgba(0,0,0,0.65)";
    const nameColor = "#f8fafc";
    const nameWeight = "700";
    const dotBg = isSelected ? "#38bdf8" : "#f1f5f9";
    const dotShadow = isSelected
      ? "0 0 10px rgba(56,189,248,0.85)"
      : "0 0 8px rgba(255,255,255,0.6)";
    const dotSize = "8px";
    const lineGrad = isSelected
      ? "linear-gradient(to bottom, rgba(125,211,252,0.7), rgba(125,211,252,0.08))"
      : "linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(255,255,255,0.08))";
    const lineHeight = "12px";

    // Risk badge markup — only if filter active and we have risk info
    const riskBadge = d.riskLabel && d.riskBg && d.riskColor
      ? `<span style="
          font-size: 9px;
          padding: 2px 7px;
          border-radius: 4px;
          background: ${d.riskBg};
          color: ${d.riskColor};
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          line-height: 1;
        ">${d.riskLabel}</span>`
      : "";

    const el = document.createElement("div");
    el.style.pointerEvents = "none";
    el.style.transform = "translate(-50%, -100%)";
    // Explicit z-index: hover label always overlaps selected labels
    el.style.position = "relative";
    el.style.zIndex = isSelected ? "10" : "1000";

    el.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
        <div style="
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 11px;
          background: ${pillBg};
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: ${pillBorder};
          border-radius: 8px;
          box-shadow: ${pillShadow};
          white-space: nowrap;
        ">
          <span style="font-size: 13px; line-height: 1;">${d.flag}</span>
          <span style="
            color: ${nameColor};
            font-family: 'DM Sans', system-ui, sans-serif;
            font-size: 12px;
            font-weight: ${nameWeight};
            letter-spacing: -0.01em;
            line-height: 1;
          ">${d.countryName}</span>
          ${riskBadge}
        </div>
        <div style="
          width: 1px;
          height: ${lineHeight};
          background: ${lineGrad};
        "></div>
        <div style="
          width: ${dotSize};
          height: ${dotSize};
          border-radius: 50%;
          background: ${dotBg};
          box-shadow: ${dotShadow};
          border: 1.5px solid rgba(255,255,255,0.3);
        "></div>
      </div>
    `;
    return el;
  }, []);

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

  // ── Geographic centers of supported countries (for label placement) ──────
  // Computed once when the GeoJSON loads, used in place of capital
  // coordinates so labels appear near the visual middle of each country
  // rather than at a coastal/border-adjacent capital.
  const countryCenters = useMemo(() => {
    const centers: Record<string, LngLat> = {};
    allCountries.forEach((feat) => {
      const slug = findSlug(feat);
      if (!slug) return;
      const center = computeFeatureCenter(feat);
      if (center) centers[slug] = center;
    });
    return centers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCountries]);

  // ── Risk lookups ──────────────────────────────────────────────────────────
  const getMalariaRisk = (name: string): MalariaRisk => malariaRiskByCountry[name] || "none";
  const getYFRisk = (name: string): YellowFeverRisk => yellowFeverByCountry[name] || "none";
  const getDengueRisk = (name: string): DengueRisk => dengueRiskByCountry[name] || "none";
  const getChikungunyaRisk = (name: string): ChikungunyaRisk => chikungunyaRiskByCountry[name] || "none";

  // ── Hovered state ─────────────────────────────────────────────────────────
  const hoveredSlug = hovered ? findSlug(hovered) : undefined;

  // (hoveredRiskInfo removed — risk info for hovered country is now computed
  // inline in the countryLabels memo via getRiskInfoForCountry)

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

  // ── Risk info helper (reusable for any country, not just hovered) ────────
  const getRiskInfoForCountry = (countryLabel: string) => {
    if (activeFilter === "none") return null;
    if (activeFilter === "malaria") {
      const risk = getMalariaRisk(countryLabel);
      return { risk, label: risk === "none" ? "No malaria" : `${risk} risk` };
    }
    if (activeFilter === "dengue") {
      const risk = getDengueRisk(countryLabel);
      return { risk, label: risk === "none" ? "No dengue" : `${risk} risk` };
    }
    if (activeFilter === "chikungunya") {
      const risk = getChikungunyaRisk(countryLabel);
      return { risk, label: risk === "none" ? "No chikungunya" : `${risk} risk` };
    }
    if (activeFilter === "yellow-fever") {
      const risk = getYFRisk(countryLabel);
      const labels: Record<YellowFeverRisk, string> = {
        required: "Required",
        recommended: "Recommended",
        "generally-not": "Generally not required",
        none: "Not applicable",
      };
      return { risk, label: labels[risk] };
    }
    return null;
  };

  // ── Country label data (selected + hovered, with risk info) ──────────────
  // Positioned at the country's geographic center (bounding-box midpoint of
  // the largest polygon). Falls back to the capital city for any country
  // where the GeoJSON-based center couldn't be computed.
  type CountryLabel = {
    slug: string;
    lat: number;
    lng: number;
    countryName: string;
    flag: string;
    state: "selected" | "hovered";
    riskLabel: string | null;
    riskBg: string | null;
    riskColor: string | null;
  };

  const countryLabels = useMemo(() => {
    const labels: CountryLabel[] = [];

    // Selected countries — always visible, prominent
    selectedCountries.forEach((slug) => {
      const center = countryCenters[slug] || CAPITALS[slug];
      const meta = SUPPORTED_COUNTRIES[slug];
      if (!center || !meta) return;
      const riskInfo = getRiskInfoForCountry(meta.label);
      const badgeStyle = riskInfo ? getRiskBadgeStyle(riskInfo.risk) : null;
      labels.push({
        slug,
        lat: center.lat,
        lng: center.lng,
        countryName: meta.label,
        flag: meta.flag,
        state: "selected",
        riskLabel: riskInfo?.label ?? null,
        riskBg: badgeStyle?.background ?? null,
        riskColor: badgeStyle?.color ?? null,
      });
    });

    // Hovered country — transient, only if not already selected and supported
    if (
      hoveredSlug &&
      !selectedCountries.includes(hoveredSlug) &&
      SUPPORTED_COUNTRIES[hoveredSlug]
    ) {
      const center = countryCenters[hoveredSlug] || CAPITALS[hoveredSlug];
      const meta = SUPPORTED_COUNTRIES[hoveredSlug];
      if (center && meta) {
        const riskInfo = getRiskInfoForCountry(meta.label);
        const badgeStyle = riskInfo ? getRiskBadgeStyle(riskInfo.risk) : null;
        labels.push({
          slug: hoveredSlug,
          lat: center.lat,
          lng: center.lng,
          countryName: meta.label,
          flag: meta.flag,
          state: "hovered",
          riskLabel: riskInfo?.label ?? null,
          riskBg: badgeStyle?.background ?? null,
          riskColor: badgeStyle?.color ?? null,
        });
      }
    }

    return labels;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountries, hoveredSlug, activeFilter, countryCenters]);

  // Rings stay at country centers for selected countries (persistent pulse).
  // Same logic as labels — geographic center, capital fallback.
  const ringsData = useMemo(() => {
    return selectedCountries
      .map((slug) => {
        const center = countryCenters[slug] || CAPITALS[slug];
        if (!center) return null;
        return { lat: center.lat, lng: center.lng };
      })
      .filter(Boolean) as { lat: number; lng: number }[];
  }, [selectedCountries, countryCenters]);

  return (
    <div
      ref={containerRef}
      style={{
        width: `${globeSize}px`,
        height: `${globeSize}px`,
        position: "relative",
        flexShrink: 0,
        marginTop: "-28px",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          inset: "-25%",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.06) 25%, rgba(56,189,248,0.02) 45%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Filter bar (top of globe) ────────────────────────────────── */}
      {/* top: 36px = 8px (original) + 28px (compensating for container's
          marginTop lift). This keeps the filter bar at its original visual
          position on the page while the globe sphere sits 28px higher,
          shrinking the visible gap between the filter and the globe. */}
      <div
        style={{
          position: "absolute",
          top: "36px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 30,
        }}
      >
        <DiseaseFilterBar
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* ── Tooltip ──────────────────────────────────────────────────── */}
      {/* Floating tooltip removed — labels at each country handle this now */}

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

            if (activeFilter !== "none") {
              // Risk color wins on the fill (including for selected countries).
              // Selection is conveyed through altitude lift + cyan sidewalls +
              // bright stroke, NOT by masking the risk color.
              return getFilterColor(name);
            }

            if (isSelected) return "rgba(56,189,248,0.9)";

            if (feat === hovered && supported) return "rgba(255,255,255,0.95)";
            if (feat === hovered) return "rgba(255,255,255,0.25)";
            if (supported) return "rgba(56,189,248,0.2)";
            return "rgba(0,0,0,0)";
          }}
          polygonSideColor={(d: object) => {
            const feat = d as Feature;
            const slug = findSlug(feat);
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            if (isSelected) return "rgba(56,189,248,0.25)";
            return "rgba(255,255,255,0.02)";
          }}
          polygonStrokeColor={(d: object) => {
            const feat = d as Feature;
            const name = getCountryName(feat);
            const slug = findSlug(feat);
            const isSelected = slug ? selectedCountries.includes(slug) : false;
            const supported = isSupportedFeat(feat);

            // Selected countries: bright white stroke. Crucial for adjacent
            // selections — without this, two neighbouring selected countries
            // both filled cyan would visually merge into one cyan blob.
            // The white border keeps them readable as distinct entities.
            if (isSelected) return "rgba(255,255,255,0.85)";

            if (activeFilter !== "none") {
              if (feat === hovered) return "rgba(255,255,255,0.8)";
              const risk = getFilterRiskLevel(name);
              if (risk !== "none") return "rgba(255,255,255,0.35)";
              return "rgba(255,255,255,0.15)";
            }

            if (supported) return "rgba(255,255,255,0.3)";
            return "rgba(255,255,255,0.15)";
          }}
          polygonsTransitionDuration={400}

          // ── Custom HTML capital markers ─────────────────────────────
          htmlElementsData={countryLabels}
          htmlLat="lat"
          htmlLng="lng"
          htmlAltitude={0.025}
          htmlTransitionDuration={800}
          htmlElement={renderCountryLabel}

          // ── Pulsing rings at country centers ──────────────────────
          ringsData={ringsData}
          ringLat="lat"
          ringLng="lng"
          ringColor={() => (t: number) => `rgba(56,189,248,${0.4 * (1 - t)})`}
          ringMaxRadius={3}
          ringPropagationSpeed={1.2}
          ringRepeatPeriod={2000}
          ringAltitude={0.008}

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
