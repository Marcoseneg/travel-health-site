// ─────────────────────────────────────────────────────────────────────────────
// <DiseaseRadar slug> — the "Disease Radar" 3-column dashboard. Shared by both
// the main /diseases page (with a featured default disease) and the
// /diseases/[slug] deep-link route.
//   • left   — searchable disease browser grouped by category
//   • center — header, tabs, global risk map, key-fact cards, content
//   • right  — latest evidence/insights, expert video brief, key facts,
//              related diseases
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { diseases, type DiseaseInfo, type PreventionItem } from "../lib/diseaseData";
import { DISEASE_FACTS } from "../lib/diseaseFacts";
import { hasRiskMap, destinationRows } from "../lib/diseaseRisk";
import { getDiseaseVaccine } from "../lib/vaccineData";
import { insights, INSIGHT_CATEGORY_LABELS, type Insight } from "../lib/insights";
import DiseaseLinkedText from "./DiseaseLinkedText";
import DiseaseRadarMap from "./DiseaseRadarMap";
import DiseaseLibrarySidebar, { SIDEBAR_GROUPS } from "./DiseaseLibrarySidebar";

// ── Static config ───────────────────────────────────────────────────────────

const RISK_META: Record<string, { label: string; dot: string; soft: string; text: string }> = {
  high: { label: "High", dot: "#ef4444", soft: "rgba(239,68,68,0.12)", text: "#dc2626" },
  moderate: { label: "Moderate", dot: "#f59e0b", soft: "rgba(245,158,11,0.14)", text: "#b45309" },
  low: { label: "Low", dot: "#16a34a", soft: "rgba(22,163,74,0.12)", text: "#15803d" },
};

const PREVENTION_TYPE_STYLES: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  vaccine: { icon: "💉", color: "var(--c-trust)", bg: "var(--c-trust-soft)", border: "var(--c-trust-border)" },
  prophylaxis: { icon: "💊", color: "var(--c-accent)", bg: "var(--c-accent-soft)", border: "var(--c-accent-border)" },
  behavior: { icon: "🛡️", color: "var(--c-text-2)", bg: "var(--c-surface-2)", border: "var(--c-border)" },
  "post-exposure": { icon: "🏥", color: "var(--c-warning)", bg: "var(--c-warning-soft)", border: "var(--c-warning-border)" },
};

