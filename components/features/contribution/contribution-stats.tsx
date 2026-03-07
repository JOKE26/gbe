"use client";

import { useTranslations } from "next-intl";
import { useContributions } from "@/hooks/use-contributions";
import { cn } from "@/lib/utils";
import { Award, Star, Trophy, Crown } from "lucide-react";

interface Badge {
  key: string;
  icon: typeof Award;
  threshold: number;
  colorClass: string;
}

const BADGES: Badge[] = [
  {
    key: "firstContribution",
    icon: Star,
    threshold: 1,
    colorClass: "bg-terre/10 text-terre border-terre/20",
  },
  {
    key: "fiveApproved",
    icon: Award,
    threshold: 5,
    colorClass: "bg-or/10 text-or border-or/20",
  },
  {
    key: "tenApproved",
    icon: Trophy,
    threshold: 10,
    colorClass: "bg-indigo/10 text-indigo border-indigo/20",
  },
  {
    key: "twentyFiveApproved",
    icon: Crown,
    threshold: 25,
    colorClass: "bg-baobab/10 text-baobab border-baobab/20",
  },
];

export function ContributionStats() {
  const t = useTranslations("dashboard.contributions");
  const { data: contributions } = useContributions();

  const stats = {
    total: contributions?.length ?? 0,
    approved: contributions?.filter((c) => c.statut === "APPROVED").length ?? 0,
    pending: contributions?.filter((c) => c.statut === "PENDING").length ?? 0,
    rejected: contributions?.filter((c) => c.statut === "REJECTED").length ?? 0,
  };

  const earnedBadges = BADGES.filter(
    (badge) => stats.approved >= badge.threshold,
  );

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/60">
          {t("stats.title")}
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label={t("stats.total")}
            value={stats.total}
            colorClass="text-ebene"
          />
          <StatCard
            label={t("stats.approved")}
            value={stats.approved}
            colorClass="text-baobab"
          />
          <StatCard
            label={t("stats.pending")}
            value={stats.pending}
            colorClass="text-or"
          />
          <StatCard
            label={t("stats.rejected")}
            value={stats.rejected}
            colorClass="text-terre"
          />
        </div>
      </div>

      {/* Badges */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/60">
          {t("badges.title")}
        </h3>
        <div className="mt-3 flex flex-wrap gap-3">
          {BADGES.map((badge) => {
            const Icon = badge.icon;
            const earned = earnedBadges.includes(badge);
            return (
              <div
                key={badge.key}
                className={cn(
                  "flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 transition-all",
                  earned
                    ? badge.colorClass
                    : "border-or/10 bg-surface text-ebene/25",
                )}
              >
                <Icon className="h-4 w-4" />
                <div>
                  <p className="text-xs font-bold">
                    {t(`badges.${badge.key}`)}
                  </p>
                  <p
                    className={cn(
                      "text-[11px]",
                      earned ? "opacity-100" : "opacity-100",
                    )}
                  >
                    {t(`badges.${badge.key}Desc`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div className="rounded-2xl border border-or/10 bg-surface p-3.5 text-center">
      <p className={cn("font-serif text-2xl font-bold", colorClass)}>{value}</p>
      <p className="mt-0.5 text-xs text-ebene/50">{label}</p>
    </div>
  );
}
