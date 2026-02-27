"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#how", labelKey: "how" },
  { href: "#languages", labelKey: "languages" },
  { href: "#proverbs", labelKey: "proverbs" },
  { href: "#testimonials", labelKey: "testimonials" },
] as const;

export function LandingNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("landing.nav");

  return (
    <nav className="sticky top-0 z-50 bg-sable/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="font-serif text-2xl font-bold text-ebene">
          Gbé
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <a
              key={labelKey}
              href={href}
              className="text-sm text-ebene/70 transition-colors hover:text-terre"
            >
              {t(labelKey)}
            </a>
          ))}
          <Link
            href="/login"
            className="rounded-full bg-terre px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
          >
            {t("cta")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden"
          aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            <X className="h-6 w-6 text-ebene" />
          ) : (
            <Menu className="h-6 w-6 text-ebene" />
          )}
        </button>
      </div>

      {/* Gradient line */}
      <div className="h-[1px] bg-gradient-to-r from-terre via-or to-terre" />

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-or/10 bg-surface md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <a
                  key={labelKey}
                  href={href}
                  className="text-sm text-ebene/70 transition-colors hover:text-terre"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(labelKey)}
                </a>
              ))}
              <Link
                href="/login"
                className="mt-2 inline-block rounded-full bg-terre px-5 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
                onClick={() => setMenuOpen(false)}
              >
                {t("cta")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
