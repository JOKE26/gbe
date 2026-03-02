# CLAUDE.md — Gbé

> Ce fichier est la source de vérité architecturale du projet Gbé.
> Il est lu automatiquement par Claude Code à chaque session.
> Dernière mise à jour : 24 février 2026.

---

## 1. Vision & Contexte

**Nom** : Gbé (signifie "langue" et "vie" en Fon, langue du Bénin)

**Mission** : Reconnecter les personnes de la diaspora africaine et les Africains du continent à leur patrimoine linguistique et culturel, à travers la réception quotidienne d'un adage/proverbe dans leur(s) langue(s) d'origine.

**Produit** : Une web app SaaS où chaque utilisateur renseigne ses origines africaines (pays, ethnie, langue) et reçoit chaque jour un adage dans sa langue d'origine, avec :

- Le texte original (dans la langue africaine)
- La traduction littérale en français
- L'explication culturelle et le contexte d'usage
- À terme, une prononciation audio

**Phase actuelle : MVP — Fondations du SaaS dashboard**
On ne code PAS encore les features métier. On structure, on initialise, on pose les règles.
Chaque feature sera développée dans une branche dédiée depuis `develop`.

---

## 2. Stack Technique

| Technologie        | Version / Détail                            | Justification                                                                                                                  |
| ------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Next.js**        | Dernière version, **App Router uniquement** | SSR/RSC natif, streaming, Server Actions, déploiement Vercel optimisé                                                          |
| **TypeScript**     | Mode `strict: true`                         | Sécurité du typage sur un modèle de données multilingue complexe. Zéro `any` toléré                                            |
| **Tailwind CSS**   | v4+                                         | Utility-first, mobile-first natif, purge automatique                                                                           |
| **shadcn/ui**      | Dernière version                            | Composants accessibles (Radix), personnalisables, copiés dans le projet (pas de dépendance runtime)                            |
| **NextAuth.js v5** | Auth.js + `@auth/prisma-adapter`            | Providers Google + Email Magic Link. Sessions stockées en BDD PostgreSQL via Prisma Adapter (révocation possible, audit trail) |
| **PostgreSQL**     | Via **Supabase**                            | UTF-8 natif (critique pour diacritiques/tons africains), extensions JSON, Row Level Security disponible                        |
| **Prisma**         | Dernière version                            | ORM type-safe, migrations versionnées, types auto-générés, seed scripts                                                        |
| **Zustand**        | Dernière version                            | State management client léger (état UI : sidebar, thème, modals)                                                               |
| **TanStack Query** | v5+                                         | Cache et synchronisation du server state côté client. Remplace tout `useEffect` de data fetching                               |
| **Resend**         | + React Email                               | Emails transactionnels avec templates JSX, preview en dev                                                                      |
| **next-intl**      | Dernière version                            | Préparation i18n dès le MVP. Interface en français, architecture prête pour l'anglais                                          |
| **Zod**            | Dernière version                            | Validation des variables d'environnement, des inputs formulaires, des payloads API                                             |
| **pnpm**           | Dernière version                            | Gestionnaire de paquets. Efficacité disque, lockfile strict, workspaces natifs                                                 |
| **Vercel**         | Déploiement                                 | Preview auto sur chaque PR, Vercel Cron pour l'envoi quotidien d'adages                                                        |
| **GitHub**         | Versionning                                 | Convention de branches et commits stricte                                                                                      |

### Ce qui n'est PAS dans la stack

- ❌ **Pages Router** (`/pages/`) — interdit, App Router uniquement
- ❌ **axios** — `fetch` natif ou TanStack Query
- ❌ **Redux / MobX** — Zustand uniquement
- ❌ **CSS-in-JS** (styled-components, emotion) — Tailwind uniquement
- ❌ **tRPC** — pas au MVP, Server Actions + Route Handlers suffisent
- ❌ **Mongoose / TypeORM** — Prisma uniquement

---

## 3. Structure du Projet

