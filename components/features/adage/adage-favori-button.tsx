"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavori } from "@/app/(dashboard)/accueil/actions";
import { cn } from "@/lib/utils";

interface AdageFavoriButtonProps {
  quotidienId: string;
  favori: boolean;
  size?: "sm" | "md";
}

export function AdageFavoriButton({
  quotidienId,
  favori,
  size = "md",
}: AdageFavoriButtonProps) {
  const [isPending, startTransition] = useTransition();

  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const btnSize = size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await toggleFavori(quotidienId);
        });
      }}
      className={cn(
        "flex items-center justify-center rounded-full border transition-all disabled:opacity-50",
        favori
          ? "border-terre/20 bg-terre/5 text-terre"
          : "border-or/20 text-ebene/60 hover:bg-terre/5 hover:text-terre",
        btnSize,
      )}
    >
      <Heart className={cn(iconSize, favori && "fill-terre")} />
    </button>
  );
}
