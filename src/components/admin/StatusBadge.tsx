import type {
  AdminAgentStatus,
  AdminBookingStatus,
  AdminPaymentStatus,
} from "@/types";
import { cn } from "@/lib/utils";

type StatusTone = "amber" | "emerald" | "rose" | "sky" | "slate" | "violet";

type StatusBadgeProps = Readonly<{
  label: string;
  tone?: StatusTone;
}>;

const toneClasses: Record<StatusTone, string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  rose: "border-rose-200 bg-rose-50 text-rose-800",
  sky: "border-sky-200 bg-sky-50 text-sky-800",
  slate: "border-slate-200 bg-slate-100 text-slate-700",
  violet: "border-violet-200 bg-violet-50 text-violet-800",
};

export function StatusBadge({ label, tone = "slate" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-xs font-bold",
        toneClasses[tone],
      )}
    >
      {label}
    </span>
  );
}

export function getBookingStatusTone(status: AdminBookingStatus): StatusTone {
  if (status === "completed") {
    return "emerald";
  }

  if (status === "cancelled") {
    return "rose";
  }

  if (status === "in-progress") {
    return "sky";
  }

  if (status === "agent-assigned" || status === "report-pending") {
    return "violet";
  }

  return "amber";
}

export function getPaymentStatusTone(status: AdminPaymentStatus): StatusTone {
  if (status === "paid-placeholder") {
    return "emerald";
  }

  if (status === "refunded-placeholder") {
    return "rose";
  }

  if (status === "payment-link-pending") {
    return "amber";
  }

  return "slate";
}

export function getAgentStatusTone(status: AdminAgentStatus): StatusTone {
  if (status === "available") {
    return "emerald";
  }

  if (status === "busy") {
    return "amber";
  }

  return "slate";
}
