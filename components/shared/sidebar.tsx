"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  User,
  Languages,
  Heart,
  Clock,
  Settings,
  ShieldCheck,
  Scale,
  LogOut,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/accueil", icon: BookOpen, labelKey: "home" as const },
  {
    href: "/accueil/historique",
    icon: Clock,
    labelKey: "history" as const,
  },
  {
    href: "/accueil/favoris",
    icon: Heart,
    labelKey: "favorites" as const,
  },
  { href: "/profil", icon: User, labelKey: "profile" as const },
  {
    href: "/contributions",
    icon: Languages,
    labelKey: "contributions" as const,
  },
  { href: "/parametres", icon: Settings, labelKey: "settings" as const },
];

const ADMIN_ITEMS = [
  { href: "/admin/adages", icon: ShieldCheck, labelKey: "admin" as const },
  { href: "/admin/moderation", icon: Scale, labelKey: "moderation" as const },
];

interface SidebarProps {
  isAdmin?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  user?: {
    name?: string | null;
    email: string;
  };
}

export function Sidebar({
  isAdmin = false,
  isOpen = false,
  onClose,
  user,
}: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  const initials = user?.name
    ? user.name
        .split(" ")
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : (user?.email?.charAt(0).toUpperCase() ?? "?");
  const displayName = user?.name ?? user?.email ?? "";

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-or/20 bg-surface transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/accueil" className="flex items-center gap-2">
            <Image
              src="/logo-gbe.png"
              alt="Gbé"
              width={380}
              height={64}
              className="h-35 w-auto"
              priority
            />
          </Link>
          <button type="button" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5 text-ebene/60" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-1 flex-1 space-y-2 px-4">
          {[...NAV_ITEMS, ...(isAdmin ? ADMIN_ITEMS : [])].map((item) => {
            const isActive =
              item.href === "/accueil"
                ? pathname === "/accueil"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-all duration-300",
                  isActive
                    ? "bg-sable text-terre"
                    : "text-ebene/60 hover:bg-sable/50 hover:text-ebene",
                )}
              >
                <item.icon
                  className="h-5 w-5"
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="uppercase tracking-widest">
                  {t(item.labelKey)}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* User footer — entire zone triggers logout */}
        <div className="mt-auto border-t border-or/10 p-6">
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group flex w-full cursor-pointer items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-sable"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-terre/20 bg-terre/10 text-sm font-bold text-terre">
              {initials}
            </div>
            <div className="min-w-0 flex-1 text-left">
              <p className="truncate text-sm font-bold text-ebene">
                {displayName}
              </p>
            </div>
            <LogOut className="h-4 w-4 text-ebene/30 transition-colors group-hover:text-terre" />
          </button>
        </div>
      </aside>
    </>
  );
}
