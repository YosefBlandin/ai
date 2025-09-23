/**
 * @fileoverview StatusBadge component for displaying distribution status
 */

import React from 'react';

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
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Planned':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusStyles(status)} ${className}`}
    >
      {status}
    </span>
  );
};
