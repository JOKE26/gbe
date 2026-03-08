"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function markAdageAsRead(adageQuotidienId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await prisma.adageQuotidien.update({
    where: {
      id: adageQuotidienId,
      userId: session.user.id,
    },
    data: { lu: true },
  });

  revalidatePath("/accueil");
}

export async function toggleFavori(adageQuotidienId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  const quotidien = await prisma.adageQuotidien.findUnique({
    where: {
      id: adageQuotidienId,
      userId: session.user.id,
    },
    select: { favori: true },
  });

  if (!quotidien) {
    throw new Error("Adage quotidien introuvable");
  }

  await prisma.adageQuotidien.update({
    where: {
      id: adageQuotidienId,
      userId: session.user.id,
    },
    data: { favori: !quotidien.favori },
  });

  revalidatePath("/accueil");
  revalidatePath("/accueil/historique");
  revalidatePath("/accueil/favoris");
}
