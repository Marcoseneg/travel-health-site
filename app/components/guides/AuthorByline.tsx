// app/components/guides/AuthorByline.tsx
//
// Article author byline shown under the article subtitle. Mirrors the
// pattern seen on editorial sites — small circular avatar (Marco's
// initials for now, easily replaced with a real headshot later) plus
// name, role, date, and reading time.
//
// To swap in a real headshot:
//   1. Drop a JPG/PNG into `public/headshots/marco.jpg`
//   2. Replace the <div>MS</div> avatar block below with an <Image>:
//        <Image src="/headshots/marco.jpg" alt="..." width={44} height={44}
//               style={{ borderRadius: "50%" }} />

import { formatDate } from "../../lib/utils/formatDate";

type Props = {
  /** ISO date string from article.date */
  date: string;
  /** Reading time in minutes from article.readingTime */
  readingTime: number;
};

export default function AuthorByline({ date, readingTime }: Props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginTop: "28px",
      }}
    >
      {/* Avatar — initials in a styled circle. Replace with real photo when ready. */}
      <div
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7dd3fc 0%, #0284c7 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "15px",
          fontWeight: 700,
          color: "#0c4a6e",
          flexShrink: 0,
          letterSpacing: "-0.01em",
        }}
        aria-hidden="true"
      >
        MS
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <div style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.4 }}>
          By{" "}
          <span style={{ color: "#f1f5f9", fontWeight: 600 }}>
            Dr. Marco Seneghini
          </span>
        </div>
        <div
          style={{
            fontSize: "13px",
            color: "#94a3b8",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <span>Swiss infectious diseases physician</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>Updated {formatDate(date)}</span>
          <span style={{ color: "#475569" }}>·</span>
          <span>{readingTime} min read</span>
        </div>
      </div>
    </div>
  );
}
