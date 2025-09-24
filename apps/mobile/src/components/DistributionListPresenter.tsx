/**
 * @fileoverview DistributionListPresenter component for displaying distribution list UI
 */

import React from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Distribution, DistributionStatus } from '@aidonic/shared-types';
import {
  APP_TEXT,
  getRegionOptions,
  getStatusOptions,
} from '@aidonic/shared-utils';
import { DistributionCard } from './DistributionCard';
import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from './LoadingSpinner';
import { colors } from '@/styles/tokens';

interface DistributionListPresenterProps {
  distributions: Distribution[];
  loading: {
    isLoading: boolean;
    error?: string;
  };
  filters: {
    region?: string;
    status?: DistributionStatus;
  };
  showFilters: boolean;
  onToggleFilters: () => void;
  onRegionFilter: (region: string) => void;
  onStatusFilter: (status: string) => void;
  onRefresh: () => void;
  onViewDetails: (id: string) => void;
}

// Presenter component for distribution list display
export const DistributionListPresenter: React.FC<
  DistributionListPresenterProps
> = ({
  distributions,
  loading,
  filters,
  showFilters,
  onToggleFilters,
  onRegionFilter,
  onStatusFilter,
  onRefresh,
  onViewDetails,
}) => {
  const renderDistribution = ({ item }: { item: Distribution }) => (
    <DistributionCard distribution={item} onPress={onViewDetails} />
  );

  if (loading.isLoading && distributions.length === 0) {
    return <LoadingSpinner message={APP_TEXT.loading.distributions} />;
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

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={onToggleFilters}
          >
            <Text style={styles.filterButtonText}>
              {APP_TEXT.navigation.filters}
            </Text>
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>{APP_TEXT.labels.region}</Text>
              <View style={styles.filterOptions}>
                {getRegionOptions().map(region => (
                  <TouchableOpacity
                    key={region.value}
                    style={[
                      styles.filterOption,
                      (filters.region === region.value ||
                        (!filters.region && region.value === 'All')) &&
                        styles.filterOptionActive,
                    ]}
                    onPress={() => onRegionFilter(region.value)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        (filters.region === region.value ||
                          (!filters.region && region.value === 'All')) &&
                          styles.filterOptionTextActive,
                      ]}
                    >
                      {region.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>{APP_TEXT.labels.status}</Text>
              <View style={styles.filterOptions}>
                {getStatusOptions().map(status => (
                  <TouchableOpacity
                    key={status.value}
                    style={[
                      styles.filterOption,
                      (filters.status === status.value ||
                        (!filters.status && status.value === 'All')) &&
                        styles.filterOptionActive,
                    ]}
                    onPress={() => onStatusFilter(status.value)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        (filters.status === status.value ||
                          (!filters.status && status.value === 'All')) &&
                          styles.filterOptionTextActive,
                      ]}
                    >
                      {status.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        <FlatList
          data={distributions}
          renderItem={renderDistribution}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={loading.isLoading}
              onRefresh={onRefresh}
              colors={[colors.primary[500]]}
            />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {distributions.length === 0 && !loading.isLoading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {APP_TEXT.empty.noDistributionsFound}
            </Text>
          </View>
        )}
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.background.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.primary[500],
    borderRadius: 6,
  },
  filterButtonText: {
    color: colors.text.inverse,
    fontSize: 14,
    fontWeight: '500',
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
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
  filtersContainer: {
    backgroundColor: colors.background.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.background.tertiary,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border.medium,
  },
  filterOptionActive: {
    backgroundColor: colors.primary[500],
    borderColor: colors.primary[500],
  },
  filterOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.secondary,
  },
  filterOptionTextActive: {
    color: colors.text.inverse,
  },
});
