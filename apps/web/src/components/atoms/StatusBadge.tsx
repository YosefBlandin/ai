/**
 * @fileoverview StatusBadge component for displaying distribution status
 */

import React from 'react';
import { getStatusColorClass } from '@aidonic/shared-utils';
import { DistributionStatus } from '@aidonic/shared-types';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

/**
 * Status badge component for displaying distribution status
 */
export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => {
  return (
    <span
      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColorClass(status as DistributionStatus)} ${className}`}
    >
      {status}
    </span>
  );
};
