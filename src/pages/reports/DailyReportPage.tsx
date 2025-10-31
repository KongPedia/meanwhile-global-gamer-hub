import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DailyReport } from '@/types/reports';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DailyReportPage() {
  const { lang, game, date } = useParams<{ lang: string; game: string; date: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [report, setReport] = useState<DailyReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={() => navigate(`/${lang}`)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('reports.daily.back')}
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('reports.daily.title')}</h1>
              <p className="text-muted-foreground">
                {report.game} • {report.date} • {report.period}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.daily.summary')}</h2>
          <p className="text-lg">{report.summary}</p>
        </section>

        {/* KPIs */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.daily.kpi')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.kpi.map((kpi, index) => (
              <div key={index} className="border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">{kpi.label}</p>
                <p className="text-3xl font-bold mb-2">
                  {kpi.value}{kpi.unit ? ` ${kpi.unit}` : ''}
                </p>
                <p className={`text-sm ${kpi.delta >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.delta >= 0 ? '+' : ''}{kpi.delta}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Keywords */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.daily.keywords')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {report.keywords.map((keyword, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-semibold mb-1">{keyword.term}</p>
                <p className="text-sm text-muted-foreground">{keyword.frequency} {t('reports.daily.mentions')}</p>
                <p className={`text-xs mt-2 ${
                  keyword.sentiment === 'positive' ? 'text-green-600' :
                  keyword.sentiment === 'negative' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {t(`reports.daily.sentiment.${keyword.sentiment}`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Issues */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.daily.issues')}</h2>
          <div className="space-y-4">
            {report.issues.map((issue, index) => (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold">{issue.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    issue.severity === 'high' ? 'bg-red-100 text-red-800' :
                    issue.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {t(`reports.daily.severity.${issue.severity}`)}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">{issue.description}</p>
                <p className="text-sm">
                  <span className="font-medium">{issue.mentions}</span> {t('reports.daily.mentions')}
                  {issue.timeRange && <span className="text-muted-foreground ml-2">• {issue.timeRange}</span>}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quotes */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.daily.quotes')}</h2>
          <div className="space-y-4">
            {report.quotes.map((quote, index) => (
              <div key={index} className="border-l-4 border-primary pl-6 py-4">
                <p className="text-lg italic mb-2">"{quote.text}"</p>
                <p className="text-sm text-muted-foreground">
                  {quote.author && <span>{quote.author} • </span>}
                  <span>{quote.source}</span>
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
