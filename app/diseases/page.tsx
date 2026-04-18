"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";

// ── Derived categories from disease data ────────────────────────────────────
type TransmissionCategory = "mosquito" | "food-water" | "animal" | "all";
type RiskFilter = "all" | "high" | "moderate" | "low";

function getTransmissionCategory(category: string): TransmissionCategory {
  const c = category.toLowerCase();
  if (c.includes("mosquito")) return "mosquito";
  if (c.includes("food") || c.includes("water")) return "food-water";
  if (c.includes("animal")) return "animal";
  return "mosquito"; // vaccine-preventable diseases default by their transmission
}

// Map diseases to their transmission type for filtering
const DISEASE_TRANSMISSION: Record<string, TransmissionCategory> = {};
DISEASE_LIST.forEach((slug) => {
  const d = diseases[slug];
  // Override some that have ambiguous categories
  if (slug === "yellow-fever" || slug === "japanese-encephalitis" || slug === "dengue" || slug === "chikungunya" || slug === "malaria") {
    DISEASE_TRANSMISSION[slug] = "mosquito";
  } else if (slug === "typhoid" || slug === "cholera" || slug === "hepatitis-a") {
    DISEASE_TRANSMISSION[slug] = "food-water";
  } else if (slug === "rabies") {
    DISEASE_TRANSMISSION[slug] = "animal";
  } else {
    DISEASE_TRANSMISSION[slug] = getTransmissionCategory(d.category);
  }
});

const TRANSMISSION_FILTERS: { value: TransmissionCategory; label: string; icon: string }[] = [
  { value: "all", label: "All diseases", icon: "" },
  { value: "mosquito", label: "Mosquito-borne", icon: "🦟" },
  { value: "food-water", label: "Food & water", icon: "🚰" },
  { value: "animal", label: "Animal exposure", icon: "🐕" },
];

const RISK_BADGE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  high: { bg: "rgba(248,113,113,0.1)", color: "#f87171", border: "rgba(248,113,113,0.2)" },
  moderate: { bg: "rgba(251,191,36,0.1)", color: "#fbbf24", border: "rgba(251,191,36,0.2)" },
  low: { bg: "rgba(52,211,153,0.1)", color: "#34d399", border: "rgba(52,211,153,0.2)" },
};

const SHORT_DESCRIPTIONS: Record<string, string> = {
  malaria: "Chemoprophylaxis recommended for endemic zones. No routine vaccine — prevention relies on medication and mosquito avoidance.",
  dengue: "Daytime-biting mosquitoes. Vaccine exists but limited to previously infected individuals. Prevention is primarily behavioral.",
  chikungunya: "Severe joint pain that can persist for months. Ixchiq vaccine recently approved for adults ≥18.",
  "yellow-fever": "Single-dose vaccine provides lifelong protection. Required for entry to many African and South American countries.",
  typhoid: "Injectable or oral vaccine available. High-risk in areas with poor sanitation — safe food and water practices essential.",
  "hepatitis-a": "Highly effective 2-dose vaccine series. Transmitted through contaminated food and water in developing regions.",
  rabies: "Pre-exposure vaccine recommended for high-risk travelers. Post-exposure prophylaxis is critical — and may be unavailable in remote areas.",
  cholera: "Oral vaccine available for high-risk travelers. Linked to humanitarian crises and areas with poor water infrastructure.",
  "japanese-encephalitis": "Vaccine recommended for extended stays in rural Asia. Most infections are asymptomatic, but encephalitis cases carry 20–30% fatality.",
};

// ── Prevention summary helper ───────────────────────────────────────────────
function getPreventionSummary(slug: string, d: typeof diseases[string]): string[] {
  const tags: string[] = [];
  if (d.vaccineAvailable) tags.push("💉 Vaccine");
  if (slug === "malaria") tags.push("💊 Prophylaxis");
  if (d.category.toLowerCase().includes("mosquito") || slug === "malaria" || slug === "yellow-fever") {
    tags.push("🦟 Mosquito avoidance");
  }
  if (d.category.toLowerCase().includes("food") || slug === "typhoid" || slug === "cholera" || slug === "hepatitis-a") {
    tags.push("🍽️ Food & water hygiene");
  }
  if (slug === "rabies") tags.push("🐾 Animal avoidance");
  return tags;
}