const TABS = ["Overview", "Epidemiology", "Prevention", "Vaccines", "Clinical", "Resources"] as const;
type Tab = (typeof TABS)[number];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${Number(d)}, ${y}`;
}
function firstSentence(text: string): string {
  const m = text.match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : text).trim();
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function DiseaseRadar({ slug }: { slug: string }) {
  const d = diseases[slug];

  const [tab, setTab] = useState<Tab>("Overview");
  const [copied, setCopied] = useState(false);

  const facts = DISEASE_FACTS[slug];
  const showMap = hasRiskMap(slug);

  const relevantInsights = useMemo(() => {
    if (!d) return [];
    const key = slug.toLowerCase();
    const label = d.label.toLowerCase();
    const matched = insights.filter((i) =>
      i.tags?.some((t) => t.toLowerCase() === key || t.toLowerCase() === label)
    );
    return (matched.length ? matched : insights).slice(0, 4);
  }, [slug, d]);

  const relatedSlugs = useMemo(() => {
    const group = SIDEBAR_GROUPS.find((g) => g.slugs.includes(slug));
    return (group?.slugs.filter((s) => s !== slug && diseases[s]) ?? []).slice(0, 6);
  }, [slug]);

  if (!d) {
    return (
      <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 className="t-h2" style={{ marginBottom: "12px", color: "var(--c-text)" }}>Disease not found</h1>
          <Link href="/diseases" className="t-label" style={{ color: "var(--c-accent)", textDecoration: "underline", textUnderlineOffset: "2px" }}>← Back to all diseases</Link>
        </div>
      </main>
    );
  }

  const risk = RISK_META[d.riskLevel];
  const headerVaccine = d.vaccineAvailable ? (facts?.vaccineShort?.split(" · ")[0] ?? "Available") : "None";

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: `${d.label} — TravelMed`, url });
      else { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    } catch { /* user dismissed */ }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "28px 24px 80px" }}>
        <div className="radar-grid">

          {/* ════ LEFT — disease browser (shared component) ═════════════════ */}
          <aside className="radar-left">
            <DiseaseLibrarySidebar activeSlug={slug} />
          </aside>

          {/* ════ CENTER ════════════════════════════════════════════════════ */}
          <div style={{ minWidth: 0 }}>
            {/* Header card */}
            <div className="dr-header" style={{ display: "flex", flexWrap: "nowrap", gap: "18px", alignItems: "center", justifyContent: "space-between", padding: "20px 22px", borderRadius: "16px", background: "var(--c-surface)", border: "1px solid var(--c-border)", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", minWidth: 0, flex: 1 }}>
                <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "58px", height: "58px", borderRadius: "16px", background: risk.soft, fontSize: "30px", flexShrink: 0 }}>{d.icon}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h1 className="t-h1" style={{ margin: 0, color: "var(--c-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.label}</h1>
                  <span className="t-micro" style={{ display: "inline-block", marginTop: "6px", padding: "3px 10px", borderRadius: "999px", background: "var(--c-surface-2)", border: "1px solid var(--c-border)", color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", whiteSpace: "nowrap" }}>{d.category}</span>
                  <p className="t-body" style={{ color: "var(--c-text-2)", margin: "8px 0 0", maxWidth: "560px", lineHeight: 1.55, height: "3.2em", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {firstSentence(d.transmission)}
                  </p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "20px", flexShrink: 0 }}>
                <div>
                  <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "5px" }}>Risk to travelers</div>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "5px 11px", borderRadius: "999px", background: risk.soft }}>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: risk.dot }} />
                    <span className="t-label" style={{ color: risk.text, fontWeight: 700 }}>{risk.label}</span>
                  </span>
                </div>
                <div>
                  <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "5px" }}>Vaccine</div>
                  <div className="t-label" style={{ color: d.vaccineAvailable ? "var(--c-trust)" : "var(--c-text-3)", fontWeight: 700 }}>{headerVaccine}</div>
                </div>
                <button onClick={share} aria-label="Share" className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "8px 14px", borderRadius: "10px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text-2)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><path d="m16 6-4-4-4 4" /><path d="M12 2v13" /></svg>
                  {copied ? "Copied!" : "Share"}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--c-border)", marginBottom: "20px", overflowX: "auto" }}>
              {TABS.map((t) => {
                const active = t === tab;
                return (
                  <button key={t} onClick={() => setTab(t)} className="t-label" style={{
                    padding: "10px 14px", border: "none", background: "transparent", cursor: "pointer", fontFamily: "inherit",
                    color: active ? "var(--c-accent-strong)" : "var(--c-text-3)", fontWeight: active ? 700 : 600,
                    borderBottom: `2px solid ${active ? "var(--c-accent)" : "transparent"}`, marginBottom: "-1px", whiteSpace: "nowrap",
                  }}>{t}</button>
                );
              })}
            </div>

            {/* Tab content */}
            {tab === "Overview" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {showMap ? <DiseaseRadarMap slug={slug} /> : (
                  <Card label="Where it occurs">
                    <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
                      <DiseaseLinkedText text={d.regions} currentSlug={slug} />
                    </p>
                  </Card>
                )}

                {/* Key-fact stat cards — always the same 4 so the row height is
                    identical across diseases (burden moved to the rail). */}
                {facts && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
                    {([
                      ["🧬", "Transmission", facts.transmissionShort],
                      ["⏱️", "Incubation", facts.incubation],
                      ["📅", "Seasonality", facts.seasonality],
                      ["💉", "Vaccine", facts.vaccineShort],
                    ] as [string, string, string][]).map(([icon, label, value]) => (
                      <div key={label} style={{ padding: "14px 16px", borderRadius: "13px", background: "var(--c-surface)", border: "1px solid var(--c-border)", height: "90px", overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "7px" }}>
                          <span style={{ fontSize: "14px" }}>{icon}</span>
                          <span className="t-micro" style={{ color: "var(--c-text-3)" }}>{label}</span>
                        </div>
                        <div className="t-label" style={{ color: "var(--c-text)", fontWeight: 600, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{value}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Risk by destination — top of the highest-risk list */}
                {showMap && <RiskByDestination slug={slug} />}
              </div>
            )}

            {tab === "Epidemiology" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <Card label="How it spreads">
                  <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
                    <DiseaseLinkedText text={d.transmission} currentSlug={slug} />
                  </p>
                </Card>
                <Card label="Where it occurs">
                  <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
                    <DiseaseLinkedText text={d.regions} currentSlug={slug} />
                  </p>
                </Card>
                {showMap && <DiseaseRadarMap slug={slug} />}
              </div>
            )}

            {tab === "Prevention" && <PreventionBlock items={d.preventionDetails.filter((p) => p.type !== "vaccine")} slug={slug} empty="Prevention guidance is summarized in the disease overview." />}

            {tab === "Vaccines" && <VaccinesBlock d={d} slug={slug} />}

            {tab === "Clinical" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <Card label="Symptoms">
                  <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>{d.symptoms}</p>
                </Card>
                <Card label="Treatment">
                  <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
                    <DiseaseLinkedText text={d.treatment} currentSlug={slug} />
                  </p>
                </Card>
              </div>
            )}

            {tab === "Resources" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <Card label="Further reading">
                  {relevantInsights.length ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {relevantInsights.map((i) => <InsightRow key={i.id} insight={i} />)}
                    </div>
                  ) : <p className="t-body" style={{ color: "var(--c-text-2)", margin: 0 }}>No related insights yet.</p>}
                </Card>
                <Card label="Clinical references">
                  <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
                    Recommendations on this page follow CDC Travelers&apos; Health, WHO disease guidance, and the Swiss Expert Committee for Travel Medicine (EKRM / HealthyTravel). Always confirm current country requirements before travel.
                  </p>
                </Card>
              </div>
            )}

            {/* Travel tools */}
            <div style={{ marginTop: "26px" }}>
              <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "12px" }}>Travel tools</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "10px" }}>
                {[
                  { icon: "🧭", title: "Plan a trip", sub: "Vaccines by destination", href: "/" },
                  { icon: "🗺️", title: "Country risk map", sub: "Risks by destination", href: "/map" },
                  { icon: "📡", title: "Outbreak tracker", sub: "Live alerts", href: "/outbreaks" },
                  { icon: "📋", title: "Travel resources", sub: "Practical how-tos", href: "/resources" },
                ].map((t) => (
                  <Link key={t.title} href={t.href} data-card="lift" style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderRadius: "13px", background: "var(--c-surface)", border: "1px solid var(--c-border)", textDecoration: "none" }}>
                    <span style={{ fontSize: "20px" }}>{t.icon}</span>
                    <span style={{ minWidth: 0 }}>
                      <span className="t-label" style={{ display: "block", color: "var(--c-text)", fontWeight: 700 }}>{t.title}</span>
                      <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>{t.sub}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* ════ RIGHT — evidence rail ═════════════════════════════════════ */}
          <aside className="radar-right" style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Expert video brief (upcoming) */}
            <RailCard title="Expert video brief">
              <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--c-border)" }}>
                <div style={{ position: "relative", aspectRatio: "16 / 9", background: "linear-gradient(135deg, var(--c-accent-soft), var(--c-surface-2))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "50%", background: "var(--c-surface)", boxShadow: "0 4px 14px rgba(15,23,42,0.18)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--c-accent)" stroke="none"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                  <span className="t-micro" style={{ position: "absolute", top: "8px", right: "8px", padding: "2px 8px", borderRadius: "999px", background: "var(--c-surface)", border: "1px solid var(--c-border)", color: "var(--c-text-3)" }}>Upcoming</span>
                </div>
                <div style={{ padding: "11px 13px" }}>
                  <div className="t-label" style={{ color: "var(--c-text)", fontWeight: 700 }}>{d.label} explained in 3 minutes</div>
                  <div className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", marginTop: "3px" }}>Dr. Marco Seneghini · Travel medicine</div>
                </div>
              </div>
            </RailCard>

            {/* Key facts at a glance */}
            <RailCard title="Key facts at a glance">
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  facts && ["Transmission", facts.transmissionShort],
                  facts && ["Incubation", facts.incubation],
                  facts?.burden ? ["Global burden", facts.burden] : null,
                  ["Severity", d.riskLevel === "high" ? "Can be life-threatening — high traveler risk" : d.riskLevel === "moderate" ? "Usually self-limiting; can be serious" : "Generally mild in travelers"],
                  ["Treatment", firstSentence(d.treatment)],
                  ["Best prevention", firstSentence(d.prevention)],
                ].filter(Boolean).map((row) => {
                  const [k, v] = row as [string, string];
                  return (
                    <li key={k} style={{ display: "flex", gap: "9px" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--c-trust)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="t-label" style={{ color: "var(--c-text-2)", lineHeight: 1.5 }}>
                        <span style={{ color: "var(--c-text)", fontWeight: 700 }}>{k}: </span>{v}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </RailCard>

            {/* Related diseases */}
            {relatedSlugs.length > 0 && (
              <RailCard title="Related diseases">
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {relatedSlugs.map((s) => (
                    <Link key={s} href={`/diseases/${s}`} className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 12px", borderRadius: "999px", background: "var(--c-surface-2)", border: "1px solid var(--c-border)", color: "var(--c-text-2)", textDecoration: "none", fontWeight: 600 }}>
                      <span style={{ fontSize: "13px" }}>{diseases[s].icon}</span>{diseases[s].label}
                    </Link>
                  ))}
                </div>
              </RailCard>
            )}
          </aside>
        </div>
      </div>

      <style jsx>{`
        .radar-grid {
          display: grid;
          grid-template-columns: 232px minmax(0, 1fr) 332px;
          gap: 26px;
          align-items: start;
        }
        .radar-left { position: sticky; top: 24px; }
        @media (max-width: 1180px) {
          .radar-grid { grid-template-columns: minmax(0, 1fr) 320px; }
          .radar-left { display: none; }
        }
        @media (max-width: 860px) {
          .radar-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Card hover lift for travel-tool cards */}
      <style jsx global>{`
        @media (hover: hover) {
          [data-card="lift"] { transition: transform 200ms cubic-bezier(0.2,0.8,0.2,1), box-shadow 200ms ease, border-color 200ms ease; }
          [data-card="lift"]:hover { transform: translateY(-3px); box-shadow: 0 10px 26px rgba(8,145,178,0.12); border-color: var(--c-accent-border); }
        }
        /* Header stays a single non-wrapping row on desktop (so the map starts
           at the same Y for every disease); it stacks only on narrow screens. */
        @media (max-width: 700px) {
          .dr-header { flex-wrap: wrap !important; }
        }
      `}</style>
    </main>
  );
}

