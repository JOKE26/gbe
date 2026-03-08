"use client";

import { useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/shared/pagination";
import { AdageCompactCard } from "@/components/features/adage/adage-compact-card";

interface QuotidienItem {
  id: string;
  quotidienId: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  contexteUsage: string | null;
  source: string | null;
  audioUrl: string | null;
  langueNom: string;
  langueCode: string;
  favori: boolean;
  date: string;
}

interface FilterableAdageListProps {
  items: QuotidienItem[];
}

const ITEMS_PER_PAGE = 10;

/**
 * Liste filtrable d'adages compacts pour l'historique et les favoris.
 * Recherche textuelle + filtre par langue.
 */
export function FilterableAdageList({ items }: FilterableAdageListProps) {
  const t = useTranslations("common");
  const [search, setSearch] = useState("");
  const [langueFilter, setLangueFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const uniqueLangues = useMemo(() => {
    const langues = new Set<string>();
    for (const item of items) {
      langues.add(item.langueNom);
    }
    return Array.from(langues).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = search.toLowerCase().trim();
    return items.filter((item) => {
      if (query) {
        const matchesText =
          item.texteOriginal.toLowerCase().includes(query) ||
          item.traductionLitterale.toLowerCase().includes(query);
        if (!matchesText) return false;
      }
      if (langueFilter !== "all" && item.langueNom !== langueFilter) {
        return false;
      }
      return true;
    });
  }, [items, search, langueFilter]);

  const hasActiveFilters = search.length > 0 || langueFilter !== "all";

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(
    () =>
      filteredItems.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredItems, currentPage],
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

  // Pas de barre de filtres si moins de 4 éléments
  if (items.length < 4) {
    return (
      <div className="space-y-4">
        {items.map((item) => (
          <AdageCompactCard
            key={item.id}
            quotidienId={item.quotidienId}
            texteOriginal={item.texteOriginal}
            traductionLitterale={item.traductionLitterale}
            explication={item.explication}
            contexteUsage={item.contexteUsage}
            source={item.source}
            audioUrl={item.audioUrl}
            langueNom={item.langueNom}
            langueCode={item.langueCode}
            favori={item.favori}
            date={item.date}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barre de filtres */}
      <div className="flex flex-col gap-3 rounded-2xl border border-or/10 bg-surface p-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ebene/30" />
          <Input
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={t("search")}
            className="rounded-xl border-or/20 pl-9 text-sm"
          />
        </div>

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

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-or/20 px-3 py-2 text-xs font-medium text-ebene/60 transition-colors hover:bg-or/5"
          >
            <X className="h-3.5 w-3.5" />
            {t("clearFilters")}
          </button>
        )}
      </div>

      {/* Résultats */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-or/20 bg-surface p-8 text-center">
          <Search className="mx-auto h-8 w-8 text-ebene/20" />
          <p className="mt-3 text-sm text-ebene/50">{t("noResults")}</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-2 text-xs font-medium text-terre transition-colors hover:text-terre/70"
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {hasActiveFilters && (
            <p className="px-1 text-xs text-ebene/50">
              {filteredItems.length} / {items.length}
            </p>
          )}
          {paginatedItems.map((item) => (
            <AdageCompactCard
              key={item.id}
              quotidienId={item.quotidienId}
              texteOriginal={item.texteOriginal}
              traductionLitterale={item.traductionLitterale}
              explication={item.explication}
              contexteUsage={item.contexteUsage}
              source={item.source}
              audioUrl={item.audioUrl}
              langueNom={item.langueNom}
              langueCode={item.langueCode}
              favori={item.favori}
              date={item.date}
            />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      )}
    </div>
  );
}
