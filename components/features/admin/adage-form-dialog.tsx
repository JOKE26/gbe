"use client";

import { useState, useTransition } from "react";
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
  const isEdit = Boolean(adage);

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      if (isEdit && adage) {
        await updateAdage(adage.id, formData);
      } else {
        await createAdage(formData);
      }
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
