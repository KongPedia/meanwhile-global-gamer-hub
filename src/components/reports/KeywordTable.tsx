import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Keyword } from '@/types/reports';

interface KeywordTableProps {
  keywords: Keyword[];
}

export default function KeywordTable({ keywords }: KeywordTableProps) {
  if (!keywords || keywords.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No keyword data available
      </div>
    );
  }

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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead className="text-right">Frequency</TableHead>
            <TableHead>Sentiment</TableHead>
            {keywords.some(k => k.score !== undefined) && (
              <TableHead className="text-right">Score</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {keywords.map((keyword, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{keyword.term}</TableCell>
              <TableCell className="text-right">{keyword.frequency.toLocaleString()}</TableCell>
              <TableCell>{getSentimentBadge(keyword.sentiment)}</TableCell>
              {keyword.score !== undefined && (
                <TableCell className="text-right">{keyword.score.toFixed(1)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
