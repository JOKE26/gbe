"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Play, Pause, Loader2, Volume2, AlertCircle } from "lucide-react";

interface AdageAudioPlayerProps {
  audioUrl: string;
  className?: string;
}

/**
 * Lecteur audio pour la prononciation des adages.
 * Lazy loading : l'audio n'est chargé qu'au premier clic sur Play.
 * Design system Parchemin Sacré respecté.
 */
export function AdageAudioPlayer({
  audioUrl,
  className,
}: AdageAudioPlayerProps) {
  const t = useTranslations("adage.audio");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "playing" | "paused" | "error"
  >("idle");
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Créer l'élément audio au premier clic (lazy loading)
  const getOrCreateAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.src = audioUrl;

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        if (audio.duration > 0) {
          setProgress((audio.currentTime / audio.duration) * 100);
          setCurrentTime(audio.currentTime);
        }
      });

      audio.addEventListener("ended", () => {
        setStatus("paused");
        setProgress(0);
      });

      audio.addEventListener("error", () => {
        setStatus("error");
      });

      audioRef.current = audio;
    }
    return audioRef.current;
  }, [audioUrl]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  async function handlePlayPause() {
    const audio = getOrCreateAudio();

    if (status === "playing") {
      audio.pause();
      setStatus("paused");
      return;
    }

    try {
      setStatus("loading");
      await audio.play();
      setStatus("playing");
    } catch {
      setStatus("error");
    }
  }

  function handleRetry() {
    if (audioRef.current) {
      audioRef.current.src = "";
      audioRef.current = null;
    }
    setStatus("idle");
    setProgress(0);
    handlePlayPause();
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
    setProgress(percent * 100);
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // État erreur
  if (status === "error") {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3",
          className,
        )}
      >
        <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
        <span className="text-xs text-destructive">{t("error")}</span>
        <button
          onClick={handleRetry}
          type="button"
          className="ml-auto text-xs font-bold uppercase tracking-[0.2em] text-terre transition-colors hover:text-terre/70"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-or/10 bg-sable px-4 py-3",
        className,
      )}
    >
      {/* Bouton Play/Pause */}
      <button
        onClick={handlePlayPause}
        type="button"
        disabled={status === "loading"}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-terre text-white transition-all hover:bg-terre/90 disabled:opacity-50"
        aria-label={status === "playing" ? t("pause") : t("play")}
      >
        {status === "loading" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : status === "playing" ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="ml-0.5 h-4 w-4" />
        )}
      </button>

      {/* Barre de progression */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div
          className="group relative h-1.5 cursor-pointer rounded-full bg-ebene/10"
          onClick={handleSeek}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-terre to-or transition-all"
            style={{ width: `${progress}%` }}
          />
          {/* Indicateur glissant */}
          {(status === "playing" || status === "paused") && progress > 0 && (
            <div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-terre bg-white shadow-sm transition-all"
              style={{ left: `${progress}%`, marginLeft: "-6px" }}
            />
          )}
        </div>

        {/* Durée */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Volume2 className="h-3 w-3 text-ebene/40" />
            <span className="text-[11px] text-ebene/40">{t("play")}</span>
          </div>
          {duration > 0 && (
            <span className="text-[11px] tabular-nums text-ebene/40">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
