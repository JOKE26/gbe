"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { addOrigine, removeOrigine } from "@/app/(dashboard)/profil/actions";
import { LangueBadge } from "@/components/features/profil/langue-badge";
import { cn } from "@/lib/utils";
import { Plus, Loader2 } from "lucide-react";

interface GeoItem {
  id: string;
  nom: string;
  code?: string;
}

interface ExistingOrigine {
  id: string;
  pays: { id: string; nom: string };
  ethnie: { id: string; nom: string } | null;
  langue: { id: string; nom: string } | null;
}

interface OrigineSelectorProps {
  origines: ExistingOrigine[];
}

async function fetchGeo(params: Record<string, string>): Promise<GeoItem[]> {
  const searchParams = new URLSearchParams(params);
  const res = await fetch(`/api/geo?${searchParams.toString()}`);
  if (!res.ok) throw new Error("Erreur chargement données géographiques");
  return res.json() as Promise<GeoItem[]>;
}

export function OrigineSelector({ origines }: OrigineSelectorProps) {
  const t = useTranslations("dashboard.profil");
  const [isAdding, setIsAdding] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [selectedPaysId, setSelectedPaysId] = useState("");
  const [selectedEthnieId, setSelectedEthnieId] = useState("");
  const [selectedLangueId, setSelectedLangueId] = useState("");

  // Charger la liste des pays (cache long — données statiques)
  const { data: paysList = [] } = useQuery({
    queryKey: ["geo", "pays"],
    queryFn: () => fetchGeo({ type: "pays" }),
    staleTime: 1000 * 60 * 60, // 1 heure
  });

  // Charger les ethnies quand un pays est sélectionné
  const { data: ethniesList = [] } = useQuery({
    queryKey: ["geo", "ethnies", selectedPaysId],
    queryFn: () => fetchGeo({ type: "ethnies", paysId: selectedPaysId }),
    enabled: !!selectedPaysId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Charger les langues quand un pays (et éventuellement une ethnie) est sélectionné
  const { data: languesList = [] } = useQuery({
    queryKey: ["geo", "langues", selectedPaysId, selectedEthnieId],
    queryFn: () => {
      const params: Record<string, string> = {
        type: "langues",
        paysId: selectedPaysId,
      };
      if (selectedEthnieId) params.ethnieId = selectedEthnieId;
      return fetchGeo(params);
    },
    enabled: !!selectedPaysId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  function resetForm() {
    setSelectedPaysId("");
    setSelectedEthnieId("");
    setSelectedLangueId("");
    setIsAdding(false);
    setError(null);
  }

  function handleAdd() {
    if (!selectedPaysId) return;
    setError(null);

    startTransition(async () => {
      try {
        await addOrigine({
          paysId: selectedPaysId,
          ethnieId: selectedEthnieId || undefined,
          langueId: selectedLangueId || undefined,
        });
        resetForm();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(message);
      }
    });
  }

  function handleRemove(origineId: string) {
    startTransition(async () => {
      try {
        await removeOrigine(origineId);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(message);
      }
    });
  }

  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-terre">
        {t("origins")}
      </h3>
      <div className="mt-2 h-px w-8 bg-or" />

      {/* Origines existantes */}
      {origines.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {origines.map((o) => (
            <LangueBadge
              key={o.id}
              nom={o.langue?.nom ?? o.ethnie?.nom ?? o.pays.nom}
              paysNom={o.langue || o.ethnie ? o.pays.nom : undefined}
              onRemove={() => handleRemove(o.id)}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ebene/40">{t("noOrigins")}</p>
      )}

      {/* Bouton ajouter */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 flex items-center gap-2 rounded-full border border-or/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
          type="button"
        >
          <Plus className="h-3.5 w-3.5" />
          {t("addOrigin")}
        </button>
      )}

      {/* Formulaire d'ajout en cascade */}
      {isAdding && (
        <div className="mt-4 rounded-2xl border border-or/10 bg-sable p-4 md:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Sélecteur Pays */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-ebene/60">
                {t("country")}
              </label>
              <select
                value={selectedPaysId}
                onChange={(e) => {
                  setSelectedPaysId(e.target.value);
                  setSelectedEthnieId("");
                  setSelectedLangueId("");
                }}
                className="w-full rounded-xl border border-or/20 bg-surface px-3 py-2.5 text-sm text-ebene focus:border-terre/40 focus:outline-none focus:ring-1 focus:ring-terre/20"
              >
                <option value="">{t("selectCountry")}</option>
                {paysList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Sélecteur Ethnie */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-ebene/60">
                {t("ethnicity")}
              </label>
              <select
                value={selectedEthnieId}
                onChange={(e) => {
                  setSelectedEthnieId(e.target.value);
                  setSelectedLangueId("");
                }}
                disabled={!selectedPaysId || ethniesList.length === 0}
                className={cn(
                  "w-full rounded-xl border border-or/20 bg-surface px-3 py-2.5 text-sm text-ebene focus:border-terre/40 focus:outline-none focus:ring-1 focus:ring-terre/20",
                  (!selectedPaysId || ethniesList.length === 0) &&
                    "cursor-not-allowed opacity-50",
                )}
              >
                <option value="">{t("selectEthnicity")}</option>
                {ethniesList.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Sélecteur Langue */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-ebene/60">
                {t("language")}
              </label>
              <select
                value={selectedLangueId}
                onChange={(e) => setSelectedLangueId(e.target.value)}
                disabled={!selectedPaysId || languesList.length === 0}
                className={cn(
                  "w-full rounded-xl border border-or/20 bg-surface px-3 py-2.5 text-sm text-ebene focus:border-terre/40 focus:outline-none focus:ring-1 focus:ring-terre/20",
                  (!selectedPaysId || languesList.length === 0) &&
                    "cursor-not-allowed opacity-50",
                )}
              >
                <option value="">{t("selectLanguage")}</option>
                {languesList.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.nom}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAdd}
              disabled={!selectedPaysId || isPending}
              className="flex items-center gap-2 rounded-full bg-terre px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90 disabled:opacity-50"
              type="button"
            >
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {t("confirmAdd")}
            </button>
            <button
              onClick={resetForm}
              className="rounded-full border border-or/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5"
              type="button"
            >
              {t("cancelAdd")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
