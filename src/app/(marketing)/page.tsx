import {
  AvailabilityChecker,
  CTASection,
  HeroSection,
  HowItWorks,
  PackageCards,
  TrustSection,
  WhyVerify,
} from "@/components/home";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AvailabilityChecker />
      <HowItWorks />
      <PackageCards />
      <WhyVerify />
      <TrustSection />
      <CTASection />
    </>
  );
}
