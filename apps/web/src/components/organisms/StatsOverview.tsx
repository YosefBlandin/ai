import React from 'react';
import { Distribution } from '@aidonic/shared-types';
import { formatNumber } from '@aidonic/shared-utils';

interface StatsOverviewProps {
  distributions: Distribution[];
  className?: string;
}

export const StatsOverview: React.FC<StatsOverviewProps> = React.memo(
  ({ distributions, className }) => {
    const totalDistributions = distributions.length;
    const completedDistributions = distributions.filter(
      d => d.status === 'Completed'
    ).length;
    const totalBeneficiaries = distributions.reduce(
      (sum, d) => sum + d.beneficiaries,
      0
    );

    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      >
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Distributions
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalDistributions}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Completed
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {completedDistributions}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">
                Total Beneficiaries
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(totalBeneficiaries)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
