import { cn } from "@/lib/utils";
import type { AgentAvailabilityStatus, AgentJobStatus } from "@/types";

type AgentStatusTone = "amber" | "emerald" | "rose" | "sky" | "slate" | "violet";

type AgentStatusBadgeProps = Readonly<{
  label: string;
  tone?: AgentStatusTone;
}>;

const toneClasses: Record<AgentStatusTone, string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-800",
  rose: "border-rose-200 bg-rose-50 text-rose-800",
  sky: "border-sky-200 bg-sky-50 text-sky-800",
  slate: "border-slate-200 bg-slate-100 text-slate-700",
  violet: "border-violet-200 bg-violet-50 text-violet-800",
};

export function AgentStatusBadge({
  label,
  tone = "slate",
}: AgentStatusBadgeProps) {
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

export function getAgentJobStatusTone(status: AgentJobStatus): AgentStatusTone {
  if (status === "completed" || status === "submitted") {
    return "emerald";
  }

  if (status === "visit-failed") {
    return "rose";
  }

  if (status === "in-progress") {
    return "sky";
  }

  if (status === "evidence-pending") {
    return "violet";
  }

  return "amber";
}

export function getAgentAvailabilityStatusTone(
  status: AgentAvailabilityStatus,
): AgentStatusTone {
  if (status === "available") {
    return "emerald";
  }

  if (status === "busy") {
    return "amber";
  }

  return "slate";
}
