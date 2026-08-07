import { SITE_CONFIG, TRUST_COPY } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy-dark text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-sm sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
        <div>
          <p className="font-bold">{SITE_CONFIG.name}</p>
          <p className="mt-1 text-slate-300">
            © {new Date().getFullYear()} Verification services for overseas
            importers.
          </p>
        </div>
        <p className="max-w-md text-slate-300">
          Independent physical verification and evidence collection before payment
          or shipment. {TRUST_COPY.exclusion}
        </p>
      </div>
    </footer>
  );
}
