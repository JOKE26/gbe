"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Sun,
  Globe,
  BookOpen,
  MessageCircle,
  Info,
  Volume2,
  Share2,
} from "lucide-react";
import { AdageReadButton } from "@/components/features/adage/adage-read-button";
import { AdageAudioPlayer } from "@/components/features/adage/adage-audio-player";
import { AdageFavoriButton } from "@/components/features/adage/adage-favori-button";

interface AdageCardProps {
  quotidienId: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  contexteUsage?: string | null;
  source?: string | null;
  audioUrl?: string | null;
  langueNom: string;
  langueCode: string;
  lu: boolean;
  favori: boolean;
  className?: string;
}

export function AdageCard({
  quotidienId,
  texteOriginal,
  traductionLitterale,
  explication,
  contexteUsage,
  source,
  audioUrl,
  langueNom,
  langueCode,
  lu,
  favori,
  className,
}: AdageCardProps) {
  const t = useTranslations("adage");
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div
      className={cn(
        "rounded-[2rem] border border-or/10 bg-surface transition-all",
        !lu && "shadow-sm",
        className,
      )}
    >
      {/* Gradient signature top bar */}
      <div className="h-1.5 w-full rounded-t-[2rem] bg-linear-to-r from-terre via-or to-terre" />

      <div className="p-8 md:p-12">
        {/* Daily ritual icon */}
        <div className="flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-or/10">
            <Sun className="h-6 w-6 text-or" />
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-terre">
          {t("dailyRitual")}
        </h2>

        {/* Proverb text - centered hero */}
        <p className="mt-8 text-center font-serif text-2xl italic leading-relaxed text-ebene md:text-3xl lg:text-4xl">
          &ldquo;{texteOriginal}&rdquo;
        </p>

        {/* Metadata row */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-terre" />
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-terre">
              {langueNom}
            </span>
          </div>
          <span className="text-ebene/20">·</span>
          <span className="text-xs text-ebene/50">({langueCode})</span>
          {!lu && (
            <>
              <span className="text-ebene/20">·</span>
              <span className="rounded-full bg-or/10 px-2.5 py-0.5 text-xs font-medium text-or">
                {t("new")}
              </span>
            </>
          )}
        </div>

        {/* Golden separator */}
        <div className="mx-auto mt-8 h-px w-16 bg-or/30" />

        {/* Translation */}
        <div className="mt-8 rounded-2xl bg-sable p-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo">
              {t("translation")}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-ebene/80">
            {traductionLitterale}
          </p>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 rounded-full border border-or/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-ebene transition-all hover:bg-or/5"
          >
            <Info className="h-3.5 w-3.5" />
            {showDetails ? t("hideContext") : t("showContext")}
          </button>
          {/* <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-or/20 transition-all hover:bg-or/5"
          >
            <Share2 className="h-4 w-4 text-ebene/60" />
          </button> */}
          <AdageFavoriButton quotidienId={quotidienId} favori={favori} />
        </div>

        {/* Expandable details */}
        {showDetails && (
          <div className="mt-6 space-y-4">
            {/* Explication culturelle */}
            <div className="rounded-2xl bg-terre/4 p-5">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-terre" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
                  {t("explanation")}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ebene/70">
                {explication}
              </p>
            </div>

            {/* Contexte d'usage */}
            {contexteUsage && (
              <div className="rounded-2xl border border-or/10 p-5">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-ebene/50" />
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
                    {t("context")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ebene/60">
                  {contexteUsage}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Audio */}
        <div className="mt-6">
          {audioUrl ? (
            <AdageAudioPlayer audioUrl={audioUrl} />
          ) : (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-or/15 px-4 py-3">
              <Volume2 className="h-4 w-4 text-ebene/25" />
              <span className="text-xs text-ebene/30">
                {t("audio.noAudio")}
              </span>
            </div>
          )}
        </div>

        {/* Source + Read */}
        <div className="mt-6 flex items-center justify-between">
          {source && (
            <p className="text-xs text-ebene/30">
              {t("source")} : {source}
            </p>
          )}
          <div className="ml-auto">
            <AdageReadButton quotidienId={quotidienId} lu={lu} />
          </div>
        </div>
      </div>
    </div>
  );
}
