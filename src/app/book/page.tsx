import type { Metadata } from "next";
import {
  BookingFlow,
  BookingHero,
  BookingStepsPreview,
} from "@/components/book";
import { Footer, Header } from "@/components/layout";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Book Verification | ${SITE_CONFIG.name}`,
  description:
    "Choose a myimportagent verification package before the full booking form is built.",
};

export default function BookPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <BookingHero />
        <BookingFlow />
        <BookingStepsPreview />
      </main>
      <Footer />
    </div>
  );
}
