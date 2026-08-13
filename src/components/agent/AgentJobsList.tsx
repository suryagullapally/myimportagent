"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BOOKING_PACKAGES } from "@/lib/constants";
import {
  AGENT_JOB_STATUS_OPTIONS,
  AGENT_JOBS,
  getAgentJobStatusLabel,
} from "@/lib/mock";
import {
  AgentStatusBadge,
  getAgentJobStatusTone,
} from "./AgentStatusBadge";

const allFilterValue = "all";

export function AgentJobsList() {
  const [statusFilter, setStatusFilter] = useState(allFilterValue);
  const [packageFilter, setPackageFilter] = useState(allFilterValue);
  const [locationFilter, setLocationFilter] = useState(allFilterValue);
  const [searchQuery, setSearchQuery] = useState("");

  const locationOptions = useMemo(
    () =>
      Array.from(
        new Set(
          AGENT_JOBS.map(
            (job) => `${job.exporter.city}, ${job.exporter.state}`,
          ),
        ),
      ).sort((first, second) => first.localeCompare(second)),
    [],
  );

  const filteredJobs = useMemo(() => {
    const normalisedSearch = searchQuery.trim().toLowerCase();

    return AGENT_JOBS.filter((job) => {
      const location = `${job.exporter.city}, ${job.exporter.state}`;
      const matchesStatus =
        statusFilter === allFilterValue || job.status === statusFilter;
      const matchesPackage =
        packageFilter === allFilterValue || job.package.id === packageFilter;
      const matchesLocation =
        locationFilter === allFilterValue || location === locationFilter;
      const searchableText = [
        job.bookingReference,
        job.exporter.businessName,
        job.exporter.city,
        job.exporter.state,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalisedSearch.length === 0 ||
        searchableText.includes(normalisedSearch);

      return (
        matchesStatus && matchesPackage && matchesLocation && matchesSearch
      );
    });
  }, [locationFilter, packageFilter, searchQuery, statusFilter]);

  function resetFilters() {
    setStatusFilter(allFilterValue);
    setPackageFilter(allFilterValue);
    setLocationFilter(allFilterValue);
    setSearchQuery("");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          My jobs
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          Assigned verification jobs
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Filter local mock jobs by status, package, location, or search text.
          Later this page will read from GET /api/agent/jobs.
        </p>
      </div>

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Search</span>
            <input
              className={fieldClassName}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Reference or exporter..."
              type="search"
              value={searchQuery}
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Job status</span>
            <select
              className={fieldClassName}
              onChange={(event) => setStatusFilter(event.target.value)}
              value={statusFilter}
            >
              <option value={allFilterValue}>All statuses</option>
              {AGENT_JOB_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Package</span>
            <select
              className={fieldClassName}
              onChange={(event) => setPackageFilter(event.target.value)}
              value={packageFilter}
            >
              <option value={allFilterValue}>All packages</option>
              {BOOKING_PACKAGES.map((bookingPackage) => (
                <option key={bookingPackage.id} value={bookingPackage.id}>
                  {bookingPackage.title}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">City/state</span>
            <select
              className={fieldClassName}
              onChange={(event) => setLocationFilter(event.target.value)}
              value={locationFilter}
            >
              <option value={allFilterValue}>All locations</option>
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>

          <button
            className="mt-6 min-h-12 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50"
            onClick={resetFilters}
            type="button"
          >
            Reset
          </button>
        </div>
      </section>

      <p className="text-sm font-semibold text-slate-600">
        Showing {filteredJobs.length} of {AGENT_JOBS.length} mock jobs.
      </p>

      <div className="grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <article
              className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              key={job.id}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-xl font-black text-slate-950">
                      {job.exporter.businessName}
                    </h3>
                    <AgentStatusBadge
                      label={getAgentJobStatusLabel(job.status)}
                      tone={getAgentJobStatusTone(job.status)}
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {job.bookingReference}
                  </p>
                  <p className="mt-3 text-slate-600">
                    {job.exporter.city}, {job.exporter.state}
                  </p>
                </div>

                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  href={`/agent/jobs/${job.id}`}
                >
                  View job
                </Link>
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <JobMeta label="Package" value={job.package.title} />
                <JobMeta label="Scheduled visit" value={job.scheduledVisitDateTime} />
                <JobMeta
                  label="Checklist summary"
                  value={`${job.instructions.checklistItems.length} requested checks`}
                />
              </dl>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.instructions.checklistItems.slice(0, 4).map((item) => (
                  <span
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
            No mock jobs match these filters.
          </div>
        )}
      </div>
    </div>
  );
}

const fieldClassName =
  "mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100";

function JobMeta({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-bold text-slate-950">{value}</dd>
    </div>
  );
}
