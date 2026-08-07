import Link from "next/link";
import { NAV_ITEMS, SITE_CONFIG } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white shadow-lg shadow-slate-950/10 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <Link className="flex items-center gap-3 text-xl font-bold" href="/">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-emerald-400 text-sm font-black text-navy">
            M
          </span>
          <span>{SITE_CONFIG.name}</span>
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-slate-200">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a className="transition hover:text-emerald-200" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
