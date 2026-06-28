import LegalLayout from "../components/LegalLayout";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with TravelMed — corrections, questions about our content, or general feedback.",
};

export default function ContactPage() {
  return (
    <LegalLayout kicker="Contact" title="Get in touch">
      <p>
        TravelMed is an independent, physician-built resource. We welcome
        corrections, source suggestions, and feedback that helps make the
        content more accurate and useful.
      </p>

      <h2>Email</h2>
      <p>
        The best way to reach us is by email:{" "}
        <a href="mailto:contact@travelmed.ch">contact@travelmed.ch</a>. We read
        every message, though we can&apos;t always reply individually.
      </p>

      <h2>Spotted something wrong?</h2>
      <p>
        If you believe a piece of guidance is out of date or incorrect, please
        include the page link and, where possible, the authoritative source
        (CDC, WHO, ECDC, or national guidance) you&apos;re referencing. Accuracy
        corrections are our top priority.
      </p>

      <h2>Important</h2>
      <p>
        We cannot provide individual medical advice or answer
        &ldquo;what should I do for my trip?&rdquo; questions by email. For
        personal recommendations, please consult a travel medicine clinician —
        see our <a href="/disclaimer">medical disclaimer</a>.
      </p>
    </LegalLayout>
  );
}
