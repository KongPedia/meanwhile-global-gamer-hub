import Hero from "@/components/Hero";
import DailyReportPreview from "@/components/DailyReportPreview";
import MilestoneReportPreview from "@/components/MilestoneReportPreview";
import ChatSimulator from "@/components/ChatSimulator";
import NewsletterSection from "@/components/NewsletterSection";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Newsletter } from "@/types/reports";
import { Helmet } from "react-helmet-async";

const Index = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect(() => {
    // Load newsletter samples
    const loadNewsletters = async () => {
      try {
        const newsletter3 = await import("@/data/newsletter/week-3.json");
        const newsletter2 = await import("@/data/newsletter/week-2.json");
        setNewsletters([newsletter3.default as Newsletter, newsletter2.default as Newsletter]);
      } catch (error) {
        console.error("Failed to load newsletters:", error);
      }
    };
    loadNewsletters();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      {/* Hero: 게임사의 빠른 의사결정 지원 */}
      <Hero />
      
      {/* 일일 운영 브리핑 */}
      <DailyReportPreview />
      
      {/* 마일스톤 성과 분석 */}
      <MilestoneReportPreview />
      
      {/* 챗봇 시뮬레이터: 질문 입력부터 분석, 결과 도출까지 */}
      <ChatSimulator />
      
      {/* CM 보이스 뉴스레터 (Discord 발행) */}
      <NewsletterSection newsletters={newsletters} />
      
      {/* Use Cases: 운영, PM, CM 등 직군별 적용 시나리오 */}
      <BenefitsSection />
      
      {/* 구독 및 CTA */}
      <Footer />
    </div>
  );
};

export default Index;
