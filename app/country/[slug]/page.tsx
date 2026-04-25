import { notFound } from "next/navigation";
import Link from "next/link";
import { SUPPORTED_COUNTRIES, type CountrySlug } from "../../lib/travelData";
import {
  countries as healthData,
  type CountryInfo,
  type VaccineEntry,
  type DiseaseSummary,
  type CountryAlert,
  type KeyFact,
} from "../../../data/countries";
import { malariaRiskByCountry } from "../../lib/malariaData";
import { yellowFeverByCountry } from "../../lib/yellowFeverData";
import { dengueRiskByCountry } from "../../lib/dengueData";
import { chikungunyaRiskByCountry } from "../../lib/chikungunyaData";
import CdcMapImage from "../../components/CdcMapImage";

// ── Risk badge presentation ─────────────────────────────────────────────────
type RiskBadge = {
  label: string;
  color: string;
  background: string;
  border: string;
};

function riskBadge(level: string | undefined): RiskBadge {
  const map: Record<string, RiskBadge> = {
    high: { label: "High", color: "#fca5a5", background: "rgba(239,68,68,0.14)", border: "rgba(239,68,68,0.3)" },
    required: { label: "Required", color: "#fcd34d", background: "rgba(234,179,8,0.14)", border: "rgba(234,179,8,0.3)" },
    "required-or-recommended": { label: "Required / recommended", color: "#fcd34d", background: "rgba(234,179,8,0.14)", border: "rgba(234,179,8,0.3)" },
    moderate: { label: "Moderate", color: "#fbbf24", background: "rgba(245,158,11,0.14)", border: "rgba(245,158,11,0.28)" },
    recommended: { label: "Recommended", color: "#fcd34d", background: "rgba(234,179,8,0.12)", border: "rgba(234,179,8,0.26)" },
    present: { label: "Present", color: "#fbbf24", background: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.26)" },
    limited: { label: "Limited", color: "#bae6fd", background: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.24)" },
    possible: { label: "Possible", color: "#bae6fd", background: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.24)" },
    low: { label: "Low", color: "#bae6fd", background: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.2)" },
    sporadic: { label: "Sporadic", color: "#bae6fd", background: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.2)" },
    "generally-not": { label: "Not required", color: "#94a3b8", background: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.14)" },
    none: { label: "None", color: "#64748b", background: "rgba(100,116,139,0.06)", border: "rgba(100,116,139,0.14)" },
  };
  return map[level ?? "none"] ?? map.none;
}

// ── Static generation ───────────────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(SUPPORTED_COUNTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = SUPPORTED_COUNTRIES[slug as CountrySlug];
  if (!meta) return { title: "Country not found — TravelMed" };
  return {
    title: `${meta.label} travel health brief — TravelMed`,
    description: `Physician-curated vaccine, malaria, and prevention guidance for travelers to ${meta.label}.`,
  };
}

type Props = { params: Promise<{ slug: string }> };