// ── Building blocks ───────────────────────────────────────────────────────────

function Card({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "20px 22px", borderRadius: "16px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
      <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "12px" }}>{label}</div>
      {children}
    </div>
  );
}

function RailCard({ title, action, children }: { title: string; action?: { label: string; href: string }; children: React.ReactNode }) {
  return (
    <div style={{ padding: "18px 18px 16px", borderRadius: "16px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", marginBottom: "14px" }}>
        <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)", fontSize: "15px" }}>{title}</div>
        {action && <Link href={action.href} className="t-micro" style={{ color: "var(--c-accent-strong)", textDecoration: "none", whiteSpace: "nowrap", textTransform: "none", letterSpacing: "normal", fontWeight: 600 }}>{action.label} →</Link>}
      </div>
      {children}
    </div>
  );
}

function InsightRow({ insight }: { insight: Insight }) {
  const cat = INSIGHT_CATEGORY_LABELS[insight.category];
  return (
    <Link href={`/insights/${insight.id}`} style={{ display: "flex", gap: "12px", textDecoration: "none" }}>
      <div style={{ width: "56px", height: "56px", borderRadius: "10px", flexShrink: 0, background: insight.coverGradient || "linear-gradient(135deg, var(--c-accent-soft), var(--c-surface-2))", backgroundSize: "cover", backgroundPosition: "center", ...(insight.coverImage ? { backgroundImage: `url(${insight.coverImage.src})` } : {}) }} />
      <div style={{ minWidth: 0 }}>
        <span className="t-micro" style={{ color: cat.color, textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 700 }}>{cat.label}</span>
        <div className="t-label" style={{ color: "var(--c-text)", fontWeight: 700, lineHeight: 1.35, margin: "2px 0 3px" }}>{insight.title}</div>
        <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>{formatDate(insight.date)} · {insight.readingTime} min</span>
      </div>
    </Link>
  );
}

