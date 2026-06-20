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

  const goToItinerary = () => {
    if (selectedCountries.length === 0) return;
    router.push(`/itinerary?countries=${selectedCountries.join(",")}`);
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
                  Travel safe.
                  <br />
                  <span>Travel informed.</span>
                </h1>

                <p className="hero-description">
                  Evidence-based vaccine recommendations, malaria prophylaxis and
                  outbreak alerts — tailored to your itinerary.
                </p>

                {/* Build your trip — bare label + search bar (no card) */}
                <p className="hero-build-label">Build your trip</p>
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
