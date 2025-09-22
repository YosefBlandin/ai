import { DistributionCard } from '@/components/DistributionCard';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { useDistributions } from '@/hooks/useDistributions';
import { Distribution, DistributionStatus } from '@/types';
import React, { useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface DistributionListContainerProps {
  onViewDetails: (id: string) => void;
}

/**
 * Container for distribution list
 */
export const DistributionListContainer: React.FC<
  DistributionListContainerProps
> = ({ onViewDetails }) => {
  const { distributions, loading, filters, updateFilters, refresh } =
    useDistributions();

  const [showFilters, setShowFilters] = useState(false);

  const handleRefresh = () => {
    refresh();
  };

  const handleRegionFilter = (region: string) => {
    const newFilters =
      region === 'All'
        ? { ...filters, region: undefined }
        : { ...filters, region };
    updateFilters(newFilters);
  };

  const handleStatusFilter = (status: string) => {
    const newFilters =
      status === 'All'
        ? { ...filters, status: undefined }
        : { ...filters, status: status as DistributionStatus };
    updateFilters(newFilters);
  };

  const renderDistribution = ({ item }: { item: Distribution }) => (
    <DistributionCard distribution={item} onPress={onViewDetails} />
  );

  if (loading.isLoading && distributions.length === 0) {
    return <LoadingSpinner message="Loading distributions..." />;
  }

  if (loading.error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{loading.error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refresh}>
          <Text style={styles.retryButtonText}>Try Again</Text>
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
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View style={styles.filtersContainer}>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Region</Text>
              <View style={styles.filterOptions}>
                {[
                  'All',
                  'West Nile',
                  'Eastern Province',
                  'Northern Region',
                  'Central Region',
                  'Western Region',
                  'Southern Region',
                ].map(region => (
                  <TouchableOpacity
                    key={region}
                    style={[
                      styles.filterOption,
                      (filters.region === region ||
                        (!filters.region && region === 'All')) &&
                        styles.filterOptionActive,
                    ]}
                    onPress={() => handleRegionFilter(region)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        (filters.region === region ||
                          (!filters.region && region === 'All')) &&
                          styles.filterOptionTextActive,
                      ]}
                    >
                      {region}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.filterRow}>
              <Text style={styles.filterLabel}>Status</Text>
              <View style={styles.filterOptions}>
                {[
                  'All',
                  'Planned',
                  'In Progress',
                  'Completed',
                  'Cancelled',
                ].map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.filterOption,
                      (filters.status === status ||
                        (!filters.status && status === 'All')) &&
                        styles.filterOptionActive,
                    ]}
                    onPress={() => handleStatusFilter(status)}
                  >
                    <Text
                      style={[
                        styles.filterOptionText,
                        (filters.status === status ||
                          (!filters.status && status === 'All')) &&
                          styles.filterOptionTextActive,
                      ]}
                    >
                      {status}
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
              onRefresh={handleRefresh}
              colors={['#3B82F6']}
            />
          }
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />

        {distributions.length === 0 && !loading.isLoading && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No distributions found</Text>
          </View>
        )}
      </View>
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
  },
  filterButtonText: {
    color: '#ffffff',
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
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterRow: {
    marginBottom: 12,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
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
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  filterOptionActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterOptionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterOptionTextActive: {
    color: '#ffffff',
  },
});
