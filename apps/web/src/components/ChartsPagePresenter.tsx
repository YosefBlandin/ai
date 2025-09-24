/**
 * @fileoverview ChartsPagePresenter component for displaying charts page UI
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

interface ChartsPagePresenterProps {
  aidTypeData: { name: string; value: number }[];
  timelineData: { month: string; beneficiaries: number }[];
  statusData: { name: string; value: number }[];
  loading: {
    isLoading: boolean;
    error?: string;
  };
  onRefresh: () => void;
}

// Presenter component for charts page display
export const ChartsPagePresenter: React.FC<ChartsPagePresenterProps> = ({
  aidTypeData,
  timelineData,
  statusData,
  loading,
  onRefresh,
}) => {
  if (loading.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {APP_TEXT.navigation.backToDistributions}
            </a>
          </div>
          <h1 className="text-3xl font-bold mb-8">
            {APP_TEXT.titles.distributionAnalytics}
          </h1>
          <div className="text-center py-8">{APP_TEXT.loading.charts}</div>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {APP_TEXT.navigation.backToDistributions}
            </a>
          </div>
          <h1 className="text-3xl font-bold mb-8">
            {APP_TEXT.titles.distributionAnalytics}
          </h1>
          <div className="text-center py-8">
            <p className="text-red-600 mb-4">{loading.error}</p>
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {APP_TEXT.navigation.tryAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            {APP_TEXT.navigation.backToDistributions}
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-8">
          {APP_TEXT.titles.distributionAnalytics}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aid Type Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {APP_TEXT.charts.aidTypeDistribution}
            </h2>
            <div className="space-y-2">
              {aidTypeData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.name}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              {APP_TEXT.charts.beneficiariesTimeline}
            </h2>
            <div className="space-y-2">
              {timelineData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.month}</span>
                  <span className="text-sm font-medium">
                    {item.beneficiaries}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {APP_TEXT.charts.statusDistribution}
          </h2>
          <div className="space-y-2">
            {statusData.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{item.name}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
