/**
 * @fileoverview Reusable info field component
 */

import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string | number;
  className?: string;
}

export const InfoField: React.FC<InfoFieldProps> = ({
  label,
  value,
  className = '',
}) => (
  <div className={`flex justify-between items-center py-2 ${className}`}>
    <span className="text-sm font-medium text-text-secondary">{label}:</span>
    <span className="text-sm text-text-primary">{value}</span>
  </div>
);
