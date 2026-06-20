#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Physician-review workflow helper
//
//   node scripts/review.mjs status            → summary of draft vs reviewed
//   node scripts/review.mjs list draft        → list countries by status
//   node scripts/review.mjs list reviewed
//   node scripts/review.mjs mark <slug...>    → mark reviewed, stamp lastReviewed
//   node scripts/review.mjs unmark <slug...>  → revert to draft
//
// Flips `reviewStatus` and stamps `lastReviewed` in data/countries/<slug>.ts.
// A clinician reviews a brief, then runs `mark` so the page swaps its
// "pending physician review" banner for the green "Physician-reviewed" badge.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "countries");
const today = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });

const slugs = () =>
  readdirSync(DIR)
    .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
    .map((f) => f.replace(".ts", ""));

const statusOf = (src) => (src.match(/reviewStatus:\s*"(draft|reviewed)"/) || [])[1] || "none";

function setStatus(slug, status) {
  const path = join(DIR, `${slug}.ts`);
  let src;
  try {
    src = readFileSync(path, "utf8");
  } catch {
    console.error(`✗ ${slug}: no such country file`);
    return false;
  }
  const stamp = status === "reviewed" ? `\n  lastReviewed: "${today}",` : "";
  if (/reviewStatus:/.test(src)) {
    // Update existing fields in place.
    src = src.replace(/reviewStatus:\s*"(draft|reviewed)"/, `reviewStatus: "${status}"`);
    if (status === "reviewed") {
      src = /lastReviewed:/.test(src)
        ? src.replace(/lastReviewed:\s*"[^"]*"/, `lastReviewed: "${today}"`)
        : src.replace(/reviewStatus:\s*"reviewed"/, `reviewStatus: "reviewed",${stamp}`);
    }
  } else {
    // Original hand-authored briefs lack the field — insert it right after the
    // `export const <name>: CountryInfo = {` opening line.
    const m = src.match(/(export const \w+\s*:\s*CountryInfo\s*=\s*\{\n)/);
    if (!m) {
      console.error(`✗ ${slug}: could not find CountryInfo declaration to insert into`);
      return false;
    }
    src = src.replace(m[1], `${m[1]}  reviewStatus: "${status}",${stamp}\n`);
  }
  writeFileSync(path, src);
  console.log(`✓ ${slug} → ${status}${status === "reviewed" ? ` (${today})` : ""}`);
  return true;
}

const [cmd, ...rest] = process.argv.slice(2);

if (cmd === "status") {
  const counts = { reviewed: 0, draft: 0, none: 0 };
  for (const s of slugs()) counts[statusOf(readFileSync(join(DIR, `${s}.ts`), "utf8"))]++;
  const total = slugs().length;
  console.log(`Countries: ${total}`);
  console.log(`  ✓ reviewed: ${counts.reviewed}`);
  console.log(`  📝 draft:    ${counts.draft}`);
  console.log(`  · neither:  ${counts.none}`);
} else if (cmd === "list") {
  const want = rest[0];
  if (!["draft", "reviewed", "none"].includes(want)) {
    console.error('Usage: review.mjs list <draft|reviewed|none>');
    process.exit(1);
  }
  const out = slugs().filter((s) => statusOf(readFileSync(join(DIR, `${s}.ts`), "utf8")) === want);
  console.log(out.join("\n"));
  console.error(`\n(${out.length} ${want})`);
} else if (cmd === "mark" || cmd === "unmark") {
  if (!rest.length) {
    console.error(`Usage: review.mjs ${cmd} <slug> [<slug>...]`);
    process.exit(1);
  }
  const status = cmd === "mark" ? "reviewed" : "draft";
  let ok = 0;
  for (const slug of rest) if (setStatus(slug, status)) ok++;
  console.error(`\n${ok}/${rest.length} updated.`);
} else {
  console.error(`Physician-review helper. Commands:
  status                 summary of draft vs reviewed
  list <draft|reviewed>  list country slugs by status
  mark <slug...>         mark reviewed + stamp date
  unmark <slug...>       revert to draft`);
  process.exit(1);
}
