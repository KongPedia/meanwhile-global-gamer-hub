import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { DailyReport } from "@/types/reports";
import { getLocalizedText } from "@/lib/i18n-utils";

export default function DailyReportPreview() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [reports, setReports] = useState<DailyReport[]>([]);

  // Game identifier mapping
  const getGameLabel = (gameId: string) => {
    const gameMap: Record<string, { ko: string; en: string; ja: string }> = {
      'game-a': { ko: '가디언테일즈', en: 'Guardian Tales', ja: 'ガーディアンテイルズ' },
      'game-b': { ko: '쿠키런킹덤', en: 'Cookie Run Kingdom', ja: 'クッキーラン：キングダム' }
    };
    return gameMap[gameId]?.[language as 'ko' | 'en' | 'ja'] || gameId;
  };

  useEffect(() => {
    const loadReports = async () => {
      try {
        const reportA = await import("@/data/reports/daily/game-a-2025-10-17.json");
        const reportB = await import("@/data/reports/daily/game-b-2025-10-25.json");
        setReports([reportA.default as DailyReport, reportB.default as DailyReport]);
      } catch (error) {
        console.error("Failed to load daily reports:", error);
      }
    };
    loadReports();
  }, []);

  return (
    <section id="daily-reports" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            Daily Operations Briefing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {language === 'ko' ? '일일 운영 브리핑' : 
             language === 'ja' ? '日次運営ブリーフィング' :
             'Daily Operations Briefing'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'ko' ? '매일 아침 핵심 이슈 3가지와 위험 신호를 파악하여 즉각적인 운영 액션으로 연결합니다' :
             language === 'ja' ? '毎朝主要な問題3つと危険信号を把握し、即座の運営アクションに繋げます' :
             'Identify 3 key issues and risk signals every morning for immediate operational action'}
          </p>
        </div>

        {/* Report Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report, index) => (
            <Card 
              key={report.id}
              className="p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gaming animate-fade-in-up cursor-pointer group"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(`/${language}/reports/daily/${report.game}/${report.date}`)}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-500/10">
                  <Calendar className="w-6 h-6 text-blue-500" />
                </div>
                <div className="flex-1">
                  <Badge variant="outline" className="mb-2">Daily Report</Badge>
                  <h3 className="text-xl font-bold mb-1">
                    {getGameLabel(report.game)} {language === 'ko' ? '일일 보고서' : language === 'ja' ? 'レポート' : 'Daily Report'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {report.date}
                  </p>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-4">
                {report.summary.slice(0, 2).map((item, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground mb-1 line-clamp-1">
                    • {getLocalizedText(item, language)}
                  </p>
                ))}
              </div>

              {/* Metrics Preview */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-muted/30 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {report.communityMetrics.postsDelta > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs font-bold ${report.communityMetrics.postsDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {report.communityMetrics.postsDelta > 0 && '+'}{report.communityMetrics.postsDelta.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ko' ? '게시글' : language === 'ja' ? '投稿' : 'Posts'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {report.communityMetrics.commentsDelta > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs font-bold ${report.communityMetrics.commentsDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {report.communityMetrics.commentsDelta > 0 && '+'}{report.communityMetrics.commentsDelta.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ko' ? '댓글' : language === 'ja' ? 'コメント' : 'Comments'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-xs font-bold text-primary">
                      {report.communityMetrics.positiveMentions.toFixed(1)}%
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {language === 'ko' ? '긍정' : language === 'ja' ? '肯定' : 'Positive'}
                  </p>
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
