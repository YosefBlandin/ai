/**
 * @fileoverview Beneficiaries list
 */

import React from 'react';
import { BeneficiaryItem } from '@/shared/components/ui';

interface Beneficiary {
  id: string;
  name: string;
  age: number;
  gender: string;
  needs: string[];
}

interface BeneficiariesListProps {
  beneficiaries: Beneficiary[];
  className?: string;
}

export const BeneficiariesList: React.FC<BeneficiariesListProps> = ({
  beneficiaries,
  className = '',
}) => {
  if (beneficiaries.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-text-secondary">No beneficiaries found</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
    >
      {beneficiaries.map(beneficiary => (
        <BeneficiaryItem key={beneficiary.id} beneficiary={beneficiary} />
      ))}
    </div>
  );
};
