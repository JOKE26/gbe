"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { BookOpen, Globe, MessageCircle, Quote, Info } from "lucide-react";
import { AdageReadButton } from "@/components/features/adage/adage-read-button";

interface AdageCardProps {
  quotidienId: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  contexteUsage?: string | null;
  source?: string | null;
  langueNom: string;
  langueCode: string;
  lu: boolean;
  className?: string;
}

export function AdageCard({
  quotidienId,
  texteOriginal,
  traductionLitterale,
  explication,
  contexteUsage,
  source,
  langueNom,
  langueCode,
  lu,
  className,
}: AdageCardProps) {
  const t = useTranslations("adage");

  return (
    <div
      className={cn(
        "rounded-2xl border border-or/10 bg-surface transition-all",
        !lu && "shadow-sm",
        className,
      )}
    >
      {/* Gradient signature en haut */}
      <div className="h-0.5 w-full rounded-t-2xl bg-linear-to-r from-terre via-or to-terre" />

      <div className="p-6 md:p-8">
        {/* Label langue */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-terre" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
              {langueNom}
            </span>
            <span className="text-xs text-ebene/30">({langueCode})</span>
          </div>
          {!lu && (
            <span className="rounded-full bg-or/10 px-2.5 py-0.5 text-xs font-medium text-or">
              {t("new")}
            </span>
          )}
        </div>

        <div className="mt-3 h-px w-8 bg-or" />

        {/* Texte original */}
        <div className="mt-6">
          <div className="flex items-start gap-2">
            <Quote className="mt-1 h-4 w-4 shrink-0 text-or/40" />
            <p className="font-serif text-xl italic leading-relaxed text-ebene md:text-2xl">
              {texteOriginal}
            </p>
          </div>
        </div>

        {/* Traduction littérale */}
        <div className="mt-6 rounded-xl bg-sable p-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo">
              {t("translation")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ebene/80">
            {traductionLitterale}
          </p>
        </div>

        {/* Explication culturelle */}
        <div className="mt-4 rounded-xl bg-terre/4 p-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-terre" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
              {t("explanation")}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ebene/70">
            {explication}
          </p>
        </div>

        {/* Contexte d'usage */}
        {contexteUsage && (
          <div className="mt-4 rounded-xl border border-or/10 p-4">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-ebene/50" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
                {t("context")}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ebene/60">
              {contexteUsage}
            </p>
          </div>
        )}

        {/* Source + Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            {source && (
              <p className="text-xs text-ebene/30">
                {t("source")} : {source}
              </p>
            )}
          </div>
          <AdageReadButton quotidienId={quotidienId} lu={lu} />
        </div>
      </div>
    </div>
  );
}
