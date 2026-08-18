"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui";
import {
  createAgent,
  getAgents,
  type AgentCreateRequest,
  type AgentResponse,
} from "@/lib/api/agents";

const emptyAgentForm: AgentCreateRequest = {
  name: "",
  state: "",
  city: "",
  phone: "",
  email: "",
};

const allFilterValue = "all";

export function AgentsManagement() {
  const [agents, setAgents] = useState<AgentResponse[]>([]);
  const [agentForm, setAgentForm] =
    useState<AgentCreateRequest>(emptyAgentForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState(allFilterValue);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadAgents();
  }, []);

  async function loadAgents() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const data = await getAgents();
      setAgents(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not load agents from the backend.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const stateOptions = useMemo(
    () =>
      Array.from(new Set(agents.map((agent) => agent.state)))
        .filter(Boolean)
        .sort((first, second) => first.localeCompare(second)),
    [agents],
  );

  const filteredAgents = useMemo(() => {
    const normalisedSearch = searchQuery.trim().toLowerCase();

    return agents.filter((agent) => {
      const matchesState =
        stateFilter === allFilterValue || agent.state === stateFilter;

      const searchableText = [
        agent.agentId,
        agent.name,
        agent.state,
        agent.city,
        agent.phone,
        agent.email,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalisedSearch.length === 0 ||
        searchableText.includes(normalisedSearch);

      return matchesState && matchesSearch;
    });
  }, [agents, searchQuery, stateFilter]);

  function updateAgentForm(field: keyof AgentCreateRequest, value: string) {
    setAgentForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
    setErrorMessage("");
    setSuccessMessage("");
  }

  function resetFilters() {
    setSearchQuery("");
    setStateFilter(allFilterValue);
  }

  async function handleCreateAgent() {
    try {
      setIsCreating(true);
      setErrorMessage("");
      setSuccessMessage("");

      const createdAgent = await createAgent({
        name: agentForm.name.trim(),
        state: agentForm.state.trim(),
        city: agentForm.city.trim(),
        phone: agentForm.phone.trim(),
        email: agentForm.email.trim(),
      });

      setAgents((currentAgents) => [createdAgent, ...currentAgents]);
      setAgentForm(emptyAgentForm);
      setShowCreateForm(false);
      setSuccessMessage(
        `${createdAgent.name} was created successfully with ID ${createdAgent.agentId}.`,
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Could not create agent. Please try again.",
      );
    } finally {
      setIsCreating(false);
    }
  }

  const isCreateButtonDisabled =
    isCreating ||
    !agentForm.name.trim() ||
    !agentForm.state.trim() ||
    !agentForm.city.trim() ||
    !agentForm.phone.trim() ||
    !agentForm.email.trim();

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
            View and create verification agents from PostgreSQL through the Java
            Spring Boot backend.
          </p>
        </div>

        <Button onClick={() => setShowCreateForm((current) => !current)}>
          {showCreateForm ? "Close form" : "Add agent"}
        </Button>
      </div>

      {successMessage && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">
          {errorMessage}
        </div>
      )}

      {showCreateForm && (
        <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-bold text-slate-950">
            Create verification agent
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            This form sends data to POST /api/agents and saves the agent in
            PostgreSQL.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold text-slate-700">
                Agent name
              </span>
              <input
                className={fieldClassName}
                onChange={(event) =>
                  updateAgentForm("name", event.target.value)
                }
                placeholder="Hyderabad Test Agent"
                value={agentForm.name}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-700">State</span>
              <input
                className={fieldClassName}
                onChange={(event) =>
                  updateAgentForm("state", event.target.value)
                }
                placeholder="Telangana"
                value={agentForm.state}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-700">City</span>
              <input
                className={fieldClassName}
                onChange={(event) =>
                  updateAgentForm("city", event.target.value)
                }
                placeholder="Hyderabad"
                value={agentForm.city}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-slate-700">Phone</span>
              <input
                className={fieldClassName}
                onChange={(event) =>
                  updateAgentForm("phone", event.target.value)
                }
                placeholder="+919000000001"
                value={agentForm.phone}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="text-sm font-bold text-slate-700">Email</span>
              <input
                className={fieldClassName}
                onChange={(event) =>
                  updateAgentForm("email", event.target.value)
                }
                placeholder="hyderabad.agent@example.com"
                type="email"
                value={agentForm.email}
              />
            </label>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button
              disabled={isCreateButtonDisabled}
              onClick={handleCreateAgent}
            >
              {isCreating ? "Creating..." : "Create agent"}
            </Button>
            <Button
              disabled={isCreating}
              onClick={() => setAgentForm(emptyAgentForm)}
              variant="secondary"
            >
              Clear form
            </Button>
          </div>
        </section>
      )}

      <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_auto_auto]">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Search</span>
            <input
              className={fieldClassName}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Agent name, ID, city, email..."
              type="search"
              value={searchQuery}
            />
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
            onClick={loadAgents}
            type="button"
          >
            Refresh
          </button>
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-slate-600">
          {isLoading
            ? "Loading agents from backend..."
            : `Showing ${filteredAgents.length} of ${agents.length} saved agents.`}
        </p>
      </div>

      {filteredAgents.length === 0 ? (
        <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm font-semibold text-slate-500">
          {isLoading
            ? "Loading agents..."
            : "No agents match this view. Create an agent to get started."}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredAgents.map((agent) => (
            <article
              className="rounded-md border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              key={agent.agentId}
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
                <span className={getAgentStatusClassName(agent.active)}>
                  {agent.active ? "Active" : "Inactive"}
                </span>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="font-semibold text-slate-500">Agent ID</dt>
                  <dd className="mt-1 break-words font-bold text-slate-950">
                    {agent.agentId}
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-500">Database ID</dt>
                  <dd className="mt-1 font-bold text-slate-950">{agent.id}</dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-500">Phone</dt>
                  <dd className="mt-1 break-words font-bold text-slate-950">
                    {agent.phone}
                  </dd>
                </div>

                <div>
                  <dt className="font-semibold text-slate-500">Email</dt>
                  <dd className="mt-1 break-words font-bold text-slate-950">
                    {agent.email}
                  </dd>
                </div>

                <div className="col-span-2">
                  <dt className="font-semibold text-slate-500">Created</dt>
                  <dd className="mt-1 font-bold text-slate-950">
                    {formatDate(agent.createdAt)}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}

      <p className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Backend source: GET /api/agents and POST /api/agents. Agent records are
        stored in PostgreSQL.
      </p>
    </div>
  );
}

function getAgentStatusClassName(active: boolean) {
  const baseClassName =
    "inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.12em]";

  if (active) {
    return `${baseClassName} border-emerald-200 bg-emerald-50 text-emerald-800`;
  }

  return `${baseClassName} border-slate-200 bg-slate-50 text-slate-700`;
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateValue));
}

const fieldClassName =
  "mt-2 w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100";