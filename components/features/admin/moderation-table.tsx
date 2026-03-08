"use client";

import { useState, useMemo, useCallback } from "react";
import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { moderateContribution } from "@/app/(dashboard)/admin/moderation/actions";
import { CheckCircle2, XCircle, Eye, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/shared/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Adage {
  id: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  contexteUsage: string | null;
  source: string | null;
  createdAt: Date;
  langue: { nom: string };
  contributeur: { name: string | null; email: string } | null;
}

interface ModerationTableProps {
  adages: Adage[];
}

const ITEMS_PER_PAGE = 10;

export function ModerationTable({ adages }: ModerationTableProps) {
  const t = useTranslations("admin.moderation");
  const [search, setSearch] = useState("");
  const [langueFilter, setLangueFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Extraire les langues uniques de la liste des adages
  const uniqueLangues = useMemo(() => {
    const languesMap = new Map<string, string>();
    for (const adage of adages) {
      languesMap.set(adage.langue.nom, adage.langue.nom);
    }
    return Array.from(languesMap.values()).sort();
  }, [adages]);

  const filteredAdages = useMemo(() => {
    const query = search.toLowerCase().trim();
    return adages.filter((adage) => {
      // Filtre recherche textuelle
      if (query) {
        const matchesText =
          adage.texteOriginal.toLowerCase().includes(query) ||
          adage.traductionLitterale.toLowerCase().includes(query) ||
          (adage.contributeur?.name?.toLowerCase().includes(query) ?? false) ||
          (adage.contributeur?.email?.toLowerCase().includes(query) ?? false);
        if (!matchesText) return false;
      }
      // Filtre par langue
      if (langueFilter !== "all" && adage.langue.nom !== langueFilter) {
        return false;
      }
      return true;
    });
  }, [adages, search, langueFilter]);

  const hasActiveFilters = search.length > 0 || langueFilter !== "all";

  const totalPages = Math.ceil(filteredAdages.length / ITEMS_PER_PAGE);
  const paginatedAdages = useMemo(
    () =>
      filteredAdages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredAdages, currentPage],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleLangueChange = useCallback((value: string) => {
    setLangueFilter(value);
    setCurrentPage(1);
  }, []);

  function clearFilters() {
    setSearch("");
    setLangueFilter("all");
    setCurrentPage(1);
  }

  if (adages.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-or/20 bg-surface p-12 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-baobab/30" />
        <p className="mt-3 text-sm font-medium text-ebene/60">{t("empty")}</p>
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
        {uniqueLangues.length > 1 && (
          <Select value={langueFilter} onValueChange={handleLangueChange}>
            <SelectTrigger className="w-full rounded-xl border-or/20 md:w-45">
              <SelectValue placeholder={t("filterLangue")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filterAllLangues")}</SelectItem>
              {uniqueLangues.map((langue) => (
                <SelectItem key={langue} value={langue}>
                  {langue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

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

      {/* Compteur */}
      {hasActiveFilters && (
        <p className="px-1 text-xs text-ebene/50">
          {t("resultsCount", {
            filtered: filteredAdages.length,
            total: adages.length,
          })}
        </p>
      )}

      {/* Liste des cartes */}
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
        <div className="space-y-3">
          {paginatedAdages.map((adage) => (
            <ModerationCard key={adage.id} adage={adage} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

function ModerationCard({ adage }: { adage: Adage }) {
  const t = useTranslations("admin.moderation");
  const [isPending, startTransition] = useTransition();

  function handleModerate(statut: "APPROVED" | "REJECTED") {
    startTransition(async () => {
      try {
        await moderateContribution(adage.id, statut);
        toast.success(statut === "APPROVED" ? t("approved") : t("rejected"));
      } catch {
        toast.error("Erreur lors de la modération");
      }
    });
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-or/10 bg-surface p-4 md:p-5",
        "transition-all",
        isPending && "opacity-50 pointer-events-none",
      )}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        {/* Contenu */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-indigo">
              {adage.langue.nom}
            </span>
            <span className="text-xs text-ebene/30">·</span>
            <span className="text-xs text-ebene/40">
              {new Date(adage.createdAt).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <p className="mt-2 font-serif text-sm text-ebene leading-relaxed line-clamp-2">
            « {adage.texteOriginal} »
          </p>
          <p className="mt-1 text-xs text-ebene/50 line-clamp-1">
            {adage.traductionLitterale}
          </p>
          {adage.contributeur && (
            <p className="mt-2 text-xs text-ebene/40">
              {t("columnContributeur")} :{" "}
              <span className="font-medium text-ebene/60">
                {adage.contributeur.name ?? adage.contributeur.email}
              </span>
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ModerationDetailDialog adage={adage} />

          <button
            onClick={() => handleModerate("APPROVED")}
            disabled={isPending}
            className={cn(
              "inline-flex items-center gap-1.5",
              "rounded-full bg-baobab text-white",
              "text-xs uppercase tracking-[0.15em] font-bold",
              "px-4 py-2",
              "hover:bg-baobab/90 transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            {t("approve")}
          </button>

          <button
            onClick={() => handleModerate("REJECTED")}
            disabled={isPending}
            className={cn(
              "inline-flex items-center gap-1.5",
              "rounded-full border border-terre/30 text-terre",
              "text-xs uppercase tracking-[0.15em] font-bold",
              "px-4 py-2",
              "hover:bg-terre/5 transition-all",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            <XCircle className="h-3.5 w-3.5" />
            {t("reject")}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModerationDetailDialog({ adage }: { adage: Adage }) {
  const t = useTranslations("admin.moderation");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={cn(
            "inline-flex items-center gap-1.5",
            "rounded-full border border-or/20 text-ebene/60",
            "text-xs uppercase tracking-[0.15em] font-bold",
            "px-4 py-2",
            "hover:bg-or/5 transition-all",
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          {t("viewDetails")}
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-lg text-ebene">
            {t("detailsTitle")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 pt-2">
          {/* Langue */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
              {t("columnLangue")}
            </p>
            <p className="mt-1 text-sm font-medium text-indigo">
              {adage.langue.nom}
            </p>
          </div>

          {/* Texte original */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
              Texte original
            </p>
            <p className="mt-1 font-serif text-base italic text-ebene leading-relaxed">
              « {adage.texteOriginal} »
            </p>
          </div>

          {/* Traduction */}
          <div className="rounded-xl bg-indigo/5 p-4 border-l-2 border-indigo">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
              Traduction littérale
            </p>
            <p className="mt-1 text-sm text-indigo leading-relaxed">
              {adage.traductionLitterale}
            </p>
          </div>

          {/* Explication */}
          <div className="rounded-xl bg-terre/5 p-4 border-l-2 border-terre">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
              Explication culturelle
            </p>
            <p className="mt-1 text-sm text-ebene/80 leading-relaxed">
              {adage.explication}
            </p>
          </div>

          {/* Contexte */}
          {adage.contexteUsage && (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
                Contexte d&apos;usage
              </p>
              <p className="mt-1 text-sm text-ebene/60 italic leading-relaxed">
                {adage.contexteUsage}
              </p>
            </div>
          )}

          {/* Source */}
          {adage.source && (
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
                Source
              </p>
              <p className="mt-1 text-sm text-ebene/60">{adage.source}</p>
            </div>
          )}

          {/* Contributeur */}
          {adage.contributeur && (
            <div className="border-t border-or/10 pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
                {t("columnContributeur")}
              </p>
              <p className="mt-1 text-sm text-ebene/70">
                {adage.contributeur.name ?? adage.contributeur.email}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
