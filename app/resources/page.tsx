// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/resources/page.tsx   (Resource Center landing)
//
//   Consumer-facing, goal-first landing (no sidebar). Sections:
//     1. Hero — title, subtitle, search, trust row, illustration
//     2. "What do you need today?" — 6 goal cards (= sections)
//     3. "Popular resources" — photo-card carousel
//     4. "New & updated" list + a helper rail
//   Typing in the search (or arriving via a goal card's ?section=) collapses
//   everything to a single result list.
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { Suspense, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  RESOURCES, CATEGORY_BY_KEY, SECTIONS,
  FEATURED_IDS, RESOURCE_UPDATES, getResource,
  type Resource, type ResourceCategoryKey, type SectionKey,
} from "../lib/resourcesData";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmt(iso: string) { const [y, m, d] = iso.split("-"); return `${MONTHS[+m - 1]} ${+d}, ${y}`; }
const UPDATED_BY_ID: Record<string, { date: string; flag: "new" | "updated" }> =
  Object.fromEntries(RESOURCE_UPDATES.map((u) => [u.id, { date: u.date, flag: u.flag }]));

// Per-section visual meta for the goal cards (blurb + accent).
const SECTION_META: Record<SectionKey, { blurb: string; color: string; soft: string }> = {
  before: { blurb: "Plan, prepare and get ready to travel safely.", color: "#0d9488", soft: "rgba(13,148,136,0.10)" },
  preventing: { blurb: "Avoid mosquito bites, food-borne illness and other risks.", color: "#2563eb", soft: "rgba(37,99,235,0.09)" },
  special: { blurb: "Children, pregnancy, older adults and visiting family.", color: "#7c3aed", soft: "rgba(124,58,237,0.09)" },
  during: { blurb: "What to do if you get sick while travelling.", color: "#ea580c", soft: "rgba(234,88,12,0.10)" },
  kits: { blurb: "Packing lists, medical kits and printable checklists.", color: "#ca8a04", soft: "rgba(202,138,4,0.11)" },
  after: { blurb: "Fever or illness after you return home.", color: "#dc2626", soft: "rgba(220,38,38,0.09)" },
};

function photoBg(r: Resource): React.CSSProperties {
  const cat = CATEGORY_BY_KEY[r.category];
  return {
    backgroundImage: `url(/images/resources/cards/${r.id}.jpg), linear-gradient(150deg, ${cat.soft}, ${cat.color})`,
    backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat",
  };
}

function TopicChip({ r, onPhoto }: { r: Resource; onPhoto?: boolean }) {
  const cat = CATEGORY_BY_KEY[r.category];
  return (
    <span className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "999px", background: onPhoto ? "rgba(255,255,255,0.94)" : cat.soft, color: cat.color, textTransform: "none", letterSpacing: "normal", fontWeight: 700, whiteSpace: "nowrap" }}>
      <span style={{ fontSize: "12px" }}>{cat.icon}</span>{cat.label}
    </span>
  );
}

const DownloadIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg>
);

// ── Goal card (= a section) ───────────────────────────────────────────────
function GoalCard({ s }: { s: { key: SectionKey; label: string; icon: string } }) {
  const m = SECTION_META[s.key];
  return (
    <Link href={`/resources?section=${s.key}`}
      style={{ display: "flex", flexDirection: "column", gap: "9px", padding: "18px 18px 15px", borderRadius: "16px", textDecoration: "none", background: m.soft, border: `1px solid ${m.color}26`, transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 26px ${m.color}24`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "42px", height: "42px", borderRadius: "12px", background: `${m.color}1f`, fontSize: "21px" }}>{s.icon}</span>
      <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)", fontSize: "15.5px", lineHeight: 1.25 }}>{s.label}</div>
      <p className="t-label" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.5, flex: 1 }}>{m.blurb}</p>
      <span style={{ color: m.color, marginTop: "2px" }}>
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
      </span>
    </Link>
  );
}

// ── Photo card (carousel) ─────────────────────────────────────────────────
function PhotoCard({ r }: { r: Resource }) {
  const cat = CATEGORY_BY_KEY[r.category];
  return (
    <Link href={`/resources/${r.id}`}
      style={{ display: "flex", flexDirection: "column", borderRadius: "16px", overflow: "hidden", textDecoration: "none", background: "var(--c-surface)", border: "1px solid var(--c-border)", transition: "transform 0.2s, box-shadow 0.2s" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 14px 30px ${cat.color}26`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "relative", height: "150px", ...photoBg(r) }}>
        <span style={{ position: "absolute", bottom: "10px", left: "12px" }}><TopicChip r={r} onPhoto /></span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "14px 16px" }}>
        <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)", fontSize: "15.5px", lineHeight: 1.3, marginBottom: "6px" }}>{r.title}</div>
        <p className="t-label" style={{ color: "var(--c-text-2)", margin: "0 0 13px", lineHeight: 1.5, flex: 1 }}>{r.summary}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>{r.readingTime} min
          </span>
          {r.downloads && r.downloads.length > 0 && (
            <span className="t-micro" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "4px", color: "var(--c-accent-strong)", textTransform: "none", letterSpacing: "normal", fontWeight: 600 }}><DownloadIcon />PDF</span>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── Result row (filtered view) ────────────────────────────────────────────
