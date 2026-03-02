import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-or/10 bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Grid principal */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* Colonne 1 — Marque */}
          <div>
            <span className="font-serif text-2xl font-bold text-ebene">
              Gbé
            </span>
            <p className="mt-3 font-serif text-sm italic text-ebene/50">
              {t("tagline")}
            </p>
            <div className="mt-4 h-px w-12 bg-or" />
          </div>

          {/* Colonne 2 — Application */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
              {t("sections.app.title")}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/accueil"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.app.daily")}
                </Link>
              </li>
              <li>
                <Link
                  href="/profil"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.app.profile")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contributions"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.app.contribute")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 — Communauté */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
              {t("sections.community.title")}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.community.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.community.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.community.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 — Légal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
              {t("sections.legal.title")}
            </h4>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.legal.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.legal.terms")}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.legal.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre basse */}
        <div className="mt-12 border-t border-or/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
            <p className="text-xs text-ebene/40">
              © {new Date().getFullYear()} Gbé — {t("rights")}
            </p>
            <p className="text-xs text-ebene/40">{t("bottom.tagline")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
