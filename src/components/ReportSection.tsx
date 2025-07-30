import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { TrendingUp, Clock, MessageSquare, BarChart3, FileText, Calendar } from "lucide-react";

const ReportSection = () => {
  const { t } = useLanguage();

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
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('report.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('report.subtitle')}
          </p>
        </div>

        {/* Main Content Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Report Preview */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {/* Report Header */}
            <Card className="p-6 bg-card/50 border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-foreground">{reportData.title}</h3>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{reportData.period}</span>
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

          {/* Right Side - Features & Benefits */}
          <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
              <div className="relative z-10 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <FileText className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{t('report.features.title')}</h3>
                <p className="text-muted-foreground">{t('report.features.subtitle')}</p>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid gap-4">
              {[
                {
                  icon: <TrendingUp className="w-5 h-5" />,
                  title: t('report.features.trending.title'),
                  description: t('report.features.trending.description')
                },
                {
                  icon: <BarChart3 className="w-5 h-5" />,
                  title: t('report.features.sentiment.title'),
                  description: t('report.features.sentiment.description')
                },
                {
                  icon: <Clock className="w-5 h-5" />,
                  title: t('report.features.realtime.title'),
                  description: t('report.features.realtime.description')
                },
                {
                  icon: <MessageSquare className="w-5 h-5" />,
                  title: t('report.features.insights.title'),
                  description: t('report.features.insights.description')
                }
              ].map((feature, index) => (
                <Card key={index} className="p-4 bg-card/30 border-border hover:bg-card/50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="text-primary mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportSection;
