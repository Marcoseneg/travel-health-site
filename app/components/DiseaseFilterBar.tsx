"use client";

import { MALARIA_LEGEND } from "../lib/malariaData";
import { YELLOW_FEVER_LEGEND } from "../lib/yellowFeverData";
import { DENGUE_LEGEND } from "../lib/dengueData";
import { CHIKUNGUNYA_LEGEND } from "../lib/chikungunyaData";

export type FilterMode = "none" | "malaria" | "yellow-fever" | "dengue" | "chikungunya";

const FILTER_BUTTONS: {
  mode: FilterMode;
  label: string;
  dotActive: string;
  bgActive: string;
  colorActive: string;
}[] = [
  { mode: "none", label: "Standard", dotActive: "", bgActive: "rgba(56,189,248,0.18)", colorActive: "#7dd3fc" },
  { mode: "malaria", label: "Malaria", dotActive: "#ef4444", bgActive: "rgba(239,68,68,0.15)", colorActive: "#fca5a5" },
  { mode: "dengue", label: "Dengue", dotActive: "#f97316", bgActive: "rgba(249,115,22,0.15)", colorActive: "#fdba74" },
  { mode: "yellow-fever", label: "Yellow Fever", dotActive: "#f59e0b", bgActive: "rgba(245,158,11,0.15)", colorActive: "#fcd34d" },
  { mode: "chikungunya", label: "Chikungunya", dotActive: "#a855f7", bgActive: "rgba(168,85,247,0.15)", colorActive: "#c4b5fd" },
];

function getLegend(mode: FilterMode) {
  switch (mode) {
    case "malaria": return MALARIA_LEGEND;
    case "yellow-fever": return YELLOW_FEVER_LEGEND;
    case "dengue": return DENGUE_LEGEND;
    case "chikungunya": return CHIKUNGUNYA_LEGEND;
    default: return [];
  }
}

type Props = {
  activeFilter: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
};

export default function DiseaseFilterBar({ activeFilter, onFilterChange }: Props) {
  const legend = getLegend(activeFilter);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        position: "relative",
        zIndex: 40,
      }}
    >
      {/* Filter pill bar */}
      <div
        style={{
          display: "inline-flex",
          gap: "3px",
          padding: "4px",
          borderRadius: "16px",
          background: "rgba(8,12,24,0.7)",
          backdropFilter: "blur(16px) saturate(1.4)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        }}
      >
        {FILTER_BUTTONS.map((btn) => {
          const isActive = activeFilter === btn.mode;
          return (
            <button
              key={btn.mode}
              onClick={() => onFilterChange(btn.mode)}
              style={{
                padding: "7px 14px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background: isActive ? btn.bgActive : "transparent",
                color: isActive ? btn.colorActive : "#94a3b8",
                fontFamily: "inherit",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
              }}
            >
              {btn.dotActive && (
                <span
                  style={{
                    width: "16px",
                    height: "6px",
                    borderRadius: "50%",
                    background: isActive ? btn.dotActive : "#475569",
                    display: "inline-block",
                    transition: "background 0.2s",
                  }}
                />
              )}
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Inline legend row */}
      {legend.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {legend.map((item) => (
            <div
              key={item.level}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "#cbd5e1",
                fontWeight: 500,
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: item.color,
                  display: "inline-block",
                  border: "1px solid rgba(255,255,255,0.1)",
                  flexShrink: 0,
                }}
              />
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
