"use client";

import { useState } from "react";

// Curator-view chip: shows an alert's id and copies it to the clipboard so you
// can paste it into data/outbreak-overrides.json. Only rendered in ?curate=1.
export default function CopyId({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(id);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          /* clipboard blocked — id is still visible to select manually */
        }
      }}
      title="Copy id"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        maxWidth: "100%",
        padding: "4px 10px",
        borderRadius: "8px",
        border: "1px dashed var(--c-border-strong)",
        background: "var(--c-surface-2)",
        color: "var(--c-text-2)",
        cursor: "pointer",
        fontFamily: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
        fontSize: "11.5px",
      }}
    >
      <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{id}</span>
      <span style={{ flexShrink: 0, fontWeight: 700, color: copied ? "var(--c-trust)" : "var(--c-accent-strong)" }}>
        {copied ? "✓ copied" : "copy"}
      </span>
    </button>
  );
}
