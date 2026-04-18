"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  DESTINATION_LIST,
  SUPPORTED_COUNTRIES,
  type CountrySlug,
} from "../lib/travelData";

type Props = {
  selectedCountries: CountrySlug[];
  onAddCountry: (country: CountrySlug) => void;
};

export default function DestinationSearch({
  selectedCountries,
  onAddCountry,
}: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return DESTINATION_LIST.filter((country) => {
      if (selectedCountries.includes(country as CountrySlug)) return false;
      const info = SUPPORTED_COUNTRIES[country as CountrySlug];
      return (
        country.includes(q) ||
        info.label.toLowerCase().includes(q) ||
        info.region.toLowerCase().includes(q)
      );
    }).slice(0, 8);
  }, [query, selectedCountries]);

  useEffect(() => setActiveIdx(-1), [filtered]);

  const selectItem = (country: string) => {
    onAddCountry(country as CountrySlug);
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!filtered.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      e.preventDefault();
      selectItem(filtered[activeIdx]);
    } else if (e.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: "520px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderRadius: "16px",
          padding: "0 20px",
          height: "56px",
          background: focused
            ? "rgba(255,255,255,0.07)"
            : "rgba(255,255,255,0.035)",
          border: `1.5px solid ${
            focused ? "rgba(56,189,248,0.4)" : "var(--border)"
          }`,
          boxShadow: focused
            ? "0 0 40px rgba(56,189,248,0.06), inset 0 1px 0 rgba(255,255,255,0.04)"
            : "inset 0 1px 0 rgba(255,255,255,0.02)",
          transition: "all 0.3s ease",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke={focused ? "var(--accent)" : "var(--text-dim)"}
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Add destinations to your itinerary…"
          aria-label="Search and add destinations"
          role="combobox"
          aria-expanded={focused && !!query.trim()}
          aria-autocomplete="list"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--foreground)",
            width: "100%",
            fontSize: "15px",
            fontFamily: "inherit",
          }}
        />
      </div>

      {focused && query.trim() && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "calc(100% + 8px)",
            zIndex: 30,
            background: "rgba(10,16,31,0.97)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            backdropFilter: "blur(20px)",
            overflow: "hidden",
          }}
        >
          {filtered.length > 0 ? (
            filtered.map((country, i) => {
              const info = SUPPORTED_COUNTRIES[country as CountrySlug];
              return (
                <button
                  key={country}
                  role="option"
                  aria-selected={i === activeIdx}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => selectItem(country)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                    padding: "14px 20px",
                    border: "none",
                    background:
                      i === activeIdx
                        ? "rgba(255,255,255,0.05)"
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
                      "rgba(255,255,255,0.04)";
                    setActiveIdx(i);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span style={{ fontSize: "22px" }}>{info.flag}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>{info.label}</div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-dim)",
                        marginTop: "1px",
                      }}
                    >
                      {info.region}
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      background: "var(--accent-glow)",
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    + Add
                  </span>
                </button>
              );
            })
          ) : (
            <div
              style={{
                padding: "20px",
                color: "var(--text-dim)",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              No destinations found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
