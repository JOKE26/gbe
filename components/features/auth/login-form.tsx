"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function LoginForm() {
  const t = useTranslations("auth.login");
  const [email, setEmail] = useState("");
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  function handleGoogle() {
    setIsLoadingGoogle(true);
    signIn("google", { callbackUrl: "/accueil" });
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoadingEmail(true);
    await signIn("resend", {
      email,
      callbackUrl: "/accueil",
      redirect: false,
    });
    setIsLoadingEmail(false);
    setEmailSent(true);
  }

  if (emailSent) {
    return (
      <div className="rounded-2xl border border-or/10 bg-surface p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-baobab/10">
          <svg
            className="h-6 w-6 text-baobab"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </div>
        <h2 className="font-serif text-xl font-bold text-ebene">
          {t("checkEmail")}
        </h2>
        <p className="mt-2 text-sm text-ebene/50">{t("checkEmailSubtitle")}</p>
        <button
          onClick={() => setEmailSent(false)}
          className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-terre transition-colors hover:text-terre/70"
        >
          {t("retry")}
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-or/10 bg-surface p-8">
      <h2 className="font-serif text-xl font-bold text-ebene">{t("title")}</h2>
      <p className="mt-1 text-sm text-ebene/50">{t("subtitle")}</p>
      <div className="mt-4 h-px w-8 bg-or" />

      {/* Google */}
      <div className="mt-6">
        <button
          onClick={handleGoogle}
          disabled={isLoadingGoogle}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-or/20 bg-surface px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-ebene transition-all hover:bg-or/5 disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {isLoadingGoogle ? "..." : t("google")}
        </button>
      </div>

      {/* Séparateur */}
      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-or/10" />
        <span className="text-xs text-ebene/40">{t("or")}</span>
        <div className="h-px flex-1 bg-or/10" />
      </div>

      {/* Magic Link */}
      <form onSubmit={handleMagicLink} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("emailPlaceholder")}
          required
          className="w-full rounded-full border border-or/20 bg-sable px-6 py-3 text-sm text-ebene placeholder:text-ebene/30 focus:border-terre/40 focus:outline-none focus:ring-1 focus:ring-terre/20"
        />
        <button
          type="submit"
          disabled={isLoadingEmail || !email.trim()}
          className="w-full rounded-full bg-terre px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-terre/90 disabled:opacity-50"
        >
          {isLoadingEmail ? "..." : t("magicLink")}
        </button>
      </form>

      {/* Lien inscription */}
      <p className="mt-6 text-center text-xs text-ebene/50">
        {t("noAccount")}{" "}
        <Link
          href="/register"
          className="font-bold text-terre transition-colors hover:text-terre/70"
        >
          {t("signUp")}
        </Link>
      </p>
    </div>
  );
}
