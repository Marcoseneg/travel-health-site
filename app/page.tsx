"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DestinationSearch from "./components/DestinationSearch";
import GlobeHero from "./components/GlobeHero";
import ItineraryPanel from "./components/ItineraryPanel";
import CountUp from "./components/CountUp";
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

  const clearAll = () => setSelectedCountries([]);

  // Hero search mode — single destination vs. a full multi-stop trip.
  // "Full Trip" keeps the itinerary builder (TravelMed's differentiator)
  // visible on the homepage instead of hiding it on /itinerary.
  const [tripMode, setTripMode] = useState<"destination" | "trip">("destination");
  const openDestination = (country: CountrySlug) =>
    router.push(`/country/${country}`);

  const goToItinerary = () => {
    if (selectedCountries.length === 0) return;
    router.push(`/itinerary?countries=${selectedCountries.join(",")}`);
  };

  const heroTabStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    fontSize: "13px",
    fontWeight: 700,
    borderRadius: "9px",
    cursor: "pointer",
    fontFamily: "inherit",
    border: "1px solid",
    borderColor: active ? "var(--c-accent-border)" : "transparent",
    background: active ? "var(--c-accent-soft)" : "transparent",
    color: active ? "var(--c-accent-strong)" : "var(--c-text-3)",
    transition: "all 0.15s ease",
  });

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

                {/* Destination / Full Trip tabs — keeps the itinerary builder
                    on the homepage as a first-class search mode. */}
                <div
                  role="tablist"
                  aria-label="Search mode"
                  style={{ display: "inline-flex", gap: "2px", marginBottom: "12px", padding: "3px", borderRadius: "11px", background: "var(--c-surface-2)", border: "1px solid var(--c-border)" }}
                >
                  <button
                    role="tab"
                    aria-selected={tripMode === "destination"}
                    onClick={() => setTripMode("destination")}
                    style={heroTabStyle(tripMode === "destination")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                    Destination
                  </button>
                  <button
                    role="tab"
                    aria-selected={tripMode === "trip"}
                    onClick={() => setTripMode("trip")}
                    style={heroTabStyle(tripMode === "trip")}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h7a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7" /></svg>
                    Full Trip
                  </button>
                </div>

                {tripMode === "destination" ? (
                  <DestinationSearch
                    selectedCountries={[]}
                    onAddCountry={openDestination}
                  />
                ) : (
                  <>
                    <DestinationSearch
                      selectedCountries={selectedCountries}
                      onAddCountry={addCountry}
                    />
                    {/* Three-zone itinerary row — always rendered; the zones
                        transform between an instructional empty state and the
                        populated state. */}
                    <ItineraryPanel
                      selectedCountries={selectedCountries}
                      onRemoveCountry={removeCountry}
                      onClearAll={clearAll}
                      onGo={goToItinerary}
                    />
                  </>
                )}
              </div>

              {/* ── Right column: globe ─────────────────────────────── */}
              <div className="hero-visual animate-fade-up-3">
                <div className="hero-globe-wrap">
                  <GlobeHero
                    selectedCountries={selectedCountries}
                    onToggleCountry={toggleCountry}
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

      {/* ── Stats strip (proof row) ───────────────────────────────────── */}
      <section className="stats-strip">
        <div className="stats-strip-inner">
          <div className="stats-strip-item">
            <span className="stats-strip-num">
              <CountUp end={65} suffix="+" />
            </span>
            <span className="stats-strip-label">Destinations covered</span>
          </div>
          <div className="stats-strip-item">
            <span className="stats-strip-num">
              <CountUp end={9} />
            </span>
            <span className="stats-strip-label">Diseases tracked</span>
          </div>
          <div className="stats-strip-item">
            <span className="stats-strip-num">CDC</span>
            <span className="stats-strip-label">Aligned guidance</span>
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
