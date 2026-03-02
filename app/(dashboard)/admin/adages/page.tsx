import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { AdageTable } from "@/components/features/admin/adage-table";
import { AdageFormDialog } from "@/components/features/admin/adage-form-dialog";

/**
 * Page d'administration des adages.
 * Affiche la liste complète avec statut, langue, contributeur
 * et permet la création/édition/suppression.
 */
export default async function AdminAdagesPage() {
  const t = await getTranslations("admin.adages");

  const [adages, langues] = await Promise.all([
    prisma.adage.findMany({
      include: {
        langue: true,
        contributeur: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.langue.findMany({
      include: { pays: true },
      orderBy: { nom: "asc" },
    }),
  ]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader title={t("title")} description={t("subtitle")} />
        <AdageFormDialog langues={langues} />
      </div>

      <div className="mt-6">
        <AdageTable adages={adages} langues={langues} />
      </div>
    </div>
  );
}