```
gbé/
├── app/                              # Routes et layouts (App Router)
│   ├── (auth)/                       # Groupe de routes authentification
│   │   ├── login/
│   │   │   └── page.tsx              # Page de connexion
│   │   ├── register/
│   │   │   └── page.tsx              # Page d'inscription
│   │   ├── verify/
│   │   │   └── page.tsx              # Vérification magic link
│   │   └── layout.tsx                # Layout auth : centré, minimal, sans sidebar
│   │
│   ├── (dashboard)/                  # Groupe de routes dashboard (protégé par auth)
│   │   ├── accueil/
│   │   │   └── page.tsx              # Page d'accueil avec adage du jour
│   │   ├── profil/
│   │   │   └── page.tsx              # Gestion du profil et origines
│   │   ├── contributions/
│   │   │   └── page.tsx              # Soumission et validation d'adages
│   │   ├── parametres/
│   │   │   └── page.tsx              # Paramètres utilisateur (email, notifs)
│   │   └── layout.tsx                # Layout dashboard : sidebar + header + main
│   │
│   ├── api/                          # Route Handlers (API)
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts          # Handler NextAuth v5
│   │   └── cron/
│   │       └── daily-adage/
│   │           └── route.ts          # Vercel Cron : envoi adage quotidien
│   │
│   ├── layout.tsx                    # Root layout (html, body, providers, fonts, metadata)
│   ├── page.tsx                      # Landing page publique
│   ├── not-found.tsx                 # Page 404 personnalisée
│   ├── error.tsx                     # Error boundary global
│   ├── loading.tsx                   # Loading UI global
│   └── globals.css                   # Styles Tailwind + variables CSS custom
│
├── components/                       # Composants React
│   ├── ui/                           # Composants shadcn/ui (ne PAS modifier manuellement)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── skeleton.tsx
│   │   ├── toast.tsx
│   │   └── ...                       # Ajoutés via `pnpm dlx shadcn@latest add <component>`
│   │
│   ├── shared/                       # Composants réutilisables transverses
│   │   ├── header.tsx                # Header principal du dashboard
│   │   ├── sidebar.tsx               # Sidebar navigation
│   │   ├── footer.tsx                # Footer
│   │   ├── theme-toggle.tsx          # Bascule dark/light mode
│   │   ├── loading-spinner.tsx       # Spinner de chargement
│   │   ├── user-avatar.tsx           # Avatar utilisateur
│   │   └── page-header.tsx           # En-tête de page réutilisable (titre + description)
│   │
│   └── features/                     # Composants métier organisés par feature
│       ├── adage/                    # Feature adage quotidien
│       │   ├── adage-card.tsx        # Carte d'affichage d'un adage
│       │   ├── adage-audio-player.tsx# Lecteur audio d'un adage
│       │   └── adage-share-button.tsx# Bouton de partage
│       │
│       ├── profil/                   # Feature profil utilisateur
│       │   ├── profil-form.tsx       # Formulaire de profil
│       │   ├── origine-selector.tsx  # Sélecteur pays/ethnie/langue
│       │   └── langue-badge.tsx      # Badge affichant une langue
│       │
│       └── contribution/             # Feature contribution communautaire
│           ├── contribution-form.tsx # Formulaire de soumission d'adage
│           ├── contribution-list.tsx # Liste des contributions (modération)
│           └── contribution-status.tsx # Badge statut (pending/approved/rejected)
│
├── lib/                              # Utilitaires et configuration
│   ├── auth.ts                       # Configuration NextAuth v5 (providers, adapter, callbacks)
│   ├── prisma.ts                     # Singleton Prisma Client (avec gestion hot reload dev)
│   ├── env.ts                        # Validation Zod de TOUTES les variables d'environnement
│   ├── utils.ts                      # Helpers : cn() (clsx+twMerge), formatDate, slugify...
│   ├── constants.ts                  # Constantes globales (ROLES, STATUTS, CONTINENTS...)
│   ├── validators.ts                 # Schémas Zod réutilisables (adage, profil, contribution)
│   └── email.ts                      # Configuration Resend + helper d'envoi
│
├── hooks/                            # Custom hooks React
│   ├── use-user.ts                   # Hook TanStack Query pour les données utilisateur
│   ├── use-adage.ts                  # Hook TanStack Query pour l'adage du jour
│   ├── use-contributions.ts          # Hook TanStack Query pour les contributions
│   └── use-media-query.ts            # Hook utilitaire responsive
│
├── types/                            # Types TypeScript globaux
│   ├── index.ts                      # Types et interfaces partagés
│   └── next-auth.d.ts                # Extension des types NextAuth (ajout role, etc.)
│
├── prisma/                           # Prisma ORM
│   ├── schema.prisma                 # Schéma de la base de données
│   ├── migrations/                   # Migrations versionnées (générées par Prisma)
│   └── seed.ts                       # Script de seed (pays, langues, adages initiaux)
│
├── emails/                           # Templates React Email
│   ├── adage-quotidien.tsx           # Email de l'adage du jour
│   ├── bienvenue.tsx                 # Email de bienvenue après inscription
│   └── magic-link.tsx                # Email magic link de connexion
│
├── public/                           # Assets statiques
│   ├── images/
│   │   ├── logo.svg                  # Logo Gbé
│   │   └── og-image.png             # Image Open Graph pour le partage social
│   └── audio/                        # Fichiers audio prononciation (Phase 3)
│
├── messages/                         # Fichiers de traduction next-intl
│   └── fr.json                       # Traductions françaises (langue par défaut)
│
├── .env.example                      # Variables d'environnement documentées
├── .env.local                        # Variables locales (NON versionné — dans .gitignore)
├── .gitignore
├── CLAUDE.md                         # ← CE FICHIER (référence IA)
├── .github/
│   └── copilot-instructions.md       # Règles pour GitHub Copilot
├── next.config.ts                    # Configuration Next.js
├── tailwind.config.ts                # Configuration Tailwind CSS
├── tsconfig.json                     # Configuration TypeScript
├── postcss.config.mjs                # Configuration PostCSS
├── components.json                   # Configuration shadcn/ui
└── package.json                      # Dépendances et scripts
```

### Conventions de nommage des fichiers

