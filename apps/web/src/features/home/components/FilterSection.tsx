/**
 * @fileoverview Filter section component
 */

import React from 'react';
import { DistributionFilters, DistributionStatus } from '@aidonic/shared-types';
import { APP_TEXT } from '@aidonic/shared-utils';

interface FilterSectionProps {
  filters: DistributionFilters;
  onFiltersChange: (filters: Partial<DistributionFilters>) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  filters,
  onFiltersChange,
}) => {
  return (
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
            value={filters.region || APP_TEXT.filters.allRegions}
            onChange={e => {
              const region =
                e.target.value === APP_TEXT.filters.allRegions
                  ? undefined
                  : e.target.value;
              onFiltersChange({ region });
            }}
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value={APP_TEXT.filters.allRegions}>
              {APP_TEXT.filters.allRegions}
            </option>
            <option value={APP_TEXT.regions.northernRegion}>
              {APP_TEXT.regions.northernRegion}
            </option>
            <option value={APP_TEXT.regions.southernRegion}>
              {APP_TEXT.regions.southernRegion}
            </option>
            <option value={APP_TEXT.regions.easternProvince}>
              {APP_TEXT.regions.easternProvince}
            </option>
            <option value={APP_TEXT.regions.westernRegion}>
              {APP_TEXT.regions.westernRegion}
            </option>
            <option value={APP_TEXT.regions.centralRegion}>
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
            value={filters.status || APP_TEXT.filters.allStatuses}
            onChange={e => {
              const status =
                e.target.value === APP_TEXT.filters.allStatuses
                  ? undefined
                  : (e.target.value as DistributionStatus);
              onFiltersChange({ status });
            }}
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value={APP_TEXT.filters.allStatuses}>
              {APP_TEXT.filters.allStatuses}
            </option>
            <option value={APP_TEXT.statusValues.planned}>
              {APP_TEXT.status.planned}
            </option>
            <option value={APP_TEXT.statusValues.inProgress}>
              {APP_TEXT.status.inProgress}
            </option>
            <option value={APP_TEXT.statusValues.completed}>
              {APP_TEXT.status.completed}
            </option>
            <option value={APP_TEXT.statusValues.cancelled}>
              {APP_TEXT.status.cancelled}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
