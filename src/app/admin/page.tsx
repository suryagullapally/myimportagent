import Link from "next/link";
import { BookingsTable, StatCard } from "@/components/admin";
import { ADMIN_AGENTS, ADMIN_BOOKINGS } from "@/lib/mock";
import { formatGbp } from "@/lib/utils/pricing";

const quickLinks = [
  {
    href: "/admin/bookings",
    title: "Bookings",
    description: "Review customer requests, statuses, payment placeholders, and assignments.",
  },
  {
    href: "/admin/agents",
    title: "Agents",
    description: "View local verification agents and availability status.",
  },
  {
    href: "/admin/availability",
    title: "Availability",
    description: "Review states and cities currently shown to customers.",
  },
  {
    href: "/admin/pricing",
    title: "Pricing",
    description: "Check state minimum fees and add-on prices.",
  },
];

export default function AdminOverviewPage() {
  const totalBookingRequests = ADMIN_BOOKINGS.length;
  const paidBookings = ADMIN_BOOKINGS.filter(
    (booking) => booking.paymentStatus === "paid-placeholder",
  ).length;
  const pendingReview = ADMIN_BOOKINGS.filter(
    (booking) => booking.status === "pending-review",
  ).length;
  const agentsAvailable = ADMIN_AGENTS.filter(
    (agent) => agent.status === "available",
  ).length;
  const reportsPending = ADMIN_BOOKINGS.filter(
    (booking) => booking.status === "report-pending",
  ).length;
  const estimatedRevenue = ADMIN_BOOKINGS.reduce(
    (total, booking) => total + booking.quote.finalEstimatedPrice,
    0,
  );

  const recentBookings = ADMIN_BOOKINGS.slice(0, 4);

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Overview
        </p>
        <h2 className="mt-2 text-3xl font-black text-slate-950">
          Admin operations overview
        </h2>
        <p className="mt-2 max-w-2xl text-slate-600">
          Monitor mock booking activity, agent capacity, and verification
          operations. No real admin data is loaded yet.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          hint="All local demo requests"
          label="Total booking requests"
          value={String(totalBookingRequests)}
        />
        <StatCard
          hint="Payment status placeholder only"
          label="Paid bookings placeholder"
          value={String(paidBookings)}
        />
        <StatCard
          hint="Needs staff review"
          label="Pending review"
          value={String(pendingReview)}
        />
        <StatCard
          hint="Available mock agents"
          label="Agents available"
          value={String(agentsAvailable)}
        />
        <StatCard
          hint="Report evidence not delivered yet"
          label="Reports pending"
          value={String(reportsPending)}
        />
        <StatCard
          hint="Sum of estimated frontend quotes"
          label="Estimated revenue"
          value={formatGbp(estimatedRevenue)}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-black text-slate-950">
                Recent booking requests
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Latest mock requests from the booking flow.
              </p>
            </div>
            <Link
              className="hidden rounded-md border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 sm:inline-flex"
              href="/admin/bookings"
            >
              View all
            </Link>
          </div>
          <BookingsTable bookings={recentBookings} />
        </div>

        <aside className="space-y-6">
          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950">
              Operational status
            </h3>
            <div className="mt-5 space-y-4">
              <StatusLine label="Coverage" value="15 regions active" />
              <StatusLine label="Pricing" value="Frontend estimate only" />
              <StatusLine label="Payments" value="Not connected" />
              <StatusLine label="Admin auth" value="Not connected" />
            </div>
          </section>

          <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-950">Quick links</h3>
            <div className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <Link
                  className="block rounded-md border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50"
                  href={link.href}
                  key={link.href}
                >
                  <span className="block font-bold text-slate-950">
                    {link.title}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {link.description}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>

      <p className="rounded-md border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Future integration point: GET /api/admin/bookings, GET
        /api/admin/agents, GET /api/admin/availability, and GET
        /api/admin/pricing will replace this local mock overview data.
      </p>
    </div>
  );
}

function StatusLine({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-950">{value}</span>
    </div>
  );
}
