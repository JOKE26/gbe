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
      <div className="flex justify-center gap-3">
        {TABS.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] transition-all ${
              active === tab
                ? "bg-terre text-white"
                : "border border-or/30 text-white/70 hover:border-or hover:text-white"
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-8 flex min-h-[120px] items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className={`text-center text-lg leading-relaxed ${
              active === "origin"
                ? "font-serif text-xl italic text-white"
                : "text-white/80"
            }`}
          >
            {t(`content.${active}`)}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
