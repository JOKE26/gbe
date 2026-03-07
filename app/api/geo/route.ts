import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const paysId = searchParams.get("paysId");
  const ethnieId = searchParams.get("ethnieId");

  switch (type) {
    case "pays": {
      const pays = await prisma.pays.findMany({
        orderBy: { nom: "asc" },
        select: { id: true, nom: true, code: true },
      });
      return NextResponse.json(pays);
    }

    case "ethnies": {
      if (!paysId) {
        return NextResponse.json({ error: "paysId requis" }, { status: 400 });
      }
      const ethnies = await prisma.ethnie.findMany({
        where: { paysId },
        orderBy: { nom: "asc" },
        select: { id: true, nom: true },
      });
      return NextResponse.json(ethnies);
    }

    case "langues": {
      const where: Record<string, string> = {};
      if (paysId) where.paysId = paysId;
      if (ethnieId) where.ethnieId = ethnieId;

      const langues = await prisma.langue.findMany({
        where,
        distinct: ["nom"],
        orderBy: { nom: "asc" },
        select: { id: true, nom: true, code: true },
      });
      return NextResponse.json(langues);
    }

    default:
      return NextResponse.json(
        { error: "Type invalide. Utilisez: pays, ethnies, langues" },
        { status: 400 },
      );
  }
}
