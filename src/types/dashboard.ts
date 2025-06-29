// MetricCard Component Types
export type TrendDirection = 'up' | 'down' | 'neutral';

export interface MetricCardProps {
  title: string;
  value: string | number;
  changePercentage?: number;
  trendDirection?: TrendDirection;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

// Dashboard Data Types
export interface SessionData {
  id: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // in minutes
  pageViews: number;
  bounceRate: number;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  location: {
    country: string;
    city: string;
    region?: string;
  };
  referrer?: string;
  isActive: boolean;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  avatar: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  lastLoginAt?: Date;
  totalSessions: number;
  totalTimeSpent: number; // in minutes
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
    language: string;
  };
  metrics: {
    conversionRate: number;
    averageSessionDuration: number;
    totalRevenue: number;
  };
}

export interface ConversionData {
  id: string;
  userId: string;
  sessionId: string;
  type: 'purchase' | 'signup' | 'download' | 'contact' | 'newsletter';
  value: number; // monetary value for purchases
  currency?: string;
  timestamp: Date;
  source: 'organic' | 'paid' | 'direct' | 'referral' | 'social';
  campaign?: string;
  funnel: {
    step: string;
    stepNumber: number;
    totalSteps: number;
  };
  metadata?: Record<string, string | number | boolean>;
}

// Dashboard Summary Types
export interface DashboardSummary {
  totalUsers: number;
  activeUsers: number;
  totalSessions: number;
  totalRevenue: number;
  conversionRate: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{
    path: string;
    views: number;
    uniqueViews: number;
  }>;
  topSources: Array<{
    source: string;
    sessions: number;
    conversions: number;
  }>;
}

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface TimeSeriesData {
  label: string;
  data: ChartDataPoint[];
  color?: string;
}

// Filter Types
export interface DashboardFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  userRole?: UserData['role'];
  deviceType?: SessionData['deviceType'];
  conversionType?: ConversionData['type'];
  source?: ConversionData['source'];
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
