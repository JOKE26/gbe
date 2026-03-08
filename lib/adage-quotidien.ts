import { prisma } from "@/lib/prisma";

const ADAGE_INCLUDE = {
  adage: {
    include: { langue: true },
  },
} as const;

/**
 * Algorithme de sélection de l'adage quotidien.
 *
 * 1. Vérifie si l'utilisateur a déjà un adage pour aujourd'hui → le retourne
 * 2. Récupère la langue préférée (prioritaire) et les langues d'origine
 * 3. Cherche un adage APPROVED dans la langue préférée d'abord, puis origines, puis fallback
 * 4. Évite les adages déjà envoyés à cet utilisateur
 * 5. Si tous épuisés, recommence le cycle
 * 6. Crée l'entrée AdageQuotidien et la retourne
 */
export async function getOrCreateDailyAdage(userId: string) {
  const today = getToday();

  // 1. Déjà un adage pour aujourd'hui ?
  const existing = await prisma.adageQuotidien.findUnique({
    where: { userId_date: { userId, date: today } },
    include: ADAGE_INCLUDE,
  });

  if (existing) return existing;

  // 2. Récupérer les langues de l'utilisateur
  const { preferredLangueId, origineLangueIds } =
    await getUserLangueInfo(userId);

  // 3. Sélectionner un adage non encore envoyé
  const adage = await selectAdageForUser(
    userId,
    preferredLangueId,
    origineLangueIds,
  );

  if (!adage) return null;

  // 4. Créer l'entrée quotidienne
  const quotidien = await prisma.adageQuotidien.create({
    data: {
      userId,
      adageId: adage.id,
      date: today,
    },
    include: ADAGE_INCLUDE,
  });

  return quotidien;
}

/**
 * Rafraîchit l'adage du jour quand l'utilisateur change sa langue préférée.
 * Supprime l'adage du jour actuel (si existant) et en crée un nouveau
 * exclusivement dans la langue choisie.
 */
export async function refreshDailyAdageForLangue(
  userId: string,
  newLangueId: string | null,
) {
  const today = getToday();

  // Supprimer l'adage du jour actuel
  await prisma.adageQuotidien.deleteMany({
    where: { userId, date: today },
  });

  // Si pas de langue préférée, on laisse getOrCreateDailyAdage recréer normalement
  if (!newLangueId) return;

  // Sélectionner un adage dans la nouvelle langue
  const origineLangueIds: string[] = [];
  const adage = await selectAdageForUser(userId, newLangueId, origineLangueIds);

  if (!adage) return;

  await prisma.adageQuotidien.create({
    data: {
      userId,
      adageId: adage.id,
      date: today,
    },
  });
}

/**
 * Retourne la date du jour (minuit UTC) pour la contrainte unique userId+date
 */
function getToday(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

/**
 * Récupère la langue préférée et les langues d'origine séparément.
 * La langue préférée est traitée en priorité absolue.
 */
async function getUserLangueInfo(userId: string): Promise<{
  preferredLangueId: string | null;
  origineLangueIds: string[];
}> {
  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: {
      origines: {
        select: { langueId: true },
      },
    },
  });

  const origineIds = new Set<string>();
  if (profile?.origines) {
    for (const o of profile.origines) {
      if (o.langueId) origineIds.add(o.langueId);
    }
  }

  return {
    preferredLangueId: profile?.preferredLangueId ?? null,
    origineLangueIds: Array.from(origineIds),
  };
}

/**
 * Sélectionne un adage APPROVED que l'utilisateur n'a pas encore reçu.
 * Ordre de priorité :
 * 1. Langue préférée (exclusive si définie)
 * 2. Langues des origines
 * 3. N'importe quel adage APPROVED
 * 4. Si tout est épuisé, recommence le cycle dans le même ordre
 */
async function selectAdageForUser(
  userId: string,
  preferredLangueId: string | null,
  origineLangueIds: string[],
) {
  // IDs des adages déjà envoyés à cet utilisateur
  const sentAdages = await prisma.adageQuotidien.findMany({
    where: { userId },
    select: { adageId: true },
  });
  const sentIds = sentAdages.map((a) => a.adageId);
  const notInSent = sentIds.length > 0 ? sentIds : ["__none__"];

  // 1. Langue préférée — priorité absolue
  if (preferredLangueId) {
    const preferred = await prisma.adage.findFirst({
      where: {
        statut: "APPROVED",
        langueId: preferredLangueId,
        id: { notIn: notInSent },
      },
      orderBy: { createdAt: "asc" },
    });
    if (preferred) return preferred;
  }

  // 2. Langues des origines (hors langue préférée déjà tentée)
  const otherLangueIds = origineLangueIds.filter(
    (id) => id !== preferredLangueId,
  );
  if (otherLangueIds.length > 0) {
    const fromOrigins = await prisma.adage.findFirst({
      where: {
        statut: "APPROVED",
        langueId: { in: otherLangueIds },
        id: { notIn: notInSent },
      },
      orderBy: { createdAt: "asc" },
    });
    if (fromOrigins) return fromOrigins;
  }

  // 3. N'importe quel adage APPROVED non encore envoyé
  const fallback = await prisma.adage.findFirst({
    where: {
      statut: "APPROVED",
      id: { notIn: notInSent },
    },
    orderBy: { createdAt: "asc" },
  });
  if (fallback) return fallback;

  // 4. Cycle épuisé — recommencer en priorisant la langue préférée
  if (preferredLangueId) {
    const restart = await prisma.adage.findFirst({
      where: {
        statut: "APPROVED",
        langueId: preferredLangueId,
      },
      orderBy: { createdAt: "asc" },
    });
    if (restart) return restart;
  }

  // 5. Puis les langues d'origine
  const allLangueIds = [
    ...(preferredLangueId ? [preferredLangueId] : []),
    ...origineLangueIds,
  ];
  if (allLangueIds.length > 0) {
    const restartOrigins = await prisma.adage.findFirst({
      where: {
        statut: "APPROVED",
        langueId: { in: allLangueIds },
      },
      orderBy: { createdAt: "asc" },
    });
    if (restartOrigins) return restartOrigins;
  }

  // 6. Dernier recours : premier adage approuvé disponible
  return prisma.adage.findFirst({
    where: { statut: "APPROVED" },
    orderBy: { createdAt: "asc" },
  });
}
