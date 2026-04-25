"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { diseases } from "../../lib/diseaseData";
import DiseaseLinkedText from "../../components/DiseaseLinkedText";

const PREVENTION_TYPE_STYLES: Record<string, { icon: string; color: string; bg: string }> = {
  vaccine: { icon: "💉", color: "#34d399", bg: "rgba(52,211,153,0.06)" },
  prophylaxis: { icon: "💊", color: "#38bdf8", bg: "rgba(56,189,248,0.06)" },
  behavior: { icon: "🛡️", color: "#94a3b8", bg: "rgba(148,163,184,0.04)" },
  "post-exposure": { icon: "🏥", color: "#f59e0b", bg: "rgba(245,158,11,0.06)" },
};

export default function DiseasePage() {
  const params = useParams();
  const slug = params.slug as string;
  const d = diseases[slug];

  if (!d) {
    return (
      <main style={{ minHeight: "100vh", background: "#030712", color: "#f1f5f9", fontFamily: "'DM Sans', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>Disease not found</h1>
          <Link href="/diseases" style={{ color: "#38bdf8", textDecoration: "underline", textUnderlineOffset: "2px" }}>← Back to all diseases</Link>
        </div>
      </main>
    );
  }

  const prophylaxisItems = d.preventionDetails?.filter(p => p.type === "prophylaxis") || [];
  const otherItems = d.preventionDetails?.filter(p => p.type !== "prophylaxis") || [];

  return (
    <main style={{ minHeight: "100vh", background: "#030712", color: "#f1f5f9", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* ── Back link ──────────────────────────────────────────── */}
        <Link
          href="/diseases"
          style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            fontSize: "13px", color: "#64748b", textDecoration: "none",
            marginBottom: "32px", transition: "color 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#94a3b8"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#64748b"; }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          All diseases
        </Link>

        {/* ── Header ─────────────────────────────────────────────── */}
        {/* Bare icon at editorial scale — no container box. The emoji is
            already detailed enough to act as a visual anchor on its own;
            wrapping it in a tinted badge made it look like floating UI
            chrome rather than illustrated content. */}
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
            filter: "drop-shadow(0 4px 18px rgba(56,189,248,0.15))",
          }}>
            {d.icon}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "6px",
            }}>
              {d.category}
            </div>
            <h1 style={{
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              margin: 0,
            }}>
              {d.label}
            </h1>
          </div>
        </div>

        <p style={{
          fontSize: "17px",
          color: "#94a3b8",
          lineHeight: 1.7,
          margin: "0 0 40px",
          maxWidth: "700px",
        }}>
          <DiseaseLinkedText text={d.transmission} currentSlug={slug} />
        </p>

        {/* ── Clinical info cards ─────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
          {/* Symptoms */}
          <div style={{
            padding: "24px 28px", borderRadius: "16px",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
              Symptoms
            </div>
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
              {d.symptoms}
            </p>
          </div>

          {/* Treatment */}
          <div style={{
            padding: "24px 28px", borderRadius: "16px",
            background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
              Treatment
            </div>
            <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
              <DiseaseLinkedText text={d.treatment} currentSlug={slug} />
            </p>
          </div>
        </div>

        {/* Regions */}
        <div style={{
          padding: "20px 28px", borderRadius: "16px", marginBottom: "40px",
          background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
        }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "10px" }}>
            Endemic regions
          </div>
          <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>
            <DiseaseLinkedText text={d.regions} currentSlug={slug} />
          </p>
        </div>

        {/* ── Prevention & Prophylaxis (main block) ───────────────── */}
        {d.preventionDetails && d.preventionDetails.length > 0 && (
          <div style={{
            padding: "32px 32px 36px", borderRadius: "20px",
            background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}>
            <div style={{
              fontSize: "13px", fontWeight: 700, color: "#f1f5f9", textTransform: "uppercase",
              letterSpacing: "0.06em", marginBottom: "24px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "14px",
                  overflow: "hidden",
                }}>
                  {prophylaxisItems.map((item, i) => {
                    const dosing = item.detail.match(/^(.*?)\./)?.[1] || "";
                    const rest = item.detail.slice(dosing.length + 1).trim();
                    return (
                      <div key={i} style={{
                        padding: "20px 18px", background: "rgba(10,16,31,0.8)",
                        display: "flex", flexDirection: "column", gap: "12px",
                      }}>
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#38bdf8", lineHeight: 1.3 }}>
                          {item.title}
                        </div>
                        <div style={{
                          fontSize: "13px", fontWeight: 600, color: "#e2e8f0",
                          padding: "8px 12px", borderRadius: "8px",
                          background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.1)",
                          lineHeight: 1.5,
                        }}>
                          {dosing}.
                        </div>
                        <div style={{ fontSize: "13px", color: "#94a3b8", lineHeight: 1.65 }}>
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
                background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.08)",
                marginBottom: "16px",
              }}>
                <span style={{ fontSize: "18px", flexShrink: 0 }}>💊</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#38bdf8", marginBottom: "6px" }}>{prophylaxisItems[0].title}</div>
                  <div style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.65 }}>
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
                    background: typeStyle.bg, border: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <span style={{ fontSize: "18px", flexShrink: 0 }}>{typeStyle.icon}</span>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: typeStyle.color, marginBottom: "6px" }}>{item.title}</div>
                      <div style={{ fontSize: "13.5px", color: "#94a3b8", lineHeight: 1.65 }}>
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
