import LegalLayout from "../components/LegalLayout";

export const metadata = {
  title: "Medical disclaimer",
  description:
    "TravelMed provides educational travel health information only. It is not a substitute for individual medical advice from a qualified travel medicine clinician.",
};

export default function DisclaimerPage() {
  return (
    <LegalLayout kicker="Legal" title="Medical disclaimer" lastUpdated="June 28, 2026">
      <p>
        <strong>
          The information on TravelMed is provided for general educational
          purposes only. It is not medical advice and does not replace
          consultation with a qualified healthcare professional.
        </strong>
      </p>

      <h2>No doctor–patient relationship</h2>
      <p>
        Reading this website, contacting us, or using any of our tools does not
        create a doctor–patient relationship. We cannot assess your individual
        medical history, current medications, allergies, pregnancy status, or
        other factors that determine which vaccines, malaria prophylaxis, or
        precautions are right for you.
      </p>

      <h2>Always consult a travel clinic</h2>
      <p>
        Vaccine requirements, malaria prophylaxis, and outbreak risk are
        destination-, traveler-, and date-specific. Book an appointment with a
        travel medicine specialist or your physician, ideally{" "}
        <strong>4–6 weeks before departure</strong>, so there is time for any
        vaccine course to take effect. Some vaccines (for example, yellow fever)
        may legally be required for entry and can only be given at designated
        centres.
      </p>

      <h2>In an emergency</h2>
      <p>
        If you have a medical emergency, call your local emergency number or go
        to the nearest emergency department immediately. Do not rely on this
        website for urgent or time-sensitive medical decisions.
      </p>

      <h2>Accuracy and sources</h2>
      <p>
        We make a careful effort to align our content with authoritative sources
        — including the{" "}
        <a href="https://wwwnc.cdc.gov/travel/yellowbook" target="_blank" rel="noopener noreferrer">CDC Yellow Book</a>,{" "}
        <a href="https://www.who.int/travel-advice" target="_blank" rel="noopener noreferrer">WHO International Travel and Health</a>, and{" "}
        <a href="https://www.istm.org/" target="_blank" rel="noopener noreferrer">ISTM</a> guidance — and to keep outbreak
        information current. However, guidelines change, surveillance data is
        incomplete, and errors are possible. We make no warranty that the
        content is complete, current, or correct for your situation, and we are
        not liable for decisions made in reliance on it.
      </p>

      <h2>External links</h2>
      <p>
        TravelMed links to third-party sources for your convenience. We do not
        control and are not responsible for the content of external websites.
      </p>

      <p>
        Questions about this disclaimer? See our{" "}
        <a href="/contact">contact page</a>.
      </p>
    </LegalLayout>
  );
}
