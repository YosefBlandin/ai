/**
 * @fileoverview DistributionDetailsPresenter component for displaying distribution details UI
 * @author Aidonic Team
 * @created 2024
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
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorBoundary } from './ErrorBoundary';

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

/**
 * Presenter component for distribution details display
 */
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
    return <LoadingSpinner message="Loading distribution details..." />;
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
        <Text style={styles.errorText}>Distribution not found</Text>
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
          <Text style={styles.sectionTitle}>Basic Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{formattedDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Aid Type:</Text>
              <Text style={styles.value}>{distribution.aidType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Delivery Channel:</Text>
              <Text style={styles.value}>{distribution.deliveryChannel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Total Beneficiaries:</Text>
              <Text style={[styles.value, styles.beneficiariesCount]}>
                {formattedBeneficiaries}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Current Status:</Text>
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
              <Text style={styles.label}>Region:</Text>
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
    color: '#111827',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
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
    color: '#6B7280',
    flex: 1,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
    textAlign: 'right',
  },
  beneficiariesCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  beneficiariesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  beneficiaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    minWidth: '45%',
    shadowColor: '#000',
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
    color: '#111827',
    marginBottom: 4,
  },
  beneficiaryId: {
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
