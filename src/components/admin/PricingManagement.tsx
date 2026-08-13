"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import {
  IMPORT_VALUE_PERCENTAGE_RATE,
  PRICING_ADD_ONS,
  STATE_MINIMUM_FEES_GBP,
} from "@/lib/constants";
import { formatGbp } from "@/lib/utils/pricing";

export function PricingManagement() {
  const [demoMessage, setDemoMessage] = useState("");

  function showDemoMessage(itemName: string) {
    setDemoMessage(`Editing ${itemName} is a frontend placeholder only.`);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Pricing
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          Pricing management
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Review the current frontend pricing constants. Editing is shown as a
          demo-only action until the backend pricing API is connected.
        </p>
      </div>

      {demoMessage && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          {demoMessage}
        </div>
      )}

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">Pricing rule</h3>
        <p className="mt-2 text-slate-600">
          Final estimate = higher of the state minimum fee or{" "}
          {IMPORT_VALUE_PERCENTAGE_RATE * 100}% of import value, plus selected
          add-ons.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Future integration point: GET /api/admin/pricing will load these
          rules, and PATCH /api/admin/pricing will update them after admin
          authentication is added.
        </p>
      </section>

      <section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h3 className="text-xl font-bold text-slate-950">
            State minimum fees
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[680px] divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-4 py-4">State / region</th>
                <th className="px-4 py-4">Minimum fee</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.entries(STATE_MINIMUM_FEES_GBP).map(([state, fee]) => (
                <tr className="hover:bg-emerald-50/40" key={state}>
                  <td className="px-4 py-4 font-bold text-slate-950">{state}</td>
                  <td className="px-4 py-4 text-slate-700">{formatGbp(fee)}</td>
                  <td className="px-4 py-4">
                    <Button
                      className="min-h-10 px-3 py-2"
                      onClick={() => showDemoMessage(`${state} minimum fee`)}
                      variant="secondary"
                    >
                      Edit state fee
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-5">
          <h3 className="text-xl font-bold text-slate-950">Add-ons</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[720px] divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-4 py-4">Add-on</th>
                <th className="px-4 py-4">Description</th>
                <th className="px-4 py-4">Price</th>
                <th className="px-4 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PRICING_ADD_ONS.map((addOn) => (
                <tr className="hover:bg-emerald-50/40" key={addOn.id}>
                  <td className="px-4 py-4 font-bold text-slate-950">
                    {addOn.title}
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {addOn.description}
                  </td>
                  <td className="px-4 py-4 font-bold text-slate-950">
                    {formatGbp(addOn.priceGbp)}
                  </td>
                  <td className="px-4 py-4">
                    <Button
                      className="min-h-10 px-3 py-2"
                      onClick={() => showDemoMessage(addOn.title)}
                      variant="secondary"
                    >
                      Edit add-on price
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
