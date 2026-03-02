"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { contributionSchema } from "@/lib/validators";
import { revalidatePath } from "next/cache";
import type { AdageStatut } from "@/lib/generated/prisma/client";

/**
 * Vérifie que l'utilisateur connecté est ADMIN ou MODERATOR.
 * Toutes les actions admin passent par cette guard.
 */
async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");
  if (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR") {
    throw new Error("Accès refusé — rôle insuffisant");
  }
  return session.user;
}

/**
 * Crée un nouvel adage avec le statut APPROVED directement
 * (car c'est un admin qui le crée, pas un contributeur).
 */
export async function createAdage(formData: FormData) {
  const user = await requireAdmin();

  const data = contributionSchema.parse({
    texteOriginal: formData.get("texteOriginal"),
    traductionLitterale: formData.get("traductionLitterale"),
    explication: formData.get("explication"),
    contexteUsage: formData.get("contexteUsage") || undefined,
    source: formData.get("source") || undefined,
    langueId: formData.get("langueId"),
  });

  await prisma.adage.create({
    data: {
      ...data,
      statut: "APPROVED",
      contributeurId: user.id,
      validateurId: user.id,
    },
  });

  revalidatePath("/admin/adages");
}

/**
 * Met à jour un adage existant.
 * Seuls les champs textuels et la langue sont modifiables.
 */
export async function updateAdage(adageId: string, formData: FormData) {
  await requireAdmin();

  const data = contributionSchema.parse({
    texteOriginal: formData.get("texteOriginal"),
    traductionLitterale: formData.get("traductionLitterale"),
    explication: formData.get("explication"),
    contexteUsage: formData.get("contexteUsage") || undefined,
    source: formData.get("source") || undefined,
    langueId: formData.get("langueId"),
  });

  await prisma.adage.update({
    where: { id: adageId },
    data,
  });

  revalidatePath("/admin/adages");
}

/**
 * Change le statut d'un adage (PENDING → APPROVED/REJECTED).
 * Utilisé par le workflow de modération des contributions.
 */
export async function updateAdageStatut(adageId: string, statut: AdageStatut) {
  const user = await requireAdmin();

  await prisma.adage.update({
    where: { id: adageId },
    data: {
      statut,
      validateurId: user.id,
    },
  });

  revalidatePath("/admin/adages");
}

/**
 * Supprime définitivement un adage.
 * Supprime aussi les entrées AdageQuotidien liées (cascade manuelle
 * car Prisma ne supporte pas encore onDelete sur les relations implicites).
 */
export async function deleteAdage(adageId: string) {
  await requireAdmin();

  // Supprimer les références quotidiennes d'abord
  await prisma.adageQuotidien.deleteMany({
    where: { adageId },
  });

  await prisma.adage.delete({
    where: { id: adageId },
  });

  revalidatePath("/admin/adages");
}
