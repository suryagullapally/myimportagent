"use client";

import Link from "next/link";
import type { MouseEvent } from "react";

type HomeCtaButtonsProps = Readonly<{
  primaryLabel: string;
  secondaryLabel: string;
}>;

const primaryLinkClassName =
  "inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-emerald-950/20 transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300";

const secondaryLinkClassName =
  "inline-flex min-h-12 items-center justify-center rounded-md border border-white/25 bg-white/10 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300";

export function HomeCtaButtons({
  primaryLabel,
  secondaryLabel,
}: HomeCtaButtonsProps) {
  function handleAvailabilityClick(event: MouseEvent<HTMLAnchorElement>) {
    const availabilitySection = document.getElementById("availability");

    if (!availabilitySection) {
      return;
    }

    event.preventDefault();
    availabilitySection.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "/#availability");
  }

  return (
    <>
      <Link
        className={primaryLinkClassName}
        href="/#availability"
        onClick={handleAvailabilityClick}
      >
        {primaryLabel}
      </Link>
      <Link className={secondaryLinkClassName} href="/book">
        {secondaryLabel}
      </Link>
    </>
  );
}
