/**
 * Prisma seed script — Données de référence Gbé
 *
 * Peuple la BDD avec les pays, ethnies et langues africaines de base,
 * ainsi que quelques adages initiaux pour le développement.
 *
 * Usage : pnpm db:seed
 */

import pg from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/* ── Pays ──────────────────────────────────────────────────────────────── */

const PAYS_DATA = [
  { nom: "Bénin", code: "BJ" },
  { nom: "Nigeria", code: "NG" },
  { nom: "Mali", code: "ML" },
  { nom: "Togo", code: "TG" },
  { nom: "Sénégal", code: "SN" },
  { nom: "Ghana", code: "GH" },
  { nom: "Niger", code: "NE" },
  { nom: "RD Congo", code: "CD" },
  { nom: "Cameroun", code: "CM" },
  { nom: "Côte d'Ivoire", code: "CI" },
  { nom: "Burkina Faso", code: "BF" },
  { nom: "Guinée", code: "GN" },
  { nom: "Éthiopie", code: "ET" },
  { nom: "Kenya", code: "KE" },
  { nom: "Tanzanie", code: "TZ" },
] as const;

/* ── Ethnies & Langues (par pays) ─────────────────────────────────────── */

interface EthnieLangue {
  ethnie: string;
  langue: string;
  codeLangue: string;
  famille: string;
}

const ETHNIES_LANGUES: Record<string, EthnieLangue[]> = {
  Bénin: [
    { ethnie: "Fon", langue: "Fon", codeLangue: "fon", famille: "Niger-Congo" },
    {
      ethnie: "Yoruba",
      langue: "Yoruba",
      codeLangue: "yor-bj",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Bariba",
      langue: "Bariba",
      codeLangue: "bba",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Goun",
      langue: "Goun",
      codeLangue: "guw",
      famille: "Niger-Congo",
    },
  ],
  Nigeria: [
    {
      ethnie: "Yoruba",
      langue: "Yoruba",
      codeLangue: "yor",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Igbo",
      langue: "Igbo",
      codeLangue: "ibo",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Hausa",
      langue: "Hausa",
      codeLangue: "hau",
      famille: "Afro-Asiatique",
    },
  ],
  Mali: [
    {
      ethnie: "Bambara",
      langue: "Bambara",
      codeLangue: "bam",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Peul",
      langue: "Fulfuldé",
      codeLangue: "ful-ml",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Soninké",
      langue: "Soninké",
      codeLangue: "snk",
      famille: "Niger-Congo",
    },
  ],
  Togo: [
    { ethnie: "Éwé", langue: "Éwé", codeLangue: "ewe", famille: "Niger-Congo" },
    {
      ethnie: "Kabyè",
      langue: "Kabyè",
      codeLangue: "kbp",
      famille: "Niger-Congo",
    },
  ],
  Sénégal: [
    {
      ethnie: "Wolof",
      langue: "Wolof",
      codeLangue: "wol",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Sérère",
      langue: "Sérère",
      codeLangue: "srr",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Diola",
      langue: "Diola",
      codeLangue: "dyo",
      famille: "Niger-Congo",
    },
  ],
  Ghana: [
    {
      ethnie: "Akan",
      langue: "Akan (Twi)",
      codeLangue: "aka",
      famille: "Niger-Congo",
    },
    { ethnie: "Ga", langue: "Ga", codeLangue: "gaa", famille: "Niger-Congo" },
  ],
  Niger: [
    {
      ethnie: "Hausa",
      langue: "Hausa",
      codeLangue: "hau-ne",
      famille: "Afro-Asiatique",
    },
    {
      ethnie: "Zarma",
      langue: "Zarma",
      codeLangue: "dje",
      famille: "Nilo-Saharien",
    },
  ],
  "RD Congo": [
    {
      ethnie: "Lingala",
      langue: "Lingala",
      codeLangue: "lin",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Kongo",
      langue: "Kikongo",
      codeLangue: "kon",
      famille: "Niger-Congo",
    },
  ],
  Cameroun: [
    {
      ethnie: "Bamiléké",
      langue: "Ghomala'",
      codeLangue: "bbj",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Bassa",
      langue: "Bassa",
      codeLangue: "bas",
      famille: "Niger-Congo",
    },
  ],
  "Côte d'Ivoire": [
    {
      ethnie: "Baoulé",
      langue: "Baoulé",
      codeLangue: "bci",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Bété",
      langue: "Bété",
      codeLangue: "bet",
      famille: "Niger-Congo",
    },
  ],
  "Burkina Faso": [
    {
      ethnie: "Mossi",
      langue: "Mooré",
      codeLangue: "mos",
      famille: "Niger-Congo",
    },
  ],
  Guinée: [
    {
      ethnie: "Peul",
      langue: "Fulfuldé",
      codeLangue: "ful-gn",
      famille: "Niger-Congo",
    },
    {
      ethnie: "Soussou",
      langue: "Soussou",
      codeLangue: "sus",
      famille: "Niger-Congo",
    },
  ],
};

