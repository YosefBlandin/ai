/**
 * @fileoverview Reusable status badge component
 */

import React from 'react';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-success-100 text-success-800';
    case 'in progress':
      return 'bg-warning-100 text-warning-800';
    case 'planned':
      return 'bg-primary-100 text-primary-800';
    case 'cancelled':
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
