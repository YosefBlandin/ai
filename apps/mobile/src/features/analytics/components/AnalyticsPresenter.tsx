/**
 * @fileoverview Analytics presenter
 */

import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ErrorBoundary } from '@/shared/components/ui/ErrorBoundary';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { PieChartDisplay } from './PieChartDisplay';
import { LineChartDisplay } from './LineChartDisplay';
import { ErrorState } from './ErrorState';
import { APP_TEXT } from '@aidonic/shared-utils';
import { colors } from '@aidonic/shared-design-tokens';
import { ChartData, TimelineData } from '../types/analytics.types';

interface AnalyticsPresenterProps {
  statusData: ChartData[];
  timelineData: TimelineData[];
  loading: boolean;
  error?: string | null;
  refresh: () => void;
}

export const AnalyticsPresenter: React.FC<AnalyticsPresenterProps> = ({
  statusData,
  timelineData,
  loading,
  error,
  refresh,
}) => {
  if (loading) {
    return <LoadingSpinner message={APP_TEXT.loading.charts} />;
  }

  if (error) {
    return <ErrorState error={error} onRefresh={refresh} />;
  }

  const hasValidStatusData = statusData && statusData.length > 0;
  const hasValidTimelineData = timelineData && timelineData.length > 0;

  return (
    <ErrorBoundary>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh}
            colors={[colors.primary[500]]}
          />
        }
      >
        <View style={styles.header}>
          <Text style={styles.title}>
            {APP_TEXT.titles.distributionAnalytics}
          </Text>
        </View>

        {hasValidStatusData ? (
          <PieChartDisplay data={statusData} title="Aid Distribution by Type" />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>{APP_TEXT.charts.noData}</Text>
          </View>
        )}

        {hasValidTimelineData ? (
          <LineChartDisplay
            data={timelineData}
            title="Beneficiaries Over Time"
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>{APP_TEXT.charts.noData}</Text>
          </View>
        )}
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
    padding: 20,
    paddingTop: 60,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
  },
  noDataContainer: {
    margin: 16,
    padding: 20,
    backgroundColor: colors.background.primary,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  noDataText: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
