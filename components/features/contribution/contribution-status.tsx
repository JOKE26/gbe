import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

type Status = "PENDING" | "APPROVED" | "REJECTED";

interface ContributionStatusProps {
  status: Status;
  className?: string;
}

const STATUS_CONFIG: Record<
  Status,
  { icon: typeof Clock; colorClass: string; key: string }
> = {
  PENDING: {
    icon: Clock,
    colorClass: "bg-or/10 text-or border-or/20",
    key: "pending",
  },
  APPROVED: {
    icon: CheckCircle2,
    colorClass: "bg-baobab/10 text-baobab border-baobab/20",
    key: "approved",
  },
  REJECTED: {
    icon: XCircle,
    colorClass: "bg-terre/10 text-terre border-terre/20",
    key: "rejected",
  },
};

export function ContributionStatus({
  status,
  className,
}: ContributionStatusProps) {
  const t = useTranslations("dashboard.contributions.status");
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.colorClass,
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {t(config.key)}
    </span>
  );
}
