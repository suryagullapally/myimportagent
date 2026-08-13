"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui";
import {
  AGENT_AVAILABILITY_OPTIONS,
  AGENT_JOBS,
  AGENT_PORTAL_PROFILE,
  getAgentAvailabilityStatusLabel,
  getAgentJobStatusLabel,
} from "@/lib/mock";
import type { AgentAvailabilityStatus } from "@/types";
import { AgentStatCard } from "./AgentStatCard";
import {
  AgentStatusBadge,
  getAgentAvailabilityStatusTone,
  getAgentJobStatusTone,
} from "./AgentStatusBadge";

export function AgentOverview() {
  const [availabilityStatus, setAvailabilityStatus] =
    useState<AgentAvailabilityStatus>("available");
  const [demoMessage, setDemoMessage] = useState("");

  const assignedJobs = AGENT_JOBS.length;
  const scheduledToday = AGENT_JOBS.filter((job) =>
    job.scheduledVisitDateTime.startsWith("13 Aug 2026"),
  ).length;
  const evidencePending = AGENT_JOBS.filter(
    (job) => job.status === "evidence-pending",
  ).length;
  const completedThisMonth = AGENT_JOBS.filter(
    (job) => job.status === "completed",
  ).length;
  const nextJob =
    AGENT_JOBS.find((job) => job.status !== "completed") ?? AGENT_JOBS[0];

  function handleStatusChange(status: AgentAvailabilityStatus) {
    // Future integration point: PATCH /api/agent/profile/status will persist
    // agent availability once Spring Security/JWT agent login is connected.
    setAvailabilityStatus(status);
    setDemoMessage(
      `Demo status changed to ${getAgentAvailabilityStatusLabel(status)} on this screen only.`,
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Agent overview
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          Assigned verification work
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          View assigned local verification jobs, upcoming visit details, and
          evidence tasks. This portal is frontend-only for now.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AgentStatCard
          hint="Local mock jobs assigned"
          label="Assigned jobs"
          value={String(assignedJobs)}
        />
        <AgentStatCard
          hint="Scheduled for 13 Aug 2026"
          label="Scheduled today"
          value={String(scheduledToday)}
        />
        <AgentStatCard
          hint="Visit result still needs evidence"
          label="Evidence pending"
          value={String(evidencePending)}
        />
        <AgentStatCard
          hint="Completed mock jobs in August"
          label="Completed this month"
          value={String(completedThisMonth)}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                Next assigned job
              </p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">
                {nextJob.exporter.businessName}
              </h3>
              <p className="mt-2 text-slate-600">
                {nextJob.exporter.city}, {nextJob.exporter.state}
              </p>
            </div>
            <AgentStatusBadge
              label={getAgentJobStatusLabel(nextJob.status)}
              tone={getAgentJobStatusTone(nextJob.status)}
            />
          </div>

          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            <InfoItem label="Booking reference" value={nextJob.bookingReference} />
            <InfoItem label="Package" value={nextJob.package.title} />
            <InfoItem label="Scheduled visit" value={nextJob.scheduledVisitDateTime} />
            <InfoItem
              label="Checklist"
              value={`${nextJob.instructions.checklistItems.length} items requested`}
            />
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-primary-dark"
              href={`/agent/jobs/${nextJob.id}`}
            >
              View next job
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
              href="/agent/jobs"
            >
              Go to My Jobs
            </Link>
          </div>
        </article>

        <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-950">
                Agent status
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                {AGENT_PORTAL_PROFILE.city}, {AGENT_PORTAL_PROFILE.state}
              </p>
            </div>
            <AgentStatusBadge
              label={getAgentAvailabilityStatusLabel(availabilityStatus)}
              tone={getAgentAvailabilityStatusTone(availabilityStatus)}
            />
          </div>

          <div className="mt-5 grid gap-2">
            {AGENT_AVAILABILITY_OPTIONS.map((option) => (
              <Button
                className="w-full justify-center"
                key={option.value}
                onClick={() => handleStatusChange(option.value)}
                variant={
                  option.value === availabilityStatus ? "primary" : "secondary"
                }
              >
                {option.label}
              </Button>
            ))}
          </div>

          {demoMessage && (
            <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm font-semibold text-amber-800">
              {demoMessage}
            </p>
          )}
        </aside>
      </section>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-bold text-slate-950">{value}</dd>
    </div>
  );
}
