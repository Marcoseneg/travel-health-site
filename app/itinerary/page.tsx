import { redirect } from "next/navigation";
import Link from "next/link";
import {
  SUPPORTED_COUNTRIES,
  type CountrySlug,
} from "../lib/travelData";
import { countries as healthData, type CountryInfo } from "../../data/countries";
import { malariaRiskByCountry } from "../lib/malariaData";
import { yellowFeverByCountry } from "../lib/yellowFeverData";
import { dengueRiskByCountry } from "../lib/dengueData";
import { chikungunyaRiskByCountry } from "../lib/chikungunyaData";

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

const BADGE_MAP: Record<string, RiskBadge> = {
  high: { label: "High", color: "#fca5a5", background: "rgba(239,68,68,0.14)", border: "rgba(239,68,68,0.3)", weight: 4 },
  required: { label: "Required", color: "#fcd34d", background: "rgba(234,179,8,0.14)", border: "rgba(234,179,8,0.3)", weight: 4 },
  "required-or-recommended": { label: "Required / recommended", color: "#fcd34d", background: "rgba(234,179,8,0.14)", border: "rgba(234,179,8,0.3)", weight: 4 },
  moderate: { label: "Moderate", color: "#fbbf24", background: "rgba(245,158,11,0.14)", border: "rgba(245,158,11,0.28)", weight: 3 },
  recommended: { label: "Recommended", color: "#fcd34d", background: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.26)", weight: 3 },
  present: { label: "Present", color: "#fbbf24", background: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.26)", weight: 3 },
  limited: { label: "Limited", color: "#bae6fd", background: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.24)", weight: 2 },
  possible: { label: "Possible", color: "#bae6fd", background: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.24)", weight: 2 },
  low: { label: "Low", color: "#bae6fd", background: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.2)", weight: 1 },
  sporadic: { label: "Sporadic", color: "#bae6fd", background: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.2)", weight: 1 },
  "generally-not": { label: "Not required", color: "#94a3b8", background: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.14)", weight: 0 },
  none: { label: "None", color: "#64748b", background: "rgba(100,116,139,0.06)", border: "rgba(100,116,139,0.14)", weight: 0 },
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
    .filter((x): x is Enriched => x !== null);

  // ── Empty / invalid state ────────────────────────────────────────────────
  if (enriched.length === 0) {
    return (
      <main style={pageBg}>
        <section style={{ maxWidth: "720px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 800, letterSpacing: "-0.03em", margin: "0 0 12px" }}>
            No destinations selected
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "15px", marginBottom: "28px" }}>
            Build an itinerary by selecting destinations on the homepage.
          </p>
          <Link href="/" style={primaryBtnStyle}>
            Back to homepage
          </Link>
        </section>
      </main>
    );
  }

  // ── Vaccine attribution (which countries recommend each vaccine) ─────────
  const recommendedMap: Record<string, string[]> = {};
  const considerMap: Record<string, string[]> = {};

  enriched.forEach((c) => {
    c.health?.vaccinesRecommended.forEach((v) => {
      if (!recommendedMap[v]) recommendedMap[v] = [];
      recommendedMap[v].push(c.slug);
    });
    c.health?.vaccinesConsider.forEach((v) => {
      if (!considerMap[v]) considerMap[v] = [];
      considerMap[v].push(c.slug);
    });
  });

  // If a vaccine is recommended somewhere, remove it from "consider" list
  Object.keys(recommendedMap).forEach((v) => delete considerMap[v]);

  // Sort by breadth of applicability, then alphabetically
  const recommendedList = Object.entries(recommendedMap).sort(
    (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])
  );
  const considerList = Object.entries(considerMap).sort(
    (a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0])
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
          <h1
            style={{
              fontSize: "clamp(36px, 4.5vw, 56px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              margin: "0 0 20px",
            }}
          >
            Your trip health brief
          </h1>

          {/* Country pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            {enriched.map((c) => (
              <Link
                key={c.slug}
                href={`/country/${c.slug}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 14px 6px 10px",
                  borderRadius: "999px",
                  background: "rgba(56,189,248,0.08)",
                  border: "1px solid rgba(56,189,248,0.22)",
                  color: "#bae6fd",
                  fontSize: "13px",
                  fontWeight: 600,
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: "16px", lineHeight: 1 }}>{c.flag}</span>
                {c.label}
              </Link>
            ))}
            <span style={{ fontSize: "12px", color: "#64748b", marginLeft: "6px" }}>
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
            style={{
              borderRadius: "12px",
              border: "1px solid rgba(250,204,21,0.18)",
              background: "rgba(250,204,21,0.05)",
              padding: "12px 16px",
              marginBottom: "24px",
              fontSize: "13px",
              color: "#fde68a",
              lineHeight: 1.55,
            }}
          >
            Detailed vaccine data is not yet available for {missingData.map((c) => c.label).join(", ")}.
            Risk indicators above still apply.
          </div>
        )}

        {/* ── Vaccines ────────────────────────────────────────────── */}
        <Section title="Vaccines">
          <VaccineGroup
            heading="Recommended"
            items={recommendedList}
            enriched={enriched}
            dotColor="#38bdf8"
            emptyText="No shared vaccine recommendations for this trip."
          />
          {considerList.length > 0 && (
            <div style={{ marginTop: "28px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <VaccineGroup
                heading="Consider based on region & activities"
                items={considerList}
                enriched={enriched}
                dotColor="rgba(148,163,184,0.6)"
                muted
              />
            </div>
          )}
          <p style={footnoteStyle}>
            Ensure routine immunizations (MMR, Tdap, influenza, COVID-19) are up to date before departure.
          </p>
        </Section>

        {/* ── Malaria per country ─────────────────────────────────── */}
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

        {/* ── Yellow fever per country ────────────────────────────── */}
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
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>{c.label}</div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>View full brief</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            borderRadius: "20px",
            border: "1px solid rgba(167,139,250,0.18)",
            background: "linear-gradient(135deg, rgba(167,139,250,0.06), rgba(56,189,248,0.03))",
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
              borderRadius: "12px",
              background: "rgba(167,139,250,0.12)",
              border: "1px solid rgba(167,139,250,0.24)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <p style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", margin: 0 }}>
                Need region-specific details?
              </p>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "2px 7px",
                  borderRadius: "4px",
                  background: "rgba(167,139,250,0.12)",
                  color: "#c4b5fd",
                  border: "1px solid rgba(167,139,250,0.22)",
                }}
              >
                Coming soon
              </span>
            </div>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: 1.55 }}>
              Tell us your exact cities, activities, and travel season — we&apos;ll refine recommendations
              based on regional malaria resistance, seasonal outbreaks, and activity-specific risks.
            </p>
          </div>
        </div>

        {/* ── Disclaimer ──────────────────────────────────────────── */}
        <p
          style={{
            fontSize: "11px",
            color: "#475569",
            textAlign: "center",
            lineHeight: 1.6,
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
  background: "#030712",
  color: "#f1f5f9",
  fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  color: "#64748b",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  margin: "0 0 8px",
};

const backLinkStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "13px",
  color: "#64748b",
  marginBottom: "24px",
  textDecoration: "none",
};

