import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-or/10 bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Grid principal */}
        <div className="grid gap-12 md:grid-cols-3">
          {/* Colonne 1 — Marque */}
          <div className="md:col-span-1">
            <span className="font-serif text-2xl font-bold text-ebene">
              Gbé
            </span>
            <p className="mt-4 font-serif text-sm italic leading-relaxed text-ebene/50">
              {t("tagline")}
            </p>
            <div className="mt-6 h-px w-12 bg-or" />
          </div>

          {/* Colonne 2 — Application */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-terre">
              {t("sections.app.title")}
            </h4>
            <ul className="mt-4 space-y-3">
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
                  href="/contributions"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.app.library")}
                </Link>
              </li>
              <li>
                <Link
                  href="#languages"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.app.languages")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 — Contact */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-terre">
              {t("sections.contact.title")}
            </h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="mailto:degboejoachim@gmail.com"
                  className="text-sm text-ebene/60 transition-colors hover:text-terre"
                >
                  {t("sections.contact.email")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre basse */}
        <div className="mt-16">
          <div className="h-px w-full bg-or/10" />
          <div className="flex flex-col items-center justify-between gap-4 pt-8 md:flex-row">
            <p className="text-xs text-ebene/40">
              © {new Date().getFullYear()} {t("rights")}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-ebene/30">
              {t("bottom.tagline")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
