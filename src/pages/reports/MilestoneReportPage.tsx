import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MilestoneReport } from '@/types/reports';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MilestoneReportPage() {
  const { lang, game, milestoneId } = useParams<{ lang: string; game: string; milestoneId: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [report, setReport] = useState<MilestoneReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" onClick={() => navigate(`/${lang}`)} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('reports.milestone.back')}
          </Button>
          <div>
            <h1 className="text-3xl font-bold mb-2">{report.title}</h1>
            <p className="text-muted-foreground">
              {report.game} • {report.date} • {report.period}
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Executive Summary */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.milestone.executiveSummary')}</h2>
          <p className="text-lg">{report.executiveSummary}</p>
        </section>

        {/* Feature Feedback */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.milestone.featureFeedback')}</h2>
          <div className="space-y-6">
            {report.featureFeedback.map((feedback, index) => (
              <div key={index} className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">{feedback.feature}</h3>
                
                {/* Sentiment bars */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm w-20">Positive</span>
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
                    <span className="text-sm w-20">Negative</span>
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
                    <span className="text-sm w-20">Neutral</span>
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
                      <li key={idx} className="text-sm text-muted-foreground">{comment}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.milestone.comparison')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {report.comparison.map((comp, index) => (
              <div key={index} className="border rounded-lg p-6">
                <p className="text-sm text-muted-foreground mb-2">{comp.metric}</p>
                <p className="text-3xl font-bold mb-2">{comp.current}</p>
                <p className="text-sm text-muted-foreground mb-1">{t('reports.milestone.previous')} {comp.previous}</p>
                <p className={`text-sm font-medium ${comp.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {comp.change >= 0 ? '+' : ''}{comp.change.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.milestone.highlights')}</h2>
          <ul className="space-y-2">
            {report.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Recommendations */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('reports.milestone.recommendations')}</h2>
          <ul className="space-y-2">
            {report.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-primary mt-1">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
