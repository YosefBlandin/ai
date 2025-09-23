import React from 'react';
import { InfoField } from '../atoms/InfoField';
import { StatusBadge } from '../atoms/StatusBadge';
import { formatDate } from '@aidonic/shared-utils';

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
        <InfoField label="Region" value={distribution.region} />

        <div>
          <p className="text-sm font-medium text-gray-500 mb-2">Status</p>
          <StatusBadge status={distribution.status} />
        </div>

        <InfoField label="Aid Type" value={distribution.aidType} />

        <InfoField
          label="Total Beneficiaries"
          value={distribution.beneficiaries.toLocaleString()}
          valueClassName="text-3xl font-bold text-gray-900"
        />
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        <InfoField label="Date" value={formatDate(distribution.date, 'long')} />

        <InfoField
          label="Delivery Channel"
          value={distribution.deliveryChannel}
        />
      </div>
    </div>
  );
};