function ResourceRow({ r }: { r: Resource }) {
  return (
    <Link href={`/resources/${r.id}`}
      style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px 15px", borderRadius: "13px", textDecoration: "none", background: "var(--c-surface)", border: "1px solid var(--c-border)", transition: "border-color 0.15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-accent-border)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--c-border)"; }}>
      <div style={{ width: "58px", height: "44px", borderRadius: "9px", flexShrink: 0, ...photoBg(r) }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div className="t-label" style={{ fontWeight: 700, color: "var(--c-text)", marginBottom: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</div>
        <div className="t-micro" style={{ color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.summary}</div>
      </div>
      <div className="res-row-meta">
        <TopicChip r={r} />
        <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", width: "70px" }}>{r.readingTime} min read</span>
      </div>
      <span style={{ color: "var(--c-accent-strong)", flexShrink: 0 }}><DownloadIcon /></span>
    </Link>
  );
}

// ── New & updated row ─────────────────────────────────────────────────────
function UpdateRow({ id }: { id: string }) {
  const r = getResource(id);
  const u = UPDATED_BY_ID[id];
  if (!r || !u) return null;
  const isNew = u.flag === "new";
  return (
    <Link href={`/resources/${r.id}`}
      style={{ display: "flex", alignItems: "center", gap: "15px", padding: "12px 15px", borderRadius: "13px", textDecoration: "none", background: "var(--c-surface)", border: "1px solid var(--c-border)", transition: "border-color 0.15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--c-accent-border)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--c-border)"; }}>
      <div style={{ width: "58px", height: "46px", borderRadius: "9px", flexShrink: 0, ...photoBg(r) }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
          <span className="t-micro" style={{ padding: "1px 8px", borderRadius: "999px", textTransform: "none", letterSpacing: "normal", fontWeight: 700, color: isNew ? "var(--c-trust)" : "var(--c-accent-strong)", background: isNew ? "var(--c-trust-soft)" : "var(--c-accent-soft)", flexShrink: 0 }}>{isNew ? "New" : "Updated"}</span>
          <span className="t-label" style={{ fontWeight: 700, color: "var(--c-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.title}</span>
        </div>
        <div className="t-micro" style={{ color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.summary}</div>
      </div>
      <div className="res-row-meta">
        <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", width: "92px" }}>{fmt(u.date)}</span>
        <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", width: "70px" }}>{r.readingTime} min read</span>
      </div>
      <span style={{ color: "var(--c-accent-strong)", flexShrink: 0 }}><DownloadIcon /></span>
    </Link>
  );
}

function HelperCard({ icon, title, body, linkLabel, href }: { icon: React.ReactNode; title: string; body: string; linkLabel: string; href: string }) {
  return (
    <div style={{ padding: "17px 18px", borderRadius: "15px", background: "var(--c-surface)", border: "1px solid var(--c-border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "7px", color: "var(--c-accent-strong)" }}>
        {icon}
        <span className="t-label" style={{ fontWeight: 700, color: "var(--c-text)" }}>{title}</span>
      </div>
      <p className="t-micro" style={{ color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal", margin: "0 0 10px", lineHeight: 1.55 }}>{body}</p>
      <Link href={href} className="t-micro" style={{ color: "var(--c-accent-strong)", textDecoration: "none", textTransform: "none", letterSpacing: "normal", fontWeight: 700 }}>{linkLabel} →</Link>
    </div>
  );
}

function Inner() {
  const params = useSearchParams();
  const section = (params.get("section") as SectionKey | null) || null;
  const topic = (params.get("topic") as ResourceCategoryKey | null) || null;
  const [query, setQuery] = useState("");

  const filtering = !!(section || topic || query.trim());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      if (topic && r.category !== topic) return false;
      if (section && CATEGORY_BY_KEY[r.category].section !== section) return false;
      if (!q) return true;
      return r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q) || CATEGORY_BY_KEY[r.category].label.toLowerCase().includes(q);
    });
  }, [section, topic, query]);

  const featured = useMemo(() => FEATURED_IDS.map(getResource).filter(Boolean) as Resource[], []);

  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: 1 | -1) => carouselRef.current?.scrollBy({ left: dir * 330, behavior: "smooth" });

  const filterHeading = topic ? CATEGORY_BY_KEY[topic].label
    : section ? (SECTIONS.find((s) => s.key === section)?.label ?? "Resources")
    : "Search results";

  const arrowBtn: React.CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "32px", height: "32px", borderRadius: "999px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text-2)", cursor: "pointer" };

  return (
    <div>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <div className="res-head" style={{ display: "flex", flexWrap: "wrap", gap: "24px 44px", alignItems: "center", justifyContent: "space-between", marginBottom: "40px" }}>
        <div style={{ flex: "1 1 460px", minWidth: 0, maxWidth: "600px" }}>
          <h1 className="t-display" style={{ margin: "0 0 12px", color: "var(--c-text)" }}>Travel Health Resources</h1>
          <p className="t-body" style={{ color: "var(--c-text-2)", fontSize: "16px", lineHeight: 1.6, margin: "0 0 20px", maxWidth: "520px" }}>
            Practical, evidence-based guidance to help you prepare, stay healthy, and manage risks while travelling.
          </p>
          <div style={{ position: "relative", maxWidth: "560px", marginBottom: "16px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--c-text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What are you looking for?" aria-label="Search resources"
              style={{ width: "100%", padding: "13px 18px 13px 46px", borderRadius: "13px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text)", fontSize: "15px", fontFamily: "inherit", outline: "none", boxShadow: "0 2px 10px rgba(15,23,42,0.05)", boxSizing: "border-box" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px" }}>
            {["Evidence-based", "Expert-reviewed", "Updated regularly", "Free to download"].map((t) => (
              <span key={t} className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--c-text-2)", textTransform: "none", letterSpacing: "normal" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--c-trust)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>{t}
              </span>
            ))}
          </div>
        </div>
        <div className="res-illu" style={{ flex: "0 0 380px", width: "380px", height: "248px", overflow: "hidden", borderRadius: "16px" }} aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/resources/hero.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "82% center", display: "block" }} />
        </div>
      </div>

      {filtering ? (
        /* ── Filtered result list ─────────────────────────────────────── */
        <>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "14px" }}>
            <h2 className="t-h3" style={{ margin: 0, color: "var(--c-text)", fontWeight: 700 }}>{filterHeading}</h2>
            <Link href="/resources" onClick={() => setQuery("")} className="t-label" style={{ color: "var(--c-accent-strong)", textDecoration: "none", fontWeight: 600 }}>Clear →</Link>
          </div>
          {filtered.length === 0 ? (
            <p className="t-body" style={{ textAlign: "center", padding: "40px 0", color: "var(--c-text-3)" }}>No resources found.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
              {filtered.map((r) => <ResourceRow key={r.id} r={r} />)}
            </div>
          )}
        </>
      ) : (
        <>
          {/* ── What do you need today? (goal cards) ───────────────────── */}
          <h2 className="t-h2" style={{ margin: "0 0 16px", color: "var(--c-text)", fontWeight: 700 }}>What do you need today?</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "14px", marginBottom: "40px" }}>
            {SECTIONS.map((s) => <GoalCard key={s.key} s={s} />)}
          </div>

          {/* ── Popular resources (carousel) ───────────────────────────── */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <h2 className="t-h2" style={{ margin: 0, color: "var(--c-text)", fontWeight: 700 }}>Popular resources</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button aria-label="Scroll left" onClick={() => scrollBy(-1)} style={arrowBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button aria-label="Scroll right" onClick={() => scrollBy(1)} style={arrowBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>
          <div ref={carouselRef} className="res-carousel" style={{ marginBottom: "40px" }}>
            {featured.map((r) => <PhotoCard key={r.id} r={r} />)}
          </div>

          {/* ── New & updated + helper rail ────────────────────────────── */}
          <div className="res-newgrid">
            <div>
              <h2 className="t-h2" style={{ margin: "0 0 14px", color: "var(--c-text)", fontWeight: 700 }}>New &amp; updated</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                {RESOURCE_UPDATES.map((u) => <UpdateRow key={u.id} id={u.id} />)}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <HelperCard
                href="/diseases"
                title="For health professionals"
                body="Clinical vaccine schedules and country recommendations for clinicians."
                linkLabel="Professional resources"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v4a4 4 0 0 0 8 0V3" /><path d="M9 11v3a6 6 0 0 0 12 0v-2" /><circle cx="21" cy="11" r="1" /></svg>}
              />
              <HelperCard
                href="/tools"
                title="Need a tool?"
                body="Find a yellow-fever centre, a travel clinic, and more interactive utilities."
                linkLabel="Browse tools"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h18M3 12h18M3 17h18" /></svg>}
              />
              <HelperCard
                href="/countries"
                title="Need personal advice?"
                body="This is general guidance — for personal medical advice, see a travel clinic."
                linkLabel="Find a travel clinic"
                icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-5.2-7-11a7 7 0 0 1 14 0c0 5.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>}
              />
            </div>
          </div>

          {/* ── Trip-planner CTA ───────────────────────────────────────── */}
          <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "22px 26px", borderRadius: "18px", background: "linear-gradient(135deg, var(--c-accent-soft), var(--c-surface))", border: "1px solid var(--c-accent-border)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{ fontSize: "26px" }}>🧭</span>
              <div>
                <div className="t-h3" style={{ fontWeight: 700, color: "var(--c-text)", marginBottom: "3px" }}>Planning a trip?</div>
                <p className="t-body" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.5, maxWidth: "460px" }}>Build your trip to get vaccine, malaria and outbreak guidance for every destination.</p>
              </div>
            </div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "11px 20px", borderRadius: "12px", background: "var(--c-accent)", color: "#fff", fontWeight: 700, fontSize: "14px", textDecoration: "none", whiteSpace: "nowrap", boxShadow: "0 10px 24px rgba(8,145,178,0.26)" }}>
              Plan a trip
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  return <Suspense fallback={null}><Inner /></Suspense>;
}
