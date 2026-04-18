"use client";

import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";

type Props = {
  slug: CountrySlug;
  onRemove: (slug: CountrySlug) => void;
};

export default function CountryChip({ slug, onRemove }: Props) {
  const info = SUPPORTED_COUNTRIES[slug];
  if (!info) return null;

  return (
    <div
      className="animate-chip-in"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "7px",
        borderRadius: "999px",
        padding: "8px 14px",
        background: "rgba(56,189,248,0.1)",
        border: "1px solid rgba(56,189,248,0.22)",
      }}
    >
      <span style={{ fontSize: "15px" }}>{info.flag}</span>
      <span
        style={{
          color: "#e2e8f0",
          fontSize: "13px",
          fontWeight: 600,
        }}
      >
        {info.label}
      </span>
      <button
        onClick={() => onRemove(slug)}
        aria-label={`Remove ${info.label}`}
        style={{
          background: "rgba(255,255,255,0.08)",
          border: "none",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
          fontSize: "13px",
          cursor: "pointer",
          lineHeight: 1,
          marginLeft: "2px",
          transition: "background 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(248,113,113,0.2)";
          e.currentTarget.style.color = "#f87171";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "#94a3b8";
        }}
      >
        ×
      </button>
    </div>
  );
}
