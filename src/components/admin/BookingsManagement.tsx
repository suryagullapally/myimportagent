"use client";

import { useMemo, useState } from "react";
import { BOOKING_PACKAGES } from "@/lib/constants";
import {
  ADMIN_BOOKING_STATUS_OPTIONS,
  ADMIN_BOOKINGS,
} from "@/lib/mock";
import { BookingsTable } from "./BookingsTable";

const allFilterValue = "all";

export function BookingsManagement() {
  const [statusFilter, setStatusFilter] = useState(allFilterValue);
  const [packageFilter, setPackageFilter] = useState(allFilterValue);
  const [stateFilter, setStateFilter] = useState(allFilterValue);
  const [searchQuery, setSearchQuery] = useState("");

  const stateOptions = useMemo(
    () =>
      Array.from(new Set(ADMIN_BOOKINGS.map((booking) => booking.exporter.state)))
        .sort((first, second) => first.localeCompare(second)),
    [],
  );

  const filteredBookings = useMemo(() => {
    const normalisedSearch = searchQuery.trim().toLowerCase();

    return ADMIN_BOOKINGS.filter((booking) => {
      const matchesStatus =
        statusFilter === allFilterValue || booking.status === statusFilter;
      const matchesPackage =
        packageFilter === allFilterValue || booking.package.id === packageFilter;
      const matchesState =
        stateFilter === allFilterValue || booking.exporter.state === stateFilter;
      const searchableText = [
        booking.reference,
        booking.importer.fullName,
        booking.importer.companyName,
        booking.exporter.businessName,
        booking.exporter.city,
        booking.exporter.state,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalisedSearch.length === 0 ||
        searchableText.includes(normalisedSearch);

      return matchesStatus && matchesPackage && matchesState && matchesSearch;
    });
  }, [packageFilter, searchQuery, stateFilter, statusFilter]);

  function resetFilters() {
    setStatusFilter(allFilterValue);
    setPackageFilter(allFilterValue);
    setStateFilter(allFilterValue);
    setSearchQuery("");
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Booking requests
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          Manage customer bookings
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Filter local mock bookings by status, package, exporter state, or a
          quick search. Later this page will read from GET /api/admin/bookings.
        </p>
      </div>

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1fr_auto]">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Search</span>
            <input
              className={fieldClassName}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Reference, customer, exporter..."
              type="search"
              value={searchQuery}
            />
          </label>

          <label className="block">
            <span className="text-sm font-bold text-slate-700">Status</span>
            <select
              className={fieldClassName}
              onChange={(event) => setStatusFilter(event.target.value)}
              value={statusFilter}
            >
              <option value={allFilterValue}>All statuses</option>
              {ADMIN_BOOKING_STATUS_OPTIONS.map((option) => (
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
            <span className="text-sm font-bold text-slate-700">State</span>
            <select
              className={fieldClassName}
              onChange={(event) => setStateFilter(event.target.value)}
              value={stateFilter}
            >
              <option value={allFilterValue}>All states</option>
              {stateOptions.map((state) => (
                <option key={state} value={state}>
                  {state}
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

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-600">
          Showing {filteredBookings.length} of {ADMIN_BOOKINGS.length} mock
          booking requests.
        </p>
      </div>

      <BookingsTable bookings={filteredBookings} />
    </div>
  );
}

const fieldClassName =
  "mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100";
