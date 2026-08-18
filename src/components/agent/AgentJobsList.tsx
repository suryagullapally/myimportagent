"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { BOOKING_PACKAGES } from "@/lib/constants";
import {
  getAgentJobs,
  type AgentJobListItem,
} from "@/lib/api/agentJobs";
import { formatGbp } from "@/lib/utils/pricing";

const allFilterValue = "all";
const temporaryAgentId = "agent-hyderabad-1494";

export function AgentJobsList() {
  const [jobs, setJobs] = useState<AgentJobListItem[]>([]);
  const [statusFilter, setStatusFilter] = useState(allFilterValue);
  const [packageFilter, setPackageFilter] = useState(allFilterValue);
  const [locationFilter, setLocationFilter] = useState(allFilterValue);
  const [searchQuery, setSearchQuery] = useState("");
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

  const statusOptions = useMemo(
    () =>
      Array.from(new Set(jobs.map((job) => job.status)))
        .filter(Boolean)
        .sort((first, second) => first.localeCompare(second)),
    [jobs],
  );

  const locationOptions = useMemo(
    () =>
      Array.from(
        new Set(jobs.map((job) => `${job.exporterCity}, ${job.exporterState}`)),
      ).sort((first, second) => first.localeCompare(second)),
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    const normalisedSearch = searchQuery.trim().toLowerCase();

    return jobs.filter((job) => {
      const location = `${job.exporterCity}, ${job.exporterState}`;

      const matchesStatus =
        statusFilter === allFilterValue || job.status === statusFilter;

      const matchesPackage =
        packageFilter === allFilterValue || job.packageId === packageFilter;

      const matchesLocation =
        locationFilter === allFilterValue || location === locationFilter;

      const searchableText = [
        job.bookingReference,
        job.importerEmail,
        job.exporterCity,
        job.exporterState,
        job.packageId,
        getPackageTitle(job.packageId),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalisedSearch.length === 0 ||
        searchableText.includes(normalisedSearch);

      return matchesStatus && matchesPackage && matchesLocation && matchesSearch;
    });
  }, [jobs, locationFilter, packageFilter, searchQuery, statusFilter]);

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
          This page now reads assigned jobs from PostgreSQL through the Java
          Spring Boot backend.
        </p>
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Temporary test agent: {temporaryAgentId}
        </p>
      </div>

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1fr_auto_auto]">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Search</span>
            <input
              className={fieldClassName}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Reference, email, city..."
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
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {formatLabel(status)}
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

          <button
            className="mt-6 min-h-12 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-100"
            onClick={loadJobs}
            type="button"
          >
            Refresh
          </button>
        </div>
      </section>

      {errorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">
          {errorMessage}
        </div>
      )}

      <p className="text-sm font-semibold text-slate-600">
        {isLoading
          ? "Loading assigned jobs from backend..."
          : `Showing ${filteredJobs.length} of ${jobs.length} assigned jobs.`}
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
                      {job.exporterCity}, {job.exporterState}
                    </h3>
                    <span className={getStatusClassName(job.status)}>
                      {formatLabel(job.status)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-slate-500">
                    {job.bookingReference}
                  </p>
                  <p className="mt-3 text-slate-600">
                    Importer: {job.importerEmail}
                  </p>
                </div>

                <Link
                  className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                  href={`/agent/jobs/${encodeURIComponent(
                    job.bookingReference,
                  )}`}
                >
                  View job
                </Link>
              </div>

              <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <JobMeta label="Package" value={getPackageTitle(job.packageId)} />
                <JobMeta label="Import value" value={formatGbp(job.importValueGbp)} />
                <JobMeta
                  label="Final estimate"
                  value={formatGbp(job.finalEstimatedPriceGbp)}
                />
                <JobMeta label="Created" value={formatDate(job.createdAt)} />
              </dl>
            </article>
          ))
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
            {isLoading
              ? "Loading jobs..."
              : "No assigned jobs match these filters."}
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

function getPackageTitle(packageId: string) {
  return (
    BOOKING_PACKAGES.find((bookingPackage) => bookingPackage.id === packageId)
      ?.title ?? packageId
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