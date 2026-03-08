import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Globe,
  Sun,
  BookOpen,
  ChevronRight,
  MessageSquareQuote,
  Languages,
} from "lucide-react";

import { Footer } from "@/components/shared/footer";
import { LandingNav } from "@/components/features/landing/landing-nav";
import { HeroAnimations } from "@/components/features/landing/hero-animations";
import { MockupCardAnimation } from "@/components/features/landing/mockup-card-animation";
import { InteractiveProverb } from "@/components/features/landing/interactive-proverb";

/* ── Données statiques ──────────────────────────────────────────────── */

const LANGUAGES = [
  { name: "Fon", region: "Bénin · Togo", flag: "🇧🇯", color: "bg-terre/10" },
  {
    name: "Wolof",
    region: "Sénégal · Gambie",
    flag: "🇸🇳",
    color: "bg-baobab/10",
  },
  {
    name: "Yoruba",
    region: "Nigeria · Bénin",
    flag: "🇳🇬",
    color: "bg-indigo/10",
  },
  { name: "Bambara", region: "Mali", flag: "🇲🇱", color: "bg-or/10" },
  {
    name: "Lingala",
    region: "RDC · Congo",
    flag: "🇨🇩",
    color: "bg-indigo/10",
  },
  {
    name: "Swahili",
    region: "Afrique de l'Est",
    flag: "🇰🇪",
    color: "bg-baobab/10",
  },
  { name: "Peul", region: "Sahel", flag: "🇬🇳", color: "bg-terre/10" },
  { name: "Twi", region: "Ghana", flag: "🇬🇭", color: "bg-or/10" },
] as const;

