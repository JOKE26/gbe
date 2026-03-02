import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface AdageQuotidienEmailProps {
  userName: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  langueNom: string;
  contexteUsage?: string | null;
  appUrl: string;
}

/**
 * Template email pour l'adage quotidien.
 *
 * Design : minimaliste, reprend les couleurs du design system "Parchemin Sacré".
 * Le texte original est en serif/italic pour évoquer la citation,
 * la traduction et l'explication suivent en texte clair.
 */
export function AdageQuotidienEmail({
  userName,
  texteOriginal,
  traductionLitterale,
  explication,
  langueNom,
  contexteUsage,
  appUrl,
}: AdageQuotidienEmailProps) {
  const previewText = `Votre adage du jour en ${langueNom} — ${texteOriginal.slice(0, 60)}…`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Barre dégradée haute */}
          <Section style={styles.gradientBar} />

          {/* En-tête */}
          <Section style={styles.header}>
            <Text style={styles.logo}>Gbé</Text>
            <Text style={styles.greeting}>Bonjour {userName},</Text>
            <Text style={styles.intro}>
              Voici votre adage du jour en <strong>{langueNom}</strong>.
            </Text>
          </Section>

          <Hr style={styles.divider} />

          {/* Adage — texte original */}
          <Section style={styles.adageSection}>
            <Text style={styles.label}>{langueNom}</Text>
            <Heading as="h2" style={styles.adageText}>
              « {texteOriginal} »
            </Heading>
          </Section>

          {/* Traduction */}
          <Section style={styles.translationSection}>
            <Text style={styles.sectionLabel}>Traduction littérale</Text>
            <Text style={styles.translationText}>{traductionLitterale}</Text>
          </Section>

          {/* Explication */}
          <Section style={styles.explanationSection}>
            <Text style={styles.sectionLabel}>Explication culturelle</Text>
            <Text style={styles.explanationText}>{explication}</Text>
          </Section>

          {/* Contexte (optionnel) */}
          {contexteUsage ? (
            <Section style={styles.contextSection}>
              <Text style={styles.sectionLabel}>Contexte d&apos;usage</Text>
              <Text style={styles.contextText}>{contexteUsage}</Text>
            </Section>
          ) : null}

          <Hr style={styles.divider} />

          {/* CTA */}
          <Section style={styles.ctaSection}>
            <Link href={`${appUrl}/accueil`} style={styles.ctaButton}>
              Voir dans l&apos;application
            </Link>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Vous recevez cet email car vous avez activé les adages quotidiens
              sur Gbé.
            </Text>
            <Link href={`${appUrl}/parametres`} style={styles.footerLink}>
              Gérer mes préférences
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/**
 * Styles inline — obligatoire pour la compatibilité email.
 * Reprend les couleurs du design system Gbé.
 */
const styles = {
  body: {
    backgroundColor: "#F5F0E8",
    fontFamily: "'Inter', 'Segoe UI', Helvetica, Arial, sans-serif",
    margin: "0",
    padding: "0",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#FFFDF8",
    borderRadius: "16px",
    overflow: "hidden" as const,
    marginTop: "32px",
    marginBottom: "32px",
  },
  gradientBar: {
    height: "3px",
    background: "linear-gradient(to right, #B5451B, #D4A017, #B5451B)",
  },
  header: {
    padding: "32px 32px 0",
  },
  logo: {
    fontFamily: "'Georgia', 'Lora', serif",
    fontSize: "28px",
    fontWeight: "700" as const,
    color: "#1A1A2E",
    margin: "0 0 16px",
  },
  greeting: {
    fontSize: "16px",
    color: "#1A1A2E",
    margin: "0 0 8px",
  },
  intro: {
    fontSize: "14px",
    color: "#1A1A2E",
    opacity: 0.7,
    margin: "0",
    lineHeight: "1.6",
  },
  divider: {
    borderColor: "#D4A01720",
    margin: "24px 32px",
  },
  adageSection: {
    padding: "0 32px",
  },
  label: {
    fontSize: "11px",
    fontWeight: "700" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    color: "#B5451B",
    margin: "0 0 8px",
  },
  adageText: {
    fontFamily: "'Georgia', 'Lora', serif",
    fontStyle: "italic" as const,
    fontSize: "22px",
    lineHeight: "1.5",
    color: "#1A1A2E",
    margin: "0",
  },
  translationSection: {
    padding: "20px 32px",
    marginTop: "16px",
    backgroundColor: "#2D3A8C08",
    borderLeft: "3px solid #2D3A8C",
  },
  sectionLabel: {
    fontSize: "11px",
    fontWeight: "700" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    color: "#1A1A2E",
    opacity: 0.5,
    margin: "0 0 6px",
  },
  translationText: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#2D3A8C",
    margin: "0",
  },
  explanationSection: {
    padding: "20px 32px",
    marginTop: "8px",
    backgroundColor: "#B5451B08",
    borderLeft: "3px solid #B5451B",
  },
  explanationText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#1A1A2E",
    margin: "0",
  },
  contextSection: {
    padding: "16px 32px",
    marginTop: "8px",
  },
  contextText: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#1A1A2E",
    opacity: 0.6,
    fontStyle: "italic" as const,
    margin: "0",
  },
  ctaSection: {
    padding: "8px 32px 24px",
    textAlign: "center" as const,
  },
  ctaButton: {
    display: "inline-block",
    backgroundColor: "#B5451B",
    color: "#FFFFFF",
    fontSize: "12px",
    fontWeight: "700" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.2em",
    textDecoration: "none",
    borderRadius: "999px",
    padding: "14px 28px",
  },
  footer: {
    padding: "0 32px 32px",
    textAlign: "center" as const,
  },
  footerText: {
    fontSize: "12px",
    color: "#1A1A2E",
    opacity: 0.4,
    lineHeight: "1.5",
    margin: "0 0 8px",
  },
  footerLink: {
    fontSize: "12px",
    color: "#2D3A8C",
    textDecoration: "underline",
  },
} as const;
