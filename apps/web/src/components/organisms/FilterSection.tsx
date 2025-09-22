import React from 'react';
import { SelectField } from '../molecules/SelectField';
import { Card } from '../atoms/Card';

interface FilterSectionProps {
  regionValue: string;
  statusValue: string;
  onRegionChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  className?: string;
}

/**
 * Filter section component for distribution filtering
 */
export const FilterSection: React.FC<FilterSectionProps> = ({ 
  regionValue, 
  statusValue, 
  onRegionChange, 
  onStatusChange,
  className = '' 
}) => {
  const regionOptions = [
    { value: 'All', label: 'All Regions' },
    { value: 'West Nile', label: 'West Nile' },
    { value: 'Eastern Province', label: 'Eastern Province' },
    { value: 'Northern Region', label: 'Northern Region' },
    { value: 'Central Region', label: 'Central Region' },
    { value: 'Western Region', label: 'Western Region' },
    { value: 'Southern Region', label: 'Southern Region' },
  ];

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Planned', label: 'Planned' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
  ];

  return (
    <Card className={`mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <SelectField
          label="Region"
          value={regionValue}
          options={regionOptions}
          onChange={onRegionChange}
        />
        <SelectField
          label="Status"
          value={statusValue}
          options={statusOptions}
          onChange={onStatusChange}
        />
      </div>
    </Card>
  );
};
