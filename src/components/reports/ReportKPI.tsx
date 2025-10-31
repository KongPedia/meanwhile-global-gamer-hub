import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { KPI } from '@/types/reports';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedText } from '@/lib/i18n-utils';

interface ReportKPIProps {
  kpi: KPI;
}

export default function ReportKPI({ kpi }: ReportKPIProps) {
  const { language } = useLanguage();
  const getDeltaIcon = () => {
    if (kpi.delta > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (kpi.delta < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getDeltaColor = () => {
    if (kpi.delta > 0) return 'text-green-600';
    if (kpi.delta < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{getLocalizedText(kpi.label, language)}</p>
          <p className="text-3xl font-bold">
            {kpi.value.toLocaleString()}
            {kpi.unit && <span className="text-lg ml-1">{kpi.unit}</span>}
          </p>
        </div>
        <div className={`flex items-center gap-1 ${getDeltaColor()}`}>
          {getDeltaIcon()}
          <span className="text-sm font-medium">
            {kpi.delta > 0 && '+'}{kpi.delta}%
          </span>
        </div>
      </div>
    </Card>
  );
}
