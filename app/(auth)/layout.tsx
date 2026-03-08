import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sable p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="/logo-gbe.png"
            alt="Gbé"
            width={400}
            height={64}
            className="h-35 w-auto"
            priority
          />
          <div className="mt-3 h-px w-12 bg-or" />
        </div>
        {children}
      </div>
    </div>
  );
}
