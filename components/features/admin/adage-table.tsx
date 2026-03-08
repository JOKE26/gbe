"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Volume2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/shared/pagination";
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

const ALL_STATUTS: AdageStatut[] = ["APPROVED", "PENDING", "REJECTED"];
const ITEMS_PER_PAGE = 20;

/**
 * Tableau d'affichage de tous les adages pour l'administration.
 * Comprend une barre de recherche, des filtres par langue et statut,
 * et un compteur de résultats.
 */
export function AdageTable({ adages, langues }: AdageTableProps) {
  const t = useTranslations("admin.adages");
  const [search, setSearch] = useState("");
  const [langueFilter, setLangueFilter] = useState("all");
  const [statutFilter, setStatutFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAdages = useMemo(() => {
    const query = search.toLowerCase().trim();
    return adages.filter((adage) => {
      // Filtre recherche textuelle
      if (query) {
        const matchesText =
          adage.texteOriginal.toLowerCase().includes(query) ||
          adage.traductionLitterale.toLowerCase().includes(query) ||
          adage.explication.toLowerCase().includes(query) ||
          (adage.contributeur?.name?.toLowerCase().includes(query) ?? false) ||
          (adage.contributeur?.email?.toLowerCase().includes(query) ?? false);
        if (!matchesText) return false;
      }
      // Filtre par langue
      if (langueFilter !== "all" && adage.langueId !== langueFilter) {
        return false;
      }
      // Filtre par statut
      if (statutFilter !== "all" && adage.statut !== statutFilter) {
        return false;
      }
      return true;
    });
  }, [adages, search, langueFilter, statutFilter]);

  const totalPages = Math.ceil(filteredAdages.length / ITEMS_PER_PAGE);
  const paginatedAdages = useMemo(
    () =>
      filteredAdages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredAdages, currentPage],
  );

  const hasActiveFilters =
    search.length > 0 || langueFilter !== "all" || statutFilter !== "all";

  // Reset page quand les filtres changent
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleLangueChange = useCallback((value: string) => {
    setLangueFilter(value);
    setCurrentPage(1);
  }, []);

  const handleStatutChange = useCallback((value: string) => {
    setStatutFilter(value);
    setCurrentPage(1);
  }, []);

  function clearFilters() {
    setSearch("");
    setLangueFilter("all");
    setStatutFilter("all");
    setCurrentPage(1);
  }

  if (adages.length === 0) {
    return (
      <div className="rounded-2xl border border-or/10 bg-surface p-8 text-center">
        <p className="text-sm text-ebene/50">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barre de filtres */}
      <div className="flex flex-col gap-3 rounded-2xl border border-or/10 bg-surface p-4 md:flex-row md:items-center">
        {/* Recherche */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ebene/30" />
          <Input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="rounded-xl border-or/20 pl-9 text-sm"
          />
        </div>

        {/* Filtre langue */}
        <Select value={langueFilter} onValueChange={handleLangueChange}>
          <SelectTrigger className="w-full rounded-xl border-or/20 md:w-45">
            <SelectValue placeholder={t("filterLangue")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filterAllLangues")}</SelectItem>
            {langues.map((langue) => (
              <SelectItem key={langue.id} value={langue.id}>
                {langue.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filtre statut */}
        <Select value={statutFilter} onValueChange={handleStatutChange}>
          <SelectTrigger className="w-full rounded-xl border-or/20 md:w-40">
            <SelectValue placeholder={t("filterStatut")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filterAllStatuts")}</SelectItem>
            {ALL_STATUTS.map((statut) => (
              <SelectItem key={statut} value={statut}>
                {t(`statut.${statut.toLowerCase()}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Réinitialiser */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-or/20 px-3 py-2 text-xs font-medium text-ebene/60 transition-colors hover:bg-or/5"
          >
            <X className="h-3.5 w-3.5" />
            {t("filterClear")}
          </button>
        )}
      </div>

      {/* Compteur de résultats */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-ebene/50">
          {t("resultsCount", {
            filtered: filteredAdages.length,
            total: adages.length,
          })}
        </p>
      </div>

      {/* Tableau */}
      {filteredAdages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-or/20 bg-surface p-8 text-center">
          <Search className="mx-auto h-8 w-8 text-ebene/20" />
          <p className="mt-3 text-sm text-ebene/50">{t("noFilterResults")}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-2 text-xs font-medium text-terre transition-colors hover:text-terre/70"
          >
            {t("filterClear")}
          </button>
        </div>
      ) : (
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
              {paginatedAdages.map((adage) => (
                <AdageRow key={adage.id} adage={adage} langues={langues} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
          <p className="text-xs text-ebene/40">
            {t("paginationInfo", {
              start: (currentPage - 1) * ITEMS_PER_PAGE + 1,
              end: Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredAdages.length,
              ),
              total: filteredAdages.length,
            })}
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
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
        <div className="flex items-center gap-2">
          <p className="truncate font-serif italic text-ebene">
            {adage.texteOriginal}
          </p>
          {adage.audioUrl && (
            <Volume2
              className="h-3.5 w-3.5 shrink-0 text-terre/60"
              aria-label="Audio"
            />
          )}
        </div>
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
