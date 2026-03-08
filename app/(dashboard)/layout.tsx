import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardShell } from "@/components/features/dashboard/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const isAdmin =
    session.user.role === "ADMIN" || session.user.role === "MODERATOR";

  // Fetch quick stats for the right panel (with fallback if DB unavailable)
  let totalProverbs = 0;
  let activeLanguages = 0;
  let totalFavoris = 0;
  let currentStreak = 0;

  try {
    [totalProverbs, activeLanguages, totalFavoris, currentStreak] =
      await Promise.all([
        prisma.adageQuotidien.count({
          where: { userId: session.user.id, lu: true },
        }),
        prisma.userOrigine
          .findMany({
            where: {
              profile: { userId: session.user.id },
              langueId: { not: null },
            },
            select: { langueId: true },
            distinct: ["langueId"],
          })
          .then((r) => r.length),
        prisma.adageQuotidien.count({
          where: { userId: session.user.id, favori: true },
        }),
        // Simplified streak: count consecutive days with read adages ending today
        prisma.adageQuotidien
          .findMany({
            where: { userId: session.user.id, lu: true },
            orderBy: { date: "desc" },
            select: { date: true },
            take: 60,
          })
          .then((rows) => {
            let streak = 0;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            for (let i = 0; i < rows.length; i++) {
              const expected = new Date(today);
              expected.setDate(expected.getDate() - i);
              const rowDate = new Date(rows[i].date);
              rowDate.setHours(0, 0, 0, 0);
              if (rowDate.getTime() === expected.getTime()) {
                streak++;
              } else {
                break;
              }
            }
            return streak;
          }),
      ]);
  } catch (error) {
    console.error("[DashboardLayout] Failed to fetch stats:", error);
  }

  return (
    <DashboardShell
      isAdmin={isAdmin}
      user={session.user}
      stats={{ totalProverbs, activeLanguages, totalFavoris, currentStreak }}
    >
      {children}
    </DashboardShell>
  );
}
