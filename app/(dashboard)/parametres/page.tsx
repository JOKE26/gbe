import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";

export default function ParametresPage() {
  const t = useTranslations("dashboard.profil");

  return (
    <div>
      <PageHeader title={t("preferences")} />
      <div className="rounded-2xl border border-or/10 bg-surface p-8">
        <p className="text-sm text-ebene/50">{t("dailyEmail")}</p>
      </div>
    </div>
  );
}
