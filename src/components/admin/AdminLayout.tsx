import { AdminHeader } from "./AdminHeader";
import { AdminNotice } from "./AdminNotice";
import { AdminSidebar } from "./AdminSidebar";

type AdminLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
        <AdminSidebar />
        <div className="min-w-0">
          <AdminHeader />
          <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <AdminNotice />
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
