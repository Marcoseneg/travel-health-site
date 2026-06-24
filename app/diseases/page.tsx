// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/diseases/page.tsx   (the main "Diseases" landing page)
//
//   "Disease Explorer" — DISCOVERY only. Helps you find a disease: search,
//   browse by category, a live outbreak map (clickable hotspots), and trending
//   outbreaks. Nothing is pre-selected. Picking a disease opens the Disease
//   Detail page (/diseases/[slug]) — the "consumption" view with its own
//   persistent sidebar for switching diseases.
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";
import OutbreakMap from "../components/OutbreakMap";

const DISEASE_CATEGORY: Record<string, "vector" | "food" | "animal" | "contact"> = {
  malaria: "vector", dengue: "vector", chikungunya: "vector", "yellow-fever": "vector",
  zika: "vector", "japanese-encephalitis": "vector", tbe: "vector", oropouche: "vector",
  typhoid: "food", "hepatitis-a": "food", cholera: "food",
  rabies: "animal",
  mpox: "contact",
};

const CATEGORY_META: Record<string, { label: string; icon: string; color: string; soft: string; blurb: string }> = {
  vector: { label: "Vector-borne", icon: "🦟", color: "#f97316", soft: "rgba(249,115,22,0.12)", blurb: "Mosquitoes, ticks" },
  food: { label: "Food & water", icon: "🚰", color: "#0ea5e9", soft: "rgba(14,165,233,0.12)", blurb: "Contaminated food & water" },
  animal: { label: "Animal-associated", icon: "🐕", color: "#a855f7", soft: "rgba(168,85,247,0.12)", blurb: "Bites & scratches" },
  contact: { label: "Close contact", icon: "🤝", color: "#ec4899", soft: "rgba(236,72,153,0.12)", blurb: "Skin & sexual contact" },
};

const RISK_META: Record<string, { label: string; dot: string }> = {
  high: { label: "High risk", dot: "#ef4444" },
  moderate: { label: "Moderate", dot: "#f59e0b" },
  low: { label: "Low", dot: "#16a34a" },
};

const SHORT_DESCRIPTIONS: Record<string, string> = {
  malaria: "Year-round risk in much of the tropics. Prevention combines mosquito avoidance with chemoprophylaxis.",
  dengue: "Spread by daytime-biting Aedes mosquitoes. Severe dengue is rare but the risk rises with a second infection.",
  chikungunya: "Sudden fever with joint pain that can last months. Same Aedes mosquitoes as dengue.",
  "yellow-fever": "Single dose protects for life. Required for entry into many African and South American countries.",
  typhoid: "Persistent fever from contaminated food and water. Two vaccines available — useful for longer or rougher trips.",
  "hepatitis-a": "Common worldwide, easy to catch, easy to prevent. Two-dose vaccine gives long-term protection.",
  rabies: "Nearly always fatal once symptoms start. Pre-exposure vaccine simplifies what to do after a bite.",
  cholera: "Severe diarrhea that can dehydrate within hours. Vaccine for outbreak areas and humanitarian work.",
  "japanese-encephalitis": "Rural Asia, especially during monsoon. Vaccine for stays of a month or more in farming areas.",
  tbe: "Tick-borne encephalitis, endemic across most of Switzerland. BAG-recommended vaccine for residents and visitors.",
  zika: "Usually mild — but congenital Zika syndrome makes pregnancy planning the central concern.",
  mpox: "Mostly spread by close skin-to-skin and sexual contact. Vaccine available for high-risk groups.",
  oropouche: "Amazon-basin fever from tiny biting midges that slip through normal nets. Looks like dengue and often relapses.",
};

const CATEGORY_ORDER = ["vector", "food", "animal", "contact"] as const;

