"use client";

import { useTranslations } from "next-intl";
import { Calendar, BookOpen, Languages, Heart, Sparkles } from "lucide-react";

interface RightPanelProps {
  stats?: {
    totalProverbs: number;
    activeLanguages: number;
    totalFavoris: number;
    currentStreak: number;
  };
}

function MiniCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = firstDay === 0 ? 6 : firstDay - 1; // Monday start

  const monthLabel = now.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const days: (number | null)[] = [];
  for (let i = 0; i < offset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  return (
    <div>
      <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-ebene/60">
        {monthLabel}
      </p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span
            key={`day-${i}`}
            className="text-[10px] font-bold uppercase text-ebene/30"
          >
            {d}
          </span>
        ))}
        {days.map((day, i) => (
          <div
            key={`cell-${i}`}
            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs ${
              day === today
                ? "bg-terre font-bold text-white"
                : day && day < today
                  ? "bg-or/10 text-ebene/60"
                  : day
                    ? "text-ebene/40"
                    : ""
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RightPanel({ stats }: RightPanelProps) {
  const t = useTranslations("dashboard.rightPanel");

  return (
    <aside className="fixed right-0 top-0 hidden h-screen w-80 flex-col border-l border-or/10 bg-surface p-6 xl:flex">
      {/* Calendar */}
      <div className="rounded-2xl border border-or/10 bg-sable/50 p-5">
        <div className="mb-4 flex items-center gap-2">
          <Calendar className="h-4 w-4 text-terre" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
            {t("calendar")}
          </span>
        </div>
        <MiniCalendar />
      </div>

      {/* Quick stats */}
      <div className="mt-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/50">
          {t("quickStats")}
        </h3>
        <div className="flex items-center justify-between rounded-xl bg-sable/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-indigo" />
            <span className="text-xs text-ebene/60">{t("totalProverbs")}</span>
          </div>
          <span className="font-serif text-lg font-bold text-ebene">
            {stats?.totalProverbs ?? 0}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-sable/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-terre" />
            <span className="text-xs text-ebene/60">
              {t("activeLanguages")}
            </span>
          </div>
          <span className="font-serif text-lg font-bold text-ebene">
            {stats?.activeLanguages ?? 0}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-sable/50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-terre" />
            <span className="text-xs text-ebene/60">{t("totalFavoris")}</span>
          </div>
          <span className="font-serif text-lg font-bold text-ebene">
            {stats?.totalFavoris ?? 0}
          </span>
        </div>
      </div>

      {/* Heritage CTA */}
      <div className="mt-auto rounded-2xl bg-ebene p-6">
        <Sparkles className="h-5 w-5 text-or" />
        <h4 className="mt-3 font-serif text-lg font-bold text-white">
          {t("heritageTitle")}
        </h4>
        <p className="mt-2 text-xs leading-relaxed text-white/60">
          {t("heritageDescription")}
        </p>
      </div>
    </aside>
  );
}
