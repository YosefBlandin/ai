/**
 * @fileoverview HomePageContainer component for managing main page logic
 */

import React, { useState } from 'react';
import { DistributionFilters, DistributionStatus } from '@aidonic/shared-types';
import { useDistributions } from '@/hooks/useDistributions';
import { useDistribution } from '@/hooks/useDistribution';
import { HomePagePresenter } from '@/components/HomePagePresenter';

// Container for main page - handles data fetching and business logic
export const HomePageContainer: React.FC = () => {
  const [selectedDistributionId, setSelectedDistributionId] = useState<
    string | null
  >(null);
  const [filters, setFilters] = useState<DistributionFilters>({});

  const { distributions, loading, pagination, updateFilters, changePage } =
    useDistributions(filters);

  const {
    distribution: selectedDistribution,
    loading: distributionLoading,
    refresh: refreshDistribution,
  } = useDistribution(selectedDistributionId || '');

  const handleViewDetails = (id: string) => {
    setSelectedDistributionId(id);
  };

  const handleBackToList = () => {
    setSelectedDistributionId(null);
  };

  const handleRegionFilter = (region: string) => {
    const newFilters =
      region === 'All'
        ? { ...filters, region: undefined }
        : { ...filters, region };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleStatusFilter = (status: string) => {
    const newFilters =
      status === 'All'
        ? { ...filters, status: undefined }
        : { ...filters, status: status as DistributionStatus };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  return (
    <HomePagePresenter
      distributions={distributions}
      loading={loading}
      pagination={pagination}
      filters={filters}
      selectedDistributionId={selectedDistributionId}
      selectedDistribution={selectedDistribution}
      distributionLoading={distributionLoading}
      onViewDetails={handleViewDetails}
      onBackToList={handleBackToList}
      onRegionFilter={handleRegionFilter}
      onStatusFilter={handleStatusFilter}
      onChangePage={changePage}
      onRefreshDistribution={refreshDistribution}
    />
  );
};
