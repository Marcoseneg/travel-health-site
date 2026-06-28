// ═══════════════════════════════════════════════════════════════════════════
// <DiseaseExplorer /> — the Diseases landing page (client).
//
//   Layout mirrors the per-disease dashboard: the shared "Disease Library"
//   sidebar on the left + a main area that, under the title, simply lists every
//   disease as a browsable card (filter by category, sort by risk or name).
//   With only a handful of diseases, cards beat summary panels. All real data.
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { diseases, DISEASE_LIST } from "../lib/diseaseData";
import OutbreakMap from "./OutbreakMap";
import DiseaseLibrarySidebar from "./DiseaseLibrarySidebar";

// ── Category model (real categories only) ──────────────────────────────────
type CatKey = "vector" | "food" | "animal" | "contact";

const DISEASE_CATEGORY: Record<string, CatKey> = {
  malaria: "vector", dengue: "vector", chikungunya: "vector", "yellow-fever": "vector",
  zika: "vector", "japanese-encephalitis": "vector", tbe: "vector", oropouche: "vector",
  typhoid: "food", "hepatitis-a": "food", cholera: "food",
  rabies: "animal",
  mpox: "contact",
};

const CATEGORY_META: Record<CatKey, { label: string; icon: string; color: string; soft: string }> = {
  vector: { label: "Vector-borne", icon: "🦟", color: "#f97316", soft: "rgba(249,115,22,0.12)" },
  food: { label: "Food & water-borne", icon: "🚰", color: "#0ea5e9", soft: "rgba(14,165,233,0.12)" },
  animal: { label: "Animal-associated", icon: "🐕", color: "#a855f7", soft: "rgba(168,85,247,0.12)" },
  contact: { label: "Close contact", icon: "🤝", color: "#ec4899", soft: "rgba(236,72,153,0.12)" },
};

const CATEGORY_ORDER: CatKey[] = ["vector", "food", "animal", "contact"];

// Labelled risk badges (clear, unlike bare dots) — uses the same global
// risk-to-travelers level shown on each disease's detail page.
const RISK_BADGE: Record<string, { label: string; color: string; soft: string; border: string }> = {
  high: { label: "High risk", color: "#dc2626", soft: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.28)" },
  moderate: { label: "Moderate risk", color: "#b45309", soft: "rgba(245,158,11,0.14)", border: "rgba(245,158,11,0.3)" },
  low: { label: "Lower risk", color: "#15803d", soft: "rgba(22,163,74,0.12)", border: "rgba(22,163,74,0.28)" },
};
const RISK_RANK: Record<string, number> = { high: 3, moderate: 2, low: 1 };

const SHORT_DESCRIPTIONS: Record<string, string> = {
  malaria: "Year-round risk in much of the tropics. Prevention combines mosquito avoidance with chemoprophylaxis.",
  dengue: "Spread by daytime-biting Aedes mosquitoes. Severe dengue is rare but risk rises with a second infection.",
  chikungunya: "Sudden fever with joint pain that can last months. Same Aedes mosquitoes as dengue.",
  "yellow-fever": "Single dose protects for life. Required for entry into many African and South American countries.",
  typhoid: "Persistent fever from contaminated food and water. Two vaccines available for longer or rougher trips.",
  "hepatitis-a": "Common worldwide, easy to catch, easy to prevent. Two-dose vaccine gives long-term protection.",
  rabies: "Nearly always fatal once symptoms start. Pre-exposure vaccine simplifies what to do after a bite.",
  cholera: "Severe diarrhea that can dehydrate within hours. Vaccine for outbreak areas and humanitarian work.",
  "japanese-encephalitis": "Rural Asia, especially during monsoon. Vaccine for stays of a month or more in farming areas.",
  tbe: "Tick-borne encephalitis, endemic across most of Switzerland. Vaccine for residents and visitors.",
  zika: "Usually mild — but congenital Zika syndrome makes pregnancy planning the central concern.",
  mpox: "Mostly spread by close skin-to-skin and sexual contact. Vaccine available for high-risk groups.",
  oropouche: "Amazon-basin fever from tiny biting midges that slip through normal nets. Looks like dengue.",
};

