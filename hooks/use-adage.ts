"use client";

import { useQuery } from "@tanstack/react-query";

interface AdageQuotidienResponse {
  id: string;
  lu: boolean;
  date: string;
  adage: {
    id: string;
    texteOriginal: string;
    traductionLitterale: string;
    explication: string;
    contexteUsage: string | null;
    source: string | null;
    audioUrl: string | null;
    langue: {
      id: string;
      nom: string;
      code: string;
    };
  };
}

export function useAdage() {
  return useQuery({
    queryKey: ["adage", "quotidien"],
    queryFn: async (): Promise<AdageQuotidienResponse | null> => {
      const res = await fetch("/api/adage/quotidien");
      if (!res.ok) throw new Error("Erreur chargement adage");
      const data: { adage: unknown } = await res.json();
      if (!data.adage) return null;
      return data as unknown as AdageQuotidienResponse;
    },
    staleTime: 1000 * 60 * 60, // 1 heure
  });
}
