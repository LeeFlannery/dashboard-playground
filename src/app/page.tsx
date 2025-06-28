import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/dashboard/MetricCard';

export default function Dashboard() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <MetricCard 
        title="Active Users" 
        value="1,234" 
        change={12.5} 
        trend="up" 
        />
      {/* More cards */}
      </div>
    </Layout>
  )
}
