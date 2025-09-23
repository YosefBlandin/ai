import { useMemo } from 'react';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

/**
 * Hook for chart configuration
 */
export const useChartConfig = () => {
  const chartConfig = useMemo(
    () => ({
      backgroundColor: '#ffffff',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: 6,
        strokeWidth: 2,
        stroke: '#3B82F6',
      },
      formatYLabel: (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num)) return '0';
        return num.toString();
      },
      formatXLabel: (value: string) => {
        return value || '';
      },
    }),
    []
  );

  const chartDimensions = useMemo(
    () => ({
      width: screenWidth - 32,
      height: 220,
    }),
    []
  );

  return {
    chartConfig,
    chartDimensions,
  };
};
