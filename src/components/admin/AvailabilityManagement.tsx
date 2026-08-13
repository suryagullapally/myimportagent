"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { AVAILABLE_REGIONS, STATE_MINIMUM_FEES_GBP } from "@/lib/constants";
import { formatGbp } from "@/lib/utils/pricing";

export function AvailabilityManagement() {
  const [demoMessage, setDemoMessage] = useState("");

  function showDemoMessage(action: string, state: string) {
    setDemoMessage(`${action} for ${state} is a frontend placeholder only.`);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Coverage
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          Availability management
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Review the states and cities currently shown to customers in the
          availability checker. Controls are placeholders until the Java API is
          connected.
        </p>
      </div>

      {demoMessage && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          {demoMessage}
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {AVAILABLE_REGIONS.map((region) => (
          <article
            className="rounded-md border border-slate-200 bg-white p-5 shadow-sm"
            key={region.state}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-950">
                  {region.state}
                </h3>
                <p className="mt-1 text-sm font-semibold text-emerald-700">
                  Available for verification
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Minimum fee:{" "}
                  <span className="font-bold text-slate-950">
                    {formatGbp(STATE_MINIMUM_FEES_GBP[region.state] ?? 0)}
                  </span>
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  className="min-h-10 px-3 py-2"
                  onClick={() => showDemoMessage("Toggle availability", region.state)}
                  variant="secondary"
                >
                  Toggle
                </Button>
                <Button
                  className="min-h-10 px-3 py-2"
                  onClick={() => showDemoMessage("Add city", region.state)}
                  variant="secondary"
                >
                  Add city
                </Button>
                <Button
                  className="min-h-10 px-3 py-2"
                  onClick={() => showDemoMessage("Edit cities", region.state)}
                  variant="secondary"
                >
                  Edit
                </Button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {region.cities.map((city) => (
                <span
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700"
                  key={city}
                >
                  {city}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <p className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Future integration point: GET /api/admin/availability and PATCH
        /api/admin/availability will load and update service coverage through
        the Spring Boot REST API.
      </p>
    </div>
  );
}
