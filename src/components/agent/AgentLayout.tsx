import { AgentHeader } from "./AgentHeader";
import { AgentNotice } from "./AgentNotice";
import { AgentSidebar } from "./AgentSidebar";

type AgentLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export function AgentLayout({ children }: AgentLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
        <AgentSidebar />
        <div className="min-w-0">
          <AgentHeader />
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            <AgentNotice />
            <div className="mt-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
