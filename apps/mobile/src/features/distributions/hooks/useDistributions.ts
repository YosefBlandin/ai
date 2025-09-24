/**
 * @fileoverview Distribution list hook for mobile
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Distribution,
  DistributionFilters,
  LoadingState,
} from '@aidonic/shared-types';
import { distributionServiceInstance } from '../services/distribution.service';
import { usePagination } from '@/shared/hooks';

export const useDistributions = (initialFilters: DistributionFilters = {}) => {
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
  const [filters, setFilters] = useState<DistributionFilters>(initialFilters);

  const { pagination, changePage, updateTotalItems, reset } = usePagination(0, {
    itemsPerPage: 12,
  });

  // Use ref to avoid circular dependency
  const updateTotalItemsRef = useRef(updateTotalItems);
  updateTotalItemsRef.current = updateTotalItems;

  const fetchDistributions = useCallback(async () => {
    try {
      setLoading({ isLoading: true });

      const data = await distributionServiceInstance.getDistributions(
        filters,
        pagination
      );

      setDistributions(data.distributions);
      // Update total items without causing re-render
      if (data.pagination.totalItems !== pagination.totalItems) {
        updateTotalItemsRef.current(data.pagination.totalItems);
      }
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
  }, [
    filters,
    pagination.currentPage,
    pagination.itemsPerPage,
    pagination.totalItems,
  ]);

  const updateFilters = useCallback(
    (newFilters: Partial<DistributionFilters>) => {
      setFilters(prev => ({ ...prev, ...newFilters }));
      reset();
    },
    [reset]
  );

  const refresh = useCallback(() => {
    fetchDistributions();
  }, [fetchDistributions]);

  useEffect(() => {
    fetchDistributions();
  }, [filters, pagination.currentPage, pagination.itemsPerPage]);

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
