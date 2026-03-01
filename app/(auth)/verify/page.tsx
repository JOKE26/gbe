import { useTranslations } from "next-intl";
import Link from "next/link";

export default function VerifyPage() {
  const t = useTranslations("auth.verify");

  return (
    <div className="rounded-2xl border border-or/10 bg-surface p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-baobab/10">
        <svg
          className="h-6 w-6 text-baobab"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
          />
        </svg>
      </div>
      <h2 className="font-serif text-xl font-bold text-ebene">{t("title")}</h2>
      <p className="mt-2 text-sm text-ebene/50">{t("subtitle")}</p>
      <Link
        href="/login"
        className="mt-6 inline-block text-xs font-bold uppercase tracking-[0.2em] text-terre transition-colors hover:text-terre/70"
      >
        {t("backToLogin")}
      </Link>
    </div>
  );
}
