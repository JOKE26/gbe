"use client";

import { useRef, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Upload, X, Music } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitContribution } from "@/app/(dashboard)/contributions/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Langue {
  id: string;
  nom: string;
  pays: { nom: string };
}

interface ContributionFormProps {
  langues: Langue[];
}

export function ContributionForm({ langues }: ContributionFormProps) {
  const t = useTranslations("dashboard.contributions");
  const tCommon = useTranslations("common");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await submitContribution(formData);
        toast.success(t("submitSuccess"));
        setOpen(false);
        formRef.current?.reset();
        setAudioFileName(null);
        await queryClient.invalidateQueries({ queryKey: ["contributions"] });
      } catch {
        toast.error(t("submitError"));
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-2",
            "rounded-full bg-terre text-white",
            "text-xs uppercase tracking-[0.2em] font-bold",
            "px-5 py-2.5",
            "hover:bg-terre/90 transition-all",
          )}
        >
          <Plus className="h-4 w-4" />
          {t("submit")}
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-lg text-ebene">
            {t("submitTitle")}
          </DialogTitle>
          <DialogDescription className="text-sm text-ebene/50">
            {t("submitDescription")}
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={handleSubmit} className="space-y-4 pt-2">
          {/* Langue */}
          <div className="space-y-1.5">
            <Label
              htmlFor="langueId"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldLangue")}
            </Label>
            <select
              id="langueId"
              name="langueId"
              required
              className={cn(
                "w-full rounded-xl border border-or/10 bg-surface px-3 py-2.5",
                "text-sm text-ebene",
                "focus:border-terre/30 focus:outline-none focus:ring-2 focus:ring-terre/10",
              )}
            >
              <option value="">{t("selectLangue")}</option>
              {langues.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nom} — {l.pays.nom}
                </option>
              ))}
            </select>
          </div>

          {/* Texte original */}
          <div className="space-y-1.5">
            <Label
              htmlFor="texteOriginal"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldOriginal")}
            </Label>
            <textarea
              id="texteOriginal"
              name="texteOriginal"
              required
              minLength={3}
              maxLength={2000}
              rows={2}
              placeholder={t("placeholderOriginal")}
              className={cn(
                "w-full rounded-xl border border-or/10 bg-surface px-3 py-2.5",
                "font-serif text-sm text-ebene",
                "placeholder:text-ebene/30",
                "focus:border-terre/30 focus:outline-none focus:ring-2 focus:ring-terre/10",
                "resize-none",
              )}
            />
          </div>

          {/* Traduction littérale */}
          <div className="space-y-1.5">
            <Label
              htmlFor="traductionLitterale"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldTraduction")}
            </Label>
            <textarea
              id="traductionLitterale"
              name="traductionLitterale"
              required
              minLength={3}
              maxLength={2000}
              rows={2}
              placeholder={t("placeholderTraduction")}
              className={cn(
                "w-full rounded-xl border border-or/10 bg-surface px-3 py-2.5",
                "text-sm text-ebene",
                "placeholder:text-ebene/30",
                "focus:border-terre/30 focus:outline-none focus:ring-2 focus:ring-terre/10",
                "resize-none",
              )}
            />
          </div>

          {/* Explication culturelle */}
          <div className="space-y-1.5">
            <Label
              htmlFor="explication"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldExplication")}
            </Label>
            <textarea
              id="explication"
              name="explication"
              required
              minLength={10}
              maxLength={5000}
              rows={3}
              placeholder={t("placeholderExplication")}
              className={cn(
                "w-full rounded-xl border border-or/10 bg-surface px-3 py-2.5",
                "text-sm text-ebene",
                "placeholder:text-ebene/30",
                "focus:border-terre/30 focus:outline-none focus:ring-2 focus:ring-terre/10",
                "resize-none",
              )}
            />
          </div>

          {/* Contexte d'usage (optionnel) */}
          <div className="space-y-1.5">
            <Label
              htmlFor="contexteUsage"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldContexte")}
            </Label>
            <textarea
              id="contexteUsage"
              name="contexteUsage"
              maxLength={2000}
              rows={2}
              placeholder={t("placeholderContexte")}
              className={cn(
                "w-full rounded-xl border border-or/10 bg-surface px-3 py-2.5",
                "text-sm text-ebene",
                "placeholder:text-ebene/30",
                "focus:border-terre/30 focus:outline-none focus:ring-2 focus:ring-terre/10",
                "resize-none",
              )}
            />
          </div>

          {/* Source (optionnel) */}
          <div className="space-y-1.5">
            <Label
              htmlFor="source"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldSource")}
            </Label>
            <Input
              id="source"
              name="source"
              maxLength={500}
              placeholder={t("placeholderSource")}
              className="rounded-xl border-or/10 bg-surface text-sm"
            />
          </div>

          {/* Audio (optionnel) */}
          <div className="space-y-1.5">
            <Label
              htmlFor="audio"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldAudio")}
            </Label>
            <input
              ref={audioInputRef}
              type="file"
              id="audio"
              name="audio"
              accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/webm,audio/aac,audio/mp4"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setAudioFileName(file ? file.name : null);
              }}
            />
            {audioFileName ? (
              <div
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-or/10 bg-surface px-3 py-2.5",
                )}
              >
                <Music className="h-4 w-4 shrink-0 text-terre" />
                <span className="flex-1 truncate text-sm text-ebene">
                  {audioFileName}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setAudioFileName(null);
                    if (audioInputRef.current) audioInputRef.current.value = "";
                  }}
                  className="shrink-0 rounded-full p-1 text-ebene/50 hover:bg-ebene/5 hover:text-ebene transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => audioInputRef.current?.click()}
                className={cn(
                  "flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-or/20 bg-surface px-3 py-4",
                  "text-sm text-ebene/50 hover:border-terre/30 hover:text-ebene/70 transition-all",
                )}
              >
                <Upload className="h-4 w-4" />
                {t("audioUpload")}
              </button>
            )}
            <p className="text-xs text-ebene/40">{t("audioHint")}</p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-full border border-or text-ebene",
                "text-xs uppercase tracking-[0.2em] font-bold",
                "px-5 py-2.5",
                "hover:bg-or/5 transition-all",
              )}
            >
              {tCommon("cancel")}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className={cn(
                "rounded-full bg-terre text-white",
                "text-xs uppercase tracking-[0.2em] font-bold",
                "px-5 py-2.5",
                "hover:bg-terre/90 transition-all",
                "disabled:opacity-50 disabled:cursor-not-allowed",
              )}
            >
              {isPending ? t("submitting") : t("submit")}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
