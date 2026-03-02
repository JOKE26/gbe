import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface LangueBadgeProps {
  nom: string;
  paysNom?: string;
  onRemove?: () => void;
  className?: string;
}

export function LangueBadge({
  nom,
  paysNom,
  onRemove,
  className,
}: LangueBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-or/15 bg-or/5 px-3 py-1.5 text-xs font-medium text-ebene transition-all",
        onRemove && "pr-1.5",
        className,
      )}
    >
      <span className="font-serif font-bold">{nom}</span>
      {paysNom && <span className="text-ebene/40">· {paysNom}</span>}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 rounded-full p-0.5 text-ebene/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
          type="button"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
