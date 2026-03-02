"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Home, User, BookOpen, Settings, ShieldCheck } from "lucide-react";

const NAV_ITEMS = [
  { href: "/accueil", icon: Home, labelKey: "home" as const },
  { href: "/profil", icon: User, labelKey: "profile" as const },
  {
    href: "/contributions",
    icon: BookOpen,
    labelKey: "contributions" as const,
  },
  { href: "/parametres", icon: Settings, labelKey: "settings" as const },
];

const ADMIN_ITEMS = [
  { href: "/admin/adages", icon: ShieldCheck, labelKey: "admin" as const },
];

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <aside className="hidden w-66 shrink-0 border-r border-or/10 bg-surface md:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <Link
            href="/accueil"
            className="font-serif text-2xl font-bold text-ebene"
          >
            Gbé
          </Link>
        </div>

        <div className="mx-6 h-px bg-or/10" />

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {[...NAV_ITEMS, ...(isAdmin ? ADMIN_ITEMS : [])].map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                  isActive
                    ? "bg-terre/6 font-medium text-terre"
                    : "text-ebene/60 hover:bg-terre/4 hover:text-ebene",
                )}
              >
                <item.icon className="h-5 w-5" />
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        {/* Footer sidebar */}
        <div className="border-t border-or/10 px-6 py-4">
          <p className="text-xs text-ebene/40">
            © {new Date().getFullYear()} Gbé
          </p>
        </div>
      </div>
    </aside>
  );
}
