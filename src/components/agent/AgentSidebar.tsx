"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const agentNavItems = [
  { label: "Overview", href: "/agent" },
  { label: "My Jobs", href: "/agent/jobs" },
  { label: "Back to Website", href: "/" },
];

export function AgentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-b border-white/10 bg-slate-950 text-white lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col gap-5 p-4 sm:p-6">
        <Link
          className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          href="/agent"
        >
          <span className="inline-flex size-11 items-center justify-center rounded-md bg-primary text-base font-black text-slate-950">
            M
          </span>
          <span>
            <span className="block text-lg font-bold">MyImportAgent</span>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Agent
            </span>
          </span>
        </Link>

        <nav
          aria-label="Agent navigation"
          className="flex flex-wrap gap-2 lg:block lg:space-y-2"
        >
          {agentNavItems.map((item) => {
            const isActive =
              item.href === "/agent"
                ? pathname === item.href
                : item.href !== "/" && pathname.startsWith(item.href);

            return (
              <Link
                className={cn(
                  "inline-flex min-h-11 items-center rounded-md px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 lg:flex",
                  isActive &&
                    "bg-primary text-slate-950 hover:bg-primary hover:text-slate-950",
                  item.href === "/" && "border border-white/10 text-emerald-200",
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden rounded-md border border-white/10 bg-white/5 p-4 text-sm text-slate-300 lg:block">
          <p className="font-semibold text-white">Agent protection later</p>
          <p className="mt-1">
            Spring Security and JWT checks will protect assigned job access
            when login is added.
          </p>
        </div>
      </div>
    </aside>
  );
}