| Type                  | Convention                                           | Exemple                                 |
| --------------------- | ---------------------------------------------------- | --------------------------------------- |
| Pages/Layouts Next.js | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx` | `app/(dashboard)/accueil/page.tsx`      |
| Composants            | kebab-case `.tsx`                                    | `adage-card.tsx`, `loading-spinner.tsx` |
| Utilitaires/Lib       | kebab-case `.ts`                                     | `auth.ts`, `prisma.ts`, `env.ts`        |
| Hooks                 | `use-xxx.ts` (kebab-case)                            | `use-user.ts`, `use-adage.ts`           |
| Types                 | kebab-case `.ts` ou `.d.ts`                          | `index.ts`, `next-auth.d.ts`            |
| Templates email       | kebab-case `.tsx`                                    | `adage-quotidien.tsx`                   |

---

## 4. Modèle de Données Prisma (MVP)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// ============================================================================
// AUTH — Modèles requis par @auth/prisma-adapter
// ============================================================================

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  role          Role      @default(USER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations Auth
  accounts Account[]
  sessions Session[]

  // Relations Métier
  profile              Profile?
  contributions        Adage[]          @relation("Contributeur")
  validations          Adage[]          @relation("Validateur")
  adagesQuotidiens     AdageQuotidien[]

  @@map("users")
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ============================================================================
// MÉTIER — Modèles spécifiques à Gbé
// ============================================================================

model Profile {
  id                String   @id @default(cuid())
  userId            String   @unique
  bio               String?  @db.Text
  preferredLangueId String?
  dailyEmailEnabled Boolean  @default(true)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  user            User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  preferredLangue Langue?       @relation(fields: [preferredLangueId], references: [id])
  origines        UserOrigine[]

  @@map("profiles")
}

model Pays {
  id        String @id @default(cuid())
  nom       String @unique
  code      String @unique @db.VarChar(3) // Code ISO 3166-1 alpha-2 ou alpha-3
  continent String @default("Afrique")

  ethnies  Ethnie[]
  langues  Langue[]
  origines UserOrigine[]

  @@map("pays")
}

model Ethnie {
  id     String @id @default(cuid())
  nom    String
  paysId String

  pays     Pays          @relation(fields: [paysId], references: [id])
  langues  Langue[]
  origines UserOrigine[]

  @@unique([nom, paysId])
  @@map("ethnies")
}

model Langue {
  id              String          @id @default(cuid())
  nom             String          // Ex: "Fon", "Yoruba", "Bambara"
  code            String          @unique // Code ISO 639-3 si disponible, sinon code interne
  famille         String?         // Ex: "Niger-Congo", "Nilo-Saharan"
  scriptDirection ScriptDirection @default(LTR)
  paysId          String
  ethnieId        String?

  pays     Pays     @relation(fields: [paysId], references: [id])
  ethnie   Ethnie?  @relation(fields: [ethnieId], references: [id])
  adages   Adage[]
  profiles Profile[]
  origines UserOrigine[]

  @@map("langues")
}

model Adage {
  id                   String      @id @default(cuid())
  langueId             String
  texteOriginal        String      @db.Text // Texte dans la langue africaine (UTF-8, diacritiques, tons)
  traductionLitterale  String      @db.Text // Traduction mot-à-mot en français
  explication          String      @db.Text // Explication culturelle et signification profonde
  contexteUsage        String?     @db.Text // Dans quel contexte ce proverbe est utilisé
  audioUrl             String?     // URL du fichier audio de prononciation (Phase 3)
  source               String?     // Source/référence du proverbe
  statut               AdageStatut @default(PENDING)
  contributeurId       String?     // Utilisateur qui a soumis l'adage
  validateurId         String?     // Modérateur qui a validé/rejeté
  createdAt            DateTime    @default(now())
  updatedAt            DateTime    @updatedAt

  langue       Langue           @relation(fields: [langueId], references: [id])
  contributeur User?            @relation("Contributeur", fields: [contributeurId], references: [id])
  validateur   User?            @relation("Validateur", fields: [validateurId], references: [id])
  quotidiens   AdageQuotidien[]

  @@index([langueId])
  @@index([statut])
  @@index([contributeurId])
  @@map("adages")
}

model UserOrigine {
  id        String @id @default(cuid())
  profileId String
  paysId    String
  ethnieId  String?
  langueId  String?

  profile Profile @relation(fields: [profileId], references: [id], onDelete: Cascade)
  pays    Pays    @relation(fields: [paysId], references: [id])
  ethnie  Ethnie? @relation(fields: [ethnieId], references: [id])
  langue  Langue? @relation(fields: [langueId], references: [id])

  @@unique([profileId, paysId, ethnieId])
  @@map("user_origines")
}

model AdageQuotidien {
  id      String   @id @default(cuid())
  userId  String
  adageId String
  date    DateTime @db.Date
  lu      Boolean  @default(false)

  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  adage Adage @relation(fields: [adageId], references: [id])

  @@unique([userId, date]) // Un seul adage par utilisateur par jour
  @@index([userId])
  @@index([date])
  @@map("adages_quotidiens")
}

// ============================================================================
// ENUMS
// ============================================================================

enum Role {
  USER
  MODERATOR
  ADMIN
}

enum AdageStatut {
  PENDING   // Soumis, en attente de validation
  APPROVED  // Validé par un modérateur
  REJECTED  // Rejeté par un modérateur
}

enum ScriptDirection {
  LTR // Left-to-right (toutes les langues africaines ciblées)
  RTL // Right-to-left (réservé pour extension future)
}
```

### Notes sur le modèle de données

