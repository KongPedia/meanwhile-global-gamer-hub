import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import DailyReportPreview from "@/components/DailyReportPreview";
import MilestoneReportPreview from "@/components/MilestoneReportPreview";
import NewsletterSection from "@/components/NewsletterSection";
import ChatSimulator from "@/components/ChatSimulator";
import Footer from "@/components/Footer";
import { Newsletter } from "@/types/reports";
import newsletter3 from "@/data/newsletter/week-3.json";
import newsletter2 from "@/data/newsletter/week-2.json";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const newsletters: Newsletter[] = [newsletter3 as Newsletter, newsletter2 as Newsletter];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      {/* Hero: 하루 만에 파악하는 업데이트 영향과 여론 변화 */}
      <Hero />
      
      {/* Problem: 게임사 실무자들이 마주하는 현실 */}
      <ProblemSection />
      
      {/* Solution: AI 기반 통합 분석 솔루션 */}
      <SolutionSection />
      
      {/* 일일 운영 브리핑 섹션 */}
      <DailyReportPreview />
      
      {/* 마일스톤 성과 분석 섹션 */}
      <MilestoneReportPreview />
      
      {/* CM 리아 뉴스레터 섹션 */}
      <NewsletterSection newsletters={newsletters} />
      
      {/* 챗봇 에이전트 섹션 */}
      <ChatSimulator />
      
      {/* CTA */}
      <Footer />
    </div>
  );
};

export default Index;
