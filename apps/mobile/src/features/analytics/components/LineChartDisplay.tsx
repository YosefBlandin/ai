/**
 * @fileoverview Line chart display
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartConfigFactory } from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';
import { TimelineData } from '../types/analytics.types';

interface LineChartDisplayProps {
  data: TimelineData[];
  title: string;
}

export const LineChartDisplay: React.FC<LineChartDisplayProps> = ({
  data,
  title,
}) => {
  const chartConfig = ChartConfigFactory.createMobileConfig();

  // Validate and clean data before creating chart data
  const cleanData = data.filter(
    item =>
      item &&
      typeof item.beneficiaries === 'number' &&
      !isNaN(item.beneficiaries) &&
      isFinite(item.beneficiaries) &&
      item.beneficiaries >= 0
  );

  const lineData = {
    labels: cleanData.map(item => item.month),
    datasets: [
      {
        data: cleanData.map(item => item.beneficiaries),
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      },
    ],
  };

  const chartDimensions = {
    width: 300,
    height: 220,
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <LineChart
        data={lineData}
        width={chartDimensions.width}
        height={chartDimensions.height}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});
