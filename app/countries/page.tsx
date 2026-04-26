"use client";

import { useState, useMemo, useEffect, useRef } from "react";
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

// ── Risk chip helpers ───────────────────────────────────────────────────────
type RiskChip = {
  short: string;       // 1-2 letter abbreviation shown in the chip
  full: string;        // tooltip text on hover
  color: string;
  background: string;
  border: string;
};

function getCountryRisks(label: string): RiskChip[] {
  const chips: RiskChip[] = [];
  const malaria = malariaRiskByCountry[label];
  const dengue = dengueRiskByCountry[label];
  const yf = yellowFeverByCountry[label];

  if (malaria === "high") {
    chips.push({ short: "M", full: "Malaria — high", color: "#fca5a5", background: "rgba(239,68,68,0.16)", border: "rgba(239,68,68,0.32)" });
  } else if (malaria === "present") {
    chips.push({ short: "M", full: "Malaria — present", color: "#fbbf24", background: "rgba(245,158,11,0.16)", border: "rgba(245,158,11,0.3)" });
  } else if (malaria === "limited") {
    chips.push({ short: "M", full: "Malaria — limited areas", color: "#fde68a", background: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.2)" });
  }

  if (dengue === "high") {
    chips.push({ short: "D", full: "Dengue — high", color: "#fdba74", background: "rgba(249,115,22,0.16)", border: "rgba(249,115,22,0.3)" });
  } else if (dengue === "moderate") {
    chips.push({ short: "D", full: "Dengue — moderate", color: "#fed7aa", background: "rgba(249,115,22,0.1)", border: "rgba(249,115,22,0.2)" });
  }

  if (yf === "required") {
    chips.push({ short: "YF", full: "Yellow fever — required", color: "#fcd34d", background: "rgba(234,179,8,0.16)", border: "rgba(234,179,8,0.3)" });
  } else if (yf === "recommended") {
    chips.push({ short: "YF", full: "Yellow fever — recommended", color: "#fde68a", background: "rgba(234,179,8,0.1)", border: "rgba(234,179,8,0.2)" });
  }

  return chips;
}

function hasFullBrief(slug: string): boolean {
  const h = healthData[slug];
  if (!h) return false;
  return !!(h.vaccinesDetail?.length || h.diseases || h.countryAlerts?.length);
}

// ── Continent ordering ─────────────────────────────────────────────────────
const CONTINENT_ORDER = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "Central America & Caribbean",
  "South America",
  "Oceania",
];

type ViewMode = "alpha" | "continent";

