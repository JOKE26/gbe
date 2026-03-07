import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { ProfilForm } from "@/components/features/profil/profil-form";
import { OrigineSelector } from "@/components/features/profil/origine-selector";

export default async function ProfilPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const t = await getTranslations("dashboard.profil");

  // Charger les données utilisateur avec profil et origines
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      profile: {
        include: {
          origines: {
            include: {
              pays: true,
              ethnie: true,
              langue: true,
            },
            orderBy: { pays: { nom: "asc" } },
          },
        },
      },
    },
  });

  if (!user) redirect("/login");

  // Charger toutes les langues pour le sélecteur de préférence (dédupliquées par nom)
  const langues = await prisma.langue.findMany({
    distinct: ["nom"],
    orderBy: { nom: "asc" },
    select: { id: true, nom: true },
  });

  const profileData = user.profile
    ? {
        bio: user.profile.bio,
        preferredLangueId: user.profile.preferredLangueId,
      }
    : null;

  const origines = (user.profile?.origines ?? []).map((o) => ({
    id: o.id,
    pays: { id: o.pays.id, nom: o.pays.nom },
    ethnie: o.ethnie ? { id: o.ethnie.id, nom: o.ethnie.nom } : null,
    langue: o.langue ? { id: o.langue.id, nom: o.langue.nom } : null,
  }));

  return (
    <div>
      <PageHeader title={t("title")} description={t("subtitle")} />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Formulaire de profil */}
        <div className="rounded-2xl border border-or/10 bg-surface p-6 md:p-8">
          <ProfilForm
            user={{
              name: user.name,
              email: user.email,
              image: user.image,
            }}
            profile={profileData}
            langues={langues}
          />
        </div>

        {/* Sélecteur d'origines */}
        <div className="rounded-2xl border border-or/10 bg-surface p-6 md:p-8">
          <OrigineSelector origines={origines} />
        </div>
      </div>
    </div>
  );
}
