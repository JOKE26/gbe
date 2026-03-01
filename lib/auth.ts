import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/generated/prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // SAFETY: PrismaAdapter has minor @auth/core version mismatch — safe to cast
  adapter: PrismaAdapter(prisma) as ReturnType<typeof PrismaAdapter>,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.EMAIL_FROM ?? "Gbé <onboarding@resend.dev>",
    }),
  ],
  session: {
    strategy: "database",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // SAFETY: user from DB has role field added by Prisma schema
        session.user.role = (user as unknown as { role: Role }).role;
      }
      return session;
    },
  },
});