/* ── Page ────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const t = useTranslations("landing");

  return (
    <div className="min-h-screen bg-sable font-sans selection:bg-or/30 selection:text-terre">
      {/* 1) Navigation */}
      <LandingNav />

      <main>
        {/* 2) Hero */}
        <section className="relative overflow-hidden px-6 pb-32 pt-20">
          <div className="relative z-10 mx-auto max-w-5xl text-center">
            <HeroAnimations>
              <p className="mb-8 text-xs font-bold uppercase tracking-[0.4em] text-terre">
                {t("hero.label")}
              </p>
              <h1 className="mb-8 font-serif text-4xl font-bold leading-[1.1] text-ebene sm:text-5xl md:text-7xl">
                {t("hero.title")}
                <br />
                <span className="italic text-or">{t("hero.titleAccent")}</span>
              </h1>
              <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-ebene/60 md:text-xl">
                {t("hero.subtitle")}
              </p>
            </HeroAnimations>

            {/* Mockup Card Proverbe */}
            <MockupCardAnimation>
              <div className="relative mx-auto max-w-2xl">
                <div className="overflow-hidden rounded-[2rem] border border-or/10 bg-surface text-left shadow-xl">
                  <div className="h-1.5 bg-linear-to-r from-terre via-or to-terre" />
                  <div className="p-8 md:p-12">
                    <div className="mb-10 flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-terre/60">
                          {t("mockup.ritualLabel")}
                        </span>
                        <div className="mt-1 text-xs font-bold uppercase tracking-[0.2em]">
                          {t("mockup.date")}
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sable text-or">
                        <Sun className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="mb-6 font-serif text-2xl font-bold italic leading-tight sm:text-3xl md:text-4xl">
                      {t("mockup.proverb")}
                    </h3>

                    <div className="mb-6 h-px w-12 bg-or" />

                    <p className="mb-8 font-serif text-base italic text-ebene/50">
                      {t("mockup.translation")}
                    </p>

                    <div className="flex items-center justify-between border-t border-sable pt-8">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-terre text-[10px] font-bold text-white">
                          {t("mockup.langBadge")}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ebene/40">
                          {t("mockup.origin")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative blurs */}
                <div className="absolute -right-10 -top-10 -z-10 h-64 w-64 rounded-full bg-or/10 blur-3xl" />
                <div className="absolute -bottom-10 -left-10 -z-10 h-64 w-64 rounded-full bg-terre/10 blur-3xl" />
              </div>
            </MockupCardAnimation>
          </div>
        </section>

        {/* 3) Comment ça marche */}
        <section id="how" className="bg-surface px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-terre">
                {t("howItWorks.label")}
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                {t("howItWorks.title")}
              </h2>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              {(
                [
                  { icon: Globe, step: "step1" },
                  { icon: Sun, step: "step2" },
                  { icon: BookOpen, step: "step3" },
                ] as const
              ).map(({ icon: Icon, step }) => (
                <div
                  key={step}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-or/20 bg-sable text-terre">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-ebene">
                    {t(`howItWorks.${step}.title`)}
                  </h4>
                  <p className="text-sm leading-relaxed text-ebene/60">
                    {t(`howItWorks.${step}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4) Grille des langues */}
        <section id="languages" className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-lg">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-terre">
                  {t("languages.label")}
                </p>
                <h2 className="font-serif text-3xl font-bold md:text-4xl">
                  {t("languages.title")}
                </h2>
              </div>
              <Link
                href="/register"
                className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-or"
              >
                {t("languages.viewAll")}{" "}
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {LANGUAGES.map(({ name, region, flag, color }) => (
                <div
                  key={name}
                  className="group cursor-pointer rounded-2xl border border-or/10 bg-surface p-8 transition-shadow hover:shadow-md"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-2xl">{flag}</span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${color} text-ebene transition-transform group-hover:scale-110`}
                    >
                      <Languages className="h-3.5 w-3.5" />
                    </div>
                  </div>
                  <h5 className="mb-1 font-serif text-xl font-bold">{name}</h5>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-ebene/40">
                    {region}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5) Section interactive — Proverbe (fond sombre) */}
        <section id="proverbs" className="bg-ebene px-6 py-24 text-sable">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-or">
                {t("interactive.label")}
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                {t("interactive.title")}
              </h2>
            </div>

            <InteractiveProverb />
          </div>
        </section>

        {/* 6) Mot du fondateur */}
        <section id="testimonials" className="bg-surface px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <div className="mb-16 text-center">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-terre">
                {t("testimonials.label")}
              </p>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">
                {t("testimonials.title")}
              </h2>
            </div>

            <div className="mx-auto max-w-2xl text-center">
              <MessageSquareQuote className="mx-auto mb-8 h-10 w-10 text-or" />
              <p className="mb-10 font-serif text-xl italic leading-relaxed text-ebene/80 md:text-2xl">
                &laquo; {t("testimonials.founderQuote")} &raquo;
              </p>
              <div className="mx-auto mb-8 h-px w-12 bg-or/30" />
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-terre/10 text-sm font-bold text-terre">
                  JD
                </div>
                <div className="text-xs font-bold uppercase tracking-widest">
                  {t("testimonials.founderName")}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-ebene/40">
                  {t("testimonials.founderRole")}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7) CTA Final */}
        <section className="px-6 py-24">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] border-2 border-or/20 bg-sable p-12 text-center md:p-24">
            <div className="absolute left-0 top-0 h-1 w-full bg-linear-to-r from-terre via-or to-terre" />
            <div className="relative z-10">
              <h2 className="mb-8 font-serif text-3xl font-bold sm:text-4xl md:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mb-12 max-w-xl text-lg text-ebene/60">
                {t("cta.subtitle")}
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/register"
                  className="w-full rounded-full bg-ebene px-10 py-5 text-xs font-bold uppercase tracking-[0.3em] text-white transition-all hover:bg-black sm:w-auto"
                >
                  {t("cta.button")}
                </Link>
              </div>
            </div>

            {/* Decorative circle */}
            <div className="absolute bottom-0 right-0 h-64 w-64 translate-x-1/2 translate-y-1/2 rounded-full bg-terre/5" />
          </div>
        </section>
      </main>

      {/* 8) Footer */}
      <Footer />
    </div>
  );
}