- **UTF-8 obligatoire** : Tous les champs `@db.Text` supportent nativement les caractères spéciaux (tons, diacritiques, nasales). La BDD Supabase doit être configurée avec l'encodage `UTF8`.
- **Soft mapping** : Les `@@map("nom_table")` utilisent le snake_case pour les noms de tables SQL tout en gardant le PascalCase dans le code Prisma.
- **Relations Auth** : Les modèles `Account`, `Session` et `VerificationToken` suivent exactement le schéma requis par `@auth/prisma-adapter`.
- **Indexation** : Les champs fréquemment requêtés (`langueId`, `statut`, `contributeurId`, `date`) sont indexés.
- **Contrainte unicité** : `AdageQuotidien` a une contrainte `@@unique([userId, date])` pour garantir un seul adage par utilisateur par jour.

---

## 5. Conventions Git

### Branches

| Branche         | Rôle                                     | Protections                                                     |
| --------------- | ---------------------------------------- | --------------------------------------------------------------- |
| `main`          | Production. Code déployé en production   | ❌ Aucun push direct. Pull Request obligatoire depuis `develop` |
| `develop`       | Intégration. Base de toutes les features | PR depuis les branches feature/fix/chore                        |
| `feature/<nom>` | Nouvelle fonctionnalité                  | Créée depuis `develop`, mergée dans `develop`                   |
| `fix/<nom>`     | Correction de bug                        | Créée depuis `develop`, mergée dans `develop`                   |
| `chore/<nom>`   | Maintenance, config, refacto             | Créée depuis `develop`, mergée dans `develop`                   |

### Workflow

```
main ← PR ← develop ← PR ← feature/adage-quotidien
                     ← PR ← fix/magic-link-expired
                     ← PR ← chore/update-deps
```

### Conventional Commits

Format : `<type>(<scope>): <description courte>`

| Préfixe    | Usage                                       | Exemple                                             |
| ---------- | ------------------------------------------- | --------------------------------------------------- |
| `feat`     | Nouvelle fonctionnalité                     | `feat(adage): add daily adage selection algorithm`  |
| `fix`      | Correction de bug                           | `fix(auth): handle expired magic link token`        |
| `chore`    | Maintenance, config                         | `chore(deps): update prisma to v6.2`                |
| `docs`     | Documentation                               | `docs(readme): add setup instructions`              |
| `refactor` | Refactoring sans changement de comportement | `refactor(profil): extract origine selector logic`  |
| `test`     | Ajout ou modification de tests              | `test(adage): add unit tests for quotidien service` |
| `style`    | Formatage, espaces, points-virgules         | `style(components): fix eslint warnings`            |
| `perf`     | Amélioration de performances                | `perf(query): optimize adage fetch with index`      |

### Règles

1. **Toujours en anglais** pour les messages de commit (cohérence technique)
2. **Description courte** : max 72 caractères, en minuscules, sans point final
3. **Scope** : nom de la feature concernée (`auth`, `adage`, `profil`, `email`, `ui`)
4. **Pas de `WIP` commit** sur `develop` — squash si nécessaire
5. **Un commit = un changement logique** — pas de commits fourre-tout

---

## 6. Les 10 Règles de Conception

### Règle 1 — Responsabilité unique des composants

Chaque composant fait **UNE seule chose**. Si un composant dépasse ~80 lignes ou gère plusieurs responsabilités, il doit être découpé.

```tsx
// ✅ BON : chaque composant a une responsabilité
<AdageCard adage={adage} />
<AdageAudioPlayer audioUrl={adage.audioUrl} />
<AdageShareButton adageId={adage.id} />

// ❌ MAUVAIS : un composant qui fait tout
<AdageCardWithAudioAndShareAndComments />
```

### Règle 2 — Pas de logique métier dans les composants UI

La logique métier (calculs, transformations, appels BDD, validations) va dans les **hooks**, **Server Actions** ou **lib/**. Les composants UI ne font que du rendu et de l'interaction utilisateur.

```tsx
// ✅ BON : la logique est dans un Server Action
async function submitContribution(formData: FormData) {
  "use server";
  const validated = contributionSchema.parse(/* ... */);
  await prisma.adage.create({ data: validated });
}

// ❌ MAUVAIS : logique métier dans le composant
function ContributionForm() {
  const handleSubmit = async () => {
    // 50 lignes de logique métier ici...
  };
}
```

### Règle 3 — Route Handlers App Router uniquement

Toutes les routes API utilisent les **Route Handlers** de Next.js App Router (`app/api/.../route.ts`). Jamais de fichier dans `/pages/api/`.

```
✅ app/api/cron/daily-adage/route.ts
❌ pages/api/cron/daily-adage.ts
```

### Règle 4 — Accès BDD côté serveur uniquement

Les appels Prisma se font **UNIQUEMENT** dans :

- **Server Components** (composants sans `"use client"`)
- **Server Actions** (`"use server"`)
- **Route Handlers** (`route.ts`)

Jamais d'import de `@/lib/prisma` dans un fichier marqué `"use client"`.

### Règle 5 — Pas de `useEffect` pour le data fetching

Le data fetching se fait via :

- **Server Components** (approche par défaut, recommandée)
- **TanStack Query** (`useQuery`) quand on a besoin de cache/revalidation côté client
- **Server Actions** pour les mutations

```tsx
// ✅ BON : Server Component
async function AccueilPage() {
  const adage = await prisma.adageQuotidien.findFirst(/* ... */);
  return <AdageCard adage={adage} />;
}

// ✅ BON : TanStack Query pour du cache client
function useAdageDuJour() {
  return useQuery({
    queryKey: ["adage", "quotidien"],
    queryFn: () => fetch("/api/adage/quotidien").then((res) => res.json()),
  });
}

