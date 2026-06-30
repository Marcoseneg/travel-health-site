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
  const mark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="92" height="92"><defs><linearGradient id="g" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#14b8a6"/></linearGradient></defs><circle cx="20" cy="20" r="16" fill="url(#g)"/><ellipse cx="20" cy="20" rx="16" ry="6.5" stroke="#fff" stroke-width="1.4" fill="none" opacity="0.55"/><path d="M5 20.5H15L17.5 14L21 27L23.5 20.5H35" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  const body = BLOCK_MESSAGE.split("\n")
    .map((line) => `<p>${escapeHtml(line.trim())}</p>`)
    .join("");
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(BLOCK_HEADING)}</title><style>
    :root{color-scheme:dark}
    *{box-sizing:border-box}
    html,body{height:100%}
    body{margin:0;min-height:100vh;min-height:100svh;display:flex;align-items:center;justify-content:center;padding:32px;overflow:hidden;position:relative;background:radial-gradient(1200px 720px at 76% -12%,#0c3b43 0%,transparent 55%),radial-gradient(900px 620px at 8% 112%,#0a2e3a 0%,transparent 55%),linear-gradient(160deg,#06141a,#040e13 72%);font-family:'DM Sans',system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#e8f3f3}
    .aurora{position:fixed;border-radius:50%;filter:blur(72px);pointer-events:none;z-index:0}
    .aurora.a{width:640px;height:640px;top:-190px;right:-130px;background:radial-gradient(circle,rgba(20,184,166,.55),transparent 62%);animation:drift 16s ease-in-out infinite}
    .aurora.b{width:580px;height:580px;bottom:-210px;left:-150px;background:radial-gradient(circle,rgba(8,145,178,.5),transparent 62%);animation:drift2 21s ease-in-out infinite}
    .aurora.c{width:440px;height:440px;top:28%;left:54%;background:radial-gradient(circle,rgba(14,116,144,.4),transparent 60%);animation:drift 27s ease-in-out infinite}
    .grid{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px);background-size:34px 34px;-webkit-mask-image:radial-gradient(circle at 50% 42%,#000,transparent 72%);mask-image:radial-gradient(circle at 50% 42%,#000,transparent 72%)}
    .stage{position:relative;z-index:1;width:100%;max-width:780px;text-align:center;animation:rise .9s cubic-bezier(.2,.8,.2,1) both}
    .mark{position:relative;display:inline-flex;align-items:center;justify-content:center;width:92px;height:92px;margin-bottom:30px}
    .mark svg{position:relative;z-index:2;filter:drop-shadow(0 8px 22px rgba(20,184,166,.45));animation:float 5s ease-in-out infinite}
    .ring{position:absolute;inset:8px;border-radius:50%;border:1.5px solid rgba(45,212,191,.6);animation:pulse 3s ease-out infinite}
    .ring.r2{animation-delay:1.5s}
    h1{font-size:clamp(34px,6vw,60px);line-height:1.05;letter-spacing:-0.03em;font-weight:800;margin:0 0 18px;color:#fff;text-wrap:balance}
    .lead p{font-size:clamp(16px,2.2vw,20px);line-height:1.6;color:#9fc4c4;margin:0 auto 10px;max-width:560px}
    .fact{margin:34px auto 0;max-width:560px;text-align:left;background:rgba(255,255,255,.05);border:1px solid rgba(125,211,200,.22);border-radius:18px;padding:22px 24px;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
    .fact-label{display:block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5eead4;margin-bottom:8px}
    .fact p{margin:0;font-size:15px;line-height:1.65;color:#cfe6e6}
    .foot{margin-top:40px;font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#5b7a7a}
    @keyframes drift{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(46px,-34px) scale(1.12)}}
    @keyframes drift2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-38px,34px) scale(1.16)}}
    @keyframes pulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
    @keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
    @media (prefers-reduced-motion:reduce){*{animation:none!important}}
  </style></head><body><div class="aurora a"></div><div class="aurora b"></div><div class="aurora c"></div><div class="grid"></div><main class="stage"><div class="mark"><span class="ring"></span><span class="ring r2"></span>${mark}</div><h1>${escapeHtml(BLOCK_HEADING)}</h1><div class="lead">${body}</div><div class="fact"><span class="fact-label">${escapeHtml(FUN_FACT_LABEL)}</span><p>${escapeHtml(FUN_FACT)}</p></div><p class="foot">TravelMed</p></main></body></html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
