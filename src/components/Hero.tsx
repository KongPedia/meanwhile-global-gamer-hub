import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import { useLayoutEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { Calendar, Target, Bot, TrendingUp, AlertCircle, User, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DailyReport, MilestoneReport } from "@/types/reports";
import reportData from "@/data/reports/daily/game-a-2025-10-17.json";
import milestoneData from "@/data/reports/milestone/game-a-anniversary-2025.json";
import { getLocalizedText } from "@/lib/i18n-utils";

const DISCORD_INVITE_LINK = import.meta.env.VITE_DISCORD_INVITE_LINK;

const Hero = () => {
  const { t, language } = useLanguage();
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const milestoneCard1Ref = useRef<HTMLDivElement>(null);
  const milestoneCard2Ref = useRef<HTMLDivElement>(null);
  const milestoneCard3Ref = useRef<HTMLDivElement>(null);
  const milestoneCard4Ref = useRef<HTMLDivElement>(null);
  const milestoneContainerRef = useRef<HTMLDivElement>(null);
  const dailyContainerRef = useRef<HTMLDivElement>(null);
  const chatbotContainerRef = useRef<HTMLDivElement>(null);
  const chatMessage1Ref = useRef<HTMLDivElement>(null);
  const chatMessage2Ref = useRef<HTMLDivElement>(null);
  const chatMessage3Ref = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  
  const report = useMemo(() => reportData as DailyReport, []);
  const milestoneReport = useMemo(() => milestoneData as MilestoneReport, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const milestoneCards = [
        milestoneCard1Ref.current,
        milestoneCard2Ref.current,
        milestoneCard3Ref.current,
        milestoneCard4Ref.current
      ].filter(Boolean);

      const dailyCards = [
        card4Ref.current,
        card1Ref.current,
        card2Ref.current,
        card3Ref.current
      ].filter(Boolean);

      const chatMessages = [
        chatMessage1Ref.current,
        chatMessage2Ref.current,
        chatMessage3Ref.current
      ].filter(Boolean);

      const frontContainers = [
        dailyContainerRef.current,
        chatbotContainerRef.current
      ].filter(Boolean) as HTMLDivElement[];

      const animatedContainers = [
        milestoneContainerRef.current,
        dailyContainerRef.current,
        chatbotContainerRef.current
      ].filter(Boolean);

      // Set will-change hints for all animated elements
      if (animatedContainers.length) {
        gsap.set(animatedContainers, { willChange: "transform, opacity" });
      }
      if (dailyCards.length) {
        gsap.set(dailyCards, { 
          willChange: "transform, opacity",
          force3D: true,
          backfaceVisibility: "hidden"
        });
      }
      if (chatMessages.length) {
        gsap.set(chatMessages, { 
          willChange: "transform, opacity",
          force3D: true,
          backfaceVisibility: "hidden"
        });
      }

      const timeline = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });

      // Hero text animation
      if (heroTextRef.current) {
        timeline.from(heroTextRef.current, { opacity: 0, y: 30, duration: 0.8 });
      }

      // 1. Milestone container animation (오른쪽 위에서 왼쪽 아래로 떨어지듯이)
      if (milestoneContainerRef.current) {
        gsap.set(milestoneContainerRef.current, { 
          willChange: "transform, opacity",
          force3D: true 
        });
        
        timeline.from(milestoneContainerRef.current, {
          opacity: 0,
          x: 600,
          y: -400,
          scale: 0.8,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.2");
      }

      // 2. Milestone cards animation (순차적으로)
      // Cards appear after container has mostly landed
      if (milestoneCards.length) {
        timeline.from(milestoneCards, {
          opacity: 0,
          scale: 0.95,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.6"); // Start 0.6s before container finishes (overlap for smooth transition)
      }

      // 3. Daily Report container animation (마일스톤 완료 후 시작)
      if (dailyContainerRef.current) {
        gsap.set(dailyContainerRef.current, { 
          willChange: "transform, opacity",
          force3D: true 
        });
        
        timeline.from(dailyContainerRef.current, {
          opacity: 0,
          x: 600,
          y: -400,
          scale: 0.8,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.3"); // Start before previous animation finishes for faster sequence
      }

      // 4. Daily cards stagger animation (개별 카드 순차 애니메이션)
      // Optimized with minimal stagger and GPU acceleration
      if (dailyCards.length) {
        timeline.from(dailyCards, {
          opacity: 0,
          scale: 0.95,
          stagger: 0.05, // Reduced from 0.08s for faster sequence
          duration: 0.6, // Shorter duration for snappier feel
          ease: "power2.out",
          onComplete: () => {
            // Clear will-change after animation
            dailyCards.forEach(card => {
              if (card) gsap.set(card, { clearProps: "willChange" });
            });
          }
        }, "-=0.6"); // Start 0.6s before container finishes (overlap for smooth transition)
      }

      // 5. Chatbot container animation (일일 보고서 완료 후 시작)
      if (chatbotContainerRef.current) {
        gsap.set(chatbotContainerRef.current, { 
          willChange: "transform, opacity",
          force3D: true 
        });
        
        timeline.from(chatbotContainerRef.current, {
          opacity: 0,
          x: 600,
          y: -400,
          scale: 0.8,
          duration: 1.2,
          ease: "power3.out"
        }, "-=0.3"); // Start before previous animation finishes for faster sequence
      }

      // 6. Chatbot messages stagger animation (챗봇 메시지 순차 애니메이션)
      // Optimized with minimal stagger and GPU acceleration
      if (chatMessages.length) {
        timeline.from(chatMessages, {
          opacity: 0,
          scale: 0.95,
          stagger: 0.05,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            // Clear will-change after animation
            chatMessages.forEach(msg => {
              if (msg) gsap.set(msg, { clearProps: "willChange" });
            });
          }
        }, "-=0.6"); // Start 0.6s before container finishes (overlap for smooth transition)
      }

      timeline.call(() => {
        if (animatedContainers.length) {
          gsap.set(animatedContainers, { clearProps: "willChange" });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent flex-shrink-0">
              MeanWhile
            </div>
            <div className="flex-shrink-0">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-x-hidden pt-24 md:pt-28 bg-background">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Content */}
        <div className="relative z-10 w-full px-4 md:px-6">
          <div ref={heroTextRef} className="text-center md:text-left mb-12 max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {t('landing.hero.title')}
              </span>
            </h1>
            
            <p className="text-base md:text-lg lg:text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed whitespace-pre-line">
              {t('landing.hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <Button 
                variant="discord" 
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 whitespace-nowrap"
                onClick={() => window.open(DISCORD_INVITE_LINK, '_blank')}
              >
                {t('landing.hero.cta.discord')}
              </Button>
            </div>
          </div>
          
          {/* 3D Stacked Container */}
          <div className="relative w-full py-12 overflow-visible" style={{ perspective: '3000px', width: '1600px',  maxWidth: 'none' }}>
            
            {/* Bottom Layer: Milestone Report (50% opacity with blur overlay) */}
            <div 
              ref={milestoneContainerRef}
              className="absolute grid grid-cols-2 gap-0 bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl opacity-50 flex-shrink-0"
              style={{ 
                width: '1600px',
                height: '400px',
                transform: 'translate(2%) scale(1.1) rotateX(47deg) rotateY(31deg) rotate(324deg) translateZ(-150px)',
                transformOrigin: '0 0',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                zIndex: 1
              }}
            >
              {/* Milestone Report Sections */}
              <div ref={milestoneCard1Ref} className="border-r border-b border-border/20">
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Target className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">Milestone Report</Badge>
                      <h3 className="text-lg font-bold mb-1">{getLocalizedText(milestoneReport.title, language)}</h3>
                      <p className="text-xs text-muted-foreground">{milestoneReport.date} • {milestoneReport.period}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold mb-2">🎯 {t('reports.milestone.executiveSummary')}</h4>
                    <div className="text-xs">
                      <p className="line-clamp-1">• {t('reports.milestone.metrics.totalPosts')}: {milestoneReport.overallMetrics.totalPosts.toLocaleString()}</p>
                      <p className="line-clamp-1">• {t('reports.milestone.metrics.totalLikes')}: {milestoneReport.overallMetrics.totalLikes}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div ref={milestoneCard2Ref} className="border-b border-border/20">
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-3">{t('reports.milestone.metrics.sentimentLabel')}</h3>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{t('reports.milestone.sentiment.positive')}</span>
                        <span className={`text-lg font-bold ${
                          milestoneReport.overallMetrics.sentimentScore > 0.1 ? 'text-green-600' : 
                          milestoneReport.overallMetrics.sentimentScore < -0.1 ? 'text-red-600' : 
                          'text-gray-600'
                        }`}>
                          {milestoneReport.overallMetrics.sentimentScore > 0.1 
                            ? t('reports.milestone.sentiment.positive')
                            : milestoneReport.overallMetrics.sentimentScore < -0.1
                            ? t('reports.milestone.sentiment.negative')
                            : t('reports.milestone.sentiment.neutral')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div ref={milestoneCard3Ref} className="border-r border-border/20">
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-3">{t('reports.milestone.featureFeedback')}</h3>
                  <div className="space-y-2">
                    {milestoneReport.featureFeedback.slice(0, 1).map((feature, idx) => (
                      <div key={idx} className="border rounded-lg p-3 text-sm">
                        <p className="font-semibold line-clamp-1">{getLocalizedText(feature.feature, language)}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{getLocalizedText(feature.description, language)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div ref={milestoneCard4Ref}>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-3">{t('reports.milestone.executiveSummary')}</h3>
                  <div className="space-y-2">
                    <div className="border rounded-lg p-3 text-sm">
                      <p className="font-semibold line-clamp-2">{getLocalizedText(milestoneReport.summary.recommendation, language)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Upper Layer: Daily Report + Chatbot (unified page) */}
            <div 
              className="relative flex flex-row gap-6 items-start"
              style={{ 
                transform: 'translate(2%) scale(1.1) rotateX(47deg) rotateY(31deg) rotate(324deg)',
                transformOrigin: '0 0',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                zIndex: 2
              }}
            >
              
              {/* Daily Report */}
              <div 
                ref={dailyContainerRef}
                className="grid grid-cols-2 gap-0 bg-card/50 backdrop-blur-sm rounded-lg shadow-2xl" 
                style={{ 
                  width: '1600px',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              >
              {/* Top-Left: Summary */}
              <div ref={card4Ref} className="border-r border-b border-border/20">
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <Calendar className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2">Daily Report</Badge>
                      <h3 className="text-lg font-bold mb-1">{getLocalizedText(report.title, language)}</h3>
                      <p className="text-xs text-muted-foreground">{report.date} • {report.period}</p>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-semibold mb-2">📋 {t('reports.daily.summary')}</h4>
                    {report.summary.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs">
                        <span className="text-primary mt-0.5">•</span>
                        <span className="leading-relaxed line-clamp-1">{getLocalizedText(item, language)}</span>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            
            {/* Top-Right: Community Metrics */}
            <div ref={card1Ref} className="border-b border-border/20">
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-3">{t('reports.daily.community.metrics')}</h3>
                  <div className="flex flex-col gap-3 mb-3">
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{t('reports.daily.community.totalPosts')}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold">{report.communityMetrics.totalPosts.toLocaleString()}</span>
                          <span className="text-xs font-medium text-green-600 flex items-center">
                            <TrendingUp className="w-3 h-3" />
                            {report.communityMetrics.postsDelta.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{t('reports.daily.community.comments')}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold">{report.communityMetrics.totalComments.toLocaleString()}</span>
                          <span className="text-xs font-medium text-green-600 flex items-center">
                            <TrendingUp className="w-3 h-3" />
                            {report.communityMetrics.commentsDelta.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-muted-foreground">{t('reports.daily.community.positiveMentions')}</span>
                      <span className="font-medium">{report.communityMetrics.positiveMentions.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${report.communityMetrics.positiveMentions}%` }}></div>
                    </div>
                  </div>
                </div>
            </div>
            
            {/* Bottom-Left: Keywords */}
            <div ref={card2Ref} className="border-r border-border/20">
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-3">{t('reports.daily.keywords')}</h3>
                  <div className="space-y-2">
                    {report.positiveKeywords.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs text-muted-foreground">{getLocalizedText(item.community, language)}</span>
                              <span className="text-sm font-bold text-primary">{getLocalizedText(item.keyword, language)}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{getLocalizedText(item.note, language)}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <span className="text-lg font-bold text-green-600">{item.currentCount}</span>
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            
            {/* Bottom-Right: Issues */}
            <div ref={card3Ref}>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="text-lg font-bold">{t('reports.daily.issues')}</h3>
                  </div>
                  <div className="space-y-2">
                    {report.issues.slice(0, 2).map((issue, idx) => (
                      <div key={idx} className="border rounded-lg p-3 text-sm">
                        <div className="flex items-start justify-between mb-1">
                          <span className="font-semibold line-clamp-1">{getLocalizedText(issue.title, language)}</span>
                          <Badge variant={issue.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs ml-2">
                            {issue.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">{getLocalizedText(issue.description, language)}</p>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            </div>
              
              {/* Right-side blur overlay for chatbot simulator */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 h-full w-48 md:w-56"
                style={{
                  opacity: 1,
                  filter: 'blur(0px)',
                  transform: 'translateZ(0px) translateX(0px)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-l from-background/80 via-background/40 to-transparent backdrop-blur-2xl" />
              </div>

              {/* Chatbot Simulator */}
              <div className="flex-shrink-0" style={{ width: '700px' }}>
                <Card 
                  ref={chatbotContainerRef}
                  className="p-4 bg-card/50 border-border shadow-2xl"
                  style={{ 
                    width: '100%', 
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'translateZ(0)'
                  }}
                >
                {/* Chat Header */}
                <div className="flex items-center gap-3 pb-3 border-b border-border mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{t('landing.chatSimulator.assistantName') || 'Insight Assistant'}</h3>
                    <p className="text-xs text-muted-foreground">
                      {t('landing.chatSimulator.assistantStatus') || 'Online'}
                    </p>
                  </div>
                </div>

                {/* Messages Preview */}
                <div className="space-y-3 h-[280px] overflow-hidden mb-3">
                  {/* Sample User Message */}
                  <div ref={chatMessage1Ref} className="flex gap-2 justify-end">
                    <div className="max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground text-sm">
                      <p>{language === 'ko' ? '신규 업데이트에 대해 플레이어들은 어떻게 말하고 있나요?' : language === 'ja' ? '新しいパッチノートについてプレイヤーは何と言っていますか？' : 'What are players saying about the new update?'}</p>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  </div>
                  
                  {/* Sample Bot Response */}
                  <div ref={chatMessage2Ref} className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="max-w-[80%] rounded-lg p-3 bg-muted text-sm">
                      <p className="leading-relaxed">
                        {language === 'ko' 
                          ? '2,847개 게시물 분석 결과, 커뮤니티 감정은 복합적입니다 (6.2/10). 주요 우려: 난이도 밸런스 (68%). 긍정적: 보스 메카닉 칭찬.'
                          : language === 'ja'
                          ? '2,847件の投稿を分析した結果、コミュニティの感情は複雑です（6.2/10）。主な懸念：難易度バランス（68％）。肯定的：ボスメカニクスの称賛。'
                          : 'Analyzing 2,847 posts: sentiment is mixed (6.2/10). Main concern: difficulty balance (68%). Positive: boss mechanics praised.'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Typing Indicator */}
                  <div ref={chatMessage3Ref} className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        <span>{language === 'ko' ? '분석 중...' : language === 'ja' ? '分析中...' : 'Analyzing...'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    placeholder={language === 'ko' ? '질문을 입력하세요...' : language === 'ja' ? '質問を入力してください...' : 'Type your question...'}
                    className="flex-1 text-sm"
                    disabled
                  />
                  <Button size="icon" disabled>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                {/* Footer Note */}
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-center text-muted-foreground">
                    💡 {language === 'ko' ? '실시간 커뮤니티 데이터 분석' : language === 'ja' ? 'リアルタイムコミュニティデータ分析' : 'Real-time community analysis'}
                  </p>
                </div>
              </Card>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;