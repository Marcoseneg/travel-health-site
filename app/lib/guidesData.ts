// ─────────────────────────────────────────────────────────────────────────────
// Backwards-compatibility shim for the old guidesData.ts location.
//
// Article data has been refactored into one file per article inside
// `./guides/`. This shim re-exports everything from the new location so
// existing imports keep working without any changes:
//
//   import { articles, CATEGORY_LABELS, Article } from "../lib/guidesData";
//
// New code can import directly from "../lib/guides" if preferred.
// ─────────────────────────────────────────────────────────────────────────────

export * from "./guides";
