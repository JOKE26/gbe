import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sable">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-ebene/50">Chargement…</p>
      </div>
    </div>
  );
}
