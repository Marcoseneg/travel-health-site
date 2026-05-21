// app/components/guides/OnThisPageNav.tsx
//
// Sticky "On this page" navigation rendered in the article right sidebar
// on desktop. Lists the article's H2 section headings and highlights the
// one currently in view via IntersectionObserver.
//
// Each heading is auto-numbered (1, 2, 3...) to match the numbering on
// the H2 itself in the article body. Order is consistent because the
// extraction walks the markdown source top-to-bottom in every component.
//
// The opaque page-colored backdrop + blur prevents overlap-bleed when
// the nav becomes sticky and other sidebar elements scroll underneath.
// A max-height + internal scroll keeps very long TOCs from outgrowing
// the viewport.
//
// Hidden when fewer than 3 sections (not worth the chrome) and on
// mobile (the in-body GuideTOC already provides navigation there).

"use client";

import { useState, useEffect } from "react";
import { slugify } from "../../lib/utils/formatDate";

type Heading = { id: string; text: string };

function extractH2s(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      const text = match[1].trim();
      headings.push({ id: slugify(text), text });
    }
  }
  return headings;
}

type Props = {
  content: string;
};

export default function OnThisPageNav({ content }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const headings = extractH2s(content);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="On this page"
      style={{
        padding: "20px 22px",
        borderRadius: "14px",
        background: "rgba(2, 6, 23, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.08)",
        maxHeight: "calc(100vh - 140px)",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#7dd3fc",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "14px",
        }}
      >
        On this page
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {headings.map((h, i) => {
          const isActive = h.id === activeId;
          return (
            <li key={h.id} style={{ margin: 0 }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(h.id);
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(h.id);
                    history.replaceState(null, "", `#${h.id}`);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "7px 0 7px 14px",
                  borderLeft: `2px solid ${
                    isActive ? "#7dd3fc" : "rgba(255,255,255,0.06)"
                  }`,
                  fontSize: "13px",
                  color: isActive ? "#f1f5f9" : "#94a3b8",
                  textDecoration: "none",
                  lineHeight: 1.4,
                  fontWeight: isActive ? 600 : 400,
                  transition: "color 0.15s, border-color 0.15s",
                  marginLeft: "-2px",
                }}
              >
                <span
                  style={{
                    color: isActive ? "#7dd3fc" : "#64748b",
                    flexShrink: 0,
                    fontWeight: 600,
                    fontVariantNumeric: "tabular-nums",
                    minWidth: "18px",
                  }}
                  aria-hidden="true"
                >
                  {i + 1}.
                </span>
                <span>{h.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
