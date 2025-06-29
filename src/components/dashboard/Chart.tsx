'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Loader2, AlertCircle } from 'lucide-react';

export type ChartType = 'line' | 'bar' | 'area' | 'pie';

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number | boolean; // Allow additional properties
}

export interface ChartProps {
  data: ChartDataPoint[];
  type: ChartType;
  title: string;
  height?: number;
  color?: string;
  className?: string;
  loading?: boolean;
  error?: string | null;
  showGrid?: boolean;
  showLegend?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  dataKey?: string;
  secondaryDataKey?: string;
}

const COLORS = {
  blue: '#3B82F6',
  green: '#10B981',
  red: '#EF4444',
  yellow: '#F59E0B',
  purple: '#8B5CF6',
  pink: '#EC4899',
  indigo: '#6366F1',
  gray: '#6B7280'
};

export default function Chart({
  data,
  type,
  title,
  height = 300,
  color = 'blue',
  className = '',
  loading = false,
  error = null,
  showGrid = true,
  showLegend = true,
  xAxisLabel,
  yAxisLabel,
  dataKey = 'value',
  secondaryDataKey
}: ChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const chartColor = COLORS[color as keyof typeof COLORS] || color;

  if (!isClient) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
        <div className="flex items-center justify-center h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
            <span className="text-gray-500">Loading chart data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="flex flex-col items-center space-y-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <span className="text-red-600 font-medium">Error loading chart</span>
            <span className="text-sm text-gray-500">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center" style={{ height: `${height}px` }}>
          <span className="text-gray-500">No data available</span>
        </div>
      </div>
    );
  }

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
              label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: 0 } : undefined}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'left' } : undefined}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {showLegend && <Legend />}
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={chartColor} 
              strokeWidth={2}
              dot={{ fill: chartColor, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: chartColor, strokeWidth: 2 }}
            />
            {secondaryDataKey && (
              <Line 
                type="monotone" 
                dataKey={secondaryDataKey} 
                stroke={COLORS.green} 
                strokeWidth={2}
                dot={{ fill: COLORS.green, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: COLORS.green, strokeWidth: 2 }}
              />
            )}
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
              label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: 0 } : undefined}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'left' } : undefined}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {showLegend && <Legend />}
            <Bar 
              dataKey={dataKey} 
              fill={chartColor}
              radius={[4, 4, 0, 0]}
            />
            {secondaryDataKey && (
              <Bar 
                dataKey={secondaryDataKey} 
                fill={COLORS.green}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
              label={xAxisLabel ? { value: xAxisLabel, position: 'bottom', offset: 0 } : undefined}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'left' } : undefined}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {showLegend && <Legend />}
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={chartColor} 
              fill={chartColor}
              fillOpacity={0.3}
              strokeWidth={2}
            />
            {secondaryDataKey && (
              <Area 
                type="monotone" 
                dataKey={secondaryDataKey} 
                stroke={COLORS.green} 
                fill={COLORS.green}
                fillOpacity={0.3}
                strokeWidth={2}
              />
            )}
          </AreaChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
              outerRadius={80}
              fill={chartColor}
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.keys(COLORS).length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            {showLegend && <Legend />}
          </PieChart>
        );

      default:
        return <div>Unsupported chart type</div>;
    }
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}   

