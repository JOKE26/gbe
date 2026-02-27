"use client";

import { useTranslations } from "next-intl";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  const t = useTranslations("errors");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sable px-4">
      <h1 className="font-serif text-4xl font-bold text-terre">Oops</h1>
      <div className="mt-4 h-[1px] w-12 bg-or" />
      <p className="mt-4 text-sm text-ebene/50">{t("generic")}</p>
      <button
        onClick={reset}
        className="mt-8 rounded-full bg-terre px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
      >
        {t("common.retry")}
      </button>
    </div>
  );
}
