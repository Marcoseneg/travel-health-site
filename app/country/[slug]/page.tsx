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
import { getAlertsForCountry } from "../../lib/countryAlerts";
import type { OutbreakAlert } from "../../lib/outbreakSources";

// ── Helper: pull disease keywords from manual country alerts ───────────────
// Used to suppress live outbreak feed alerts that duplicate a manually
// authored country banner. Extracts every word from the manual alert
// titles that's not a common stopword AND is at least 4 characters long.
// "Active polio circulation" → ["polio", "circulation"]. The live filter
// then drops feed alerts with any of these words in their title.
const ALERT_STOPWORDS = new Set([
  "active", "alert", "current", "global", "latest", "new",
  "ongoing", "recent", "update", "warning", "notice", "outbreak",
]);

function extractDiseaseKeywords(
  alerts: { title: string }[] | undefined
): string[] {
  if (!alerts || alerts.length === 0) return [];
  const words = new Set<string>();
  for (const a of alerts) {
    const tokens = a.title.toLowerCase().match(/\b[a-zà-ÿ]{4,}\b/gi) || [];
    for (const t of tokens) {
      if (!ALERT_STOPWORDS.has(t.toLowerCase())) {
        words.add(t.toLowerCase());
      }
    }
  }
  return Array.from(words);
}

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

  // Fetch live outbreak alerts that mention this country (top 3, newest first).
  // To avoid duplicating manually-authored country alerts, extract significant
  // disease keywords from any existing manual countryAlerts and pass them as
  // excludes — e.g. an "Active polio circulation" manual banner suppresses
  // live alerts with "polio" in their title.
  const manualKeywords = extractDiseaseKeywords(health?.countryAlerts ?? []);
  const outbreakAlerts = await getAlertsForCountry(slug, 3, manualKeywords);

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

        {/* ── Alerts zone — manual + live, all above the risk row ──────── */}
        {(hasAlerts || outbreakAlerts.length > 0) && (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "32px" }}>
            {/* Manual curated alerts first (yellow warning style) */}
            {hasAlerts &&
              health!.countryAlerts!.map((alert, i) => (
                <CountryAlertBanner key={`manual-${i}`} alert={alert} />
              ))}
            {/* Then live RSS-fed alerts (cyan informational style) */}
            {outbreakAlerts.length > 0 && (
              <RecentAlerts alerts={outbreakAlerts} />
            )}
          </div>
        )}

        {/* ── Risk summary row — each card LINKS to disease page ──────── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: "12px",
            marginBottom: "48px",
          }}
        >
          <RiskCard name="Malaria" diseaseSlug="malaria" badge={malaria} />
          <RiskCard name="Dengue" diseaseSlug="dengue" badge={dengue} />
          <RiskCard name="Yellow fever" diseaseSlug="yellow-fever" badge={yf} />
          <RiskCard name="Chikungunya" diseaseSlug="chikungunya" badge={chik} />
        </div>

        {hasDetailed ? (
          <>
            {/* ── Vaccines ─────────────────────────────────────────── */}
            <SectionTitle title="Vaccines" />
            {hasRichVaccines ? (
              <VaccineTable
                allTravelers={allTravelerVaccines}
                specificTravelers={specificTravelerVaccines}
              />
            ) : (
              <SimpleVaccineTable
                recommended={health!.vaccinesRecommended}
                consider={health!.vaccinesConsider}
              />
            )}
            <div style={{ marginBottom: "48px" }} />

            {/* ── Disease cards (titles are now LINKS to disease pages) ─── */}
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
                    <DiseaseCard title="Malaria" slug="malaria" badge={malaria} summary={health!.diseases!.malaria} />
                  )}
                  {health!.diseases!.yellowFever && (
                    <DiseaseCard title="Yellow fever" slug="yellow-fever" badge={yf} summary={health!.diseases!.yellowFever} />
                  )}
                  {health!.diseases!.dengue && (
                    <DiseaseCard title="Dengue" slug="dengue" badge={dengue} summary={health!.diseases!.dengue} />
                  )}
                  {health!.diseases!.chikungunya && (
                    <DiseaseCard title="Chikungunya" slug="chikungunya" badge={chik} summary={health!.diseases!.chikungunya} />
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

// ── Risk card now wraps in a Link to the disease page ──────────────────────
function RiskCard({
  name,
  diseaseSlug,
  badge,
}: {
  name: string;
  diseaseSlug: string;
  badge: RiskBadge;
}) {
  return (
    <Link
      href={`/diseases/${diseaseSlug}`}
      style={{
        display: "block",
        borderRadius: "14px",
        border: `1px solid ${badge.border}`,
        background: badge.background,
        padding: "14px 16px",
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.15s, box-shadow 0.15s",
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
      <p
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: badge.color,
          margin: 0,
          letterSpacing: "-0.01em",
        }}
      >
        {badge.label}
      </p>
    </Link>
  );
}

// ── Recent outbreak alerts (live, country-tagged) ──────────────────────────
// Shows up to 3 of the most recent outbreak alerts that mention this
// country, pulled from the same RSS aggregation that powers /outbreaks.
// Style matches the manual countryAlerts banner — cyan informational style.
function RecentAlerts({ alerts }: { alerts: OutbreakAlert[] }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "14px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#94a3b8",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Recent alerts
        </p>
        <Link
          href="/outbreaks"
          style={{
            fontSize: "12.5px",
            color: "#7dd3fc",
            textDecoration: "none",
          }}
        >
          All alerts →
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {alerts.map((alert) => {
          // Live alert source label for the inline footer line
          const sourceLabels: Record<string, string> = {
            "ecdc-epi": "ECDC Epidemiological Updates",
            "cdc-travel": "CDC Travel Health Notices",
            "who-don": "WHO Disease Outbreak News",
          };
          const sourceLabel = sourceLabels[alert.sourceId] || "Source";
          const date = new Date(alert.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });

          // Cyan/informational tone — distinct from the yellow used for
          // both risk severity (Moderate/High) and curated manual alerts.
          // Live alerts are auto-fetched updates, not severity signals or
          // hand-picked warnings, so they get their own visual lane.
          const tone = {
            color: "#7dd3fc",
            bg: "rgba(56,189,248,0.04)",
            border: "rgba(56,189,248,0.18)",
          };

          return (
            <div
              key={alert.id}
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
              {/* Info icon — informational tone (lowercase i in circle).
                  Distinct from the ⚠ used in the manual warning banner. */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={tone.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                style={{ flexShrink: 0, marginTop: "2px" }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>

              <div style={{ flex: 1, minWidth: 0 }}>
                <a
                  href={alert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 700,
                    color: tone.color,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "baseline",
                    gap: "4px",
                  }}
                >
                  {alert.title}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    style={{ flexShrink: 0, marginLeft: "2px" }}
                  >
                    <path d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </a>

                {alert.summary && (
                  <p style={{ fontSize: "13px", color: "#cbd5e1", margin: "4px 0 6px", lineHeight: 1.6 }}>
                    {alert.summary}
                  </p>
                )}

                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                  {sourceLabel} · {date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
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

// ── CDC-style vaccine table ─────────────────────────────────────────────────
// One full-width grid with three columns:
//   Vaccine name | Recommendation | External resource
// Flat (no audience grouping) — the recommendation text itself communicates
// "for all" vs "for some travelers." Mirrors CDC's pattern.
function VaccineTable({
  allTravelers,
  specificTravelers,
}: {
  allTravelers: VaccineEntry[];
  specificTravelers: VaccineEntry[];
}) {
  // Merge both audiences into a single flat list. The "audience" distinction
  // is preserved only as a styling hint (specific-traveler rows render slightly
  // muted). Sort: routine vaccines pinned to the top (matches CDC convention),
  // everything else alphabetically.
  const merged: { entry: VaccineEntry; muted: boolean }[] = [
    ...allTravelers.map((e) => ({ entry: e, muted: false })),
    ...specificTravelers.map((e) => ({ entry: e, muted: true })),
  ];
  merged.sort((a, b) => sortVaccines(a.entry.name, b.entry.name));

  if (merged.length === 0) {
    return (
      <div style={tableShellStyle}>
        <TableHeader />
        <div style={{ padding: "20px 22px", fontSize: "13px", color: "#64748b" }}>
          No specific vaccine recommendations.
        </div>
      </div>
    );
  }

  return (
    <div style={tableShellStyle}>
      <TableHeader />
      {merged.map(({ entry, muted }, i) => {
        const isLast = i === merged.length - 1;
        const isRoutineBoundary = !isLast && isRoutineRow(entry.name);
        return (
          <VaccineRow
            key={`${entry.name}-${i}`}
            entry={entry}
            isLast={isLast}
            isRoutineBoundary={isRoutineBoundary}
            muted={muted}
          />
        );
      })}
    </div>
  );
}

// Fallback table when only the simple string lists exist (no rich detail).
// Same structure as VaccineTable, just with stub entries.
function SimpleVaccineTable({
  recommended,
  consider,
}: {
  recommended: string[];
  consider: string[];
}) {
  const merged: { entry: VaccineEntry; muted: boolean }[] = [
    ...recommended.map((name) => ({ entry: { name, audience: "all" as const }, muted: false })),
    ...consider.map((name) => ({ entry: { name, audience: "specific" as const }, muted: true })),
  ];
  merged.sort((a, b) => sortVaccines(a.entry.name, b.entry.name));

  if (merged.length === 0) {
    return (
      <div style={tableShellStyle}>
        <TableHeader />
        <div style={{ padding: "20px 22px", fontSize: "13px", color: "#64748b" }}>
          No specific vaccine recommendations.
        </div>
      </div>
    );
  }

  return (
    <div style={tableShellStyle}>
      <TableHeader />
      {merged.map(({ entry, muted }, i) => {
        const isLast = i === merged.length - 1;
        const isRoutineBoundary = !isLast && isRoutineRow(entry.name);
        return (
          <VaccineRow
            key={`${entry.name}-${i}`}
            entry={entry}
            isLast={isLast}
            isRoutineBoundary={isRoutineBoundary}
            muted={muted}
          />
        );
      })}
    </div>
  );
}

// Sort comparator: pin "Routine vaccines" first (CDC convention), then alpha.
function sortVaccines(a: string, b: string): number {
  const aRoutine = a.toLowerCase().startsWith("routine");
  const bRoutine = b.toLowerCase().startsWith("routine");
  if (aRoutine && !bRoutine) return -1;
  if (bRoutine && !aRoutine) return 1;
  return a.localeCompare(b);
}

// ── Shared table shell + header ────────────────────────────────────────────
// Dark slate panel that's just slightly lighter than the page background
// (calm contrast jump). Light text on dark card — matches site visual family.
const tableShellStyle: React.CSSProperties = {
  borderRadius: "12px",
  border: "1px solid rgba(255,255,255,0.06)",
  background: "rgba(255,255,255,0.02)",
  overflow: "hidden",
};

function TableHeader() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) 1fr minmax(120px, 180px)",
        padding: "13px 22px",
        background: "rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        gap: "20px",
      }}
    >
      <span style={tableHeaderStyle}>Vaccine</span>
      <span style={tableHeaderStyle}>Recommendation</span>
      <span style={tableHeaderStyle}>Reference</span>
    </div>
  );
}

// ── External resource lookup (verified URLs) ───────────────────────────────
// One canonical external authority per vaccine. Sources verified against
// CDC Yellow Book 2024 and BAG (admin.ch). No invented URLs.
type ExternalResource = { label: string; url: string };

const EXTERNAL_RESOURCES: Record<string, ExternalResource> = {
  // Routine vaccines: Swiss schedule is the right primary reference for our
  // Swiss-traveler audience.
  "routine vaccines": {
    label: "BAG Impfplan",
    url: "https://www.bag.admin.ch/de/schweizerischer-impfplan",
  },
  "measles (mmr)": {
    label: "BAG Impfplan",
    url: "https://www.bag.admin.ch/de/schweizerischer-impfplan",
  },
  "tdap": {
    label: "BAG Impfplan",
    url: "https://www.bag.admin.ch/de/schweizerischer-impfplan",
  },
  // Travel-specific vaccines → CDC Yellow Book chapter
  "hepatitis a": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/hepatitis-a",
  },
  "hepatitis b": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/hepatitis-b",
  },
  "yellow fever": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/yellow-fever",
  },
  "typhoid": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/typhoid-and-paratyphoid-fever",
  },
  "rabies": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/rabies",
  },
  "cholera": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/cholera",
  },
  "polio": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/poliomyelitis",
  },
  "polio (booster)": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/poliomyelitis",
  },
  "meningococcal": {
    label: "CDC Yellow Book",
    url: "https://wwwnc.cdc.gov/travel/yellowbook/2024/infections-diseases/meningococcal-disease",
  },
};

