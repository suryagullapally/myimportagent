import { getBackendHealth } from "@/lib/api/health";

export default async function BackendTestPage() {
  try {
    const health = await getBackendHealth();

    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-emerald-400/30 bg-white/10 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Backend Connection Test
          </p>

          <h1 className="text-3xl font-bold">
            Spring Boot backend connected successfully
          </h1>

          <div className="mt-8 rounded-2xl bg-black/30 p-5">
            <p>
              <strong>Status:</strong> {health.status}
            </p>
            <p>
              <strong>Service:</strong> {health.service}
            </p>
            <p>
              <strong>Message:</strong> {health.message}
            </p>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <div className="mx-auto max-w-3xl rounded-3xl border border-red-400/30 bg-white/10 p-8 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-red-300">
            Backend Connection Failed
          </p>

          <h1 className="text-3xl font-bold">
            Could not connect to Spring Boot backend
          </h1>

          <p className="mt-4 text-slate-300">
            Make sure the backend is running on http://localhost:8080.
          </p>

          <pre className="mt-6 overflow-auto rounded-2xl bg-black/30 p-5 text-sm text-red-200">
            {error instanceof Error ? error.message : "Unknown error"}
          </pre>
        </div>
      </main>
    );
  }
}