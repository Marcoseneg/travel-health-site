import type { Metadata } from "next";

// The Insights listing page (`page.tsx`) is a client component (it uses
// `useState` for category filtering), so it cannot export `metadata` itself.
// This route-level layout supplies the metadata for /insights.
export const metadata: Metadata = {
  title: "Insights — TravelMed",
  description:
    "In-depth analysis, study reviews, and public-health commentary — physician-authored travel-health insights.",
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