// ❌ MAUVAIS : useEffect + useState
function AccueilPage() {
  const [adage, setAdage] = useState(null);
  useEffect(() => {
    fetch("...").then(/* ... */);
  }, []);
}
```

### Règle 6 — Organisation par feature

Chaque feature a son propre dossier dans `/components/features/`. Les composants d'une feature ne doivent pas dépendre directement des composants d'une autre feature.

```
components/features/
├── adage/          # Tout ce qui concerne l'affichage des adages
├── profil/         # Tout ce qui concerne le profil utilisateur
└── contribution/   # Tout ce qui concerne les contributions
```

### Règle 7 — Réutilisation des types Prisma

Les types générés par Prisma (`@prisma/client`) sont la source de vérité. Pas de duplication manuelle de types pour les entités du modèle de données.

```tsx
// ✅ BON : importer depuis Prisma
import type { Adage, Langue, User } from "@prisma/client";

// ✅ BON : type composé avec Prisma
import type { Prisma } from "@prisma/client";
type AdageAvecLangue = Prisma.AdageGetPayload<{
  include: { langue: true };
}>;

// ❌ MAUVAIS : re-déclarer manuellement
interface Adage {
  id: string;
  texteOriginal: string;
  // ... duplication du schéma Prisma
}
```

### Règle 8 — Validation des variables d'environnement

Toutes les variables d'environnement sont validées au démarrage avec **Zod** dans `/lib/env.ts`. L'app ne démarre pas si une variable manque ou est invalide.

```typescript
// lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().startsWith("re_"),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
```

### Règle 9 — Préparation i18n dès le début

Les textes UI ne sont **jamais hardcodés** dans les composants. Utiliser `next-intl` dès le début avec les fichiers de traduction dans `/messages/`.

```tsx
// ✅ BON
import { useTranslations } from "next-intl";
function Header() {
  const t = useTranslations("Header");
  return <h1>{t("title")}</h1>;
}

// ❌ MAUVAIS
function Header() {
  return <h1>Bienvenue sur Gbé</h1>;
}
```

### Règle 10 — Mobile-first

Tous les composants Tailwind suivent l'approche **mobile-first** : on design d'abord pour mobile, puis on ajoute les breakpoints pour les écrans plus larges.

```tsx
// ✅ BON : mobile-first
<div className="flex flex-col gap-4 md:flex-row md:gap-8 lg:gap-12">

// ❌ MAUVAIS : desktop-first
<div className="flex flex-row gap-12 sm:flex-col sm:gap-4">
```

---

## 7. Spécificités Langues Africaines

### Encodage

- **UTF-8 strict partout** : BDD (PostgreSQL encoding UTF8), API, frontend, fichiers source
- **Collation PostgreSQL** : utiliser `C.UTF-8` ou `und-x-icu` pour un tri Unicode correct
- Les champs texte des adages sont de type `TEXT` en PostgreSQL (via `@db.Text` en Prisma) — **pas de limite de longueur**

### Caractères spéciaux à supporter

Les langues africaines utilisent des caractères qui vont au-delà de l'ASCII standard :

| Catégorie                 | Exemples                                 | Langues                |
| ------------------------- | ---------------------------------------- | ---------------------- |
| **Tons** (accents)        | à, á, â, ã, è, é, ê, ì, í, ò, ó, ô, ù, ú | Fon, Yoruba, Igbo, Éwé |
| **Voyelles ouvertes**     | ɛ (epsilon), ɔ (o ouvert)                | Fon, Éwé, Baoulé, Akan |
| **Nasales**               | ŋ (ng), ɲ (gn)                           | Bambara, Wolof, Hausa  |
| **Points souscrit**       | ẹ, ọ, ṣ                                  | Yoruba                 |
| **Diacritiques combinés** | Ọ̀, ẹ́ (point souscrit + accent)           | Yoruba                 |
| **Lettres spéciales**     | ɗ (d crocheté), ƒ (f crocheté)           | Hausa, Éwé             |

### Exemples de test

Toujours tester les inputs, l'affichage et le stockage avec ces exemples réels :

- **Fon** : "Gbédoto wɛ nyi agbaza" (Le destin est le corps)
- **Yoruba** : "Ọ̀rúnmìlà ni baba àwọn Ifá" (Orunmila est le père de l'Ifá)
- **Bambara** : "Mɔgɔ tɛ ɲɛnajɛ sɔrɔ a yɛrɛ ma" (On ne trouve pas le bonheur pour soi-même)
- **Éwé** : "Ðevi ma nya nuto ƒe ŋkume o" (L'enfant ne connaît pas le visage de la mort)
- **Wolof** : "Ku ñëw ci jàmm, dafay dem ci jàmm" (Qui vient en paix, repart en paix)

### Recommandations techniques

1. **Font stack** : Polices du design system — **Lora** (serif, headings/proverbes) + **Inter** (sans-serif, body/UI). Les deux supportent les caractères africains. Voir section 7bis pour le détail.
2. **Direction du texte** : Toutes les langues ciblées sont **LTR** (gauche à droite)
3. **Input validation** : Ne JAMAIS filtrer ou rejeter des caractères Unicode dans les formulaires de saisie d'adages
4. **Recherche** : Pour la recherche dans les adages, utiliser des fonctions PostgreSQL avec support Unicode (`unaccent`, `ILIKE`, ou full-text search avec dictionnaire)
5. **Copy-paste** : S'assurer que le copier-coller depuis/vers les champs de texte préserve tous les diacritiques

---

## 7bis. Design System — « Parchemin Sacré »

> Identité visuelle de Gbé. Toute interface produite doit respecter ces règles.
> Vibe : minimaliste, épuré, centré sur la typographie serif. Évoque manuscrits anciens, sagesse orale transcrite, calme et élégance.

### Palette de couleurs

| Rôle       | Nom               | Hex                     | CSS Variable      | Usage                                                 |
| ---------- | ----------------- | ----------------------- | ----------------- | ----------------------------------------------------- |
| Background | Sable / Parchemin | `#F5F0E8`               | `--color-sable`   | Fond principal, surfaces de page                      |
| Text       | Ébène             | `#1A1A2E`               | `--color-ebene`   | Texte principal, headings                             |
| Primary    | Terre d'Afrique   | `#B5451B`               | `--color-terre`   | Accents, labels, CTA secondaires, liens actifs        |
| Secondary  | Or Adja           | `#D4A017`               | `--color-or`      | Séparateurs, accents dorés, highlights, progress bars |
| Tertiary   | Indigo Yoruba     | `#2D3A8C`               | `--color-indigo`  | Liens, tags, éléments interactifs secondaires         |
| Success    | Vert Baobab       | `#2E7D32`               | `--color-baobab`  | Statuts de confirmation, badges approved              |
| Surface    | Blanc doux        | `#FFFDF8`               | `--color-surface` | Cartes, modales, éléments surélevés                   |
| Muted      | Ébène 50%         | `#1A1A2E` à 50% opacity | —                 | Texte secondaire, metadata                            |

