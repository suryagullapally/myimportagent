"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/ui";
import {
  checkAvailability,
  getAvailabilityRegions,
  type AvailabilityCheckResponse,
  type AvailabilityRegion,
} from "@/lib/api/availability";
import { AVAILABILITY_CHECKER_COPY, OTHER_STATE_OPTION } from "@/lib/constants";

type AvailabilityUiResult = {
  type: "available" | "unavailable" | "validation" | "error";
  message: string;
  state?: string;
  city?: string;
};

export function AvailabilityChecker() {
  const [regions, setRegions] = useState<AvailabilityRegion[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [result, setResult] = useState<AvailabilityUiResult | null>(null);
  const [isLoadingRegions, setIsLoadingRegions] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    async function loadAvailabilityRegions() {
      try {
        setIsLoadingRegions(true);
        setResult(null);

        const data = await getAvailabilityRegions();
        setRegions(data);
      } catch {
        setResult({
          type: "error",
          message:
            "Could not load availability locations from the backend. Please make sure the Spring Boot server is running.",
        });
      } finally {
        setIsLoadingRegions(false);
      }
    }

    loadAvailabilityRegions();
  }, []);

  const stateOptions = useMemo(() => {
    const availableStates = regions.map((region) => region.state);

    return [...availableStates, OTHER_STATE_OPTION];
  }, [regions]);

  const selectedRegion = useMemo(
    () => regions.find((region) => region.state === selectedState),
    [regions, selectedState],
  );

  const cityOptions = selectedRegion?.cities ?? [];

  const isUnavailableState =
    selectedState === OTHER_STATE_OPTION ||
    (selectedState !== "" && !selectedRegion);

  const isCityDisabled =
    !selectedState || isUnavailableState || isLoadingRegions || isChecking;

  function handleStateChange(nextState: string) {
    setSelectedState(nextState);
    setSelectedCity("");
    setResult(null);
  }

  function handleCityChange(nextCity: string) {
    setSelectedCity(nextCity);
    setResult(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedState) {
      setResult({
        type: "validation",
        message: AVAILABILITY_CHECKER_COPY.missingStateMessage,
      });
      return;
    }

    if (isUnavailableState) {
      setResult({
        type: "unavailable",
        message: AVAILABILITY_CHECKER_COPY.unavailableMessage,
        state: selectedState,
      });
      return;
    }

    if (!selectedCity) {
      setResult({
        type: "validation",
        message: AVAILABILITY_CHECKER_COPY.missingCityMessage,
      });
      return;
    }

    try {
      setIsChecking(true);
      setResult(null);

      const availabilityResult: AvailabilityCheckResponse =
        await checkAvailability(selectedState, selectedCity);

      setResult({
        type: availabilityResult.available ? "available" : "unavailable",
        message: availabilityResult.message,
        state: availabilityResult.state,
        city: availabilityResult.city,
      });
    } catch {
      setResult({
        type: "error",
        message:
          "Could not check availability from the backend. Please try again.",
      });
    } finally {
      setIsChecking(false);
    }
  }

  return (
    <section
      aria-labelledby="availability-title"
      className="scroll-mt-28 bg-surface px-6 py-20 sm:px-8 lg:px-10"
      id="availability"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {AVAILABILITY_CHECKER_COPY.eyebrow}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
            id="availability-title"
          >
            {AVAILABILITY_CHECKER_COPY.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {AVAILABILITY_CHECKER_COPY.description}
          </p>

          <div className="mt-6 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <span className="font-bold text-foreground">15</span> priority
              Indian sourcing regions
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              Fast answer before you request a visit
            </div>
          </div>
        </div>

        <form
          className="rounded-lg border border-slate-200 bg-white/90 p-5 shadow-2xl shadow-slate-950/10 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-emerald-950/15 sm:p-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="exporter-state">
              <span className="text-sm font-semibold text-slate-700">
                {AVAILABILITY_CHECKER_COPY.stateLabel}
              </span>
              <select
                className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                disabled={isLoadingRegions || isChecking}
                id="exporter-state"
                onChange={(event) => handleStateChange(event.target.value)}
                value={selectedState}
              >
                <option value="">
                  {isLoadingRegions
                    ? "Loading available states..."
                    : AVAILABILITY_CHECKER_COPY.statePlaceholder}
                </option>
                {stateOptions.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>

            <label className="block" htmlFor="exporter-city">
              <span className="text-sm font-semibold text-slate-700">
                {AVAILABILITY_CHECKER_COPY.cityLabel}
              </span>
              <select
                className="mt-2 h-12 w-full rounded-md border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-slate-950 outline-none transition disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                disabled={isCityDisabled}
                id="exporter-city"
                onChange={(event) => handleCityChange(event.target.value)}
                value={selectedCity}
              >
                <option value="">
                  {isUnavailableState
                    ? AVAILABILITY_CHECKER_COPY.unavailableCityPlaceholder
                    : AVAILABILITY_CHECKER_COPY.cityPlaceholder}
                </option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button className="sm:min-w-48" disabled={isChecking} type="submit">
              {isChecking ? "Checking..." : AVAILABILITY_CHECKER_COPY.checkButton}
            </Button>
            <p className="text-sm text-slate-500">
              Verification-only coverage check. No booking is created here.
            </p>
          </div>

          <div aria-live="polite" className="mt-6">
            {result?.type === "available" && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-bold text-emerald-800">
                  {result.message}
                </p>
                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  You can continue toward booking when you are ready to prepare
                  a verification request.
                </p>
                <Link
                  className="mt-4 inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5 hover:bg-primary-dark"
                  href="/book"
                >
                  {AVAILABILITY_CHECKER_COPY.bookButton}
                </Link>
              </div>
            )}

            {result?.type === "unavailable" && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-sm font-bold text-amber-900">
                  {result.message}
                </p>
              </div>
            )}

            {result?.type === "validation" && (
              <div className="rounded-lg border border-sky-200 bg-sky-50 p-4">
                <p className="text-sm font-bold text-sky-900">
                  {result.message}
                </p>
              </div>
            )}

            {result?.type === "error" && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-bold text-red-900">
                  {result.message}
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}