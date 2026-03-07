"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { contributionSchema } from "@/lib/validators";
import { uploadAudio } from "@/lib/supabase-storage";
import { revalidatePath } from "next/cache";

/**
 * Soumet un nouvel adage en tant que contribution utilisateur.
 * L'adage est créé avec le statut PENDING et sera visible
 * dans l'interface de modération.
 */
export async function submitContribution(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  const data = contributionSchema.parse({
    texteOriginal: formData.get("texteOriginal"),
    traductionLitterale: formData.get("traductionLitterale"),
    explication: formData.get("explication"),
    contexteUsage: formData.get("contexteUsage") || undefined,
    source: formData.get("source") || undefined,
    langueId: formData.get("langueId"),
  });

  // Upload audio si un fichier a été fourni
  let audioUrl: string | undefined;
  const audioFile = formData.get("audio");
  if (audioFile instanceof File && audioFile.size > 0) {
    audioUrl = await uploadAudio(audioFile);
  }

  await prisma.adage.create({
    data: {
      ...data,
      audioUrl,
      statut: "PENDING",
      contributeurId: session.user.id,
    },
  });

  revalidatePath("/contributions");
}
