/**
 * @fileoverview DistributionListContainer component for managing distribution list logic
 */

import { DistributionListPresenter } from '@/components/DistributionListPresenter';
import { useDistributions } from '@/hooks/useDistributions';
import { DistributionStatus } from '@aidonic/shared-types';
import React, { useState } from 'react';

interface DistributionListContainerProps {
  onViewDetails: (id: string) => void;
}

// Container for distribution list - handles data fetching and business logic
export const DistributionListContainer: React.FC<
  DistributionListContainerProps
> = ({ onViewDetails }) => {
  const { distributions, loading, filters, updateFilters, refresh } =
    useDistributions();

  const [showFilters, setShowFilters] = useState(false);

  const handleRefresh = () => {
    refresh();
  };

  const handleRegionFilter = (region: string) => {
    const newFilters =
      region === 'All'
        ? { ...filters, region: undefined }
        : { ...filters, region };
    updateFilters(newFilters);
  };

  const handleStatusFilter = (status: string) => {
    const newFilters =
      status === 'All'
        ? { ...filters, status: undefined }
        : { ...filters, status: status as DistributionStatus };
    updateFilters(newFilters);
  };

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <DistributionListPresenter
      distributions={distributions}
      loading={loading}
      filters={filters}
      showFilters={showFilters}
      onToggleFilters={handleToggleFilters}
      onRegionFilter={handleRegionFilter}
      onStatusFilter={handleStatusFilter}
      onRefresh={handleRefresh}
      onViewDetails={onViewDetails}
    />
  );
};
