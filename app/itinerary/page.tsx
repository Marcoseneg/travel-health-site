import { redirect } from "next/navigation";
import Link from "next/link";
import {
  SUPPORTED_COUNTRIES,
  type CountrySlug,
} from "../lib/travelData";
import { countries as healthData, type CountryInfo, type DiseaseSummary } from "../../data/countries";
import { malariaRiskByCountry } from "../lib/malariaData";
import { yellowFeverByCountry } from "../lib/yellowFeverData";
import { dengueRiskByCountry } from "../lib/dengueData";
import { chikungunyaRiskByCountry } from "../lib/chikungunyaData";
import CdcMapImage from "../components/CdcMapImage";

type Props = {
  searchParams: Promise<{ countries?: string }>;
};

// ── Risk badge styling (mirrors country detail page) ────────────────────────
type RiskBadge = {
  label: string;
  color: string;
  background: string;
  border: string;
  weight: number; // for sorting: higher = more severe
};

// Severity tones mapped to semantic light-theme tokens (mirrors country page):
//   high/required → danger, moderate/recommended/present → warning,
//   low/limited/possible/sporadic → info, none/generally-not → neutral.
const dangerTone = { color: "var(--c-danger)", background: "var(--c-danger-soft)", border: "var(--c-danger-border)" };
const warningTone = { color: "var(--c-warning)", background: "var(--c-warning-soft)", border: "var(--c-warning-border)" };
const infoTone = { color: "var(--c-info)", background: "var(--c-info-soft)", border: "var(--c-info-border)" };
const neutralTone = { color: "var(--c-text-3)", background: "var(--c-surface-2)", border: "var(--c-border)" };

const BADGE_MAP: Record<string, RiskBadge> = {
  high: { label: "High", ...dangerTone, weight: 4 },
  required: { label: "Required", ...dangerTone, weight: 4 },
  "required-or-recommended": { label: "Required / recommended", ...dangerTone, weight: 4 },
  moderate: { label: "Moderate", ...warningTone, weight: 3 },
  recommended: { label: "Recommended", ...warningTone, weight: 3 },
  present: { label: "Present", ...warningTone, weight: 3 },
  limited: { label: "Limited", ...infoTone, weight: 2 },
  possible: { label: "Possible", ...infoTone, weight: 2 },
  low: { label: "Low", ...infoTone, weight: 1 },
  sporadic: { label: "Sporadic", ...infoTone, weight: 1 },
  "generally-not": { label: "Not required", ...neutralTone, weight: 0 },
  none: { label: "None", ...neutralTone, weight: 0 },
};

function badge(level: string | undefined): RiskBadge {
  return BADGE_MAP[level ?? "none"] ?? BADGE_MAP.none;
}

// ── Prose helpers ───────────────────────────────────────────────────────────
function malariaProse(level: CountryInfo["malariaRisk"]): string {
  switch (level) {
    case "high":
      return "Elevated malaria risk — chemoprophylaxis is generally advised. Regimen depends on region, duration, and resistance patterns.";
    case "present":
      return "Malaria risk is present. Need for prophylaxis depends on route, duration, and travel style.";
    case "limited":
      return "Malaria risk is limited to specific regions or seasons. Region-specific assessment advised.";
    default:
      return "No significant malaria risk identified.";
  }
}

function yellowFeverProse(level: CountryInfo["yellowFever"]): string {
  switch (level) {
    case "required-or-recommended":
      return "Vaccination may be required for entry or strongly recommended, depending on the region and prior travel.";
    case "possible":
      return "Vaccination may be relevant for parts of the country — regional assessment advised.";
    default:
      return "No yellow fever vaccination requirement apparent.";
  }
}

