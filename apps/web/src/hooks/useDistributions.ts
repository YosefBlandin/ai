/**
 * @fileoverview useDistributions hook for managing distributions data
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Distribution,
  DistributionFilters,
  LoadingState,
  PaginationState,
} from '@aidonic/shared-types';
import { distributionService } from '@aidonic/shared-services';

export const useDistributions = (initialFilters: DistributionFilters = {}) => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [filters, setFilters] = useState<DistributionFilters>(initialFilters);

  const fetchDistributions = useCallback(async () => {
    try {
      setLoading({ isLoading: true });
      const response = await distributionService.getDistributions({
        ...filters,
        page: pagination.currentPage,
        limit: pagination.itemsPerPage,
      });

      setDistributions(response.data);
      setPagination(prev => ({
        ...prev,
        totalPages: Math.ceil(response.total / prev.itemsPerPage),
        totalItems: response.total,
      }));
      setLoading({ isLoading: false });
    } catch (error) {
      setLoading({
        isLoading: false,
        error:
          error instanceof Error
            ? error.message
            : 'Failed to fetch distributions',
      });
    }
  }, [filters, pagination.currentPage, pagination.itemsPerPage]);

  const updateFilters = useCallback(
    (newFilters: Partial<DistributionFilters>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
      setPagination(prev => ({ ...prev, currentPage: 1 }));
    },
    []
  );

  const changePage = useCallback((page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  }, []);

  const refresh = useCallback(() => {
    fetchDistributions();
  }, [fetchDistributions]);

  useEffect(() => {
    fetchDistributions();
  }, [fetchDistributions]);

  return {
    distributions,
    loading,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh,
  };
};
