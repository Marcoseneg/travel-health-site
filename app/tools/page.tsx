// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/tools/page.tsx   (Tools landing)
//
//   INTERACTIVE utilities — the counterpart to /resources (read/download docs).
//   A tool takes input and gives you an answer (a finder, a checker).
// ═══════════════════════════════════════════════════════════════════════════

import Link from "next/link";
import { TOOLS } from "../lib/toolsData";

export const metadata = {
  title: "Tools — TravelMed",
  description: "Interactive travel-health tools: find a yellow-fever vaccination centre, check your trip risk, and more.",
};

export default function ToolsPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "40px 32px 64px" }}>
        {/* Header */}
        <div style={{ maxWidth: "640px", marginBottom: "30px" }}>
          <div className="t-micro" style={{ color: "var(--c-accent-strong)", marginBottom: "10px" }}>Tools</div>
          <h1 className="t-h1" style={{ margin: "0 0 10px", color: "var(--c-text)" }}>Interactive travel-health tools</h1>
          <p className="t-body" style={{ color: "var(--c-text-2)", fontSize: "15.5px", lineHeight: 1.6, margin: 0 }}>
            Answer a question, get an answer. For things to read and print, see the{" "}
            <Link href="/resources" style={{ color: "var(--c-accent-strong)", fontWeight: 600, textDecoration: "none" }}>Resource Center</Link>.
          </p>
        </div>

        {/* Tool grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
          {TOOLS.map((t) => {
            const live = t.status === "live";
            const inner = (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "13px", background: t.soft, fontSize: "23px", flexShrink: 0 }}>{t.icon}</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {t.tag && <span className="t-micro" style={{ color: t.color, textTransform: "none", letterSpacing: "normal", fontWeight: 700 }}>{t.tag}</span>}
                    {!live && <span className="t-micro" style={{ alignSelf: "flex-start", padding: "1px 8px", borderRadius: "999px", background: "var(--c-surface-2)", color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", fontWeight: 600 }}>Coming soon</span>}
                  </div>
                </div>
                <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)", fontSize: "17px", lineHeight: 1.3, marginBottom: "6px" }}>{t.title}</div>
                <p className="t-label" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.55, flex: 1 }}>{t.blurb}</p>
                {live && (
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", marginTop: "14px", color: "var(--c-accent-strong)", fontWeight: 700, fontSize: "14px" }}>
                    Open tool
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                )}
              </>
            );
            const cardStyle: React.CSSProperties = {
              display: "flex", flexDirection: "column", borderRadius: "18px", textDecoration: "none",
              background: "var(--c-surface)", border: "1px solid var(--c-border)", borderTop: `4px solid ${t.color}`,
              padding: "20px 22px", opacity: live ? 1 : 0.62,
            };
            return live ? (
              <Link key={t.id} href={t.href} style={cardStyle}>{inner}</Link>
            ) : (
              <div key={t.id} style={{ ...cardStyle, cursor: "default" }}>{inner}</div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
