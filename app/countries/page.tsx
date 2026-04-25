"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  SUPPORTED_COUNTRIES,
  DESTINATION_LIST,
  type CountrySlug,
} from "../lib/travelData";
import { malariaRiskByCountry } from "../lib/malariaData";
import { dengueRiskByCountry } from "../lib/dengueData";
import { yellowFeverByCountry } from "../lib/yellowFeverData";
import { countries as healthData } from "../../data/countries";

// ── Group countries by continent ────────────────────────────────────────────
function getCountriesByContinent() {
  const groups: Record<string, CountrySlug[]> = {};
  DESTINATION_LIST.forEach((slug) => {
    const c = SUPPORTED_COUNTRIES[slug];
    const continent = c.continent || "Other";
    if (!groups[continent]) groups[continent] = [];
    groups[continent].push(slug);
  });
  // Sort each group alphabetically
  Object.values(groups).forEach((arr) =>
    arr.sort((a, b) =>
      SUPPORTED_COUNTRIES[a].label.localeCompare(SUPPORTED_COUNTRIES[b].label)
    )
  );
  return groups;
}

// ── Risk dot helper ─────────────────────────────────────────────────────────
type RiskDot = { color: string; label: string };

function getCountryRisks(label: string): RiskDot[] {
  const dots: RiskDot[] = [];
  const malaria = malariaRiskByCountry[label];
  const dengue = dengueRiskByCountry[label];
  const yf = yellowFeverByCountry[label];

  // Malaria — values used in malariaData.ts: "high" | "present" | "limited" | "none"
  if (malaria === "high") dots.push({ color: "#ef4444", label: "Malaria (high)" });
  else if (malaria === "present") dots.push({ color: "#f59e0b", label: "Malaria (present)" });
  else if (malaria === "limited") dots.push({ color: "#fcd34d", label: "Malaria (limited)" });

  // Dengue — values used in dengueData.ts: "high" | "moderate" | "low" | "none"
  if (dengue === "high") dots.push({ color: "#f97316", label: "Dengue (high)" });
  else if (dengue === "moderate") dots.push({ color: "#fb923c", label: "Dengue (moderate)" });

  // Yellow fever — values: "required" | "recommended" | "generally-not" | "none"
  if (yf === "required") dots.push({ color: "#eab308", label: "Yellow fever (required)" });
  else if (yf === "recommended") dots.push({ color: "#facc15", label: "Yellow fever (recommended)" });

  return dots;
}

// ── Detect whether a country has the full CDC-aligned brief ─────────────────
// Used to show a small status indicator on each country row so you can see
// at a glance which countries have been built out vs which still show the
// "Detailed brief coming soon" fallback.
function hasFullBrief(slug: string): boolean {
  const h = healthData[slug];
  if (!h) return false;
  // A country counts as "full" if it has either rich vaccines OR per-disease
  // detail OR country alerts — i.e. anything beyond the bare core fields.
  return !!(
    h.vaccinesDetail?.length ||
    h.diseases ||
    h.countryAlerts?.length
  );
}

