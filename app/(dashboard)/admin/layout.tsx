import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Layout admin — protège toutes les pages /admin/* par vérification du rôle.
 * Seuls les ADMIN et MODERATOR y ont accès. Les autres sont redirigés vers /accueil.
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "MODERATOR") {
    redirect("/accueil");
  }

  return <>{children}</>;
}
