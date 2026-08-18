"use client";

import { useEffect, useMemo, useState } from "react";
import { BOOKING_PACKAGES } from "@/lib/constants";
import {
  getAdminBookings,
  type AdminBookingListItem,
} from "@/lib/api/adminBookings";
import { BookingsTable } from "./BookingsTable";

const allFilterValue = "all";

export function BookingsManagement() {
  const [bookings, setBookings] = useState<AdminBookingListItem[]>([]);
  const [statusFilter, setStatusFilter] = useState(allFilterValue);
  const [packageFilter, setPackageFilter] = useState(allFilterValue);
  const [stateFilter, setStateFilter] = useState(allFilterValue);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getAdminBookings();
      setBookings(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not load bookings from the backend.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const statusOptions = useMemo(
    () =>
      Array.from(new Set(bookings.map((booking) => booking.status)))
        .filter(Boolean)
        .sort((first, second) => first.localeCompare(second)),
    [bookings],
  );

  const stateOptions = useMemo(
    () =>
      Array.from(new Set(bookings.map((booking) => booking.exporterState)))
        .filter(Boolean)
        .sort((first, second) => first.localeCompare(second)),
    [bookings],
  );

  const filteredBookings = useMemo(() => {
    const normalisedSearch = searchQuery.trim().toLowerCase();

    return bookings.filter((booking) => {
      const packageTitle = getPackageTitle(booking.packageId);

      const matchesStatus =
        statusFilter === allFilterValue || booking.status === statusFilter;

      const matchesPackage =
        packageFilter === allFilterValue || booking.packageId === packageFilter;

      const matchesState =
        stateFilter === allFilterValue || booking.exporterState === stateFilter;

      const searchableText = [
        booking.bookingReference,
        booking.importerEmail,
        booking.exporterCity,
        booking.exporterState,
        booking.packageId,
        packageTitle,
        booking.status,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalisedSearch.length === 0 ||
        searchableText.includes(normalisedSearch);

      return matchesStatus && matchesPackage && matchesState && matchesSearch;
    });
  }, [bookings, packageFilter, searchQuery, stateFilter, statusFilter]);

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
          This page now reads saved bookings from PostgreSQL through the Java
          Spring Boot backend.
        </p>
      </div>

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.3fr_1fr_1fr_1fr_auto_auto]">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Search</span>
            <input
              className={fieldClassName}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Reference, email, state..."
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

          <button
            className="mt-6 min-h-12 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-100"
            onClick={loadBookings}
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

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-600">
          {isLoading
            ? "Loading bookings from backend..."
            : `Showing ${filteredBookings.length} of ${bookings.length} saved booking requests.`}
        </p>
      </div>

      <BookingsTable
        bookings={filteredBookings}
        emptyMessage={
          isLoading
            ? "Loading bookings..."
            : "No booking requests match this view."
        }
      />
    </div>
  );
}

function getPackageTitle(packageId: string) {
  return (
    BOOKING_PACKAGES.find((bookingPackage) => bookingPackage.id === packageId)
      ?.title ?? packageId
  );
}

function formatLabel(value: string) {
  return value
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

const fieldClassName =
  "mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100";