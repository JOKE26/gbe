import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/contributions — Retourne les contributions de l'utilisateur connecté.
 * Utilisé par le hook useContributions() côté client.
 * Les adages sont triés par date de création décroissante (les plus récents en premier).
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const contributions = await prisma.adage.findMany({
    where: { contributeurId: session.user.id },
    select: {
      id: true,
      texteOriginal: true,
      traductionLitterale: true,
      statut: true,
      createdAt: true,
      langue: {
        select: { nom: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contributions);
}
