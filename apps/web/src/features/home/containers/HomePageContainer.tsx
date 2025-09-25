/**
 * @fileoverview Home page container
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDistributions } from '@/features/distributions/hooks/useDistributions';
import { HomePagePresenter } from '../components/HomePagePresenter';

export const HomePageContainer: React.FC = () => {
  const router = useRouter();

  const {
    distributions,
    loading,
    pagination,
    filters,
    updateFilters,
    changePage,
  } = useDistributions({});

  const handleViewDetails = (id: string) => {
    router.push(`/distributions/${id}`);
  };

  return (
    <HomePagePresenter
      distributions={distributions}
      loading={loading}
      pagination={pagination}
      filters={filters}
      onViewDetails={handleViewDetails}
      onFiltersChange={updateFilters}
      onPageChange={changePage}
    />
  );
};
