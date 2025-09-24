/**
 * @fileoverview Dashboard presenter for mobile
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { DashboardStats } from '../types/dashboard.types';
import { colors } from '@aidonic/shared-design-tokens';
import { APP_TEXT } from '@aidonic/shared-utils';

interface DashboardPresenterProps {
  stats: DashboardStats;
  loading: boolean;
  error?: string | null;
  onRefresh: () => void;
}

export const DashboardPresenter: React.FC<DashboardPresenterProps> = ({
  stats,
  loading,
  error,
  onRefresh,
}) => {
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          colors={[colors.primary[500]]}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>{APP_TEXT.titles.dashboard}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.totalDistributions}</Text>
          <Text style={styles.statLabel}>
            {APP_TEXT.stats.totalDistributions}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {stats.totalBeneficiaries.toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>
            {APP_TEXT.stats.totalBeneficiaries}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.activeDistributions}</Text>
          <Text style={styles.statLabel}>
            {APP_TEXT.stats.activeDistributions}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.completedDistributions}</Text>
          <Text style={styles.statLabel}>{APP_TEXT.stats.completed}</Text>
        </View>
      </View>
    </ScrollView>
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
  statsContainer: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: colors.background.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary[500],
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
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
  },
});
