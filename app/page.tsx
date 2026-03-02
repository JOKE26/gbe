import Link from "next/link";
import { useTranslations } from "next-intl";
import { User, Send, BookOpen, Globe, Quote } from "lucide-react";

import { Footer } from "@/components/shared/footer";
import { LandingNav } from "@/components/features/landing/landing-nav";
import { HeroAnimations } from "@/components/features/landing/hero-animations";
import { InteractiveProverb } from "@/components/features/landing/interactive-proverb";

/* ── Données statiques ──────────────────────────────────────────────── */

const LANGUAGES = [
  { name: "Fon", country: "Bénin", flag: "🇧🇯" },
  { name: "Yoruba", country: "Nigeria", flag: "🇳🇬" },
  { name: "Bambara", country: "Mali", flag: "🇲🇱" },
  { name: "Éwé", country: "Togo", flag: "🇹🇬" },
  { name: "Wolof", country: "Sénégal", flag: "🇸🇳" },
  { name: "Igbo", country: "Nigeria", flag: "🇳🇬" },
  { name: "Hausa", country: "Niger", flag: "🇳🇪" },
  { name: "Lingala", country: "RDC", flag: "🇨🇩" },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "Recevoir un proverbe Fon chaque matin me reconnecte à mes racines béninoises, même à 6 000 km.",
    name: "Akossiwa D.",
    origin: "Bénin · Paris",
  },
  {
    quote:
      "Mes enfants découvrent la sagesse Yoruba grâce à Gbé. Un pont entre les générations.",
    name: "Oluwaseun A.",
    origin: "Nigeria · Londres",
  },
  {
    quote:
      "L'explication culturelle est incroyable. Je comprends enfin les proverbes de ma grand-mère.",
    name: "Aminata K.",
    origin: "Mali · Montréal",
  },
] as const;

const HOW_IT_WORKS_ICONS = [User, Send, BookOpen] as const;

/* ── Page ────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  const t = useTranslations("landing");

  return (
    <div className="min-h-screen bg-sable selection:bg-or/30 selection:text-terre">
      {/* ================================================================
          1. Navigation
          ================================================================ */}
      <LandingNav />

      {/* ================================================================
          2. Hero
          ================================================================ */}
      <section className="px-4 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <HeroAnimations>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
              {t("hero.label")}
            </p>
            <h1 className="mt-4 font-serif text-3xl font-bold leading-tight text-ebene md:text-5xl lg:text-6xl">
              {t("hero.title")}{" "}
              <span className="text-terre">{t("hero.titleAccent")}</span>
            </h1>
            <div className="mx-auto mt-4 h-px w-12 bg-or" />
            <p className="mt-6 text-lg text-ebene/60">{t("hero.subtitle")}</p>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/register"
                className="inline-block rounded-full bg-terre px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90 hover:shadow-md"
              >
                {t("hero.cta")}
              </Link>
              <a
                href="#languages"
                className="inline-block rounded-full border border-or px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
              >
                {t("hero.ctaSecondary")}
              </a>
            </div>
          </HeroAnimations>

          {/* Carte mockup adage */}
          <div className="mx-auto mt-12 max-w-md rounded-2xl border border-or/10 bg-surface p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:p-8">
            <div className="h-0.5 w-full rounded-full bg-linear-to-r from-terre via-or to-terre" />
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-terre">
              {t("mockup.label")}
            </p>
            <div className="mt-3 h-px w-8 bg-or" />
            <p className="mt-4 font-serif text-xl italic text-ebene">
              {t("mockup.proverb")}
            </p>
            <p className="mt-2 text-sm text-ebene/60">
              {t("mockup.translation")}
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================
          3. Comment ça marche
          ================================================================ */}
      <section id="how" className="bg-surface px-4 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-terre">
            {t("howItWorks.label")}
          </p>
          <h2 className="mt-3 text-center font-serif text-2xl font-bold text-ebene md:text-3xl">
            {t("howItWorks.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-or" />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {(["step1", "step2", "step3"] as const).map((step, i) => {
              const Icon = HOW_IT_WORKS_ICONS[i];
              return (
                <div
                  key={step}
                  className="rounded-2xl border border-or/10 bg-sable p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-terre/10 text-terre">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-ebene">
                    {t(`howItWorks.${step}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-ebene/60">
                    {t(`howItWorks.${step}.description`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          4. Langues
          ================================================================ */}
      <section id="languages" className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
            {t("languages.label")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-ebene md:text-3xl">
            {t("languages.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-or" />
          <p className="mt-4 text-ebene/60">{t("languages.subtitle")}</p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {LANGUAGES.map(({ name, country, flag }) => (
              <div
                key={name}
                className="group flex items-center gap-3 rounded-2xl border border-or/10 bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-terre/20 hover:shadow-md"
              >
                <span className="text-2xl">{flag}</span>
                <div className="text-left">
                  <p className="text-sm font-bold text-ebene group-hover:text-terre">
                    {name}
                  </p>
                  <p className="text-xs text-ebene/50">{country}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/register"
              className="text-sm font-medium text-terre underline underline-offset-4 transition-colors hover:text-terre/80"
            >
              {t("languages.viewAll")} →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================
          5. Section interactive — Proverbe (fond sombre)
          ================================================================ */}
      <section id="proverbs" className="bg-ebene px-4 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-or">
            {t("interactive.label")}
          </p>
          <h2 className="mt-3 font-serif text-2xl font-bold text-white md:text-3xl">
            {t("interactive.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-or" />

          <div className="mt-10">
            <InteractiveProverb />
          </div>
        </div>
      </section>

      {/* ================================================================
          6. Témoignages
          ================================================================ */}
      <section id="testimonials" className="bg-surface px-4 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-terre">
            {t("testimonials.label")}
          </p>
          <h2 className="mt-3 text-center font-serif text-2xl font-bold text-ebene md:text-3xl">
            {t("testimonials.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-or" />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map(({ quote, name, origin }) => (
              <div
                key={name}
                className="rounded-2xl border border-or/10 bg-sable p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Quote className="h-5 w-5 text-or/50" />
                <p className="mt-3 font-serif text-sm italic leading-relaxed text-ebene/80">
                  {quote}
                </p>
                <div className="mt-4 h-px w-8 bg-or/30" />
                <p className="mt-3 text-sm font-bold text-ebene">{name}</p>
                <p className="text-xs text-ebene/50">{origin}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          7. CTA Final
          ================================================================ */}
      <section className="px-4 py-20 md:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border border-or/10 bg-surface p-8 text-center md:p-12">
          <Globe className="mx-auto h-8 w-8 text-terre" />
          <h2 className="mt-4 font-serif text-2xl font-bold text-ebene md:text-3xl">
            {t("cta.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-12 bg-or" />
          <p className="mt-4 text-ebene/60">{t("cta.subtitle")}</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-block rounded-full bg-terre px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90 hover:shadow-md"
            >
              {t("cta.button")}
            </Link>
            <a
              href="#how"
              className="inline-block rounded-full border border-or px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
            >
              {t("cta.secondary")}
            </a>
          </div>
        </div>
      </section>

      {/* ================================================================
          8. Footer
          ================================================================ */}
      <Footer />
    </div>
  );
}
