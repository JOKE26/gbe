import { useTranslations } from "next-intl";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sable p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-ebene">Gbé</h1>
          <div className="mx-auto mt-2 h-px w-12 bg-or" />
        </div>
        {children}
      </div>
    </div>
  );
}
