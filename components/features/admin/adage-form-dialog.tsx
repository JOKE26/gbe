"use client";

import { useState, useRef, useTransition } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createAdage,
  updateAdage,
} from "@/app/(dashboard)/admin/adages/actions";
import { cn } from "@/lib/utils";
import { Upload, Volume2, X } from "lucide-react";
import type { Adage, Langue, Pays } from "@/lib/generated/prisma/client";

interface LangueWithPays extends Langue {
  pays: Pays;
}

interface AdageFormDialogProps {
  langues: LangueWithPays[];
  /** Si fourni, le dialog passe en mode édition avec pré-remplissage */
  adage?: Adage;
}

/**
 * Dialog réutilisable pour créer ou éditer un adage.
 * - Sans prop `adage` : bouton "Ajouter" + formulaire vide → createAdage
 * - Avec prop `adage` : bouton "Éditer" + champs pré-remplis → updateAdage
 */
export function AdageFormDialog({ langues, adage }: AdageFormDialogProps) {
  const t = useTranslations("admin.adages");
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [removeAudio, setRemoveAudio] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEdit = Boolean(adage);
  const hasExistingAudio = Boolean(adage?.audioUrl) && !removeAudio;

  function handleSubmit(formData: FormData) {
    if (removeAudio) {
      formData.set("removeAudio", "true");
    }
    startTransition(async () => {
      if (isEdit && adage) {
        await updateAdage(adage.id, formData);
      } else {
        await createAdage(formData);
      }
      setAudioFileName(null);
      setRemoveAudio(false);
      setOpen(false);
    });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setAudioFileName(file ? file.name : null);
    setRemoveAudio(false);
  }

  function handleRemoveAudio() {
    setRemoveAudio(true);
    setAudioFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) {
      setAudioFileName(null);
      setRemoveAudio(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button
            type="button"
            className="rounded-full bg-indigo/10 px-2 py-1 text-xs font-medium text-indigo transition-colors hover:bg-indigo/20"
          >
            {t("edit")}
          </button>
        ) : (
          <button
            type="button"
            className="shrink-0 rounded-full bg-terre px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
          >
            {t("add")}
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-ebene">
            {isEdit ? t("editTitle") : t("addTitle")}
          </DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="mt-4 space-y-4">
          {/* Langue */}
          <div className="space-y-2">
            <Label
              htmlFor="langueId"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldLangue")}
            </Label>
            <Select
              name="langueId"
              defaultValue={adage?.langueId ?? ""}
              required
            >
              <SelectTrigger className="rounded-xl border-or/20">
                <SelectValue placeholder={t("selectLangue")} />
              </SelectTrigger>
              <SelectContent>
                {langues.map((langue) => (
                  <SelectItem key={langue.id} value={langue.id}>
                    {langue.nom} ({langue.pays.nom})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Texte original */}
          <div className="space-y-2">
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
              defaultValue={adage?.texteOriginal ?? ""}
              className="w-full rounded-xl border border-or/20 bg-surface px-3 py-2 font-serif italic text-ebene placeholder:text-ebene/30 focus:border-terre focus:outline-none focus:ring-1 focus:ring-terre"
              rows={3}
              placeholder={t("placeholderOriginal")}
            />
          </div>

          {/* Traduction littérale */}
          <div className="space-y-2">
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
              defaultValue={adage?.traductionLitterale ?? ""}
              className="w-full rounded-xl border border-or/20 bg-surface px-3 py-2 text-ebene placeholder:text-ebene/30 focus:border-terre focus:outline-none focus:ring-1 focus:ring-terre"
              rows={2}
              placeholder={t("placeholderTraduction")}
            />
          </div>

          {/* Explication culturelle */}
          <div className="space-y-2">
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
              defaultValue={adage?.explication ?? ""}
              className="w-full rounded-xl border border-or/20 bg-surface px-3 py-2 text-ebene placeholder:text-ebene/30 focus:border-terre focus:outline-none focus:ring-1 focus:ring-terre"
              rows={3}
              placeholder={t("placeholderExplication")}
            />
          </div>

          {/* Contexte d'usage (optionnel) */}
          <div className="space-y-2">
            <Label
              htmlFor="contexteUsage"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldContexte")}
            </Label>
            <textarea
              id="contexteUsage"
              name="contexteUsage"
              defaultValue={adage?.contexteUsage ?? ""}
              className="w-full rounded-xl border border-or/20 bg-surface px-3 py-2 text-ebene placeholder:text-ebene/30 focus:border-terre focus:outline-none focus:ring-1 focus:ring-terre"
              rows={2}
              placeholder={t("placeholderContexte")}
            />
          </div>

          {/* Source (optionnel) */}
          <div className="space-y-2">
            <Label
              htmlFor="source"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldSource")}
            </Label>
            <Input
              id="source"
              name="source"
              defaultValue={adage?.source ?? ""}
              className="rounded-xl border-or/20"
              placeholder={t("placeholderSource")}
            />
          </div>

          {/* Fichier audio (optionnel) */}
          <div className="space-y-2">
            <Label
              htmlFor="audio"
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/70"
            >
              {t("fieldAudio")}
            </Label>

            {/* Audio existant */}
            {hasExistingAudio && !audioFileName && (
              <div className="flex items-center gap-3 rounded-xl border border-or/10 bg-sable px-4 py-3">
                <Volume2 className="h-4 w-4 shrink-0 text-terre" />
                <span className="min-w-0 flex-1 truncate text-sm text-ebene/70">
                  {t("audioCurrent")}
                </span>
                <button
                  type="button"
                  onClick={handleRemoveAudio}
                  className="shrink-0 rounded-full p-1 text-ebene/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
                  title={t("audioRemove")}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Zone d'upload */}
            <div
              className={cn(
                "relative rounded-xl border-2 border-dashed border-or/20 transition-colors hover:border-terre/30",
                audioFileName && "border-terre/30 bg-terre/5",
              )}
            >
              <input
                ref={fileInputRef}
                id="audio"
                name="audio"
                type="file"
                accept="audio/mpeg,audio/mp3,audio/wav,audio/ogg,audio/webm,audio/aac,audio/mp4"
                onChange={handleFileChange}
                className="absolute inset-0 z-10 cursor-pointer opacity-0"
              />
              <div className="flex flex-col items-center justify-center px-4 py-5">
                <Upload
                  className={cn(
                    "h-5 w-5",
                    audioFileName ? "text-terre" : "text-ebene/30",
                  )}
                />
                <p className="mt-2 text-center text-sm text-ebene/50">
                  {audioFileName ??
                    (hasExistingAudio ? t("audioChange") : t("audioUpload"))}
                </p>
                <p className="mt-1 text-center text-xs text-ebene/30">
                  {t("audioHint")}
                </p>
              </div>
            </div>

            {/* Bouton supprimer si un nouveau fichier est sélectionné */}
            {audioFileName && (
              <button
                type="button"
                onClick={() => {
                  setAudioFileName(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-xs text-destructive transition-colors hover:text-destructive/70"
              >
                {t("audioRemove")}
              </button>
            )}
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full border border-or px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-terre px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90 disabled:opacity-50"
            >
              {isPending
                ? t("saving")
                : isEdit
                  ? t("saveEdit")
                  : t("saveCreate")}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
