"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Mail, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { updateDailyEmailPreference } from "@/app/(dashboard)/parametres/actions";

interface SettingsContentProps {
  dailyEmailEnabled: boolean;
}

export function SettingsContent({ dailyEmailEnabled }: SettingsContentProps) {
  const t = useTranslations("dashboard.parametres");
  const [emailEnabled, setEmailEnabled] = useState(dailyEmailEnabled);
  const [isPending, startTransition] = useTransition();

  function handleToggleEmail() {
    const newValue = !emailEnabled;
    setEmailEnabled(newValue);
    startTransition(async () => {
      try {
        await updateDailyEmailPreference(newValue);
        toast.success(t("saved"));
      } catch {
        setEmailEnabled(!newValue);
        toast.error(t("saveError"));
      }
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8 md:px-0">
      {/* Header */}
      <div>
        <h1 className="font-serif text-2xl font-bold text-ebene md:text-3xl">
          {t("title")}
        </h1>
        <p className="mt-1 text-sm text-ebene/50">{t("subtitle")}</p>
        <div className="mt-4 h-px w-12 bg-or" />
      </div>

      {/* Notifications */}
      <section className="space-y-4">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ebene">
            <Mail className="h-5 w-5 text-terre" />
            {t("notifications")}
          </h2>
          <p className="mt-0.5 text-sm text-ebene/50">
            {t("notificationsDescription")}
          </p>
        </div>

        <div
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl border border-or/10 bg-surface p-4",
          )}
        >
          <div className="flex-1">
            <p className="text-sm font-semibold text-ebene">
              {t("dailyEmail")}
            </p>
            <p className="mt-0.5 text-xs text-ebene/50">
              {t("dailyEmailDescription")}
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={emailEnabled}
            disabled={isPending}
            onClick={handleToggleEmail}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
              "disabled:cursor-not-allowed disabled:opacity-50",
              emailEnabled ? "bg-terre" : "bg-ebene/20",
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
                emailEnabled ? "translate-x-6" : "translate-x-1",
              )}
            />
          </button>
        </div>
      </section>

      <div className="h-px bg-or/10" />

      {/* Langue de l'interface */}
      <section className="space-y-4">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-ebene">
            <Globe className="h-5 w-5 text-terre" />
            {t("language")}
          </h2>
          <p className="mt-0.5 text-sm text-ebene/50">
            {t("languageDescription")}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* Français — actif */}
          <div
            className={cn(
              "flex items-center gap-3 rounded-2xl border border-terre/30 bg-terre/5 p-4",
            )}
          >
            <span className="text-lg">🇫🇷</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-terre">
                {t("languageFr")}
              </p>
            </div>
            <span className="h-2 w-2 rounded-full bg-terre" />
          </div>

          {/* English — bientôt */}
          <div
            className={cn(
              "flex items-center gap-3 rounded-2xl border border-or/10 bg-surface p-4 opacity-60",
            )}
          >
            <span className="text-lg">🇬🇧</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ebene">
                {t("languageEn")}
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-ebene/40">
              {t("languageComingSoon")}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
