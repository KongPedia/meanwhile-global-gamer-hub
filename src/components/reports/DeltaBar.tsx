import { Progress } from '@/components/ui/progress';

interface DeltaBarProps {
  value: number;
  label: string;
  max?: number;
}

export default function DeltaBar({ value, label, max = 100 }: DeltaBarProps) {
  const isPositive = value >= 0;
  const percentage = Math.min(Math.abs(value), max);
  
  const getColor = () => {
    if (value > 0) return 'bg-green-500';
    if (value < 0) return 'bg-red-500';
    return 'bg-gray-500';
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {value > 0 && '+'}{value}%
        </span>
      </div>
      <div className="relative">
        <Progress 
          value={percentage} 
          className="h-2"
        />
        <div 
          className={`absolute top-0 left-0 h-2 rounded-full ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