export default function DiseasesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: DISEASE_LIST.length };
    DISEASE_LIST.forEach((s) => { const k = DISEASE_CATEGORY[s]; c[k] = (c[k] || 0) + 1; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DISEASE_LIST.filter((slug) => {
      if (filter !== "all" && DISEASE_CATEGORY[slug] !== filter) return false;
      if (!q) return true;
      const d = diseases[slug];
      return d.label.toLowerCase().includes(q) || d.category.toLowerCase().includes(q) || (SHORT_DESCRIPTIONS[slug] || "").toLowerCase().includes(q);
    });
  }, [query, filter]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      {/* ── Hero: discovery ────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(1000px 380px at 70% -60px, var(--c-accent-soft), transparent 70%)", pointerEvents: "none" }} />
        <div className="dx-hero" style={{ position: "relative", maxWidth: "1200px", margin: "0 auto", padding: "18px 24px 6px" }}>
          <div>
            <h1 className="t-display" style={{ margin: "0 0 14px", color: "var(--c-text)" }}>Disease Explorer</h1>
            <p className="t-body" style={{ color: "var(--c-text-2)", fontSize: "17px", lineHeight: 1.6, margin: "0 0 26px", maxWidth: "480px" }}>
              Find the infectious diseases that matter to travelers. Search, browse by category, or follow a live outbreak.
            </p>
            <div style={{ position: "relative", maxWidth: "440px" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search malaria, dengue, rabies…" aria-label="Search diseases"
                style={{ width: "100%", padding: "14px 18px 14px 46px", borderRadius: "14px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text)", fontSize: "15px", fontFamily: "inherit", outline: "none", boxShadow: "0 2px 10px rgba(15,23,42,0.05)" }} />
            </div>
          </div>
          {/* Right: ambient decorative world (no markers/legend — placeholder) */}
          <div className="dx-hero-side" aria-hidden><OutbreakMap decorative /></div>
        </div>
      </section>

      {/* ── Find a disease: compact filter bar + dense grid ────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "8px 24px 8px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
          {(["all", ...CATEGORY_ORDER] as string[]).map((key) => {
            const active = filter === key;
            const m = key === "all" ? { label: "All", icon: "🌐" } : CATEGORY_META[key];
            return (
              <button key={key} onClick={() => setFilter(key)} className="t-label" style={{
                display: "inline-flex", alignItems: "center", gap: "7px", padding: "8px 14px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${active ? "var(--c-accent-border)" : "var(--c-border)"}`,
                background: active ? "var(--c-accent-soft)" : "var(--c-surface)",
                color: active ? "var(--c-accent-strong)" : "var(--c-text-2)", fontFamily: "inherit", fontWeight: 600, transition: "all 0.16s",
              }}>
                <span style={{ fontSize: "13px" }}>{m.icon}</span>{m.label}
                <span className="t-micro" style={{ color: active ? "var(--c-accent-strong)" : "var(--c-text-3)", background: active ? "transparent" : "var(--c-surface-2)", padding: "1px 7px", borderRadius: "999px" }}>{counts[key]}</span>
              </button>
            );
          })}
          <span className="t-label" style={{ marginLeft: "auto", color: "var(--c-text-3)" }}>{filtered.length} of {DISEASE_LIST.length}</span>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--c-text-3)" }}>
            <p className="t-body" style={{ margin: 0 }}>No diseases match “{query}”.</p>
            <button onClick={() => { setQuery(""); setFilter("all"); }} className="t-label" style={{ marginTop: "12px", padding: "8px 16px", borderRadius: "999px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text-2)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Clear filters</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(244px, 1fr))", gap: "12px" }}>
            {filtered.map((slug) => {
              const d = diseases[slug];
              const cat = CATEGORY_META[DISEASE_CATEGORY[slug]];
              const risk = RISK_META[d.riskLevel];
              return (
                <Link key={slug} href={`/diseases/${slug}`}
                  style={{ display: "flex", flexDirection: "column", borderRadius: "14px", textDecoration: "none", background: "var(--c-surface)", border: "1px solid var(--c-border)", padding: "14px 16px", transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 12px 28px rgba(8,145,178,0.12)"; e.currentTarget.style.borderColor = "var(--c-accent-border)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--c-border)"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "10px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "11px", background: cat.soft, fontSize: "20px", flexShrink: 0 }}>{d.icon}</span>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 700, color: "var(--c-text)", fontSize: "15.5px", lineHeight: 1.2 }}>{d.label}</div>
                      <div className="t-micro" style={{ color: cat.color, textTransform: "none", letterSpacing: "normal", fontWeight: 600 }}>{d.category}</div>
                    </div>
                    <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: risk.dot, flexShrink: 0 }} title={`${risk.label} risk`} />
                  </div>
                  <p className="t-label" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{SHORT_DESCRIPTIONS[slug]}</p>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px 24px 12px" }}>
        <div style={{ background: "linear-gradient(135deg, var(--c-accent-soft), var(--c-surface))", border: "1px solid var(--c-accent-border)", borderRadius: "18px", padding: "22px 26px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontSize: "28px" }}>🧭</span>
            <div>
              <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)", marginBottom: "4px" }}>Not sure where to start?</div>
              <p className="t-body" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.5, maxWidth: "520px" }}>
                Build your trip and get vaccine, malaria, and outbreak guidance tailored to every destination.
              </p>
            </div>
          </div>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 22px", borderRadius: "12px", background: "var(--c-accent)", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 10px 24px rgba(8,145,178,0.26)", whiteSpace: "nowrap" }}>
            Plan a trip
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
      </section>

      {/* Footer disclaimer */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px 48px" }}>
        <p className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", margin: 0 }}>
          ⓘ Disease risks vary by location, season, and individual factors. Always consult a healthcare professional for personalized advice.
        </p>
      </div>

      <style jsx global>{`
        .dx-hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.85fr); gap: 20px; align-items: center; }
        @media (max-width: 900px) {
          .dx-hero { grid-template-columns: 1fr; gap: 22px; }
          .dx-hero-side { display: none; }
        }
      `}</style>
    </main>
  );
}
