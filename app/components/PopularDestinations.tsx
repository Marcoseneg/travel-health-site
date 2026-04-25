"use client";

import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";

type DestinationInfo = { slug: CountrySlug; trips: string; alert: string | null };

const POPULAR: DestinationInfo[] = [
  { slug: "thailand", trips: "2.4M", alert: null },
  { slug: "india", trips: "1.8M", alert: "Dengue surge — Delhi NCR" },
  { slug: "kenya", trips: "1.2M", alert: null },
  { slug: "brazil", trips: "980K", alert: "Yellow fever — Amazonas" },
  { slug: "peru", trips: "870K", alert: null },
  { slug: "vietnam", trips: "760K", alert: null },
];

type Props = {
  selectedCountries: CountrySlug[];
  onAddCountry: (slug: CountrySlug) => void;
  onRemoveCountry: (slug: CountrySlug) => void;
};

export default function PopularDestinations({ selectedCountries, onAddCountry, onRemoveCountry }: Props) {
  return (
    <section style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px",
            borderRadius: "999px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "16px", fontSize: "12px", fontWeight: 600, color: "#64748b",
            letterSpacing: "0.04em", textTransform: "uppercase",
          }}>Popular routes</div>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1, margin: 0 }}>
            Where travelers need us most
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "12px" }}>
          {POPULAR.map((dest) => {
            const c = SUPPORTED_COUNTRIES[dest.slug];
            if (!c) return null;
            const isSelected = selectedCountries.includes(dest.slug);
            return (
              <button
                key={dest.slug}
                onClick={() => isSelected ? onRemoveCountry(dest.slug) : onAddCountry(dest.slug)}
                style={{
                  display: "flex", alignItems: "center", gap: "16px", padding: "18px 22px",
                  borderRadius: "14px",
                  background: isSelected ? "rgba(56,189,248,0.05)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isSelected ? "rgba(56,189,248,0.15)" : "rgba(255,255,255,0.06)"}`,
                  cursor: "pointer", textAlign: "left", fontFamily: "inherit", color: "#f1f5f9",
                  width: "100%", transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = isSelected ? "rgba(56,189,248,0.15)" : "rgba(255,255,255,0.06)"; e.currentTarget.style.background = isSelected ? "rgba(56,189,248,0.05)" : "rgba(255,255,255,0.02)"; }}
              >
                <span style={{ fontSize: "32px" }}>{c.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "15px", letterSpacing: "-0.01em" }}>{c.label}</div>
                  <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>{c.region} · {dest.trips} annual travelers</div>
                  {dest.alert && (
                    <div style={{
                      display: "inline-flex", alignItems: "center", gap: "4px", marginTop: "6px",
                      fontSize: "11px", fontWeight: 600, color: "#fbbf24", background: "rgba(251,191,36,0.08)",
                      padding: "3px 8px", borderRadius: "6px",
                    }}>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#fbbf24" }} />
                      {dest.alert}
                    </div>
                  )}
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
