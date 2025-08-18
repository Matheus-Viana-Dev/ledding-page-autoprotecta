import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BenefitsSection from '@/components/BenefitsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FinalCTASection from '@/components/FinalCTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
