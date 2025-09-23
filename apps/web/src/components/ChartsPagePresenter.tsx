/**
 * @fileoverview ChartsPagePresenter component for displaying charts page UI
 */

import React from 'react';

interface ChartsPagePresenterProps {
  aidTypeData: { name: string; value: number }[];
  timelineData: { month: string; beneficiaries: number }[];
  statusData: { name: string; value: number }[];
}

// Presenter component for charts page display
export const ChartsPagePresenter: React.FC<ChartsPagePresenterProps> = ({
  aidTypeData,
  timelineData,
  statusData,
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            ← Back to Dashboard
          </a>
        </div>

        <h1 className="text-3xl font-bold mb-8">Distribution Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Aid Type Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">
              Aid Type Distribution
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
              Beneficiaries Timeline
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
          <h2 className="text-xl font-semibold mb-4">Status Distribution</h2>
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
