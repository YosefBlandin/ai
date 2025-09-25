/**
 * @fileoverview Distribution list container
 */

import React from 'react';
import { DistributionListPresenter } from '../components/DistributionListPresenter';
import { useDistributions } from '../hooks/useDistributions';

interface DistributionListContainerProps {
  onViewDetails: (id: string) => void;
}

export const DistributionListContainer: React.FC<
  DistributionListContainerProps
> = ({ onViewDetails }) => {
  const {
    distributions,
    loading,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh,
  } = useDistributions();

  return (
    <DistributionListPresenter
      distributions={distributions}
      loading={loading}
      pagination={pagination}
      filters={filters}
      onFiltersChange={updateFilters}
      onPageChange={changePage}
      onRefresh={refresh}
      onViewDetails={onViewDetails}
    />
  );
};
