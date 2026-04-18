"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DESTINATION_LIST,
  SUPPORTED_COUNTRIES,
  type CountrySlug,
} from "../lib/travelData";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";

type SearchItem = {
  type: "country" | "disease";
  slug: string;
  label: string;
  icon: string;
  sub: string;
};

function buildSearchItems(): SearchItem[] {
  const countryItems: SearchItem[] = DESTINATION_LIST.map((slug) => {
    const c = SUPPORTED_COUNTRIES[slug];
    return { type: "country", slug, label: c.label, icon: c.flag, sub: c.region };
  });
  const diseaseItems: SearchItem[] = DISEASE_LIST.map((slug) => {
    const d = diseases[slug];
    return { type: "disease", slug, label: d.label, icon: d.icon, sub: d.category };
  });
  return [...countryItems, ...diseaseItems];
}

const SEARCH_ITEMS = buildSearchItems();

const NAV_LINKS = [
  { label: "Countries", href: "/countries" },
  { label: "Diseases", href: "/diseases" },
  { label: "Outbreaks", href: "/outbreaks" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

export default function SiteHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  // Reset active index when results change
  useEffect(() => setActiveIdx(-1), [results]);

  // Keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSelect = (item: SearchItem) => {
    if (item.type === "country") {
      router.push(`/itinerary?countries=${item.slug}`);
    } else {
      router.push(`/diseases/${item.slug}`);
    }
    setQuery("");
    setFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      handleSelect(results[activeIdx]);
    } else if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        borderBottom: "1px solid var(--border)",
        background: "rgba(3, 7, 18, 0.85)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          height: "60px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0 24px",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, var(--accent), var(--accent-dark))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              boxShadow: "0 4px 16px rgba(56,189,248,0.3)",
            }}
          >
            ✈
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "17px",
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
            }}
          >
            Travel<span style={{ color: "var(--accent)" }}>Med</span>
          </span>
        </a>

        {/* Search */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "480px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                borderRadius: "14px",
                padding: "0 16px",
                height: "40px",
                background: focused
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.04)",
                border: `1px solid ${
                  focused ? "rgba(56,189,248,0.4)" : "rgba(255,255,255,0.07)"
                }`,
                transition: "all 0.25s ease",
              }}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke={
                  focused
                    ? "rgba(125,211,252,0.95)"
                    : "rgba(148,163,184,0.7)"
                }
                strokeWidth="2.2"
                strokeLinecap="round"
                style={{ flexShrink: 0 }}
                aria-hidden="true"
              >
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="m21 21-5-5" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 180)}
                onKeyDown={handleKeyDown}
                placeholder="Search countries, diseases, vaccines…"
                aria-label="Search countries and diseases"
                role="combobox"
                aria-expanded={focused && !!query.trim()}
                aria-autocomplete="list"
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#e2e8f0",
                  width: "100%",
                  fontSize: "14px",
                  fontFamily: "inherit",
                  letterSpacing: "-0.01em",
                }}
              />
              {!focused && !query && (
                <kbd
                  style={{
                    fontSize: "11px",
                    color: "var(--text-dim)",
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "5px",
                    padding: "2px 7px",
                    fontFamily: "inherit",
                    border: "1px solid var(--border)",
                    flexShrink: 0,
                  }}
                >
                  /
                </kbd>
              )}
            </div>

            {/* Dropdown */}
            {focused && query.trim() && (
              <div
                role="listbox"
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: 0,
                  right: 0,
                  zIndex: 2000,
                  background: "rgba(10, 18, 36, 0.98)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
                  backdropFilter: "blur(20px)",
                  overflow: "hidden",
                }}
              >
                {results.length > 0 ? (
                  results.map((item, i) => (
                    <button
                      key={`${item.type}-${item.slug}`}
                      role="option"
                      aria-selected={i === activeIdx}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(item)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        width: "100%",
                        padding: "12px 18px",
                        border: "none",
                        background:
                          i === activeIdx
                            ? "rgba(255,255,255,0.06)"
                            : "transparent",
                        color: "#e2e8f0",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontSize: "14px",
                        textAlign: "left",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.05)";
                        setActiveIdx(i);
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <span
                        style={{
                          fontSize: "18px",
                          width: "26px",
                          textAlign: "center",
                        }}
                      >
                        {item.icon}
                      </span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "14px" }}>
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "var(--text-dim)",
                            marginTop: "2px",
                          }}
                        >
                          {item.sub}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                          color:
                            item.type === "country"
                              ? "#7dd3fc"
                              : "var(--text-muted)",
                          background:
                            item.type === "country"
                              ? "var(--accent-glow)"
                              : "rgba(255,255,255,0.05)",
                          padding: "4px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        {item.type === "country" ? "View advisory" : "Learn more"}
                      </span>
                    </button>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "18px",
                      color: "var(--text-dim)",
                      fontSize: "14px",
                      textAlign: "center",
                    }}
                  >
                    No results found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Nav links — desktop */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            flexShrink: 0,
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link"
              style={{
                padding: "7px 14px",
                fontSize: "14px",
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                borderRadius: "8px",
                whiteSpace: "nowrap",
                letterSpacing: "-0.01em",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger (visible < 768px via CSS) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="show-mobile"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {mobileOpen ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav
          className="show-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            padding: "8px 24px 16px",
            borderTop: "1px solid var(--border)",
          }}
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                padding: "12px 0",
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}

      {/* Responsive breakpoint styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
