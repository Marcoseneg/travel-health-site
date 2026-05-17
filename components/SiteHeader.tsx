"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DESTINATION_LIST,
  SUPPORTED_COUNTRIES,
  type CountrySlug,
} from "../app/lib/travelData";

import { diseases, DISEASE_LIST } from "../app/lib/diseaseData";

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

export default function SiteHeader() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.sub.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    if (item.type === "country") {
      router.push(`/itinerary?countries=${item.slug}`);
    } else {
      router.push(`/diseases/${item.slug}`);
    }
    setQuery("");
    setFocused(false);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        width: "100%",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(2, 6, 23, 0.82)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          height: "64px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "0 24px",
        }}
      >
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "9px", background: "linear-gradient(135deg, #38bdf8, #0ea5e9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", boxShadow: "0 4px 16px rgba(56,189,248,0.32)" }}>✈</div>
          <span style={{ fontWeight: 800, fontSize: "16px", letterSpacing: "-0.03em", color: "#f8fafc" }}>TravelMed</span>
        </a>

        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          <div style={{ position: "relative", width: "100%", maxWidth: "460px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                borderRadius: "14px",
                padding: "0 14px",
                height: "40px",
                background: focused ? "rgba(255,255,255,0.10)" : "rgba(255,255,255,0.06)",
                border: `1px solid ${focused ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.07)"}`,
                transition: "all 0.25s ease",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={focused ? "rgba(125,211,252,0.95)" : "rgba(148,163,184,0.72)"} strokeWidth="2.2" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="m21 21-5-5" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 180)}
                placeholder="Search countries, diseases, vaccines..."
                style={{ background: "transparent", border: "none", outline: "none", color: "#e2e8f0", width: "100%", fontSize: "13px", fontFamily: "inherit", letterSpacing: "-0.01em" }}
              />
              {!focused && !query && (
                <kbd style={{ fontSize: "10px", color: "#64748b", background: "rgba(255,255,255,0.06)", borderRadius: "5px", padding: "2px 6px", fontFamily: "inherit", border: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>/</kbd>
              )}
            </div>

            {focused && query.trim() && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 2000, background: "rgba(10, 18, 36, 0.98)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "14px", boxShadow: "0 24px 64px rgba(0,0,0,0.55)", backdropFilter: "blur(20px)", overflow: "hidden" }}>
                {results.length > 0 ? results.map((item) => (
                  <button
                    key={`${item.type}-${item.slug}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => handleSelect(item)}
                    style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", padding: "11px 16px", border: "none", background: "transparent", color: "#e2e8f0", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", textAlign: "left" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <span style={{ fontSize: "16px", width: "24px", textAlign: "center" }}>{item.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: "13px" }}>{item.label}</div>
                      <div style={{ fontSize: "11px", color: "#64748b", marginTop: "1px" }}>{item.sub}</div>
                    </div>
                    <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: item.type === "country" ? "#7dd3fc" : "#94a3b8", background: item.type === "country" ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: "6px" }}>
                      {item.type === "country" ? "View advisory" : "Learn more"}
                    </span>
                  </button>
                )) : (
                  <div style={{ padding: "16px", color: "#475569", fontSize: "13px", textAlign: "center" }}>No results found</div>
                )}
              </div>
            )}
          </div>
        </div>

        <nav style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
          {[
            { label: "Countries", href: "/countries" },
            { label: "Diseases", href: "/diseases" },
            { label: "Vaccines", href: "#" },
            { label: "Outbreaks", href: "#" },
            { label: "About", href: "/about" },
          ].map((item) => (
            <a key={item.label} href={item.href} className="nav-link" style={{ padding: "8px 12px", fontSize: "13px", fontWeight: 500, color: "rgba(148,163,184,0.82)", textDecoration: "none", borderRadius: "8px", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
