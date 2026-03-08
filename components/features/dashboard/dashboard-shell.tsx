"use client";

import { useState } from "react";
import { Sidebar } from "@/components/shared/sidebar";
import { Header } from "@/components/shared/header";
import { RightPanel } from "@/components/features/dashboard/right-panel";

interface DashboardShellProps {
  children: React.ReactNode;
  isAdmin: boolean;
  user: {
    name?: string | null;
    email: string;
    image?: string | null;
  };
  stats?: {
    totalProverbs: number;
    activeLanguages: number;
    totalFavoris: number;
    currentStreak: number;
  };
}

export function DashboardShell({
  children,
  isAdmin,
  user,
  stats,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-sable">
      {/* Sidebar — fixed left */}
      <Sidebar
        isAdmin={isAdmin}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      {/* Right panel — fixed right, xl only */}
      <RightPanel stats={stats} />

      {/* Main content area — offset by sidebar and right panel */}
      <div className="lg:pl-64 xl:pr-80">
        <Header
          user={user}
          onMenuToggle={() => setSidebarOpen(true)}
          streak={stats?.currentStreak}
        />
        <main className="px-6 pb-12 md:px-10">{children}</main>

        {/* Mini footer */}
        <footer className="px-6 pb-8 md:px-10">
          <div className="flex items-center justify-between border-t border-or/10 pt-6">
            <p className="text-xs text-ebene/30">
              © {new Date().getFullYear()} Gbé
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
