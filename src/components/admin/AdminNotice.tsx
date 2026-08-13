export function AdminNotice() {
  return (
    <section
      aria-label="Admin demo notice"
      className="rounded-md border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-950 shadow-sm"
    >
      <p className="font-semibold">Frontend demo dashboard</p>
      <p className="mt-1 text-emerald-900">
        This admin area uses local mock data only. Authentication, admin roles,
        booking persistence, pricing updates, and agent assignment APIs will be
        connected later through the Java Spring Boot backend.
      </p>
    </section>
  );
}
