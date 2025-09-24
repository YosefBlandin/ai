/**
 * @fileoverview DistributionDetailsPresenter component for displaying distribution details UI
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Distribution } from '@aidonic/shared-types';
import { APP_TEXT } from '@aidonic/shared-utils';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';
import { colors } from '@/styles/tokens';

interface DistributionDetailsPresenterProps {
  distribution: Distribution | null;
  loading: {
    isLoading: boolean;
    error?: string;
  };
  statusColor: string;
  aidTypeIcon: string;
  formattedDate: string;
  formattedBeneficiaries: string;
  onRefresh: () => void;
}

// Presenter component for distribution details display
export const DistributionDetailsPresenter: React.FC<
  DistributionDetailsPresenterProps
> = ({
  distribution,
  loading,
  statusColor,
  aidTypeIcon,
  formattedDate,
  formattedBeneficiaries,
  onRefresh,
}) => {
  if (loading.isLoading) {
    return <LoadingSpinner message={APP_TEXT.loading.distributionDetails} />;
  }

  if (loading.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{loading.error}</Text>
      </View>
    );
  }

  if (!distribution) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          {APP_TEXT.errors.distributionNotFound}
        </Text>
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
            onRefresh={onRefresh}
            colors={['#3B82F6']}
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.icon}>{aidTypeIcon}</Text>
            <View>
              <Text style={styles.region}>{distribution.region}</Text>
              <Text style={styles.id}>ID: {distribution.id}</Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: `${statusColor}20` },
            ]}
          >
            <Text style={[styles.statusText, { color: statusColor }]}>
              {distribution.status}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {APP_TEXT.labels.basicInformation}
          </Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>{APP_TEXT.labels.date}:</Text>
              <Text style={styles.value}>{formattedDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>{APP_TEXT.labels.aidType}:</Text>
              <Text style={styles.value}>{distribution.aidType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {APP_TEXT.labels.deliveryChannel}:
              </Text>
              <Text style={styles.value}>{distribution.deliveryChannel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {APP_TEXT.labels.totalBeneficiaries}:
              </Text>
              <Text style={[styles.value, styles.beneficiariesCount]}>
                {formattedBeneficiaries}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {APP_TEXT.labels.statusInformation}
          </Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>{APP_TEXT.labels.currentStatus}:</Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: `${statusColor}20` },
                ]}
              >
                <Text style={[styles.statusText, { color: statusColor }]}>
                  {distribution.status}
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>{APP_TEXT.labels.region}:</Text>
              <Text style={styles.value}>{distribution.region}</Text>
            </View>
          </View>
        </View>

        {distribution.beneficiaryList &&
          distribution.beneficiaryList.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Beneficiaries ({distribution.beneficiaryList.length})
              </Text>
              <View style={styles.beneficiariesContainer}>
                {distribution.beneficiaryList.map(beneficiary => (
                  <View key={beneficiary.id} style={styles.beneficiaryCard}>
                    <Text style={styles.beneficiaryName}>
                      {beneficiary.name}
                    </Text>
                    <Text style={styles.beneficiaryId}>
                      ID: {beneficiary.id}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  region: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  id: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: colors.background.primary,
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: colors.text.secondary,
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    flex: 1,
    textAlign: 'right',
  },
  beneficiariesCount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary[500],
  },
  beneficiariesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  beneficiaryCard: {
    backgroundColor: colors.background.primary,
    borderRadius: 8,
    padding: 12,
    minWidth: '45%',
    shadowColor: colors.neutral[900],
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  beneficiaryName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 4,
  },
  beneficiaryId: {
    fontSize: 12,
    color: colors.text.secondary,
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
