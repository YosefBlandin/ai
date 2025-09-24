/**
 * @fileoverview HomePagePresenter component for displaying main page UI
 */

import React from 'react';
import { Distribution, DistributionFilters } from '@aidonic/shared-types';
import { formatNumber } from '@aidonic/shared-utils';
import { FilterSection } from './organisms';
import { DistributionDetailsPresenter } from './DistributionDetailsPresenter';

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
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              ← Back to Distributions
            </button>
          </div>
          <DistributionDetailsPresenter
            distribution={selectedDistribution}
            loading={distributionLoading}
            headerIcon={
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">A</span>
              </div>
            }
            onRefresh={onRefreshDistribution}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Distribution Overview</h1>

        <FilterSection
          regionValue={filters.region || 'All'}
          statusValue={filters.status || 'All'}
          onRegionChange={onRegionFilter}
          onStatusChange={onStatusFilter}
        />

        {loading.isLoading && (
          <div className="text-center py-8">Loading distributions...</div>
        )}

        {loading.error && (
          <div className="text-center py-8 text-red-500">
            Error: {loading.error}
          </div>
        )}

        {!loading.isLoading && !loading.error && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm mt-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Region
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Beneficiaries
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
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
                        No distributions found.
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
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              distribution.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : distribution.status === 'In Progress'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : distribution.status === 'Planned'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-red-100 text-red-800'
                            }`}
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
                            View Details
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
