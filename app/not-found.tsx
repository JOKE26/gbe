import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("errors.notFound");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sable px-4">
      <h1 className="font-serif text-6xl font-bold text-terre">404</h1>
      <div className="mt-4 h-px w-12 bg-or" />
      <h2 className="mt-4 font-serif text-xl text-ebene">{t("title")}</h2>
      <p className="mt-2 text-sm text-ebene/50">{t("description")}</p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-terre px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
      >
        {t("backHome")}
      </Link>
    </div>
  );
}
