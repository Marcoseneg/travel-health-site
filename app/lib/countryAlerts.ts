// app/lib/countryAlerts.ts
//
// Helper to fetch and filter outbreak alerts for a specific country.
// Used by the country page to show its "Recent alerts" section.
//
// Pulls from the same source as the /outbreaks page (live RSS via ISR cache,
// fallback to seed data when feeds fail). Filters by country slug, ranks
// title-hits above summary-hits, then by date, returns top N.
//
// Why rank by title vs summary: a "Global Dengue" alert that lists 50
// countries in its summary tags all of them. On Morocco's page, that alert
// shouldn't push a more recent "Rabies in Morocco" alert out of view.

import seedData from "@/data/outbreaks.json";
import { fetchAllOutbreaks } from "@/app/lib/outbreakFetcher";
import { tagCountries } from "@/app/lib/countryTagger";
import { SUPPORTED_COUNTRIES } from "@/app/lib/travelData";
import type { OutbreakAlert } from "@/app/lib/outbreakSources";

export async function getAlertsForCountry(
  slug: string,
  limit = 3,
  excludeKeywords: string[] = []
): Promise<OutbreakAlert[]> {
  // Try live; fall back to seed (seed data isn't pre-tagged, so apply tagger)
  let alerts: OutbreakAlert[];
  try {
    alerts = await fetchAllOutbreaks();
    if (alerts.length === 0) {
      alerts = (seedData as OutbreakAlert[]).map((a) => ({
        ...a,
        countries: tagCountries(a),
      }));
    }
  } catch {
    alerts = (seedData as OutbreakAlert[]).map((a) => ({
      ...a,
      countries: tagCountries(a),
    }));
  }

  // Filter to alerts that mention this country
  let matches = alerts.filter((a) => a.countries?.includes(slug));

  // Drop alerts whose title contains any excluded keyword (case-insensitive
  // word match) — used to suppress live alerts that duplicate a manually-
  // authored country alert. Example: when the country page already shows
  // "Active polio circulation" as a manual banner, we filter live alerts
  // with "polio" in the title to avoid showing two cards for the same topic.
  if (excludeKeywords.length > 0) {
    const kwPatterns = excludeKeywords.map(
      (k) =>
        new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")
    );
    matches = matches.filter(
      (a) => !kwPatterns.some((p) => p.test(a.title))
    );
  }

  // Rank: title hits beat summary hits, then date (newest first)
  const meta = SUPPORTED_COUNTRIES[slug as keyof typeof SUPPORTED_COUNTRIES];
  const labelPattern = meta
    ? new RegExp(
        `\\b${(meta as { label: string }).label.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        )}\\b`,
        "i"
      )
    : null;

  matches.sort((a, b) => {
    const aTitle = labelPattern ? labelPattern.test(a.title) : false;
    const bTitle = labelPattern ? labelPattern.test(b.title) : false;
    if (aTitle && !bTitle) return -1;
    if (bTitle && !aTitle) return 1;
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return matches.slice(0, limit);
}
