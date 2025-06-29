import { 
  SessionData, 
  UserData, 
  ConversionData, 
  DashboardSummary,
  ChartDataPoint 
} from '@/types/dashboard';

// Helper functions
const randomBetween = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomChoice = <T>(array: T[]): T => 
  array[Math.floor(Math.random() * array.length)];

const randomDate = (start: Date, end: Date): Date => 
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// Mock data constants
const DEVICE_TYPES = ['desktop', 'mobile', 'tablet'];
const BROWSERS = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Opera'];
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 'Japan', 'Brazil', 'India', 'Mexico'];
const CITIES = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'],
  'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton', 'Kitchener'],
  'United Kingdom': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield', 'Edinburgh', 'Bristol', 'Cardiff'],
  'Germany': ['Berlin', 'Hamburg', 'Munich', 'Cologne', 'Frankfurt', 'Stuttgart', 'Düsseldorf', 'Dortmund', 'Essen', 'Leipzig'],
  'France': ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'],
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Newcastle', 'Canberra', 'Sunshine Coast', 'Wollongong'],
  'Japan': ['Tokyo', 'Yokohama', 'Osaka', 'Nagoya', 'Sapporo', 'Fukuoka', 'Kobe', 'Kyoto', 'Kawasaki', 'Saitama'],
  'Brazil': ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador', 'Fortaleza', 'Belo Horizonte', 'Manaus', 'Curitiba', 'Recife', 'Porto Alegre'],
  'India': ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Surat', 'Jaipur'],
  'Mexico': ['Mexico City', 'Guadalajara', 'Monterrey', 'Puebla', 'Tijuana', 'Ciudad Juárez', 'León', 'Zapopan', 'Nezahualcóyotl', 'Guadalupe']
};

const FIRST_NAMES = [
  'James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth',
  'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Christopher', 'Karen',
  'Charles', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Helen', 'Mark', 'Sandra',
  'Donald', 'Donna', 'Steven', 'Carol', 'Paul', 'Ruth', 'Andrew', 'Sharon', 'Joshua', 'Michelle',
  'Kenneth', 'Laura', 'Kevin', 'Emily', 'Brian', 'Kimberly', 'George', 'Deborah', 'Edward', 'Dorothy'
];

const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
  'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
  'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts'
];

const CONVERSION_TYPES = ['purchase', 'signup', 'download', 'contact', 'newsletter'];
const CONVERSION_SOURCES = ['organic', 'paid', 'direct', 'referral', 'social'];
const CAMPAIGNS = ['summer_sale_2024', 'black_friday', 'new_user_discount', 'referral_program', 'social_media_ads', 'google_ads', 'email_campaign', 'blog_traffic'];

// Generate SessionData
export function generateMockSessionData(): SessionData[] {
  return Array.from({ length: 100 }, (_, i) => {
    const country = randomChoice(COUNTRIES);
    const city = randomChoice(CITIES[country as keyof typeof CITIES]);
    const startTime = randomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date());
    const duration = randomBetween(2, 45);
    const endTime = new Date(startTime.getTime() + duration * 60 * 1000);
    
    return {
      id: `session_${i + 1}`,
      userId: `user_${randomBetween(1, 50)}`,
      startTime,
      endTime,
      duration,
      pageViews: randomBetween(1, 15),
      bounceRate: Math.random() * 0.8 + 0.1, // 10% to 90%
      deviceType: randomChoice(DEVICE_TYPES) as 'desktop' | 'mobile' | 'tablet',
      browser: randomChoice(BROWSERS),
      location: {
        country,
        city,
        region: randomBetween(1, 10).toString()
      },
      referrer: Math.random() > 0.3 ? `https://${randomChoice(['google.com', 'facebook.com', 'twitter.com', 'linkedin.com', 'reddit.com'])}` : undefined,
      isActive: Math.random() > 0.8
    };
  });
}

// Generate UserData
export function generateMockUserData(): UserData[] {
  return Array.from({ length: 50 }, (_, i) => {
    const firstName = randomChoice(FIRST_NAMES);
    const lastName = randomChoice(LAST_NAMES);
    const createdAt = randomDate(new Date(Date.now() - 365 * 24 * 60 * 60 * 1000), new Date());
    const lastLoginAt = randomDate(createdAt, new Date());
    
    return {
      id: `user_${i + 1}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${randomChoice(['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'company.com'])}`,
      name: `${firstName} ${lastName}`,
      avatar: `https://robohash.org/${firstName.toLowerCase()}_${lastName.toLowerCase()}?set=set4&size=200x200`,
      role: randomChoice(['admin', 'user', 'moderator']),
      status: randomChoice(['active', 'inactive', 'suspended']),
      createdAt,
      lastLoginAt: Math.random() > 0.1 ? lastLoginAt : undefined,
      totalSessions: randomBetween(1, 50),
      totalTimeSpent: randomBetween(30, 2400), // 30 minutes to 40 hours
      preferences: {
        theme: randomChoice(['light', 'dark', 'system']),
        notifications: Math.random() > 0.3,
        language: randomChoice(['en', 'es', 'fr', 'de', 'ja', 'pt'])
      },
      metrics: {
        conversionRate: Math.random() * 0.15 + 0.02, // 2% to 17%
        averageSessionDuration: randomBetween(5, 35),
        totalRevenue: Math.random() * 5000 + 100 // $100 to $5100
      }
    };
  });
}

