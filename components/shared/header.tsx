"use client";

import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

interface HeaderProps {
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
}

export function Header({ user }: HeaderProps) {
  const t = useTranslations("nav");

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email[0].toUpperCase();

  return (
    <header className="flex h-16 items-center justify-between border-b border-or/10 bg-surface px-4 md:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile logo */}
        <span className="font-serif text-xl font-bold text-ebene md:hidden">
          Gbé
        </span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 rounded-full p-1 transition-all hover:bg-terre/5">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={user.image ?? undefined}
                alt={user.name ?? ""}
              />
              <AvatarFallback className="bg-terre text-xs text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm text-ebene md:inline">
              {user.name ?? user.email}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <a href="/profil" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {t("profile")}
            </a>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-destructive"
          >
            <LogOut className="h-4 w-4" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
