"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { markAdageAsRead } from "@/app/(dashboard)/accueil/actions";
import { Check, Loader2 } from "lucide-react";

interface AdageReadButtonProps {
  quotidienId: string;
  lu: boolean;
}

export function AdageReadButton({ quotidienId, lu }: AdageReadButtonProps) {
  const t = useTranslations("dashboard.accueil");
  const [isPending, startTransition] = useTransition();

  if (lu) {
    return (
      <span className="flex items-center gap-1.5 text-xs text-baobab">
        <Check className="h-3.5 w-3.5" />
        {t("alreadyRead")}
      </span>
    );
  }

  return (
    <button
      onClick={() => {
        startTransition(async () => {
          await markAdageAsRead(quotidienId);
        });
      }}
      disabled={isPending}
      className="flex items-center gap-2 rounded-full border border-or/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5 disabled:opacity-50"
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Check className="h-3.5 w-3.5" />
      )}
      {t("markAsRead")}
    </button>
  );
}
