/**
 * @fileoverview Distribution details grid
 */

import React from 'react';
import { InfoField, StatusBadge } from '@/shared/components/ui';
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

export const DistributionDetailsGrid: React.FC<
  DistributionDetailsGridProps
> = ({ distribution, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
      <div className="space-y-4">
        <InfoField label={APP_TEXT.labels.region} value={distribution.region} />
        <InfoField
          label={APP_TEXT.labels.date}
          value={formatDate(distribution.date)}
        />
        <div className="flex justify-between items-center py-2">
          <span className="text-sm font-medium text-text-secondary">
            {APP_TEXT.labels.status}:
          </span>
          <StatusBadge status={distribution.status} />
        </div>
      </div>

      <div className="space-y-4">
        <InfoField
          label={APP_TEXT.labels.aidType}
          value={distribution.aidType}
        />
        <InfoField
          label={APP_TEXT.labels.deliveryChannel}
          value={distribution.deliveryChannel}
        />
        <InfoField
          label={APP_TEXT.labels.totalBeneficiaries}
          value={distribution.beneficiaries.toLocaleString()}
        />
      </div>
    </div>
  );
};
