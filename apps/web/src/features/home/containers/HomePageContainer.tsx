/**
 * @fileoverview Home page container for managing distribution list business logic
 */

'use client';

import React, { useState } from 'react';
import { DistributionFilters, DistributionStatus } from '@aidonic/shared-types';
import { useDistributions } from '@/features/distributions/hooks/useDistributions';
import { HomePagePresenter } from '../components/HomePagePresenter';

export const HomePageContainer: React.FC = () => {
  const [selectedDistributionId, setSelectedDistributionId] = useState<
    string | null
  >(null);
  const [filters, setFilters] = useState<DistributionFilters>({});

  const { distributions, loading, pagination, updateFilters, changePage } =
    useDistributions(filters);

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
      onViewDetails={handleViewDetails}
      onBackToList={handleBackToList}
      onRegionFilter={handleRegionFilter}
      onStatusFilter={handleStatusFilter}
      onPageChange={changePage}
    />
  );
};
