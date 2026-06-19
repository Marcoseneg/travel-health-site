"use client";

import { SUPPORTED_COUNTRIES, type CountrySlug } from "../app/lib/travelData";

type Props = {
  slug: CountrySlug;
  onRemove: (slug: CountrySlug) => void;
};

export default function CountryChip({ slug, onRemove }: Props) {
  const info = SUPPORTED_COUNTRIES[slug];
  if (!info) return null;

  return (
    <div
      className="flex items-center gap-2 rounded-full px-4 py-2"
      style={{
        background: "rgba(56,189,248,0.12)",
        border: "1px solid rgba(56,189,248,0.25)",
      }}
    >
      <span style={{ fontSize: "16px" }}>{info.flag}</span>
      <span style={{ color: "#e2e8f0", fontSize: "13px", fontWeight: 600 }}>
        {info.label}
      </span>
      <button
        onClick={() => onRemove(slug)}
        className="ml-1 flex h-5 w-5 items-center justify-center rounded-full"
        style={{
          background: "rgba(255,255,255,0.08)",
          color: "#94a3b8",
          fontSize: "14px",
          border: "none",
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}
