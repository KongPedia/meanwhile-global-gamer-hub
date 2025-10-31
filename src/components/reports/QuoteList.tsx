import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Quote } from '@/types/reports';
import { ExternalLink, Quote as QuoteIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedText } from '@/lib/i18n-utils';

interface QuoteListProps {
  quotes: Quote[];
}

export default function QuoteList({ quotes }: QuoteListProps) {
  const { language } = useLanguage();
  if (!quotes || quotes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No quotes available
      </div>
    );
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'border-green-500/30 bg-green-500/5';
      case 'negative':
        return 'border-red-500/30 bg-red-500/5';
      default:
        return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Positive</Badge>;
      case 'negative':
        return <Badge className="bg-red-500/20 text-red-700 border-red-500/30">Negative</Badge>;
      default:
        return <Badge variant="secondary">Neutral</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {quotes.map((quote, index) => (
        <Card key={index} className={`p-4 border-l-4 ${getSentimentColor(quote.sentiment)}`}>
          <div className="flex items-start gap-3">
            <QuoteIcon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-sm md:text-base mb-3 italic">&ldquo;{getLocalizedText(quote.text, language)}&rdquo;</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  {quote.author && (
                    <span className="text-sm font-medium">— {quote.author}</span>
                  )}
                  <span className="text-sm text-muted-foreground">via {quote.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getSentimentBadge(quote.sentiment)}
                  {quote.url && (
                    <a
                      href={quote.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
