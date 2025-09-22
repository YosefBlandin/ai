'use client';

import { useState } from 'react';
import { DistributionDetailsContainer } from '@/containers/DistributionDetailsContainer';
import { useDistributions } from '@/hooks/useDistributions';
import { DistributionFilters, DistributionStatus } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FilterSection } from '@/components/organisms';

export default function Home() {
  const [selectedDistributionId, setSelectedDistributionId] = useState<
    string | null
  >(null);
  const [filters, setFilters] = useState<DistributionFilters>({});

  const { distributions, loading, pagination, updateFilters, changePage } =
    useDistributions(filters);

  const handleViewDetails = (id: string) => {
    setSelectedDistributionId(id);
  };

  const handleBackToList = () => {
    setSelectedDistributionId(null);
  };

  const handleRegionFilter = (region: string) => {
    const newFilters =
      region === 'All'
        ? { ...filters, region: undefined }
        : { ...filters, region };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  const handleStatusFilter = (status: string) => {
    const newFilters =
      status === 'All'
        ? { ...filters, status: undefined }
        : { ...filters, status: status as DistributionStatus };
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  if (selectedDistributionId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <button
              onClick={handleBackToList}
              className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Distributions
            </button>
          </div>
          <DistributionDetailsContainer
            distributionId={selectedDistributionId}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Aid Distribution Dashboard
          </h1>
          <Link
            href="/charts"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View Charts
          </Link>
        </div>

        <FilterSection
          regionValue={filters.region || 'All'}
          statusValue={filters.status || 'All'}
          onRegionChange={handleRegionFilter}
          onStatusChange={handleStatusFilter}
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Beneficiaries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading.isLoading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : distributions.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No distributions found
                    </td>
                  </tr>
                ) : (
                  distributions.map(distribution => (
                    <tr key={distribution.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {distribution.region}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(distribution.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          }
                        )}
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
                        {distribution.beneficiaries.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleViewDetails(distribution.id)}
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

        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing page {pagination.currentPage} of {pagination.totalPages}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => changePage(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map(page => (
                <button
                  key={page}
                  onClick={() => changePage(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === pagination.currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => changePage(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
