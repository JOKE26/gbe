"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { AdageFormDialog } from "@/components/features/admin/adage-form-dialog";
import {
  deleteAdage,
  updateAdageStatut,
} from "@/app/(dashboard)/admin/adages/actions";
import type { Adage, Langue, Pays, User } from "@/lib/generated/prisma/client";
import type { AdageStatut } from "@/lib/generated/prisma/client";

/** Type composé retourné par la page admin */
interface AdageWithRelations extends Adage {
  langue: Langue;
  contributeur: Pick<User, "name" | "email"> | null;
}

interface LangueWithPays extends Langue {
  pays: Pays;
}

interface AdageTableProps {
  adages: AdageWithRelations[];
  langues: LangueWithPays[];
}

const STATUT_STYLES: Record<AdageStatut, string> = {
  APPROVED: "bg-[#2E7D32]/10 text-[#2E7D32]",
  PENDING: "bg-[#D4A017]/10 text-[#D4A017]",
  REJECTED: "bg-[#B5451B]/10 text-[#B5451B]",
};

/**
 * Tableau d'affichage de tous les adages pour l'administration.
 * Chaque ligne montre le texte tronqué, la langue, le statut,
 * et des actions (éditer, approuver/rejeter, supprimer).
 */
export function AdageTable({ adages, langues }: AdageTableProps) {
  const t = useTranslations("admin.adages");

  if (adages.length === 0) {
    return (
      <div className="rounded-2xl border border-or/10 bg-surface p-8 text-center">
        <p className="text-sm text-ebene/50">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-or/10 bg-surface">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-or/10">
            <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
              {t("columnOriginal")}
            </th>
            <th className="hidden px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ebene/50 md:table-cell">
              {t("columnLangue")}
            </th>
            <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
              {t("columnStatut")}
            </th>
            <th className="hidden px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ebene/50 lg:table-cell">
              {t("columnContributeur")}
            </th>
            <th className="px-4 py-3 font-sans text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
              {t("columnActions")}
            </th>
          </tr>
        </thead>
        <tbody>
          {adages.map((adage) => (
            <AdageRow key={adage.id} adage={adage} langues={langues} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AdageRow({
  adage,
  langues,
}: {
  adage: AdageWithRelations;
  langues: LangueWithPays[];
}) {
  const t = useTranslations("admin.adages");
  const [isPending, startTransition] = useTransition();

  function handleStatutChange(statut: AdageStatut) {
    startTransition(() => {
      updateAdageStatut(adage.id, statut);
    });
  }

  function handleDelete() {
    startTransition(() => {
      deleteAdage(adage.id);
    });
  }

  return (
    <tr
      className={cn(
        "border-b border-or/5 transition-colors hover:bg-sable/50",
        isPending && "opacity-50",
      )}
    >
      {/* Texte original — tronqué à ~60 caractères */}
      <td className="max-w-xs px-4 py-3">
        <p className="truncate font-serif italic text-ebene">
          {adage.texteOriginal}
        </p>
      </td>

      {/* Langue — masquée sur mobile */}
      <td className="hidden px-4 py-3 md:table-cell">
        <span className="rounded-full bg-indigo/10 px-2 py-1 text-xs font-medium text-indigo">
          {adage.langue.nom}
        </span>
      </td>

      {/* Badge de statut */}
      <td className="px-4 py-3">
        <span
          className={cn(
            "rounded-full px-2 py-1 text-xs font-bold uppercase tracking-[0.1em]",
            STATUT_STYLES[adage.statut],
          )}
        >
          {t(`statut.${adage.statut.toLowerCase()}`)}
        </span>
      </td>

      {/* Contributeur — masqué sur petit écran */}
      <td className="hidden px-4 py-3 text-xs text-ebene/50 lg:table-cell">
        {adage.contributeur?.name ?? adage.contributeur?.email ?? "—"}
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Bouton Approuver — affiché seulement si pas encore APPROVED */}
          {adage.statut !== "APPROVED" && (
            <button
              type="button"
              onClick={() => handleStatutChange("APPROVED")}
              disabled={isPending}
              className="rounded-full bg-[#2E7D32]/10 px-2 py-1 text-xs font-medium text-[#2E7D32] transition-colors hover:bg-[#2E7D32]/20"
            >
              {t("approve")}
            </button>
          )}

          {/* Bouton Rejeter — affiché seulement si pas encore REJECTED */}
          {adage.statut !== "REJECTED" && adage.statut !== "APPROVED" && (
            <button
              type="button"
              onClick={() => handleStatutChange("REJECTED")}
              disabled={isPending}
              className="rounded-full bg-[#B5451B]/10 px-2 py-1 text-xs font-medium text-[#B5451B] transition-colors hover:bg-[#B5451B]/20"
            >
              {t("reject")}
            </button>
          )}

          {/* Bouton Éditer — ouvre le dialog pré-rempli */}
          <AdageFormDialog langues={langues} adage={adage} />

          {/* Bouton Supprimer */}
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-full bg-[#B5451B]/10 px-2 py-1 text-xs font-medium text-[#B5451B] transition-colors hover:bg-[#B5451B]/20"
          >
            {t("deleteButton")}
          </button>
        </div>
      </td>
    </tr>
  );
}
