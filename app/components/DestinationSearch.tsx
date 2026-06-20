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

  // Reset the highlighted option whenever the result set changes. This is a
  // deliberate one-time sync tied to `filtered`, not a render cascade.
  // eslint-disable-next-line react-hooks/set-state-in-effect
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
    <div style={{ position: "relative", width: "100%" }}>
      {/* Search bar — light surface with an accent ring that deepens on focus,
          so it reads as the clear primary action without a surrounding card. */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          borderRadius: "15px",
          padding: "0 22px",
          height: "60px",
          background: "var(--c-surface)",
          border: `1.5px solid ${
            focused ? "var(--c-accent)" : "var(--c-border-strong)"
          }`,
          boxShadow: focused
            ? "0 0 0 4px var(--c-accent-soft)"
            : "none",
          transition: "all 0.25s ease",
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--c-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
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
          placeholder="Where are you travelling?"
          aria-label="Search and add destinations"
          role="combobox"
          aria-expanded={focused && !!query.trim()}
          aria-controls="destination-search-listbox"
          aria-autocomplete="list"
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--c-text)",
            width: "100%",
            fontSize: "16px",
            fontWeight: 500,
            fontFamily: "inherit",
          }}
        />
      </div>

      {focused && query.trim() && (
        <div
          id="destination-search-listbox"
          role="listbox"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "calc(100% + 8px)",
            zIndex: 30,
            background: "var(--c-surface)",
            border: "1px solid var(--c-border)",
            borderRadius: "14px",
            boxShadow: "0 20px 60px rgba(15,23,42,0.15)",
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
                        ? "var(--c-surface-2)"
                        : "transparent",
                    color: "var(--c-text)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "14px",
                    textAlign: "left",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "var(--c-surface-2)";
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
                        color: "var(--c-text-3)",
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
                      color: "var(--c-accent)",
                      background: "var(--c-accent-soft)",
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
                color: "var(--c-text-3)",
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
