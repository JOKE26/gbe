import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateDailyAdage } from "@/lib/adage-quotidien";
import { sendEmail } from "@/lib/email";
import { AdageQuotidienEmail } from "@/emails/adage-quotidien";

/**
 * Cron job Vercel — exécuté quotidiennement.
 * Pour chaque utilisateur ayant activé les emails quotidiens :
 * 1. Sélectionne (ou récupère) l'adage du jour via l'algorithme
 * 2. Envoie l'email avec le template React Email
 *
 * Sécurisé par CRON_SECRET pour empêcher les appels non autorisés.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://gbe.app";

  // Récupérer les utilisateurs avec email quotidien activé
  const profiles = await prisma.profile.findMany({
    where: { dailyEmailEnabled: true },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  let sent = 0;
  let errors = 0;

  for (const profile of profiles) {
    try {
      const quotidien = await getOrCreateDailyAdage(profile.user.id);

      if (!quotidien) continue;

      await sendEmail({
        to: profile.user.email,
        subject: `Votre adage du jour en ${quotidien.adage.langue.nom}`,
        react: AdageQuotidienEmail({
          userName: profile.user.name ?? "ami(e)",
          texteOriginal: quotidien.adage.texteOriginal,
          traductionLitterale: quotidien.adage.traductionLitterale,
          explication: quotidien.adage.explication,
          langueNom: quotidien.adage.langue.nom,
          contexteUsage: quotidien.adage.contexteUsage,
          appUrl,
        }),
      });

      sent++;
    } catch {
      errors++;
    }
  }

  return NextResponse.json({
    success: true,
    sent,
    errors,
    total: profiles.length,
  });
}
