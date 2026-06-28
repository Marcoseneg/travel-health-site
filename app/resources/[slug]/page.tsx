// ═══════════════════════════════════════════════════════════════════════════
// FILE PATH:  app/resources/[slug]/page.tsx   (a single resource — quick-card)
//
//   Renders one Resource as a one-screen document: meta, "when to use", typed
//   content blocks (tiers / checklist / points / quotes), downloads, source.
//   Deliberately NOT an article layout.
// ═══════════════════════════════════════════════════════════════════════════

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getResource, CATEGORY_BY_KEY, type ResourceBlock, type TierTone } from "../../lib/resourcesData";

const TIER_STYLE: Record<TierTone, { dot: string; tagBg: string; tagText: string }> = {
  best: { dot: "#16a34a", tagBg: "rgba(22,163,74,0.12)", tagText: "#15803d" },
  good: { dot: "#0891b2", tagBg: "var(--c-accent-soft)", tagText: "var(--c-accent-strong)" },
  weak: { dot: "#94a3b8", tagBg: "var(--c-surface-2)", tagText: "var(--c-text-3)" },
};

function BlockLabel({ children }: { children: React.ReactNode }) {
  return <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "9px" }}>{children}</div>;
}

function Block({ block }: { block: ResourceBlock }) {
  if (block.type === "prose") {
    return (
      <div style={{ marginBottom: "20px" }}>
        {block.label && <BlockLabel>{block.label}</BlockLabel>}
        <p className="t-body" style={{ color: "var(--c-text-2)", margin: 0, lineHeight: 1.65 }}>{block.text}</p>
      </div>
    );
  }
  if (block.type === "tiers") {
    return (
      <div style={{ marginBottom: "20px" }}>
        {block.label && <BlockLabel>{block.label}</BlockLabel>}
        <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
          {block.items.map((it) => {
            const s = TIER_STYLE[it.tone || "good"];
            return (
              <div key={it.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "10px 14px", borderRadius: "11px", border: "1px solid var(--c-border)", background: "var(--c-surface)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                  <span style={{ width: "9px", height: "9px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                  <span className="t-body" style={{ color: "var(--c-text)", fontWeight: 600 }}>{it.name}</span>
                </span>
                {it.tag && <span className="t-micro" style={{ color: s.tagText, background: s.tagBg, padding: "3px 10px", borderRadius: "999px", textTransform: "none", letterSpacing: "normal", whiteSpace: "nowrap", flexShrink: 0 }}>{it.tag}</span>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (block.type === "checklist") {
    return (
      <div style={{ marginBottom: "20px" }}>
        {block.label && <BlockLabel>{block.label}</BlockLabel>}
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
          {block.items.map((it) => (
            <li key={it} style={{ display: "flex", gap: "10px" }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--c-trust)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}><path d="M20 6 9 17l-5-5" /></svg>
              <span className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.55 }}>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.type === "points") {
    return (
      <div style={{ marginBottom: "20px" }}>
        {block.label && <BlockLabel>{block.label}</BlockLabel>}
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "9px" }}>
          {block.items.map((it) => (
            <li key={it} style={{ display: "flex", gap: "10px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--c-accent)", flexShrink: 0, marginTop: "9px" }} />
              <span className="t-body" style={{ color: "var(--c-text-2)", lineHeight: 1.55 }}>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  // quotes
  return (
    <div style={{ marginBottom: "20px" }}>
      {block.label && <BlockLabel>{block.label}</BlockLabel>}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {block.items.map((it) => (
          <div key={it} style={{ padding: "11px 14px", borderRadius: "11px", background: "var(--c-surface-2)", borderLeft: "3px solid var(--c-warning-border)" }}>
            <span className="t-body" style={{ color: "var(--c-text-2)", fontStyle: "italic" }}>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResourcePage() {
  const params = useParams();
  const slug = params.slug as string;
  const r = getResource(slug);

  if (!r) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0" }}>
        <h1 className="t-h2" style={{ marginBottom: "12px", color: "var(--c-text)" }}>Resource not found</h1>
        <Link href="/resources" className="t-label" style={{ color: "var(--c-accent)", textDecoration: "underline", textUnderlineOffset: "2px" }}>← Back to resources</Link>
      </div>
    );
  }

  const cat = CATEGORY_BY_KEY[r.category];

  return (
      <article style={{ maxWidth: "760px", margin: "0 auto", padding: "4px 0 56px" }}>
        <Link href="/resources" className="t-label" style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--c-text-3)", textDecoration: "none", marginBottom: "22px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
          All resources
        </Link>

        {/* Title + meta */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: "9px", marginBottom: "12px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "9px", background: cat.soft, fontSize: "16px" }}>{cat.icon}</span>
          <span className="t-micro" style={{ color: cat.color, textTransform: "none", letterSpacing: "normal", fontWeight: 700 }}>{cat.label}</span>
        </div>
        <h1 className="t-h1" style={{ margin: "0 0 12px", color: "var(--c-text)" }}>{r.title}</h1>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "22px" }}>
          <span className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--c-text-2)", background: "var(--c-surface-2)", padding: "4px 11px", borderRadius: "999px", textTransform: "none", letterSpacing: "normal" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
            {r.readingTime} min read
          </span>
          {r.badges?.map((b) => (
            <span key={b} className="t-micro" style={{ color: "var(--c-text-2)", background: "var(--c-surface-2)", padding: "4px 11px", borderRadius: "999px", textTransform: "none", letterSpacing: "normal" }}>{b}</span>
          ))}
        </div>

        {/* Intent */}
        {r.intent && (
          <div style={{ padding: "14px 18px", borderRadius: "13px", background: "var(--c-accent-soft)", border: "1px solid var(--c-accent-border)", marginBottom: "26px" }}>
            <div className="t-micro" style={{ color: "var(--c-accent-strong)", marginBottom: "5px" }}>{r.intentLabel || "When to use"}</div>
            <p className="t-body" style={{ color: "var(--c-text)", margin: 0, lineHeight: 1.6 }}>{r.intent}</p>
          </div>
        )}

        {/* Blocks */}
        {r.blocks.map((b, i) => <Block key={i} block={b} />)}

        {/* Downloads */}
        {r.downloads && r.downloads.length > 0 && (
          <div style={{ marginTop: "10px", paddingTop: "20px", borderTop: "1px solid var(--c-border)" }}>
            <div className="t-micro" style={{ color: "var(--c-text-3)", marginBottom: "11px" }}>Download &amp; print</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {r.downloads.map((d, i) => (
                <button key={i} title="PDF coming soon" style={{ display: "inline-flex", alignItems: "center", gap: "7px", padding: "9px 15px", borderRadius: "11px", border: "1px solid var(--c-border)", background: "var(--c-surface)", color: "var(--c-text-2)", cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: "13.5px" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--c-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg>
                  {d.label}{d.lang ? ` · ${d.lang}` : ""}
                </button>
              ))}
            </div>
            <p className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", margin: "10px 2px 0" }}>PDFs are being prepared — buttons are placeholders for now.</p>
          </div>
        )}

        {/* Source */}
        {r.source && (
          <div style={{ marginTop: "20px" }}>
            {r.source.url ? (
              <a href={r.source.url} target="_blank" rel="noopener noreferrer" className="t-micro" style={{ display: "inline-flex", alignItems: "center", gap: "5px", color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal", textDecoration: "none" }}>
                Source: {r.source.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17 17 7M9 7h8v8" /></svg>
              </a>
            ) : (
              <span className="t-micro" style={{ color: "var(--c-text-3)", textTransform: "none", letterSpacing: "normal" }}>Source: {r.source.label}</span>
            )}
          </div>
        )}
      </article>
  );
}
