/**
 * @fileoverview Analytics hook for mobile
 */

import { useCallback } from 'react';
import { useApi } from '@/shared/hooks';
import { analyticsService } from '../services/analytics.service';
import { AnalyticsState, AnalyticsFilters } from '../types/analytics.types';

export const useAnalytics = (filters?: AnalyticsFilters) => {
  const apiCall = useCallback(
    () => analyticsService.getAllAnalyticsData(filters),
    [filters]
  );

  const { data, loading, error, refresh } = useApi<AnalyticsState>(apiCall);

  return {
    statusData: data?.statusData || [],
    timelineData: data?.timelineData || [],
    loading,
    error,
    refresh,
  };
};
