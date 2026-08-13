export function AgentNotice() {
  return (
    <section
      aria-label="Agent demo notice"
      className="rounded-md border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-950 shadow-sm"
    >
      <p className="font-semibold">Frontend demo portal</p>
      <p className="mt-1 text-emerald-900">
        This agent area uses local mock jobs only. Agent login, assigned jobs,
        secure evidence upload, visit submission, and admin review will be
        connected later through the Java Spring Boot backend.
      </p>
    </section>
  );
}
