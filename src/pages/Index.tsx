import Navigation from "@/components/Navigation";
import HeroSimple from "@/components/HeroSimple";
import FeaturesSimple from "@/components/FeaturesSimple";
import DemoSection from "@/components/DemoSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSimple />
      <FeaturesSimple />
      <DemoSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
