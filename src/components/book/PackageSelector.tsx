"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import {
  BOOKING_PACKAGE_SECTION_COPY,
  BOOKING_PACKAGES,
} from "@/lib/constants";

export function PackageSelector() {
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [message, setMessage] = useState("");

  const hasSelectedPackage = selectedPackageId !== "";

  function handlePackageChange(packageId: string) {
    setSelectedPackageId(packageId);
    setMessage("");
  }

  function handleContinue() {
    if (!hasSelectedPackage) {
      setMessage(BOOKING_PACKAGE_SECTION_COPY.choosePackageMessage);
      return;
    }

    setMessage(BOOKING_PACKAGE_SECTION_COPY.nextStepMessage);
  }

  return (
    <section
      aria-labelledby="package-selection-title"
      className="bg-surface px-6 py-20 sm:px-8 lg:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            {BOOKING_PACKAGE_SECTION_COPY.eyebrow}
          </p>
          <h2
            className="mt-4 text-3xl font-bold tracking-normal text-foreground sm:text-4xl"
            id="package-selection-title"
          >
            {BOOKING_PACKAGE_SECTION_COPY.title}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {BOOKING_PACKAGE_SECTION_COPY.description}
          </p>
        </div>

        <fieldset className="mt-10">
          <legend className="sr-only">Select a verification package</legend>
          <div className="grid gap-5 lg:grid-cols-3">
            {BOOKING_PACKAGES.map((item) => {
              const isSelected = selectedPackageId === item.id;

              return (
                <label
                  className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-lg border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-950/10 ${
                    isSelected
                      ? "border-emerald-400 ring-4 ring-emerald-100"
                      : "border-slate-200 hover:border-emerald-200"
                  }`}
                  key={item.id}
                >
                  <input
                    checked={isSelected}
                    className="sr-only"
                    name="booking-package"
                    onChange={() => handlePackageChange(item.id)}
                    type="radio"
                    value={item.id}
                  />
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-emerald-400 to-amber-300" />
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {item.title}
                    </h3>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                      }`}
                    >
                      ✓
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Best for
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">
                      {item.bestFor}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-8 flex flex-col gap-3 rounded-lg border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">
              Selected package
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {selectedPackageId
                ? BOOKING_PACKAGES.find((item) => item.id === selectedPackageId)
                    ?.title
                : BOOKING_PACKAGE_SECTION_COPY.choosePackageMessage}
            </p>
            {message && (
              <p aria-live="polite" className="mt-3 text-sm font-semibold text-primary">
                {message}
              </p>
            )}
          </div>

          <Button
            className="sm:min-w-56"
            disabled={!hasSelectedPackage}
            onClick={handleContinue}
          >
            {BOOKING_PACKAGE_SECTION_COPY.continueButton}
          </Button>
        </div>
      </div>
    </section>
  );
}
