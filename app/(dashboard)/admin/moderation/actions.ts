"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { ContributionNotificationEmail } from "@/emails/contribution-notification";
import { revalidatePath } from "next/cache";
import type { AdageStatut } from "@/lib/generated/prisma/client";

/**
 * Vérifie que l'utilisateur connecté est ADMIN ou MODERATOR.
 */
async function requireModerator() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  if (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR") {
    throw new Error("Accès refusé — rôle insuffisant");
  }
  return session.user;
}

/**
 * Modère une contribution : approuve ou rejette un adage.
 * Envoie une notification email au contributeur.
 */
export async function moderateContribution(
  adageId: string,
  statut: Extract<AdageStatut, "APPROVED" | "REJECTED">,
) {
  const user = await requireModerator();

  // Récupérer l'adage avec le contributeur et la langue
  const adage = await prisma.adage.findUniqueOrThrow({
    where: { id: adageId },
    include: {
      contributeur: { select: { name: true, email: true } },
      langue: { select: { nom: true } },
    },
  });

  // Mettre à jour le statut
  await prisma.adage.update({
    where: { id: adageId },
    data: {
      statut,
      validateurId: user.id,
    },
  });

  // Envoyer la notification email au contributeur
  if (adage.contributeur?.email) {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://gbe.app";
    try {
      await sendEmail({
        to: adage.contributeur.email,
        subject:
          statut === "APPROVED"
            ? "Votre adage a été approuvé ! — Gbé"
            : "Mise à jour sur votre contribution — Gbé",
        react: ContributionNotificationEmail({
          userName: adage.contributeur.name ?? "Contributeur",
          texteOriginal: adage.texteOriginal,
          langueNom: adage.langue.nom,
          statut,
          appUrl,
        }),
      });
    } catch {
      // L'envoi d'email ne doit pas bloquer la modération
    }
  }

  revalidatePath("/admin/moderation");
  revalidatePath("/admin/adages");
}
