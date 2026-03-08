"use client";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Composant de pagination réutilisable.
 * Affiche les boutons précédent/suivant et les numéros de page
 * avec ellipses pour les grandes plages.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <nav
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Pagination"
    >
      {/* Précédent */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          currentPage === 1
            ? "cursor-not-allowed text-ebene/20"
            : "text-ebene/60 hover:bg-or/10",
        )}
        aria-label="Page précédente"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Numéros de page */}
      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="inline-flex h-8 w-8 items-center justify-center text-xs text-ebene/30"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-medium transition-colors",
              page === currentPage
                ? "bg-terre text-white"
                : "text-ebene/60 hover:bg-or/10",
            )}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ),
      )}

      {/* Suivant */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          "inline-flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          currentPage === totalPages
            ? "cursor-not-allowed text-ebene/20"
            : "text-ebene/60 hover:bg-or/10",
        )}
        aria-label="Page suivante"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

/**
 * Génère les numéros de page à afficher avec des ellipses.
 * Ex: [1, 2, 3, "...", 8, 9, 10] pour page 2 sur 10
 */
function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Toujours afficher la première page
  pages.push(1);

  if (current <= 3) {
    // Début : 1 2 3 4 ... total
    pages.push(2, 3, 4, "...", total);
  } else if (current >= total - 2) {
    // Fin : 1 ... (total-3) (total-2) (total-1) total
    pages.push("...", total - 3, total - 2, total - 1, total);
  } else {
    // Milieu : 1 ... (current-1) current (current+1) ... total
    pages.push("...", current - 1, current, current + 1, "...", total);
  }

  return pages;
}
