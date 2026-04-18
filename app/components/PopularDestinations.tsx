"use client";

import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";

type DestinationInfo = {
  slug: CountrySlug;
  trips: string;
  alert: string | null;
};

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

export default function PopularDestinations({
  selectedCountries,
  onAddCountry,
  onRemoveCountry,
}: Props) {
  return (
    <section style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border)",
              marginBottom: "16px",
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-dim)",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Popular routes
          </div>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 42px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Where travelers need us most
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "16px",
          }}
        >
          {POPULAR.map((dest) => {
            const c = SUPPORTED_COUNTRIES[dest.slug];
            if (!c) return null;
            const isSelected = selectedCountries.includes(dest.slug);

            return (
              <button
                key={dest.slug}
                className="dest-card card-hover"
                onClick={() =>
                  isSelected
                    ? onRemoveCountry(dest.slug)
                    : onAddCountry(dest.slug)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "20px 24px",
                  borderRadius: "16px",
                  background: isSelected
                    ? "rgba(56,189,248,0.06)"
                    : "var(--surface)",
                  border: `1px solid ${
                    isSelected
                      ? "rgba(56,189,248,0.2)"
                      : "var(--border)"
                  }`,
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "inherit",
                  color: "var(--foreground)",
                  width: "100%",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "32px" }}>{c.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "15px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "var(--text-dim)",
                      marginTop: "2px",
                    }}
                  >
                    {c.region} · {dest.trips} annual travelers
                  </div>
                  {dest.alert && (
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        marginTop: "6px",
                        fontSize: "11px",
                        fontWeight: 600,
                        color: "var(--warning)",
                        background: "rgba(251,191,36,0.12)",
                        padding: "3px 8px",
                        borderRadius: "6px",
                      }}
                    >
                      <span
                        style={{
                          width: "4px",
                          height: "4px",
                          borderRadius: "50%",
                          background: "var(--warning)",
                        }}
                      />
                      {dest.alert}
                    </div>
                  )}
                </div>
                <div className="dest-arrow" style={{ color: "var(--accent)" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