export default async function ItineraryPage({ searchParams }: Props) {
  const { countries: countriesParam } = await searchParams;
  const selected = countriesParam ? countriesParam.split(",").filter(Boolean) : [];

  // Single-country → dedicated /country/[slug] page
  if (selected.length === 1) redirect(`/country/${selected[0]}`);

  // ── Build enriched selection list (meta + health data) ────────────────────
  type Enriched = {
    slug: string;
    label: string;
    flag: string;
    region: string;
    health: CountryInfo | undefined;
  };

  const enriched: Enriched[] = selected
    .map((slug) => {
      const meta = SUPPORTED_COUNTRIES[slug as CountrySlug];
      if (!meta) return null;
      return {
        slug,
        label: meta.label,
        flag: meta.flag,
        region: meta.region,
        health: healthData[slug],
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // ── Empty / invalid state ────────────────────────────────────────────────
  if (enriched.length === 0) {
    return (
      <main style={pageBg}>
        <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h1 className="t-h1" style={{ margin: "0 0 12px", color: "var(--c-text)" }}>
            No destinations selected
          </h1>
          <p className="t-body" style={{ color: "var(--c-text-2)", marginBottom: "28px" }}>
            Build an itinerary by selecting destinations on the homepage.
          </p>
          <Link href="/" style={primaryBtnStyle}>
            Back to homepage
          </Link>
        </section>
      </main>
    );
  }

  // ── Vaccine attribution + rich note aggregation ─────────────────────────
  // Each vaccine now collects: which countries recommend it AND each
  // country's specific note (when the country has a vaccinesDetail entry).
  // Falls back to a generic note for countries with only the simple list.
  type VaccineCountryNote = {
    slug: string;
    label: string;
    flag: string;
    note: string;
    diseaseSlug?: string; // for "About →" link, taken from vaccinesDetail
  };
  type VaccineAggregate = {
    name: string;
    diseaseSlug?: string; // for column-1 link to /diseases page
    countries: VaccineCountryNote[];
  };

  const recommendedAgg: Record<string, VaccineAggregate> = {};
  const considerAgg: Record<string, VaccineAggregate> = {};

  const fallbackNote = (audience: "all" | "specific") =>
    audience === "all"
      ? "Recommended for travelers to this destination."
      : "Consider per individual risk and stay duration.";

  enriched.forEach((c) => {
    if (!c.health) return;

    // Build a quick lookup from vaccinesDetail for this country
    const detailByName: Record<string, { note?: string; slug?: string }> = {};
    c.health.vaccinesDetail?.forEach((d) => {
      detailByName[d.name] = { note: d.note, slug: d.slug };
    });

    c.health.vaccinesRecommended.forEach((v) => {
      const detail = detailByName[v];
      if (!recommendedAgg[v]) {
        recommendedAgg[v] = { name: v, diseaseSlug: detail?.slug, countries: [] };
      }
      // Set diseaseSlug from any country that has it (first wins)
      if (!recommendedAgg[v].diseaseSlug && detail?.slug) {
        recommendedAgg[v].diseaseSlug = detail.slug;
      }
      recommendedAgg[v].countries.push({
        slug: c.slug,
        label: c.label,
        flag: c.flag,
        note: detail?.note || fallbackNote("all"),
        diseaseSlug: detail?.slug,
      });
    });

    c.health.vaccinesConsider.forEach((v) => {
      const detail = detailByName[v];
      if (!considerAgg[v]) {
        considerAgg[v] = { name: v, diseaseSlug: detail?.slug, countries: [] };
      }
      if (!considerAgg[v].diseaseSlug && detail?.slug) {
        considerAgg[v].diseaseSlug = detail.slug;
      }
      considerAgg[v].countries.push({
        slug: c.slug,
        label: c.label,
        flag: c.flag,
        note: detail?.note || fallbackNote("specific"),
        diseaseSlug: detail?.slug,
      });
    });
  });

  // If a vaccine is recommended somewhere, remove it from "consider" list
  Object.keys(recommendedAgg).forEach((v) => delete considerAgg[v]);

  // ── Vaccine classification ──────────────────────────────────────────────
  const isRoutineEntry = (vaccineName: string): boolean => {
    const lc = vaccineName.toLowerCase();
    return (
      lc.includes("routine") ||
      lc.includes("mmr") ||
      lc.includes("measles") ||
      lc.includes("tdap") ||
      lc.includes("dtap") ||
      lc.includes("diphtheria") ||
      lc.includes("varicella") ||
      lc.includes("chickenpox") ||
      lc === "polio" ||
      lc.includes("influenza") ||
      lc.includes("flu (") ||
      lc.includes("covid")
    );
  };

  // Aggregate routine entries into one virtual row (any country triggers it)
  const routineCountriesSet = new Set<string>();
  const tripSpecificList: VaccineAggregate[] = [];

  Object.values(recommendedAgg).forEach((agg) => {
    if (isRoutineEntry(agg.name)) {
      agg.countries.forEach((c) => routineCountriesSet.add(c.slug));
    } else {
      tripSpecificList.push(agg);
    }
  });

  const hasRoutine = routineCountriesSet.size > 0;

  // Sort: alphabetical (matches CDC convention)
  tripSpecificList.sort((a, b) => a.name.localeCompare(b.name));
  const considerList: VaccineAggregate[] = Object.values(considerAgg).sort(
    (a, b) => a.name.localeCompare(b.name)
  );

  // ── Per-country disease breakdowns (for malaria + YF sections) ───────────
  const malariaBreakdown = enriched
    .map((c) => ({ ...c, b: badge(malariaRiskByCountry[c.label]) }))
    .filter((c) => c.b.weight > 0)
    .sort((a, b) => b.b.weight - a.b.weight);

  const yfBreakdown = enriched
    .map((c) => ({ ...c, b: badge(yellowFeverByCountry[c.label]) }))
    .filter((c) => c.b.weight > 0)
    .sort((a, b) => b.b.weight - a.b.weight);

  // ── Peak-risk row at top ──────────────────────────────────────────────────
  const peakRisk = (lookup: Record<string, string>) => {
    let peak = BADGE_MAP.none;
    let count = 0;
    enriched.forEach((c) => {
      const b = badge(lookup[c.label]);
      if (b.weight > 0) count++;
      if (b.weight > peak.weight) peak = b;
    });
    return { peak, count };
  };

  const malariaPeak = peakRisk(malariaRiskByCountry);
  const denguePeak = peakRisk(dengueRiskByCountry);
  const yfPeak = peakRisk(yellowFeverByCountry);
  const chikPeak = peakRisk(chikungunyaRiskByCountry);

  const missingData = enriched.filter((c) => !c.health);

  // ── Combined disease aggregation ───────────────────────────────────────────
  // For each disease type, gather all per-country DiseaseSummary entries.
  // Used to render a single card per disease with side-by-side maps for each
  // country that has that disease. Only diseases with at least one country
  // contributing detail data are rendered.
  type DiseaseKey = "malaria" | "yellowFever" | "dengue" | "chikungunya";
  type DiseaseCountryEntry = {
    slug: string;
    label: string;
    flag: string;
    badge: RiskBadge;
    summary: DiseaseSummary;
  };

  const collectDisease = (
    key: DiseaseKey,
    riskLookup: Record<string, string>,
  ): DiseaseCountryEntry[] => {
    return enriched
      .map((c) => {
        const summary = c.health?.diseases?.[key];
        if (!summary) return null;
        return {
          slug: c.slug,
          label: c.label,
          flag: c.flag,
          badge: badge(riskLookup[c.label]),
          summary,
        };
      })
      .filter((x): x is DiseaseCountryEntry => x !== null)
      .sort((a, b) => b.badge.weight - a.badge.weight);
  };

  const combinedMalaria = collectDisease("malaria", malariaRiskByCountry);
  const combinedYF = collectDisease("yellowFever", yellowFeverByCountry);
  const combinedDengue = collectDisease("dengue", dengueRiskByCountry);
  const combinedChik = collectDisease("chikungunya", chikungunyaRiskByCountry);

  const hasAnyDiseaseDetail =
    combinedMalaria.length > 0 ||
    combinedYF.length > 0 ||
    combinedDengue.length > 0 ||
    combinedChik.length > 0;

  return (
    <main style={pageBg}>
      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* ── Back link ───────────────────────────────────────────── */}
        <Link href="/" style={backLinkStyle}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to search
        </Link>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ marginBottom: "32px" }}>
          <p style={eyebrowStyle}>Combined itinerary brief</p>
          <h1 className="t-display" style={{ margin: "0 0 20px", color: "var(--c-text)" }}>
            Your trip health brief
          </h1>

          {/* Country pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            {enriched.map((c) => (
              <Link
                key={c.slug}
                href={`/country/${c.slug}`}
                className="t-label"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px 6px 10px",
                  borderRadius: "999px",
                  background: "var(--c-accent-soft)",
                  border: "1px solid var(--c-accent-border)",
                  color: "var(--c-accent)",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "16px", lineHeight: 1 }}>{c.flag}</span>
                {c.label}
              </Link>
            ))}
            <span className="t-micro" style={{ color: "var(--c-text-3)", marginLeft: "6px", letterSpacing: "normal", textTransform: "none", fontWeight: 400 }}>
              {enriched.length} destinations
            </span>
          </div>
        </div>

        {/* ── Risk at a glance ───────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px",
            marginBottom: "40px",
          }}
        >
          <PeakRiskCard name="Malaria" peak={malariaPeak.peak} count={malariaPeak.count} total={enriched.length} />
          <PeakRiskCard name="Dengue" peak={denguePeak.peak} count={denguePeak.count} total={enriched.length} />
          <PeakRiskCard name="Yellow fever" peak={yfPeak.peak} count={yfPeak.count} total={enriched.length} />
          <PeakRiskCard name="Chikungunya" peak={chikPeak.peak} count={chikPeak.count} total={enriched.length} />
        </div>

        {/* ── Missing data notice ─────────────────────────────────── */}
        {missingData.length > 0 && (
          <div
            className="t-label"
            style={{
              borderRadius: "var(--c-radius-sm)",
              border: "1px solid var(--c-warning-border)",
              background: "var(--c-warning-soft)",
              padding: "12px 16px",
              marginBottom: "24px",
              color: "var(--c-warning)",
              lineHeight: 1.55,
            }}
          >
            Detailed vaccine data is not yet available for {missingData.map((c) => c.label).join(", ")}.
            Risk indicators above still apply.
          </div>
        )}

        {/* ── Vaccines ────────────────────────────────────────────── */}
        <Section title="Vaccines">
          {hasRoutine || tripSpecificList.length > 0 || considerList.length > 0 ? (
            <ItineraryVaccineTable
              hasRoutine={hasRoutine}
              recommended={tripSpecificList}
              consider={considerList}
            />
          ) : (
            <p className="t-label" style={{ color: "var(--c-text-3)", margin: 0 }}>
              No vaccine recommendations identified for this itinerary.
            </p>
          )}
        </Section>

        {/* ── Disease-specific guidance ────────────────────────────
            Combined cards: one per disease, with side-by-side maps for
            every country in this itinerary that has detail data.
            Falls back to the simpler text breakdown when no detail
            data exists for any country. ──────────────────────────── */}
        {hasAnyDiseaseDetail ? (
          <Section title="Disease-specific guidance">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {combinedMalaria.length > 0 && (
                <CombinedDiseaseCard
                  title="Malaria"
                  diseaseSlug="malaria"
                  entries={combinedMalaria}
                  totalCountries={enriched.length}
                />
              )}
              {combinedYF.length > 0 && (
                <CombinedDiseaseCard
                  title="Yellow fever"
                  diseaseSlug="yellow-fever"
                  entries={combinedYF}
                  totalCountries={enriched.length}
                />
              )}
              {combinedDengue.length > 0 && (
                <CombinedDiseaseCard
                  title="Dengue"
                  diseaseSlug="dengue"
                  entries={combinedDengue}
                  totalCountries={enriched.length}
                />
              )}
              {combinedChik.length > 0 && (
                <CombinedDiseaseCard
                  title="Chikungunya"
                  diseaseSlug="chikungunya"
                  entries={combinedChik}
                  totalCountries={enriched.length}
                />
              )}
            </div>
          </Section>
        ) : (
          // Fallback: when none of the selected countries has detailed
          // disease data yet, show the lightweight per-country text rows.
          <>
            <Section title="Malaria">
              {malariaBreakdown.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {malariaBreakdown.map((c) => (
                    <PerCountryRow
                      key={c.slug}
                      flag={c.flag}
                      label={c.label}
                      badge={c.b}
                      prose={c.health ? malariaProse(c.health.malariaRisk) : "Risk indicator only — detailed guidance coming soon."}
                    />
                  ))}
                </div>
              ) : (
                <p style={proseStyle}>No significant malaria risk identified across this itinerary.</p>
              )}
            </Section>

            <Section title="Yellow fever">
              {yfBreakdown.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {yfBreakdown.map((c) => (
                    <PerCountryRow
                      key={c.slug}
                      flag={c.flag}
                      label={c.label}
                      badge={c.b}
                      prose={c.health ? yellowFeverProse(c.health.yellowFever) : "Risk indicator only — detailed guidance coming soon."}
                    />
                  ))}
                  <p style={{ ...footnoteStyle, margin: "4px 0 0" }}>
                    Entry requirements may also depend on transit and prior stay in endemic areas.
                  </p>
                </div>
              ) : (
                <p style={proseStyle}>No yellow fever vaccination requirement apparent for this itinerary.</p>
              )}
            </Section>
          </>
        )}

        {/* ── Food/Water + Mosquito (aggregate, apply broadly) ────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <Section title="Food &amp; water" compact>
            <p style={proseStyle}>
              Food and water precautions are relevant across this itinerary — especially to reduce the risk of
              traveler&apos;s diarrhea. Avoid tap water, ice, and undercooked foods in destinations without
              reliable sanitation infrastructure.
            </p>
          </Section>
          <Section title="Mosquito protection" compact>
            <p style={proseStyle}>
              Strong mosquito protection applies across this itinerary. Use DEET-based repellents, wear long
              sleeves at dusk, and consider permethrin-treated clothing in destinations with mosquito-borne
              disease risk.
            </p>
          </Section>
        </div>

        {/* ── Destination-specific briefs ─────────────────────────── */}
        <Section title="Per-destination briefs">
          <p style={{ ...proseStyle, marginBottom: "16px" }}>
            For region-specific details, activity-based recommendations, and full prose, view the individual
            country brief:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "8px",
            }}
          >
            {enriched.map((c) => (
              <Link
                key={c.slug}
                href={`/country/${c.slug}`}
                style={destLinkStyle}
              >
                <span style={{ fontSize: "20px" }}>{c.flag}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--c-text)" }}>{c.label}</div>
                  <div style={{ fontSize: "12px", color: "var(--c-text-3)" }}>View full brief</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        </Section>

        {/* ── AI placeholder for future regional detail ───────────── */}
        <div
          style={{
            position: "relative",
            borderRadius: "var(--c-radius-lg)",
            border: "1px solid var(--c-accent-border)",
            background: "linear-gradient(135deg, var(--c-accent-soft), var(--c-surface))",
            padding: "24px 28px",
            marginBottom: "32px",
            display: "flex",
            gap: "18px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flexShrink: 0,
              width: "44px",
              height: "44px",
              borderRadius: "var(--c-radius-sm)",
              background: "var(--c-accent-soft)",
              border: "1px solid var(--c-accent-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <p className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)", margin: 0 }}>
                Need region-specific details?
              </p>
              <span
                className="t-micro"
                style={{
                  padding: "2px 7px",
                  borderRadius: "var(--c-radius-sm)",
                  background: "var(--c-accent-soft)",
                  color: "var(--c-accent)",
                  border: "1px solid var(--c-accent-border)",
                }}
              >
                Coming soon
              </span>
            </div>
            <p className="t-label" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.55 }}>
              Tell us your exact cities, activities, and travel season — we&apos;ll refine recommendations
              based on regional malaria resistance, seasonal outbreaks, and activity-specific risks.
            </p>
          </div>
        </div>

        {/* ── Disclaimer ──────────────────────────────────────────── */}
        <p
          className="t-micro"
          style={{
            color: "var(--c-text-3)",
            textAlign: "center",
            lineHeight: 1.6,
            letterSpacing: "normal",
            textTransform: "none",
            fontWeight: 400,
          }}
        >
          This brief is for informational purposes and does not replace personalized medical advice.
          <br />
          Consult a travel medicine specialist 4–8 weeks before departure.
        </p>
      </section>
    </main>
  );
}

