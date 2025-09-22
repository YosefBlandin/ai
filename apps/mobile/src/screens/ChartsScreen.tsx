import React from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useCharts } from '@/hooks/useCharts';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const screenWidth = Dimensions.get('window').width;

/**
 * Charts screen displaying aid distribution analytics
 */
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
  };

  const getAidTypeColor = (aidType: string) => {
    const colors = {
      'Food': '#3B82F6',
      'Medical': '#10B981', 
      'Shelter': '#F59E0B',
      'Clothing': '#EF4444',
      'Education': '#8B5CF6'
    };
    return colors[aidType as keyof typeof colors] || '#6B7280';
  };

  const pieData = statusData
    .filter(item => item && item.aidType && typeof item.count === 'number' && item.count > 0)
    .map((item) => {
      const count = Math.max(0, Math.floor(item.count || 0));
      return {
        name: (item.aidType || 'Unknown').substring(0, 10),
        population: isNaN(count) ? 0 : count,
        color: getAidTypeColor(item.aidType),
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      };
    });

  const fallbackPieData = [
    { name: 'No Data', population: 1, color: '#6B7280', legendFontColor: '#7F7F7F', legendFontSize: 12 }
  ];
  
  const fallbackLineData = {
    labels: ['No Data'],
    datasets: [{ data: [0], strokeWidth: 2 }]
  };

  const validTimelineData = timelineData
    .filter(item => item && item.date && typeof item.count === 'number' && item.count >= 0)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const lineData = {
    labels: validTimelineData.map(item => {
      try {
        const date = new Date(item.date);
        if (isNaN(date.getTime())) return 'Invalid';
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      } catch (error) {
        return 'Invalid';
      }
    }),
    datasets: [
      {
        data: validTimelineData.map(item => {
          const count = Math.max(0, Math.floor(item.count || 0));
          return isNaN(count) ? 0 : count;
        }),
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

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Aid Distribution by Type</Text>
          <PieChart
            data={pieData.length > 0 ? pieData : fallbackPieData}
            width={screenWidth - 32}
            height={220}
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
            data={validTimelineData.length > 0 ? lineData : fallbackLineData}
            width={screenWidth - 32}
            height={220}
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
