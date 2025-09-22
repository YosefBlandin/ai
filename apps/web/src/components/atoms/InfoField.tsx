import React from 'react';

interface InfoFieldProps {
  label: string;
  value: string | number;
  valueClassName?: string;
  labelClassName?: string;
  className?: string;
}

/**
 * Information field component for displaying label-value pairs
 */
export const InfoField: React.FC<InfoFieldProps> = ({ 
  label, 
  value, 
  valueClassName = 'text-lg font-semibold text-gray-900',
  labelClassName = 'text-sm font-medium text-gray-500 mb-2',
  className = ''
}) => {
  return (
    <div className={className}>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
};
