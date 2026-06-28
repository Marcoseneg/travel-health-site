// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/tools/yellow-fever-centres/page.tsx
//
//   Finder for Swiss travel-medicine & yellow-fever vaccination centres:
//   search + canton chips, centre cards, and a short "good to know" strip.
//   Curated list of MAIN institutional centres — the official Swiss reference
//   is healthytravel.ch (linked prominently). Phones shown only where verified.
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { YF_CENTRES, CANTONS } from "../../lib/toolsData";

// city → stable photo filename slug (handles accents: Zürich→zurich, Genève→geneve)
const slugify = (s: string) => s.normalize("NFD").replace(/[^\x00-\x7f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Building-icon SVG layered UNDER the hospital photo, so a missing photo degrades
// to a tasteful icon (CSS bg layers fall through silently on 404 — no broken img).
const FALLBACK_ICON = `data:image/svg+xml,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='#0d9488' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='M3 21h18M5 21V6l7-3 7 3v15M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4'/></svg>")}`;

function photoStyle(city: string): React.CSSProperties {
  return {
    backgroundColor: "var(--c-surface-2)",
    backgroundImage: `url(/images/tools/centres/${slugify(city)}.jpg), url("${FALLBACK_ICON}")`,
    backgroundSize: "cover, 40px",
    backgroundPosition: "center, center",
    backgroundRepeat: "no-repeat, no-repeat",
  };
}

function InfoCard({ tone, icon, title, body, linkLabel, href }: { tone: "trust" | "warn" | "accent"; icon: React.ReactNode; title: string; body: string; linkLabel?: string; href?: string }) {
  const bg = tone === "trust" ? "var(--c-trust-soft)" : tone === "warn" ? "var(--c-warning-soft)" : "var(--c-accent-soft)";
  const fg = tone === "trust" ? "var(--c-trust)" : tone === "warn" ? "var(--c-warning-border)" : "var(--c-accent-strong)";
  const bd = tone === "trust" ? "var(--c-trust-soft)" : tone === "warn" ? "var(--c-warning-border)" : "var(--c-accent-border)";
  return (
    <div style={{ padding: "16px 17px", borderRadius: "15px", background: bg, border: `1px solid ${bd}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "7px", color: fg }}>
        {icon}
        <span className="t-label" style={{ fontWeight: 700, color: "var(--c-text)" }}>{title}</span>
      </div>
      <p className="t-micro" style={{ color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal", margin: linkLabel ? "0 0 9px" : 0, lineHeight: 1.55 }}>{body}</p>
      {linkLabel && href && (
        <Link href={href} className="t-micro" style={{ color: fg, textDecoration: "none", textTransform: "none", letterSpacing: "normal", fontWeight: 700 }}>{linkLabel} →</Link>
      )}
    </div>
  );
}

export default function YellowFeverCentresPage() {
  const [query, setQuery] = useState("");
  const [canton, setCanton] = useState<string | null>(null);

  const activeCantons = useMemo(() => {
    const present = new Set(YF_CENTRES.map((c) => c.canton));
    return CANTONS.filter((c) => present.has(c.code));
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return YF_CENTRES.filter((c) => {
      if (canton && c.canton !== canton) return false;
      if (!q) return true;
      return [c.name, c.institution ?? "", c.city, c.canton].some((s) => s.toLowerCase().includes(q));
    }).sort((a, b) => a.city.localeCompare(b.city));
  }, [query, canton]);

  return (
    <main style={{ minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1480px", margin: "0 auto", padding: "28px 32px 64px" }}>
        {/* Breadcrumb */}
        <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--c-text-3)", textDecoration: "none", fontSize: "13px", marginBottom: "18px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          All tools
        </Link>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "46px", height: "46px", borderRadius: "13px", background: "#fef9c3", fontSize: "23px", flexShrink: 0 }}>💉</span>
          <h1 className="t-h1" style={{ margin: 0, color: "var(--c-text)" }}>Yellow-fever vaccination centres</h1>
        </div>
        <p className="t-body" style={{ color: "var(--c-text-2)", fontSize: "15px", lineHeight: 1.6, margin: "0 0 18px", maxWidth: "680px" }}>
          Yellow-fever vaccine may only be given at officially approved centres. Find a travel-medicine
          centre in Switzerland below — always phone ahead, as travel-consultation hours are limited.
        </p>

        {/* Official-source banner */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px 15px", borderRadius: "12px", background: "var(--c-accent-soft)", border: "1px solid var(--c-accent-border)", marginBottom: "22px", maxWidth: "680px" }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent-strong)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
          <p className="t-label" style={{ margin: 0, color: "var(--c-text-2)", lineHeight: 1.5 }}>
            This list includes the main centres authorised to administer yellow-fever vaccine. For official Swiss travel-health guidance, see{" "}
            <a href="https://www.healthytravel.ch" target="_blank" rel="noopener noreferrer" style={{ color: "var(--c-accent-strong)", fontWeight: 700, textDecoration: "none" }}>healthytravel.ch ↗</a>{" "}
            (Swiss Expert Committee on Travel Medicine).
          </p>
        </div>

        {/* Search + count */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center", marginBottom: "16px" }}>
          <div style={{ position: "relative", flex: "1 1 280px", maxWidth: "360px" }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search city, hospital or canton" aria-label="Search centres"
              style={{ width: "100%", padding: "11px 14px 11px 40px", borderRadius: "12px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text)", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
          </div>
          <span className="t-label" style={{ color: "var(--c-text-3)" }}>{results.length} centre{results.length === 1 ? "" : "s"}</span>
        </div>

        {/* Canton filter chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "22px" }}>
          {[{ code: null, name: "All cantons" }, ...activeCantons.map((c) => ({ code: c.code as string | null, name: c.name }))].map((c) => {
            const active = canton === c.code;
            return (
              <button key={c.code ?? "all"} onClick={() => setCanton(c.code)} className="t-micro"
                style={{ padding: "6px 13px", borderRadius: "999px", cursor: "pointer", fontFamily: "inherit", textTransform: "none", letterSpacing: "normal", fontWeight: 600,
                  background: active ? "var(--c-accent)" : "var(--c-surface)", border: `1px solid ${active ? "var(--c-accent)" : "var(--c-border)"}`, color: active ? "#fff" : "var(--c-text-2)" }}>
                {c.name}
              </button>
            );
          })}
        </div>

        {/* Centre cards */}
        {results.length === 0 ? (
          <p className="t-body" style={{ color: "var(--c-text-3)", padding: "30px 0" }}>No centres match — try clearing the filters.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "14px" }}>
            {results.map((c, i) => (
              <div key={`${c.city}-${i}`} style={{ display: "flex", flexDirection: "column", borderRadius: "15px", background: "var(--c-surface)", border: "1px solid var(--c-border)", overflow: "hidden" }}>
                <div style={{ height: "132px", ...photoStyle(c.city) }} aria-hidden />
                <div style={{ padding: "14px 17px 4px", flex: 1 }}>
                  <span className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal", fontWeight: 700, marginBottom: "4px" }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                    {c.city}, {c.canton}
                  </span>
                  {c.institution && <div className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", marginBottom: "1px" }}>{c.institution}</div>}
                  <div className="t-label" style={{ fontWeight: 700, color: "var(--c-text)", lineHeight: 1.3 }}>{c.name}</div>
                </div>

                <div style={{ padding: "10px 17px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
                  {c.phone ? (
                    <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--c-text-2)", textDecoration: "none", fontWeight: 600 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                      {c.phone}
                    </a>
                  ) : (
                    <span className="t-label" style={{ color: "var(--c-text-3)" }}>Call ahead to book</span>
                  )}
                  {c.website && (
                    <a href={c.website} target="_blank" rel="noopener noreferrer" className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--c-accent-strong)", textDecoration: "none", fontWeight: 700 }}>
                      Website
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Good to know */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px", marginTop: "32px" }}>
          <InfoCard tone="trust" title="Safe and effective"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
            body="A single dose protects from 10 days after vaccination — for most people, for life."
            linkLabel="About yellow fever" href="/diseases/yellow-fever" />
          <InfoCard tone="warn" title="Please call ahead"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>}
            body="Appointments are usually required and travel-consultation hours are limited. Vaccinate ≥10 days before departure." />
          <InfoCard tone="accent" title="Yellow-fever certificate"
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M9 15l2 2 4-4" /></svg>}
            body="You'll receive an international certificate (ICVP, the “yellow card”). Some countries require it for entry."
            linkLabel="Which countries require it" href="/diseases/yellow-fever" />
        </div>
      </div>
    </main>
  );
}