// ── Component ──────────────────────────────────────────────────────────────
export default function DiseaseExplorer() {
  const [filter, setFilter] = useState<"all" | CatKey>("all");
  const [sort, setSort] = useState<"risk" | "az">("risk");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: DISEASE_LIST.length };
    for (const s of DISEASE_LIST) c[DISEASE_CATEGORY[s]] = (c[DISEASE_CATEGORY[s]] || 0) + 1;
    return c;
  }, []);

  const visible = useMemo(() => {
    const list = DISEASE_LIST.filter((s) => filter === "all" || DISEASE_CATEGORY[s] === filter);
    return list.sort((a, b) =>
      sort === "az"
        ? diseases[a].label.localeCompare(diseases[b].label)
        : RISK_RANK[diseases[b].riskLevel] - RISK_RANK[diseases[a].riskLevel] ||
          diseases[a].label.localeCompare(diseases[b].label)
    );
  }, [filter, sort]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <div className="dx-shell">
        {/* ── Sidebar: the shared Disease Library ───────────────────── */}
        <aside className="dx-sidebar">
          <DiseaseLibrarySidebar />
        </aside>

        {/* ── Main ───────────────────────────────────────────────────── */}
        <div className="dx-main">
          {/* Hero */}
          <section style={{ position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 340px at 80% -60px, var(--c-accent-soft), transparent 70%)", pointerEvents: "none" }} />
            <div className="dx-hero" style={{ position: "relative", padding: "0 0 4px" }}>
              <div>
                <h1 className="t-display" style={{ margin: "0 0 12px", color: "var(--c-text)" }}>Disease Explorer</h1>
                <p className="t-body" style={{ color: "var(--c-text-2)", fontSize: "17px", lineHeight: 1.6, margin: 0, maxWidth: "460px" }}>
                  Infectious diseases that may affect travelers. Browse the cards below, or search the library on the left to open any disease&apos;s risk map, prevention, and clinical guidance.
                </p>
              </div>
              <div className="dx-hero-side" aria-hidden><OutbreakMap decorative /></div>
            </div>
          </section>

          {/* Controls: filter chips + sort */}
          <div className="dx-controls">
            <div className="dx-chips">
              {(["all", ...CATEGORY_ORDER] as const).map((key) => {
                const active = filter === key;
                const label = key === "all" ? "All diseases" : CATEGORY_META[key].label;
                return (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className="t-label"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "7px", padding: "7px 13px", borderRadius: "999px", cursor: "pointer",
                      border: `1px solid ${active ? "var(--c-accent-border)" : "var(--c-border)"}`,
                      background: active ? "var(--c-accent-soft)" : "var(--c-surface)",
                      color: active ? "var(--c-accent-strong)" : "var(--c-text-2)", fontFamily: "inherit", fontWeight: 600,
                    }}
                  >
                    {key !== "all" && <span style={{ fontSize: "13px" }}>{CATEGORY_META[key].icon}</span>}
                    {label}
                    <span className="t-micro" style={{ color: active ? "var(--c-accent-strong)" : "var(--c-text-3)", letterSpacing: "normal" }}>{counts[key]}</span>
                  </button>
                );
              })}
            </div>
            <label className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "var(--c-text-3)", whiteSpace: "nowrap" }}>
              Sort by
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "risk" | "az")}
                className="t-label"
                style={{ padding: "7px 10px", borderRadius: "9px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text)", fontFamily: "inherit", fontWeight: 600, cursor: "pointer" }}
              >
                <option value="risk">Risk (high to low)</option>
                <option value="az">Name (A–Z)</option>
              </select>
            </label>
          </div>

          {/* Disease card grid */}
          <section className="dx-grid">
            {visible.map((slug) => {
              const d = diseases[slug];
              const cat = CATEGORY_META[DISEASE_CATEGORY[slug]];
              const rb = RISK_BADGE[d.riskLevel];
              return (
                <Link key={slug} href={`/diseases/${slug}`} className="dx-card">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", borderRadius: "12px", background: cat.soft, fontSize: "22px", flexShrink: 0 }}>{d.icon}</span>
                    <span className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 10px", borderRadius: "999px", background: rb.soft, border: `1px solid ${rb.border}`, color: rb.color, letterSpacing: "normal", textTransform: "none", fontWeight: 600 }}>
                      <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: rb.color }} />{rb.label}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--c-text)", fontSize: "17px", lineHeight: 1.25, marginBottom: "2px" }}>{d.label}</div>
                    <div className="t-micro" style={{ color: cat.color, textTransform: "none", letterSpacing: "normal", fontWeight: 600 }}>{d.category}</div>
                  </div>
                  <p className="t-label" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.55, flex: 1, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{SHORT_DESCRIPTIONS[slug]}</p>
                  <span className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--c-accent-strong)", fontWeight: 600 }}>
                    Explore {d.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </span>
                </Link>
              );
            })}
          </section>

          {/* Footnotes */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", alignItems: "center", margin: "20px 0 40px" }}>
            <Link href="/about#methodology" className="t-micro" style={{ color: "var(--c-accent-strong)", textTransform: "none", letterSpacing: "normal", fontWeight: 600, textDecoration: "none" }}>How risk is assessed →</Link>
            <p className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", margin: 0 }}>
              ⓘ Disease risks vary by location, season, and individual factors. Always consult a healthcare professional for personalized advice.
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .dx-shell { max-width: 1480px; margin: 0 auto; display: grid; grid-template-columns: 232px minmax(0, 1fr); gap: 26px; padding: 28px 24px 0; align-items: start; }
        .dx-sidebar { position: sticky; top: 24px; align-self: start; }
        .dx-hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr); gap: 20px; align-items: center; }
        .dx-controls { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; margin-top: 22px; }
        .dx-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .dx-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; margin-top: 16px; }
        .dx-card { display: flex; flex-direction: column; gap: 12px; padding: 18px; border: 1px solid var(--c-border); background: var(--c-surface); border-radius: 16px; text-decoration: none; transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; }
        @media (hover: hover) {
          .dx-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(8,145,178,0.12); border-color: var(--c-accent-border); }
        }
        @media (max-width: 960px) {
          .dx-shell { grid-template-columns: 1fr; gap: 20px; }
          .dx-sidebar { position: static; }
          .dx-hero { grid-template-columns: 1fr; }
          .dx-hero-side { display: none; }
        }
      `}</style>
    </main>
  );
}
