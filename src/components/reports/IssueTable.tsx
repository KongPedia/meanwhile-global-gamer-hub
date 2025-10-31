import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Issue } from '@/types/reports';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedText } from '@/lib/i18n-utils';

interface IssueTableProps {
  issues: Issue[];
}

export default function IssueTable({ issues }: IssueTableProps) {
  const { language } = useLanguage();
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No issues reported
      </div>
    );
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            High
          </Badge>
        );
      case 'medium':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-700 border-yellow-500/30 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Medium
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            Low
          </Badge>
        );
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead className="text-right">Mentions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((issue, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{getLocalizedText(issue.title, language)}</TableCell>
              <TableCell className="max-w-md">{getLocalizedText(issue.description, language)}</TableCell>
              <TableCell>{getSeverityBadge(issue.severity)}</TableCell>
              <TableCell className="text-right">{issue.mentions.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
