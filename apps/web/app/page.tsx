'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { StatsOverview } from '@/components/organisms/StatsOverview';
import { AdvancedFilters } from '@/components/organisms/AdvancedFilters';
import { DataTable } from '@/components/molecules/DataTable';
import { DistributionDetailsContainer } from '@/containers/DistributionDetailsContainer';
import { useDistributions } from '@/hooks/useDistributions';
import { DistributionFilters } from '@/types';
import { Button } from '@/components/shared/Button';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  const [selectedDistributionId, setSelectedDistributionId] = useState<string | null>(null);
  const [filters, setFilters] = useState<DistributionFilters>({});

  const {
    distributions,
    loading,
    updateFilters,
    refresh
  } = useDistributions(filters);

  const handleViewDetails = (id: string) => {
    setSelectedDistributionId(id);
  };

  const handleBackToList = () => {
    setSelectedDistributionId(null);
  };

  const handleFiltersChange = (newFilters: Partial<DistributionFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    updateFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    updateFilters({ region: undefined, status: undefined });
  };

  if (selectedDistributionId) {
    return (
      <DashboardLayout title="Distribution Details">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={handleBackToList}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Distributions
          </Button>
        </div>
        <DistributionDetailsContainer distributionId={selectedDistributionId} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      title="Aid Distributions" 
      subtitle="Manage and monitor aid distribution operations across different regions"
    >
      <div className="space-y-8">
        {/* Statistics Overview */}
        <StatsOverview distributions={distributions} />

        {/* Advanced Filters */}
        <AdvancedFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {/* Data Table */}
        <DataTable
          data={distributions}
          onViewDetails={handleViewDetails}
        />
      </div>
    </DashboardLayout>
  );
}