// ── Continent icons ─────────────────────────────────────────────────────────
const CONTINENT_ORDER = [
  "Africa",
  "Asia",
  "South America",
  "Central America & Caribbean",
  "North America",
  "Oceania",
];

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const grouped = useMemo(() => getCountriesByContinent(), []);

  const filteredGrouped = useMemo(() => {
    if (!search.trim()) return grouped;
    const q = search.toLowerCase();
    const result: Record<string, CountrySlug[]> = {};
    Object.entries(grouped).forEach(([continent, slugs]) => {
      const matches = slugs.filter((slug) => {
        const c = SUPPORTED_COUNTRIES[slug];
        return (
          c.label.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q) ||
          continent.toLowerCase().includes(q)
        );
      });
      if (matches.length > 0) result[continent] = matches;
    });
    return result;
  }, [search, grouped]);

  const totalShown = Object.values(filteredGrouped).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

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
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "48px 24px 0" }}>
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
          Destinations
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
          Countries
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#64748b",
            maxWidth: "560px",
            lineHeight: 1.6,
            margin: "0 0 32px",
          }}
        >
          Select a destination to view tailored health recommendations —
          vaccines, malaria prophylaxis, and prevention advice.
        </p>

        {/* Search + continent jump */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "40px",
          }}
        >
          {/* Search */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 18px",
              height: "44px",
              borderRadius: "14px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              minWidth: "280px",
              flex: "0 1 360px",
            }}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="#64748b" strokeWidth="2.2" strokeLinecap="round"
            >
              <circle cx="10.5" cy="10.5" r="7.5" /><path d="m21 21-5-5" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter countries…"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#e2e8f0",
                width: "100%",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{
                  background: "none", border: "none", color: "#64748b",
                  cursor: "pointer", fontSize: "16px", lineHeight: 1, padding: "2px",
                }}
              >
                ×
              </button>
            )}
          </div>

          {/* Continent jump links */}
          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
            {CONTINENT_ORDER.filter((c) => grouped[c]).map((continent) => (
              <a
                key={continent}
                href={`#continent-${continent.replace(/\s+/g, "-").toLowerCase()}`}
                style={{
                  padding: "6px 14px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#94a3b8",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.15s",
                }}
              >
                {continent}
              </a>
            ))}
          </div>

          {/* Count */}
          <span style={{ fontSize: "13px", color: "#475569", marginLeft: "auto" }}>
            {totalShown} destinations
          </span>
        </div>
      </section>

      {/* ── Country grid by continent ────────────────────────────────── */}
      <section style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 24px 80px" }}>
        {Object.keys(filteredGrouped).length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 0", color: "#475569" }}>
            No countries match "{search}".{" "}
            <button
              onClick={() => setSearch("")}
              style={{
                background: "none", border: "none", color: "#38bdf8",
                cursor: "pointer", fontFamily: "inherit", fontSize: "inherit",
                textDecoration: "underline", textUnderlineOffset: "2px",
              }}
            >
              Clear search
            </button>
          </div>
        ) : (
          CONTINENT_ORDER.filter((c) => filteredGrouped[c]).map((continent) => {
            const slugs = filteredGrouped[continent];
            if (!slugs) return null;
            return (
              <div
                key={continent}
                id={`continent-${continent.replace(/\s+/g, "-").toLowerCase()}`}
                style={{ marginBottom: "48px", scrollMarginTop: "80px" }}
              >
                {/* Continent header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                    paddingBottom: "12px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <h2
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      margin: 0,
                    }}
                  >
                    {continent}
                  </h2>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#475569",
                      background: "rgba(255,255,255,0.04)",
                      padding: "3px 10px",
                      borderRadius: "999px",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {slugs.length}
                  </span>
                </div>

                {/* Country rows */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "8px",
                  }}
                >
                  {slugs.map((slug) => {
                    const c = SUPPORTED_COUNTRIES[slug];
                    const risks = getCountryRisks(c.label);
                    const fullBrief = hasFullBrief(slug);

                    return (
                      <Link
                        key={slug}
                        href={`/country/${slug}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "14px 18px",
                          borderRadius: "12px",
                          textDecoration: "none",
                          color: "#f1f5f9",
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.05)",
                          transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                          e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                        }}
                      >
                        {/* Flag */}
                        <span style={{ fontSize: "24px", width: "32px", textAlign: "center", flexShrink: 0 }}>
                          {c.flag}
                        </span>

                        {/* Name + region */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "14px",
                              fontWeight: 600,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            <span
                              style={{
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {c.label}
                            </span>
                            {/* Full-brief indicator: small cyan dot when this
                                country has rich CDC-aligned content. Tooltip
                                explains it on hover. */}
                            {fullBrief && (
                              <span
                                title="Full clinical brief available"
                                aria-label="Full clinical brief available"
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  background: "#38bdf8",
                                  boxShadow: "0 0 6px rgba(56,189,248,0.6)",
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "1px" }}>
                            {c.region}
                          </div>
                        </div>

                        {/* Risk dots */}
                        {risks.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              gap: "4px",
                              flexShrink: 0,
                            }}
                            title={risks.map((r) => r.label).join(", ")}
                          >
                            {risks.map((r, i) => (
                              <span
                                key={i}
                                style={{
                                  width: "6px",
                                  height: "6px",
                                  borderRadius: "50%",
                                  background: r.color,
                                  display: "inline-block",
                                }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Arrow */}
                        <svg
                          width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ flexShrink: 0 }}
                        >
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
}
