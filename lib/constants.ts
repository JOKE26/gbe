import type { Role } from "@/lib/generated/prisma/client";

export const ROLES: Record<Role, string> = {
  USER: "Utilisateur",
  MODERATOR: "Modérateur",
  ADMIN: "Administrateur",
} as const;

export const ADAGE_STATUTS = {
  PENDING: "En attente",
  APPROVED: "Approuvé",
  REJECTED: "Rejeté",
} as const;

export const DEFAULT_LOCALE = "fr" as const;

export const MAX_ADAGES_PER_DAY = 1;

export const CONTINENTS = ["Afrique"] as const;
