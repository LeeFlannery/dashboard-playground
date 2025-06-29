import { 
  generateMockSessionData, 
  generateMockConversionData
} from './mockData';
import { ChartDataPoint } from '@/components/dashboard/Chart';

/**
 * Transform session data into daily sessions for line chart
 * Groups sessions by date and counts them
 */
export function getDailySessionsData(): ChartDataPoint[] {
  const mockSessionData = generateMockSessionData();
  
  const dailySessions = mockSessionData.reduce((acc, session) => {
    const date = session.startTime.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Convert to chart format and sort by date
  return Object.entries(dailySessions)
    .map(([date, count]) => ({
      name: new Date(date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      value: count,
      date: date // Keep original date for sorting
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(({ name, value }) => ({ name, value }));
}

/**
 * Transform session data into device type breakdown for bar chart
 * Groups sessions by device type and calculates percentages
 */
export function getDeviceTypeData(): ChartDataPoint[] {
  const mockSessionData = generateMockSessionData();
  
  const deviceCounts = mockSessionData.reduce((acc, session) => {
    acc[session.deviceType] = (acc[session.deviceType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalSessions = mockSessionData.length;

  return Object.entries(deviceCounts)
    .map(([device, count]) => ({
      name: device.charAt(0).toUpperCase() + device.slice(1), // Capitalize first letter
      value: Math.round((count / totalSessions) * 100),
      count: count // Keep raw count for reference
    }))
    .sort((a, b) => b.value - a.value); // Sort by percentage descending
}

/**
 * Transform conversion data into funnel stages for area chart
 * Creates a conversion funnel from landing to confirmation
 */
export function getConversionFunnelData(): ChartDataPoint[] {
  const mockConversionData = generateMockConversionData();
  
  const funnelStages = [
    { name: 'Landing', step: 1 },
    { name: 'Pricing', step: 2 },
    { name: 'Checkout', step: 3 },
    { name: 'Confirmation', step: 4 }
  ];

  // Count conversions by funnel step
  const stepCounts = mockConversionData.reduce((acc, conversion) => {
    const step = conversion.funnel.stepNumber;
    acc[step] = (acc[step] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  // Calculate funnel progression (each step should have fewer users than the previous)
  let previousCount = generateMockSessionData().length; // Start with total sessions
  const funnelData = funnelStages.map(stage => {
    const stepCount = stepCounts[stage.step] || 0;
    // Ensure funnel progression (each step has fewer users)
    const count = Math.min(stepCount, previousCount);
    previousCount = count;
    
    return {
      name: stage.name,
      value: count,
      step: stage.step
    };
  });

  return funnelData;
}

/**
 * Transform session data into traffic sources for pie chart
 * Groups sessions by referrer and calculates percentages
 */
export function getTrafficSourcesData(): ChartDataPoint[] {
  const mockSessionData = generateMockSessionData();
  
  const sourceCounts = mockSessionData.reduce((acc, session) => {
    let source = 'Direct';
    
    if (session.referrer) {
      if (session.referrer.includes('google')) source = 'Organic';
      else if (session.referrer.includes('facebook') || session.referrer.includes('twitter') || session.referrer.includes('linkedin')) {
        source = 'Social';
      } else if (session.referrer.includes('reddit')) source = 'Social';
      else source = 'Referral';
    }
    
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalSessions = mockSessionData.length;

  return Object.entries(sourceCounts)
    .map(([source, count]) => ({
      name: source,
      value: Math.round((count / totalSessions) * 100),
      count: count // Keep raw count for reference
    }))
    .sort((a, b) => b.value - a.value); // Sort by percentage descending
}

/**
 * Transform conversion data into conversion types for bar chart
 * Groups conversions by type and counts them
 */
export function getConversionTypesData(): ChartDataPoint[] {
  const mockConversionData = generateMockConversionData();
  
  const conversionCounts = mockConversionData.reduce((acc, conversion) => {
    acc[conversion.type] = (acc[conversion.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(conversionCounts)
    .map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter
      value: count,
      type: type // Keep original type for reference
    }))
    .sort((a, b) => b.value - a.value); // Sort by count descending
}

/**
 * Transform session data into browser breakdown for bar chart
 * Groups sessions by browser and calculates percentages
 */
export function getBrowserData(): ChartDataPoint[] {
  const mockSessionData = generateMockSessionData();
  
  const browserCounts = mockSessionData.reduce((acc, session) => {
    acc[session.browser] = (acc[session.browser] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalSessions = mockSessionData.length;

  return Object.entries(browserCounts)
    .map(([browser, count]) => ({
      name: browser,
      value: Math.round((count / totalSessions) * 100),
      count: count // Keep raw count for reference
    }))
    .sort((a, b) => b.value - a.value); // Sort by percentage descending
}

/**
 * Transform session data into geographic breakdown for pie chart
 * Groups sessions by country and calculates percentages
 */
export function getGeographicData(): ChartDataPoint[] {
  const mockSessionData = generateMockSessionData();
  
  const countryCounts = mockSessionData.reduce((acc, session) => {
    acc[session.location.country] = (acc[session.location.country] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalSessions = mockSessionData.length;

  return Object.entries(countryCounts)
    .map(([country, count]) => ({
      name: country,
      value: Math.round((count / totalSessions) * 100),
      count: count // Keep raw count for reference
    }))
    .sort((a, b) => b.value - a.value) // Sort by percentage descending
    .slice(0, 8); // Limit to top 8 countries for readability
}

/**
 * Get revenue data over time for line chart
 * Groups purchase conversions by date and sums values
 */
export function getRevenueOverTimeData(): ChartDataPoint[] {
  const mockConversionData = generateMockConversionData();
  
  const dailyRevenue = mockConversionData
    .filter(conversion => conversion.type === 'purchase')
    .reduce((acc, conversion) => {
      const date = conversion.timestamp.toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + (conversion.value || 0);
      return acc;
    }, {} as Record<string, number>);

  return Object.entries(dailyRevenue)
    .map(([date, revenue]) => ({
      name: new Date(date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      value: Math.round(revenue),
      date: date // Keep original date for sorting
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(({ name, value }) => ({ name, value }));
}

/**
 * Get session duration distribution for bar chart
 * Groups sessions by duration ranges
 */
export function getSessionDurationData(): ChartDataPoint[] {
  const mockSessionData = generateMockSessionData();
  
  const durationRanges = [
    { name: '0-5 min', min: 0, max: 5 },
    { name: '5-15 min', min: 5, max: 15 },
    { name: '15-30 min', min: 15, max: 30 },
    { name: '30+ min', min: 30, max: Infinity }
  ];

  const durationCounts = durationRanges.map(range => {
    const count = mockSessionData.filter(session => 
      session.duration >= range.min && session.duration < range.max
    ).length;
    
    return {
      name: range.name,
      value: count,
      percentage: Math.round((count / mockSessionData.length) * 100)
    };
  });

  return durationCounts;
} 