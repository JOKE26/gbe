import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/shared/page-header";
import { ContributionForm } from "@/components/features/contribution/contribution-form";
import { ContributionList } from "@/components/features/contribution/contribution-list";
import { ContributionStats } from "@/components/features/contribution/contribution-stats";

export default async function ContributionsPage() {
  const t = await getTranslations("dashboard.contributions");

  const langues = await prisma.langue.findMany({
    include: { pays: true },
    orderBy: { nom: "asc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader title={t("title")} description={t("subtitle")} />
        <ContributionForm langues={langues} />
      </div>

      <ContributionStats />

      <div>
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/60">
          {t("mySubmissions")}
        </h2>
        <div className="mt-3">
          <ContributionList />
        </div>
      </div>
    </div>
  );
}
