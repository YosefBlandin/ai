/**
 * @fileoverview Distribution list presenter component for displaying distribution list UI
 */

import React from 'react';
import { DistributionListProps } from '../types/distribution.types';
import { Card, LoadingSpinner } from '@/shared/components/ui';
import { DistributionFilters } from './DistributionFilters';
import { APP_TEXT } from '@aidonic/shared-utils';

export const DistributionListPresenter: React.FC<DistributionListProps> = ({
  distributions,
  loading,
  pagination,
  filters,
  onFiltersChange,
  onPageChange,
  onRefresh,
}) => {
  const clearFilters = () => {
    onFiltersChange({
      region: undefined,
      status: undefined,
      aidType: undefined,
      deliveryChannel: undefined,
    });
  };
  if (loading.isLoading) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-8">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-text-secondary">
              {APP_TEXT.loading.distributions}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-8">
            <p className="text-error-500 mb-4">{loading.error}</p>
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              {APP_TEXT.navigation.tryAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text-primary">
            {APP_TEXT.titles.distributionOverview}
          </h1>
          <p className="text-text-secondary mt-2">
            Manage and track aid distributions across different regions
          </p>
        </div>

        <DistributionFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          onClearFilters={clearFilters}
        />

        <div className="mb-6">
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            Refresh Data
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distributions.map(distribution => (
            <Card
              key={distribution.id}
              className="hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {distribution.region}
                  </h3>
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800">
                    {distribution.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Aid Type:</span>
                    <span className="text-text-primary">
                      {distribution.aidType}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Delivery:</span>
                    <span className="text-text-primary">
                      {distribution.deliveryChannel}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Beneficiaries:</span>
                    <span className="text-text-primary">
                      {distribution.beneficiaries}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Date:</span>
                    <span className="text-text-primary">
                      {new Date(distribution.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {distributions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">
              No distributions found
            </p>
            <p className="text-text-tertiary mt-2">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-text-secondary bg-background-primary border border-border-light rounded-md hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <span className="px-3 py-2 text-sm text-text-primary">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>

              <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-2 text-sm font-medium text-text-secondary bg-background-primary border border-border-light rounded-md hover:bg-background-tertiary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
