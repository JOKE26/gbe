"use client";

import { useTranslations } from "next-intl";
import { Flame, Menu } from "lucide-react";

interface HeaderProps {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
  onMenuToggle?: () => void;
  streak?: number;
}

function getSeasonLabel(): string {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return "Printemps";
  if (month >= 5 && month <= 7) return "Été";
  if (month >= 8 && month <= 10) return "Automne";
  return "Hiver";
}

export function Header({ user, onMenuToggle, streak = 0 }: HeaderProps) {
  const t = useTranslations("dashboard.header");

  const today = new Date();
  const dateStr = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const season = getSeasonLabel();
  const firstName = user.name?.split(" ")[0] ?? user.email.split("@")[0];

  return (
    <header className="flex items-center justify-between px-6 py-8 md:px-10">
      {/* Left: greeting */}
      <div>
        <div className="flex items-center gap-3">
          <button type="button" className="lg:hidden" onClick={onMenuToggle}>
            <Menu className="h-6 w-6 text-ebene" />
          </button>
          <h1 className="font-serif text-2xl font-bold text-ebene md:text-3xl">
            {t("greeting", { name: firstName })}
          </h1>
        </div>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-terre">
          {dateStr} · {season}
        </p>
      </div>

      {/* Right: streak + search */}
      <div className="flex items-center gap-4">
        {streak > 0 && (
          <div className="hidden items-center gap-2 rounded-full border border-or/20 bg-surface px-4 py-2 md:flex">
            <Flame className="h-4 w-4 text-terre" />
            <span className="text-xs font-bold uppercase tracking-widest text-ebene">
              {t("streak", { count: streak })}
            </span>
          </div>
        )}
      </div>
    </header>
  );
}
