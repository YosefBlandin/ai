/**
 * @fileoverview AdvancedFilters component for complex filtering options
 */

import { DistributionFilters } from '@aidonic/shared-types';
import { APP_TEXT } from '@aidonic/shared-utils';
import React from 'react';

interface AdvancedFiltersProps {
  filters: DistributionFilters;
  onFiltersChange: (filters: Partial<DistributionFilters>) => void;
  onClearFilters: () => void;
  className?: string;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters: _filters,
  onFiltersChange: _onFiltersChange,
  onClearFilters: _onClearFilters,
  className,
}) => {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {APP_TEXT.navigation.filters}
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {APP_TEXT.labels.region}
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option>{APP_TEXT.filters.allRegions}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {APP_TEXT.labels.status}
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option>{APP_TEXT.filters.allStatuses}</option>
          </select>
        </div>
      </div>
    </div>
  );
};