export default function CountriesPage() {
  const [search, setSearch] = useState("");
  const [view, setView] = useState<ViewMode>("alpha");
  const [expandedContinents, setExpandedContinents] = useState<Set<string>>(
    new Set()
  );
  const [activeLetter, setActiveLetter] = useState<string>("");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Sorted list of all countries (used for both views)
  const allCountriesSorted = useMemo(() => {
    return [...DESTINATION_LIST].sort((a, b) =>
      SUPPORTED_COUNTRIES[a].label.localeCompare(SUPPORTED_COUNTRIES[b].label)
    );
  }, []);

  // ── A-Z grouping ────────────────────────────────────────────────────────
  const grouped_alpha = useMemo(() => {
    const groups: Record<string, CountrySlug[]> = {};
    allCountriesSorted.forEach((slug) => {
      const c = SUPPORTED_COUNTRIES[slug];
      const letter = c.label[0].toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(slug);
    });
    return groups;
  }, [allCountriesSorted]);

  const allLetters = useMemo(() => Object.keys(grouped_alpha).sort(), [grouped_alpha]);

  // ── Continent grouping ─────────────────────────────────────────────────
  const grouped_continent = useMemo(() => {
    const groups: Record<string, CountrySlug[]> = {};
    allCountriesSorted.forEach((slug) => {
      const continent = SUPPORTED_COUNTRIES[slug].continent || "Other";
      if (!groups[continent]) groups[continent] = [];
      groups[continent].push(slug);
    });
    return groups;
  }, [allCountriesSorted]);

  // ── Search filter ──────────────────────────────────────────────────────
  const matchesSearch = (slug: CountrySlug): boolean => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    const c = SUPPORTED_COUNTRIES[slug];
    return (
      c.label.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      (c.continent || "").toLowerCase().includes(q)
    );
  };

  const filteredAlpha = useMemo(() => {
    if (!search.trim()) return grouped_alpha;
    const result: Record<string, CountrySlug[]> = {};
    Object.entries(grouped_alpha).forEach(([letter, slugs]) => {
      const matches = slugs.filter(matchesSearch);
      if (matches.length > 0) result[letter] = matches;
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, grouped_alpha]);

  const filteredContinent = useMemo(() => {
    if (!search.trim()) return grouped_continent;
    const result: Record<string, CountrySlug[]> = {};
    Object.entries(grouped_continent).forEach(([continent, slugs]) => {
      const matches = slugs.filter(matchesSearch);
      if (matches.length > 0) result[continent] = matches;
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, grouped_continent]);

  const totalShown =
    view === "alpha"
      ? Object.values(filteredAlpha).reduce((sum, a) => sum + a.length, 0)
      : Object.values(filteredContinent).reduce((sum, a) => sum + a.length, 0);

  // When user types in search, auto-expand all continents to show results
  useEffect(() => {
    if (view === "continent" && search.trim()) {
      setExpandedContinents(new Set(Object.keys(filteredContinent)));
    }
  }, [search, view, filteredContinent]);

  // Track which letter section is currently visible (alpha view sticky nav)
  useEffect(() => {
    if (view !== "alpha") return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const id = visible[0].target.id.replace("letter-", "");
          setActiveLetter(id);
        }
      },
      { rootMargin: "-100px 0px -70% 0px", threshold: 0 }
    );
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [view, filteredAlpha]);

  const toggleContinent = (continent: string) => {
    setExpandedContinents((prev) => {
      const next = new Set(prev);
      if (next.has(continent)) next.delete(continent);
      else next.add(continent);
      return next;
    });
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Hero / search ────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "56px 24px 0" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.2)",
            marginBottom: "20px",
            fontSize: "11px",
            fontWeight: 700,
            color: "#7dd3fc",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 6px rgba(56,189,248,0.6)" }} />
          {DESTINATION_LIST.length} destinations
        </div>
        <h1
          style={{
            fontSize: "clamp(36px, 4.5vw, 56px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: "0 0 14px",
          }}
        >
          Where are you traveling?
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#94a3b8",
            maxWidth: "560px",
            lineHeight: 1.6,
            margin: "0 0 36px",
          }}
        >
          Search any destination for tailored health recommendations — vaccines, malaria prophylaxis, and prevention guidance.
        </p>

        {/* ── Big search bar ──────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 22px",
            height: "60px",
            borderRadius: "16px",
            background: "rgba(255,255,255,0.04)",
            border: search ? "1px solid rgba(56,189,248,0.4)" : "1px solid rgba(255,255,255,0.08)",
            marginBottom: "28px",
            transition: "border-color 0.2s",
            boxShadow: search ? "0 8px 30px rgba(56,189,248,0.08)" : "none",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={search ? "#7dd3fc" : "#64748b"} strokeWidth="2.2" strokeLinecap="round">
            <circle cx="10.5" cy="10.5" r="7.5" />
            <path d="m21 21-5-5" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try Thailand, Brazil, Kenya…"
            autoFocus
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#f1f5f9",
              flex: 1,
              fontSize: "16px",
              fontFamily: "inherit",
              fontWeight: 500,
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#94a3b8",
                cursor: "pointer",
                fontSize: "14px",
                lineHeight: 1,
                padding: "6px 10px",
                borderRadius: "8px",
                fontFamily: "inherit",
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* ── View toggle + counts ───────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2px",
              padding: "3px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <ViewToggleButton active={view === "alpha"} onClick={() => setView("alpha")}>
              A — Z
            </ViewToggleButton>
            <ViewToggleButton active={view === "continent"} onClick={() => setView("continent")}>
              By continent
            </ViewToggleButton>
          </div>
          <span style={{ fontSize: "13px", color: "#64748b", fontWeight: 500 }}>
            {totalShown === DESTINATION_LIST.length
              ? `Showing all ${totalShown}`
              : `${totalShown} ${totalShown === 1 ? "match" : "matches"}`}
          </span>
        </div>
      </section>

      {/* ── Country list ────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "0 24px 80px",
          position: "relative",
        }}
      >
        {totalShown === 0 ? (
          <EmptyState search={search} onClear={() => setSearch("")} />
        ) : view === "alpha" ? (
          <div style={{ display: "flex", gap: "32px" }}>
            {/* Main list */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {allLetters
                .filter((letter) => filteredAlpha[letter])
                .map((letter) => (
                  <div
                    key={letter}
                    id={`letter-${letter}`}
                    ref={(el) => {
                      sectionRefs.current[letter] = el;
                    }}
                    style={{ marginBottom: "32px", scrollMarginTop: "100px" }}
                  >
                    <h2
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#475569",
                        letterSpacing: "0.1em",
                        margin: "0 0 12px",
                        paddingBottom: "10px",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {letter}
                    </h2>
                    <CountryGrid slugs={filteredAlpha[letter]} />
                  </div>
                ))}
            </div>

            {/* Sticky alphabet sidebar (desktop only) */}
            <div className="alpha-sidebar" style={{ position: "sticky", top: "100px", alignSelf: "flex-start", height: "fit-content" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  padding: "8px 4px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}
              >
                {allLetters.map((letter) => {
                  const isActive = activeLetter === letter;
                  const hasResults = !!filteredAlpha[letter];
                  return (
                    <a
                      key={letter}
                      href={hasResults ? `#letter-${letter}` : undefined}
                      onClick={(e) => {
                        if (!hasResults) {
                          e.preventDefault();
                          return;
                        }
                      }}
                      style={{
                        width: "26px",
                        height: "22px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "11px",
                        fontWeight: 700,
                        textDecoration: "none",
                        color: isActive ? "#7dd3fc" : hasResults ? "#94a3b8" : "rgba(100,116,139,0.4)",
                        background: isActive ? "rgba(56,189,248,0.12)" : "transparent",
                        borderRadius: "5px",
                        transition: "all 0.15s",
                        pointerEvents: hasResults ? "auto" : "none",
                        cursor: hasResults ? "pointer" : "default",
                      }}
                    >
                      {letter}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          // ── Continent view (collapsible) ──────────────────────────
          <div>
            {CONTINENT_ORDER.filter((c) => filteredContinent[c]).map((continent) => {
              const slugs = filteredContinent[continent];
              const isExpanded = expandedContinents.has(continent) || !!search.trim();
              return (
                <div key={continent} style={{ marginBottom: "12px" }}>
                  <button
                    onClick={() => toggleContinent(continent)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px 20px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.025)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      color: "#f1f5f9",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.025)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transition: "transform 0.2s",
                        transform: isExpanded ? "rotate(90deg)" : "none",
                      }}
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <h2 style={{ fontSize: "16px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em", flex: 1 }}>
                      {continent}
                    </h2>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#64748b",
                        background: "rgba(255,255,255,0.04)",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {slugs.length}
                    </span>
                  </button>
                  {isExpanded && (
                    <div style={{ padding: "12px 0 8px" }}>
                      <CountryGrid slugs={slugs} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Mobile: hide alphabet sidebar */}
      <style>{`
        @media (max-width: 768px) {
          .alpha-sidebar { display: none !important; }
        }
      `}</style>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ViewToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        fontSize: "13px",
        fontWeight: 600,
        borderRadius: "7px",
        background: active ? "rgba(56,189,248,0.12)" : "transparent",
        color: active ? "#7dd3fc" : "#94a3b8",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
        letterSpacing: "-0.01em",
      }}
    >
      {children}
    </button>
  );
}

function CountryGrid({ slugs }: { slugs: CountrySlug[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "8px",
      }}
    >
      {slugs.map((slug) => (
        <CountryCard key={slug} slug={slug} />
      ))}
    </div>
  );
}

function CountryCard({ slug }: { slug: CountrySlug }) {
  const c = SUPPORTED_COUNTRIES[slug];
  const risks = getCountryRisks(c.label);
  const fullBrief = hasFullBrief(slug);

  return (
    <Link
      href={`/country/${slug}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 16px 14px 18px",
        borderRadius: "12px",
        textDecoration: "none",
        color: "#f1f5f9",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.18s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        e.currentTarget.style.borderColor = "rgba(125,211,252,0.25)";
        e.currentTarget.style.transform = "translateY(-1px)";
        // Reveal the cyan accent stripe (rendered via ::before below)
        const stripe = e.currentTarget.querySelector(".accent-stripe") as HTMLElement;
        if (stripe) stripe.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.02)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
        e.currentTarget.style.transform = "none";
        const stripe = e.currentTarget.querySelector(".accent-stripe") as HTMLElement;
        if (stripe) stripe.style.opacity = "0";
      }}
    >
      {/* Cyan accent stripe on hover (left edge) */}
      <span
        className="accent-stripe"
        style={{
          position: "absolute",
          left: 0,
          top: "12%",
          bottom: "12%",
          width: "3px",
          borderRadius: "0 3px 3px 0",
          background: "linear-gradient(to bottom, #38bdf8, rgba(56,189,248,0.3))",
          opacity: 0,
          transition: "opacity 0.18s",
        }}
      />

      {/* Flag */}
      <span style={{ fontSize: "26px", width: "32px", textAlign: "center", flexShrink: 0, lineHeight: 1 }}>
        {c.flag}
      </span>

      {/* Name + region */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14.5px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            marginBottom: "2px",
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
          {fullBrief && (
            <span
              title="Full clinical brief available"
              aria-label="Full clinical brief available"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 6px rgba(56,189,248,0.7)",
                flexShrink: 0,
              }}
            />
          )}
        </div>
        <div style={{ fontSize: "12px", color: "#64748b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.region}
        </div>
      </div>

      {/* Risk chips */}
      {risks.length > 0 && (
        <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
          {risks.map((r, i) => (
            <span
              key={i}
              title={r.full}
              aria-label={r.full}
              style={{
                fontSize: "10px",
                fontWeight: 700,
                padding: "2px 6px",
                borderRadius: "5px",
                color: r.color,
                background: r.background,
                border: `1px solid ${r.border}`,
                letterSpacing: "0.04em",
                lineHeight: 1.4,
              }}
            >
              {r.short}
            </span>
          ))}
        </div>
      )}

      {/* Arrow */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#475569"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </Link>
  );
}

function EmptyState({ search, onClear }: { search: string; onClear: () => void }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
        borderRadius: "16px",
        border: "1px dashed rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.5 }}>🔍</div>
      <p style={{ fontSize: "16px", color: "#cbd5e1", margin: "0 0 8px", fontWeight: 600 }}>
        No countries match &ldquo;{search}&rdquo;
      </p>
      <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 18px" }}>
        Try a different spelling, or browse the full list.
      </p>
      <button
        onClick={onClear}
        style={{
          padding: "10px 20px",
          fontSize: "13px",
          fontWeight: 600,
          borderRadius: "8px",
          background: "rgba(56,189,248,0.1)",
          border: "1px solid rgba(56,189,248,0.25)",
          color: "#7dd3fc",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Clear search
      </button>
    </div>
  );
}
