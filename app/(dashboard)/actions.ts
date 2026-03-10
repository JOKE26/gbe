"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function completeOnboarding() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Non autorisé");
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { onboardingCompleted: true },
  });

  revalidatePath("/", "layout");
  return { success: true };
}
