"use client";

import { SUPPORTED_COUNTRIES, type CountrySlug } from "../lib/travelData";
import { countries as healthData } from "../../data/countries";
import { malariaRiskByCountry } from "../lib/malariaData";
import { yellowFeverByCountry } from "../lib/yellowFeverData";
import { dengueRiskByCountry } from "../lib/dengueData";
import { chikungunyaRiskByCountry } from "../lib/chikungunyaData";

// ─────────────────────────────────────────────────────────────────────────────
// ItineraryPanel — the three-zone "build your trip" row on the homepage.
//
// Sits below the search bar. Always rendered — it does not appear/disappear.
// Instead, its three zones transform between two states:
//
//   EMPTY STATE (no destinations yet)
//     Zone 1  — globe icon + "add countries" instruction
//     Zone 2  — checklist icon + "recommendations appear here" instruction
//     Zone 3  — dimmed GO badge (preview of the final step)
//
//   POPULATED STATE (≥1 destination)
//     Zone 1  — the real destination list (flag + name + remove)
//     Zone 2  — live recommendations (vaccines / malaria / other risks)
//     Zone 3  — bright GO badge → opens the full /itinerary page
//
// The boxes never move; only their contents change. The numbered zones read
// as a 1 → 2 → 3 flow, so the empty state doubles as onboarding.
//
// Summary numbers are computed from the same data the /itinerary page uses.
// Outbreak counts are intentionally not shown here — full outbreak detail
// lives on the /itinerary page and the /outbreaks system.
// ─────────────────────────────────────────────────────────────────────────────

type Props = {
  selectedCountries: CountrySlug[];
  onRemoveCountry: (country: CountrySlug) => void;
  onClearAll: () => void;
  onGo: () => void;
};

// A risk lookup value counts as "risk present" unless it's a no-risk sentinel.
const NO_RISK = new Set(["none", "", "no-risk", "generally-not"]);
function hasRisk(value: string | undefined): boolean {
  if (!value) return false;
  return !NO_RISK.has(value);
}

// ── Empty-state line icons (faint cyan, match the site's outline style) ──────

function GlobeIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg
      width="46"
      height="46"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 3h6a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M16 4h2a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m8.5 12 1.5 1.5 3-3" />
      <path d="M8.5 17 10 18.5l3-3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function ItineraryPanel({
  selectedCountries,
  onRemoveCountry,
  onClearAll,
  onGo,
}: Props) {
  const isEmpty = selectedCountries.length === 0;
  const n = selectedCountries.length;

  // ── Compute the live summary (only meaningful when populated) ─────────────
  const vaccineSet = new Set<string>();
  let malariaCount = 0;
  const otherRisks = new Set<string>();

  selectedCountries.forEach((slug) => {
    const meta = SUPPORTED_COUNTRIES[slug];
    const health = healthData[slug];
    const label = meta?.label;

    health?.vaccinesRecommended?.forEach((v) => vaccineSet.add(v));

    if (label && hasRisk(malariaRiskByCountry[label])) {
      malariaCount += 1;
    }

    if (label) {
      if (hasRisk(dengueRiskByCountry[label])) otherRisks.add("Dengue");
      if (hasRisk(yellowFeverByCountry[label])) otherRisks.add("Yellow fever");
      if (hasRisk(chikungunyaRiskByCountry[label])) otherRisks.add("Chikungunya");
    }
  });

  const vaccineCount = vaccineSet.size;

  const malariaLabel = malariaCount === 0 ? "Malaria" : "Malaria risk";
  const malariaValue =
    malariaCount === 0
      ? "No risk in your destinations"
      : `in ${malariaCount} of ${n} ${n === 1 ? "country" : "countries"}`;

  const otherRisksList = Array.from(otherRisks);
  const otherValue =
    otherRisksList.length === 0
      ? "None flagged for your trip"
      : otherRisksList.join(", ");

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="trip-row">
      {/* ── Zone 1: destinations ──────────────────────────────────────── */}
      <div className="trip-zone">
        <div className="trip-zone-head">
          <span className="trip-zone-num">1</span>
          <span className="trip-zone-title">Your destinations</span>
          {!isEmpty && (
            <button
              type="button"
              className="trip-zone-clear"
              onClick={onClearAll}
              aria-label="Clear all destinations"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
              Clear
            </button>
          )}
        </div>

        {isEmpty ? (
          <div className="trip-zone-empty">
            <div className="trip-zone-empty-icon">
              <GlobeIcon />
            </div>
            <p className="trip-hint">
              Search above or click the globe to add the countries you&apos;ll
              visit.
            </p>
          </div>
        ) : (
          <div>
            {selectedCountries.map((slug) => {
              const meta = SUPPORTED_COUNTRIES[slug];
              if (!meta) return null;
              return (
                <div key={slug} className="trip-country-row">
                  <span className="trip-country-flag">{meta.flag}</span>
                  <span className="trip-country-name">{meta.label}</span>
                  <button
                    type="button"
                    className="trip-country-x"
                    onClick={() => onRemoveCountry(slug)}
                    aria-label={`Remove ${meta.label}`}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Zone 2: quick recommendations ─────────────────────────────── */}
      <div className="trip-zone">
        <div className="trip-zone-head">
          <span className="trip-zone-num">2</span>
          <span className="trip-zone-title">Quick recommendations</span>
        </div>

        {isEmpty ? (
          <div className="trip-zone-empty">
            <div className="trip-zone-empty-icon">
              <ChecklistIcon />
            </div>
            <p className="trip-hint">
              Vaccines, malaria risk and other health risks for your trip
              appear here.
            </p>
          </div>
        ) : (
          <div>
            <div className="trip-rec-row">
              <span className="trip-rec-ico">💉</span>
              <span className="trip-rec-txt">
                <span className="trip-rec-l">
                  {vaccineCount} {vaccineCount === 1 ? "vaccine" : "vaccines"}
                </span>
                <span className="trip-rec-v">recommended for your trip</span>
              </span>
            </div>
            <div className="trip-rec-row">
              <span className="trip-rec-ico">🦟</span>
              <span className="trip-rec-txt">
                <span className="trip-rec-l">{malariaLabel}</span>
                <span className="trip-rec-v">{malariaValue}</span>
              </span>
            </div>
            <div className="trip-rec-row">
              <span className="trip-rec-ico">📋</span>
              <span className="trip-rec-txt">
                <span className="trip-rec-l">Other risks</span>
                <span className="trip-rec-v">{otherValue}</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── Zone 3: GO badge ──────────────────────────────────────────── */}
      {isEmpty ? (
        <div className="trip-go dimmed" aria-hidden="true">
          <span className="trip-go-label">GO</span>
          <ArrowIcon />
        </div>
      ) : (
        <button
          type="button"
          className="trip-go"
          onClick={onGo}
          aria-label="View full itinerary"
        >
          <span className="trip-go-label">GO</span>
          <ArrowIcon />
        </button>
      )}
    </div>
  );
}
