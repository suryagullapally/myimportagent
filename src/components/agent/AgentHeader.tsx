import { AGENT_PORTAL_PROFILE } from "@/lib/mock";

export function AgentHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/90 px-4 py-4 shadow-sm backdrop-blur sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-700">
            myimportagent agent portal
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950">
            Welcome, {AGENT_PORTAL_PROFILE.name}
          </h1>
        </div>
        <div className="inline-flex w-fit rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800">
          Frontend demo only
        </div>
      </div>
    </header>
  );
}
