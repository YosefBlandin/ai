import React, { useState, useEffect, useCallback } from 'react';
import { ChartsPresenter } from '@/components/ChartsPresenter';
import {
  chartService,
  StatusChartData,
  TimelineChartData,
} from '@aidonic/shared-services';

// Container for charts - handles data fetching and business logic
export const ChartsContainer: React.FC = () => {
  const [statusData, setStatusData] = useState<StatusChartData[]>([]);
  const [timelineData, setTimelineData] = useState<TimelineChartData[]>([]);
  const [loading, setLoading] = useState({
    isLoading: true,
    error: undefined as string | undefined,
  });

  const fetchChartData = useCallback(async () => {
    setLoading({ isLoading: true, error: undefined });
    try {
      const [status, timeline] = await Promise.all([
        chartService.getStatusDistribution(),
        chartService.getTimelineDistribution(),
      ]);
      setStatusData(status);
      setTimelineData(timeline);
      setLoading({ isLoading: false, error: undefined });
    } catch (error) {
      setLoading({
        isLoading: false,
        error:
          error instanceof Error ? error.message : 'Failed to fetch chart data',
      });
    }
  }, []);

  const handleRefresh = useCallback(() => {
    fetchChartData();
  }, [fetchChartData]);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  return (
    <ChartsPresenter
      statusData={statusData}
      timelineData={timelineData}
      loading={loading}
      onRefresh={handleRefresh}
    />
  );
};
