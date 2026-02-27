import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";

export default function ContributionsPage() {
  const t = useTranslations("dashboard.contributions");

  return (
    <div>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <div className="rounded-2xl border border-or/10 bg-surface p-8">
        <p className="text-sm text-ebene/50">{t("mySubmissions")}</p>
      </div>
    </div>
  );
}
