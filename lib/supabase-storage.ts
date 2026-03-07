import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

/**
 * Client Supabase admin pour les opérations Storage côté serveur.
 * Utilise la clé service_role avec accès complet (jamais exposée côté client).
 */
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

/** Nom du bucket Supabase Storage pour les fichiers audio */
const AUDIO_BUCKET = "audio";

/** Types MIME audio autorisés */
const ALLOWED_AUDIO_TYPES = [
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/ogg",
  "audio/webm",
  "audio/aac",
  "audio/mp4",
] as const;

/** Taille maximum d'un fichier audio : 10 Mo */
const MAX_AUDIO_SIZE = 10 * 1024 * 1024;

/**
 * Upload un fichier audio vers Supabase Storage.
 * @returns L'URL publique du fichier uploadé
 */
export async function uploadAudio(file: File): Promise<string> {
  // Validation du type MIME
  if (
    !ALLOWED_AUDIO_TYPES.includes(
      file.type as (typeof ALLOWED_AUDIO_TYPES)[number],
    )
  ) {
    throw new Error(
      `Type de fichier non autorisé : ${file.type}. Types acceptés : MP3, WAV, OGG, WebM, AAC, MP4.`,
    );
  }

  // Validation de la taille
  if (file.size > MAX_AUDIO_SIZE) {
    throw new Error(
      `Fichier trop volumineux (${(file.size / 1024 / 1024).toFixed(1)} Mo). Maximum : 10 Mo.`,
    );
  }

  // Générer un nom de fichier unique avec timestamp + nom nettoyé
  const timestamp = Date.now();
  const safeName = file.name
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_+/g, "_");
  const filePath = `adages/${timestamp}-${safeName}`;

  const { error } = await supabase.storage
    .from(AUDIO_BUCKET)
    .upload(filePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Erreur upload audio : ${error.message}`);
  }

  // Récupérer l'URL publique
  const {
    data: { publicUrl },
  } = supabase.storage.from(AUDIO_BUCKET).getPublicUrl(filePath);

  return publicUrl;
}

/**
 * Supprime un fichier audio de Supabase Storage à partir de son URL publique.
 */
export async function deleteAudio(audioUrl: string): Promise<void> {
  // Extraire le chemin du fichier depuis l'URL publique
  // Format : https://<project>.supabase.co/storage/v1/object/public/audio/adages/...
  const urlParts = audioUrl.split(`/storage/v1/object/public/${AUDIO_BUCKET}/`);
  if (urlParts.length !== 2) {
    throw new Error("URL audio invalide — impossible d'extraire le chemin");
  }
  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from(AUDIO_BUCKET)
    .remove([filePath]);

  if (error) {
    throw new Error(`Erreur suppression audio : ${error.message}`);
  }
}
