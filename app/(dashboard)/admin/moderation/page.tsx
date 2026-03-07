import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/shared/page-header";
import { ModerationTable } from "@/components/features/admin/moderation-table";

export default async function ModerationPage() {
  const t = await getTranslations("admin.moderation");

  const pendingAdages = await prisma.adage.findMany({
    where: { statut: "PENDING" },
    include: {
      langue: { select: { nom: true } },
      contributeur: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader title={t("title")} description={t("subtitle")} />
        {pendingAdages.length > 0 && (
          <span className="inline-flex items-center rounded-full bg-or/10 text-or px-3 py-1 text-xs font-bold">
            {pendingAdages.length} en attente
          </span>
        )}
      </div>

      <ModerationTable adages={pendingAdages} />
    </div>
  );
}
