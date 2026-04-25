"use client";

import { useEffect, useState } from "react";

/**
 * CdcMapImage — wraps an <img> with two behaviors:
 *
 * 1. **Graceful failure**: if the URL is broken, hotlinking blocked, or
 *    network errors, the component hides itself entirely. The disease card
 *    falls back to text-only with the existing "View on CDC ↗" link, so
 *    users never see a broken-image gap.
 *
 * 2. **Click-to-zoom lightbox**: clicking the thumbnail opens the image
 *    full-screen overlay. Close via the × button, clicking the dark backdrop,
 *    or pressing Escape. Body scroll is locked while open.
 */
export default function CdcMapImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  // Lock body scroll while the lightbox is open and wire up Esc to close.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (error) return null;

  return (
    <>
      {/* ── Inline thumbnail ──────────────────────────────────────── */}
      <figure
        style={{
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge map: ${alt}`}
          style={{
            display: "block",
            width: "100%",
            padding: 0,
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
            background: "rgba(255,255,255,0.02)",
            cursor: "zoom-in",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(125,211,252,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
          }}
        >
          <img
            src={src}
            alt={alt}
            onError={() => setError(true)}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              maxHeight: "260px",
              objectFit: "contain",
            }}
          />
          {/* Zoom-in icon overlay (bottom-right corner of the thumbnail) */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              width: "26px",
              height: "26px",
              borderRadius: "6px",
              background: "rgba(3, 7, 18, 0.78)",
              border: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(6px)",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
              <line x1="20" y1="20" x2="16.5" y2="16.5" />
            </svg>
          </span>
        </button>
        {caption && (
          <figcaption
            style={{
              fontSize: "10.5px",
              color: "#64748b",
              margin: 0,
              lineHeight: 1.4,
              textAlign: "center",
            }}
          >
            {caption}
          </figcaption>
        )}
      </figure>

      {/* ── Lightbox overlay ──────────────────────────────────────── */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(2, 6, 17, 0.92)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 24px 32px",
            cursor: "zoom-out",
            animation: "cdcMapFadeIn 0.18s ease-out",
          }}
        >
          {/* Close button (top-right) */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close map preview"
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#e2e8f0",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          {/* Image — clicking it should NOT close the modal */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "min(1200px, 100%)",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
              cursor: "default",
            }}
          />

          {/* Optional caption at the bottom */}
          {caption && (
            <p
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                bottom: "16px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "12px",
                color: "#94a3b8",
                background: "rgba(3, 7, 18, 0.65)",
                padding: "6px 14px",
                borderRadius: "999px",
                margin: 0,
                cursor: "default",
                fontFamily: "inherit",
              }}
            >
              {caption}
            </p>
          )}
        </div>
      )}

      {/* Fade-in animation for the lightbox */}
      <style jsx>{`
        @keyframes cdcMapFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
