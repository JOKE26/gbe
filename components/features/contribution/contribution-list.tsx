"use client";

import { useTranslations } from "next-intl";
import { useContributions } from "@/hooks/use-contributions";
import { ContributionStatus } from "@/components/features/contribution/contribution-status";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function ContributionList() {
  const t = useTranslations("dashboard.contributions");
  const { data: contributions, isLoading } = useContributions();

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 animate-pulse rounded-2xl bg-surface border border-or/10"
          />
        ))}
      </div>
    );
  }

  if (!contributions || contributions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-or/20 bg-surface p-8 text-center">
        <BookOpen className="mx-auto h-10 w-10 text-ebene/20" />
        <p className="mt-3 text-sm font-medium text-ebene/60">
          {t("noSubmissions")}
        </p>
        <p className="mt-1 text-xs text-ebene/40">{t("noSubmissionsHint")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {contributions.map((contribution) => (
        <div
          key={contribution.id}
          className={cn(
            "rounded-2xl border border-or/10 bg-surface p-4 md:p-5",
            "hover:-translate-y-px hover:shadow-sm transition-all",
          )}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 min-w-0">
              <p className="font-serif text-sm text-ebene leading-relaxed line-clamp-2">
                « {contribution.texteOriginal} »
              </p>
              <p className="mt-1 text-xs text-ebene/50 line-clamp-1">
                {contribution.traductionLitterale}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="text-xs font-medium text-indigo">
                  {contribution.langue.nom}
                </span>
                <span className="text-xs text-ebene/40">
                  {t("submittedOn")}{" "}
                  {new Date(contribution.createdAt).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>
            <ContributionStatus status={contribution.statut} />
          </div>
        </div>
      ))}
    </div>
  );
}
