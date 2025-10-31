import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DailyReport } from '@/types/reports';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp, TrendingDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { getSupportedLanguageCodes } from '@/contexts/LanguageContext';
import { getLocalizedText } from '@/lib/i18n-utils';
import LanguageSelector from '@/components/LanguageSelector';
import ReportKPI from '@/components/reports/ReportKPI';
import DeltaBar from '@/components/reports/DeltaBar';
import KeywordTable from '@/components/reports/KeywordTable';
import IssueTable from '@/components/reports/IssueTable';
import QuoteList from '@/components/reports/QuoteList';

export default function DailyReportPage() {
  const { lang, game, date } = useParams<{ lang: string; game: string; date: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Localized game label mapping
  const getGameLabel = (gameId: string) => {
    const map: Record<string, { ko: string; en: string; ja: string }> = {
      'game-a': { ko: '가디언테일즈', en: 'Guardian Tales', ja: 'ガーディアンテイルズ' },
      'game-b': { ko: '쿠키런킹덤', en: 'Cookie Run Kingdom', ja: 'クッキーラン：キングダム' },
    };
    return map[gameId]?.[language as 'ko' | 'en' | 'ja'] || gameId;
  };

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dynamic import of JSON data
        const data = await import(`@/data/reports/daily/${game}-${date}.json`);
        setReport(data.default || data);
      } catch (err) {
        console.error('Failed to load report:', err);
        setError('Report not found');
      } finally {
        setLoading(false);
      }
    };

    if (game && date) {
      loadReport();
    }
  }, [game, date]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('reports.daily.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('reports.daily.notFound')}</h1>
          <p className="text-muted-foreground mb-6">{error || t('reports.daily.notFoundDesc')}</p>
          <Button onClick={() => navigate(`/${lang}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('reports.daily.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://meanwhile.gg';
  const currentUrl = `${siteUrl}/${lang}/reports/daily/${game}/${date}`;
  const supportedLangs = getSupportedLanguageCodes();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('reports.daily.title')} - {report.date} | MeanWhile</title>
        <meta name="description" content={getLocalizedText(report.summary?.[0] || { ko: '', en: '', ja: '' }, language)} />
        <link rel="canonical" href={currentUrl} />
        
        {/* hreflang tags for multilingual support */}
        {supportedLangs.map((language) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language}
            href={`${siteUrl}/${language}/reports/daily/${game}/${date}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en/reports/daily/${game}/${date}`} />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": `${t('reports.daily.title')}`,
            "description": getLocalizedText(report.summary?.[0] || { ko: '', en: '', ja: '' }, language),
            "datePublished": report.date,
            "author": {
              "@type": "Organization",
              "name": "MeanWhile"
            },
            "publisher": {
              "@type": "Organization",
              "name": "MeanWhile",
              "logo": {
                "@type": "ImageObject",
                "url": `${siteUrl}/logo.png`
              }
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": `${siteUrl}/${lang}`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Reports",
                "item": `${siteUrl}/${lang}/reports`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": getGameLabel(report.game),
                "item": currentUrl
              }
            ]
          })}
        </script>
      </Helmet>
      
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => navigate(`/${lang}`)} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('reports.daily.back')}
            </Button>
            <LanguageSelector />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('reports.daily.title')}</h1>
            <p className="text-muted-foreground">
              {getGameLabel(report.game)} • {report.date} • {report.period}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ko' ? '📋 요약' : language === 'ja' ? '📋 要約' : '📋 Summary'}
          </h2>
          <ul className="space-y-2">
            {report.summary.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span className="text-base leading-relaxed">{getLocalizedText(item, language)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Positive Keywords */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ko' ? ' 긍정 키워드' : language === 'ja' ? ' 肯定的キーワード' : 'Positive Keywords'}
          </h2>
          <div className="space-y-3">
            {report.positiveKeywords.map((item, index) => (
              <div key={index} className="border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground">{getLocalizedText(item.community, language)}</span>
                      <span className="text-sm font-bold text-primary">{getLocalizedText(item.keyword, language)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{getLocalizedText(item.note, language)}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {item.previousCount > 0 && (
                      <span className="text-xs text-muted-foreground">{item.previousCount} →</span>
                    )}
                    <span className={`text-lg font-bold ${item.currentCount > item.previousCount ? 'text-green-600' : 'text-primary'}`}>
                      {item.currentCount}
                    </span>
                    {item.currentCount > item.previousCount && (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Metrics */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ko' ? ' 커뮤니티 지표' : language === 'ja' ? ' コミュニティ指標' : 'Community Metrics'}
          </h2>
          
          {/* Posts and Comments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'ko' ? '전체 게시글 수' : language === 'ja' ? '総投稿数' : 'Total Posts'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{report.communityMetrics.totalPosts.toLocaleString()}</span>
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    report.communityMetrics.postsDelta > 0 ? 'text-green-600' : 
                    report.communityMetrics.postsDelta < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {report.communityMetrics.postsDelta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(report.communityMetrics.postsDelta).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  {language === 'ko' ? '댓글 수' : language === 'ja' ? 'コメント数' : 'Comments'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{report.communityMetrics.totalComments.toLocaleString()}</span>
                  <span className={`text-sm font-medium flex items-center gap-1 ${
                    report.communityMetrics.commentsDelta > 0 ? 'text-green-600' : 
                    report.communityMetrics.commentsDelta < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {report.communityMetrics.commentsDelta > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {Math.abs(report.communityMetrics.commentsDelta).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Sentiment Distribution */}
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-3">
              {language === 'ko' ? '여론 분석' : language === 'ja' ? '世論分析' : 'Sentiment Analysis'}
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    {language === 'ko' ? '긍정 언급' : language === 'ja' ? '肯定的言及' : 'Positive Mentions'}
                  </span>
                  <span className="font-medium">
                    {report.communityMetrics.positiveMentions.toFixed(1)}%
                    <span className={`ml-2 text-xs ${report.communityMetrics.positiveDelta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ({report.communityMetrics.positiveDelta >= 0 ? '+' : ''}{report.communityMetrics.positiveDelta.toFixed(1)}%p)
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${report.communityMetrics.positiveMentions}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    {language === 'ko' ? '개선/건의 언급' : language === 'ja' ? '改善/提案言及' : 'Improvement Mentions'}
                  </span>
                  <span className="font-medium">
                    {report.communityMetrics.improvementMentions.toFixed(1)}%
                    <span className={`ml-2 text-xs ${report.communityMetrics.improvementDelta >= 0 ? 'text-orange-600' : 'text-blue-600'}`}>
                      ({report.communityMetrics.improvementDelta >= 0 ? '+' : ''}{report.communityMetrics.improvementDelta.toFixed(1)}%p)
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: `${report.communityMetrics.improvementMentions}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">
                    {language === 'ko' ? '중립' : language === 'ja' ? '中立' : 'Neutral'}
                  </span>
                  <span className="font-medium">
                    {report.communityMetrics.neutralMentions.toFixed(1)}%
                    <span className={`ml-2 text-xs ${report.communityMetrics.neutralDelta >= 0 ? 'text-gray-600' : 'text-gray-600'}`}>
                      ({report.communityMetrics.neutralDelta >= 0 ? '+' : ''}{report.communityMetrics.neutralDelta.toFixed(1)}%p)
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-400" style={{ width: `${report.communityMetrics.neutralMentions}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Issues */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {language === 'ko' ? ' 주요 이슈' : language === 'ja' ? ' 主要問題' : 'Key Issues'}
          </h2>
          <div className="space-y-3">
            {report.issues.map((issue, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{getLocalizedText(issue.title, language)}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    issue.severity === 'high' ? 'bg-red-100 text-red-700' :
                    issue.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {issue.severity === 'high' ? (language === 'ko' ? '높음' : language === 'ja' ? '高' : 'High') :
                     issue.severity === 'medium' ? (language === 'ko' ? '중간' : language === 'ja' ? '中' : 'Medium') :
                     (language === 'ko' ? '낮음' : language === 'ja' ? '低' : 'Low')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{getLocalizedText(issue.description, language)}</p>
                <span className="text-xs text-muted-foreground">
                  {language === 'ko' ? '언급' : language === 'ja' ? '言及' : 'Mentions'}: {issue.mentions}
                </span>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-4">{t('reports.daily.quotes')}</h2>
          <QuoteList quotes={report.quotes} />
        </section>
      </main>
    </div>
  );
}
