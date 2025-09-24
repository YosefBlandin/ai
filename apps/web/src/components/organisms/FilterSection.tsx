/**
 * @fileoverview FilterSection component for distribution filtering controls
 */

import React from 'react';
import { SelectField } from '../molecules/SelectField';
import { Card } from '../atoms/Card';
import {
  getRegionOptions,
  getStatusOptions,
  APP_TEXT,
} from '@aidonic/shared-utils';

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
  className = '',
}) => {
  const regionOptions = getRegionOptions();
  const statusOptions = getStatusOptions();

  return (
    <Card className={`mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <SelectField
          label={APP_TEXT.labels.region}
          value={regionValue}
          options={regionOptions}
          onChange={onRegionChange}
        />
        <SelectField
          label={APP_TEXT.labels.status}
          value={statusValue}
          options={statusOptions}
          onChange={onStatusChange}
        />
      </div>
    </Card>
  );
};
