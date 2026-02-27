# Copilot Instructions — Gbé

> Règles automatiquement lues par GitHub Copilot dans VSCode.
> Toute suggestion de code DOIT respecter ces règles.

## Projet

Gbé est un SaaS web permettant aux utilisateurs de la diaspora africaine de recevoir
quotidiennement un adage/proverbe dans leur langue d'origine (Fon, Yoruba, Bambara, Éwé, Wolof…),
avec traduction littérale, explication culturelle et prononciation audio.
Stack : Next.js App Router, TypeScript strict, Tailwind CSS + shadcn/ui, Prisma/PostgreSQL (Supabase),
NextAuth v5, Zustand, TanStack Query, Resend, pnpm, Vercel.

---

## Règles de code strictes

### TypeScript

- Mode `strict: true` — zéro `any`, zéro `@ts-ignore`
- Utiliser `unknown` + type narrowing au lieu de `any`
- `as` interdit sauf cas documenté avec `// SAFETY: <raison>`
- Préférer `interface` pour les props de composants, `type` pour les alias et unions
- Réutiliser les types Prisma (`import type { Adage } from "@prisma/client"`) — jamais redéfinir manuellement

### Imports

- **Toujours** utiliser l'alias `@/` pour les imports internes :
  ```ts
  import { prisma } from "@/lib/prisma";
  import { AdageCard } from "@/components/features/adage/adage-card";
  import { Button } from "@/components/ui/button";
  import { useUser } from "@/hooks/use-user";
  import type { Adage } from "@prisma/client";
  ```
- Ordre des imports :
  1. Modules Node.js / React / Next.js
  2. Bibliothèques tierces
  3. Alias `@/lib/`, `@/hooks/`, `@/types/`
  4. Alias `@/components/`
  5. Types (`import type`)

### Exports

- **Exports nommés** par défaut : `export function AdageCard() {}`
- `export default` uniquement pour les pages et layouts Next.js (`page.tsx`, `layout.tsx`)
- Jamais de `export default` anonyme

---

## Conventions de nommage

| Élément               | Convention               | Exemple                                |
| --------------------- | ------------------------ | -------------------------------------- |
| Fichiers composants   | kebab-case `.tsx`        | `adage-card.tsx`                       |
| Fichiers utilitaires  | kebab-case `.ts`         | `env.ts`, `prisma.ts`                  |
| Fichiers hooks        | `use-xxx.ts`             | `use-user.ts`, `use-adage.ts`          |
| Composants React      | PascalCase               | `AdageCard`, `ProfilForm`              |
| Fonctions / variables | camelCase                | `getAdageDuJour`, `isLoading`          |
| Constantes            | UPPER_SNAKE_CASE         | `MAX_ADAGES_PER_DAY`, `DEFAULT_LOCALE` |
| Types / Interfaces    | PascalCase               | `AdageWithLangue`, `UserProfile`       |
| Enums Prisma          | UPPER_SNAKE_CASE         | `PENDING`, `APPROVED`, `REJECTED`      |
| Routes API            | kebab-case dossiers      | `app/api/cron/daily-adage/route.ts`    |
| Tables SQL            | snake_case (via `@@map`) | `adages_quotidiens`, `user_origines`   |

---

## Patterns préférés

### Server Components (par défaut)

Tout composant est **Server Component** sauf s'il a besoin d'interactivité.
Ajouter `"use client"` uniquement pour : `useState`, `useEffect`, `onClick`, `onChange`, hooks custom.

```tsx
// ✅ Server Component — accès direct Prisma
import { prisma } from "@/lib/prisma";

export default async function AccueilPage() {
  const adage = await prisma.adage.findFirst({
    where: { statut: "APPROVED" },
    include: { langue: true },
  });
  return <AdageCard adage={adage} />;
}
```

### Server Actions (mutations)

Utiliser pour les formulaires et les mutations de données.

```tsx
// ✅ Server Action dans un fichier séparé ou inline
"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { contributionSchema } from "@/lib/validators";

export async function submitContribution(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Non autorisé");

  const data = contributionSchema.parse({
    texteOriginal: formData.get("texteOriginal"),
    traductionLitterale: formData.get("traductionLitterale"),
    explication: formData.get("explication"),
    langueId: formData.get("langueId"),
  });

  return prisma.adage.create({
    data: { ...data, statut: "PENDING", contributeurId: session.user.id },
  });
}
```

### Route Handlers (webhooks / API externes uniquement)

```ts
// app/api/cron/daily-adage/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Vérifier le header d'autorisation Vercel Cron
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // Logique d'envoi quotidien...
  return NextResponse.json({ success: true });
}
```

### TanStack Query (cache client)

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";

