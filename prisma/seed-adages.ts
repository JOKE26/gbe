/**
 * Script de seed massif — Adages/Proverbes africains
 *
 * Insère ~175 proverbes authentiques dans la BDD Gbé.
 * Idempotent : vérifie par `texteOriginal` avant insertion (pas de doublons).
 *
 * Usage : pnpm db:seed-adages
 *
 * Prérequis : les langues doivent déjà exister en BDD (via `pnpm db:seed`).
 */

import "dotenv/config";
import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { ALL_ADAGES_SEED, SEED_STATS } from "./data/adages-seed-data";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 3,
  idleTimeoutMillis: 20000,
  connectionTimeoutMillis: 10000,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/* ── Helpers ──────────────────────────────────────────────────────────── */

function printStats(): void {
  console.log("\n📊 Données à insérer :");
  console.log(`   Fon        : ${SEED_STATS.fon} proverbes`);
  console.log(`   Yoruba     : ${SEED_STATS.yoruba} proverbes`);
  console.log(`   Bambara    : ${SEED_STATS.bambara} proverbes`);
  console.log(`   Wolof      : ${SEED_STATS.wolof} proverbes`);
  console.log(`   Éwé        : ${SEED_STATS.ewe} proverbes`);
  console.log(`   Igbo       : ${SEED_STATS.igbo} proverbes`);
  console.log(`   Hausa      : ${SEED_STATS.hausa} proverbes`);
  console.log(`   Lingala    : ${SEED_STATS.lingala} proverbes`);
  console.log(`   Akan/Twi   : ${SEED_STATS.akan} proverbes`);
  console.log(`   Mooré      : ${SEED_STATS.moore} proverbes`);
  console.log(`   Goun       : ${SEED_STATS.goun} proverbes`);
  console.log(`   ─────────────────────────`);
  console.log(`   TOTAL      : ${SEED_STATS.total} proverbes\n`);
}

/* ── Seed principal ───────────────────────────────────────────────────── */

async function main(): Promise<void> {
  console.log("🌍 Seed massif — Proverbes africains pour Gbé");
  console.log("═══════════════════════════════════════════════\n");

  printStats();

  // 1. Charger toutes les langues existantes en BDD
  console.log("📚 Chargement des langues depuis la BDD...");
  const langues = await prisma.langue.findMany({
    select: { id: true, code: true, nom: true },
  });
  const langueMap = new Map<string, { id: string; nom: string }>();
  for (const l of langues) {
    langueMap.set(l.code, { id: l.id, nom: l.nom });
  }
  console.log(`   ✓ ${langues.length} langues trouvées en BDD\n`);

  // 2. Vérifier que les langues des proverbes existent
  const langueCodesNeeded = new Set(ALL_ADAGES_SEED.map((a) => a.langueCode));
  const missingLangues: string[] = [];
  for (const code of langueCodesNeeded) {
    if (!langueMap.has(code)) {
      missingLangues.push(code);
    }
  }
  if (missingLangues.length > 0) {
    console.warn(
      `⚠️  Langues manquantes en BDD : ${missingLangues.join(", ")}`,
    );
    console.warn("   Les proverbes pour ces langues seront ignorés.");
    console.warn(
      "   Exécutez d'abord `pnpm db:seed` pour créer les langues.\n",
    );
  }

  // 3. Insérer les proverbes (avec vérification de doublons)
  console.log("📖 Insertion des proverbes...\n");

  let inserted = 0;
  let skipped = 0;
  let skippedNoLangue = 0;
  const resultsByLangue: Record<string, { inserted: number; skipped: number }> =
    {};

  for (const adage of ALL_ADAGES_SEED) {
    const langueInfo = langueMap.get(adage.langueCode);

    // Langue non trouvée en BDD
    if (!langueInfo) {
      skippedNoLangue++;
      continue;
    }

    // Initialiser les compteurs par langue
    if (!resultsByLangue[adage.langueCode]) {
      resultsByLangue[adage.langueCode] = { inserted: 0, skipped: 0 };
    }

    // Vérifier si le proverbe existe déjà (par texteOriginal exact)
    const existing = await prisma.adage.findFirst({
      where: {
        texteOriginal: adage.texteOriginal,
        langueId: langueInfo.id,
      },
      select: { id: true },
    });

    if (existing) {
      skipped++;
      resultsByLangue[adage.langueCode].skipped++;
      continue;
    }

    // Insérer le nouveau proverbe
    await prisma.adage.create({
      data: {
        texteOriginal: adage.texteOriginal,
        traductionLitterale: adage.traductionLitterale,
        explication: adage.explication,
        contexteUsage: adage.contexteUsage,
        source: adage.source,
        langueId: langueInfo.id,
        statut: "APPROVED",
      },
    });

    inserted++;
    resultsByLangue[adage.langueCode].inserted++;
  }

  // 4. Résultat
  console.log("═══════════════════════════════════════════════");
  console.log("📊 Résultat du seed :\n");

  for (const [code, stats] of Object.entries(resultsByLangue)) {
    const langueNom = langueMap.get(code)?.nom ?? code;
    const label = `${langueNom} (${code})`.padEnd(25);
    console.log(
      `   ${label} : +${stats.inserted} nouveaux, ${stats.skipped} déjà existants`,
    );
  }

  console.log(`\n   ─────────────────────────────`);
  console.log(`   ✅ Nouveaux proverbes insérés : ${inserted}`);
  console.log(`   ⏩ Proverbes déjà existants   : ${skipped}`);
  if (skippedNoLangue > 0) {
    console.log(`   ⚠️  Ignorés (langue absente)  : ${skippedNoLangue}`);
  }

  // 5. Stats finales depuis la BDD
  const totalAdages = await prisma.adage.count({
    where: { statut: "APPROVED" },
  });
  const adagesParLangue = await prisma.adage.groupBy({
    by: ["langueId"],
    where: { statut: "APPROVED" },
    _count: { id: true },
  });

  console.log(`\n   📖 Total adages APPROVED en BDD : ${totalAdages}`);
  console.log(`   🌍 Langues couvertes            : ${adagesParLangue.length}`);

  // Détail par langue
  console.log("\n   Détail par langue :");
  for (const group of adagesParLangue) {
    const langueInfo = langues.find((l) => l.id === group.langueId);
    const nom = langueInfo
      ? `${langueInfo.nom} (${langueInfo.code})`
      : group.langueId;
    const jours = group._count.id;
    console.log(
      `     ${nom.padEnd(25)} : ${jours} adages (${jours} jours de contenu)`,
    );
  }

  console.log("\n✅ Seed massif terminé avec succès !\n");
}

/* ── Exécution ────────────────────────────────────────────────────────── */

main()
  .then(async () => {
    await pool.end();
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error("❌ Erreur pendant le seed massif :", e);
    await pool.end();
    await prisma.$disconnect();
    process.exit(1);
  });
