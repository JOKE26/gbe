import { prisma } from "@/lib/prisma";

/**
 * Algorithme de sélection de l'adage quotidien.
 *
 * 1. Vérifie si l'utilisateur a déjà un adage pour aujourd'hui → le retourne
 * 2. Cherche un adage APPROVED dans la langue préférée ou les langues d'origine
 * 3. Évite les adages déjà envoyés à cet utilisateur
 * 4. Si tous épuisés, recommence le cycle
 * 5. Crée l'entrée AdageQuotidien et la retourne
 */
export async function getOrCreateDailyAdage(userId: string) {
  const today = getToday();

  // 1. Déjà un adage pour aujourd'hui ?
  const existing = await prisma.adageQuotidien.findUnique({
    where: { userId_date: { userId, date: today } },
    include: {
      adage: {
        include: { langue: true },
      },
    },
  });

  if (existing) return existing;

  // 2. Récupérer les langues de l'utilisateur (préférence + origines)
  const langueIds = await getUserLangueIds(userId);

  // 3. Sélectionner un adage non encore envoyé
  const adage = await selectAdageForUser(userId, langueIds);

  if (!adage) return null;

  // 4. Créer l'entrée quotidienne
  const quotidien = await prisma.adageQuotidien.create({
    data: {
      userId,
      adageId: adage.id,
      date: today,
    },
    include: {
      adage: {
        include: { langue: true },
      },
    },
  });

  return quotidien;
}

/**
 * Retourne la date du jour (minuit UTC) pour la contrainte unique userId+date
 */
function getToday(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

/**
 * Récupère les IDs de langues associées à l'utilisateur :
 * - Langue préférée du profil
 * - Langues des origines
 */
async function getUserLangueIds(userId: string): Promise<string[]> {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      origines: {
        select: { langueId: true },
      },
    },
  });

  const ids = new Set<string>();

  // Langue préférée
  if (profile?.preferredLangueId) {
    ids.add(profile.preferredLangueId);
  }

  // Langues des origines
  if (profile?.origines) {
    for (const o of profile.origines) {
      if (o.langueId) ids.add(o.langueId);
    }
  }

  return Array.from(ids);
}

/**
 * Sélectionne un adage APPROVED que l'utilisateur n'a pas encore reçu.
 * Priorise les langues de l'utilisateur, sinon fallback sur tous les adages.
 */
async function selectAdageForUser(userId: string, langueIds: string[]) {
  // IDs des adages déjà envoyés à cet utilisateur
  const sentAdages = await prisma.adageQuotidien.findMany({
    where: { userId },
    select: { adageId: true },
  });
  const sentIds = sentAdages.map((a) => a.adageId);

  // Tentative 1 : adage dans les langues de l'utilisateur, non encore envoyé
  if (langueIds.length > 0) {
    const adage = await prisma.adage.findFirst({
      where: {
        statut: "APPROVED",
        langueId: { in: langueIds },
        id: { notIn: sentIds.length > 0 ? sentIds : ["__none__"] },
      },
      orderBy: { createdAt: "asc" },
    });

    if (adage) return adage;
  }

  // Tentative 2 : n'importe quel adage APPROVED non encore envoyé
  const fallback = await prisma.adage.findFirst({
    where: {
      statut: "APPROVED",
      id: { notIn: sentIds.length > 0 ? sentIds : ["__none__"] },
    },
    orderBy: { createdAt: "asc" },
  });

  if (fallback) return fallback;

  // Cycle épuisé : recommencer depuis le début (en priorisant les langues)
  if (langueIds.length > 0) {
    const restart = await prisma.adage.findFirst({
      where: {
        statut: "APPROVED",
        langueId: { in: langueIds },
      },
      orderBy: { createdAt: "asc" },
    });
    if (restart) return restart;
  }

  // Dernier recours : premier adage approuvé disponible
  return prisma.adage.findFirst({
    where: { statut: "APPROVED" },
    orderBy: { createdAt: "asc" },
  });
}