**Règles d'utilisation** :

- Le fond principal est **Sable** `#F5F0E8`, les cartes et modales sont en **Blanc doux** `#FFFDF8`
- Alterner les deux couleurs de fond entre les sections pour créer du rythme
- **Terre d'Afrique** `#B5451B` est la couleur d'action primaire (boutons CTA, labels actifs)
- **Or Adja** `#D4A017` est réservé aux séparateurs fins (1-2px), highlights et éléments décoratifs — **jamais comme texte sur fond clair** (contraste WCAG insuffisant)
- **Indigo Yoruba** `#2D3A8C` pour les liens et éléments interactifs secondaires
- Le texte muted utilise `text-[#1A1A2E]/50` minimum (pas 30%, contraste insuffisant)

### Gradient signature

```
bg-gradient-to-r from-[#B5451B] via-[#D4A017] to-[#B5451B]
```

Utilisé en barre fine (1-2px) en haut des cartes principales et en bas des sections hero.

### Typographie

| Usage                | Police                   | Classe Tailwind                            | Détails                                                                                          |
| -------------------- | ------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| Headings & Proverbes | **Lora** (Google Fonts)  | `font-serif`                               | Serif moderne, variantes italiques expressives, excellent support Unicode/diacritiques africains |
| Body & UI            | **Inter** (Google Fonts) | `font-sans`                                | Sans-serif lisible, standard SaaS                                                                |
| Labels / Metadata    | Inter                    | `font-sans` + `uppercase tracking-[0.2em]` | Structure visuelle via espacement                                                                |
| Proverbes (citation) | Lora italic              | `font-serif italic`                        | Distinction culturelle des textes originaux                                                      |

**Configuration Tailwind** (dans `tailwind.config.ts` ou `globals.css`) :

```ts
// tailwind.config.ts
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Lora', 'Georgia', 'serif'],
}
```

**Règle absolue** : Ne JAMAIS utiliser `style={{ fontFamily: "..." }}` en inline. Toujours utiliser les classes Tailwind `font-serif` et `font-sans`.

### Patterns visuels

| Pattern             | Implémentation                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Séparateurs dorés   | `<div className="w-12 h-[1px] bg-[#D4A017]" />` — lignes fines 1-2px                                         |
| Coins arrondis      | `rounded-2xl` ou `rounded-[2rem]` — coins doux, jamais de angles vifs                                        |
| Ombres              | `shadow-sm` à `shadow-md` max — subtiles, jamais de shadow-2xl                                               |
| Bordures            | `border border-[#D4A017]/10` — très légères, dorées transparentes                                            |
| Labels structurels  | `text-xs uppercase tracking-[0.2em] font-bold` — minimum 12px, jamais `text-[10px]`                          |
| Boutons primaires   | `rounded-full bg-[#B5451B] text-white text-xs uppercase tracking-[0.2em] font-bold px-6 py-3`                |
| Boutons secondaires | `rounded-full border border-[#D4A017] text-[#1A1A2E] text-xs uppercase tracking-[0.2em] font-bold px-6 py-3` |
| Espacement          | Généreux — `py-20` à `py-24` entre sections, `p-8 md:p-12` dans les cartes                                   |

### Accessibilité (WCAG AA)

- **Texte muted** : opacité minimum 50% (`text-[#1A1A2E]/50`), jamais 30%
- **Taille minimum** : `text-xs` (12px) pour les labels, jamais `text-[10px]`
- **Or Adja** `#D4A017` : utilisable uniquement comme décoration ou sur fond sombre `#1A1A2E` — jamais comme texte sur fond clair
- **Ratio de contraste** : vérifier avec https://webaim.org/resources/contrastchecker/ avant toute nouvelle combinaison

