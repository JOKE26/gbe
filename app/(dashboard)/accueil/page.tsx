import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getOrCreateDailyAdage } from "@/lib/adage-quotidien";
import { AdageCard } from "@/components/features/adage/adage-card";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default async function AccueilPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const t = await getTranslations("dashboard.accueil");

  const quotidien = await getOrCreateDailyAdage(session.user.id);

  return (
    <div>
      {quotidien ? (
        <div className="mx-auto max-w-3xl">
          <AdageCard
            quotidienId={quotidien.id}
            texteOriginal={quotidien.adage.texteOriginal}
            traductionLitterale={quotidien.adage.traductionLitterale}
            explication={quotidien.adage.explication}
            contexteUsage={quotidien.adage.contexteUsage}
            source={quotidien.adage.source}
            audioUrl={quotidien.adage.audioUrl}
            langueNom={quotidien.adage.langue.nom}
            langueCode={quotidien.adage.langue.code}
            lu={quotidien.lu}
            favori={quotidien.favori}
          />
        </div>
      ) : (
        <div className="mx-auto max-w-md">
          <div className="rounded-[2rem] border border-or/10 bg-surface p-10 text-center">
            <BookOpen className="mx-auto h-10 w-10 text-or/40" />
            <p className="mt-4 font-serif text-lg italic text-ebene/50">
              {t("noAdage")}
            </p>
            <p className="mt-2 text-sm text-ebene/40">
              {t("setupOriginsHint")}
            </p>
            <Link
              href="/profil"
              className="mt-6 inline-block rounded-full border border-or/20 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
            >
              {t("goToProfile")}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
