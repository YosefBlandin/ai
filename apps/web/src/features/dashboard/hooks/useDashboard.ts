'use client';

/**
 * @fileoverview Dashboard hook using shared patterns
 */

import { useCallback } from 'react';
import { useApi } from '@/shared/hooks';
import { dashboardService } from '../services/dashboard.service';
import { DashboardStats } from '../types/dashboard.types';

export const useDashboard = () => {
  const apiCall = useCallback(() => dashboardService.getDashboardStats(), []);

  const { data, loading, error, refresh } = useApi<DashboardStats>(apiCall);

  return {
    stats: data || {
      totalDistributions: 0,
      totalBeneficiaries: 0,
      activeDistributions: 0,
      completedDistributions: 0,
    },
    loading,
    error,
    refresh,
  };
};
