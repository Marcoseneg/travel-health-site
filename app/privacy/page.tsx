import LegalLayout from "../components/LegalLayout";

export const metadata = {
  title: "Privacy policy",
  description:
    "How TravelMed handles data. We do not require accounts, do not sell personal data, and use privacy-friendly, cookieless analytics.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout kicker="Legal" title="Privacy policy" lastUpdated="June 28, 2026">
      <p>
        TravelMed is built to be useful without collecting personal information.
        We don&apos;t require an account, we don&apos;t sell data, and we keep
        tracking to the minimum needed to keep the site fast and working.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Privacy-friendly analytics.</strong> We use Vercel Analytics
          and Speed Insights to understand aggregate traffic and performance.
          These are designed to be cookieless and do not build advertising
          profiles or identify you personally.
        </li>
        <li>
          <strong>Standard server logs.</strong> Our hosting provider may
          process technical data (such as IP address and browser type) to
          deliver the site and protect against abuse.
        </li>
        <li>
          <strong>Local browser storage.</strong> Your light/dark theme
          preference is stored in your own browser via <code>localStorage</code>.
          It never leaves your device.
        </li>
      </ul>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not require registration or store account profiles.</li>
        <li>We do not sell or rent personal data to third parties.</li>
        <li>We do not run third-party advertising trackers.</li>
      </ul>

      <h2>Third parties</h2>
      <p>
        The site is hosted on Vercel, and analytics are provided by Vercel. Any
        external links (for example, to CDC, WHO, or ECDC) are governed by those
        organizations&apos; own privacy policies.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example, under the EU/EEA GDPR or Swiss
        data protection law), you may have rights to access, correct, or request
        deletion of personal data relating to you. Because we deliberately
        collect very little, there is usually nothing tied to your identity to
        retrieve — but you can contact us with any request.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy as the site evolves. Material changes will be
        reflected in the &ldquo;last updated&rdquo; date above.
      </p>

      <p>
        Privacy questions? Reach us via the{" "}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
