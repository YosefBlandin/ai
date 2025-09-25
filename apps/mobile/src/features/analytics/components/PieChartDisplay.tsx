/**
 * @fileoverview Pie chart display
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { ChartConfigFactory } from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';
import { ChartData } from '../types/analytics.types';

interface PieChartDisplayProps {
  data: ChartData[];
  title: string;
}

export const PieChartDisplay: React.FC<PieChartDisplayProps> = ({
  data,
  title,
}) => {
  const chartConfig = ChartConfigFactory.createMobileConfig();

  const cleanData = data.filter(
    item =>
      item &&
      typeof item.value === 'number' &&
      !isNaN(item.value) &&
      isFinite(item.value) &&
      item.value >= 0
  );

  const pieData = ChartConfigFactory.createMobilePieData(cleanData);

  const chartDimensions = {
    width: 300,
    height: 220,
  };

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>{title}</Text>
      <PieChart
        data={pieData}
        width={chartDimensions.width}
        height={chartDimensions.height}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        center={[10, 0]}
        absolute
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
});
