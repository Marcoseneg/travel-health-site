"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { SECTIONS, RESOURCES, getResource, sectionOfCategory, resourcesInSection } from "../lib/resourcesData";

// The persistent left navigation for the whole /resources section — visible on
// the landing AND on every individual resource, so browsing feels like an app
// (left nav stays, only the content changes). It also hosts the SEARCH box and
// popular chips, so the header stays compact and balanced with its illustration.
// Search is URL-driven (?q=) so it works from a detail page too and stays in
// sync with the grid. Active section is derived from the URL: ?section= on the
// landing, or the current resource's section on a detail page.

const POPULAR = ["mosquito", "malaria", "checklist", "diarrhoea"];

function SidebarInner() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();

  const q = params.get("q") ?? "";

  let activeSection: string | null = params.get("section");
  if (!activeSection && pathname.startsWith("/resources/")) {
    const slug = pathname.split("/")[2];
    const r = slug ? getResource(slug) : undefined;
    if (r) activeSection = sectionOfCategory(r.category);
  }

  function search(value: string) {
    const url = value.trim() ? `/resources?q=${encodeURIComponent(value.trim())}` : "/resources";
    if (pathname === "/resources") router.replace(url, { scroll: false });
    else router.push(url);
  }

  return (
    <div>
      {/* ── Search ──────────────────────────────────────────────────── */}
      <div style={{ position: "relative", marginBottom: "10px" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        <input
          value={q}
          onChange={(e) => search(e.target.value)}
          placeholder="Search resources"
          aria-label="Search resources"
          style={{ width: "100%", padding: "10px 12px 10px 38px", borderRadius: "11px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text)", fontSize: "14px", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
        />
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "22px" }}>
        {POPULAR.map((p) => (
          <Link key={p} href={`/resources?q=${p}`} className="t-micro" style={{ padding: "4px 10px", borderRadius: "999px", background: q.toLowerCase() === p ? "var(--c-accent-soft)" : "var(--c-surface-2)", border: `1px solid ${q.toLowerCase() === p ? "var(--c-accent-border)" : "var(--c-border)"}`, color: q.toLowerCase() === p ? "var(--c-accent-strong)" : "var(--c-text-2)", textDecoration: "none", textTransform: "none", letterSpacing: "normal", fontWeight: 600 }}>{p}</Link>
        ))}
      </div>

      {/* ── Browse by category ──────────────────────────────────────── */}
      <nav aria-label="Resource categories">
        <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "12px" }}>Browse by category</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
          {(() => {
            const allActive = pathname === "/resources" && !activeSection && !q;
            return (
              <Link href="/resources" className="t-label" style={{
                display: "flex", alignItems: "center", gap: "11px", padding: "9px 11px", borderRadius: "10px", textDecoration: "none",
                background: allActive ? "var(--c-accent-soft)" : "transparent",
                border: `1px solid ${allActive ? "var(--c-accent-border)" : "transparent"}`,
                color: allActive ? "var(--c-accent-strong)" : "var(--c-text-2)", fontWeight: allActive ? 700 : 500,
              }}>
                <span style={{ fontSize: "15px" }}>🌐</span>
                <span style={{ flex: 1, minWidth: 0 }}>All resources</span>
                <span className="t-micro" style={{ color: allActive ? "var(--c-accent-strong)" : "var(--c-text-3)", background: allActive ? "transparent" : "var(--c-surface-2)", padding: "1px 7px", borderRadius: "999px", textTransform: "none", letterSpacing: "normal" }}>{RESOURCES.length}</span>
              </Link>
            );
          })()}
          {SECTIONS.map((s) => {
            const active = activeSection === s.key;
            const count = resourcesInSection(s.key).length;
            return (
              <Link key={s.key} href={`/resources?section=${s.key}`} className="t-label" style={{
                display: "flex", alignItems: "center", gap: "11px", padding: "9px 11px", borderRadius: "10px", textDecoration: "none",
                background: active ? "var(--c-accent-soft)" : "transparent",
                border: `1px solid ${active ? "var(--c-accent-border)" : "transparent"}`,
                color: active ? "var(--c-accent-strong)" : "var(--c-text-2)", fontWeight: active ? 700 : 500,
              }}>
                <span style={{ fontSize: "15px" }}>{s.icon}</span>
                <span style={{ flex: 1, minWidth: 0 }}>{s.label}</span>
                <span className="t-micro" style={{ color: active ? "var(--c-accent-strong)" : "var(--c-text-3)", background: active ? "transparent" : "var(--c-surface-2)", padding: "1px 7px", borderRadius: "999px", textTransform: "none", letterSpacing: "normal", opacity: count ? 1 : 0.45 }}>{count}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ── Tools (new section) ─────────────────────────────────────── */}
      <Link href="/tools" className="t-label" style={{ display: "flex", alignItems: "center", gap: "11px", marginTop: "3px", padding: "9px 11px", borderRadius: "10px", textDecoration: "none", background: "transparent", color: "var(--c-text-2)", fontWeight: 500 }}>
        <span style={{ fontSize: "15px" }}>🧰</span>
        <span style={{ flex: 1, minWidth: 0 }}>Interactive tools</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </Link>

      {/* ── Helper cards ────────────────────────────────────────────── */}
      <div style={{ marginTop: "20px", padding: "14px", borderRadius: "13px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
        <div className="t-label" style={{ fontWeight: 700, color: "var(--c-text)", marginBottom: "5px" }}>For health professionals</div>
        <p className="t-micro" style={{ color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal", margin: "0 0 9px", lineHeight: 1.5 }}>Clinical vaccine schedules and country recommendations.</p>
        <Link href="/diseases" className="t-micro" style={{ color: "var(--c-accent-strong)", textDecoration: "none", textTransform: "none", letterSpacing: "normal", fontWeight: 700 }}>Professional resources →</Link>
      </div>

      <div style={{ marginTop: "10px", padding: "14px", borderRadius: "13px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
        <div className="t-label" style={{ fontWeight: 700, color: "var(--c-text)", marginBottom: "5px" }}>Need personal advice?</div>
        <p className="t-micro" style={{ color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal", margin: "0 0 9px", lineHeight: 1.5 }}>This is general guidance — for personal medical advice, see a travel clinic.</p>
        <Link href="/countries" className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--c-accent-strong)", textDecoration: "none", textTransform: "none", letterSpacing: "normal", fontWeight: 700 }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
          Find a travel clinic
        </Link>
      </div>
    </div>
  );
}

export default function ResourceSidebar() {
  return <Suspense fallback={null}><SidebarInner /></Suspense>;
}
