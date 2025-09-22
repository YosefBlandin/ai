import React from 'react';

export const ChartsContainer: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Distribution Analytics</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
          <p className="text-gray-500">Chart placeholder</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Timeline</h3>
          <p className="text-gray-500">Chart placeholder</p>
        </div>
      </div>
    </div>
  );
};