const proseStyle: React.CSSProperties = {
  fontSize: "14px",
  lineHeight: 1.65,
  color: "#cbd5e1",
  margin: 0,
};

const footnoteStyle: React.CSSProperties = {
  fontSize: "13px",
  color: "#64748b",
  marginTop: "24px",
  paddingTop: "20px",
  borderTop: "1px solid rgba(255,255,255,0.05)",
  lineHeight: 1.6,
  margin: "24px 0 0",
};

const primaryBtnStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 20px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  color: "#02131d",
  fontSize: "14px",
  fontWeight: 700,
  textDecoration: "none",
};

const destLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 14px",
  borderRadius: "12px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(255,255,255,0.06)",
  color: "#f1f5f9",
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
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        padding: compact ? "20px 24px" : "24px 28px",
        marginBottom: "16px",
      }}
    >
      <h2
        style={{
          fontSize: "17px",
          fontWeight: 700,
          letterSpacing: "-0.02em",
          margin: "0 0 18px",
          color: "#f8fafc",
        }}
      >
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
        borderRadius: "14px",
        border: `1px solid ${peak.border}`,
        background: peak.background,
        padding: "14px 16px",
      }}
    >
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#94a3b8",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          margin: "0 0 6px",
        }}
      >
        {name}
      </p>
      <p style={{ fontSize: "15px", fontWeight: 700, color: peak.color, margin: "0 0 2px" }}>
        {peak.label}
      </p>
      {count > 0 ? (
        <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
          {count} of {total} destination{total !== 1 ? "s" : ""}
        </p>
      ) : (
        <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>No risk identified</p>
      )}
    </div>
  );
}

type Enriched = {
  slug: string;
  label: string;
  flag: string;
  region: string;
  health: CountryInfo | undefined;
};

function VaccineGroup({
  heading,
  items,
  enriched,
  dotColor,
  muted,
  emptyText,
}: {
  heading: string;
  items: [string, string[]][];
  enriched: Enriched[];
  dotColor: string;
  muted?: boolean;
  emptyText?: string;
}) {
  const metaBySlug = Object.fromEntries(enriched.map((c) => [c.slug, c])) as Record<string, Enriched>;

  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#64748b",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          margin: "0 0 14px",
        }}
      >
        {heading}
      </p>
      {items.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
          {items.map(([vaccine, slugs]) => (
            <li
              key={vaccine}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: "180px" }}>
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: dotColor,
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "14.5px", color: muted ? "#cbd5e1" : "#e2e8f0", fontWeight: 500 }}>
                  {vaccine}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", flex: 1 }}>
                {slugs.map((slug) => {
                  const m = metaBySlug[slug];
                  if (!m) return null;
                  return (
                    <span
                      key={slug}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "3px 10px 3px 8px",
                        borderRadius: "999px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        fontSize: "12px",
                        color: "#cbd5e1",
                      }}
                    >
                      <span style={{ fontSize: "13px", lineHeight: 1 }}>{m.flag}</span>
                      {m.label}
                    </span>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>{emptyText ?? "None."}</p>
      )}
    </div>
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
        borderRadius: "12px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <span style={{ fontSize: "20px", lineHeight: 1 }}>{flag}</span>
        <span style={{ fontSize: "14px", fontWeight: 600, color: "#f1f5f9" }}>{label}</span>
      </div>
      <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, lineHeight: 1.55 }}>{prose}</p>
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
