// app/components/guides/GuideTOC.tsx
//
// "In this guide" table of contents rendered above the markdown body.
// Auto-extracts H2 headings (## Heading) from the article's markdown
// content and links each one to a scroll anchor on the page.
//
// Each heading is auto-numbered (1, 2, 3...) to match the numbering
// rendered on the H2 itself in the article body. The numbering happens
// independently in each component (TOC, OnThisPageNav, H2 override),
// but the order is consistent because they all walk the same markdown
// source top-to-bottom.
//
// For the anchor scrolling to work, the article renderer must add
// matching `id` attributes to H2 headings using the same `slugify`
// helper from `lib/utils/formatDate.ts`.
//
// If the article has fewer than 3 H2 headings, the TOC is suppressed.

"use client";

import { slugify } from "../../lib/utils/formatDate";

type Heading = { id: string; text: string };

function extractH2s(markdown: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;
  for (const rawLine of markdown.split("\n")) {
    if (/^\s*```/.test(rawLine)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = rawLine.match(/^##\s+(.+?)\s*$/);
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

export default function GuideTOC({ content }: Props) {
  const headings = extractH2s(content);

  if (headings.length < 3) return null;

  return (
    <div
      style={{
        padding: "24px 28px",
        borderRadius: "var(--c-radius-md)",
        background: "var(--c-accent-soft)",
        border: "1px solid var(--c-accent-border)",
        marginBottom: "40px",
      }}
    >
      <div
        className="t-micro"
        style={{
          color: "var(--c-accent)",
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
        {headings.map((h, i) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                fontSize: "14px",
                color: "var(--c-text-2)",
                textDecoration: "none",
                padding: "6px 0",
                lineHeight: 1.4,
              }}
            >
              <span
                style={{
                  color: "var(--c-accent)",
                  flexShrink: 0,
                  fontSize: "13px",
                  fontWeight: 700,
                  fontVariantNumeric: "tabular-nums",
                  minWidth: "20px",
                }}
                aria-hidden="true"
              >
                {i + 1}.
              </span>
              <span>{h.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
