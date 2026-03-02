import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  className,
  children,
}: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-ebene md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-ebene/50">{description}</p>
          )}
        </div>
        {children && <div>{children}</div>}
      </div>
      <div className="mt-4 h-px w-12 bg-or" />
    </div>
  );
}
