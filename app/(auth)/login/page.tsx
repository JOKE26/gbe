import { useTranslations } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("auth.login");

  return (
    <div className="rounded-2xl border border-or/10 bg-surface p-8">
      <h2 className="font-serif text-xl font-bold text-ebene">{t("title")}</h2>
      <p className="mt-1 text-sm text-ebene/50">{t("subtitle")}</p>
      <div className="mt-4 h-[1px] w-8 bg-or" />
      <div className="mt-6 space-y-3">
        <button className="w-full rounded-full bg-terre px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90">
          {t("google")}
        </button>
      </div>
    </div>
  );
}
