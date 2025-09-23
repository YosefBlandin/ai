/**
 * @fileoverview ChartsScreen component for displaying charts
 */

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useCharts } from '@/hooks/useCharts';
import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';

/**
 * Charts screen for analytics
 */
export const ChartsScreen: React.FC = () => {
  const { loading, refresh, chartConfig, chartDimensions, pieData, lineData } =
    useCharts();

  if (loading.isLoading) {
    return <LoadingSpinner message="Loading charts..." />;
  }

  if (loading.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{loading.error}</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading.isLoading}
            onRefresh={refresh}
            colors={['#3B82F6']}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Distribution Analytics</Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Aid Distribution by Type</Text>
          <PieChart
            data={pieData}
            width={chartDimensions.width}
            height={chartDimensions.height}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 0]}
          />
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Beneficiaries Over Time</Text>
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
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
    color: '#EF4444',
    textAlign: 'center',
  },
  noDataContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
