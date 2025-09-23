import { useMemo } from 'react';
import { TimelineChartData } from '@aidonic/shared-types';
import {
  formatChartDate,
  safeParseNumber,
  isValidChartData,
} from '@/utils/chartUtils';

/**
 * Fallback data for when no valid data is available
 */
const FALLBACK_LINE_DATA = {
  labels: ['No Data'],
  datasets: [{ data: [0], strokeWidth: 2 }],
};

/**
 * Hook for transforming line chart data
 */
export const useLineChartData = (timelineData: TimelineChartData[]) => {
  const lineData = useMemo(() => {
    const validTimelineData = timelineData
      .filter(item => isValidChartData(item) && item.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (validTimelineData.length === 0) {
      return FALLBACK_LINE_DATA;
    }

    return {
      labels: validTimelineData.map(item => formatChartDate(item.date)),
      datasets: [
        {
          data: validTimelineData.map(item => safeParseNumber(item.count)),
          strokeWidth: 2,
        },
      ],
    };
  }, [timelineData]);

  const hasData = useMemo(() => {
    return timelineData.some(item => isValidChartData(item) && item.date);
  }, [timelineData]);

  return {
    lineData,
    hasData,
  };
};
