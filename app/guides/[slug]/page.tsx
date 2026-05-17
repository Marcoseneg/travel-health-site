"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articles, CATEGORY_LABELS } from "../../lib/guidesData";
import QuickRecommendations from "../../components/QuickRecommendations";
import { COVER_ILLUSTRATIONS } from "../../components/illustrations";
import AuthorByline from "../../components/guides/AuthorByline";
import GuideTOC from "../../components/guides/GuideTOC";
import RelatedGuides from "../../components/guides/RelatedGuides";
import { formatDate, slugify } from "../../lib/utils/formatDate";

// ─────────────────────────────────────────────────────────────────────────────
// Article renderer for /guides/<slug>
//
// Reads the matching article from `articles` and renders its `content`
// (Markdown) using react-markdown + remark-gfm (for tables, strikethrough,
// task lists). When `content` is missing — i.e. the article is still a
// placeholder — shows a "coming soon" state instead of crashing.
//
// Styling: reuses the same dark palette as /diseases/[slug] for visual
// consistency. Prose width is 720px (narrower than the disease pages'
// 900px) because long-form reading is more comfortable at ~70 characters
// per line.
// ─────────────────────────────────────────────────────────────────────────────

const PAGE_BG = "#030712";
const TEXT_PRIMARY = "#f1f5f9";
const TEXT_BODY = "#cbd5e1";
const TEXT_MUTED = "#94a3b8";
const TEXT_DIM = "#64748b";
const TEXT_FAINT = "#475569";
const ACCENT = "#38bdf8";
const ACCENT_BRIGHT = "#7dd3fc";
const SURFACE = "rgba(255,255,255,0.025)";
const BORDER = "rgba(255,255,255,0.07)";

