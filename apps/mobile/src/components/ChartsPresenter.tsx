/**
 * @fileoverview ChartsPresenter component for displaying charts UI
 */

import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { StatusChartData, TimelineChartData } from '@aidonic/shared-services';
import { APP_TEXT } from '@aidonic/shared-utils';
import { colors } from '@/styles/tokens';

interface ChartsPresenterProps {
  statusData: StatusChartData[];
  timelineData: TimelineChartData[];
  loading: {
    isLoading: boolean;
    error?: string;
  };
  onRefresh: () => void;
}

// Presenter component for charts display
export const ChartsPresenter: React.FC<ChartsPresenterProps> = ({
  statusData,
  timelineData,
  loading,
  onRefresh,
}) => {
  if (loading.isLoading) {
    return <LoadingSpinner message={APP_TEXT.loading.charts} />;
  }

  if (loading.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{loading.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>
            {APP_TEXT.navigation.tryAgain}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Transform data for charts
  const chartConfig = {
    backgroundColor: colors.background.primary,
    backgroundGradientFrom: colors.background.primary,
    backgroundGradientTo: colors.background.primary,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.primary[500],
    },
  };

  const chartDimensions = {
    width: 300,
    height: 220,
  };

  const pieData = statusData.map((item, index) => ({
    name: item.status || 'Unknown',
    population: item.count,
    color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
    legendFontColor: colors.text.primary,
    legendFontSize: 12,
  }));

  const lineData = {
    labels: timelineData.map(item =>
      new Date(item.date).toLocaleDateString('en-US', { month: 'short' })
    ),
    datasets: [
      {
        data: timelineData.map(item => item.count),
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ErrorBoundary>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading.isLoading}
            onRefresh={onRefresh}
            colors={[colors.primary[500]]}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {APP_TEXT.titles.distributionAnalytics}
          </Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            {APP_TEXT.charts.aidTypeDistribution}
          </Text>
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

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>
            {APP_TEXT.charts.beneficiariesTimeline}
          </Text>
          <LineChart
            data={lineData}
            width={chartDimensions.width}
            height={chartDimensions.height}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>
      </ScrollView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    padding: 16,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text.primary,
  },
  chartContainer: {
    backgroundColor: colors.background.primary,
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.error[500],
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primary[500],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
});
