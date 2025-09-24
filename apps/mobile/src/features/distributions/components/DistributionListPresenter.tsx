/**
 * @fileoverview DistributionListPresenter component for displaying distribution list UI
 */

import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Distribution,
  LoadingState,
  DistributionFilters,
} from '@aidonic/shared-types';
import { APP_TEXT } from '@aidonic/shared-utils';
import { DistributionCard } from './DistributionCard';
import { DistributionFilters as DistributionFiltersComponent } from './DistributionFilters';
import { ErrorBoundary } from '@/shared/components/ui/ErrorBoundary';
import { LoadingSpinner } from '@/shared/components/ui/LoadingSpinner';
import { colors } from '@aidonic/shared-design-tokens';

interface DistributionListPresenterProps {
  distributions: Distribution[];
  loading: LoadingState;
  pagination: unknown;
  filters: DistributionFilters;
  onFiltersChange: (filters: DistributionFilters) => void;
  onPageChange: (page: number) => void;
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
  onFiltersChange,
  onRefresh,
  onViewDetails,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const renderDistribution = ({ item }: { item: Distribution }) => (
    <DistributionCard distribution={item} onPress={onViewDetails} />
  );

  const hasActiveFilters = filters.region || filters.status;

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
            style={[
              styles.filterButton,
              hasActiveFilters && styles.filterButtonActive,
            ]}
            onPress={() => setShowFilters(true)}
          >
            <Text style={styles.filterButtonText}>
              {APP_TEXT.navigation.filters}
            </Text>
          </TouchableOpacity>
        </View>

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

        {showFilters && (
          <DistributionFiltersComponent
            filters={filters}
            onFiltersChange={onFiltersChange}
            onClose={() => setShowFilters(false)}
          />
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
  filterButtonActive: {
    backgroundColor: colors.primary[600],
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
