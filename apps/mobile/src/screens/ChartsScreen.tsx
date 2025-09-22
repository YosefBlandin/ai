import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useCharts } from '@/hooks/useCharts';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { chartService } from '@/services/chart.service';

const screenWidth = Dimensions.get('window').width;

// Screen component following Single Responsibility Principle
export const ChartsScreen: React.FC = () => {
  const { statusData, timelineData, loading, refresh } = useCharts();

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

  const chartConfig = {
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
      r: '6',
      strokeWidth: '2',
      stroke: '#3B82F6',
    },
  };

  const pieData = statusData.map((item, index) => ({
    name: item.status,
    population: item.count,
    color: chartService.getStatusColor(item.status),
    legendFontColor: '#7F7F7F',
    legendFontSize: 12,
  }));

  const lineData = {
    labels: timelineData.map(item => 
      new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
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
            onRefresh={refresh}
            colors={['#3B82F6']}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>Distribution Analytics</Text>
        </View>

        {/* Status Distribution Pie Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Distributions by Status</Text>
          <PieChart
            data={pieData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 0]}
          />
        </View>

        {/* Timeline Line Chart */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Distributions Over Time</Text>
          <LineChart
            data={lineData}
            width={screenWidth - 32}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <Text style={styles.chartTitle}>Summary</Text>
          <View style={styles.summaryGrid}>
            {statusData.map((item) => (
              <View key={item.status} style={styles.summaryCard}>
                <View style={[styles.statusIndicator, { backgroundColor: chartService.getStatusColor(item.status) }]} />
                <Text style={styles.summaryLabel}>{item.status}</Text>
                <Text style={styles.summaryValue}>{item.count}</Text>
                <Text style={styles.summaryPercentage}>{item.percentage}%</Text>
              </View>
            ))}
          </View>
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
  summaryContainer: {
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
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  summaryPercentage: {
    fontSize: 12,
    color: '#6B7280',
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
});
