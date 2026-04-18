import "./globals.css";
import SiteHeader from "./components/SiteHeader";

export const metadata = {
  title: "TravelMed — Physician-Built Travel Health",
  description:
    "Evidence-based vaccine recommendations, malaria prophylaxis, outbreak alerts, and destination-specific prevention advice for international travelers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "'DM Sans', system-ui, -apple-system, sans-serif",
        }}
      >
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
