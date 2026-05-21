// app/components/guides/FeaturedHero.tsx
//
// Wide featured-article carousel rendered at the top of /guides.
// Shows one featured article at a time across the full content width.
//
// Each slide adapts to the article's cover style:
//   • Articles with `coverImage` → real photograph as full background,
//     with a stronger dark gradient on the left for text legibility.
//   • Articles with gradient + SVG illustration → existing layout
//     (gradient backdrop full-width, illustration on right 50%).
//
// Behavior:
//   • Autoplay every 7 seconds, paused on hover/focus.
//   • Manual prev/next arrows (visible on desktop, hidden on mobile).
//   • Dot indicators below the card for direct navigation.
//   • Touch-swipe support on mobile.
//   • Keyboard arrows when the carousel has focus.
//   • Respects `prefers-reduced-motion` — autoplay disabled in that mode.
//   • Falls back gracefully: 0 slides → renders nothing,
//     1 slide → renders the card without any carousel chrome.

"use client";

import { useState, useEffect, useRef } from "react";
import type { Article } from "../../lib/guides/types";
import { CATEGORY_LABELS } from "../../lib/guidesData";
import { COVER_ILLUSTRATIONS } from "../illustrations";
import { formatDate } from "../../lib/utils/formatDate";

const AUTOPLAY_MS = 7000;
const SWIPE_THRESHOLD_PX = 50;
const DESKTOP_BREAKPOINT = 720;

type Props = {
  articles: Article[];
};

export default function FeaturedHero({ articles }: Props) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // ── Detect reduced motion preference ──────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const onChange = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ── Detect viewport width for illustration toggle ─────────────────────
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Autoplay ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || prefersReducedMotion || articles.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % articles.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, prefersReducedMotion, articles.length]);

  // ── Navigation helpers ────────────────────────────────────────────────
  const goPrev = () =>
    setIndex((i) => (i - 1 + articles.length) % articles.length);
  const goNext = () => setIndex((i) => (i + 1) % articles.length);

  // ── Keyboard navigation ───────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  // ── Touch swipe ──────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD_PX) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  // ── Edge cases ────────────────────────────────────────────────────────
  if (articles.length === 0) return null;
  const hasCarouselControls = articles.length > 1;

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured guides"
      tabIndex={0}
      style={{
        position: "relative",
        marginBottom: "48px",
        outline: "none",
      }}
    >
      {/* ── Carousel slides (cross-fade) ─────────────────────────────── */}
      <div
        style={{
          position: "relative",
          height: isDesktop ? "340px" : "320px",
          borderRadius: "24px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {articles.map((article, i) => {
          const cat = CATEGORY_LABELS[article.category];
          const Illustration =
            article.coverIllustration && COVER_ILLUSTRATIONS[article.coverIllustration]
              ? COVER_ILLUSTRATIONS[article.coverIllustration]
              : null;
          const isActive = i === index;
          const hasPhoto = !!article.coverImage;

          return (
            <a
              key={article.id}
              href={`/guides/${article.id}`}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              style={{
                position: "absolute",
                inset: 0,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? "auto" : "none",
                transition: prefersReducedMotion
                  ? "none"
                  : "opacity 0.6s ease-in-out",
                textDecoration: "none",
                color: "#f1f5f9",
                display: "block",
              }}
            >
              {/* Background layer: photo or gradient depending on article */}
              {hasPhoto && article.coverImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.coverImage.src}
                    alt={article.coverImage.alt}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: article.coverImage.focusPoint ?? "center",
                    }}
                  />
                  {/* Stronger dark overlay so the title remains readable
                      over any background photo. Heavier on left where text sits. */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isDesktop
                        ? "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.75) 100%)",
                    }}
                  />
                </>
              ) : (
                <>
                  {/* Gradient backdrop */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: article.coverGradient,
                    }}
                  />

                  {/* SVG illustration on the right (desktop only) */}
                  {isDesktop && Illustration && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bottom: 0,
                        width: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        opacity: 0.95,
                      }}
                    >
                      <div style={{ width: "100%", padding: "0 40px" }}>
                        <Illustration />
                      </div>
                    </div>
                  )}

                  {/* Subtle dark overlay on the left for text legibility */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: isDesktop ? "60%" : "100%",
                      background: isDesktop
                        ? "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 100%)",
                    }}
                  />
                </>
              )}

              {/* Text content */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  width: isDesktop ? "55%" : "100%",
                  height: "100%",
                  padding: isDesktop ? "44px 56px" : "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    alignSelf: "flex-start",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    padding: "5px 12px",
                    borderRadius: "6px",
                    background: "rgba(251,191,36,0.15)",
                    border: "1px solid rgba(251,191,36,0.35)",
                    color: "#fcd34d",
                    marginBottom: "18px",
                  }}
                >
                  Featured guide
                </span>

                <h2
                  style={{
                    fontSize: isDesktop
                      ? "clamp(28px, 3.2vw, 40px)"
                      : "clamp(24px, 6vw, 32px)",
                    fontWeight: 800,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.1,
                    margin: "0 0 14px",
                    color: "#ffffff",
                    textShadow: "0 2px 12px rgba(0,0,0,0.45)",
                  }}
                >
                  {article.title}
                </h2>

                <p
                  style={{
                    fontSize: isDesktop ? "15px" : "14px",
                    color: "rgba(241,245,249,0.9)",
                    lineHeight: 1.5,
                    margin: "0 0 20px",
                    maxWidth: "520px",
                    textShadow: "0 1px 8px rgba(0,0,0,0.4)",
                  }}
                >
                  {article.subtitle}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flexWrap: "wrap",
                    fontSize: "13px",
                    color: "rgba(241,245,249,0.75)",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "5px 12px",
                      borderRadius: "999px",
                      background: "rgba(0,0,0,0.35)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      fontWeight: 600,
                      color: cat.color,
                    }}
                  >
                    {cat.label}
                  </span>
                  <span>{article.readingTime} min read</span>
                  <span style={{ opacity: 0.5 }}>·</span>
                  <span>Updated {formatDate(article.date)}</span>
                </div>
              </div>
            </a>
          );
        })}

        {/* ── Prev / Next arrows (desktop only, only when >1 slide) ────── */}
        {hasCarouselControls && isDesktop && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous featured guide"
              style={arrowStyle("left")}
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next featured guide"
              style={arrowStyle("right")}
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* ── Dot indicators ───────────────────────────────────────────── */}
      {hasCarouselControls && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "8px",
            marginTop: "16px",
          }}
          role="tablist"
          aria-label="Featured guide slide selection"
        >
          {articles.map((a, i) => {
            const active = i === index;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setIndex(i)}
                role="tab"
                aria-selected={active}
                aria-label={`Show featured guide ${i + 1}: ${a.title}`}
                style={{
                  width: active ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  border: "none",
                  background: active ? "#7dd3fc" : "rgba(255,255,255,0.18)",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.25s ease",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Helper: shared style for prev/next arrows ─────────────────────────────
function arrowStyle(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    top: "50%",
    [side]: "16px",
    transform: "translateY(-50%)",
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    color: "#f1f5f9",
    fontSize: "22px",
    fontWeight: 400,
    lineHeight: 1,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    transition: "background 0.15s",
  };
}