/* ── Adages initiaux ──────────────────────────────────────────────────── */

interface AdageSeed {
  langueCode: string;
  texteOriginal: string;
  traductionLitterale: string;
  explication: string;
  contexteUsage: string;
  source: string;
}

const ADAGES_DATA: AdageSeed[] = [
  {
    langueCode: "fon",
    texteOriginal: "Gbédoto wɛ nyi agbaza",
    traductionLitterale:
      "Le destin est le corps — Ce que nous sommes est notre destinée.",
    explication:
      "Ce proverbe Fon enseigne que notre destin est inscrit en nous-mêmes. Il invite à accepter ce que l'on est tout en agissant avec sagesse.",
    contexteUsage:
      "Utilisé pour encourager quelqu'un à accepter sa nature profonde et à trouver sa voie.",
    source: "Tradition orale Fon — Bénin",
  },
  {
    langueCode: "yor",
    texteOriginal: "Ọ̀rúnmìlà ni baba àwọn Ifá",
    traductionLitterale:
      "Orunmila est le père de l'Ifá — La source de la divination et de la sagesse Yoruba.",
    explication:
      "Orunmila est la divinité de la sagesse dans la cosmogonie Yoruba. Ce proverbe rappelle l'importance de consulter la sagesse ancestrale.",
    contexteUsage:
      "Récité lors des cérémonies Ifá pour invoquer la guidance des ancêtres.",
    source: "Corpus Ifá — Tradition Yoruba",
  },
  {
    langueCode: "bam",
    texteOriginal: "Mɔgɔ tɛ ɲɛnajɛ sɔrɔ a yɛrɛ ma",
    traductionLitterale: "On ne trouve pas le bonheur pour soi-même seul.",
    explication:
      "La sagesse Bambara enseigne que le bonheur est collectif. Ce proverbe souligne l'interdépendance humaine et la valeur de la communauté.",
    contexteUsage:
      "Utilisé pour rappeler l'importance de la solidarité et de l'entraide dans la société Bambara.",
    source: "Tradition orale Bambara — Mali",
  },
  {
    langueCode: "ewe",
    texteOriginal: "Ðevi ma nya nuto ƒe ŋkume o",
    traductionLitterale: "L'enfant ne connaît pas le visage de la mort.",
    explication:
      "Ce proverbe Éwé exprime l'innocence de l'enfance et la protection que la communauté doit offrir aux plus jeunes face aux réalités dures de la vie.",
    contexteUsage:
      "Utilisé pour protéger les enfants des discussions ou situations inappropriées.",
    source: "Tradition orale Éwé — Togo",
  },
  {
    langueCode: "wol",
    texteOriginal: "Ku ñëw ci jàmm, dafay dem ci jàmm",
    traductionLitterale: "Qui vient en paix, repart en paix.",
    explication:
      "La teranga (hospitalité) est une valeur cardinale de la culture Wolof. Ce proverbe affirme que la paix et le respect sont réciproques.",
    contexteUsage:
      "Utilisé pour accueillir un visiteur ou rappeler les règles de l'hospitalité sénégalaise.",
    source: "Tradition orale Wolof — Sénégal",
  },
  {
    langueCode: "ibo",
    texteOriginal: "Onye aghana nwanne ya",
    traductionLitterale: "Que personne n'abandonne son frère.",
    explication:
      "Ce proverbe Igbo est au cœur de la philosophie communautaire. Il rappelle le devoir de solidarité familiale et clanique.",
    contexteUsage:
      "Utilisé dans les réunions familiales et communautaires pour renforcer l'unité.",
    source: "Tradition orale Igbo — Nigeria",
  },
];

