/**
 * @fileoverview Home page presenter
 */

import React from 'react';
import {
  Distribution,
  DistributionFilters,
  DistributionStatus,
  LoadingState,
} from '@aidonic/shared-types';
import { APP_TEXT, formatDate } from '@aidonic/shared-utils';
import {
  DataTable,
  StatusBadge,
  Button,
  LoadingSpinner,
} from '@/shared/components/ui';

interface HomePagePresenterProps {
  distributions: Distribution[];
  loading: LoadingState;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  filters: DistributionFilters;
  selectedDistributionId: string | null;
  onViewDetails: (id: string) => void;
  onBackToList: () => void;
  onFiltersChange: (filters: Partial<DistributionFilters>) => void;
  onPageChange: (page: number) => void;
}

export const HomePagePresenter: React.FC<HomePagePresenterProps> = ({
  distributions,
  loading,
  pagination,
  filters,
  selectedDistributionId,
  onViewDetails,
  onBackToList,
  onFiltersChange,
  onPageChange,
}) => {
  // If viewing distribution details
  if (selectedDistributionId) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button
              onClick={onBackToList}
              variant="ghost"
              className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              ← {APP_TEXT.navigation.backToDistributions}
            </Button>
          </div>
          {/* Distribution details will be rendered here by parent component */}
        </div>
      </div>
    );
  }

  // Filter section
  const FilterSection = () => (
    <div className="bg-background-primary border border-border-light rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {APP_TEXT.navigation.filters}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {APP_TEXT.labels.region}
          </label>
          <select
            value={filters.region || 'All'}
            onChange={e => {
              const region =
                e.target.value === 'All' ? undefined : e.target.value;
              onFiltersChange({ region });
            }}
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="All">{APP_TEXT.filters.allRegions}</option>
            <option value="Northern Region">
              {APP_TEXT.regions.northernRegion}
            </option>
            <option value="Southern Region">
              {APP_TEXT.regions.southernRegion}
            </option>
            <option value="Eastern Province">
              {APP_TEXT.regions.easternProvince}
            </option>
            <option value="Western Region">
              {APP_TEXT.regions.westernRegion}
            </option>
            <option value="Central Region">
              {APP_TEXT.regions.centralRegion}
            </option>
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {APP_TEXT.labels.status}
          </label>
          <select
            value={filters.status || 'All'}
            onChange={e => {
              const status =
                e.target.value === 'All'
                  ? undefined
                  : (e.target.value as DistributionStatus);
              onFiltersChange({ status });
            }}
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="All">{APP_TEXT.filters.allStatuses}</option>
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );

  // Table columns configuration
  const columns = [
    {
      key: 'region' as keyof Distribution,
      label: APP_TEXT.labels.region,
    },
    {
      key: 'date' as keyof Distribution,
      label: APP_TEXT.labels.date,
      render: (value: unknown, _item: Distribution) =>
        formatDate(value as string),
    },
    {
      key: 'status' as keyof Distribution,
      label: APP_TEXT.labels.status,
      render: (value: unknown, _item: Distribution) => (
        <StatusBadge status={value as DistributionStatus} />
      ),
    },
    {
      key: 'beneficiaries' as keyof Distribution,
      label: APP_TEXT.labels.beneficiaries,
      render: (value: unknown, _item: Distribution) =>
        (value as number).toLocaleString(),
    },
    {
      key: 'id' as keyof Distribution,
      label: APP_TEXT.labels.actions,
      render: (value: unknown, _item: Distribution) => (
        <Button
          onClick={() => onViewDetails(value as string)}
          variant="ghost"
          className="text-primary-600 hover:text-primary-800 font-medium"
        >
          {APP_TEXT.navigation.viewDetails}
        </Button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-text-primary">
            {APP_TEXT.titles.distributionOverview}
          </h1>
          <a
            href="/charts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-inverse bg-primary-500 hover:bg-primary-600"
          >
            {APP_TEXT.charts.statusDistribution}
          </a>
        </div>

        <FilterSection />

        <div className="bg-background-primary rounded-lg shadow-sm border border-border-light overflow-hidden">
          {loading.isLoading ? (
            <div className="px-6 py-4 text-center text-text-secondary">
              <LoadingSpinner size="sm" />
              <span className="ml-2">{APP_TEXT.loading.distributions}</span>
            </div>
          ) : distributions.length === 0 ? (
            <div className="px-6 py-4 text-center text-text-secondary">
              {APP_TEXT.empty.noDistributionsFound}
            </div>
          ) : (
            <DataTable data={distributions} columns={columns} />
          )}
        </div>

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-text-secondary">
              {APP_TEXT.pagination.showingPage} {pagination.currentPage}{' '}
              {APP_TEXT.pagination.of} {pagination.totalPages}
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                variant="outline"
                size="sm"
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {APP_TEXT.pagination.previous}
              </Button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map(page => (
                <Button
                  key={page}
                  onClick={() => onPageChange(page)}
                  variant={
                    page === pagination.currentPage ? 'primary' : 'outline'
                  }
                  size="sm"
                >
                  {page}
                </Button>
              ))}
              <Button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                variant="outline"
                size="sm"
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {APP_TEXT.pagination.next}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
