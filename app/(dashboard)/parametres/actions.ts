"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Met à jour la préférence d'email quotidien de l'utilisateur.
 */
export async function updateDailyEmailPreference(enabled: boolean) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await prisma.profile.update({
    where: { userId: session.user.id },
    data: { dailyEmailEnabled: enabled },
  });

  revalidatePath("/parametres");
  revalidatePath("/profil");
}