export default function DiseasesPage() {
  const [transmissionFilter, setTransmissionFilter] = useState<TransmissionCategory>("all");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [vaccineOnly, setVaccineOnly] = useState(false);

  const filtered = useMemo(() => {
    return DISEASE_LIST.filter((slug) => {
      const d = diseases[slug];
      if (transmissionFilter !== "all" && DISEASE_TRANSMISSION[slug] !== transmissionFilter) return false;
      if (riskFilter !== "all" && d.riskLevel !== riskFilter) return false;
      if (vaccineOnly && !d.vaccineAvailable) return false;
      return true;
    });
  }, [transmissionFilter, riskFilter, vaccineOnly]);

  const activeFilterCount = (transmissionFilter !== "all" ? 1 : 0) + (riskFilter !== "all" ? 1 : 0) + (vaccineOnly ? 1 : 0);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "48px 24px 0",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 16px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            marginBottom: "16px",
            fontSize: "12px",
            fontWeight: 600,
            color: "#64748b",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Reference
        </div>
        <h1
          style={{
            fontSize: "clamp(32px, 4vw, 52px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            margin: "0 0 12px",
          }}
        >
          Diseases & risks
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#64748b",
            maxWidth: "600px",
            lineHeight: 1.6,
            margin: "0 0 32px",
          }}
        >
          Travel-relevant infectious diseases with physician-reviewed prevention
          guidance. Filter by how they spread, how severe they are, or whether a
          vaccine exists.
        </p>

        {/* ── Filters ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
          {/* Transmission filter row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569", marginRight: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Transmission
            </span>
            {TRANSMISSION_FILTERS.map((f) => {
              const isActive = transmissionFilter === f.value;
              return (
                <button
                  key={f.value}
                  onClick={() => setTransmissionFilter(f.value)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${isActive ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.07)"}`,
                    background: isActive ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
                    color: isActive ? "#7dd3fc" : "#94a3b8",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  {f.icon && <span style={{ fontSize: "14px" }}>{f.icon}</span>}
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Risk + vaccine row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "12px", fontWeight: 600, color: "#475569", marginRight: "4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Risk level
            </span>
            {(["all", "high", "moderate", "low"] as RiskFilter[]).map((level) => {
              const isActive = riskFilter === level;
              const dotColor = level === "high" ? "#f87171" : level === "moderate" ? "#fbbf24" : level === "low" ? "#34d399" : "";
              return (
                <button
                  key={level}
                  onClick={() => setRiskFilter(level)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: 600,
                    cursor: "pointer",
                    border: `1px solid ${isActive ? "rgba(56,189,248,0.3)" : "rgba(255,255,255,0.07)"}`,
                    background: isActive ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
                    color: isActive ? "#7dd3fc" : "#94a3b8",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    textTransform: "capitalize",
                  }}
                >
                  {dotColor && (
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: dotColor }} />
                  )}
                  {level === "all" ? "All" : level}
                </button>
              );
            })}

            {/* Divider */}
            <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.08)", margin: "0 8px" }} />

            {/* Vaccine toggle */}
            <button
              onClick={() => setVaccineOnly(!vaccineOnly)}
              style={{
                padding: "7px 16px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                border: `1px solid ${vaccineOnly ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.07)"}`,
                background: vaccineOnly ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)",
                color: vaccineOnly ? "#34d399" : "#94a3b8",
                fontFamily: "inherit",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              💉 Vaccine available
            </button>

            {/* Clear all */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => { setTransmissionFilter("all"); setRiskFilter("all"); setVaccineOnly(false); }}
                style={{
                  padding: "7px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: "none",
                  background: "transparent",
                  color: "#64748b",
                  fontFamily: "inherit",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                Clear filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Disease cards ────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 0",
              color: "#475569",
              fontSize: "15px",
            }}
          >
            No diseases match your current filters.{" "}
            <button
              onClick={() => { setTransmissionFilter("all"); setRiskFilter("all"); setVaccineOnly(false); }}
              style={{
                background: "none",
                border: "none",
                color: "#38bdf8",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <p style={{ fontSize: "13px", color: "#475569", marginBottom: "20px" }}>
              Showing {filtered.length} of {DISEASE_LIST.length} diseases
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))",
                gap: "16px",
              }}
            >
              {filtered.map((slug) => {
                const d = diseases[slug];
                const riskStyle = RISK_BADGE_STYLES[d.riskLevel];
                const prevention = getPreventionSummary(slug, d);
                const desc = SHORT_DESCRIPTIONS[slug] || d.transmission;

                // Left accent color by transmission type
                const accentColor =
                  DISEASE_TRANSMISSION[slug] === "mosquito" ? "rgba(251,146,60,0.6)" :
                  DISEASE_TRANSMISSION[slug] === "food-water" ? "rgba(56,189,248,0.6)" :
                  DISEASE_TRANSMISSION[slug] === "animal" ? "rgba(168,85,247,0.6)" :
                  "rgba(100,116,139,0.3)";

                return (
                  <Link
                    key={slug}
                    href={`/diseases/${slug}`}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "24px 24px 24px 28px",
                      borderRadius: "16px",
                      textDecoration: "none",
                      background: "#0a101f",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderLeft: `3px solid ${accentColor}`,
                      color: "#f1f5f9",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.borderLeftColor = accentColor;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#0a101f";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                      e.currentTarget.style.borderLeftColor = accentColor;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {/* Header row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        marginBottom: "12px",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                          {d.label}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", marginTop: "3px" }}>
                          {d.category}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          padding: "4px 10px",
                          borderRadius: "8px",
                          background: riskStyle.bg,
                          color: riskStyle.color,
                          border: `1px solid ${riskStyle.border}`,
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                          marginLeft: "12px",
                        }}
                      >
                        {d.riskLevel}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "#94a3b8",
                        lineHeight: 1.6,
                        margin: "0 0 16px",
                        flex: 1,
                      }}
                    >
                      {desc}
                    </p>

                    {/* Prevention tags */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        paddingTop: "14px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      {prevention.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: "11px",
                            fontWeight: 600,
                            color: "#64748b",
                            background: "rgba(255,255,255,0.03)",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            border: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
