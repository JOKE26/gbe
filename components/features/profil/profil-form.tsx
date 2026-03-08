"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { updateProfile } from "@/app/(dashboard)/profil/actions";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Loader2, Check } from "lucide-react";
import type { ProfileInput } from "@/lib/validators";

interface LangueOption {
  id: string;
  nom: string;
}

interface ProfilFormProps {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
  profile: {
    bio?: string | null;
    preferredLangueId?: string | null;
  } | null;
  langues: LangueOption[];
}

export function ProfilForm({ user, profile, langues }: ProfilFormProps) {
  const t = useTranslations("dashboard.profil");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(user.name ?? "");
  const [bio, setBio] = useState(profile?.bio ?? "");
  const [preferredLangueId, setPreferredLangueId] = useState(
    profile?.preferredLangueId ?? "",
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const input: ProfileInput = {
      name,
      bio: bio || undefined,
      preferredLangueId: preferredLangueId || undefined,
    };

    startTransition(async () => {
      try {
        const result = await updateProfile(input);
        setSuccess(true);
        if (result.langueChanged) {
          setSuccessMessage(t("adageRefreshed"));
          // Naviguer vers /accueil pour que l'utilisateur voie immédiatement
          // le nouvel adage dans sa nouvelle langue préférée
          router.push("/accueil");
          return;
        } else {
          setSuccessMessage(t("saveSuccess"));
        }
        setTimeout(() => setSuccess(false), 5000);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Une erreur est survenue";
        setError(message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar + Email (lecture seule) */}
      <div className="flex items-center gap-4">
        <UserAvatar user={user} size="lg" />
        <div>
          <p className="font-serif text-lg font-bold text-ebene">
            {user.name ?? user.email}
          </p>
          <p className="text-sm text-ebene/50">{user.email}</p>
        </div>
      </div>

      <div className="h-px bg-or/10" />

      {/* Nom */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-ebene/60"
        >
          {t("nameLabel")}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-or/20 bg-surface px-4 py-2.5 text-sm text-ebene focus:border-terre/40 focus:outline-none focus:ring-1 focus:ring-terre/20"
          required
          minLength={2}
          maxLength={100}
        />
      </div>

      {/* Bio */}
      <div>
        <label
          htmlFor="bio"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-ebene/60"
        >
          {t("bioLabel")}
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          maxLength={500}
          className="w-full rounded-xl border border-or/20 bg-surface px-4 py-2.5 text-sm text-ebene focus:border-terre/40 focus:outline-none focus:ring-1 focus:ring-terre/20"
          placeholder={t("bioPlaceholder")}
        />
        <p className="mt-1 text-right text-xs text-ebene/30">
          {bio.length}/500
        </p>
      </div>

      {/* Langue préférée */}
      <div>
        <label
          htmlFor="preferredLangue"
          className="mb-1.5 block text-xs font-bold uppercase tracking-[0.2em] text-ebene/60"
        >
          {t("preferredLanguage")}
        </label>
        <select
          id="preferredLangue"
          value={preferredLangueId}
          onChange={(e) => setPreferredLangueId(e.target.value)}
          className="w-full rounded-xl border border-or/20 bg-surface px-3 py-2.5 text-sm text-ebene focus:border-terre/40 focus:outline-none focus:ring-1 focus:ring-terre/20"
        >
          <option value="">{t("noPreference")}</option>
          {langues.map((l) => (
            <option key={l.id} value={l.id}>
              {l.nom}
            </option>
          ))}
        </select>
      </div>

      {/* Erreur / Succès */}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && (
        <div className="flex items-center gap-2 text-sm text-baobab">
          <Check className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      {/* Bouton soumettre */}
      <button
        type="submit"
        disabled={isPending || !name.trim()}
        className="flex items-center gap-2 rounded-full bg-terre px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90 disabled:opacity-50"
      >
        {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {t("saveButton")}
      </button>
    </form>
  );
}
