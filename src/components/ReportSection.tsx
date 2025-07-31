import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Clock, MessageSquare, BarChart3, FileText, Calendar } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const ReportSection = () => {
  const { t } = useLanguage();
  
  // Embla carousel for key features (mobile only)
  const [featuresEmblaRef, featuresEmblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );
  
  // Embla carousel for report examples (mobile only)
  const [reportsEmblaRef, reportsEmblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5500, stopOnInteraction: false })]
  );

  // 예시 리포트 데이터
  const reportData = {
    title: t('report.example.title'),
    period: t('report.example.period'),
    game: 'Mystic Legends',
    summary: t('report.example.summary'),
    hotTopic: {
      title: t('report.example.hotTopic.title'),
      mentions: 127,
      sentiment: -0.32,
      sentimentLabel: t('report.example.hotTopic.sentimentLabel'),
      timeRange: t('report.example.hotTopic.timeRange'),
      posts: [
        {
          platform: 'Reddit',
          title: t('report.example.hotTopic.post1.title'),
          content: t('report.example.hotTopic.post1.content')
        },
        {
          platform: 'Steam',
          title: t('report.example.hotTopic.post2.title'),
          content: t('report.example.hotTopic.post2.content')
        }
      ]
    }
  };

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-4">
            <FileText className="w-8 h-8 text-primary" />
            <Badge variant="secondary" className="text-sm font-medium">
              {t('report.badge')}
            </Badge>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground whitespace-pre-line md:whitespace-normal">
            {t('report.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto whitespace-pre-line md:whitespace-normal">
            {t('report.subtitle')}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Features & Benefits */}
          <div className="space-y-6 md:space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>

            {/* Key Features */}
            {/* Mobile Carousel */}
            <div className="md:hidden -mx-4">
              <div className="overflow-hidden" ref={featuresEmblaRef}>
                <div className="flex">
                  {[
                    {
                      icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
                      title: t('report.features.trending.title'),
                      description: t('report.features.trending.description')
                    },
                    {
                      icon: <BarChart3 className="w-6 h-6 md:w-8 md:h-8" />,
                      title: t('report.features.sentiment.title'),
                      description: t('report.features.sentiment.description')
                    },
                    {
                      icon: <Clock className="w-6 h-6 md:w-8 md:h-8" />,
                      title: t('report.features.realtime.title'),
                      description: t('report.features.realtime.description')
                    },
                    {
                      icon: <MessageSquare className="w-6 h-6 md:w-8 md:h-8" />,
                      title: t('report.features.insights.title'),
                      description: t('report.features.insights.description')
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex-[0_0_80%] min-w-0 px-3">
                      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-3 h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                        <div className="relative z-10">
                          <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                              <div className="text-primary">{feature.icon}</div>
                            </div>
                            <h4 className="font-semibold text-foreground mb-2 text-sm leading-tight">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Desktop Grid */}
            <div className="hidden md:grid gap-6">
              {[
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: t('report.features.trending.title'),
                  description: t('report.features.trending.description')
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: t('report.features.sentiment.title'),
                  description: t('report.features.sentiment.description')
                },
                {
                  icon: <Clock className="w-8 h-8" />,
                  title: t('report.features.realtime.title'),
                  description: t('report.features.realtime.description')
                },
                {
                  icon: <MessageSquare className="w-8 h-8" />,
                  title: t('report.features.insights.title'),
                  description: t('report.features.insights.description')
                }
              ].map((feature, index) => (
                <div key={index} className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-4 hover:from-primary/15 hover:to-secondary/15 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                  <div className="relative z-10">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 mb-3 bg-primary/20 rounded-full flex items-center justify-center">
                        <div className="text-primary">{feature.icon}</div>
                      </div>
                      <h4 className="font-semibold text-foreground mb-2 text-base">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Report Examples Section */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Mobile Carousel for Report Examples */}
            <div className="md:hidden">
              <div className="overflow-hidden" ref={reportsEmblaRef}>
                <div className="flex">
                  {/* Report Header Card */}
                  <div className="flex-[0_0_90%] min-w-0 pl-4">
                    <Card className="p-4 bg-card/50 border-border h-full">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-foreground">{reportData.title}</h3>
                      </div>
                      <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{reportData.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium text-primary">{reportData.game}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{reportData.summary}</p>
                    </Card>
                  </div>
                  
                  {/* Hot Topic Analysis Card */}
                  <div className="flex-[0_0_90%] min-w-0 pl-4">
                    <Card className="p-4 bg-card/50 border-border h-full">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-orange-500" />
                        <h4 className="text-base font-semibold text-foreground">{reportData.hotTopic.title}</h4>
                      </div>
                      
                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="text-center p-2 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <MessageSquare className="w-4 h-4 text-blue-500" />
                          </div>
                          <div className="text-xl font-bold text-foreground">{reportData.hotTopic.mentions}</div>
                          <div className="text-xs text-muted-foreground">{t('report.stats.mentions')}</div>
                        </div>
                        <div className="text-center p-2 bg-muted/30 rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <BarChart3 className="w-4 h-4 text-green-500" />
                          </div>
                          <div className="text-xl font-bold text-foreground">{reportData.hotTopic.sentiment}</div>
                          <div className="text-xs text-muted-foreground">{reportData.hotTopic.sentimentLabel}</div>
                        </div>
                      </div>

                      {/* Related Posts */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-foreground">{t('report.relatedPosts')}</h5>
                        {reportData.hotTopic.posts.slice(0, 2).map((post, index) => (
                          <div key={index} className="p-2 bg-muted/20 rounded-lg border-l-4 border-primary/30">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">{post.platform}</Badge>
                            </div>
                            <h6 className="text-xs font-medium text-foreground mb-1 line-clamp-1">{post.title}</h6>
                            <p className="text-xs text-muted-foreground line-clamp-2">{post.content}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Desktop Layout for Report Examples */}
            <div className="hidden md:block space-y-6">
              {/* Report Header */}
              <Card className="p-6 bg-card/50 border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-bold text-foreground whitespace-pre-line md:whitespace-normal">{reportData.title}</h3>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span className="whitespace-pre-line md:whitespace-normal">{reportData.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-primary">{reportData.game}</span>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{reportData.summary}</p>
              </Card>

              {/* Hot Topic Analysis */}
              <Card className="p-6 bg-card/50 border-border">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h4 className="text-lg font-semibold text-foreground">{reportData.hotTopic.title}</h4>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <MessageSquare className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{reportData.hotTopic.mentions}</div>
                    <div className="text-xs text-muted-foreground">{t('report.stats.mentions')}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BarChart3 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{reportData.hotTopic.sentiment}</div>
                    <div className="text-xs text-muted-foreground">{reportData.hotTopic.sentimentLabel}</div>
                  </div>
                </div>

                {/* Related Posts */}
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-foreground">{t('report.relatedPosts')}</h5>
                  {reportData.hotTopic.posts.map((post, index) => (
                    <div key={index} className="p-3 bg-muted/20 rounded-lg border-l-4 border-primary/30">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">{post.platform}</Badge>
                      </div>
                      <h6 className="text-sm font-medium text-foreground mb-1">{post.title}</h6>
                      <p className="text-xs text-muted-foreground">{post.content}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
