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
import { FilterSection } from './FilterSection';

interface HomePagePresenterProps {
  distributions: Distribution[];
  loading: LoadingState;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  filters: DistributionFilters;
  onViewDetails: (id: string) => void;
  onFiltersChange: (filters: Partial<DistributionFilters>) => void;
  onPageChange: (page: number) => void;
}

export const HomePagePresenter: React.FC<HomePagePresenterProps> = ({
  distributions,
  loading,
  pagination,
  filters,
  onViewDetails,
  onFiltersChange,
  onPageChange,
}) => {
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
    <div>
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

      <FilterSection filters={filters} onFiltersChange={onFiltersChange} />

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
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              page => (
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
              )
            )}
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
  );
};
