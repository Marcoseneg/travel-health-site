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

  const hasDestinations = selectedCountries.length > 0;

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
              {/* ── Left column: copy + search card ─────────────────── */}
              <div className="hero-copy animate-fade-up">
                <div className="hero-badge">
                  <span className="hero-badge-dot" />
                  Physician-curated travel medicine
                </div>

                <h1 className="hero-title">
                  Travel safe.
                  <br />
                  <span>Travel informed.</span>
                </h1>

                <p className="hero-description">
                  Evidence-based vaccine recommendations, malaria prophylaxis and
                  outbreak alerts — tailored to your itinerary.
                </p>

                {/* ── Search card ──────────────────────────────────── */}
                <div className="hero-card">
                  <div className="hero-card-top">
                    <div>
                      <p className="hero-card-label">Build your trip</p>
                      <p className="hero-card-subtitle">
                        Add one or more destinations to generate a personalized
                        health brief.
                      </p>
                    </div>
                    <span
                      className={`hero-card-status ${
                        hasDestinations ? "is-active" : ""
                      }`}
                    >
                      {hasDestinations
                        ? `${selectedCountries.length} selected`
                        : "Ready"}
                    </span>
                  </div>

                  <div className="hero-chip-area">
                    {selectedCountries.map((slug) => (
                      <CountryChip
                        key={slug}
                        slug={slug}
                        onRemove={removeCountry}
                      />
                    ))}
                    {!hasDestinations && (
                      <span className="hero-chip-placeholder">
                        No destinations selected yet
                      </span>
                    )}
                  </div>

                  <DestinationSearch
                    selectedCountries={selectedCountries}
                    onAddCountry={addCountry}
                  />

                  <p className="hero-helper">
                    Press <kbd className="hero-kbd">/</kbd> to search &middot;
                    Free, no account needed
                  </p>

                  {hasDestinations && (
                    <button
                      className="hero-go-btn"
                      onClick={goToItinerary}
                      aria-label="Get health brief"
                    >
                      <span className="hero-go-btn-label">GO</span>
                      <svg
                        width="22"
                        height="22"
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
                  )}
                </div>
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

      {/* ── Stats strip (proof row) ───────────────────────────────────── */}
      <section className="stats-strip">
        <div className="stats-strip-inner">
          <div className="stats-strip-item">
            <span className="stats-strip-num">95+</span>
            <span className="stats-strip-label">Destinations covered</span>
          </div>
          <div className="stats-strip-item">
            <span className="stats-strip-num">9</span>
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
    </>
  );
}
