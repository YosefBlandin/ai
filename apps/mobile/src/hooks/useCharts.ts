import { useState, useEffect, useCallback } from 'react';
import {
  AidTypeChartData,
  TimelineChartData,
  LoadingState,
} from '@aidonic/shared-types';
import { chartService } from '@/services/chart.service';
import { useChartConfig } from './useChartConfig';
import { usePieChartData } from './usePieChartData';
import { useLineChartData } from './useLineChartData';

/**
 * Hook for managing chart data and configurations
 */
export const useCharts = () => {
  const [statusData, setStatusData] = useState<AidTypeChartData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineChartData[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });

  const { chartConfig, chartDimensions } = useChartConfig();

  const { pieData, hasData: hasPieData } = usePieChartData(statusData);
  const { lineData, hasData: hasLineData } = useLineChartData(timelineData);

  const fetchChartData = useCallback(async () => {
    setLoading({ isLoading: true });
    try {
      const [status, timeline] = await Promise.all([
        chartService.getStatusDistribution(),
        chartService.getTimelineDistribution(),
      ]);

      setStatusData(status);
      setTimelineData(timeline);
      setLoading({ isLoading: false });
    } catch (error) {
      setLoading({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, []);

  const refresh = useCallback(() => {
    fetchChartData();
  }, [fetchChartData]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return {
    statusData,
    timelineData,
    loading,
    refresh,
    chartConfig,
    chartDimensions,
    pieData,
    lineData,
    hasPieData,
    hasLineData,
  };
};
