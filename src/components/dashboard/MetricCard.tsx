import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export type TrendDirection = 'up' | 'down' | 'neutral';

interface MetricCardProps {
  title: string;
  value: string | number;
  changePercentage?: number;
  trendDirection?: TrendDirection;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export default function MetricCard({
  title,
  value,
  changePercentage,
  trendDirection = 'neutral',
  className = '',
  valuePrefix = '',
  valueSuffix = ''
}: MetricCardProps) {
  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getTrendBgColor = () => {
    switch (trendDirection) {
      case 'up':
        return 'bg-green-50';
      case 'down':
        return 'bg-red-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200 ${className}`}>
      {/* Title */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600 truncate">
          {title}
        </h3>
        {trendDirection !== 'neutral' && (
          <div className={`p-1 rounded-full ${getTrendBgColor()}`}>
            {getTrendIcon()}
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-2">
        <p className="text-2xl font-bold text-gray-900">
          {valuePrefix}{value}{valueSuffix}
        </p>
      </div>

      {/* Change Percentage */}
      {changePercentage !== undefined && (
        <div className="flex items-center space-x-1">
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {trendDirection === 'up' ? '+' : ''}{changePercentage}%
          </span>
          <span className="text-sm text-gray-500">vs last period</span>
        </div>
      )}
    </div>
  );
} 