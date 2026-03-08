"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Globe,
  BookOpen,
  MessageCircle,
  Info,
  Volume2,
  ChevronDown,
} from "lucide-react";
import { AdageAudioPlayer } from "@/components/features/adage/adage-audio-player";
import { AdageFavoriButton } from "@/components/features/adage/adage-favori-button";

interface AdageCompactCardProps {
  quotidienId: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  contexteUsage?: string | null;
  source?: string | null;
  audioUrl?: string | null;
  langueNom: string;
  langueCode: string;
  favori: boolean;
  date: string;
  className?: string;
}

export function AdageCompactCard({
  quotidienId,
  texteOriginal,
  traductionLitterale,
  explication,
  contexteUsage,
  source,
  audioUrl,
  langueNom,
  langueCode,
  favori,
  date,
  className,
}: AdageCompactCardProps) {
  const t = useTranslations("adage");
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-2xl border border-or/10 bg-surface transition-all hover:translate-y-[-1px] hover:shadow-sm",
        className,
      )}
    >
      <div className="p-5 md:p-6">
        {/* Header row: date + langue + favori */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-ebene/40">{date}</span>
            <span className="text-ebene/15">·</span>
            <div className="flex items-center gap-1.5">
              <Globe className="h-3 w-3 text-terre" />
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-terre">
                {langueNom}
              </span>
            </div>
          </div>
          <AdageFavoriButton
            quotidienId={quotidienId}
            favori={favori}
            size="sm"
          />
        </div>

        {/* Proverb text */}
        <p className="mt-4 font-serif text-lg italic leading-relaxed text-ebene md:text-xl">
          &ldquo;{texteOriginal}&rdquo;
        </p>

        {/* Translation always visible */}
        <p className="mt-3 text-sm leading-relaxed text-ebene/60">
          {traductionLitterale}
        </p>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-terre transition-colors hover:text-terre/80"
        >
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 transition-transform",
              expanded && "rotate-180",
            )}
          />
          {expanded ? t("hideContext") : t("showContext")}
        </button>

        {expanded && (
          <div className="mt-4 space-y-3">
            {/* Explication */}
            <div className="rounded-xl bg-terre/4 p-4">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5 text-terre" />
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-terre">
                  {t("explanation")}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ebene/70">
                {explication}
              </p>
            </div>

            {/* Contexte */}
            {contexteUsage && (
              <div className="rounded-xl border border-or/10 p-4">
                <div className="flex items-center gap-2">
                  <Info className="h-3.5 w-3.5 text-ebene/50" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-ebene/50">
                    {t("context")}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-ebene/60">
                  {contexteUsage}
                </p>
              </div>
            )}

            {/* Audio */}
            {audioUrl ? (
              <AdageAudioPlayer audioUrl={audioUrl} />
            ) : (
              <div className="flex items-center gap-2 rounded-xl border border-dashed border-or/15 px-4 py-2.5">
                <Volume2 className="h-3.5 w-3.5 text-ebene/25" />
                <span className="text-xs text-ebene/30">
                  {t("audio.noAudio")}
                </span>
              </div>
            )}

            {/* Source */}
            {source && (
              <p className="text-xs text-ebene/30">
                {t("source")} : {source}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
