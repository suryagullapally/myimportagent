"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  getAgentJobs,
  type AgentJobListItem,
} from "@/lib/api/agentJobs";
import { AgentStatCard } from "./AgentStatCard";

const temporaryAgentId = "agent-hyderabad-1494";

export function AgentOverview() {
  const [jobs, setJobs] = useState<AgentJobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getAgentJobs(temporaryAgentId);
      setJobs(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not load assigned jobs from the backend.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const assignedJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status !== "completed").length;
  const completedJobs = jobs.filter((job) => job.status === "completed").length;

  const nextJob = useMemo(
    () => jobs.find((job) => job.status !== "completed") ?? jobs[0],
    [jobs],
  );

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
          View assigned verification jobs from PostgreSQL through the Java
          Spring Boot backend.
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Temporary test agent: {temporaryAgentId}
        </p>
      </section>

      {errorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">
          {errorMessage}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AgentStatCard
          hint="Jobs assigned to this agent"
          label="Assigned jobs"
          value={isLoading ? "..." : String(assignedJobs)}
        />
        <AgentStatCard
          hint="Not completed yet"
          label="Active jobs"
          value={isLoading ? "..." : String(activeJobs)}
        />
        <AgentStatCard
          hint="Completed status"
          label="Completed jobs"
          value={isLoading ? "..." : String(completedJobs)}
        />
        <AgentStatCard
          hint="Temporary test identity"
          label="Agent ID"
          value="1494"
        />
      </section>

      {nextJob ? (
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
                  Next assigned job
                </p>
                <h3 className="mt-2 text-2xl font-black text-slate-950">
                  {nextJob.exporterCity}, {nextJob.exporterState}
                </h3>
                <p className="mt-2 text-slate-600">
                  {nextJob.bookingReference}
                </p>
              </div>
              <span className={getStatusClassName(nextJob.status)}>
                {formatLabel(nextJob.status)}
              </span>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <InfoItem label="Booking reference" value={nextJob.bookingReference} />
              <InfoItem label="Package" value={nextJob.packageId} />
              <InfoItem label="Importer" value={nextJob.importerEmail} />
              <InfoItem label="Created" value={formatDate(nextJob.createdAt)} />
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-primary-dark"
                href={`/agent/jobs/${encodeURIComponent(
                  nextJob.bookingReference,
                )}`}
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
            <h3 className="text-xl font-bold text-slate-950">
              Agent status
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Availability update will be connected later after agent
              authentication.
            </p>

            <button
              className="mt-5 min-h-12 w-full rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-100"
              onClick={loadJobs}
              type="button"
            >
              Refresh assigned jobs
            </button>
          </aside>
        </section>
      ) : (
        <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
          {isLoading
            ? "Loading assigned jobs..."
            : "No jobs are assigned to this test agent yet."}
        </div>
      )}
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

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

function formatLabel(value: string) {
  return value
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getStatusClassName(status: string) {
  const baseClassName =
    "inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]";

  if (status === "assigned") {
    return `${baseClassName} border-violet-200 bg-violet-50 text-violet-800`;
  }

  if (status === "in-review") {
    return `${baseClassName} border-sky-200 bg-sky-50 text-sky-800`;
  }

  if (status === "completed") {
    return `${baseClassName} border-emerald-200 bg-emerald-50 text-emerald-800`;
  }

  return `${baseClassName} border-slate-200 bg-slate-50 text-slate-700`;
}