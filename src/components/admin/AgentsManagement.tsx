"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import {
  ADMIN_AGENTS,
  getAdminAgentStatusLabel,
} from "@/lib/mock";
import {
  getAgentStatusTone,
  StatusBadge,
} from "./StatusBadge";

export function AgentsManagement() {
  const [demoMessage, setDemoMessage] = useState("");

  function showDemoMessage() {
    setDemoMessage("Agent management backend will be connected later.");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
            Agent network
          </p>
          <h2 className="mt-2 text-3xl font-black text-slate-950">
            Verification agents
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            View local mock agents by state, workload, and availability status.
            This is ready to be replaced by the admin agents API later.
          </p>
        </div>
        <Button onClick={showDemoMessage}>Add Agent placeholder</Button>
      </div>

      {demoMessage && (
        <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-800">
          {demoMessage}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {ADMIN_AGENTS.map((agent) => (
          <article
            className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            key={agent.id}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  {agent.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {agent.city}, {agent.state}
                </p>
              </div>
              <StatusBadge
                label={getAdminAgentStatusLabel(agent.status)}
                tone={getAgentStatusTone(agent.status)}
              />
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="font-semibold text-slate-500">Phone</dt>
                <dd className="mt-1 font-bold text-slate-950">{agent.phone}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Rating</dt>
                <dd className="mt-1 font-bold text-slate-950">{agent.rating}</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Completed jobs</dt>
                <dd className="mt-1 font-bold text-slate-950">
                  {agent.completedJobs}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-500">Assigned jobs</dt>
                <dd className="mt-1 font-bold text-slate-950">
                  {agent.assignedJobs}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <p className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Future integration point: GET /api/admin/agents will load the agent
        list, and the Java backend will handle creating or updating agent
        records.
      </p>
    </div>
  );
}