### Micro-interactions

- **Cartes** : `hover:translate-y-[-2px] hover:shadow-md transition-all` (léger soulèvement au survol)
- **Séparateurs dorés** : `transition-all w-12 hover:w-20` (expansion subtile)
- **Bouton favori** : animation pulse au clic avec `animate-ping` éphémère sur le cœur
- **Animations de page** : CSS natives (`@keyframes`) pour fade/slide simples. Réserver `framer-motion` pour `AnimatePresence` et les layout animations complexes uniquement
- **Sélection de texte** : `selection:bg-[#D4A017]/30 selection:text-[#B5451B]`

### Textures & Ambiance

- **Grain parchemin** : un très léger noise SVG sur le fond Sable (`opacity-[0.03]`) pour évoquer la texture papier
- **Motifs Adinkra** : optionnel — motifs géométriques africains en filigrane (`opacity-[0.02]`-`opacity-[0.04]`) dans les sections hero ou fonds de page
- **Pas de** : néo-brutalisme, bordures épaisses, dégradés multicolores, animations flashy

### Structure des pages

**Landing Page** :

1. Navigation sticky (`bg-[#F5F0E8]/80 backdrop-blur-md`)
2. Hero avec carte proverbe mockup
3. Section "Comment ça marche" (fond `#FFFDF8`)
4. Grille des langues
5. Section interactive (fond `#1A1A2E` — section sombre)
6. Témoignages (fond `#FFFDF8`)
7. CTA final
8. Footer minimal

**Dashboard** :

- Sidebar gauche fixe (264px, fond `#FFFDF8`) — collapsible en mobile
- Zone principale (`bg-[#F5F0E8]`) avec header + contenu
- Panel droit optionnel (320px) — stats et calendrier — **collapsible** sur écrans < 1440px
- Navigation sidebar : **pas de uppercase** sur les labels de nav (réservé aux titres de section)

---

## 8. Roadmap

### Phase 1 — Fondations MVP 🏗️ (actuelle)

**Objectif** : Poser l'architecture technique complète, prête à recevoir les features métier.

- [ ] Initialisation du projet Next.js avec pnpm
- [ ] Configuration TypeScript strict
- [ ] Setup Tailwind CSS + shadcn/ui
- [ ] Configuration Prisma + schéma de BDD complet
- [ ] Migration initiale Prisma sur Supabase
- [ ] Seed des données de base (pays, ethnies, langues africaines)
- [ ] Configuration NextAuth v5 (Google + Magic Link + Prisma Adapter)
- [ ] Validation des variables d'environnement avec Zod (`lib/env.ts`)
- [ ] Layout root avec providers (SessionProvider, QueryClientProvider, ThemeProvider)
- [ ] Layouts `(auth)` et `(dashboard)` avec sidebar/header
- [ ] Composants shared de base (Header, Sidebar, Footer, LoadingSpinner)
- [ ] Configuration next-intl avec fichier `fr.json` initial
- [ ] Déploiement Vercel avec preview auto sur PR
- [ ] Configuration ESLint + Prettier
- [ ] Setup `.github/` avec copilot-instructions.md

### Phase 2 — Feature Adage Quotidien 📖

**Objectif** : L'utilisateur peut recevoir et consulter son adage du jour.

- [x] Page d'accueil `/accueil` avec l'adage du jour
- [x] Algorithme de sélection quotidienne (par langue, sans répétition)
- [x] CRUD adages (admin)
- [x] Server Action : marquer un adage comme lu
- [x] API Route Handler : endpoint adage du jour
- [x] Template email React Email pour l'adage quotidien
- [x] Configuration Vercel Cron job pour envoi quotidien
- [x] Page profil avec sélecteur d'origines (pays/ethnie/langue)
- [x] Préférences email quotidien (activer/désactiver)

### Phase 3 — Audio & Prononciation 🔊

**Objectif** : Chaque adage peut avoir une prononciation audio.

- [ ] Configuration Supabase Storage pour les fichiers audio
- [ ] Upload audio (interface admin/modérateur)
- [ ] Composant `AdageAudioPlayer` avec contrôles play/pause
- [ ] Streaming audio optimisé (lazy loading)
- [ ] Fallback visuel quand pas d'audio disponible

### Phase 4 — Communauté 🤝

**Objectif** : Les utilisateurs peuvent soumettre et valider des adages.

