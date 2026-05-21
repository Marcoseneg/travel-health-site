"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articles, CATEGORY_LABELS } from "../../lib/guidesData";
import QuickRecommendations from "../../components/QuickRecommendations";
import { COVER_ILLUSTRATIONS } from "../../components/illustrations";
import AuthorByline from "../../components/guides/AuthorByline";
import GuideTOC from "../../components/guides/GuideTOC";
import RelatedGuides from "../../components/guides/RelatedGuides";
import QuickFacts from "../../components/guides/QuickFacts";
import OnThisPageNav from "../../components/guides/OnThisPageNav";
import { formatDate, slugify } from "../../lib/utils/formatDate";

// ── Design tokens ────────────────────────────────────────────────────────────
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

// Viewport width at which the right sidebar appears. Below this, the
// article renders single-column.
const SIDEBAR_BREAKPOINT = 1000;

export default function GuideArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articles.find((a) => a.id === slug);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= SIDEBAR_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!article) {
    return (
      <main style={{ background: PAGE_BG, minHeight: "100vh", color: TEXT_PRIMARY, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <article style={{ maxWidth: "720px", margin: "0 auto", padding: "48px 24px" }}>
          <Link href="/guides" style={{ color: ACCENT, fontSize: "14px", textDecoration: "none" }}>
            ← All guides
          </Link>
          <h1 style={{ fontSize: "32px", fontWeight: 800, marginTop: "24px", letterSpacing: "-0.02em" }}>
            Article not found
          </h1>
          <p style={{ color: TEXT_MUTED, fontSize: "16px", marginTop: "12px" }}>
            We couldn't find that guide. Browse all guides to find what you're looking for.
          </p>
        </article>
      </main>
    );
  }

  const cat = CATEGORY_LABELS[article.category];
  const Illustration =
    article.coverIllustration && COVER_ILLUSTRATIONS[article.coverIllustration]
      ? COVER_ILLUSTRATIONS[article.coverIllustration]
      : null;

  // Two-column layout when we have content AND we're on desktop.
  // Placeholders and mobile remain single-column.
  const useTwoColumn = isDesktop && !!article.content;

  return (
    <main
      style={{
        background: PAGE_BG,
        minHeight: "100vh",
        color: TEXT_PRIMARY,
        fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
      }}
    >
      <article
        style={{
          maxWidth: useTwoColumn ? "1100px" : "720px",
          margin: "0 auto",
          padding: "32px 24px 64px",
        }}
      >
        <div
          style={{
            display: useTwoColumn ? "grid" : "block",
            gridTemplateColumns: useTwoColumn ? "minmax(0, 1fr) 300px" : undefined,
            gap: useTwoColumn ? "56px" : undefined,
            alignItems: "start",
          }}
        >
          {/* ── Main column ──────────────────────────────────────────────────── */}
          <div style={{ minWidth: 0 }}>
            {/* Back link */}
            <Link
              href="/guides"
              style={{
                display: "inline-block",
                fontSize: "13px",
                color: ACCENT,
                textDecoration: "none",
                marginBottom: "32px",
                fontWeight: 500,
              }}
            >
              ← All guides
            </Link>

            {/* Category badge */}
            <div
              style={{
                display: "inline-block",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "4px 10px",
                borderRadius: "6px",
                background: `${cat.color}18`,
                color: cat.color,
                marginBottom: "20px",
              }}
            >
              {cat.label}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                margin: "0 0 16px",
              }}
            >
              {article.title}
            </h1>

            {/* Subtitle */}
            {article.subtitle && (
              <p
                style={{
                  fontSize: "18px",
                  color: TEXT_BODY,
                  lineHeight: 1.5,
                  margin: "0 0 16px",
                  letterSpacing: "-0.005em",
                }}
              >
                {article.subtitle}
              </p>
            )}

            {/* Author byline */}
            <div
              style={{
                paddingBottom: "32px",
                borderBottom: `1px solid ${BORDER}`,
                marginBottom: "40px",
              }}
            >
              <AuthorByline date={article.date} readingTime={article.readingTime} />
            </div>

            {/* Cover illustration */}
            {Illustration && (
              <div
                style={{
                  height: "220px",
                  borderRadius: "20px",
                  overflow: "hidden",
                  background: article.coverGradient,
                  marginBottom: "40px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "100%", maxWidth: "600px", padding: "0 24px" }}>
                    <Illustration />
                  </div>
                </div>
              </div>
            )}

            {/* Body */}
            {article.content ? (
              <>
                {/* QuickFacts: only in main column on mobile.
                    On desktop, it renders in the sidebar instead. */}
                {!useTwoColumn && article.quickFacts && (
                  <QuickFacts facts={article.quickFacts} />
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
                        <h1
                          style={{
                            fontSize: "30px",
                            fontWeight: 800,
                            color: TEXT_PRIMARY,
                            letterSpacing: "-0.02em",
                            margin: "48px 0 16px",
                            lineHeight: 1.2,
                          }}
                        >
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => {
                        // Generate stable id from heading text so the
                        // in-page TOC (<GuideTOC />) and sidebar nav
                        // (<OnThisPageNav />) can scroll-link to this
                        // section.
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
                            margin: "32px 0 12px",
                          }}
                        >
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p style={{ margin: "0 0 18px", lineHeight: 1.75 }}>{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul
                          style={{
                            margin: "0 0 18px",
                            paddingLeft: "20px",
                            lineHeight: 1.75,
                          }}
                        >
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol
                          style={{
                            margin: "0 0 18px",
                            paddingLeft: "20px",
                            lineHeight: 1.75,
                          }}
                        >
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li style={{ margin: "0 0 6px" }}>{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong style={{ color: TEXT_PRIMARY, fontWeight: 700 }}>
                          {children}
                        </strong>
                      ),
                      em: ({ children }) => (
                        <em style={{ color: TEXT_PRIMARY, fontStyle: "italic" }}>
                          {children}
                        </em>
                      ),
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target={href?.startsWith("http") ? "_blank" : undefined}
                          rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
                          style={{
                            color: ACCENT_BRIGHT,
                            textDecoration: "underline",
                            textDecorationColor: "rgba(125,211,252,0.3)",
                            textUnderlineOffset: "3px",
                          }}
                        >
                          {children}
                        </a>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote
                          style={{
                            borderLeft: `3px solid ${ACCENT}`,
                            padding: "4px 0 4px 20px",
                            margin: "24px 0",
                            color: TEXT_PRIMARY,
                            fontStyle: "italic",
                          }}
                        >
                          {children}
                        </blockquote>
                      ),
                      code: ({ children }) => (
                        <code
                          style={{
                            background: SURFACE,
                            border: `1px solid ${BORDER}`,
                            borderRadius: "4px",
                            padding: "1px 6px",
                            fontSize: "0.92em",
                            fontFamily:
                              "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
                            color: TEXT_PRIMARY,
                          }}
                        >
                          {children}
                        </code>
                      ),
                      table: ({ children }) => (
                        <div style={{ overflowX: "auto", margin: "24px 0" }}>
                          <table
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                              fontSize: "14px",
                            }}
                          >
                            {children}
                          </table>
                        </div>
                      ),
                      thead: ({ children }) => <thead>{children}</thead>,
                      tbody: ({ children }) => <tbody>{children}</tbody>,
                      tr: ({ children }) => (
                        <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
                          {children}
                        </tr>
                      ),
                      th: ({ children }) => (
                        <th
                          style={{
                            textAlign: "left",
                            padding: "10px 12px",
                            fontWeight: 700,
                            color: TEXT_PRIMARY,
                            background: SURFACE,
                            borderBottom: `1px solid ${BORDER}`,
                          }}
                        >
                          {children}
                        </th>
                      ),
                      td: ({ children }) => (
                        <td
                          style={{
                            padding: "10px 12px",
                            verticalAlign: "top",
                            color: TEXT_BODY,
                          }}
                        >
                          {children}
                        </td>
                      ),
                      hr: () => (
                        <hr
                          style={{
                            border: 0,
                            height: "1px",
                            background: BORDER,
                            margin: "40px 0",
                          }}
                        />
                      ),
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>

                {/* RelatedGuides (row variant): only in main column on mobile.
                    On desktop, the sidebar variant renders in the sidebar. */}
                {!useTwoColumn && <RelatedGuides currentSlug={article.id} />}
              </>
            ) : (
              // ── Coming soon ────────────────────────────────────────────────
              <div
                style={{
                  padding: "40px",
                  borderRadius: "16px",
                  background: SURFACE,
                  border: `1px solid ${BORDER}`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: TEXT_FAINT,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    marginBottom: "12px",
                  }}
                >
                  Coming soon
                </div>
                <p style={{ color: TEXT_MUTED, margin: 0, fontSize: "15px", lineHeight: 1.5 }}>
                  This guide is being written and will be published shortly.
                </p>
              </div>
            )}

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div
                style={{
                  marginTop: "48px",
                  paddingTop: "24px",
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
                      color: TEXT_MUTED,
                      background: SURFACE,
                      border: `1px solid ${BORDER}`,
                      padding: "4px 10px",
                      borderRadius: "6px",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Right sidebar (desktop with content only) ────────────────────── */}
          {useTwoColumn && article.content && (
            <aside style={{ minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {/* QuickFacts at top — scrolls normally with the page */}
                {article.quickFacts && <QuickFacts facts={article.quickFacts} />}

                {/* OnThisPageNav becomes sticky once it reaches top:100px */}
                <div style={{ position: "sticky", top: "100px" }}>
                  <OnThisPageNav content={article.content} />
                </div>

                {/* Related guides at bottom of sidebar — scrolls normally */}
                <RelatedGuides currentSlug={article.id} variant="sidebar" />
              </div>
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
