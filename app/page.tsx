"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DestinationSearch from "./components/DestinationSearch";
import GlobeHero from "./components/GlobeHero";
import CountryChip from "./components/CountryChip";
import HowItWorks from "./components/HowItWorks";
import PopularDestinations from "./components/PopularDestinations";
import DiseaseLibrary from "./components/DiseaseLibrary";
import { TrustBanner, SiteFooter } from "./components/TrustFooter";
import { type CountrySlug } from "./lib/travelData";

export default function Home() {
  const router = useRouter();
  const [selectedCountries, setSelectedCountries] = useState<CountrySlug[]>([]);

  const addCountry = (country: CountrySlug) => {
    setSelectedCountries((prev) =>
      prev.includes(country) ? prev : [...prev, country]
    );
  };

  const removeCountry = (country: CountrySlug) => {
    setSelectedCountries((prev) => prev.filter((c) => c !== country));
  };

  const toggleCountry = (country: CountrySlug) => {
    setSelectedCountries((prev) =>
      prev.includes(country)
        ? prev.filter((c) => c !== country)
        : [...prev, country]
    );
  };

  const goToItinerary = () => {
    if (selectedCountries.length === 0) return;
    router.push(`/itinerary?countries=${selectedCountries.join(",")}`);
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--background)",
        }}
      >
        {/* Starfield */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.35) 0%, transparent 100%),
              radial-gradient(1px 1px at 80% 10%, rgba(255,255,255,0.25) 0%, transparent 100%),
              radial-gradient(1px 1px at 30% 70%, rgba(255,255,255,0.2) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 70% 60%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(0.5px 0.5px at 50% 40%, rgba(255,255,255,0.15) 0%, transparent 100%),
              radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.25) 0%, transparent 100%),
              radial-gradient(0.5px 0.5px at 90% 80%, rgba(255,255,255,0.2) 0%, transparent 100%),
              radial-gradient(1px 1px at 60% 90%, rgba(255,255,255,0.3) 0%, transparent 100%),
              radial-gradient(1.5px 1.5px at 25% 35%, rgba(255,255,255,0.45) 0%, transparent 100%),
              radial-gradient(0.5px 0.5px at 45% 55%, rgba(255,255,255,0.15) 0%, transparent 100%)
            `,
            pointerEvents: "none",
          }}
        />
        {/* Radial accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-15%",
            width: "70%",
            height: "140%",
            background:
              "radial-gradient(circle at 50% 40%, rgba(56,189,248,0.05) 0%, transparent 55%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "28px 24px 0",
            position: "relative",
            zIndex: 1,
          }}
        >

          <div className="hero-grid">
            {/* Left column */}
            <div
              className="animate-fade-up"
              style={{ maxWidth: "580px", position: "relative", zIndex: 2 }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 16px",
                  marginBottom: "24px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid var(--border)",
                  color: "var(--text-dim)",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.03em",
                }}
              >
                <span
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--accent)",
                    display: "inline-block",
                  }}
                />
                Physician-curated travel medicine
              </div>

              <h1
                style={{
                  fontSize: "clamp(44px, 5vw, 72px)",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: "-0.05em",
                  margin: 0,
                  marginBottom: "24px",
                }}
              >
                Travel safe.
                <br />
                <span style={{ color: "var(--accent)" }}>Travel informed.</span>
              </h1>

              <p
                className="animate-fade-up-1"
                style={{
                  fontSize: "16px",
                  color: "var(--text-muted)",
                  lineHeight: 1.7,
                  marginBottom: "32px",
                  maxWidth: "480px",
                }}
              >
                Evidence-based vaccine recommendations, malaria prophylaxis,
                outbreak alerts, and destination-specific prevention — tailored
                to your itinerary.
              </p>

              <div className="animate-fade-up-2">
                <DestinationSearch
                  selectedCountries={selectedCountries}
                  onAddCountry={addCountry}
                />
              </div>

              {/* Selected chips + go button */}
              <div
                className="animate-fade-up-3"
                style={{ marginTop: "20px", minHeight: "56px" }}
              >
                {selectedCountries.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "8px",
                    }}
                  >
                    {selectedCountries.map((slug) => (
                      <CountryChip
                        key={slug}
                        slug={slug}
                        onRemove={removeCountry}
                      />
                    ))}
                    <button
                      onClick={goToItinerary}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        borderRadius: "999px",
                        padding: "10px 22px 10px 18px",
                        background: "linear-gradient(135deg, #0ea5e9, #38bdf8)",
                        color: "#020617",
                        border: "none",
                        fontSize: "13px",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        letterSpacing: "-0.01em",
                        boxShadow: "0 6px 24px rgba(56,189,248,0.25)",
                        transition: "transform 0.15s, box-shadow 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 8px 32px rgba(56,189,248,0.35)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 24px rgba(56,189,248,0.25)";
                      }}
                    >
                      Get health brief
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
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-dim)",
                      margin: 0,
                    }}
                  >
                    Or explore visually — click countries on the globe, or
                    browse popular routes below
                  </p>
                )}
              </div>
            </div>

            {/* Right column — Globe */}
            <div
              className="animate-fade-up-3"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                minWidth: 0,
                position: "relative",
              }}
            >
              <GlobeHero
                selectedCountries={selectedCountries}
                onToggleCountry={toggleCountry}
              />
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="animate-fade-up-4"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "48px",
              flexWrap: "wrap",
              marginTop: "48px",
              padding: "28px 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            {[
              { value: "95+", label: "Destinations" },
              { value: "9", label: "Diseases covered" },
              { value: "CDC", label: "Source aligned" },
              { value: "Free", label: "Always" },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "28px",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--text-dim)",
                    marginTop: "2px",
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Below-the-fold sections ───────────────────────────────────── */}
      <HowItWorks />

      <PopularDestinations
        selectedCountries={selectedCountries}
        onAddCountry={addCountry}
        onRemoveCountry={removeCountry}
      />

      <DiseaseLibrary />

      <TrustBanner />

      <SiteFooter />

      {/* ── Responsive hero grid ──────────────────────────────────────── */}
      <style jsx>{`
        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 580px) minmax(0, 1fr);
          align-items: center;
          column-gap: 32px;
          min-height: calc(100vh - 160px);
        }
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            min-height: auto;
            padding-top: 24px;
          }
          .hero-grid > div:last-child {
            justify-content: center !important;
            margin-top: 32px;
          }
        }
        @media (max-width: 640px) {
          .hero-grid > div:last-child {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
