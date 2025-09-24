/**
 * @fileoverview HomePagePresenter component for displaying main page UI
 */

import React from 'react';
import {
  Distribution,
  DistributionFilters,
  DistributionStatus,
} from '@aidonic/shared-types';
import {
  formatNumber,
  APP_TEXT,
  getStatusColorClass,
} from '@aidonic/shared-utils';
import { FilterSection } from './organisms';
import { DistributionDetailsPresenter } from './DistributionDetailsPresenter';
import { HeaderIcon } from './atoms/HeaderIcon';

interface HomePagePresenterProps {
  distributions: Distribution[];
  loading: {
    isLoading: boolean;
    error?: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  filters: DistributionFilters;
  selectedDistributionId: string | null;
  selectedDistribution: Distribution | null;
  distributionLoading: {
    isLoading: boolean;
    error?: string;
  };
  onViewDetails: (id: string) => void;
  onBackToList: () => void;
  onRegionFilter: (region: string) => void;
  onStatusFilter: (status: string) => void;
  onChangePage: (page: number) => void;
  onRefreshDistribution: () => void;
}

// Presenter component for main page display
export const HomePagePresenter: React.FC<HomePagePresenterProps> = ({
  distributions,
  loading,
  pagination,
  filters,
  selectedDistributionId,
  selectedDistribution,
  distributionLoading,
  onViewDetails,
  onBackToList,
  onRegionFilter,
  onStatusFilter,
  onChangePage,
  onRefreshDistribution,
}) => {
  if (selectedDistributionId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={onBackToList}
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:bg-gray-100"
            >
              {APP_TEXT.navigation.backToDistributions}
            </button>
          </div>
          <DistributionDetailsPresenter
            distribution={selectedDistribution}
            loading={distributionLoading}
            headerIcon={<HeaderIcon />}
            onRefresh={onRefreshDistribution}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          {APP_TEXT.titles.distributionOverview}
        </h1>

        <FilterSection
          regionValue={filters.region || 'All'}
          statusValue={filters.status || 'All'}
          onRegionChange={onRegionFilter}
          onStatusChange={onStatusFilter}
        />

        {loading.isLoading && (
          <div className="text-center py-8">
            {APP_TEXT.loading.distributions}
          </div>
        )}

        {loading.error && (
          <div className="text-center py-8 text-red-600">
            {APP_TEXT.errors.generic}: {loading.error}
          </div>
        )}

        {!loading.isLoading && !loading.error && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {APP_TEXT.table.region}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {APP_TEXT.table.date}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {APP_TEXT.table.status}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {APP_TEXT.table.beneficiaries}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {APP_TEXT.table.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {distributions.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-4 text-gray-500"
                      >
                        {APP_TEXT.empty.noDistributions}
                      </td>
                    </tr>
                  ) : (
                    distributions.map(distribution => (
                      <tr key={distribution.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {distribution.region}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {distribution.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColorClass(distribution.status as DistributionStatus)}`}
                          >
                            {distribution.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatNumber(distribution.beneficiaries)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button
                            onClick={() => onViewDetails(distribution.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            {APP_TEXT.navigation.viewDetails}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {pagination.totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => onChangePage(i + 1)}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  pagination.currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
