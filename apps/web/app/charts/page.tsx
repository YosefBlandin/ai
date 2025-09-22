'use client';

import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { StatsOverview } from '@/components/organisms/StatsOverview';
import { ChartsContainer } from '@/containers/ChartsContainer';
import { useDistributions } from '@/hooks/useDistributions';

export default function ChartsPage() {
  const { distributions } = useDistributions({});

  return (
    <DashboardLayout 
      title="Analytics" 
      subtitle="Visualize distribution data and trends across different metrics"
    >
      <div className="space-y-8">
        {/* Statistics Overview */}
        <StatsOverview distributions={distributions} />

        {/* Charts */}
        <ChartsContainer />
      </div>
    </DashboardLayout>
  );
}
