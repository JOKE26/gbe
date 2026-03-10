"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { completeOnboarding } from "@/app/(dashboard)/actions";
import {
  Sparkles,
  User,
  Globe,
  Mail,
  ChevronRight,
  ChevronLeft,
  Check,
} from "lucide-react";

const TOTAL_STEPS = 3;

export function OnboardingDialog() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(0);
  const [isPending, startTransition] = useTransition();

  function handleNext() {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    }
  }

  function handlePrev() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function handleComplete() {
    startTransition(async () => {
      await completeOnboarding();
      setOpen(false);
      router.refresh();
    });
  }

  function handleGoToProfile() {
    startTransition(async () => {
      await completeOnboarding();
      setOpen(false);
      router.push("/profil");
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        className="max-w-md border-or/20 bg-surface sm:max-w-lg"
      >
        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step
                  ? "w-8 bg-terre"
                  : i < step
                    ? "w-4 bg-terre/40"
                    : "w-4 bg-or/20"
              }`}
            />
          ))}
        </div>

        {/* Step 0: Welcome */}
        {step === 0 && (
          <>
            <DialogHeader className="items-center pt-4">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-terre/10">
                <Sparkles className="h-7 w-7 text-terre" />
              </div>
              <DialogTitle className="font-serif text-2xl text-ebene">
                {t("welcome.title")}
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-ebene/60">
                {t("welcome.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <StepPreview
                icon={<User className="h-4 w-4 text-terre" />}
                title={t("welcome.step1")}
                description={t("welcome.step1Desc")}
              />
              <StepPreview
                icon={<Globe className="h-4 w-4 text-indigo" />}
                title={t("welcome.step2")}
                description={t("welcome.step2Desc")}
              />
              <StepPreview
                icon={<Mail className="h-4 w-4 text-or" />}
                title={t("welcome.step3")}
                description={t("welcome.step3Desc")}
              />
            </div>
          </>
        )}

        {/* Step 1: Profile */}
        {step === 1 && (
          <>
            <DialogHeader className="items-center pt-4">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-terre/10">
                <User className="h-7 w-7 text-terre" />
              </div>
              <DialogTitle className="font-serif text-2xl text-ebene">
                {t("profile.title")}
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-ebene/60">
                {t("profile.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="rounded-2xl border border-or/10 bg-sable/50 p-4">
                <p className="text-sm text-ebene/80">{t("profile.nameHint")}</p>
              </div>
              <div className="rounded-2xl border border-or/10 bg-sable/50 p-4">
                <p className="text-sm text-ebene/80">
                  {t("profile.langueHint")}
                </p>
              </div>
              <div className="rounded-2xl border border-or/10 bg-sable/50 p-4">
                <p className="text-sm text-ebene/80">
                  {t("profile.originesHint")}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Step 2: Email preferences */}
        {step === 2 && (
          <>
            <DialogHeader className="items-center pt-4">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-terre/10">
                <Mail className="h-7 w-7 text-terre" />
              </div>
              <DialogTitle className="font-serif text-2xl text-ebene">
                {t("email.title")}
              </DialogTitle>
              <DialogDescription className="text-center text-sm text-ebene/60">
                {t("email.description")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="rounded-2xl border border-or/10 bg-sable/50 p-4">
                <p className="text-sm text-ebene/80">{t("email.info")}</p>
              </div>
              <div className="rounded-2xl border border-baobab/20 bg-baobab/5 p-4">
                <p className="text-sm text-ebene/80">{t("email.tip")}</p>
              </div>
            </div>
          </>
        )}

        {/* Footer with navigation */}
        <DialogFooter className="flex-row items-center justify-between gap-2 pt-2 sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="flex items-center gap-1.5 rounded-full border border-or/20 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-sable"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              {t("prev")}
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 rounded-full bg-terre px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
            >
              {t("next")}
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleGoToProfile}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-full bg-terre px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90 disabled:opacity-50"
              >
                <User className="h-3.5 w-3.5" />
                {t("goToProfile")}
              </button>
              <button
                type="button"
                onClick={handleComplete}
                disabled={isPending}
                className="flex items-center gap-1.5 rounded-full border border-or/20 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-sable disabled:opacity-50"
              >
                <Check className="h-3.5 w-3.5" />
                {t("skip")}
              </button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StepPreview({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-or/10 bg-sable/50 p-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-ebene">{title}</p>
        <p className="text-xs text-ebene/60">{description}</p>
      </div>
    </div>
  );
}
