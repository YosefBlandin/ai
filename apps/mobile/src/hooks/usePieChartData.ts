import { useMemo } from 'react';
import { AidTypeChartData } from '@aidonic/shared-types';
import {
  getAidTypeColor,
  safeParseNumber,
  isValidChartData,
} from '@/utils/chartUtils';

/**
 * Fallback data for when no valid data is available
 */
const FALLBACK_PIE_DATA = [
  {
    name: 'No Data',
    population: 1,
    color: '#6B7280',
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  },
];

/**
 * Hook for transforming pie chart data
 */
export const usePieChartData = (statusData: AidTypeChartData[]) => {
  const pieData = useMemo(() => {
    const validData = statusData
      .filter(item => isValidChartData(item) && item.aidType && item.count > 0)
      .map(item => {
        const count = safeParseNumber(item.count);
        return {
          name: (item.aidType || 'Unknown').substring(0, 10),
          population: count,
          color: getAidTypeColor(item.aidType),
          legendFontColor: '#7F7F7F',
          legendFontSize: 12,
        };
      });

    return validData.length > 0 ? validData : FALLBACK_PIE_DATA;
  }, [statusData]);

  const hasData = useMemo(() => {
    return statusData.some(
      item => isValidChartData(item) && item.aidType && item.count > 0
    );
  }, [statusData]);

  return {
    pieData,
    hasData,
  };
};