export default function GuideArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles.find((a) => a.id === slug);

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!article) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: PAGE_BG,
          color: TEXT_PRIMARY,
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}>
            Article not found
          </h1>
          <Link
            href="/guides"
            style={{ color: ACCENT, textDecoration: "underline", textUnderlineOffset: "2px" }}
          >
            ← Back to all guides
          </Link>
        </div>
      </main>
    );
  }

  const cat = CATEGORY_LABELS[article.category];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: PAGE_BG,
        color: TEXT_PRIMARY,
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <article style={{ maxWidth: "720px", margin: "0 auto", padding: "40px 24px 96px" }}>
        {/* ── Back link ───────────────────────────────────────────────── */}
        <Link
          href="/guides"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "13px",
            color: TEXT_DIM,
            textDecoration: "none",
            marginBottom: "32px",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = TEXT_MUTED;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = TEXT_DIM;
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          All guides
        </Link>

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: cat.color,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "12px",
          }}
        >
          {cat.label}
        </div>

        <h1
          style={{
            fontSize: "clamp(30px, 4vw, 44px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.15,
            margin: "0 0 16px",
          }}
        >
          {article.title}
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: TEXT_MUTED,
            lineHeight: 1.55,
            margin: "0 0 24px",
          }}
        >
          {article.subtitle}
        </p>

        {/* ── Author byline ─────────────────────────────────────────── */}
        <div style={{ paddingBottom: "32px", borderBottom: `1px solid ${BORDER}`, marginBottom: "40px" }}>
          <AuthorByline date={article.date} readingTime={article.readingTime} />
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        {article.content ? (
          <>
            {article.coverIllustration &&
              COVER_ILLUSTRATIONS[article.coverIllustration] && (
                <div
                  style={{
                    marginBottom: "32px",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {(() => {
                    const Illustration =
                      COVER_ILLUSTRATIONS[article.coverIllustration!];
                    return <Illustration />;
                  })()}
                </div>
              )}
            {article.quickRecommendations && (
              <QuickRecommendations cards={article.quickRecommendations} />
            )}
            <GuideTOC content={article.content} />
            <div
              style={{
                fontSize: "17px",
                color: TEXT_BODY,
                lineHeight: 1.75,
              }}
            >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => (
                  <h2
                    style={{
                      fontSize: "28px",
                      fontWeight: 800,
                      color: TEXT_PRIMARY,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.25,
                      margin: "48px 0 16px",
                    }}
                  >
                    {children}
                  </h2>
                ),
                h2: ({ children }) => {
                  // Generate stable id from heading text so the in-page
                  // TOC (<GuideTOC />) can scroll-link to this section.
                  const text =
                    typeof children === "string"
                      ? children
                      : Array.isArray(children)
                      ? children
                          .map((c) => (typeof c === "string" ? c : ""))
                          .join("")
                      : "";
                  const id = slugify(text);
                  return (
                    <h2
                      id={id}
                      style={{
                        fontSize: "24px",
                        fontWeight: 800,
                        color: TEXT_PRIMARY,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.3,
                        margin: "40px 0 14px",
                        scrollMarginTop: "80px",
                      }}
                    >
                      {children}
                    </h2>
                  );
                },
                h3: ({ children }) => (
                  <h3
                    style={{
                      fontSize: "19px",
                      fontWeight: 700,
                      color: TEXT_PRIMARY,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.35,
                      margin: "32px 0 10px",
                    }}
                  >
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p style={{ margin: "0 0 18px", color: TEXT_BODY }}>{children}</p>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    style={{
                      color: ACCENT_BRIGHT,
                      textDecoration: "underline",
                      textUnderlineOffset: "3px",
                      textDecorationThickness: "1px",
                    }}
                    target={href?.startsWith("http") ? "_blank" : undefined}
                    rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul
                    style={{
                      margin: "0 0 20px",
                      paddingLeft: "24px",
                      color: TEXT_BODY,
                    }}
                  >
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol
                    style={{
                      margin: "0 0 20px",
                      paddingLeft: "24px",
                      color: TEXT_BODY,
                    }}
                  >
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li style={{ margin: "0 0 8px", lineHeight: 1.7 }}>{children}</li>
                ),
                strong: ({ children }) => (
                  <strong style={{ fontWeight: 700, color: TEXT_PRIMARY }}>{children}</strong>
                ),
                em: ({ children }) => (
                  <em style={{ fontStyle: "italic", color: TEXT_MUTED }}>{children}</em>
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    style={{
                      margin: "0 0 24px",
                      padding: "16px 24px",
                      borderLeft: `3px solid ${ACCENT}`,
                      background: SURFACE,
                      borderRadius: "0 8px 8px 0",
                      color: TEXT_MUTED,
                      fontStyle: "italic",
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  // Inline code only — block code goes through `pre`
                  if (!className) {
                    return (
                      <code
                        style={{
                          fontFamily: "'JetBrains Mono', ui-monospace, 'SF Mono', monospace",
                          fontSize: "0.9em",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          background: "rgba(255,255,255,0.06)",
                          color: ACCENT_BRIGHT,
                        }}
                      >
                        {children}
                      </code>
                    );
                  }
                  return <code className={className}>{children}</code>;
                },
                pre: ({ children }) => (
                  <pre
                    style={{
                      margin: "0 0 24px",
                      padding: "16px 20px",
                      borderRadius: "10px",
                      background: "rgba(0,0,0,0.4)",
                      border: `1px solid ${BORDER}`,
                      overflow: "auto",
                      fontSize: "14px",
                      lineHeight: 1.55,
                    }}
                  >
                    {children}
                  </pre>
                ),
                hr: () => (
                  <hr
                    style={{
                      border: "none",
                      height: "1px",
                      background: BORDER,
                      margin: "40px 0",
                    }}
                  />
                ),
                table: ({ children }) => (
                  <div style={{ overflowX: "auto", margin: "0 0 24px" }}>
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        fontSize: "14px",
                        background: SURFACE,
                        border: `1px solid ${BORDER}`,
                        borderRadius: "10px",
                        overflow: "hidden",
                      }}
                    >
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead style={{ background: "rgba(255,255,255,0.04)" }}>{children}</thead>
                ),
                th: ({ children }) => (
                  <th
                    style={{
                      padding: "12px 14px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: TEXT_PRIMARY,
                      borderBottom: `1px solid ${BORDER}`,
                      fontSize: "13px",
                    }}
                  >
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td
                    style={{
                      padding: "12px 14px",
                      color: TEXT_BODY,
                      borderBottom: `1px solid ${BORDER}`,
                      verticalAlign: "top",
                    }}
                  >
                    {children}
                  </td>
                ),
              }}
            >
              {article.content}
              </ReactMarkdown>
            </div>
            <RelatedGuides currentSlug={article.id} />
          </>
        ) : (
          // ── Placeholder state ─────────────────────────────────────────
          <div
            style={{
              padding: "64px 32px",
              borderRadius: "16px",
              background: SURFACE,
              border: `1px solid ${BORDER}`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✍️</div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: TEXT_PRIMARY,
                margin: "0 0 8px",
              }}
            >
              Coming soon
            </h2>
            <p style={{ fontSize: "15px", color: TEXT_MUTED, margin: "0 0 24px" }}>
              This guide is being written and will be published shortly.
            </p>
            <Link
              href="/guides"
              style={{
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "999px",
                background: "rgba(56,189,248,0.1)",
                border: `1px solid rgba(56,189,248,0.3)`,
                color: ACCENT_BRIGHT,
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Browse other guides
            </Link>
          </div>
        )}

        {/* ── Tags + footer ────────────────────────────────────────────── */}
        {article.content && article.tags.length > 0 && (
          <div
            style={{
              marginTop: "48px",
              paddingTop: "32px",
              borderTop: `1px solid ${BORDER}`,
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {article.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: TEXT_DIM,
                  background: "rgba(255,255,255,0.03)",
                  padding: "5px 12px",
                  borderRadius: "6px",
                  border: `1px solid ${BORDER}`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
