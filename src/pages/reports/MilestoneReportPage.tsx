import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { MilestoneReport } from '@/types/reports';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Helmet } from 'react-helmet-async';
import { getSupportedLanguageCodes } from '@/contexts/LanguageContext';
import { getLocalizedText } from '@/lib/i18n-utils';
import LanguageSelector from '@/components/LanguageSelector';
import { useReportAnimations } from '@/hooks/useReportAnimations';

export default function MilestoneReportPage() {
  const { lang, game, milestoneId } = useParams<{ lang: string; game: string; milestoneId: string }>();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [report, setReport] = useState<MilestoneReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Animation refs
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const feedbackRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dynamic import of JSON data
        const data = await import(`@/data/reports/milestone/${game}-${milestoneId}.json`);
        setReport(data.default || data);
      } catch (err) {
        console.error('Failed to load report:', err);
        setError('Report not found');
      } finally {
        setLoading(false);
      }
    };

    if (game && milestoneId) {
      loadReport();
    }
  }, [game, milestoneId]);

  // GSAP animations on mount using custom hook
  useReportAnimations(loading, report, {
    headerRef,
    sectionRefs: [summaryRef, feedbackRef, comparisonRef],
    itemSelectors: [
      {
        ref: summaryRef,
        selector: '.metric-card',
        animation: {
          from: { scale: 0.9, opacity: 0 },
          to: { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, delay: 0.5 }
        }
      },
      {
        ref: summaryRef,
        selector: 'ul > li',
        animation: {
          from: { x: -20, opacity: 0 },
          to: { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.7 }
        }
      },
      {
        ref: feedbackRef,
        selector: '.feedback-card',
        animation: {
          from: { y: 40, opacity: 0 },
          to: { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, delay: 0.9 }
        }
      },
      {
        ref: comparisonRef,
        selector: '.comparison-card',
        animation: {
          from: { x: 30, opacity: 0 },
          to: { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, delay: 1.1 }
        }
      }
    ]
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">{t('reports.milestone.loading')}</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('reports.milestone.notFound')}</h1>
          <p className="text-muted-foreground mb-6">{error || t('reports.milestone.notFoundDesc')}</p>
          <Button onClick={() => navigate(`/${lang}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('reports.milestone.backToHome')}
          </Button>
        </div>
      </div>
    );
  }

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://meanwhile.gg';
  const currentUrl = `${siteUrl}/${lang}/reports/milestone/${game}/${milestoneId}`;
  const supportedLangs = getSupportedLanguageCodes();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(`/${lang}`, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{getLocalizedText(report.title, language)} | MeanWhile</title>
        <meta name="description" content={getLocalizedText(report.summary.achievement, language)} />
        <link rel="canonical" href={currentUrl} />
        
        {/* hreflang tags */}
        {supportedLangs.map((language) => (
          <link
            key={language}
            rel="alternate"
            hrefLang={language}
            href={`${siteUrl}/${language}/reports/milestone/${game}/${milestoneId}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${siteUrl}/en/reports/milestone/${game}/${milestoneId}`} />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": getLocalizedText(report.title, language),
            "description": getLocalizedText(report.summary.achievement, language),
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
      </Helmet>
      
      {/* Header (sticky) */}
      <header ref={headerRef} className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('reports.milestone.back')}
            </Button>
            <LanguageSelector />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{getLocalizedText(report.title, language)}</h1>
            <p className="text-muted-foreground">
              {report.game} • {report.date} • {report.period}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Executive Summary */}
        <section ref={summaryRef} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📊 {t('reports.milestone.executiveSummary')}</h2>
          
          {/* Overall Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-muted/30 rounded-lg">
            <div className="metric-card text-center">
              <p className="text-2xl font-bold text-primary">{report.overallMetrics.totalPosts.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">{t('reports.milestone.metrics.totalPosts')}</p>
            </div>
            <div className="metric-card text-center">
              <p className="text-2xl font-bold text-primary">{report.overallMetrics.totalLikes}</p>
              <p className="text-xs text-muted-foreground">{t('reports.milestone.metrics.totalLikes')}</p>
            </div>
            <div className="metric-card text-center">
              <p className={`text-2xl font-bold ${
                report.overallMetrics.sentimentScore > 0.1 ? 'text-green-600' : 
                report.overallMetrics.sentimentScore < -0.1 ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {report.overallMetrics.sentimentScore > 0.1 
                  ? t('reports.milestone.sentiment.positive')
                  : report.overallMetrics.sentimentScore < -0.1
                  ? t('reports.milestone.sentiment.negative')
                  : t('reports.milestone.sentiment.neutral')}
              </p>
              <p className="text-xs text-muted-foreground">{t('reports.milestone.metrics.sentimentLabel')}</p>
            </div>
          </div>

          {/* Summary Sections */}
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              <span>{getLocalizedText(report.summary.achievement, language)}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 mt-1">✗</span>
              <span>{getLocalizedText(report.summary.problem, language)}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 mt-1">→</span>
              <span>{getLocalizedText(report.summary.recommendation, language)}</span>
            </li>
          </ul>
        </section>

        {/* Feature Feedback */}
        <section ref={feedbackRef} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">👍 {t('reports.milestone.featureFeedback')}</h2>
          <div className="space-y-6">
            {report.featureFeedback.map((feedback, index) => (
              <div key={index} className="feedback-card border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold">{getLocalizedText(feedback.feature, language)}</h3>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                    feedback.sentimentScore > 0.1 ? 'bg-green-100 text-green-700' : 
                    feedback.sentimentScore < -0.1 ? 'bg-red-100 text-red-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {feedback.sentimentScore > 0.1 
                      ? t('reports.milestone.sentiment.positive')
                      : feedback.sentimentScore < -0.1
                      ? t('reports.milestone.sentiment.negative')
                      : t('reports.milestone.sentiment.neutral')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{getLocalizedText(feedback.description, language)}</p>
                
                {/* Sentiment bars */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">{t('reports.milestone.sentiment.positive')}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-green-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(feedback.positiveCount / (feedback.positiveCount + feedback.negativeCount + feedback.neutralCount)) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{feedback.positiveCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">{t('reports.milestone.sentiment.negative')}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-red-500 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(feedback.negativeCount / (feedback.positiveCount + feedback.negativeCount + feedback.neutralCount)) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{feedback.negativeCount}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">{t('reports.milestone.sentiment.neutral')}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-6">
                      <div 
                        className="bg-gray-400 h-6 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(feedback.neutralCount / (feedback.positiveCount + feedback.negativeCount + feedback.neutralCount)) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">{feedback.neutralCount}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top comments */}
                <div>
                  <p className="text-sm font-medium mb-2">{t('reports.milestone.topComments')}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {feedback.topComments.map((comment, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">{getLocalizedText(comment, language)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Before/After Comparison */}
        <section ref={comparisonRef} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📈 {t('reports.milestone.comparisonTitle')}</h2>
          <p className="text-sm text-muted-foreground mb-4">{t('reports.milestone.comparisonCaption')}</p>
          <div className="space-y-3">
            {report.beforeAfterComparison.map((comp, index) => {
              // Convert -1~1 to 0~100
              const beforePercent = ((comp.before + 1) / 2) * 100;
              const afterPercent = ((comp.after + 1) / 2) * 100;
              
              const getSentimentLabel = (score: number) => {
                if (score > 0.5) return t('reports.milestone.sentiment.veryPositive');
                if (score > 0.1) return t('reports.milestone.sentiment.slightlyPositive');
                if (score < -0.5) return t('reports.milestone.sentiment.veryNegative');
                if (score < -0.1) return t('reports.milestone.sentiment.slightlyNegative');
                if (Math.abs(comp.after - comp.before) > 0.3) return t('reports.milestone.sentiment.mixed');
                return t('reports.milestone.sentiment.neutral');
              };

              return (
                <div key={index} className="comparison-card border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-medium">{getLocalizedText(comp.feature, language)}</p>
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      comp.after > 0.5 ? 'bg-green-100 text-green-700' :
                      comp.after > 0.1 ? 'bg-green-50 text-green-600' :
                      comp.after < -0.5 ? 'bg-red-100 text-red-700' :
                      comp.after < -0.1 ? 'bg-red-50 text-red-600' :
                      Math.abs(comp.after - comp.before) > 0.3 ? 'bg-purple-50 text-purple-600' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {getSentimentLabel(comp.after)}
                    </span>
                  </div>
                  
                  {/* Before Bar */}
                  <div className="mb-3">
                    <div className="text-xs mb-1 text-muted-foreground">{t('reports.milestone.beforeLabel')}</div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400 rounded-full transition-all"
                        style={{ width: `${beforePercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* After Bar */}
                  <div>
                    <div className="text-xs mb-1 text-muted-foreground">{t('reports.milestone.afterLabel')}</div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          comp.after > 0.5 ? 'bg-green-500' :
                          comp.after > 0 ? 'bg-green-400' :
                          comp.after < -0.5 ? 'bg-red-500' :
                          'bg-red-400'
                        }`}
                        style={{ width: `${afterPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </main>
    </div>
  );
}
