"use client";

import { useQuery } from "@tanstack/react-query";

interface Contribution {
  id: string;
  texteOriginal: string;
  traductionLitterale: string;
  statut: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  langue: {
    nom: string;
  };
}

/**
 * Hook TanStack Query pour récupérer les contributions de l'utilisateur connecté.
 *
 * staleTime de 5 minutes : les contributions changent rarement (modération asynchrone),
 * donc on évite les refetch inutiles tout en gardant les données raisonnablement fraîches.
 */
export function useContributions() {
  return useQuery<Contribution[]>({
    queryKey: ["contributions"],
    queryFn: async () => {
      const res = await fetch("/api/contributions");
      if (!res.ok) throw new Error("Erreur chargement contributions");
      return res.json();
    },
    staleTime: 1000 * 60 * 5,
  });
}
