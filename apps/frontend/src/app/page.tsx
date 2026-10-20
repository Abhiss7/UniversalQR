import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { UseCasesSection } from '@/components/home/UseCasesSection';
import { StaticVsDynamicSection } from '@/components/home/StaticVsDynamicSection';
import { AnalyticsPreview } from '@/components/home/AnalyticsPreview';
import { CTASection } from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <UseCasesSection />
        <StaticVsDynamicSection />
        <AnalyticsPreview />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
