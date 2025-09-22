import { useState, useEffect, useCallback } from 'react';
import { Distribution, DistributionFilters, DistributionsResponse, LoadingState, PaginationState } from '@/types';
import { distributionService } from '@/services/distribution.service';

// Custom hook following Single Responsibility Principle
export const useDistributions = (initialFilters?: DistributionFilters) => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [filters, setFilters] = useState<DistributionFilters>(initialFilters || {});

  const fetchDistributions = useCallback(async (newFilters?: DistributionFilters) => {
    setLoading({ isLoading: true });
    try {
      const currentFilters = { ...filters, ...newFilters };
      const response = await distributionService.getDistributions(currentFilters);
      
      setDistributions(response.data);
      setPagination({
        currentPage: response.page,
        totalPages: Math.ceil(response.total / response.limit),
        totalItems: response.total,
        itemsPerPage: response.limit
      });
      setFilters(currentFilters);
      setLoading({ isLoading: false });
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
      });
    }
  }, [filters]);

  const updateFilters = useCallback((newFilters: Partial<DistributionFilters>) => {
    fetchDistributions({ ...filters, ...newFilters, page: 1 });
  }, [filters, fetchDistributions]);

  const changePage = useCallback((page: number) => {
    fetchDistributions({ ...filters, page });
  }, [filters, fetchDistributions]);

  const refresh = useCallback(() => {
    fetchDistributions(filters);
  }, [fetchDistributions, filters]);

  useEffect(() => {
    fetchDistributions();
  }, []);

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
