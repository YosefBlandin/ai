'use client';

/**
 * @fileoverview Distribution list container
 */

import React from 'react';
import { useDistributions } from '../hooks/useDistributions';
import { DistributionListPresenter } from '../components/DistributionListPresenter';
import { DistributionFilters } from '@aidonic/shared-types';

interface DistributionListContainerProps {
  initialFilters?: DistributionFilters;
}

export const DistributionListContainer: React.FC<
  DistributionListContainerProps
> = ({ initialFilters = {} }) => {
  const {
    distributions,
    loading,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh,
  } = useDistributions(initialFilters);

  return (
    <DistributionListPresenter
      distributions={distributions}
      loading={loading}
      pagination={pagination}
      filters={filters}
      onFiltersChange={updateFilters}
      onPageChange={changePage}
      onRefresh={refresh}
    />
  );
};
