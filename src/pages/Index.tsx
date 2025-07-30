import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import VideoExampleSection from "@/components/VideoExampleSection";
import BenefitsSection from "@/components/BenefitsSection";
import PartnerSection from "@/components/PartnerSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CommunitySection />
      <ProblemSection />
      <SolutionSection />
      <VideoExampleSection />
      <BenefitsSection />
      <PartnerSection />
      <Footer />
    </div>
  );
};

export default Index;
