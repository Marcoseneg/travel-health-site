import LegalLayout from "../components/LegalLayout";

export const metadata = {
  title: "Terms of use",
  description:
    "The terms governing your use of TravelMed, including the educational-only nature of the content and limitations of liability.",
};

export default function TermsPage() {
  return (
    <LegalLayout kicker="Legal" title="Terms of use" lastUpdated="June 28, 2026">
      <p>
        By accessing TravelMed (the &ldquo;Site&rdquo;), you agree to these
        terms. If you do not agree, please do not use the Site.
      </p>

      <h2>Educational use only</h2>
      <p>
        The Site provides general travel health information for educational
        purposes. It is not medical advice and must not be used as a substitute
        for consultation with a qualified clinician. See our{" "}
        <a href="/disclaimer">medical disclaimer</a> for the full statement.
      </p>

      <h2>No warranty</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo;
        without warranties of any kind, express or implied, including accuracy,
        completeness, fitness for a particular purpose, or uninterrupted
        availability.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, TravelMed and its authors are
        not liable for any direct, indirect, incidental, or consequential
        damages arising from your use of, or inability to use, the Site or its
        content, including any decisions made in reliance on it.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Original content on the Site is owned by TravelMed unless otherwise
        noted. You may read and share links to the content for personal,
        non-commercial use. You may not republish or redistribute substantial
        portions without permission. Some referenced material (for example, CDC
        publications) belongs to its respective owners.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse the Site, including attempting to disrupt it,
        scrape it at scale, or use it for unlawful purposes.
      </p>

      <h2>External links</h2>
      <p>
        The Site links to third-party resources for convenience. We are not
        responsible for the content or practices of those sites.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Switzerland, without regard to
        conflict-of-law principles.
      </p>

      <h2>Changes</h2>
      <p>
        We may revise these terms over time. Continued use of the Site after
        changes constitutes acceptance of the updated terms.
      </p>

      <p>
        Questions? See our <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
