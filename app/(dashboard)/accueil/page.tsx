import { useTranslations } from "next-intl";
import { PageHeader } from "@/components/shared/page-header";

export default function AccueilPage() {
  const t = useTranslations("dashboard.accueil");

  return (
    <div>
      <PageHeader title={t("title")} />
      <div className="rounded-2xl border border-or/10 bg-surface p-8 text-center">
        <p className="font-serif text-lg italic text-ebene/60">
          {t("noAdage")}
        </p>
      </div>
    </div>
  );
}
