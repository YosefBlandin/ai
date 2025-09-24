/**
 * @fileoverview BeneficiariesList component for displaying list of beneficiaries
 */

import React from 'react';
import { BeneficiaryItem } from '../molecules/BeneficiaryItem';
import { APP_TEXT } from '@aidonic/shared-utils';

interface Beneficiary {
  id: string;
  name: string;
}

interface BeneficiariesListProps {
  beneficiaries: Beneficiary[];
  onBeneficiaryClick?: (beneficiary: Beneficiary) => void;
  className?: string;
}

/**
 * Beneficiaries list component for displaying a scrollable list of beneficiaries
 */
export const BeneficiariesList: React.FC<BeneficiariesListProps> = ({
  beneficiaries,
  onBeneficiaryClick,
  className = '',
}) => {
  if (!beneficiaries || beneficiaries.length === 0) {
    return null;
  }

  return (
    <div className={`border-t border-gray-200 pt-8 ${className}`}>
      <p className="text-sm font-medium text-gray-500 mb-4">
        {APP_TEXT.stats.beneficiaries}
      </p>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {beneficiaries.map(beneficiary => (
          <BeneficiaryItem
            key={beneficiary.id}
            name={beneficiary.name}
            id={beneficiary.id}
            onClick={() => onBeneficiaryClick?.(beneficiary)}
          />
        ))}
      </div>
    </div>
  );
};
