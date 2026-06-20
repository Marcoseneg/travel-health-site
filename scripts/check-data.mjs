#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────────────
// Data-integrity check (run in CI and via `npm run check:data`)
//
// Validates the invariants that have bitten us before, so regressions fail fast:
//   1. Every supported destination (travelData) has a data file.
//   2. Every data file is registered in index.ts.
//   3. Core enum fields (malariaRisk, yellowFever) use valid values.
//   4. reviewStatus, where present, is "draft" | "reviewed".
//   5. Disease-card ↔ chip consistency: a country whose brief shows a
//      dengue/chikungunya card must have a matching entry in the badge map
//      (else the chip wrongly renders "None").
//
// Dependency-free, regex-based (mirrors the data files' shape). Exits non-zero
// on any failure with a list of problems.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const CDIR = join(ROOT, "data", "countries");
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const problems = [];
const fail = (m) => problems.push(m);

// ── Parse travelData labels ──────────────────────────────────────────────────
const td = read("app/lib/travelData.ts");
const labels = {};
for (const m of td.matchAll(/^\s+"?([a-z][a-z-]+)"?:\s*\{\s*label:\s*"([^"]+)"/gm)) labels[m[1]] = m[2];
const supported = Object.keys(labels);

const files = readdirSync(CDIR)
  .filter((f) => f.endsWith(".ts") && !["index.ts", "types.ts"].includes(f))
  .map((f) => f.replace(".ts", ""));
const fileSet = new Set(files);

// 1. supported → file
for (const slug of supported) if (!fileSet.has(slug)) fail(`travelData lists "${slug}" but data/countries/${slug}.ts is missing`);

// 2. file → registered in index.ts
const index = read("data/countries/index.ts");
for (const slug of files) {
  const key = /^[a-z][a-zA-Z0-9]*$/.test(slug) ? slug : `"${slug}"`;
  if (!index.includes(`./${slug}"`)) fail(`${slug}.ts is not imported in index.ts`);
  if (!new RegExp(`\\n\\s*${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}:`).test(index)) fail(`${slug} is not in the countries map in index.ts`);
}

// 3 & 4 & 5
const MAL = new Set(["none", "limited", "present", "high"]);
const YF = new Set(["none", "possible", "required-or-recommended"]);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const dengueMap = read("app/lib/dengueData.ts");
const chikMap = read("app/lib/chikungunyaData.ts");
const inMap = (map, label) => new RegExp(`"${esc(label)}"\\s*:`).test(map);

for (const slug of files) {
  const src = read(`data/countries/${slug}.ts`);
  const label = labels[slug];
  const mal = (src.match(/malariaRisk:\s*"([^"]+)"/) || [])[1];
  const yf = (src.match(/yellowFever:\s*"([^"]+)"/) || [])[1];
  if (mal && !MAL.has(mal)) fail(`${slug}: invalid malariaRisk "${mal}"`);
  if (yf && !YF.has(yf)) fail(`${slug}: invalid yellowFever "${yf}"`);
  const rs = (src.match(/reviewStatus:\s*"([^"]+)"/) || [])[1];
  if (rs && rs !== "draft" && rs !== "reviewed") fail(`${slug}: invalid reviewStatus "${rs}"`);
  if (label) {
    if (/dengue:\s*\{/.test(src) && !inMap(dengueMap, label)) fail(`${slug}: has a dengue card but "${label}" is absent from dengueRiskByCountry (chip would show None)`);
    if (/chikungunya:\s*\{/.test(src) && !inMap(chikMap, label)) fail(`${slug}: has a chikungunya card but "${label}" is absent from chikungunyaRiskByCountry (chip would show None)`);
  }
}

// ── Report ───────────────────────────────────────────────────────────────────
if (problems.length) {
  console.error(`✗ data check failed (${problems.length} problem${problems.length > 1 ? "s" : ""}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✓ data check passed — ${files.length} countries, all invariants hold`);
