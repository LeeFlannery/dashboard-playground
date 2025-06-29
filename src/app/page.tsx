import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/dashboard/MetricCard';
import Chart from '@/components/dashboard/Chart';
import { generateMockDashboardSummary } from '@/lib/mockData';
import {
  getDailySessionsData,
  getDeviceTypeData,
  getConversionFunnelData,
  getTrafficSourcesData,
  getRevenueOverTimeData,
  getBrowserData
} from '@/lib/chartHelpers';

export default function Dashboard() {
  // Get fresh data from helper functions (randomizes on each call)
  const dailySessionsData = getDailySessionsData();
  const deviceTypeData = getDeviceTypeData();
  const conversionFunnelData = getConversionFunnelData();
  const trafficSourcesData = getTrafficSourcesData();
  const revenueOverTimeData = getRevenueOverTimeData();
  const browserData = getBrowserData();
  const mockDashboardSummary = generateMockDashboardSummary();

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-gray-600">Comprehensive overview of your platform performance</p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Total Users" 
            value={mockDashboardSummary.totalUsers.toLocaleString()} 
            changePercentage={12.5} 
            trendDirection="up" 
          />
          <MetricCard 
            title="Active Users" 
            value={mockDashboardSummary.activeUsers.toLocaleString()} 
            changePercentage={8.2} 
            trendDirection="up" 
          />
          <MetricCard 
            title="Total Sessions" 
            value={mockDashboardSummary.totalSessions.toLocaleString()} 
            changePercentage={15.3} 
            trendDirection="up" 
          />
          <MetricCard 
            title="Revenue" 
            value={Math.round(mockDashboardSummary.totalRevenue).toLocaleString()} 
            changePercentage={22.1} 
            trendDirection="up" 
            valuePrefix="$"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Daily Sessions - Line Chart */}
          <div className="lg:col-span-2 xl:col-span-1">
            <Chart
              type="line"
              title="Daily Sessions"
              data={dailySessionsData}
              height={300}
              color="blue"
              xAxisLabel="Date"
              yAxisLabel="Sessions"
              showGrid={true}
              showLegend={false}
            />
          </div>

          {/* Device Types - Bar Chart */}
          <div className="lg:col-span-2 xl:col-span-1">
            <Chart
              type="bar"
              title="Device Types"
              data={deviceTypeData}
              height={300}
              color="green"
              xAxisLabel="Device"
              yAxisLabel="Percentage"
              showGrid={false}
              showLegend={false}
            />
          </div>

          {/* Conversion Funnel - Area Chart */}
          <div className="lg:col-span-2 xl:col-span-1">
            <Chart
              type="area"
              title="Conversion Funnel"
              data={conversionFunnelData}
              height={300}
              color="purple"
              xAxisLabel="Stage"
              yAxisLabel="Users"
              showGrid={true}
              showLegend={false}
            />
          </div>

          {/* Traffic Sources - Pie Chart */}
          <div className="lg:col-span-2 xl:col-span-1">
            <Chart
              type="pie"
              title="Traffic Sources"
              data={trafficSourcesData}
              height={300}
              color="indigo"
              showLegend={true}
            />
          </div>

          {/* Revenue Trends - Line Chart */}
          <div className="lg:col-span-2 xl:col-span-1">
            <Chart
              type="line"
              title="Revenue Trends"
              data={revenueOverTimeData}
              height={300}
              color="yellow"
              xAxisLabel="Date"
              yAxisLabel="Revenue ($)"
              showGrid={true}
              showLegend={false}
            />
          </div>

          {/* Browser Usage - Bar Chart */}
          <div className="lg:col-span-2 xl:col-span-1">
            <Chart
              type="bar"
              title="Browser Usage"
              data={browserData}
              height={300}
              color="red"
              xAxisLabel="Browser"
              yAxisLabel="Percentage"
              showGrid={false}
              showLegend={false}
            />
          </div>
        </div>

        {/* Additional Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversion Rate Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Rate</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {(mockDashboardSummary.conversionRate * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-gray-500">Overall conversion rate</p>
            </div>
          </div>

          {/* Average Session Duration */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Avg. Session Duration</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {Math.round(mockDashboardSummary.averageSessionDuration)}m
              </div>
              <p className="text-sm text-gray-500">Average time per session</p>
            </div>
          </div>

          {/* Bounce Rate */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Bounce Rate</h3>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {(mockDashboardSummary.bounceRate * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-gray-500">Single-page sessions</p>
            </div>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Pages */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Pages</h3>
            <div className="space-y-3">
              {mockDashboardSummary.topPages.slice(0, 6).map((page, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 truncate flex-1">{page.path}</span>
                  <span className="text-sm font-medium text-gray-900 ml-4">
                    {page.views.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources Breakdown */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
            <div className="space-y-3">
              {mockDashboardSummary.topSources.slice(0, 6).map((source, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 capitalize flex-1">{source.source}</span>
                  <span className="text-sm font-medium text-gray-900 ml-4">
                    {source.sessions.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
