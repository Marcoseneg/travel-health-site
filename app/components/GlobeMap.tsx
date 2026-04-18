"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  malariaRiskByCountry,
  MALARIA_COLORS,
  MALARIA_LEGEND,
  type MalariaRisk,
} from "../lib/malariaData";

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
  const [size, setSize] = useState(700);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const available = Math.min(width * 0.55, height - 220);
      setSize(Math.max(400, Math.min(780, available)));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export default function GlobeMap() {
  const globeRef = useRef<any>(null);
  const [allCountries, setAllCountries] = useState<Feature[]>([]);
  const [hoveredName, setHoveredName] = useState("");
  const [hoveredRisk, setHoveredRisk] = useState<MalariaRisk | null>(null);
  const [filterActive, setFilterActive] = useState(true);
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

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;
    controls.enableZoom = true;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.minDistance = 180;
    controls.maxDistance = 600;
    globeRef.current.pointOfView({ lat: 10, lng: 20, altitude: 1.8 }, 0);
  }, [globeSize]);

  const getCountryName = (feature: Feature) =>
    feature.properties?.NAME ||
    feature.properties?.ADMIN ||
    feature.properties?.name ||
    "";

  const getRisk = (name: string): MalariaRisk => {
    return malariaRiskByCountry[name] || "none";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      {/* Globe */}
      <div
        style={{
          width: `${globeSize}px`,
          height: `${globeSize}px`,
          position: "relative",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-15%",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.05) 35%, transparent 65%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Tooltip */}
        {hoveredName && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "8%",
              transform: "translateX(-50%)",
              zIndex: 20,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                borderRadius: "14px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(8,12,24,0.9)",
                padding: "10px 18px",
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
              {filterActive && hoveredRisk && (
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    padding: "3px 10px",
                    borderRadius: "6px",
                    background:
                      hoveredRisk === "high"
                        ? "rgba(239,68,68,0.2)"
                        : hoveredRisk === "moderate"
                        ? "rgba(245,158,11,0.2)"
                        : hoveredRisk === "low"
                        ? "rgba(250,204,21,0.2)"
                        : "rgba(100,116,139,0.15)",
                    color:
                      hoveredRisk === "high"
                        ? "#fca5a5"
                        : hoveredRisk === "moderate"
                        ? "#fcd34d"
                        : hoveredRisk === "low"
                        ? "#fef08a"
                        : "#94a3b8",
                  }}
                >
                  {hoveredRisk === "none" ? "No malaria" : `${hoveredRisk} risk`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Globe */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <Globe
            ref={globeRef}
            width={globeSize}
            height={globeSize}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)"
            atmosphereColor="rgba(80,200,255,1)"
            atmosphereAltitude={0.2}
            polygonsData={filterActive ? allCountries : []}
            polygonAltitude={(d: object) => {
              const feat = d as Feature;
              const name = getCountryName(feat);
              const risk = getRisk(name);
              if (risk === "none") return 0.002;
              if (risk === "high") return 0.012;
              if (risk === "moderate") return 0.008;
              return 0.005;
            }}
            polygonCapColor={(d: object) => {
              const feat = d as Feature;
              const name = getCountryName(feat);
              const risk = getRisk(name);
              return MALARIA_COLORS[risk];
            }}
            polygonSideColor={() => "rgba(255,255,255,0.03)"}
            polygonStrokeColor={(d: object) => {
              const feat = d as Feature;
              const name = getCountryName(feat);
              const risk = getRisk(name);
              if (risk === "none") return "rgba(255,255,255,0.03)";
              return "rgba(255,255,255,0.1)";
            }}
            polygonsTransitionDuration={400}
            onPolygonHover={(polygon: object | null) => {
              const feat = polygon as Feature | null;
              if (!feat) {
                setHoveredName("");
                setHoveredRisk(null);
                return;
              }
              const name = getCountryName(feat);
              setHoveredName(name);
              setHoveredRisk(getRisk(name));
            }}
          />
        </div>
      </div>

      {/* Filter toggle + legend */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
        {/* Toggle pills */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setFilterActive(false)}
            style={{
              padding: "9px 20px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${!filterActive ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.1)"}`,
              background: !filterActive ? "rgba(56,189,248,0.12)" : "rgba(255,255,255,0.04)",
              color: !filterActive ? "#7dd3fc" : "#94a3b8",
              fontFamily: "inherit",
              transition: "all 0.2s",
            }}
          >
            Default
          </button>
          <button
            onClick={() => setFilterActive(true)}
            style={{
              padding: "9px 20px",
              borderRadius: "999px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              border: `1px solid ${filterActive ? "rgba(239,68,68,0.4)" : "rgba(255,255,255,0.1)"}`,
              background: filterActive ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.04)",
              color: filterActive ? "#fca5a5" : "#94a3b8",
              fontFamily: "inherit",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: filterActive ? "#ef4444" : "#64748b",
                display: "inline-block",
              }}
            />
            Malaria Risk
          </button>
        </div>

        {/* Legend */}
        {filterActive && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {MALARIA_LEGEND.map((item) => (
              <div
                key={item.level}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "13px",
                  color: "#94a3b8",
                }}
              >
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "3px",
                    background: item.color,
                    display: "inline-block",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
