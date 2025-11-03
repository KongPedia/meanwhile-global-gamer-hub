import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, TrendingDown, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { DailyReport } from "@/types/reports";
import reportA from "@/data/reports/daily/game-a-2025-10-17.json";
import reportB from "@/data/reports/daily/game-b-2025-10-25.json";
import { getLocalizedText } from "@/lib/i18n-utils";

export default function DailyReportPreview() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const reports = useMemo(() => [reportA as DailyReport, reportB as DailyReport], []);

  // Game identifier mapping
  const getGameLabel = (gameId: string) => {
    const gameMap: Record<string, { ko: string; en: string; ja: string }> = {
      'game-a': { ko: '가디언테일즈', en: 'Guardian Tales', ja: 'ガーディアンテイルズ' },
      'game-b': { ko: '쿠키런킹덤', en: 'Cookie Run Kingdom', ja: 'クッキーラン：キングダム' }
    };
    return gameMap[gameId]?.[language as 'ko' | 'en' | 'ja'] || gameId;
  };

  // Synchronous JSON import avoids layout shift on back navigation

  return (
    <section id="daily-reports" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge variant="secondary" className="mb-4">
            {t('reports.daily.preview.badge')}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            {t('reports.daily.preview.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto whitespace-pre-line">
            {t('reports.daily.preview.subtitle')}
          </p>
        </div>

        {/* Report Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <Badge variant="outline" className="mb-2 text-[10px] px-2 py-0.5">{getLocalizedText(report.title, language)}</Badge>
                  <h3 className="text-xl font-bold mb-1 whitespace-pre-line md:whitespace-normal">
                    {getLocalizedText(report.title, language)}
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
              <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                {/* Mobile: 2 top + 1 bottom, Desktop: 3 columns horizontal */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {/* Total Posts */}
                  <div className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        {report.communityMetrics.postsDelta > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-xs font-bold ${report.communityMetrics.postsDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {report.communityMetrics.postsDelta > 0 && '+'}{report.communityMetrics.postsDelta.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-pre-line text-center">{t('reports.daily.community.totalPosts')}</p>
                    </div>
                  </div>
                  
                  {/* Comments */}
                  <div className="text-center">
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        {report.communityMetrics.commentsDelta > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <span className={`text-xs font-bold ${report.communityMetrics.commentsDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {report.communityMetrics.commentsDelta > 0 && '+'}{report.communityMetrics.commentsDelta.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground whitespace-pre-line text-center">{t('reports.daily.community.comments')}</p>
                    </div>
                  </div>
                  
                  {/* Positive Mentions - Full width on mobile, 1/3 on desktop */}
                  <div className="text-center col-span-2 md:col-span-1">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-bold text-primary">
                        {report.communityMetrics.positiveMentions.toFixed(1)}%
                      </span>
                      <p className="text-xs text-muted-foreground whitespace-pre-line text-center">{t('reports.daily.community.positiveMentions')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <Button variant="ghost" className="w-full group-hover:bg-primary/10">
                {t('reports.daily.preview.view')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