export default async function CountryPage({ params }: Props) {
  const { slug } = await params;
  const meta = SUPPORTED_COUNTRIES[slug as CountrySlug];
  if (!meta) notFound();

  const health: CountryInfo | undefined = healthData[slug];
  const label = meta.label;

  const malaria = riskBadge(malariaRiskByCountry[label]);
  const dengue = riskBadge(dengueRiskByCountry[label]);
  const yf = riskBadge(yellowFeverByCountry[label]);
  const chik = riskBadge(chikungunyaRiskByCountry[label]);

  const hasDetailed = !!health;
  const hasRichVaccines = !!health?.vaccinesDetail?.length;
  const hasDiseases = !!health?.diseases;
  const hasAlerts = !!health?.countryAlerts?.length;

  const allTravelerVaccines =
    health?.vaccinesDetail?.filter((v) => v.audience === "all") ?? [];
  const specificTravelerVaccines =
    health?.vaccinesDetail?.filter((v) => v.audience === "specific") ?? [];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#030712",
        color: "#f1f5f9",
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <section style={{ maxWidth: "1080px", margin: "0 auto", padding: "32px 24px 80px" }}>
        {/* ── Back link ────────────────────────────────────────────── */}
        <Link
          href="/countries"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: "#64748b",
            marginBottom: "32px",
            textDecoration: "none",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          All countries
        </Link>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "40px" }}>
          <span style={{ fontSize: "72px", lineHeight: 1, filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))" }}>
            {meta.flag}
          </span>
          <div>
            <h1 style={{ fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, margin: "0 0 10px" }}>
              {label}
            </h1>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0, letterSpacing: "0.02em" }}>
              {meta.region} &middot; {meta.continent} &middot; Physician brief
            </p>
          </div>
        </div>

        {/* ── Country alerts ────────────────────────────────────────── */}
        {hasAlerts && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
            {health!.countryAlerts!.map((alert, i) => (
              <CountryAlertBanner key={i} alert={alert} />
            ))}
          </div>
        )}

        {/* ── Risk summary row ────────────────────────────────────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <RiskCard name="Malaria" badge={malaria} />
          <RiskCard name="Dengue" badge={dengue} />
          <RiskCard name="Yellow fever" badge={yf} />
          <RiskCard name="Chikungunya" badge={chik} />
        </div>

        {hasDetailed ? (
          <>
            {/* ── Vaccines ─────────────────────────────────────────── */}
            <SectionTitle title="Vaccines" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "20px",
                marginBottom: "48px",
              }}
            >
              {hasRichVaccines ? (
                <>
                  <VaccineColumnRich
                    heading="For all travelers"
                    items={allTravelerVaccines}
                    accent="#38bdf8"
                  />
                  <VaccineColumnRich
                    heading="For specific travelers"
                    items={specificTravelerVaccines}
                    accent="rgba(148,163,184,0.7)"
                    muted
                  />
                </>
              ) : (
                <>
                  <VaccineColumnSimple
                    heading="Recommended"
                    items={health!.vaccinesRecommended}
                    accent="#38bdf8"
                  />
                  <VaccineColumnSimple
                    heading="Consider based on region & activities"
                    items={health!.vaccinesConsider}
                    accent="rgba(148,163,184,0.7)"
                    muted
                  />
                </>
              )}
            </div>

            {/* ── Diseases (only render those with data) ────────────────
                One per row, full-width, text-left + map-right when
                a map is available. The grid wraps on narrow viewports.   */}
            {hasDiseases && (
              <>
                <SectionTitle title="Disease-specific guidance" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginBottom: "48px",
                  }}
                >
                  {health!.diseases!.malaria && (
                    <DiseaseCard
                      title="Malaria"
                      slug="malaria"
                      badge={malaria}
                      summary={health!.diseases!.malaria}
                    />
                  )}
                  {health!.diseases!.yellowFever && (
                    <DiseaseCard
                      title="Yellow fever"
                      slug="yellow-fever"
                      badge={yf}
                      summary={health!.diseases!.yellowFever}
                    />
                  )}
                  {health!.diseases!.dengue && (
                    <DiseaseCard
                      title="Dengue"
                      slug="dengue"
                      badge={dengue}
                      summary={health!.diseases!.dengue}
                    />
                  )}
                  {health!.diseases!.chikungunya && (
                    <DiseaseCard
                      title="Chikungunya"
                      slug="chikungunya"
                      badge={chik}
                      summary={health!.diseases!.chikungunya}
                    />
                  )}
                </div>
              </>
            )}

            {/* ── General prevention ────────────────────────────── */}
            <SectionTitle title="General prevention" />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "16px",
                marginBottom: "32px",
              }}
            >
              <PreventionCard title="Food & water" body={health!.foodWater} />
              <PreventionCard title="Mosquito protection" body={health!.mosquito} />
            </div>

            {/* ── Sources footer ────────────────────────────────── */}
            <SourcesFooter cdcUrl={health?.cdcCountryUrl} />
          </>
        ) : (
          <div
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              padding: "32px",
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <p style={{ fontSize: "15px", margin: "0 0 8px", color: "#cbd5e1", fontWeight: 600 }}>
              Detailed clinical brief for {label} is coming soon.
            </p>
            <p style={{ fontSize: "13px", margin: 0, color: "#64748b" }}>
              Disease risk indicators above are already available.
            </p>
          </div>
        )}

        {/* ── Multi-country CTA ─────────────────────────────────── */}
        <div
          style={{
            borderRadius: "20px",
            border: "1px solid rgba(56,189,248,0.18)",
            background: "linear-gradient(135deg, rgba(56,189,248,0.05), rgba(14,165,233,0.02))",
            padding: "22px 26px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            marginTop: "32px",
          }}
        >
          <div>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", margin: "0 0 4px" }}>
              Visiting more than one country?
            </p>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
              Build a combined itinerary and get merged recommendations across all destinations.
            </p>
          </div>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
              color: "#02131d",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap",
              boxShadow: "0 8px 24px rgba(14,165,233,0.3)",
            }}
          >
            Plan an itinerary
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Disclaimer ────────────────────────────────────────── */}
        <p
          style={{
            fontSize: "11px",
            color: "#475569",
            marginTop: "32px",
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

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function SectionTitle({ title }: { title: string }) {
  return (
    <h2
      style={{
        fontSize: "12px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#64748b",
        margin: "0 0 16px",
      }}
    >
      {title}
    </h2>
  );
}

function RiskCard({ name, badge }: { name: string; badge: RiskBadge }) {
  return (
    <div
      style={{
        borderRadius: "14px",
        border: `1px solid ${badge.border}`,
        background: badge.background,
        padding: "14px 16px",
      }}
    >
      <p style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 6px" }}>
        {name}
      </p>
      <p style={{ fontSize: "15px", fontWeight: 700, color: badge.color, margin: 0, letterSpacing: "-0.01em" }}>
        {badge.label}
      </p>
    </div>
  );
}

function CountryAlertBanner({ alert }: { alert: CountryAlert }) {
  const tone =
    alert.level === "warning"
      ? { color: "#fca5a5", bg: "rgba(239,68,68,0.05)", border: "rgba(239,68,68,0.22)" }
      : { color: "#fbbf24", bg: "rgba(245,158,11,0.05)", border: "rgba(245,158,11,0.22)" };
  return (
    <div
      style={{
        borderRadius: "12px",
        border: `1px solid ${tone.border}`,
        background: tone.bg,
        padding: "14px 18px",
        display: "flex",
        gap: "14px",
        alignItems: "flex-start",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={tone.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "13.5px", fontWeight: 700, color: tone.color, margin: "0 0 4px" }}>{alert.title}</p>
        {alert.message && (
          <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "0 0 6px", lineHeight: 1.6 }}>{alert.message}</p>
        )}
        {(alert.source || alert.date) && (
          <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
            {alert.sourceUrl && alert.source ? (
              <a href={alert.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#7dd3fc", textDecoration: "none" }}>
                {alert.source} ↗
              </a>
            ) : (
              alert.source
            )}
            {alert.source && alert.date && " · "}
            {alert.date}
          </p>
        )}
      </div>
    </div>
  );
}

function VaccineColumnSimple({ heading, items, accent, muted }: { heading: string; items: string[]; accent: string; muted?: boolean }) {
  return (
    <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", padding: "24px 26px" }}>
      <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>
        {heading}
      </p>
      {items.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((v) => (
            <li key={v} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "14.5px", color: muted ? "#cbd5e1" : "#e2e8f0" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
              {v}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>None specifically indicated.</p>
      )}
    </div>
  );
}

function VaccineColumnRich({ heading, items, accent, muted }: { heading: string; items: VaccineEntry[]; accent: string; muted?: boolean }) {
  return (
    <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", padding: "24px 26px" }}>
      <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 18px" }}>
        {heading}
      </p>
      {items.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
          {items.map((v, i) => (
            <li key={`${v.name}-${i}`}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: v.note ? "4px" : 0 }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: accent, flexShrink: 0 }} />
                {v.slug ? (
                  <Link
                    href={`/diseases/${v.slug}`}
                    style={{ fontSize: "14.5px", fontWeight: 700, color: muted ? "#cbd5e1" : "#e2e8f0", textDecoration: "none", letterSpacing: "-0.01em" }}
                  >
                    {v.name}
                  </Link>
                ) : (
                  <span style={{ fontSize: "14.5px", fontWeight: 700, color: muted ? "#cbd5e1" : "#e2e8f0", letterSpacing: "-0.01em" }}>
                    {v.name}
                  </span>
                )}
              </div>
              {v.note && (
                <p style={{ fontSize: "13px", color: "#94a3b8", margin: "0 0 0 16px", lineHeight: 1.55 }}>
                  {v.note}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>None specifically indicated.</p>
      )}
    </div>
  );
}

function DiseaseCard({
  title,
  slug,
  badge,
  summary,
}: {
  title: string;
  slug: string;
  badge: RiskBadge;
  summary: DiseaseSummary;
}) {
  // localMapImageUrl is preferred over cdcMapImageUrl.
  const mapSrc = summary.localMapImageUrl || summary.cdcMapImageUrl;
  const hasMap = !!mapSrc;
  const hasKeyFacts = !!summary.keyFacts?.length;

  // When the card has a map but NO key facts, the text column ends up much
  // shorter than the map column → big empty void on the left. Vertically
  // center the text in that case to balance the card. When facts ARE present,
  // top-align so prose flows naturally into the facts table.
  const textColumnJustify =
    hasMap && !hasKeyFacts ? "center" : "flex-start";

  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        padding: "22px 24px",
      }}
    >
      {/* Header row: title + risk badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: 700, margin: 0, letterSpacing: "-0.02em", color: "#f8fafc" }}>
          {title}
        </h3>
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            padding: "3px 10px",
            borderRadius: "999px",
            color: badge.color,
            background: badge.background,
            border: `1px solid ${badge.border}`,
            textTransform: "uppercase",
          }}
        >
          {badge.label}
        </span>
      </div>

      {/* Body row: text on left, map on right (stacks below on narrow widths). */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
        {/* Text column — fills remaining space. Vertical alignment depends on
            whether the card has a key-facts block (top-align) or not (center). */}
        <div
          style={{
            flex: "1 1 280px",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: textColumnJustify,
          }}
        >
          <p style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.65, margin: "0 0 14px" }}>
            {summary.riskSummary}
          </p>

          {hasKeyFacts && <KeyFactsBlock facts={summary.keyFacts!} />}

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              paddingTop: "12px",
              marginTop: hasKeyFacts ? "16px" : "auto",
              borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            <Link
              href={`/diseases/${slug}`}
              style={{
                fontSize: "12px",
                color: "#7dd3fc",
                textDecoration: "none",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              About {title.toLowerCase()}
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            {summary.cdcMapUrl && (
              <a
                href={summary.cdcMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "12px",
                  color: "#94a3b8",
                  textDecoration: "none",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                CDC details
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            )}
          </div>
        </div>

        {/* Map column — fixed width, stacks below text on narrow viewports
            because of flex-wrap on the parent. The CdcMapImage component
            quietly removes itself if the image fails to load, leaving the
            text column at full width. */}
        {hasMap && (
          <div
            style={{
              flex: "0 1 260px",
              minWidth: "200px",
              maxWidth: "300px",
            }}
          >
            <CdcMapImage
              src={mapSrc!}
              alt={`${title} risk map for this country`}
              caption={summary.mapCaption}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ── Key facts: small labeled-row block inside disease cards ─────────────────
// Renders as a compact two-column "label · value" table. Stays understated
// so prose remains the lead element; this is at-a-glance reference data.
function KeyFactsBlock({ facts }: { facts: KeyFact[] }) {
  return (
    <dl
      style={{
        margin: "0 0 4px",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: "16px",
        rowGap: "8px",
        padding: "14px 16px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {facts.map((f, i) => (
        <div key={i} style={{ display: "contents" }}>
          <dt
            style={{
              fontSize: "10.5px",
              fontWeight: 700,
              color: "#64748b",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              alignSelf: "center",
              whiteSpace: "nowrap",
            }}
          >
            {f.label}
          </dt>
          <dd
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#e2e8f0",
              lineHeight: 1.5,
            }}
          >
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function PreventionCard({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ borderRadius: "16px", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)", padding: "22px 24px" }}>
      <h3 style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 10px", color: "#f8fafc", letterSpacing: "-0.01em" }}>{title}</h3>
      <p style={{ fontSize: "13.5px", color: "#cbd5e1", lineHeight: 1.65, margin: 0 }}>{body}</p>
    </div>
  );
}

function SourcesFooter({ cdcUrl }: { cdcUrl?: string }) {
  return (
    <div
      style={{
        marginTop: "8px",
        marginBottom: "16px",
        padding: "16px 20px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <p style={{ fontSize: "10.5px", fontWeight: 700, color: "#475569", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 6px" }}>
        Sources
      </p>
      <p style={{ fontSize: "12.5px", color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
        Based on{" "}
        {cdcUrl ? (
          <a href={cdcUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#7dd3fc", textDecoration: "none" }}>
            CDC Travelers&rsquo; Health
          </a>
        ) : (
          "CDC Travelers' Health"
        )}
        ,{" "}
        <a href="https://www.cdc.gov/yellow-book/index.html" target="_blank" rel="noopener noreferrer" style={{ color: "#7dd3fc", textDecoration: "none" }}>
          CDC Yellow Book
        </a>
        , and the{" "}
        <a href="https://www.bag.admin.ch/bag/en/home/krankheiten/krankheiten-im-ueberblick/impfungen.html" target="_blank" rel="noopener noreferrer" style={{ color: "#7dd3fc", textDecoration: "none" }}>
          Swiss Federal Vaccination Schedule (BAG)
        </a>
        . Always verify current recommendations before travel.
      </p>
    </div>
  );
}
