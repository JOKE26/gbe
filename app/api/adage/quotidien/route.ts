import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getOrCreateDailyAdage } from "@/lib/adage-quotidien";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const quotidien = await getOrCreateDailyAdage(session.user.id);

  if (!quotidien) {
    return NextResponse.json({ adage: null });
  }

  return NextResponse.json({
    id: quotidien.id,
    lu: quotidien.lu,
    date: quotidien.date,
    adage: {
      id: quotidien.adage.id,
      texteOriginal: quotidien.adage.texteOriginal,
      traductionLitterale: quotidien.adage.traductionLitterale,
      explication: quotidien.adage.explication,
      contexteUsage: quotidien.adage.contexteUsage,
      source: quotidien.adage.source,
      audioUrl: quotidien.adage.audioUrl,
      langue: {
        id: quotidien.adage.langue.id,
        nom: quotidien.adage.langue.nom,
        code: quotidien.adage.langue.code,
      },
    },
  });
}
