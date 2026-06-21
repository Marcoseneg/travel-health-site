import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  insights,
  getInsight,
  INSIGHT_CATEGORY_LABELS,
} from "../../lib/insights";
import { formatDate } from "../../lib/utils/formatDate";

// ── Design tokens ────────────────────────────────────────────────────────────
// Mapped to the shared light-theme --c-* tokens defined in globals.css.
const TEXT_PRIMARY = "var(--c-text)";
const TEXT_BODY = "var(--c-text-2)";
const TEXT_MUTED = "var(--c-text-2)";
const TEXT_FAINT = "var(--c-text-3)";
const ACCENT = "var(--c-accent)";
const ACCENT_BRIGHT = "var(--c-accent-strong)";
const SURFACE = "var(--c-surface-2)";
const BORDER = "var(--c-border)";

// ── Markdown component overrides ─────────────────────────────────────────────
// Mirrors the typed override pattern used by guides/[slug]/page.tsx so the
// long-form prose reads identically across guides and insights.
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 style={{ fontSize: "30px", fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: "-0.02em", margin: "48px 0 16px", lineHeight: 1.2 }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ fontSize: "24px", fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: "-0.02em", lineHeight: 1.3, margin: "40px 0 14px", scrollMarginTop: "80px" }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontSize: "19px", fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: "-0.01em", margin: "32px 0 12px" }}>
      {children}
    </h3>
  ),
  p: ({ children }) => <p style={{ margin: "0 0 18px", lineHeight: 1.8 }}>{children}</p>,
  ul: ({ children }) => <ul style={{ margin: "0 0 18px", paddingLeft: "20px", lineHeight: 1.8 }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ margin: "0 0 18px", paddingLeft: "20px", lineHeight: 1.8 }}>{children}</ol>,
  li: ({ children }) => <li style={{ margin: "0 0 6px" }}>{children}</li>,
  strong: ({ children }) => <strong style={{ color: TEXT_PRIMARY, fontWeight: 700 }}>{children}</strong>,
  em: ({ children }) => <em style={{ color: TEXT_PRIMARY, fontStyle: "italic" }}>{children}</em>,
  a: ({ children, href }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
      style={{ color: ACCENT_BRIGHT, textDecoration: "underline", textDecorationColor: "var(--c-accent-border)", textUnderlineOffset: "3px" }}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{ borderLeft: `3px solid ${ACCENT}`, padding: "4px 0 4px 20px", margin: "24px 0", color: TEXT_PRIMARY, fontStyle: "italic" }}>
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code style={{ background: SURFACE, border: `1px solid ${BORDER}`, borderRadius: "4px", padding: "1px 6px", fontSize: "0.92em", fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace", color: TEXT_PRIMARY }}>
      {children}
    </code>
  ),
  table: ({ children }) => (
    <div style={{ overflowX: "auto", margin: "24px 0" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => <tr style={{ borderBottom: `1px solid ${BORDER}` }}>{children}</tr>,
  th: ({ children }) => (
    <th style={{ textAlign: "left", padding: "10px 12px", fontWeight: 700, color: TEXT_PRIMARY, background: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
      {children}
    </th>
  ),
  td: ({ children }) => <td style={{ padding: "10px 12px", verticalAlign: "top", color: TEXT_BODY }}>{children}</td>,
  hr: () => <hr style={{ border: 0, height: "1px", background: BORDER, margin: "40px 0" }} />,
};

// ── Static generation ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) return { title: "Insight not found — TravelMed" };
  return {
    title: `${insight.title} — TravelMed`,
    description: insight.subtitle,
  };
}

type Props = { params: Promise<{ slug: string }> };

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const insight = getInsight(slug);
  if (!insight) notFound();

  const cat = INSIGHT_CATEGORY_LABELS[insight.category];
  const hasPhotoHero = !!insight.coverImage;
  const coverBackground = insight.coverImage
    ? undefined
    : insight.coverGradient ?? "linear-gradient(135deg, var(--c-accent), var(--c-accent-strong))";

  const related = insights.filter((i) => i.id !== insight.id).slice(0, 3);

  return (
    <main
      style={{
        background: "var(--c-bg)",
        minHeight: "100vh",
        color: TEXT_PRIMARY,
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px 24px 0" }}>
        <Link
          href="/insights"
          style={{
            display: "inline-block",
            fontSize: "13px",
            color: ACCENT,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← All insights
        </Link>
      </div>

      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 64px" }}>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <header>
          <span
            className="t-micro"
            style={{
              display: "inline-block",
              padding: "4px 10px",
              borderRadius: "var(--c-radius-md)",
              background: `${cat.color}18`,
              color: cat.color,
              marginBottom: "20px",
            }}
          >
            {cat.label}
          </span>

          <h1 className="t-display" style={{ color: TEXT_PRIMARY, margin: "0 0 16px" }}>
            {insight.title}
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: TEXT_MUTED,
              lineHeight: 1.5,
              margin: "0 0 24px",
              letterSpacing: "-0.005em",
            }}
          >
            {insight.subtitle}
          </p>

          {/* Byline row: author · date · reading time */}
          <div
            className="t-label"
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "8px",
              color: TEXT_FAINT,
              paddingBottom: "32px",
              borderBottom: `1px solid ${BORDER}`,
              marginBottom: hasPhotoHero ? "32px" : "40px",
            }}
          >
            <span style={{ color: TEXT_BODY, fontWeight: 600 }}>{insight.author}</span>
            <span style={{ color: "var(--c-border-strong)" }}>·</span>
            <span>{formatDate(insight.date)}</span>
            <span style={{ color: "var(--c-border-strong)" }}>·</span>
            <span>{insight.readingTime} min read</span>
          </div>
        </header>

        {/* ── Cover header band ───────────────────────────────────────────── */}
        {hasPhotoHero && insight.coverImage ? (
          <figure
            style={{
              margin: "0 0 40px",
              borderRadius: "var(--c-radius-lg)",
              overflow: "hidden",
              border: `1px solid ${BORDER}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={insight.coverImage.src}
              alt={insight.coverImage.alt}
              style={{ display: "block", width: "100%", height: "auto", objectFit: "cover" }}
            />
            {insight.coverImage.credit && (
              <figcaption
                className="t-micro"
                style={{
                  padding: "8px 12px",
                  color: TEXT_FAINT,
                  background: SURFACE,
                  textTransform: "none",
                  letterSpacing: "0.02em",
                  fontWeight: 500,
                }}
              >
                Photo: {insight.coverImage.credit}
              </figcaption>
            )}
          </figure>
        ) : (
          <div
            style={{
              height: "220px",
              borderRadius: "var(--c-radius-lg)",
              background: coverBackground,
              marginBottom: "40px",
            }}
            aria-hidden="true"
          />
        )}

        {/* ── Body ────────────────────────────────────────────────────────── */}
        <div style={{ fontSize: "17px", color: TEXT_BODY, lineHeight: 1.8 }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {insight.content}
          </ReactMarkdown>
        </div>

        {/* ── Tags ────────────────────────────────────────────────────────── */}
        {insight.tags && insight.tags.length > 0 && (
          <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${BORDER}`, display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="t-label"
                style={{ color: TEXT_MUTED, background: SURFACE, border: `1px solid ${BORDER}`, padding: "4px 10px", borderRadius: "var(--c-radius-md)" }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── Related insights ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section style={{ marginTop: "64px", paddingTop: "40px", borderTop: `1px solid ${BORDER}` }}>
            <h2 className="t-h1" style={{ color: TEXT_PRIMARY, margin: "0 0 24px" }}>
              Related insights
            </h2>
            <div style={{ display: "grid", gap: "16px" }}>
              {related.map((r) => {
                const rc = INSIGHT_CATEGORY_LABELS[r.category];
                return (
                  <Link
                    key={r.id}
                    href={`/insights/${r.id}`}
                    style={{
                      display: "block",
                      padding: "20px",
                      borderRadius: "var(--c-radius-md)",
                      background: "var(--c-surface)",
                      border: `1px solid ${BORDER}`,
                      textDecoration: "none",
                    }}
                  >
                    <span
                      className="t-micro"
                      style={{ display: "block", color: rc.color, marginBottom: "8px" }}
                    >
                      {rc.label}
                    </span>
                    <span
                      className="t-h3"
                      style={{ display: "block", color: TEXT_PRIMARY, fontWeight: 700, marginBottom: "6px" }}
                    >
                      {r.title}
                    </span>
                    <span className="t-label" style={{ display: "block", color: TEXT_MUTED, lineHeight: 1.5 }}>
                      {r.subtitle}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
