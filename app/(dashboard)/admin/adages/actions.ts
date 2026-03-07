"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { contributionSchema } from "@/lib/validators";
import { uploadAudio, deleteAudio } from "@/lib/supabase-storage";
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
 * Extrait et uploade le fichier audio depuis le FormData si présent.
 * @returns L'URL publique de l'audio, ou undefined si aucun fichier.
 */
async function handleAudioUpload(
  formData: FormData,
): Promise<string | undefined> {
  const audioFile = formData.get("audio");
  if (!audioFile || !(audioFile instanceof File) || audioFile.size === 0) {
    return undefined;
  }
  return uploadAudio(audioFile);
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

  const audioUrl = await handleAudioUpload(formData);

  await prisma.adage.create({
    data: {
      ...data,
      audioUrl,
      statut: "APPROVED",
      contributeurId: user.id,
      validateurId: user.id,
    },
  });

  revalidatePath("/admin/adages");
}

/**
 * Met à jour un adage existant.
 * Gère aussi le remplacement / la suppression du fichier audio.
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

  // Vérifier si on doit gérer l'audio
  const removeAudio = formData.get("removeAudio") === "true";
  const newAudioUrl = await handleAudioUpload(formData);

  // Récupérer l'adage existant pour nettoyer l'ancien audio si nécessaire
  const existing = await prisma.adage.findUniqueOrThrow({
    where: { id: adageId },
    select: { audioUrl: true },
  });

  // Supprimer l'ancien audio de Supabase Storage si on le remplace ou le supprime
  if (existing.audioUrl && (newAudioUrl || removeAudio)) {
    try {
      await deleteAudio(existing.audioUrl);
    } catch {
      // Non bloquant — l'ancien fichier restera orphelin
    }
  }

  await prisma.adage.update({
    where: { id: adageId },
    data: {
      ...data,
      ...(newAudioUrl ? { audioUrl: newAudioUrl } : {}),
      ...(removeAudio ? { audioUrl: null } : {}),
    },
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
 * Supprime aussi le fichier audio de Storage et les entrées AdageQuotidien liées.
 */
export async function deleteAdage(adageId: string) {
  await requireAdmin();

  // Récupérer l'adage pour supprimer l'audio associé
  const existing = await prisma.adage.findUniqueOrThrow({
    where: { id: adageId },
    select: { audioUrl: true },
  });

  // Supprimer l'audio de Supabase Storage si présent
  if (existing.audioUrl) {
    try {
      await deleteAudio(existing.audioUrl);
    } catch {
      // Non bloquant
    }
  }

  // Supprimer les références quotidiennes d'abord
  await prisma.adageQuotidien.deleteMany({
    where: { adageId },
  });

  await prisma.adage.delete({
    where: { id: adageId },
  });

  revalidatePath("/admin/adages");
}
