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

  const danger = { color: "var(--c-danger)", background: "var(--c-danger-soft)", border: "var(--c-danger-border)" };
  const warning = { color: "var(--c-warning)", background: "var(--c-warning-soft)", border: "var(--c-warning-border)" };
  const info = { color: "var(--c-info)", background: "var(--c-info-soft)", border: "var(--c-info-border)" };

  if (malaria === "high") {
    chips.push({ short: "M", full: "Malaria — high", ...danger });
  } else if (malaria === "moderate") {
    chips.push({ short: "M", full: "Malaria — present", ...warning });
  } else if (malaria === "low") {
    chips.push({ short: "M", full: "Malaria — limited areas", ...info });
  }

  if (dengue === "high") {
    chips.push({ short: "D", full: "Dengue — high", ...danger });
  } else if (dengue === "moderate") {
    chips.push({ short: "D", full: "Dengue — moderate", ...warning });
  }

  if (yf === "required") {
    chips.push({ short: "YF", full: "Yellow fever — high", ...danger });
  } else if (yf === "recommended") {
    chips.push({ short: "YF", full: "Yellow fever — moderate", ...warning });
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
        background: "var(--c-bg)",
        color: "var(--c-text)",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── Hero / search ────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "56px 24px 0" }}>
        <div
          className="t-micro"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "var(--c-accent-soft)",
            border: "1px solid var(--c-accent-border)",
            marginBottom: "20px",
            fontWeight: 700,
            color: "var(--c-accent-strong)",
          }}
        >
          <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--c-accent)" }} />
          {DESTINATION_LIST.length} destinations
        </div>
        <h1
          className="t-display"
          style={{
            margin: "0 0 14px",
            color: "var(--c-text)",
          }}
        >
          Where are you traveling?
        </h1>
        <p
          className="t-body"
          style={{
            color: "var(--c-text-2)",
            maxWidth: "560px",
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
            borderRadius: "var(--c-radius-lg)",
            background: "var(--c-surface)",
            border: search ? "1px solid var(--c-accent)" : "1px solid var(--c-border)",
            marginBottom: "28px",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxShadow: search ? "0 4px 16px var(--c-accent-soft)" : "none",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={search ? "var(--c-accent)" : "var(--c-text-3)"} strokeWidth="2.2" strokeLinecap="round">
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
              color: "var(--c-text)",
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
              className="t-label"
              style={{
                background: "var(--c-surface-2)",
                border: "1px solid var(--c-border)",
                color: "var(--c-text-2)",
                cursor: "pointer",
                lineHeight: 1,
                padding: "6px 10px",
                borderRadius: "var(--c-radius-sm)",
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
              borderRadius: "var(--c-radius-md)",
              background: "var(--c-surface-2)",
              border: "1px solid var(--c-border)",
            }}
          >
            <ViewToggleButton active={view === "alpha"} onClick={() => setView("alpha")}>
              A — Z
            </ViewToggleButton>
            <ViewToggleButton active={view === "continent"} onClick={() => setView("continent")}>
              By continent
            </ViewToggleButton>
          </div>
          <span className="t-label" style={{ color: "var(--c-text-3)" }}>
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
                      className="t-label"
                      style={{
                        fontWeight: 700,
                        color: "var(--c-text-3)",
                        letterSpacing: "0.1em",
                        margin: "0 0 12px",
                        paddingBottom: "10px",
                        borderBottom: "1px solid var(--c-border)",
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
                  borderRadius: "var(--c-radius-md)",
                  background: "var(--c-surface)",
                  border: "1px solid var(--c-border)",
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
                        color: isActive ? "var(--c-accent-strong)" : hasResults ? "var(--c-text-2)" : "var(--c-text-3)",
                        opacity: hasResults ? 1 : 0.45,
                        background: isActive ? "var(--c-accent-soft)" : "transparent",
                        borderRadius: "var(--c-radius-sm)",
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
                      borderRadius: "var(--c-radius-md)",
                      background: "var(--c-surface)",
                      border: "1px solid var(--c-border)",
                      color: "var(--c-text)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      transition: "background 0.15s, border-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--c-surface-2)";
                      e.currentTarget.style.borderColor = "var(--c-border-strong)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--c-surface)";
                      e.currentTarget.style.borderColor = "var(--c-border)";
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--c-text-3)"
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
                    <h2 className="t-h3" style={{ margin: 0, flex: 1, color: "var(--c-text)" }}>
                      {continent}
                    </h2>
                    <span
                      className="t-micro"
                      style={{
                        fontWeight: 600,
                        color: "var(--c-text-3)",
                        background: "var(--c-surface-2)",
                        padding: "3px 10px",
                        borderRadius: "999px",
                        border: "1px solid var(--c-border)",
                        letterSpacing: "normal",
                        textTransform: "none",
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
      className="t-label"
      style={{
        padding: "8px 16px",
        fontWeight: 600,
        borderRadius: "var(--c-radius-sm)",
        background: active ? "var(--c-accent-soft)" : "transparent",
        color: active ? "var(--c-accent-strong)" : "var(--c-text-2)",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
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
        borderRadius: "var(--c-radius-md)",
        textDecoration: "none",
        color: "var(--c-text)",
        background: "var(--c-surface)",
        border: "1px solid var(--c-border)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.18s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--c-surface-2)";
        e.currentTarget.style.borderColor = "var(--c-accent-border)";
        e.currentTarget.style.transform = "translateY(-1px)";
        // Reveal the cyan accent stripe (rendered via ::before below)
        const stripe = e.currentTarget.querySelector(".accent-stripe") as HTMLElement;
        if (stripe) stripe.style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "var(--c-surface)";
        e.currentTarget.style.borderColor = "var(--c-border)";
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
          background: "linear-gradient(to bottom, var(--c-accent), var(--c-accent-soft))",
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
                background: "var(--c-accent)",
                flexShrink: 0,
              }}
            />
          )}
        </div>
        <div style={{ fontSize: "12px", color: "var(--c-text-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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
        stroke="var(--c-text-3)"
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
        borderRadius: "var(--c-radius-lg)",
        border: "1px dashed var(--c-border-strong)",
        background: "var(--c-surface)",
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.6 }}>🔍</div>
      <p className="t-h3" style={{ color: "var(--c-text)", margin: "0 0 8px", fontWeight: 600 }}>
        No countries match &ldquo;{search}&rdquo;
      </p>
      <p className="t-label" style={{ color: "var(--c-text-3)", margin: "0 0 18px" }}>
        Try a different spelling, or browse the full list.
      </p>
      <button
        onClick={onClear}
        className="t-label"
        style={{
          padding: "10px 20px",
          fontWeight: 600,
          borderRadius: "var(--c-radius-sm)",
          background: "var(--c-accent-soft)",
          border: "1px solid var(--c-accent-border)",
          color: "var(--c-accent-strong)",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        Clear search
      </button>
    </div>
  );
}
