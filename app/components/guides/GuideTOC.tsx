// app/components/guides/GuideTOC.tsx
//
// "In this guide" table of contents rendered above the markdown body.
// Auto-extracts H2 headings (## Heading) from the article's markdown
// content and links each one to a scroll anchor on the page.
//
// For the anchor scrolling to work, the article renderer must add
// matching `id` attributes to H2 headings using the same `slugify`
// helper from `lib/utils/formatDate.ts`. See the H2 override in
// `app/guides/[slug]/page.tsx`.
//
// If the article has fewer than 3 H2 headings, the TOC is suppressed
// — it would feel redundant with such short articles.

"use client";

import { slugify } from "../../lib/utils/formatDate";

type Heading = { id: string; text: string };

function extractH2s(markdown: string): Heading[] {
  const headings: Heading[] = [];
  // Track whether we're inside a fenced code block, so `## ` lines
  // that happen to appear inside one don't get picked up.
  let inFence = false;

  for (const rawLine of markdown.split("\n")) {
    const line = rawLine;
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
  /** Raw markdown content from article.content */
  content: string;
};

export default function GuideTOC({ content }: Props) {
  const headings = extractH2s(content);

  // Skip rendering if too few sections to make a useful TOC
  if (headings.length < 3) return null;

  return (
    <div
      style={{
        padding: "24px 28px",
        borderRadius: "16px",
        background: "rgba(125,211,252,0.04)",
        border: "1px solid rgba(125,211,252,0.12)",
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 700,
          color: "#7dd3fc",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          marginBottom: "16px",
        }}
      >
        In this guide
      </div>

      <ul
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "4px 24px",
        }}
      >
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "14px",
                color: "#cbd5e1",
                textDecoration: "none",
                padding: "6px 0",
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  color: "#7dd3fc",
                  flexShrink: 0,
                  fontSize: "12px",
                  marginTop: "2px",
                }}
                aria-hidden="true"
              >
                ✓
              </span>
              <span>{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
