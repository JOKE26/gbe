"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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
    <nav className="sticky top-0 z-50 border-b border-or/20 bg-sable/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-gbe.png"
            alt="Gbé"
            width={380}
            height={64}
            className="h-35 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <a
              key={labelKey}
              href={href}
              className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/60 transition-colors hover:text-terre"
            >
              {t(labelKey)}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-full border border-or px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-terre px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
          >
            {t("signup")}
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

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-or/10 bg-surface md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <a
                  key={labelKey}
                  href={href}
                  className="text-xs font-bold uppercase tracking-[0.2em] text-ebene/60 transition-colors hover:text-terre"
                  onClick={() => setMenuOpen(false)}
                >
                  {t(labelKey)}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-3">
                <Link
                  href="/login"
                  className="inline-block rounded-full border border-or px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("login")}
                </Link>
                <Link
                  href="/register"
                  className="inline-block rounded-full bg-terre px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90"
                  onClick={() => setMenuOpen(false)}
                >
                  {t("signup")}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
