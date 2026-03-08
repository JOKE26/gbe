"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { profileSchema, origineSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import { refreshDailyAdageForLangue } from "@/lib/adage-quotidien";
import type { ProfileInput, OrigineInput } from "@/lib/validators";

async function getAuthenticatedUserId(): Promise<string> {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }
  return session.user.id;
}

async function ensureProfile(userId: string): Promise<string> {
  const existing = await prisma.profile.findUnique({
    where: { userId },
  });
  if (existing) return existing.id;

  const profile = await prisma.profile.create({
    data: { userId },
  });
  return profile.id;
}

export async function updateProfile(input: ProfileInput) {
  const userId = await getAuthenticatedUserId();
  const data = profileSchema.parse(input);

  // Récupérer l'ancienne langue préférée pour détecter un changement
  const oldProfile = await prisma.profile.findUnique({
    where: { userId },
    select: { preferredLangueId: true },
  });
  const oldLangueId = oldProfile?.preferredLangueId ?? null;
  const newLangueId = data.preferredLangueId ?? null;
  const langueChanged = oldLangueId !== newLangueId;

  // Mettre à jour le nom sur User
  await prisma.user.update({
    where: { id: userId },
    data: { name: data.name },
  });

  // Créer ou mettre à jour le Profile
  await prisma.profile.upsert({
    where: { userId },
    create: {
      userId,
      bio: data.bio ?? null,
      preferredLangueId: newLangueId,
    },
    update: {
      bio: data.bio ?? null,
      preferredLangueId: newLangueId,
    },
  });

  // Si la langue préférée a changé, rafraîchir l'adage du jour
  if (langueChanged) {
    await refreshDailyAdageForLangue(userId, newLangueId);
    revalidatePath("/accueil");
  }

  revalidatePath("/profil");
  return { success: true, langueChanged };
}

export async function addOrigine(input: OrigineInput) {
  const userId = await getAuthenticatedUserId();
  const data = origineSchema.parse(input);
  const profileId = await ensureProfile(userId);

  // Vérifier si cette origine existe déjà
  const existing = await prisma.userOrigine.findUnique({
    where: {
      profileId_paysId_ethnieId: {
        profileId,
        paysId: data.paysId,
        ethnieId: data.ethnieId ?? "",
      },
    },
  });

  if (existing) {
    throw new Error("Cette origine existe déjà dans votre profil");
  }

  await prisma.userOrigine.create({
    data: {
      profileId,
      paysId: data.paysId,
      ethnieId: data.ethnieId ?? null,
      langueId: data.langueId ?? null,
    },
  });

  revalidatePath("/profil");
  return { success: true };
}

export async function removeOrigine(origineId: string) {
  const userId = await getAuthenticatedUserId();
  const profileId = await ensureProfile(userId);

  // Vérifier que l'origine appartient bien à cet utilisateur
  const origine = await prisma.userOrigine.findFirst({
    where: { id: origineId, profileId },
  });

  if (!origine) {
    throw new Error("Origine introuvable");
  }

  await prisma.userOrigine.delete({
    where: { id: origineId },
  });

  revalidatePath("/profil");
  return { success: true };
}
