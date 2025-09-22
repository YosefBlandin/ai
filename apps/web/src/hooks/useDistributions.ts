import { useState, useEffect } from 'react';
import { Distribution, DistributionFilters, LoadingState, PaginationState } from '@/types';

export const useDistributions = (filters: DistributionFilters = {}) => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  const updateFilters = (newFilters: Partial<DistributionFilters>) => {
    // Implementation would update filters and refetch data
  };

  const changePage = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  const refresh = () => {
    setLoading({ isLoading: true });
    // Implementation would refetch data
  };

  useEffect(() => {
    // Mock data for now
    const mockDistributions: Distribution[] = [
      {
        id: '1',
        region: 'West Nile',
        date: '2025-06-15',
        status: 'Planned',
        beneficiaries: 1200,
        aidType: 'Food',
        deliveryChannel: 'Vouchers'
      }
    ];
    
    setDistributions(mockDistributions);
    setLoading({ isLoading: false });
  }, [filters]);

  return {
    distributions,
    loading,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh
  };
};
