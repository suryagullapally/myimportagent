import type { Metadata } from "next";
import Link from "next/link";
import {
  ContactForm,
  InfoCard,
  MarketingPageHero,
  MarketingSection,
} from "@/components/marketing";
import { CONTACT_PAGE, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact | ${SITE_CONFIG.name}`,
  description:
    "Contact myimportagent about verification-only services for Indian sourcing.",
};

export default function ContactPage() {
  return (
    <>
      <MarketingPageHero
        actions={[
          { href: "/book", label: "Use Booking Form" },
          { href: "/faq", label: "Read FAQ", variant: "secondary" },
        ]}
        description={CONTACT_PAGE.description}
        eyebrow={CONTACT_PAGE.eyebrow}
        title={CONTACT_PAGE.title}
      />

      <MarketingSection>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <InfoCard
              description="Use this placeholder email while the official contact backend is prepared."
              eyebrow="Business email"
              title={CONTACT_PAGE.email}
            >
              <a
                className="text-sm font-bold text-primary hover:text-primary-dark"
                href={`mailto:${CONTACT_PAGE.email}`}
              >
                {CONTACT_PAGE.email}
              </a>
            </InfoCard>
            <InfoCard
              description={CONTACT_PAGE.responseTime}
              eyebrow="Response time"
              title="Clear replies for importers"
            />
            <InfoCard
              description={CONTACT_PAGE.urgentNote}
              eyebrow="Urgent requests"
              title="Use the booking flow"
            >
              <Link
                className="inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark"
                href="/book"
              >
                Start Booking
              </Link>
            </InfoCard>
          </div>

          <ContactForm />
        </div>
      </MarketingSection>
    </>
  );
}
