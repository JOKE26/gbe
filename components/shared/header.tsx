"use client";

import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/user-avatar";
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
            <UserAvatar user={user} size="sm" />
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
