'use client';

/**
 * @fileoverview Single distribution hook using shared patterns
 */

import { useCallback } from 'react';
import { useApi } from '@/shared/hooks';
import { distributionServiceInstance } from '../services/distribution.service';
import { DistributionDetailsState } from '../types/distribution.types';

export const useDistribution = (id: string) => {
  const apiCall = useCallback(
    () => distributionServiceInstance.getDistributionById(id),
    [id]
  );

  const { data, loading, error, refresh } = useApi<DistributionDetailsState>(
    apiCall,
    { immediate: !!id }
  );

  return {
    distribution: data?.distribution || null,
    loading: { isLoading: loading, error: error || undefined },
    error,
    refresh,
  };
};
