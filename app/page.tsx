"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DestinationSearch from "./components/DestinationSearch";
import GlobeHero from "./components/GlobeHero";
import CurrentAlerts from "./components/CurrentAlerts";
import PopularDestinations from "./components/PopularDestinations";
import InsightsPreview from "./components/InsightsPreview";
import PlanYourTrip from "./components/PlanYourTrip";
import GuidesPreview from "./components/GuidesPreview";
import { TrustBanner, SiteFooter } from "./components/TrustFooter";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "./lib/travelData";

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

  const clearAll = () => setSelectedCountries([]);

  const goToItinerary = () => {
    if (selectedCountries.length === 0) return;
    router.push(`/itinerary?countries=${selectedCountries.join(",")}`);
  };

  // Progressive hero search: one search builds a destination list; the CTA
  // adapts — a single stop opens that country's brief, several open the
  // multi-stop itinerary summary. No upfront mode choice.
  const heroPrimaryAction = () => {
    if (selectedCountries.length === 0) return;
    if (selectedCountries.length === 1) {
      router.push(`/country/${selectedCountries[0]}`);
    } else {
      goToItinerary();
    }
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero-shell">
        <div className="hero-container">
          <div className="hero-panel">
            {/* Decorative layers */}
            <div className="hero-stars" aria-hidden />
            <div className="hero-aurora hero-aurora-right" aria-hidden />
            <div className="hero-aurora hero-aurora-left" aria-hidden />

            <div className="hero-grid">
              {/* ── Left column: copy + search + itinerary row ──────── */}
              <div className="hero-copy animate-fade-up">
                <h1 className="hero-title">
                  Travel health advice
                  <br />
                  <span>for any destination.</span>
                </h1>

                <p className="hero-description">
                  Personalized vaccine, malaria, and outbreak guidance — for a
                  single stop or a full multi-country trip.
                </p>

                {/* Progressive search — one bar. Picking a destination adds it
                    to the trip; the CTA below adapts from a single country
                    brief to a full multi-stop itinerary as stops are added. */}
                <DestinationSearch
                  selectedCountries={selectedCountries}
                  onAddCountry={addCountry}
                />

                {selectedCountries.length > 0 && (
                  <div style={{ marginTop: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                      <span className="t-micro" style={{ color: "var(--c-text-3)" }}>
                        {selectedCountries.length === 1 ? "Your destination" : `Your trip · ${selectedCountries.length} stops`}
                      </span>
                      {selectedCountries.length > 1 && (
                        <button onClick={clearAll} style={{ background: "none", border: "none", color: "var(--c-text-3)", fontSize: "12px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                          Clear all
                        </button>
                      )}
                    </div>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
                      {selectedCountries.map((slug) => {
                        const c = SUPPORTED_COUNTRIES[slug];
                        return (
                          <span
                            key={slug}
                            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 8px 7px 12px", borderRadius: "999px", background: "var(--c-surface)", border: "1px solid var(--c-border)", fontSize: "13px", fontWeight: 600, color: "var(--c-text)" }}
                          >
                            <span style={{ fontSize: "15px", lineHeight: 1 }}>{c.flag}</span>
                            {c.label}
                            <button
                              onClick={() => removeCountry(slug)}
                              aria-label={`Remove ${c.label}`}
                              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "18px", height: "18px", borderRadius: "50%", border: "none", background: "var(--c-surface-2)", color: "var(--c-text-3)", cursor: "pointer", fontSize: "13px", lineHeight: 1, fontFamily: "inherit" }}
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>

                    <button
                      onClick={heroPrimaryAction}
                      style={{ display: "inline-flex", alignItems: "center", gap: "9px", padding: "13px 22px", borderRadius: "12px", border: "none", background: "var(--c-accent)", color: "#ffffff", fontSize: "14px", fontWeight: 700, fontFamily: "inherit", cursor: "pointer", boxShadow: "0 10px 28px rgba(8,145,178,0.28)" }}
                    >
                      {selectedCountries.length === 1
                        ? `View ${SUPPORTED_COUNTRIES[selectedCountries[0]].label} health guide`
                        : `View trip summary · ${selectedCountries.length} stops`}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </button>

                    {selectedCountries.length === 1 && (
                      <p style={{ margin: "10px 0 0", fontSize: "12px", color: "var(--c-text-3)" }}>
                        Heading to more than one country? Just search and add another stop.
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* ── Right column: globe ─────────────────────────────── */}
              <div className="hero-visual animate-fade-up-3">
                <div className="hero-globe-wrap">
                  <GlobeHero
                    selectedCountries={selectedCountries}
                    onToggleCountry={toggleCountry}
                    showFilterBar={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Physician trust strip — small, minimal, directly under hero ─── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "9px",
          padding: "12px 24px",
          borderTop: "1px solid var(--c-border)",
          borderBottom: "1px solid var(--c-border)",
          background: "var(--c-surface)",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "22px", height: "22px", borderRadius: "50%", background: "var(--c-trust-soft)", border: "1px solid var(--c-trust-border)", color: "var(--c-trust)", flexShrink: 0 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <span style={{ fontSize: "12.5px", color: "var(--c-text-2)" }}>
          Physician-reviewed by{" "}
          <strong style={{ color: "var(--c-text)", fontWeight: 700 }}>Dr. Marco Seneghini</strong>{" "}
          · Infectious Diseases Specialist · Switzerland
        </span>
      </div>

      {/* ── Below-the-fold sections (v3 order) ────────────────────────── */}
      <CurrentAlerts />

      <PopularDestinations />

      <InsightsPreview />

      <PlanYourTrip />

      <GuidesPreview />

      <TrustBanner />

      <SiteFooter />

      {/* Card micro-interactions — hover lift + cyan glow.
          Selectors target common card wrappers used across the home sections
          (HowItWorks steps, PopularDestinations country cards, DiseaseLibrary
          disease cards). Effects are restrained: 4px lift, soft cyan glow,
          200ms ease. No-op on touch devices via @media (hover: hover). */}
      <style jsx global>{`
        @media (hover: hover) {
          .disease-card,
          .destination-card,
          .step-card,
          .route-card,
          [data-card="lift"] {
            transition:
              transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 220ms ease,
              border-color 220ms ease !important;
            will-change: transform;
          }
          .disease-card:hover,
          .destination-card:hover,
          .step-card:hover,
          .route-card:hover,
          [data-card="lift"]:hover {
            transform: translateY(-4px);
            box-shadow:
              0 12px 32px rgba(8, 145, 178, 0.12),
              0 2px 8px rgba(15, 23, 42, 0.08) !important;
            border-color: var(--c-accent-border) !important;
          }
        }
      `}</style>
    </>
  );
}
