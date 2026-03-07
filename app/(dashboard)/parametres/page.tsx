import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SettingsContent } from "@/components/features/parametres/settings-content";

export default async function ParametresPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const profile = await prisma.profile.findUnique({
    where: { userId: session.user.id },
    select: { dailyEmailEnabled: true },
  });

  return (
    <SettingsContent dailyEmailEnabled={profile?.dailyEmailEnabled ?? true} />
  );
}