// Generate ConversionData
export function generateMockConversionData(): ConversionData[] {
  return Array.from({ length: 200 }, (_, i) => {
    const type = randomChoice(CONVERSION_TYPES) as 'purchase' | 'signup' | 'download' | 'contact' | 'newsletter';
    const timestamp = randomDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date());
    
    return {
      id: `conversion_${i + 1}`,
      userId: `user_${randomBetween(1, 50)}`,
      sessionId: `session_${randomBetween(1, 100)}`,
      type,
      value: type === 'purchase' ? Math.random() * 500 + 25 : 0, // $25 to $525 for purchases
      currency: type === 'purchase' ? 'USD' : undefined,
      timestamp,
      source: randomChoice(CONVERSION_SOURCES) as 'organic' | 'paid' | 'direct' | 'referral' | 'social',
      campaign: Math.random() > 0.4 ? randomChoice(CAMPAIGNS) : undefined,
      funnel: {
        step: randomChoice(['landing', 'pricing', 'checkout', 'confirmation']),
        stepNumber: randomBetween(1, 4),
        totalSteps: 4
      },
      metadata: type === 'purchase' ? {
        productId: `prod_${randomBetween(1, 20)}`,
        category: randomChoice(['software', 'service', 'consulting', 'training'])
      } : undefined
    };
  });
}

// Generate DashboardSummary from mock data
export function generateMockDashboardSummary(): DashboardSummary {
  const mockSessionData = generateMockSessionData();
  const mockUserData = generateMockUserData();
  const mockConversionData = generateMockConversionData();

  const totalUsers = mockUserData.length;
  const activeUsers = mockUserData.filter(user => user.status === 'active').length;
  const totalSessions = mockSessionData.length;
  const totalRevenue = mockConversionData
    .filter(conv => conv.type === 'purchase')
    .reduce((sum, conv) => sum + (conv.value || 0), 0);

  const conversionRate = mockConversionData.length / totalSessions;
  const averageSessionDuration = mockSessionData.reduce((sum, session) => sum + session.duration, 0) / totalSessions;
  const bounceRate = mockSessionData.reduce((sum, session) => sum + session.bounceRate, 0) / totalSessions;

  // Generate top pages
  const pageViews = mockSessionData.reduce((acc, session) => {
    const pages = ['/dashboard', '/analytics', '/users', '/settings', '/reports', '/profile', '/help', '/pricing'];
    const sessionPages = pages.slice(0, session.pageViews);
    sessionPages.forEach(page => {
      acc[page] = (acc[page] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const topPages = Object.entries(pageViews)
    .map(([path, views]) => ({ path, views, uniqueViews: Math.floor(views * 0.7) }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  // Generate top sources
  const sourceStats = mockSessionData.reduce((acc, session) => {
    const source = session.referrer ? 'referral' : 'direct';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topSources = Object.entries(sourceStats)
    .map(([source, sessions]) => ({
      source,
      sessions,
      conversions: Math.floor(sessions * (Math.random() * 0.1 + 0.05)) // 5-15% conversion rate
    }))
    .sort((a, b) => b.sessions - a.sessions);

  return {
    totalUsers,
    activeUsers,
    totalSessions,
    totalRevenue,
    conversionRate,
    averageSessionDuration,
    bounceRate,
    topPages,
    topSources
  };
}

// Generate time series data for charts
export function generateMockTimeSeriesData(): ChartDataPoint[] {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      value: randomBetween(50, 200),
      label: date.toLocaleDateString()
    };
  });
}

// Legacy exports for backward compatibility (now functions)
export const mockSessionData = generateMockSessionData();
export const mockUserData = generateMockUserData();
export const mockConversionData = generateMockConversionData();
export const mockDashboardSummary = generateMockDashboardSummary();
export const mockTimeSeriesData = generateMockTimeSeriesData();

// Export all data as functions
export const mockData = {
  sessions: generateMockSessionData,
  users: generateMockUserData,
  conversions: generateMockConversionData,
  summary: generateMockDashboardSummary,
  timeSeries: generateMockTimeSeriesData
};
