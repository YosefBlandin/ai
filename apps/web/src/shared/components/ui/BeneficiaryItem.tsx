/**
 * @fileoverview Reusable beneficiary item component
 */

import React from 'react';
import { Card } from './Card';

interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: string;
  needs: string[];
}

interface BeneficiaryItemProps {
  beneficiary: Beneficiary;
  className?: string;
}

export const BeneficiaryItem: React.FC<BeneficiaryItemProps> = ({
  beneficiary,
  className = '',
}) => (
  <Card className={`p-4 ${className}`}>
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-text-primary">
          {beneficiary.name}
        </h4>
        <span className="text-xs text-text-secondary">
          {beneficiary.age} years
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs text-text-secondary">Gender:</span>
        <span className="text-xs text-text-primary">{beneficiary.gender}</span>
      </div>
      {beneficiary.needs.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {beneficiary.needs.map((need, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
            >
              {need}
            </span>
          ))}
        </div>
      )}
    </div>
  </Card>
);