function PreventionBlock({ items, slug, empty }: { items: PreventionItem[]; slug: string; empty: string }) {
  const prophylaxis = items.filter((p) => p.type === "prophylaxis");
  const others = items.filter((p) => p.type !== "prophylaxis");

  if (!items.length) {
    return <Card label="Prevention"><p className="t-body" style={{ color: "var(--c-text-2)", margin: 0 }}>{empty}</p></Card>;
  }

  return (
    <div style={{ padding: "24px 24px 26px", borderRadius: "16px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
      <div className="t-label" style={{ color: "var(--c-text)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "18px", display: "flex", alignItems: "center", gap: "8px" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        Prevention & prophylaxis
      </div>

      {prophylaxis.length > 1 && (
        <div style={{ marginBottom: "16px", display: "grid", gridTemplateColumns: `repeat(${prophylaxis.length}, 1fr)`, gap: "1px", background: "var(--c-border)", borderRadius: "14px", overflow: "hidden", border: "1px solid var(--c-border)" }}>
          {prophylaxis.map((item, i) => {
            const dosing = item.detail.match(/^(.*?)\./)?.[1] || "";
            const rest = item.detail.slice(dosing.length + 1).trim();
            return (
              <div key={i} style={{ padding: "18px 16px", background: "var(--c-surface-2)", display: "flex", flexDirection: "column", gap: "11px" }}>
                <div className="t-label" style={{ fontWeight: 700, color: "var(--c-accent)", lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--c-text)", padding: "7px 11px", borderRadius: "8px", background: "var(--c-accent-soft)", border: "1px solid var(--c-accent-border)", lineHeight: 1.5 }}>{dosing}.</div>
                <div className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.6 }}>{rest}</div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
        {(prophylaxis.length === 1 ? [...prophylaxis, ...others] : others).map((item, i) => {
          const ts = PREVENTION_TYPE_STYLES[item.type] || PREVENTION_TYPE_STYLES.behavior;
          return (
            <div key={i} style={{ display: "flex", gap: "13px", padding: "16px 18px", borderRadius: "12px", background: ts.bg, border: `1px solid ${ts.border}` }}>
              <span style={{ fontSize: "17px", flexShrink: 0 }}>{ts.icon}</span>
              <div>
                <div className="t-label" style={{ fontWeight: 700, color: ts.color, marginBottom: "5px" }}>{item.title}</div>
                <div className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.6 }}>
                  <DiseaseLinkedText text={item.detail} currentSlug={slug} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VaccinesBlock({ d, slug }: { d: DiseaseInfo; slug: string }) {
  const vx = getDiseaseVaccine(slug);
  const vaccineItems = d.preventionDetails.filter((p) => p.type === "vaccine");

  if (!vx && !vaccineItems.length) {
    return (
      <Card label="Vaccine status">
        <div style={{ display: "flex", gap: "13px", padding: "16px 18px", borderRadius: "12px", background: "var(--c-surface-2)", border: "1px solid var(--c-border)" }}>
          <span style={{ fontSize: "17px" }}>🚫</span>
          <div>
            <div className="t-label" style={{ fontWeight: 700, color: "var(--c-text)", marginBottom: "5px" }}>No vaccine available for travelers</div>
            <p className="t-body" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.6 }}>
              Prevention relies on the measures in the <strong>Prevention</strong> tab. {firstSentence(d.prevention)}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "9px", padding: "12px 16px", borderRadius: "12px", background: "var(--c-trust-soft)", border: "1px solid var(--c-trust-border)" }}>
        <span style={{ fontSize: "16px" }}>💉</span>
        <span className="t-label" style={{ color: "var(--c-trust)", fontWeight: 700 }}>Vaccine available</span>
      </div>

      {vx ? (
        <>
          {vx.summary && (
            <p className="t-body" style={{ color: "var(--c-text-2)", margin: "0 2px", lineHeight: 1.65 }}>{vx.summary}</p>
          )}

          {/* Formulation comparison — practitioner reference */}
          <div style={{ overflowX: "auto", borderRadius: "13px", border: "1px solid var(--c-border)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", minWidth: "640px" }}>
              <thead>
                <tr style={{ background: "var(--c-surface-2)" }}>
                  {["Product", "Age group", "Dose & route", "Primary", "Booster", "Protection"].map((h) => (
                    <th key={h} className="t-micro" style={{ textAlign: "left", padding: "11px 14px", color: "var(--c-text-3)", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vx.schedules.map((s, i) => (
                  <tr key={s.product} style={{ borderTop: i === 0 ? "none" : "1px solid var(--c-border)" }}>
                    <td style={{ padding: "12px 14px", fontWeight: 700, color: "var(--c-trust)", whiteSpace: "nowrap" }}>{s.product}</td>
                    <td style={{ padding: "12px 14px", color: "var(--c-text)", whiteSpace: "nowrap" }}>{s.ageGroup}</td>
                    <td style={{ padding: "12px 14px", color: "var(--c-text-2)" }}>{s.dose}</td>
                    <td style={{ padding: "12px 14px", color: "var(--c-text-2)" }}>{s.primary}</td>
                    <td style={{ padding: "12px 14px", color: "var(--c-text-2)" }}>{s.booster}</td>
                    <td style={{ padding: "12px 14px", color: "var(--c-text-2)" }}>{s.protection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Combination vaccines */}
          {vx.combos?.map((c) => (
            <div key={c.product} style={{ padding: "16px 18px", borderRadius: "13px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
              <div className="t-label" style={{ fontWeight: 700, color: "var(--c-trust)", marginBottom: "5px" }}>{c.product}</div>
              <p className="t-body" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.6 }}>{c.detail}</p>
            </div>
          ))}

          {/* Practitioner notes */}
          {vx.notes && vx.notes.length > 0 && (
            <ul style={{ listStyle: "none", margin: 0, padding: "2px 0 0", display: "flex", flexDirection: "column", gap: "9px" }}>
              {vx.notes.map((n) => (
                <li key={n} style={{ display: "flex", gap: "9px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--c-trust)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M20 6 9 17l-5-5" /></svg>
                  <span className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.55 }}>{n}</span>
                </li>
              ))}
            </ul>
          )}

          {vx.source && (
            vx.source.url ? (
              <a href={vx.source.url} target="_blank" rel="noopener noreferrer" className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                Dosing source: {vx.source.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </a>
            ) : (
              <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>Dosing source: {vx.source.label}</span>
            )
          )}
        </>
      ) : (
        vaccineItems.map((item, i) => (
          <div key={i} style={{ padding: "18px 20px", borderRadius: "13px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
            <div className="t-label" style={{ fontWeight: 700, color: "var(--c-trust)", marginBottom: "7px" }}>{item.title}</div>
            <p className="t-body" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.65 }}>
              <DiseaseLinkedText text={item.detail} currentSlug={slug} />
            </p>
          </div>
        ))
      )}
    </div>
  );
}

function RiskByDestination({ slug }: { slug: string }) {
  const rows = destinationRows(slug);
  const top = rows.slice(0, 6);
  return (
    <Card label={`Risk by destination · top ${top.length} of ${rows.length}`}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {top.map((r, i) => {
          const inner = (
            <>
              <span style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <span style={{ fontSize: "16px" }}>{r.flag || "🏳️"}</span>
                <span style={{ fontWeight: 600, color: "var(--c-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                {r.region && <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>{r.region}</span>}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", flexShrink: 0 }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: r.color }} />
                <span className="t-label" style={{ color: "var(--c-text-2)" }}>{r.label}</span>
              </span>
            </>
          );
          const base: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "11px 4px", borderTop: i === 0 ? "none" : "1px solid var(--c-border)", fontSize: "13.5px", textDecoration: "none" };
          return r.slug
            ? <Link key={r.name} href={`/country/${r.slug}`} style={base}>{inner}</Link>
            : <div key={r.name} style={base}>{inner}</div>;
        })}
      </div>
    </Card>
  );
}
