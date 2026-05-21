"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
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
import PhysicianTake from "../../components/guides/PhysicianTake";
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

const SIDEBAR_BREAKPOINT = 1000;

function buildHeadingNumbers(content: string | undefined): Map<string, number> {
  const map = new Map<string, number>();
  if (!content) return map;
  let inFence = false;
  let n = 0;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = line.match(/^##\s+(.+?)\s*$/);
    if (m) {
      n++;
      map.set(slugify(m[1].trim()), n);
    }
  }
  return map;
}

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

  const headingNumbers = useMemo(
    () => buildHeadingNumbers(article?.content),
    [article?.content]
  );

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
  const hasPhotoHero = !!article.coverImage;
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
      <div
        style={{
          maxWidth: useTwoColumn ? "1100px" : "720px",
          margin: "0 auto",
          padding: "24px 24px 0",
        }}
      >
        <Link
          href="/guides"
          style={{
            display: "inline-block",
            fontSize: "13px",
            color: ACCENT,
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          ← All guides
        </Link>
      </div>

      {hasPhotoHero && article.coverImage && (
        <section
          style={{
            position: "relative",
            width: "100%",
            height: isDesktop ? "480px" : "360px",
            marginTop: "20px",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: article.coverImage.focusPoint ?? "center",
              display: "block",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 45%, rgba(0,0,0,0.85) 100%)",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              maxWidth: "1100px",
              margin: "0 auto",
              padding: isDesktop ? "0 24px 40px" : "0 20px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                display: "inline-block",
                alignSelf: "flex-start",
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                padding: "5px 12px",
                borderRadius: "6px",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                color: cat.color,
                marginBottom: "16px",
              }}
            >
              {cat.label}
            </div>

            <h1
              style={{
                fontSize: isDesktop ? "clamp(36px, 4.5vw, 52px)" : "clamp(28px, 6vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                margin: "0 0 14px",
                color: "#ffffff",
                textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                maxWidth: "800px",
              }}
            >
              {article.title}
            </h1>

            {article.subtitle && (
              <p
                style={{
                  fontSize: isDesktop ? "18px" : "15px",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.45,
                  margin: 0,
                  maxWidth: "640px",
                  textShadow: "0 1px 12px rgba(0,0,0,0.5)",
                }}
              >
                {article.subtitle}
              </p>
            )}
          </div>

          {article.coverImage.credit && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "16px",
                fontSize: "11px",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.02em",
                textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                pointerEvents: "none",
              }}
            >
              Photo: {article.coverImage.credit}
            </div>
          )}
        </section>
      )}

      <article
        style={{
          maxWidth: useTwoColumn ? "1100px" : "720px",
          margin: "0 auto",
          padding: hasPhotoHero ? "40px 24px 64px" : "32px 24px 64px",
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
          <div style={{ minWidth: 0 }}>
            {!hasPhotoHero && (
              <>
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
                    marginTop: "8px",
                    marginBottom: "20px",
                  }}
                >
                  {cat.label}
                </div>

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
              </>
            )}

            <div
              style={{
                paddingBottom: "32px",
                borderBottom: `1px solid ${BORDER}`,
                marginBottom: "40px",
                marginTop: hasPhotoHero ? "8px" : "0",
              }}
            >
              <AuthorByline date={article.date} readingTime={article.readingTime} />
            </div>

            {!hasPhotoHero && Illustration && (
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

            {article.content ? (
              <>
                {article.physicianTake && (
                  <PhysicianTake quote={article.physicianTake} />
                )}

                {!useTwoColumn && article.quickFacts && (
                  <QuickFacts facts={article.quickFacts} />
                )}

                {article.quickRecommendations && (
                  <QuickRecommendations cards={article.quickRecommendations} />
                )}

                <GuideTOC content={article.content} />

                <div style={{ fontSize: "17px", color: TEXT_BODY, lineHeight: 1.75 }}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 style={{ fontSize: "30px", fontWeight: 800, color: TEXT_PRIMARY, letterSpacing: "-0.02em", margin: "48px 0 16px", lineHeight: 1.2 }}>
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => {
                        const text =
                          typeof children === "string"
                            ? children
                            : Array.isArray(children)
                            ? children.map((c) => (typeof c === "string" ? c : "")).join("")
                            : "";
                        const id = slugify(text);
                        const num = headingNumbers.get(id);
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
                              display: "flex",
                              alignItems: "baseline",
                              gap: "14px",
                            }}
                          >
                            {num !== undefined && (
                              <span
                                style={{
                                  color: ACCENT_BRIGHT,
                                  fontWeight: 700,
                                  fontVariantNumeric: "tabular-nums",
                                  flexShrink: 0,
                                }}
                                aria-hidden="true"
                              >
                                {num}.
                              </span>
                            )}
                            <span>{children}</span>
                          </h2>
                        );
                      },
                      h3: ({ children }) => (
                        <h3 style={{ fontSize: "19px", fontWeight: 700, color: TEXT_PRIMARY, letterSpacing: "-0.01em", margin: "32px 0 12px" }}>
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => <p style={{ margin: "0 0 18px", lineHeight: 1.75 }}>{children}</p>,
                      ul: ({ children }) => <ul style={{ margin: "0 0 18px", paddingLeft: "20px", lineHeight: 1.75 }}>{children}</ul>,
                      ol: ({ children }) => <ol style={{ margin: "0 0 18px", paddingLeft: "20px", lineHeight: 1.75 }}>{children}</ol>,
                      li: ({ children }) => <li style={{ margin: "0 0 6px" }}>{children}</li>,
                      strong: ({ children }) => <strong style={{ color: TEXT_PRIMARY, fontWeight: 700 }}>{children}</strong>,
                      em: ({ children }) => <em style={{ color: TEXT_PRIMARY, fontStyle: "italic" }}>{children}</em>,
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          target={href?.startsWith("http") ? "_blank" : undefined}
                          rel={href?.startsWith("http") ? "noreferrer noopener" : undefined}
                          style={{ color: ACCENT_BRIGHT, textDecoration: "underline", textDecorationColor: "rgba(125,211,252,0.3)", textUnderlineOffset: "3px" }}
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
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>

                {!useTwoColumn && <RelatedGuides currentSlug={article.id} />}
              </>
            ) : (
              <div style={{ padding: "40px", borderRadius: "16px", background: SURFACE, border: `1px solid ${BORDER}`, textAlign: "center" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, color: TEXT_FAINT, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                  Coming soon
                </div>
                <p style={{ color: TEXT_MUTED, margin: 0, fontSize: "15px", lineHeight: 1.5 }}>
                  This guide is being written and will be published shortly.
                </p>
              </div>
            )}

            {article.tags && article.tags.length > 0 && (
              <div style={{ marginTop: "48px", paddingTop: "24px", borderTop: `1px solid ${BORDER}`, display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {article.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: "12px", color: TEXT_MUTED, background: SURFACE, border: `1px solid ${BORDER}`, padding: "4px 10px", borderRadius: "6px" }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── Right sidebar — simple non-sticky stack ────────────────────────
              All three sidebar components render in normal document flow.
              They scroll naturally with the page. No sticky behavior, no
              measurement, no overlap possible. */}
          {useTwoColumn && article.content && (
            <aside style={{ minWidth: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {article.quickFacts && <QuickFacts facts={article.quickFacts} />}
                <OnThisPageNav content={article.content} />
                <RelatedGuides currentSlug={article.id} variant="sidebar" />
              </div>
            </aside>
          )}
        </div>
      </article>
    </main>
  );
}
