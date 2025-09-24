/**
 * @fileoverview DistributionDetailsGrid component for displaying distribution information
 */

import React from 'react';
import { InfoField } from '../atoms/InfoField';
import { StatusBadge } from '../atoms/StatusBadge';
import { formatDate, APP_TEXT } from '@aidonic/shared-utils';

interface DistributionDetailsGridProps {
  distribution: {
    region: string;
    date: string;
    status: string;
    aidType: string;
    deliveryChannel: string;
    beneficiaries: number;
  };
  className?: string;
}

/**
 * Distribution details grid component for displaying distribution information
 */
export const DistributionDetailsGrid: React.FC<
  DistributionDetailsGridProps
> = ({ distribution, className = '' }) => {
  // Using centralized formatDate function

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 ${className}`}>
      {/* Left Column */}
      <div className="space-y-6">
        <InfoField label={APP_TEXT.labels.region} value={distribution.region} />

        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">
            {APP_TEXT.labels.status}
          </p>
          <StatusBadge status={distribution.status} />
        </div>

        <InfoField
          label={APP_TEXT.labels.aidType}
          value={distribution.aidType}
        />

        <InfoField
          label={APP_TEXT.labels.totalBeneficiaries}
          value={distribution.beneficiaries.toLocaleString()}
          valueClassName="text-3xl font-bold text-gray-900"
        />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <InfoField
          label={APP_TEXT.labels.date}
          value={formatDate(distribution.date, 'long')}
        />

        <InfoField
          label={APP_TEXT.labels.deliveryChannel}
          value={distribution.deliveryChannel}
        />
      </div>
    </div>
  );
};