export function useAdageDuJour() {
  return useQuery({
    queryKey: ["adage", "quotidien"],
    queryFn: async () => {
      const res = await fetch("/api/adage/quotidien");
      if (!res.ok) throw new Error("Erreur chargement adage");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 heure
  });
}
```

### Zustand (état UI client uniquement)

```tsx
import { create } from "zustand";

interface SidebarStore {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));
```

---

## Tailwind CSS & Design System « Parchemin Sacré »

### Couleurs du projet

| Rôle                      | Hex             | Classe type                                                   |
| ------------------------- | --------------- | ------------------------------------------------------------- |
| Fond principal (Sable)    | `#F5F0E8`       | `bg-[#F5F0E8]`                                                |
| Texte (Ébène)             | `#1A1A2E`       | `text-[#1A1A2E]`                                              |
| Primary (Terre d'Afrique) | `#B5451B`       | `bg-[#B5451B]`, `text-[#B5451B]`                              |
| Secondary (Or Adja)       | `#D4A017`       | `bg-[#D4A017]` — déco uniquement, jamais texte sur fond clair |
| Tertiary (Indigo Yoruba)  | `#2D3A8C`       | `text-[#2D3A8C]`                                              |
| Surface (Blanc doux)      | `#FFFDF8`       | `bg-[#FFFDF8]`                                                |
| Muted                     | `#1A1A2E` à 50% | `text-[#1A1A2E]/50` — minimum 50%, jamais 30%                 |

### Typographie

- **Headings & Proverbes** : `font-serif` (Lora via Google Fonts)
- **Body & UI** : `font-sans` (Inter)
- **Labels** : `font-sans text-xs uppercase tracking-[0.2em] font-bold`
- **Proverbes citation** : `font-serif italic`
- **JAMAIS** de `style={{ fontFamily: "..." }}` inline — toujours `font-serif` / `font-sans`

### Règles visuelles

- **Mobile-first** : styles de base = mobile, puis `md:`, `lg:`, `xl:`
- Utiliser `cn()` (helper clsx+twMerge dans `@/lib/utils`) pour les classes conditionnelles
- Préférer les composants shadcn/ui existants avant d'en créer de nouveaux
- Jamais de CSS-in-JS (styled-components, emotion), jamais de `style={{}}` inline
- Coins arrondis doux : `rounded-2xl` ou `rounded-[2rem]`
- Ombres subtiles : `shadow-sm` à `shadow-md` max
- Bordures : `border border-[#D4A017]/10` (très légères)
- Espacement généreux : `py-20` à `py-24` entre sections
- Séparateurs dorés fins : `<div className="w-12 h-[1px] bg-[#D4A017]" />`
- Gradient signature : `bg-gradient-to-r from-[#B5451B] via-[#D4A017] to-[#B5451B]`
- Sélection de texte : `selection:bg-[#D4A017]/30 selection:text-[#B5451B]`
- Taille label minimum : `text-xs` (12px), jamais `text-[10px]`

### Boutons

```tsx
// Primaire
<button className="rounded-full bg-[#B5451B] text-white text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 hover:bg-[#B5451B]/90 transition-all">

// Secondaire
<button className="rounded-full border border-[#D4A017] text-[#1A1A2E] text-xs uppercase tracking-[0.2em] font-bold px-6 py-3 hover:bg-[#D4A017]/5 transition-all">
```

### Micro-interactions

- Cartes : `hover:translate-y-[-2px] hover:shadow-md transition-all`
- Animations simples : CSS natif (`@keyframes`), réserver `framer-motion` pour `AnimatePresence` uniquement

```tsx
import { cn } from "@/lib/utils";

interface AdageCardProps {
  className?: string;
  isHighlighted?: boolean;
}

export function AdageCard({ className, isHighlighted }: AdageCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[#D4A017]/10 bg-[#FFFDF8] p-4 md:p-6",
        "hover:translate-y-[-2px] hover:shadow-md transition-all",
        isHighlighted && "border-[#B5451B]/20 bg-[#B5451B]/5",
        className,
      )}
    >
      {/* ... */}
    </div>
  );
}
```

---

## Encodage & Langues Africaines

- **UTF-8 strict** partout — BDD, API, frontend, fichiers source
- Les champs texte d'adages sont `@db.Text` en Prisma (SQL `TEXT`, pas de limite)
- **Ne jamais filtrer** les caractères Unicode dans les inputs
- Tester avec : `ɛ`, `ɔ`, `ŋ`, `ẹ`, `ọ`, `ɲ`, `ɗ`, `ƒ`, `Ọ̀`, `ẹ́`
- Polices du design system : **Lora** (serif) + **Inter** (sans-serif) — supportent les diacritiques africains
- Direction du texte : toujours **LTR** pour les langues ciblées

---

## Ce qui est interdit

- ❌ Pages Router (`/pages/`, `/pages/api/`)
- ❌ `any` en TypeScript
- ❌ `useEffect` pour le data fetching
- ❌ `axios` — utiliser `fetch` natif
- ❌ CSS-in-JS (styled-components, emotion)
- ❌ Redux, MobX, Recoil, Jotai — Zustand uniquement
- ❌ Import de Prisma dans un composant `"use client"`
- ❌ `console.log` en production
- ❌ Secrets hardcodés dans le code
- ❌ Push direct sur `main`
- ❌ `export default` (sauf `page.tsx` et `layout.tsx`)
- ❌ Strings UI hardcodées — préparer pour next-intl
- ❌ Desktop-first en Tailwind
- ❌ Créer un backend séparé (Express, Fastify)

---

## Structure du projet

```
app/                  → Routes Next.js App Router (groupes avec parenthèses)
  (auth)/             → Login, Register, Verify (layout minimal)
  (dashboard)/        → Accueil, Profil, Contributions (layout avec sidebar)
  api/                → Route Handlers uniquement
components/
  ui/                 → shadcn/ui (ne pas modifier manuellement)
  shared/             → Header, Sidebar, Footer, LoadingSpinner...
  features/           → Par feature : adage/, profil/, contribution/
lib/                  → auth.ts, prisma.ts, env.ts, utils.ts, validators.ts
hooks/                → use-user.ts, use-adage.ts...
types/                → Types globaux, extensions NextAuth
prisma/               → schema.prisma, migrations/, seed.ts
emails/               → Templates React Email
messages/             → Traductions next-intl (fr.json)
public/               → Images, audio (Phase 3)
```
