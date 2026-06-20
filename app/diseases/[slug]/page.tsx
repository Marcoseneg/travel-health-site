// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/diseases/[slug]/page.tsx
//
//   ⚠️  IMPORTANT — this file MUST replace the one at:
//           app/diseases/[slug]/page.tsx     ← the [slug] folder, with brackets
//
//       It does NOT go in:
//           app/diseases/page.tsx            ← (that's the listing page; don't touch it)
//           app/page.tsx                     ← (that's the homepage; don't touch it)
//           any other 'page.tsx' in the project
//
//   The brackets in [slug] are a real part of the folder name — Next.js
//   uses them to mark a dynamic route. Make sure the file lands inside
//   the brackets-folder, not somewhere else.
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { diseases } from "../../lib/diseaseData";
import DiseaseLinkedText from "../../components/DiseaseLinkedText";
import DiseaseDistributionGlobe, {
  type DistributionDisease,
} from "../../components/DiseaseDistributionGlobe";

const PREVENTION_TYPE_STYLES: Record<string, { icon: string; color: string; bg: string; border: string }> = {
  vaccine: { icon: "💉", color: "var(--c-trust)", bg: "var(--c-trust-soft)", border: "var(--c-trust-border)" },
  prophylaxis: { icon: "💊", color: "var(--c-accent)", bg: "var(--c-accent-soft)", border: "var(--c-accent-border)" },
  behavior: { icon: "🛡️", color: "var(--c-text-2)", bg: "var(--c-surface-2)", border: "var(--c-border)" },
  "post-exposure": { icon: "🏥", color: "var(--c-warning)", bg: "var(--c-warning-soft)", border: "var(--c-warning-border)" },
};

// Diseases that have country-level geographic risk data. Only these get the
// distribution globe inside their "Endemic regions" section; the rest stay
// text-only until/unless geographic data is added for them.
const DISEASES_WITH_MAP = [
  "malaria",
  "yellow-fever",
  "dengue",
  "chikungunya",
] as const;

function hasDistributionMap(slug: string): slug is DistributionDisease {
  return (DISEASES_WITH_MAP as readonly string[]).includes(slug);
}

