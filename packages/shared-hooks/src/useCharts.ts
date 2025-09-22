import { useState, useEffect, useCallback } from 'react';
import { LoadingState } from '@aidonic/shared-types';
import { chartService, StatusChartData, TimelineChartData } from '@aidonic/shared-services';

/**
 * Hook for managing chart data state
 */
export const useCharts = () => {
  const [statusData, setStatusData] = useState<StatusChartData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineChartData[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true });

  const fetchStatusData = useCallback(async () => {
    try {
      const data = await chartService.getStatusDistribution();
      setStatusData(data);
    } catch (error) {
      console.error('Failed to fetch status data:', error);
    }
  }, []);

  const fetchTimelineData = useCallback(async () => {
    try {
      const data = await chartService.getTimelineDistribution();
      setTimelineData(data);
    } catch (error) {
      console.error('Failed to fetch timeline data:', error);
    }
  }, []);

  const fetchAllData = useCallback(async () => {
    setLoading({ isLoading: true });
    try {
      await Promise.all([fetchStatusData(), fetchTimelineData()]);
      setLoading({ isLoading: false });
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch chart data' 
      });
    }
  }, [fetchStatusData, fetchTimelineData]);

  const refresh = useCallback(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return {
    statusData,
    timelineData,
    loading,
    refresh
  };
};
