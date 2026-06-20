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
  { mode: "none", label: "Standard", dotActive: "", bgActive: "var(--c-accent-soft)", colorActive: "var(--c-accent-strong)" },
  { mode: "malaria", label: "Malaria", dotActive: "#ef4444", bgActive: "rgba(239,68,68,0.12)", colorActive: "#b91c1c" },
  { mode: "dengue", label: "Dengue", dotActive: "#f97316", bgActive: "rgba(249,115,22,0.12)", colorActive: "#c2410c" },
  { mode: "yellow-fever", label: "Yellow Fever", dotActive: "#f59e0b", bgActive: "rgba(245,158,11,0.12)", colorActive: "#b45309" },
  { mode: "chikungunya", label: "Chikungunya", dotActive: "#a855f7", bgActive: "rgba(168,85,247,0.12)", colorActive: "#7e22ce" },
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
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
          boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
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
                color: isActive ? btn.colorActive : "var(--c-text-2)",
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
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: btn.dotActive,
                    display: "inline-block",
                    flexShrink: 0,
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
              className="t-micro"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--c-text-2)",
                letterSpacing: "normal",
                textTransform: "none",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: item.color,
                  display: "inline-block",
                  border: "1px solid var(--c-border)",
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
