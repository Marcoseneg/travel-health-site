"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  DESTINATION_LIST,
  SUPPORTED_COUNTRIES,
} from "../lib/travelData";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";
import ThemeToggle from "./ThemeToggle";

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
  { label: "Home", href: "/" },
  { label: "Countries", href: "/countries" },
  { label: "Diseases", href: "/diseases" },
  { label: "Outbreaks", href: "/outbreaks" },
  { label: "Guides", href: "/guides" },
  { label: "About", href: "/about" },
];

// Placeholder language set — wire up to a real i18n provider later
const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "IT", label: "Italiano" },
];

export default function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();

  // A nav link is "active" when its href matches the current route.
  // "/" matches only the exact homepage; every other link matches its
  // own path and any sub-page beneath it (e.g. /guides/foo highlights Guides).
  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("EN");
  const inputRef = useRef<HTMLInputElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    // Highlight must clear whenever the result set changes so a stale index
    // never points past the new list; this setState is the effect's purpose.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIdx(-1);
  }, [results]);

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

  // Close language dropdown on outside click
  useEffect(() => {
    if (!langOpen) return;
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langOpen]);

  const handleSelect = (item: SearchItem) => {
    if (item.type === "country") {
      router.push(`/country/${item.slug}`);
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
        borderBottom: "1px solid var(--c-border)",
        background: "var(--c-surface)",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          height: "72px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0 28px",
        }}
      >
        {/* ── Logo ─────────────────────────────────────────────────── */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "11px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, var(--c-accent-soft), var(--c-surface))",
              border: "1px solid var(--c-accent-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="9" stroke="var(--c-accent)" strokeWidth="1.4" fill="none" />
              <ellipse cx="16" cy="16" rx="9" ry="3.5" stroke="var(--c-accent)" strokeWidth="1" fill="none" />
              <line x1="7" y1="16" x2="25" y2="16" stroke="var(--c-accent)" strokeWidth="1" />
            </svg>
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: "18px",
              letterSpacing: "-0.025em",
              color: "var(--c-text)",
            }}
          >
            Travel
            <span style={{ color: "var(--c-accent)", fontWeight: 500 }}>Med</span>
          </span>
        </Link>

        {/* ── Divider between logo and search ──────────────────────── */}
        <div
          aria-hidden="true"
          className="hidden-mobile"
          style={{
            width: "1px",
            height: "24px",
            background: "var(--c-border)",
            flexShrink: 0,
            marginLeft: "6px",
            marginRight: "6px",
          }}
        />

        {/* ── Search (smaller, more compact) ───────────────────────── */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "360px",
            flexShrink: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "12px",
              padding: "0 14px",
              height: "40px",
              background: focused ? "var(--c-surface)" : "var(--c-surface-2)",
              border: `1px solid ${focused ? "var(--c-accent)" : "var(--c-border)"}`,
              transition: "all 0.25s ease",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke={focused ? "var(--c-accent)" : "var(--c-text-3)"}
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
              aria-controls="site-search-listbox"
              aria-expanded={focused && !!query.trim()}
              aria-autocomplete="list"
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--c-text)",
                width: "100%",
                fontSize: "14px",
                fontFamily: "inherit",
                letterSpacing: "-0.01em",
              }}
            />
            {!focused && !query && (
              <kbd
                style={{
                  fontSize: "10.5px",
                  color: "var(--c-text-3)",
                  background: "var(--c-surface)",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  fontFamily: "inherit",
                  border: "1px solid var(--c-border)",
                  flexShrink: 0,
                }}
              >
                /
              </kbd>
            )}
          </div>

          {/* Dropdown (widens beyond input so results are readable) */}
          {focused && query.trim() && (
            <div
              id="site-search-listbox"
              role="listbox"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                zIndex: 2000,
                minWidth: "380px",
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                borderRadius: "14px",
                boxShadow: "0 24px 64px rgba(15, 23, 42, 0.12)",
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
                      background: i === activeIdx ? "var(--c-surface-2)" : "transparent",
                      color: "var(--c-text)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      textAlign: "left",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--c-surface-2)";
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
                          color: "var(--c-text-3)",
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
                          item.type === "country" ? "var(--c-accent-strong)" : "var(--c-text-2)",
                        background:
                          item.type === "country" ? "var(--c-accent-soft)" : "var(--c-surface-2)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                      }}
                    >
                      {item.type === "country" ? "Open brief" : "Learn more"}
                    </span>
                  </button>
                ))
              ) : (
                <div
                  style={{
                    padding: "18px",
                    color: "var(--c-text-3)",
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

        {/* ── Nav links (desktop) ──────────────────────────────────── */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            flexShrink: 0,
            marginLeft: "auto",
          }}
          className="hidden-mobile"
        >
          {NAV_LINKS.map((item) => {
            const active = isActiveLink(item.href);
            return (
              <a
                key={item.label}
                href={item.href}
                className="nav-link"
                aria-current={active ? "page" : undefined}
                style={{
                  padding: "8px 14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: active ? "var(--c-accent-strong)" : "var(--c-text-2)",
                  textDecoration: "none",
                  borderRadius: "8px",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.01em",
                  background: active ? "var(--c-accent-soft)" : "transparent",
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* ── Divider between nav and controls ─────────────────────── */}
        <div
          aria-hidden="true"
          className="hidden-mobile"
          style={{
            width: "1px",
            height: "24px",
            background: "var(--c-border)",
            flexShrink: 0,
            marginLeft: "6px",
            marginRight: "6px",
          }}
        />

        {/* ── Theme toggle (desktop) ───────────────────────────────── */}
        <div className="hidden-mobile" style={{ flexShrink: 0 }}>
          <ThemeToggle />
        </div>

        {/* ── Language selector (far right) ────────────────────────── */}
        <div
          ref={langRef}
          style={{ position: "relative", flexShrink: 0 }}
          className="hidden-mobile"
        >
          <button
            onClick={() => setLangOpen((v) => !v)}
            aria-label="Select language"
            aria-expanded={langOpen}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              padding: "0 12px",
              height: "40px",
              borderRadius: "10px",
              background: langOpen ? "var(--c-surface)" : "var(--c-surface-2)",
              border: "1px solid var(--c-border)",
              color: "var(--c-text-2)",
              fontFamily: "inherit",
              fontSize: "13px",
              fontWeight: 600,
              letterSpacing: "0.02em",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {/* Globe icon */}
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ opacity: 0.75 }}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {activeLang}
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                opacity: 0.6,
                transform: langOpen ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease",
              }}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {langOpen && (
            <div
              role="listbox"
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                zIndex: 2000,
                minWidth: "180px",
                background: "var(--c-surface)",
                border: "1px solid var(--c-border)",
                borderRadius: "12px",
                boxShadow: "0 24px 64px rgba(15, 23, 42, 0.12)",
                overflow: "hidden",
                padding: "4px",
              }}
            >
              {LANGUAGES.map((lang) => {
                const isActive = lang.code === activeLang;
                return (
                  <button
                    key={lang.code}
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setActiveLang(lang.code);
                      setLangOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "10px 12px",
                      border: "none",
                      borderRadius: "8px",
                      background: isActive ? "var(--c-accent-soft)" : "transparent",
                      color: isActive ? "var(--c-accent-strong)" : "var(--c-text-2)",
                      fontFamily: "inherit",
                      fontSize: "13px",
                      fontWeight: 600,
                      textAlign: "left",
                      cursor: "pointer",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "var(--c-surface-2)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          color: isActive ? "var(--c-accent-strong)" : "var(--c-text-3)",
                          minWidth: "20px",
                        }}
                      >
                        {lang.code}
                      </span>
                      {lang.label}
                    </span>
                    {isActive && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    )}
                  </button>
                );
              })}
              <div
                style={{
                  marginTop: "4px",
                  padding: "8px 12px",
                  borderTop: "1px solid var(--c-border)",
                  fontSize: "11px",
                  color: "var(--c-text-3)",
                  lineHeight: 1.4,
                }}
              >
                Translation coming soon — currently English only
              </div>
            </div>
          )}
        </div>

        {/* Mobile hamburger (visible below breakpoint via CSS) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          className="show-mobile"
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--c-text-2)",
            cursor: "pointer",
            padding: "8px",
            marginLeft: "auto",
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
            padding: "8px 28px 16px",
            borderTop: "1px solid var(--c-border)",
          }}
        >
          {NAV_LINKS.map((item) => {
            const active = isActiveLink(item.href);
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                aria-current={active ? "page" : undefined}
                style={{
                  padding: "12px 0",
                  fontSize: "15px",
                  fontWeight: active ? 700 : 500,
                  color: active ? "var(--c-accent-strong)" : "var(--c-text-2)",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--c-border)",
                }}
              >
                {item.label}
              </a>
            );
          })}
          {/* Theme + language options in mobile menu */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
              paddingTop: "12px",
            }}
          >
            <ThemeToggle />
            {LANGUAGES.map((lang) => {
              const isActive = lang.code === activeLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => {
                    setActiveLang(lang.code);
                    setMobileOpen(false);
                  }}
                  style={{
                    padding: "6px 12px",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    border: `1px solid ${isActive ? "var(--c-accent-border)" : "var(--c-border)"}`,
                    background: isActive ? "var(--c-accent-soft)" : "var(--c-surface-2)",
                    color: isActive ? "var(--c-accent-strong)" : "var(--c-text-2)",
                    fontFamily: "inherit",
                    cursor: "pointer",
                  }}
                >
                  {lang.code}
                </button>
              );
            })}
          </div>
        </nav>
      )}

      {/* Responsive breakpoint styles */}
      <style jsx>{`
        @media (max-width: 900px) {
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
