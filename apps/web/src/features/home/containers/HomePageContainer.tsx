/**
 * @fileoverview Home page container
 */

'use client';

import React, { useState } from 'react';
import { useDistributions } from '@/features/distributions/hooks/useDistributions';
import { HomePagePresenter } from '../components/HomePagePresenter';

export const HomePageContainer: React.FC = () => {
  const [selectedDistributionId, setSelectedDistributionId] = useState<
    string | null
  >(null);

  const {
    distributions,
    loading,
    pagination,
    filters,
    updateFilters,
    changePage,
  } = useDistributions({});

  const handleViewDetails = (id: string) => {
    setSelectedDistributionId(id);
  };

  const handleBackToList = () => {
    setSelectedDistributionId(null);
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
      onFiltersChange={updateFilters}
      onPageChange={changePage}
    />
  );
};