- [ ] Formulaire de soumission d'adage (`ContributionForm`)
- [ ] Workflow de modération (PENDING → APPROVED / REJECTED)
- [ ] Interface modérateur pour valider/rejeter les soumissions
- [ ] Notifications email pour les statuts de contribution
- [ ] Profil contributeur public (nombre d'adages soumis/approuvés)
- [ ] Gamification basique (badges, compteurs)

### Phase 5 — Croissance 🚀 (post-MVP)

- [ ] Onboarding interactif pour les nouveaux utilisateurs
- [ ] Partage social d'adages (Open Graph images dynamiques)
- [ ] Système de favoris / collection d'adages
- [ ] Notifications push (PWA)
- [ ] App mobile (React Native ou PWA avancée)
- [ ] API publique pour les adages
- [ ] Multilinguisme interface (anglais)

---

## 9. Ce que tu NE DOIS PAS faire

Cette section liste les erreurs fréquentes des agents IA sur ce projet. **Respecter ces interdictions est obligatoire.**

### Architecture

- ❌ **Jamais utiliser le Pages Router** (`/pages/`, `/pages/api/`). Tout passe par l'App Router (`/app/`).
- ❌ **Jamais créer de fichiers dans `/pages/`**. Ce dossier ne doit pas exister.
- ❌ **Jamais installer de packages non approuvés** sans vérifier qu'ils ne sont pas redondants avec la stack existante.
- ❌ **Jamais créer de backend séparé** (Express, Fastify). Next.js est le serveur.

### TypeScript

- ❌ **Jamais utiliser `any`**. Utiliser `unknown` puis affiner avec du type narrowing, ou créer un type approprié.
- ❌ **Jamais utiliser `as` pour forcer un cast** sauf cas exceptionnel documenté par un commentaire `// SAFETY: ...`.
- ❌ **Jamais utiliser `@ts-ignore` ou `@ts-expect-error`** sans commentaire explicatif.
- ❌ **Jamais dupliquer les types Prisma**. Importer depuis `@prisma/client`.

### Data Fetching

- ❌ **Jamais utiliser `useEffect` pour fetcher des données**. Utiliser Server Components ou TanStack Query.
- ❌ **Jamais importer Prisma dans un composant `"use client"`**. Prisma est serveur uniquement.
- ❌ **Jamais utiliser `axios`**. `fetch` natif ou TanStack Query.
- ❌ **Jamais faire d'appels API depuis un Server Component** vers sa propre API. Appeler directement Prisma.

### Styling

- ❌ **Jamais utiliser CSS-in-JS** (styled-components, emotion, CSS modules pour la logique). Tailwind uniquement.
- ❌ **Jamais utiliser `!important`** en CSS. Utiliser la spécificité Tailwind correctement.
- ❌ **Jamais designer desktop-first**. Toujours commencer par le mobile.

### State Management

- ❌ **Jamais installer Redux, MobX, Recoil, Jotai**. Zustand uniquement pour le state client.
- ❌ **Jamais stocker du server state dans Zustand**. Utiliser TanStack Query pour le cache serveur.

### Sécurité

- ❌ **Jamais hardcoder des secrets** (clés API, tokens) dans le code. Tout dans `.env` + validation Zod.
- ❌ **Jamais exposer des variables serveur au client** (ne pas préfixer par `NEXT_PUBLIC_` sauf si intentionnel).
- ❌ **Jamais `console.log` en production**. Utiliser un logger structuré si nécessaire.
- ❌ **Jamais désactiver les protections CSRF** de NextAuth.

### Git

- ❌ **Jamais push direct sur `main`**. Toujours via PR depuis `develop`.
- ❌ **Jamais commit de fichiers `.env`**. Seul `.env.example` est versionné.
- ❌ **Jamais commit de `node_modules/`**, `.next/`, ou fichiers générés.

### Langues Africaines

- ❌ **Jamais filtrer ou rejeter des caractères Unicode** dans les inputs de texte.
- ❌ **Jamais utiliser `VARCHAR` avec une limite courte** pour les champs de texte d'adages. Utiliser `TEXT`.
- ❌ **Jamais supposer l'ASCII** pour les opérations sur les strings (comparaison, tri, recherche).

---

## 10. Variables d'Environnement

Toutes les variables sont documentées dans `.env.example` et validées par `lib/env.ts`.

| Variable               | Description                                                  | Côté    |
| ---------------------- | ------------------------------------------------------------ | ------- |
| `DATABASE_URL`         | URL PostgreSQL Supabase (connection pooling via PgBouncer)   | Serveur |
| `DIRECT_URL`           | URL PostgreSQL directe Supabase (pour les migrations Prisma) | Serveur |
| `NEXTAUTH_URL`         | URL complète de l'application (ex: `http://localhost:3000`)  | Serveur |
| `NEXTAUTH_SECRET`      | Secret Auth.js — générer via `openssl rand -base64 32`       | Serveur |
| `GOOGLE_CLIENT_ID`     | Client ID OAuth Google                                       | Serveur |
| `GOOGLE_CLIENT_SECRET` | Client Secret OAuth Google                                   | Serveur |
| `RESEND_API_KEY`       | Clé API Resend pour les emails transactionnels               | Serveur |
| `NEXT_PUBLIC_APP_URL`  | URL publique de l'app (utilisable côté client)               | Client  |

---

## 11. Scripts pnpm

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --write .",
  "db:generate": "prisma generate",
  "db:push": "prisma db push",
  "db:migrate": "prisma migrate dev",
  "db:migrate:prod": "prisma migrate deploy",
  "db:seed": "prisma db seed",
  "db:studio": "prisma studio",
  "email:dev": "email dev --port 3001",
  "typecheck": "tsc --noEmit",
  "postinstall": "prisma generate"
}
```

---

## 12. Commandes Utiles

```bash
# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm dev

# Créer une migration Prisma
pnpm db:migrate --name <nom_migration>

# Appliquer les migrations en production
pnpm db:migrate:prod

# Ouvrir Prisma Studio (interface graphique BDD)
pnpm db:studio

# Lancer le preview des emails
pnpm email:dev

# Vérifier les types TypeScript
pnpm typecheck

# Ajouter un composant shadcn/ui
pnpm dlx shadcn@latest add <composant>

# Générer un secret NextAuth
openssl rand -base64 32
```
