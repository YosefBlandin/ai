import React, { useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet, TouchableOpacity } from 'react-native';
import { useDistributions } from '@/hooks/useDistributions';
import { DistributionCard } from '@/components/DistributionCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { DistributionFilters } from '@/components/DistributionFilters';

interface DistributionListContainerProps {
  onViewDetails: (id: string) => void;
}

// Container component following Container/Presentation pattern
export const DistributionListContainer: React.FC<DistributionListContainerProps> = ({
  onViewDetails
}) => {
  const {
    distributions,
    loading,
    pagination,
    filters,
    updateFilters,
    refresh
  } = useDistributions();

  const [showFilters, setShowFilters] = useState(false);

  const handleRefresh = () => {
    refresh();
  };

  const handleFilterChange = (newFilters: any) => {
    updateFilters(newFilters);
  };

  const renderDistribution = ({ item }: { item: any }) => (
    <DistributionCard
      distribution={item}
      onPress={onViewDetails}
    />
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
          <Text style={styles.title}>Aid Distributions</Text>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFilters(!showFilters)}
          >
            <Text style={styles.filterButtonText}>Filters</Text>
          </TouchableOpacity>
        </View>

        {showFilters && (
          <DistributionFilters
            filters={filters}
            onFiltersChange={handleFilterChange}
            onClose={() => setShowFilters(false)}
          />
        )}

        <FlatList
          data={distributions}
          renderItem={renderDistribution}
          keyExtractor={(item) => item.id}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
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
});