// Match by case-insensitive prefix or substring; supports labels like
// "Yellow fever (entry)" → "yellow fever".
function lookupResource(name: string): ExternalResource | null {
  const lc = name.toLowerCase();
  for (const key of Object.keys(EXTERNAL_RESOURCES)) {
    if (lc === key || lc.startsWith(key) || lc.includes(key)) {
      return EXTERNAL_RESOURCES[key];
    }
  }
  return null;
}

// Routine vaccines included in the Swiss BAG schedule. Each one links
// to its own /diseases/[slug] page when one exists. Mirrors CDC's
// expanded "Routine vaccines" row pattern.
const ROUTINE_VACCINE_LIST: { name: string; slug?: string }[] = [
  { name: "Chickenpox (Varicella)", slug: "varicella" },
  { name: "Diphtheria-Tetanus-Pertussis (DTaP, Tdap)", slug: "dtap" },
  { name: "Influenza (flu)", slug: "influenza" },
  { name: "Measles-Mumps-Rubella (MMR)", slug: "measles" },
  { name: "Polio", slug: "polio" },
  { name: "COVID-19", slug: "covid-19" },
];

function isRoutineRow(name: string): boolean {
  return name.toLowerCase().startsWith("routine");
}

function VaccineRow({
  entry,
  isLast,
  isRoutineBoundary,
  muted,
}: {
  entry: VaccineEntry;
  isLast?: boolean;
  isRoutineBoundary?: boolean;
  muted?: boolean;
}) {
  const isRoutine = isRoutineRow(entry.name);
  const note =
    entry.note ||
    "Consult a travel medicine specialist for individual recommendations.";
  const resource = lookupResource(entry.name);

  // Border treatment:
  //  - Last row in table: no border
  //  - Routine row when followed by other vaccines: thicker, slightly more
  //    visible line + extra bottom padding (subtle "tier" hint, no label)
  //  - Otherwise: standard subtle divider
  const rowBorderBottom = isLast
    ? "none"
    : isRoutineBoundary
      ? "1.5px solid rgba(255,255,255,0.1)"
      : "1px solid rgba(255,255,255,0.05)";
  const paddingBottom = isRoutineBoundary ? "20px" : "14px";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) 1fr minmax(120px, 180px)",
        gap: "20px",
        padding: `14px 22px ${paddingBottom}`,
        borderBottom: rowBorderBottom,
        alignItems: isRoutine ? "flex-start" : "baseline",
      }}
    >
      {/* Column 1 — Vaccine name. Linked → cyan (brand accent); plain → light slate. */}
      <div style={{ minWidth: 0, paddingTop: isRoutine ? "2px" : 0 }}>
        {entry.slug ? (
          <Link
            href={`/diseases/${entry.slug}`}
            style={{
              fontSize: "14.5px",
              fontWeight: 600,
              color: "#7dd3fc",
              textDecoration: "underline",
              textDecorationColor: "rgba(125, 211, 252, 0.3)",
              textUnderlineOffset: "3px",
              letterSpacing: "-0.005em",
            }}
          >
            {entry.name}
          </Link>
        ) : (
          <span
            style={{
              fontSize: "14.5px",
              fontWeight: 600,
              color: muted ? "#94a3b8" : "#e2e8f0",
              letterSpacing: "-0.005em",
            }}
          >
            {entry.name}
          </span>
        )}
      </div>

      {/* Column 2 — Recommendation prose. Routine vaccines get a CDC-style
          intro line + bulleted list of included vaccines (each clickable). */}
      <div>
        {isRoutine ? (
          <>
            <p
              style={{
                fontSize: "13.5px",
                color: "#cbd5e1",
                lineHeight: 1.6,
                margin: "0 0 8px",
              }}
            >
              Make sure you are up-to-date on all routine vaccines before every
              trip — per the Swiss BAG schedule. These include:
            </p>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: "20px",
                margin: 0,
                fontSize: "13.5px",
                lineHeight: 1.7,
                color: "#cbd5e1",
              }}
            >
              {ROUTINE_VACCINE_LIST.map((v) => (
                <li key={v.name} style={{ marginBottom: "2px" }}>
                  {v.slug ? (
                    <Link
                      href={`/diseases/${v.slug}`}
                      style={{
                        color: "#7dd3fc",
                        textDecoration: "underline",
                        textDecorationColor: "rgba(125, 211, 252, 0.3)",
                        textUnderlineOffset: "3px",
                      }}
                    >
                      {v.name}
                    </Link>
                  ) : (
                    <span>{v.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p
            style={{
              fontSize: "13.5px",
              color: muted ? "#94a3b8" : "#cbd5e1",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {note}
          </p>
        )}
      </div>

      {/* Column 3 — External authoritative reference */}
      <div style={{ minWidth: 0 }}>
        {resource ? (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "12.5px",
              color: "#38bdf8",
              textDecoration: "underline",
              textDecorationColor: "rgba(56, 189, 248, 0.3)",
              textUnderlineOffset: "3px",
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "baseline",
              gap: "4px",
            }}
          >
            {resource.label}
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
          </a>
        ) : (
          <span style={{ fontSize: "12.5px", color: "#64748b" }}>—</span>
        )}
      </div>
    </div>
  );
}

const tableHeaderStyle: React.CSSProperties = {
  fontSize: "10.5px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#94a3b8",
};

// ── Disease card with title NOW WRAPPED IN A LINK ─────────────────────────
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
  const mapSrc = summary.localMapImageUrl || summary.cdcMapImageUrl;
  const hasMap = !!mapSrc;
  const hasKeyFacts = !!summary.keyFacts?.length;
  const textColumnJustify = hasMap && !hasKeyFacts ? "center" : "flex-start";

  return (
    <div
      style={{
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(255,255,255,0.02)",
        padding: "22px 24px",
      }}
    >
      {/* Header row: title + risk badge — title is now a LINK */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <Link
          href={`/diseases/${slug}`}
          style={{
            fontSize: "16px",
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.02em",
            color: "#f8fafc",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "inherit", fontWeight: "inherit", letterSpacing: "inherit", color: "inherit" }}>
            {title}
          </h3>
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#475569"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginTop: "2px" }}
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
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

      {/* Body row: text on left, map on right */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "stretch",
        }}
      >
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
          <dd style={{ margin: 0, fontSize: "13px", color: "#e2e8f0", lineHeight: 1.5 }}>
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
