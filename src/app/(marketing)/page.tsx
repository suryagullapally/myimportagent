import {
  AvailabilityPreview,
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
      <AvailabilityPreview />
      <HowItWorks />
      <PackageCards />
      <WhyVerify />
      <TrustSection />
      <CTASection />
    </>
  );
}
