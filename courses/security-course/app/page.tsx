import ShellLayout from "@/components/ShellLayout";
import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import TrackCards from "@/components/home/TrackCards";
import WhySection from "@/components/home/WhySection";
import CTABanner from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <ShellLayout>
      <HeroSection />
      <StatsBar />
      <TrackCards />
      <WhySection />
      <CTABanner />
    </ShellLayout>
  );
}