export default function DiseasePage() {
  const params = useParams();
  const slug = params.slug as string;
  const d = diseases[slug];

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

  const prophylaxisItems = d.preventionDetails?.filter(p => p.type === "prophylaxis") || [];
  const otherItems = d.preventionDetails?.filter(p => p.type !== "prophylaxis") || [];
  const showMap = hasDistributionMap(slug);

  return (
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/diseases"
          className="t-label"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "var(--c-text-3)", textDecoration: "none",
            marginBottom: "32px", transition: "color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "var(--c-text-2)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--c-text-3)"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          All diseases
        </Link>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
          marginBottom: "24px",
        }}>
          <span style={{
            fontSize: "64px",
            lineHeight: 1,
            flexShrink: 0,
          }}>
            {d.icon}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="t-micro" style={{
              color: "var(--c-text-3)",
              marginBottom: "6px",
            }}>
              {d.category}
            </div>
            <h1 className="t-display" style={{
              margin: 0,
              color: "var(--c-text)",
            }}>
              {d.label}
            </h1>
          </div>
        </div>

        <p className="t-body" style={{
          fontSize: "17px",
          color: "var(--c-text-2)",
          lineHeight: 1.7,
          margin: "0 0 40px",
          maxWidth: "700px",
        }}>
          <DiseaseLinkedText text={d.transmission} currentSlug={slug} />
        </p>

        {/* ── Clinical info cards ─────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          {/* Symptoms */}
          <div className="card-hover" style={{
            padding: "24px 28px", borderRadius: "16px",
            background: "var(--c-surface)", border: "1px solid var(--c-border)",
          }}>
            <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "12px" }}>
              Symptoms
            </div>
            <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
              {d.symptoms}
            </p>
          </div>

          {/* Treatment */}
          <div className="card-hover" style={{
            padding: "24px 28px", borderRadius: "16px",
            background: "var(--c-surface)", border: "1px solid var(--c-border)",
          }}>
            <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "12px" }}>
              Treatment
            </div>
            <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
              <DiseaseLinkedText text={d.treatment} currentSlug={slug} />
            </p>
          </div>
        </div>

        {/* ── Endemic regions (with optional distribution globe) ───── */}
        {/* For diseases with country-level risk data (malaria, yellow fever,
            dengue, chikungunya), this section grows into a substantial
            visual section: a static reference globe with the disease overlay
            applied, a legend, and the text description below. Other diseases
            keep the original compact text-only box. */}
        <div style={{
          padding: showMap ? "28px 28px 24px" : "20px 28px",
          borderRadius: "16px",
          marginBottom: "40px",
          background: "var(--c-surface)",
          border: "1px solid var(--c-border)",
        }}>
          <div className="t-micro" style={{
            color: "var(--c-text-3)",
            marginBottom: showMap ? "20px" : "10px",
          }}>
            Endemic regions
          </div>

          {showMap && (
            <div style={{ marginBottom: "24px" }}>
              <DiseaseDistributionGlobe disease={slug} />
            </div>
          )}

          <p className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.7, margin: 0 }}>
            <DiseaseLinkedText text={d.regions} currentSlug={slug} />
          </p>
        </div>

        {/* ── Prevention & Prophylaxis (main block) ───────────────── */}
        {d.preventionDetails && d.preventionDetails.length > 0 && (
          <div style={{
            padding: "32px 32px 36px", borderRadius: "20px",
            background: "var(--c-surface)", border: "1px solid var(--c-border)",
          }}>
            <div className="t-label" style={{
              color: "var(--c-text)", textTransform: "uppercase",
              letterSpacing: "0.06em", marginBottom: "24px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Prevention & prophylaxis
            </div>

            {/* Prophylaxis comparison (if multiple drugs) */}
            {prophylaxisItems.length > 1 && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${prophylaxisItems.length}, 1fr)`,
                  gap: "1px",
                  background: "var(--c-border)",
                  borderRadius: "14px",
                  overflow: "hidden",
                  border: "1px solid var(--c-border)",
                }}>
                  {prophylaxisItems.map((item, i) => {
                    const dosing = item.detail.match(/^(.*?)\./)?.[1] || "";
                    const rest = item.detail.slice(dosing.length + 1).trim();
                    return (
                      <div key={i} style={{
                        padding: "20px 18px", background: "var(--c-surface-2)",
                        display: "flex", flexDirection: "column", gap: "12px",
                      }}>
                        <div className="t-label" style={{ fontWeight: 700, color: "var(--c-accent)", lineHeight: 1.3 }}>
                          {item.title}
                        </div>
                        <div style={{
                          fontSize: "13px", fontWeight: 600, color: "var(--c-text)",
                          padding: "8px 12px", borderRadius: "8px",
                          background: "var(--c-accent-soft)", border: "1px solid var(--c-accent-border)",
                          lineHeight: 1.5,
                        }}>
                          {dosing}.
                        </div>
                        <div className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.65 }}>
                          {rest}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Single prophylaxis item (if only one) */}
            {prophylaxisItems.length === 1 && (
              <div style={{
                display: "flex", gap: "14px", padding: "18px 20px", borderRadius: "12px",
                background: "var(--c-accent-soft)", border: "1px solid var(--c-accent-border)",
                marginBottom: "16px",
              }}>
                <span style={{ fontSize: "18px", flexShrink: 0 }}>💊</span>
                <div>
                  <div className="t-label" style={{ fontWeight: 700, color: "var(--c-accent)", marginBottom: "6px" }}>{prophylaxisItems[0].title}</div>
                  <div className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.65 }}>
                    <DiseaseLinkedText text={prophylaxisItems[0].detail} currentSlug={slug} />
                  </div>
                </div>
              </div>
            )}

            {/* Other prevention items */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {otherItems.map((item, i) => {
                const typeStyle = PREVENTION_TYPE_STYLES[item.type] || PREVENTION_TYPE_STYLES.behavior;
                return (
                  <div key={i} style={{
                    display: "flex", gap: "14px", padding: "18px 20px", borderRadius: "12px",
                    background: typeStyle.bg, border: `1px solid ${typeStyle.border}`,
                  }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>{typeStyle.icon}</span>
                    <div>
                      <div className="t-label" style={{ fontWeight: 700, color: typeStyle.color, marginBottom: "6px" }}>{item.title}</div>
                      <div className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.65 }}>
                        <DiseaseLinkedText text={item.detail} currentSlug={slug} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
