import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { FilterableAdageList } from "@/components/features/adage/filterable-adage-list";
import { PageHeader } from "@/components/shared/page-header";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default async function HistoriquePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const t = await getTranslations("dashboard.historique");

  const quotidiens = await prisma.adageQuotidien.findMany({
    where: { userId: session.user.id, lu: true },
    orderBy: { date: "desc" },
    include: {
      adage: {
        include: { langue: true },
      },
    },
  });

  const items = quotidiens.map((q) => ({
    id: q.id,
    quotidienId: q.id,
    texteOriginal: q.adage.texteOriginal,
    traductionLitterale: q.adage.traductionLitterale,
    explication: q.adage.explication,
    contexteUsage: q.adage.contexteUsage,
    source: q.adage.source,
    audioUrl: q.adage.audioUrl,
    langueNom: q.adage.langue.nom,
    langueCode: q.adage.langue.code,
    favori: q.favori,
    date: new Date(q.date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));

  return (
    <div>
      <PageHeader title={t("title")} description={t("subtitle")} />

      {items.length > 0 ? (
        <div className="mx-auto max-w-3xl">
          <FilterableAdageList items={items} />
        </div>
      ) : (
        <div className="mx-auto max-w-md">
          <div className="rounded-[2rem] border border-or/10 bg-surface p-10 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-or/40" />
            <p className="mt-4 font-serif text-lg italic text-ebene/50">
              {t("empty")}
            </p>
            <p className="mt-2 text-sm text-ebene/40">{t("emptyHint")}</p>
            <Link
              href="/accueil"
              className="mt-6 inline-block rounded-full border border-or/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
            >
              {t("goToAccueil")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
