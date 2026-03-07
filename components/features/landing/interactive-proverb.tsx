"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

const TABS = ["origin", "translation", "context"] as const;
type Tab = (typeof TABS)[number];

export function InteractiveProverb() {
  const [active, setActive] = useState<Tab>("origin");
  const t = useTranslations("landing.interactive");

  return (
    <div>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
              active === tab
                ? "bg-or text-ebene"
                : "border border-sable/20 text-sable/50 hover:border-sable/40 hover:text-sable/80"
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* Content panels */}
      <div className="mt-12 flex min-h-[260px] items-center justify-center">
        <AnimatePresence mode="wait">
          {active === "origin" && (
            <motion.div
              key="origin"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="w-full text-center"
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-or">
                {t("content.originLabel")}
              </p>
              <p className="font-serif text-3xl font-bold italic leading-tight text-white md:text-5xl">
                {t("content.origin")}
              </p>
            </motion.div>
          )}

          {active === "translation" && (
            <motion.div
              key="translation"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="w-full text-center"
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-or">
                {t("content.translationLabel")}
              </p>
              <p className="font-serif text-2xl italic leading-relaxed text-white/80 md:text-3xl">
                {t("content.translation")}
              </p>
            </motion.div>
          )}

          {active === "context" && (
            <motion.div
              key="context"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="mx-auto w-full max-w-2xl text-center"
            >
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-or">
                {t("content.contextLabel")}
              </p>
              <p className="text-base leading-relaxed text-sable/70 md:text-lg">
                {t("content.context")}
              </p>
              <div className="mx-auto mt-8 h-px w-12 bg-or/30" />
              <div className="mt-6 flex items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-sable/40">
                <span>{t("content.contextSource")}</span>
                <span>·</span>
                <span>{t("content.contextRegion")}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
