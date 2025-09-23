/**
 * @fileoverview BeneficiaryItem component for displaying individual beneficiaries
 */

import React from 'react';
import { Avatar } from '../atoms/Avatar';

interface BeneficiaryItemProps {
  name: string;
  id: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Component for displaying individual beneficiaries
 */
export const BeneficiaryItem: React.FC<BeneficiaryItemProps> = React.memo(
  ({ name, id: _id, onClick, className = '' }) => {
    return (
      <div
        className={`flex items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
        onClick={onClick}
      >
        <Avatar name={name} size="md" className="mr-3 flex-shrink-0" />
        <span className="text-sm font-medium text-gray-900">{name}</span>
      </div>
    );
  }
);
