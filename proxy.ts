// ─────────────────────────────────────────────────────────────────────────────
// Geo block (Next.js 16 "Proxy" — formerly Middleware)
//
// Blocks visitors whose IP geolocates to one of BLOCKED_COUNTRIES and serves a
// personalized "not available in your region" page instead of the site.
//
//   • Country comes from Vercel's `x-vercel-ip-country` header (request.geo was
//     removed in Next 15). The header is only present in production on Vercel —
//     locally it's absent, so the block is a no-op in `next dev`.
//   • Geolocation is IP-based and can be bypassed with a VPN. Treat this as a
//     soft regional gate, NOT a hard legal/compliance guarantee.
//
// ── Avoid locking yourself out ──────────────────────────────────────────────
// If you browse from CH/DE you'd be blocked too. To whitelist your own browser:
//   1. In Vercel → Project → Settings → Environment Variables, set
//      GEO_BYPASS_TOKEN to any long random string.
//   2. Visit  https://travelmed.ch/?geobypass=THAT_STRING  once.
//      A cookie is set and you'll see the site normally from then on.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse, type NextRequest } from "next/server";

// ── Config — edit these ──────────────────────────────────────────────────────
const BLOCKED_COUNTRIES = new Set(["CH", "DE"]); // ISO 3166-1 alpha-2 codes

// Search-engine + link-preview crawlers are always let through (even from a
// blocked country) so indexing and social previews keep working. Note: a
// user-agent can be spoofed, so this is a small, deliberate hole in the gate.
const ALLOWED_BOTS =
  /(googlebot|google-inspectiontool|storebot-google|googleother|bingbot|bingpreview|duckduckbot|yandex|baiduspider|applebot|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot)/i;

// ✏️  YOUR PERSONALIZED MESSAGE — edit these freely.
const BLOCK_HEADING = "TravelMed is currently undergoing maintenance";
const BLOCK_MESSAGE = `We’re making some improvements and will be back shortly. Thanks for your patience.`;
const FUN_FACT_LABEL = "Did you know?";
const FUN_FACT =
  "🍺 Drinking beer can make you more attractive to mosquitoes. Several studies found that even one beer increased the number of mosquito landings — although researchers still aren’t completely sure why.";

export function proxy(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country");

  // Not a blocked country (or unknown, e.g. local dev) → let the request through.
  if (!country || !BLOCKED_COUNTRIES.has(country)) return;

  // Always let search engines / link-preview crawlers see the real site.
  if (ALLOWED_BOTS.test(request.headers.get("user-agent") ?? "")) return;

  // Owner bypass: ?geobypass=<token> sets a cookie; subsequent visits read it.
  const token = process.env.GEO_BYPASS_TOKEN;
  if (token) {
    if (request.nextUrl.searchParams.get("geobypass") === token) {
      const res = NextResponse.next();
      res.cookies.set("geobypass", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: "lax",
      });
      return res;
    }
    if (request.cookies.get("geobypass")?.value === token) return;
  }

  return new NextResponse(blockPage(), {
    status: 403,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

// Run on everything except static assets and the social-card images (so link
// previews still work for everyone).
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|opengraph-image|twitter-image).*)",
  ],
};

// Self-contained HTML (no external assets) so it renders even though every
// sub-request from a blocked visitor would also be blocked.
function blockPage(): string {
  const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="56" height="56"><defs><linearGradient id="g" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#0891b2"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs><circle cx="20" cy="20" r="16" fill="url(#g)"/><ellipse cx="20" cy="20" rx="16" ry="6.5" stroke="#fff" stroke-width="1.5" fill="none" opacity="0.5"/><path d="M5 20.5H15L17.5 14L21 27L23.5 20.5H35" stroke="#fff" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const body = BLOCK_MESSAGE.split("\n")
    .map((line) => `<p>${escapeHtml(line.trim())}</p>`)
    .join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(BLOCK_HEADING)}</title><style>
    :root{color-scheme:light}
    *{box-sizing:border-box}
    body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:linear-gradient(160deg,#f0fdfa,#f8fafc 60%);font-family:'DM Sans',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a}
    .card{max-width:520px;width:100%;text-align:center;background:#fff;border:1px solid #e2e8f0;border-radius:20px;padding:48px 36px;box-shadow:0 20px 50px rgba(15,23,42,.08)}
    .mark{display:inline-flex;margin-bottom:22px}
    h1{font-size:24px;line-height:1.25;letter-spacing:-0.02em;margin:0 0 14px}
    p{font-size:15.5px;line-height:1.65;color:#475569;margin:0 0 12px}
    .foot{margin-top:26px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8}
    a{color:#0891b2}
    .fact{margin-top:28px;text-align:left;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:14px;padding:16px 18px}
    .fact-label{display:block;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0d9488;margin-bottom:6px}
    .fact p{margin:0;font-size:14px;line-height:1.6;color:#334155}
  </style></head><body><main class="card"><div class="mark">${mark}</div><h1>${escapeHtml(BLOCK_HEADING)}</h1>${body}<div class="fact"><span class="fact-label">${escapeHtml(FUN_FACT_LABEL)}</span><p>${escapeHtml(FUN_FACT)}</p></div><p class="foot">TravelMed</p></main></body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