// ── Shared styles ───────────────────────────────────────────────────────────
const pageBg: React.CSSProperties = {
  minHeight: "100vh",
  background: "var(--c-bg)",
  color: "var(--c-text)",
  fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  color: "var(--c-text-3)",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  margin: "0 0 8px",
};

const backLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  color: "var(--c-text-3)",
  marginBottom: "24px",
  textDecoration: "none",
};

const proseStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.65,
  color: "var(--c-text-2)",
  margin: 0,
};

const footnoteStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "var(--c-text-3)",
  marginTop: "24px",
  paddingTop: "20px",
  borderTop: "1px solid var(--c-border)",
  lineHeight: 1.6,
  margin: "24px 0 0",
};

const primaryBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 20px",
  borderRadius: "var(--c-radius-sm)",
  background: "var(--c-accent)",
  color: "var(--c-on-accent)",
  fontSize: "14px",
  fontWeight: 700,
  textDecoration: "none",
};

const destLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 14px",
  borderRadius: "var(--c-radius-sm)",
  background: "var(--c-surface)",
  border: "1px solid var(--c-border)",
  color: "var(--c-text)",
  textDecoration: "none",
  transition: "all 0.15s",
};

// ── Sub-components ──────────────────────────────────────────────────────────
function Section({
  title,
  children,
  compact,
}: {
  title: string;
  children: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--c-radius-md)",
        border: "1px solid var(--c-border)",
        background: "var(--c-surface)",
        padding: compact ? "20px 24px" : "24px 28px",
        marginBottom: "16px",
      }}
    >
      <h2 className="t-h3" style={{ margin: "0 0 18px", color: "var(--c-text)", fontWeight: 700 }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

function PeakRiskCard({
  name,
  peak,
  count,
  total,
}: {
  name: string;
  peak: RiskBadge;
  count: number;
  total: number;
}) {
  return (
    <div
      style={{
        borderRadius: "var(--c-radius-md)",
        border: `1px solid ${peak.border}`,
        background: peak.background,
        padding: "14px 16px",
      }}
    >
      <p className="t-micro" style={{ color: "var(--c-text-2)", margin: "0 0 6px" }}>
        {name}
      </p>
      <p style={{ fontSize: "15px", fontWeight: 700, color: peak.color, margin: "0 0 2px" }}>
        {peak.label}
      </p>
      {count > 0 ? (
        <p style={{ fontSize: "11px", color: "var(--c-text-3)", margin: 0 }}>
          {count} of {total} destination{total !== 1 ? "s" : ""}
        </p>
      ) : (
        <p style={{ fontSize: "11px", color: "var(--c-text-3)", margin: 0 }}>No risk identified</p>
      )}
    </div>
  );
}

// ── Itinerary vaccine table ─────────────────────────────────────────────────
// Slate reference card on dark page (matches country page style).
// Three columns: Vaccine | Recommendation (per-country, merged when notes
// match) | Reference (canonical external source).
// Routine vaccines pinned first with subtle separator before the rest.

const ROUTINE_VACCINE_LIST: { name: string; slug?: string }[] = [
  { name: "Chickenpox (Varicella)", slug: "varicella" },
  { name: "Diphtheria-Tetanus-Pertussis (DTaP, Tdap)", slug: "dtap" },
  { name: "Influenza (flu)", slug: "influenza" },
  { name: "Measles-Mumps-Rubella (MMR)", slug: "measles" },
  { name: "Polio", slug: "polio" },
  { name: "COVID-19", slug: "covid-19" },
];

type ExternalResource = { label: string; url: string };

const EXTERNAL_RESOURCES: Record<string, ExternalResource> = {
  "routine vaccines": { label: "BAG Impfplan", url: "https://www.bag.admin.ch/de/schweizerischer-impfplan" },
  "measles (mmr)":    { label: "BAG Impfplan", url: "https://www.bag.admin.ch/de/schweizerischer-impfplan" },
  "tdap":             { label: "BAG Impfplan", url: "https://www.bag.admin.ch/de/schweizerischer-impfplan" },
  "hepatitis a":      { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/hepatitis-a" },
  "hepatitis b":      { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/hepatitis-b" },
  "yellow fever":     { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/yellow-fever" },
  "typhoid":          { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/typhoid-and-paratyphoid-fever" },
  "rabies":           { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/rabies" },
  "cholera":          { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/cholera" },
  "polio":            { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/poliomyelitis" },
  "polio (booster)":  { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/poliomyelitis" },
  "meningococcal":    { label: "CDC Yellow Book", url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/meningococcal-disease" },
};

function lookupItineraryResource(name: string): ExternalResource | null {
  const lc = name.toLowerCase();
  for (const key of Object.keys(EXTERNAL_RESOURCES)) {
    if (lc === key || lc.startsWith(key) || lc.includes(key)) {
      return EXTERNAL_RESOURCES[key];
    }
  }
  return null;
}

const itineraryTableShellStyle: React.CSSProperties = {
  borderRadius: "var(--c-radius-md)",
  border: "1px solid var(--c-border)",
  background: "var(--c-surface)",
  overflow: "hidden",
};

const itineraryTableHeaderStyle: React.CSSProperties = {
  fontSize: "10.5px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--c-text-2)",
};

type AggregatedVaccine = {
  name: string;
  diseaseSlug?: string;
  countries: { slug: string; label: string; flag: string; note: string; diseaseSlug?: string }[];
};

function ItineraryVaccineTable({
  hasRoutine,
  recommended,
  consider,
}: {
  hasRoutine: boolean;
  recommended: AggregatedVaccine[];
  consider: AggregatedVaccine[];
}) {
  // Build the unified row list. Routine first (synthetic row), then alpha
  // recommended, then alpha consider.
  type Row =
    | { kind: "routine" }
    | { kind: "vaccine"; vaccine: AggregatedVaccine; muted: boolean };

  const rows: Row[] = [];
  if (hasRoutine) rows.push({ kind: "routine" });
  recommended.forEach((v) => rows.push({ kind: "vaccine", vaccine: v, muted: false }));
  consider.forEach((v) => rows.push({ kind: "vaccine", vaccine: v, muted: true }));

  return (
    <div style={itineraryTableShellStyle}>
      <ItineraryTableHeader />
      {rows.map((row, i) => {
        const isLast = i === rows.length - 1;
        const isRoutineBoundary = !isLast && row.kind === "routine";
        if (row.kind === "routine") {
          return (
            <ItineraryRoutineRow
              key="routine"
              isLast={isLast}
              isRoutineBoundary={isRoutineBoundary}
            />
          );
        }
        return (
          <ItineraryVaccineRow
            key={`${row.vaccine.name}-${i}`}
            vaccine={row.vaccine}
            muted={row.muted}
            isLast={isLast}
          />
        );
      })}
    </div>
  );
}

function ItineraryTableHeader() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) 1fr minmax(120px, 180px)",
        padding: "13px 22px",
        background: "var(--c-surface-2)",
        borderBottom: "1px solid var(--c-border)",
        gap: "20px",
      }}
    >
      <span style={itineraryTableHeaderStyle}>Vaccine</span>
      <span style={itineraryTableHeaderStyle}>Recommendation</span>
      <span style={itineraryTableHeaderStyle}>Reference</span>
    </div>
  );
}

function ItineraryRoutineRow({
  isLast,
  isRoutineBoundary,
}: {
  isLast: boolean;
  isRoutineBoundary: boolean;
}) {
  const resource = lookupItineraryResource("routine vaccines");
  const rowBorderBottom = isLast
    ? "none"
    : isRoutineBoundary
      ? "1.5px solid var(--c-border-strong)"
      : "1px solid var(--c-border)";
  const paddingBottom = isRoutineBoundary ? "20px" : "14px";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) 1fr minmax(120px, 180px)",
        gap: "20px",
        padding: `14px 22px ${paddingBottom}`,
        borderBottom: rowBorderBottom,
        alignItems: "flex-start",
      }}
    >
      <div style={{ minWidth: 0, paddingTop: "2px" }}>
        <span style={{ fontSize: "14.5px", fontWeight: 600, color: "var(--c-text)", letterSpacing: "-0.005em" }}>
          Routine vaccines
        </span>
      </div>
      <div>
        <p style={{ fontSize: "13.5px", color: "var(--c-text-2)", lineHeight: 1.6, margin: "0 0 8px" }}>
          Make sure you are up-to-date on all routine vaccines before every trip
          — per the Swiss BAG schedule. These include:
        </p>
        <ul style={{ listStyle: "disc", paddingLeft: "20px", margin: 0, fontSize: "13.5px", lineHeight: 1.7, color: "var(--c-text-2)" }}>
          {ROUTINE_VACCINE_LIST.map((v) => (
            <li key={v.name} style={{ marginBottom: "2px" }}>
              {v.slug ? (
                <Link href={`/diseases/${v.slug}`} style={routineLinkStyle}>
                  {v.name}
                </Link>
              ) : (
                <span>{v.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ minWidth: 0 }}>
        {resource && (
          <a href={resource.url} target="_blank" rel="noopener noreferrer" style={refLinkStyle}>
            {resource.label}
            <ExternalArrow />
          </a>
        )}
      </div>
    </div>
  );
}

function ItineraryVaccineRow({
  vaccine,
  muted,
  isLast,
}: {
  vaccine: AggregatedVaccine;
  muted: boolean;
  isLast: boolean;
}) {
  const resource = lookupItineraryResource(vaccine.name);

  // Group identical notes together so the same sentence isn't shown twice
  // when both countries got the same fallback or matching detail.
  const groups: { note: string; flags: { slug: string; label: string; flag: string }[] }[] = [];
  vaccine.countries.forEach((c) => {
    const existing = groups.find((g) => g.note === c.note);
    if (existing) {
      existing.flags.push({ slug: c.slug, label: c.label, flag: c.flag });
    } else {
      groups.push({ note: c.note, flags: [{ slug: c.slug, label: c.label, flag: c.flag }] });
    }
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) 1fr minmax(120px, 180px)",
        gap: "20px",
        padding: "14px 22px",
        borderBottom: isLast ? "none" : "1px solid var(--c-border)",
        alignItems: "baseline",
      }}
    >
      {/* Column 1 — Vaccine name. Linked to /diseases/[slug] when known. */}
      <div style={{ minWidth: 0 }}>
        {vaccine.diseaseSlug ? (
          <Link href={`/diseases/${vaccine.diseaseSlug}`} style={vaccineNameLinkStyle}>
            {vaccine.name}
          </Link>
        ) : (
          <span
            style={{
              fontSize: "14.5px",
              fontWeight: 600,
              color: muted ? "var(--c-text-2)" : "var(--c-text)",
              letterSpacing: "-0.005em",
            }}
          >
            {vaccine.name}
          </span>
        )}
      </div>

      {/* Column 2 — One paragraph per group of countries with matching notes.
          Country flags appear inline at the end of each paragraph. */}
      <div>
        {groups.map((g, gi) => (
          <p
            key={gi}
            style={{
              fontSize: "13.5px",
              color: muted ? "var(--c-text-3)" : "var(--c-text-2)",
              lineHeight: 1.6,
              margin: gi === 0 ? "0" : "8px 0 0",
            }}
          >
            {g.note}
            {g.flags.length > 0 && (
              <span style={{ marginLeft: "8px", display: "inline-flex", gap: "4px", verticalAlign: "baseline" }}>
                {g.flags.map((f) => (
                  <span
                    key={f.slug}
                    title={f.label}
                    aria-label={`Applies to ${f.label}`}
                    style={{ fontSize: "14px", lineHeight: 1, cursor: "help" }}
                  >
                    {f.flag}
                  </span>
                ))}
              </span>
            )}
          </p>
        ))}
      </div>

      {/* Column 3 — External reference */}
      <div style={{ minWidth: 0 }}>
        {resource ? (
          <a href={resource.url} target="_blank" rel="noopener noreferrer" style={refLinkStyle}>
            {resource.label}
            <ExternalArrow />
          </a>
        ) : (
          <span style={{ fontSize: "12.5px", color: "var(--c-text-3)" }}>—</span>
        )}
      </div>
    </div>
  );
}

const vaccineNameLinkStyle: React.CSSProperties = {
  fontSize: "14.5px",
  fontWeight: 600,
  color: "var(--c-accent)",
  textDecoration: "underline",
  textDecorationColor: "var(--c-accent-border)",
  textUnderlineOffset: "3px",
  letterSpacing: "-0.005em",
};

const routineLinkStyle: React.CSSProperties = {
  color: "var(--c-accent)",
  textDecoration: "underline",
  textDecorationColor: "var(--c-accent-border)",
  textUnderlineOffset: "3px",
};

const refLinkStyle: React.CSSProperties = {
  fontSize: "12.5px",
  color: "var(--c-accent)",
  textDecoration: "underline",
  textDecorationColor: "var(--c-accent-border)",
  textUnderlineOffset: "3px",
  fontWeight: 500,
  display: "inline-flex",
  alignItems: "baseline",
  gap: "4px",
};

function ExternalArrow() {
  return (
    <svg
      width="9"
      height="9"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function PerCountryRow({
  flag,
  label,
  badge,
  prose,
}: {
  flag: string;
  label: string;
  badge: RiskBadge;
  prose: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: "14px",
        padding: "12px 14px",
        borderRadius: "var(--c-radius-sm)",
        background: "var(--c-surface-2)",
        border: "1px solid var(--c-border)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <span style={{ fontSize: "20px", lineHeight: 1 }}>{flag}</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "var(--c-text)" }}>{label}</span>
      </div>
      <p style={{ fontSize: "13px", color: "var(--c-text-2)", margin: 0, lineHeight: 1.55 }}>{prose}</p>
      <span
        style={{
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.04em",
          padding: "3px 10px",
          borderRadius: "999px",
          color: badge.color,
          background: badge.background,
          border: `1px solid ${badge.border}`,
          whiteSpace: "nowrap",
        }}
      >
        {badge.label}
      </span>
    </div>
  );
}

// ── Combined disease card for the multi-country itinerary view ──────────────
// Shows ONE card per disease, with a small per-country panel inside the body.
// Each per-country panel has: flag, country name, risk badge, brief prose,
// and an embedded CDC map (with click-to-zoom). Falls back gracefully when
// some countries have no map URL set.
type DiseaseCountryEntry = {
  slug: string;
  label: string;
  flag: string;
  badge: RiskBadge;
  summary: DiseaseSummary;
};

function CombinedDiseaseCard({
  title,
  diseaseSlug,
  entries,
  totalCountries,
}: {
  title: string;
  diseaseSlug: string;
  entries: DiseaseCountryEntry[];
  totalCountries: number;
}) {
  // Pick the most severe badge across all entries to show in the header
  const peakBadge = entries
    .map((e) => e.badge)
    .reduce((a, b) => (b.weight > a.weight ? b : a), entries[0].badge);

  return (
    <div
      className="card-hover"
      style={{
        borderRadius: "var(--c-radius-md)",
        border: "1px solid var(--c-border)",
        background: "var(--c-surface)",
        padding: "20px 22px",
      }}
    >
      {/* Header: linkable disease title + count chip + peak risk badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href={`/diseases/${diseaseSlug}`}
            className="t-h3"
            style={{
              fontWeight: 700,
              color: "var(--c-text)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {title}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--c-text-3)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 600,
              padding: "3px 10px",
              borderRadius: "999px",
              background: "var(--c-surface-2)",
              border: "1px solid var(--c-border)",
              color: "var(--c-text-2)",
              letterSpacing: "0.02em",
            }}
          >
            {entries.length} of {totalCountries} {totalCountries === 1 ? "destination" : "destinations"}
          </span>
        </div>
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "3px 10px",
            borderRadius: "999px",
            color: peakBadge.color,
            background: peakBadge.background,
            border: `1px solid ${peakBadge.border}`,
            textTransform: "uppercase",
          }}
        >
          {peakBadge.label}
        </span>
      </div>

      {/* Per-country panels — flex-wrap so they sit side by side on wide
          screens and stack on narrow ones. */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "14px",
        }}
      >
        {entries.map((e) => {
          const mapSrc = e.summary.localMapImageUrl || e.summary.cdcMapImageUrl;
          return (
            <div
              key={e.slug}
              style={{
                flex: "1 1 280px",
                minWidth: "240px",
                maxWidth: "360px",
                borderRadius: "var(--c-radius-sm)",
                background: "var(--c-surface-2)",
                border: "1px solid var(--c-border)",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {/* Country header: flag + name + per-country badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                }}
              >
                <Link
                  href={`/country/${e.slug}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--c-text)",
                    textDecoration: "none",
                    minWidth: 0,
                  }}
                >
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>{e.flag}</span>
                  <span style={{ fontSize: "13.5px", fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {e.label}
                  </span>
                </Link>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "2px 7px",
                    borderRadius: "999px",
                    color: e.badge.color,
                    background: e.badge.background,
                    border: `1px solid ${e.badge.border}`,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {e.badge.label}
                </span>
              </div>

              {/* Risk summary prose - kept short */}
              <p
                style={{
                  fontSize: "12.5px",
                  color: "var(--c-text-2)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {e.summary.riskSummary}
              </p>

              {/* Embedded map (if available - fails silently if URL broken) */}
              {mapSrc && (
                <CdcMapImage
                  src={mapSrc}
                  alt={`${title} risk map for ${e.label}`}
                  caption={e.summary.mapCaption}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
