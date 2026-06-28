// ═══════════════════════════════════════════════════════════════════════════
// <DiseaseLibrarySidebar /> — the shared "Disease Library" browser.
//
//   One implementation used by BOTH the diseases landing page and every
//   /diseases/[slug] detail page, so the library looks and behaves identically
//   everywhere. Pass `activeSlug` on detail pages to highlight the current
//   disease and show the "All diseases" back-link.
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { useState } from "react";
import Link from "next/link";
import { diseases } from "../lib/diseaseData";

// Single source of truth for how diseases are grouped in the library. Exported
// so detail pages can reuse it (e.g. "related diseases in the same category").
export const SIDEBAR_GROUPS: { key: string; label: string; icon: string; slugs: string[] }[] = [
  { key: "vector", label: "Vector-borne", icon: "🦟", slugs: ["malaria", "dengue", "chikungunya", "yellow-fever", "zika", "japanese-encephalitis", "tbe", "oropouche"] },
  { key: "food", label: "Food & water-borne", icon: "🚰", slugs: ["typhoid", "hepatitis-a", "cholera"] },
  { key: "animal", label: "Animal-associated", icon: "🐕", slugs: ["rabies"] },
  { key: "contact", label: "Close contact", icon: "🤝", slugs: ["mpox"] },
];

export default function DiseaseLibrarySidebar({ activeSlug }: { activeSlug?: string }) {
  const [search, setSearch] = useState("");
  const q = search.trim().toLowerCase();

  const groups = SIDEBAR_GROUPS.map((group) => ({
    ...group,
    items: group.slugs.filter((s) => diseases[s] && diseases[s].label.toLowerCase().includes(q)),
  }));
  const hasMatches = groups.some((g) => g.items.length > 0);

  return (
    <>
      {/* Single header row — same height with or without the back-link, so the
          search + list start at an identical Y on the landing and detail pages. */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", minHeight: "20px", marginBottom: "10px" }}>
        <span className="t-micro" style={{ color: "var(--c-text-3)" }}>Explore diseases</span>
        {activeSlug && (
          <Link href="/diseases" className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--c-accent-strong)", textDecoration: "none", textTransform: "none", letterSpacing: "normal", fontWeight: 600 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            All diseases
          </Link>
        )}
      </div>

      {/* Search */}
      <div style={{ position: "relative", marginBottom: "18px" }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search disease…"
          aria-label="Search diseases"
          className="t-label"
          style={{ width: "100%", padding: "9px 12px 9px 34px", borderRadius: "10px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text)", fontFamily: "inherit", outline: "none" }}
        />
      </div>

      {/* Grouped disease list */}
      {!hasMatches ? (
        <p className="t-label" style={{ color: "var(--c-text-3)" }}>No diseases match “{search}”.</p>
      ) : (
        <nav style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {groups.map((group) => {
            if (!group.items.length) return null;
            return (
              <div key={group.key} id={`dls-${group.key}`} style={{ scrollMarginTop: "90px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span className="t-micro" style={{ color: "var(--c-text-3)", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ fontSize: "12px" }}>{group.icon}</span>{group.label}
                  </span>
                  <span className="t-micro" style={{ color: "var(--c-text-3)" }}>{group.slugs.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  {group.items.map((s) => {
                    const di = diseases[s];
                    const active = s === activeSlug;
                    return (
                      <Link
                        key={s}
                        href={`/diseases/${s}`}
                        className="t-label"
                        style={{
                          display: "block",
                          padding: "8px 10px", borderRadius: "9px", textDecoration: "none",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          background: active ? "var(--c-accent-soft)" : "transparent",
                          border: `1px solid ${active ? "var(--c-accent-border)" : "transparent"}`,
                          color: active ? "var(--c-accent-strong)" : "var(--c-text-2)",
                          fontWeight: active ? 700 : 500,
                        }}
                      >
                        {di.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      )}

      <div style={{ marginTop: "22px", padding: "14px", borderRadius: "12px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
        <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "6px" }}>Methodology & data</div>
        <p className="t-label" style={{ color: "var(--c-text-2)", margin: "0 0 8px", lineHeight: 1.5 }}>
          Risk levels and prevention guidance are sourced from CDC, WHO, and the Swiss EKRM.
        </p>
        <Link href="/about#methodology" className="t-label" style={{ color: "var(--c-accent-strong)", textDecoration: "none", fontWeight: 600 }}>View methodology →</Link>
      </div>
    </>
  );
}
