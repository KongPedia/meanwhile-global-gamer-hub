import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MilestoneReport } from "@/types/reports";
import { getLocalizedText } from "@/lib/i18n-utils";

export default function MilestoneReportPreview() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [reports, setReports] = useState<MilestoneReport[]>([]);

  // Map sentiment score (-1~1) to localized label and color
  const getSentimentInfo = (score: number) => {
    // Thresholds: >0.2 positive, <-0.2 negative, otherwise mixed/neutral
    const abs = Math.abs(score);
    let label = t('reports.milestone.sentiment.neutral');
    let color = 'text-gray-600';

    if (score > 0.2) {
      label = t('reports.milestone.sentiment.positive');
      color = 'text-green-600';
    } else if (score < -0.2) {
      label = t('reports.milestone.sentiment.negative');
      color = 'text-red-600';
    } else if (abs >= 0.05) {
      // small leaning but not strong => mixed
      label = t('reports.milestone.sentiment.mixed');
      color = 'text-purple-600';
    }

    return { label, color };
  };

  useEffect(() => {
    const loadReports = async () => {
      try {
        const reportA = await import("@/data/reports/milestone/game-a-anniversary-2025.json");
        const reportB = await import("@/data/reports/milestone/game-b-update-2025.json");
        setReports([reportA.default as MilestoneReport, reportB.default as MilestoneReport]);
      } catch (error) {
        console.error("Failed to load milestone reports:", error);
      }
    };
    loadReports();
  }, []);

  return (
    <section id="milestone-reports" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Milestone Performance Analysis
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {language === 'ko' ? '마일스톤 성과 분석' : 
             language === 'ja' ? 'マイルストーン成果分析' :
             'Milestone Performance Analysis'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ko' ? '업데이트, 이벤트 단위의 성과와 문제를 정리하여 회고 및 다음 계획에 활용합니다' :
             language === 'ja' ? 'アップデート、イベント単位の成果と問題を整理し、振り返りと次の計画に活用します' :
             'Organize update and event performance for retrospectives and future planning'}
          </p>
        </div>

        {/* Report Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <Card 
              key={report.id}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming animate-fade-in-up cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/${language}/reports/milestone/${report.game}/${report.milestoneId}`)}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Milestone Report</Badge>
                  <h3 className="text-xl font-bold mb-1 line-clamp-2">
                    {getLocalizedText(report.title, language)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {report.game} • {report.date}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {getLocalizedText(report.summary.achievement, language)}
              </p>

              {/* Metrics Preview */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{report.overallMetrics.totalPosts.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ko' ? '게시물' : language === 'ja' ? '投稿数' : 'Posts'}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-primary">{report.overallMetrics.totalLikes}</p>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ko' ? '좋아요' : language === 'ja' ? 'いいね' : 'Likes'}
                  </p>
                </div>
                <div className="text-center">
                  {(() => {
                    const { label, color } = getSentimentInfo(report.overallMetrics.sentimentScore);
                    return (
                      <>
                        <p className={`text-lg font-bold ${color}`}>{label}</p>
                        <p className="text-xs text-muted-foreground">
                          {language === 'ko' ? '감성' : language === 'ja' ? '感性' : 'Sentiment'}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* CTA */}
              <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                {language === 'ko' ? '전체 보고서 보기' : language === 'ja' ? 'レポートを見る' : 'View Full Report'}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
