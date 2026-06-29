import { notFound } from "next/navigation";
import { isValidElement, type ReactNode } from "react";
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
import JsonLd from "../../components/JsonLd";
import { SITE_URL, authorRef, publisherRef } from "../../lib/seo";

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

// ── Heading anchors ──────────────────────────────────────────────────────────
// Flatten React children to plain text so h2s get stable ids that the rail's
// "On this page" table of contents can link to.
function toText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  if (isValidElement(node)) return toText((node.props as { children?: ReactNode }).children);
  return "";
}
function slugify(s: string): string {
  return s.toLowerCase().trim().replace(/[^\w]+/g, "-").replace(/^-+|-+$/g, "");
}

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
    <h2 id={slugify(toText(children))} style={{ fontSize: "24px", fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: "-0.02em", lineHeight: 1.3, margin: "40px 0 14px", scrollMarginTop: "90px" }}>
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

  // Related: prefer shared tags / category, then fall back to most recent.
  const tagSet = new Set(insight.tags ?? []);
  const related = insights
    .filter((i) => i.id !== insight.id)
    .map((i) => ({
      i,
      score:
        (i.tags ?? []).filter((t) => tagSet.has(t)).length +
        (i.category === insight.category ? 0.5 : 0),
    }))
    .sort((a, b) => b.score - a.score || (a.i.date < b.i.date ? 1 : -1))
    .slice(0, 4)
    .map((s) => s.i);

  // Table of contents from the article's ## headings (ids match the h2 slugs).
  const toc = Array.from(insight.content.matchAll(/^##\s+(.+)$/gm)).map((m) => {
    const text = m[1].trim().replace(/\*\*/g, "");
    return { text, id: slugify(text) };
  });

  const coverSrc = insight.coverImage?.src;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.subtitle,
    datePublished: insight.date,
    dateModified: insight.date,
    author: authorRef,
    publisher: publisherRef,
    mainEntityOfPage: `${SITE_URL}/insights/${slug}`,
    ...(coverSrc
      ? { image: coverSrc.startsWith("http") ? coverSrc : `${SITE_URL}${coverSrc}` }
      : {}),
    ...(insight.citation
      ? {
          citation: {
            "@type": "ScholarlyArticle",
            name: insight.citation.title,
            url: insight.citation.url,
            datePublished: insight.citation.year,
            isPartOf: { "@type": "Periodical", name: insight.citation.journal },
          },
        }
      : {}),
  };

  // Share targets (server-rendered plain links — no client JS needed).
  const shareUrl = `${SITE_URL}/insights/${slug}`;
  const enc = encodeURIComponent;
  const emailHref = `mailto:?subject=${enc(insight.title)}&body=${enc(shareUrl)}`;
  const xHref = `https://twitter.com/intent/tweet?url=${enc(shareUrl)}&text=${enc(insight.title)}`;
  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${enc(shareUrl)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${enc(shareUrl)}`;

  return (
    <main
      style={{
        background: "var(--c-bg)",
        minHeight: "100vh",
        color: TEXT_PRIMARY,
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <JsonLd data={articleSchema} />
      <div className="ins-shell">
        <article className="ins-main">
          {/* Breadcrumb */}
          <nav className="ins-crumb" aria-label="Breadcrumb">
            <Link href="/insights">Insights</Link>
            <span className="ins-crumb-sep">›</span>
            <span style={{ color: cat.color }}>{cat.label}</span>
          </nav>

          {/* ── Header ──────────────────────────────────────────────────────── */}
          <header>
            {/* Kicker: category | date */}
            <div className="ins-kicker">
              <span style={{ color: cat.color }}>{cat.label}</span>
              <span className="ins-kicker-bar" aria-hidden="true" />
              <span>{formatDate(insight.date)}</span>
            </div>

            <h1 className="ins-headline">{insight.title}</h1>

            <p className="ins-standfirst">{insight.subtitle}</p>

            {/* Byline */}
            <div className="ins-byline">
              <span>By <strong>{insight.author}</strong></span>
              <span className="ins-byline-sep" aria-hidden="true">·</span>
              <span>{insight.readingTime} min read</span>
            </div>

            {/* Share row */}
            <div className="ins-share">
              <a className="ins-share-btn" href={emailHref} aria-label="Share by email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
              </a>
              <a className="ins-share-btn" href={xHref} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" /></svg>
              </a>
              <a className="ins-share-btn" href={linkedInHref} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14ZM8.34 18.34V9.86H5.66v8.48h2.68ZM7 8.67a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1Zm11.34 9.67v-4.65c0-2.49-1.33-3.65-3.1-3.65a2.67 2.67 0 0 0-2.42 1.33v-1.14h-2.68v8.48h2.68v-4.49c0-1.18.22-2.32 1.68-2.32 1.44 0 1.46 1.35 1.46 2.4v4.41h2.68Z" /></svg>
              </a>
              <a className="ins-share-btn" href={facebookHref} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" /></svg>
              </a>
            </div>

            <div className="ins-divider" />
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

        </article>

        {/* ── Right rail ──────────────────────────────────────────────────── */}
        <aside className="ins-rail">
          {/* Cited study */}
          {insight.citation && (
            <div className="ins-card">
              <div className="ins-card-label">The study</div>
              <p style={{ fontSize: "14px", fontWeight: 600, color: TEXT_PRIMARY, lineHeight: 1.4, margin: "0 0 8px" }}>
                {insight.citation.title}
              </p>
              <p className="t-label" style={{ color: TEXT_MUTED, margin: "0 0 4px" }}>
                {insight.citation.journal} · {insight.citation.year}
              </p>
              <p className="t-micro" style={{ color: TEXT_FAINT, textTransform: "none", letterSpacing: "normal", margin: "0 0 14px", lineHeight: 1.5 }}>
                {insight.citation.authors}
              </p>
              <a
                href={insight.citation.url}
                target="_blank"
                rel="noreferrer noopener"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "#fff", background: "var(--c-accent)", padding: "9px 14px", borderRadius: "10px", textDecoration: "none" }}
              >
                Read on {insight.citation.journal.split(" ")[0]}
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
              </a>
            </div>
          )}

          {/* On this page */}
          {toc.length > 1 && (
            <div className="ins-card">
              <div className="ins-card-label">On this page</div>
              <nav style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                {toc.map((h) => (
                  <a key={h.id} href={`#${h.id}`} className="ins-toc-link">{h.text}</a>
                ))}
              </nav>
            </div>
          )}

          {/* Related articles — Nature-style title + thumbnail rows */}
          {related.length > 0 && (
            <div className="ins-card">
              <div className="ins-card-label">Related articles</div>
              <div>
                {related.map((r) => (
                  <Link key={r.id} href={`/insights/${r.id}`} className="ins-related">
                    <span className="ins-related-title">{r.title}</span>
                    <span
                      className="ins-related-thumb"
                      style={r.coverImage ? { backgroundImage: `url(${r.coverImage.src})` } : { background: r.coverGradient ?? "var(--c-surface-2)" }}
                    />
                  </Link>
                ))}
              </div>
              <Link href="/insights" className="ins-related-all">All insights →</Link>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
