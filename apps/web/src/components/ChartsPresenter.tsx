/**
 * @fileoverview ChartsPresenter component for displaying charts UI
 * @author Aidonic Team
 * @created 2024
 */

import React from 'react';
import { StatusChartData, TimelineChartData } from '@aidonic/shared-services';

interface ChartsPresenterProps {
  statusData: StatusChartData[];
  timelineData: TimelineChartData[];
  loading: {
    isLoading: boolean;
    error?: string;
  };
  onRefresh: () => void;
}

/**
 * Presenter component for charts display
 */
export const ChartsPresenter: React.FC<ChartsPresenterProps> = ({
  statusData,
  timelineData,
  loading,
  onRefresh,
}) => {
  if (loading.isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Distribution Analytics
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Distribution Analytics
          </h2>
        </div>
        <div className="bg-white rounded-lg p-6 text-center">
          <p className="text-red-500 mb-4">{loading.error}</p>
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Distribution Analytics
        </h2>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
          {statusData.length > 0 ? (
            <div className="space-y-2">
              {statusData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.status}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Timeline</h3>
          {timelineData.length > 0 ? (
            <div className="space-y-2">
              {timelineData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.date}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};
