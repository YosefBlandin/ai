/**
 * @fileoverview Distribution filters
 */

import React from 'react';
import {
  DistributionFilters as DistributionFiltersType,
  DistributionStatus,
  AidType,
  DeliveryChannel,
} from '@aidonic/shared-types';
import {
  APP_TEXT,
  getRegionOptions,
  getStatusOptions,
} from '@aidonic/shared-utils';
import { Button } from '@/shared/components/ui';

interface DistributionFiltersProps {
  filters: DistributionFiltersType;
  onFiltersChange: (filters: Partial<DistributionFiltersType>) => void;
  onClearFilters: () => void;
}

export const DistributionFilters: React.FC<DistributionFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
}) => {
  const regionOptions = getRegionOptions();
  const statusOptions = getStatusOptions();

  const hasActiveFilters =
    filters.region ||
    filters.status ||
    filters.aidType ||
    filters.deliveryChannel;

  return (
    <div className="bg-background-primary border border-border-light rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">
          {APP_TEXT.navigation.filters}
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-text-secondary hover:text-text-primary"
          >
            {APP_TEXT.navigation.clearFilters}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Region Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {APP_TEXT.labels.region}
          </label>
          <select
            value={filters.region || ''}
            onChange={e =>
              onFiltersChange({ region: e.target.value || undefined })
            }
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{APP_TEXT.filters.allRegions}</option>
            {regionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {APP_TEXT.labels.status}
          </label>
          <select
            value={filters.status || ''}
            onChange={e =>
              onFiltersChange({
                status: (e.target.value as DistributionStatus) || undefined,
              })
            }
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{APP_TEXT.filters.allStatuses}</option>
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Aid Type Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {APP_TEXT.labels.aidType}
          </label>
          <select
            value={filters.aidType || ''}
            onChange={e =>
              onFiltersChange({
                aidType: (e.target.value as AidType) || undefined,
              })
            }
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{APP_TEXT.filters.allAidTypes}</option>
            <option value={APP_TEXT.aidTypes.food}>
              {APP_TEXT.aidTypes.food}
            </option>
            <option value={APP_TEXT.aidTypes.medical}>
              {APP_TEXT.aidTypes.medical}
            </option>
            <option value={APP_TEXT.aidTypes.shelter}>
              {APP_TEXT.aidTypes.shelter}
            </option>
            <option value={APP_TEXT.aidTypes.clothing}>
              {APP_TEXT.aidTypes.clothing}
            </option>
            <option value={APP_TEXT.aidTypes.education}>
              {APP_TEXT.aidTypes.education}
            </option>
          </select>
        </div>

        {/* Delivery Channel Filter */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {APP_TEXT.labels.deliveryChannel}
          </label>
          <select
            value={filters.deliveryChannel || ''}
            onChange={e =>
              onFiltersChange({
                deliveryChannel:
                  (e.target.value as DeliveryChannel) || undefined,
              })
            }
            className="w-full px-3 py-2 border border-border-light rounded-md bg-background-primary text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">{APP_TEXT.filters.allDeliveryChannels}</option>
            <option value={APP_TEXT.deliveryChannels.directDistribution}>
              {APP_TEXT.deliveryChannels.directDistribution}
            </option>
            <option value={APP_TEXT.deliveryChannels.vouchers}>
              {APP_TEXT.deliveryChannels.vouchers}
            </option>
            <option value={APP_TEXT.deliveryChannels.cashTransfer}>
              {APP_TEXT.deliveryChannels.cashTransfer}
            </option>
            <option value={APP_TEXT.deliveryChannels.mobileMoney}>
              {APP_TEXT.deliveryChannels.mobileMoney}
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
