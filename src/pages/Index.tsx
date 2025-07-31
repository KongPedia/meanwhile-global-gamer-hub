import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import VideoExampleSection from "@/components/VideoExampleSection";
import BenefitsSection from "@/components/BenefitsSection";
import PartnerSection from "@/components/PartnerSection";
import CommunitySection from "@/components/CommunitySection";
import ReportSection from "@/components/ReportSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <CommunitySection />
      <ProblemSection />
      <SolutionSection />
      <VideoExampleSection />
      <ReportSection />
      <BenefitsSection />
      <PartnerSection />
      <Footer />
    </div>
  );
};

export default Index;