/* ── Seed principal ───────────────────────────────────────────────────── */

async function main() {
  console.log("🌱 Début du seed Gbé...\n");

  // 1. Créer les pays
  console.log("📍 Création des pays...");
  const paysMap = new Map<string, string>();

  for (const p of PAYS_DATA) {
    const pays = await prisma.pays.upsert({
      where: { code: p.code },
      update: { nom: p.nom },
      create: { nom: p.nom, code: p.code, continent: "Afrique" },
    });
    paysMap.set(p.nom, pays.id);
  }
  console.log(`  ✓ ${paysMap.size} pays créés/mis à jour`);

  // 2. Créer les ethnies et langues
  console.log("🌍 Création des ethnies et langues...");
  const langueMap = new Map<string, string>();
  let ethniesCount = 0;
  let languesCount = 0;

  for (const [paysNom, entries] of Object.entries(ETHNIES_LANGUES)) {
    const paysId = paysMap.get(paysNom);
    if (!paysId) continue;

    for (const entry of entries) {
      // Upsert ethnie
      const ethnie = await prisma.ethnie.upsert({
        where: {
          nom_paysId: { nom: entry.ethnie, paysId },
        },
        update: {},
        create: { nom: entry.ethnie, paysId },
      });
      ethniesCount++;

      // Upsert langue
      const langue = await prisma.langue.upsert({
        where: { code: entry.codeLangue },
        update: {
          nom: entry.langue,
          famille: entry.famille,
          ethnieId: ethnie.id,
        },
        create: {
          nom: entry.langue,
          code: entry.codeLangue,
          famille: entry.famille,
          paysId,
          ethnieId: ethnie.id,
        },
      });
      langueMap.set(entry.codeLangue, langue.id);
      languesCount++;
    }
  }
  console.log(`  ✓ ${ethniesCount} ethnies créées/mises à jour`);
  console.log(`  ✓ ${languesCount} langues créées/mises à jour`);

  // 3. Créer les adages initiaux
  console.log("📖 Création des adages initiaux...");
  let adagesCount = 0;

  for (const adage of ADAGES_DATA) {
    const langueId = langueMap.get(adage.langueCode);
    if (!langueId) {
      console.warn(
        `  ⚠ Langue "${adage.langueCode}" non trouvée, adage ignoré`,
      );
      continue;
    }

    await prisma.adage.upsert({
      where: {
        id: `seed-${adage.langueCode}-${adagesCount}`,
      },
      update: {},
      create: {
        texteOriginal: adage.texteOriginal,
        traductionLitterale: adage.traductionLitterale,
        explication: adage.explication,
        contexteUsage: adage.contexteUsage,
        source: adage.source,
        langueId,
        statut: "APPROVED",
      },
    });
    adagesCount++;
  }
  console.log(`  ✓ ${adagesCount} adages créés`);

  console.log("\n✅ Seed terminé avec succès !");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: unknown) => {
    console.error("❌ Erreur pendant le seed :", e);
    await prisma.$disconnect();
    process.exit(1);
  });
