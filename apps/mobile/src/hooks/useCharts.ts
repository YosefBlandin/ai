import { useState, useEffect, useCallback } from 'react';
import { StatusChartData, TimelineChartData, LoadingState } from '@/types';
import { chartService } from '@/services/chart.service';

// Custom hook for chart data following Single Responsibility Principle
export const useCharts = () => {
  const [statusData, setStatusData] = useState<StatusChartData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineChartData[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });

  const fetchChartData = useCallback(async () => {
    setLoading({ isLoading: true });
    try {
      const [status, timeline] = await Promise.all([
        chartService.getStatusDistribution(),
        chartService.getTimelineDistribution()
      ]);
      
      setStatusData(status);
      setTimelineData(timeline);
      setLoading({ isLoading: false });
    } catch (error) {
      setLoading({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'An error occurred' 
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
    refresh
  };
};
