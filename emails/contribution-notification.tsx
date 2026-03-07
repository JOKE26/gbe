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

interface ContributionNotificationEmailProps {
  userName: string;
  texteOriginal: string;
  langueNom: string;
  statut: "APPROVED" | "REJECTED";
  appUrl: string;
}

/**
 * Template email de notification pour les contributions.
 *
 * Envoyé lorsqu'un modérateur approuve ou rejette une contribution.
 * Design cohérent avec le template adage-quotidien.
 */
export function ContributionNotificationEmail({
  userName,
  texteOriginal,
  langueNom,
  statut,
  appUrl,
}: ContributionNotificationEmailProps) {
  const isApproved = statut === "APPROVED";

  const previewText = isApproved
    ? `Votre adage en ${langueNom} a été approuvé !`
    : `Mise à jour sur votre contribution en ${langueNom}`;

  const title = isApproved
    ? "Votre adage a été approuvé !"
    : "Mise à jour sur votre contribution";

  const message = isApproved
    ? "Bonne nouvelle ! Votre contribution a été vérifiée et approuvée par notre équipe de modération. Elle sera désormais partagée avec la communauté Gbé."
    : "Après vérification par notre équipe, votre contribution n'a malheureusement pas pu être retenue. N'hésitez pas à soumettre un nouvel adage !";

  const ctaText = isApproved
    ? "Voir mes contributions"
    : "Soumettre un nouvel adage";

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
          </Section>

          <Hr style={styles.divider} />

          {/* Statut */}
          <Section style={styles.statusSection}>
            <Text
              style={{
                ...styles.statusBadge,
                backgroundColor: isApproved ? "#2E7D3215" : "#B5451B15",
                color: isApproved ? "#2E7D32" : "#B5451B",
              }}
            >
              {isApproved ? "✓ Approuvé" : "✗ Non retenu"}
            </Text>
            <Heading as="h2" style={styles.title}>
              {title}
            </Heading>
            <Text style={styles.message}>{message}</Text>
          </Section>

          {/* Adage concerné */}
          <Section style={styles.adageSection}>
            <Text style={styles.label}>{langueNom}</Text>
            <Text style={styles.adageText}>« {texteOriginal} »</Text>
          </Section>

          <Hr style={styles.divider} />

          {/* CTA */}
          <Section style={styles.ctaSection}>
            <Link href={`${appUrl}/contributions`} style={styles.ctaButton}>
              {ctaText}
            </Link>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              Vous recevez cet email car vous avez soumis une contribution sur
              Gbé.
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
    margin: "0",
  },
  divider: {
    borderColor: "#D4A01720",
    margin: "24px 32px",
  },
  statusSection: {
    padding: "0 32px",
    textAlign: "center" as const,
  },
  statusBadge: {
    display: "inline-block",
    fontSize: "12px",
    fontWeight: "700" as const,
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    borderRadius: "999px",
    padding: "6px 16px",
    margin: "0 0 16px",
  },
  title: {
    fontFamily: "'Georgia', 'Lora', serif",
    fontSize: "20px",
    lineHeight: "1.4",
    color: "#1A1A2E",
    margin: "0 0 12px",
  },
  message: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#1A1A2E",
    opacity: 0.7,
    margin: "0",
  },
  adageSection: {
    padding: "20px 32px",
    marginTop: "16px",
    backgroundColor: "#B5451B08",
    borderLeft: "3px solid #B5451B",
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
    fontSize: "18px",
    lineHeight: "1.5",
    color: "#1A1A2E",
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
