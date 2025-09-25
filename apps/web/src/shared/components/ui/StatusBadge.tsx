/**
 * @fileoverview Reusable status badge component
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case APP_TEXT.statusValues.completed.toLowerCase():
      return 'bg-success-100 text-success-800';
    case APP_TEXT.statusValues.inProgress.toLowerCase():
      return 'bg-warning-100 text-warning-800';
    case APP_TEXT.statusValues.planned.toLowerCase():
      return 'bg-primary-100 text-primary-800';
    case APP_TEXT.statusValues.cancelled.toLowerCase():
      return 'bg-error-100 text-error-800';
    default:
      return 'bg-secondary-100 text-secondary-800';
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)} ${className}`}
  >
    {status}
  </span>
);
