import React from 'react';
import { Distribution } from '@/types';

interface DistributionDetailsContainerProps {
  distributionId: string;
}

export const DistributionDetailsContainer: React.FC<DistributionDetailsContainerProps> = ({
  distributionId
}) => {
  // Mock data for now
  const distribution: Distribution = {
    id: distributionId,
    region: 'West Nile',
    date: '2025-06-15',
    status: 'Planned',
    beneficiaries: 1200,
    aidType: 'Food',
    deliveryChannel: 'Vouchers'
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Distribution Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Region</h3>
            <p className="text-gray-600">{distribution.region}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Date</h3>
            <p className="text-gray-600">{distribution.date}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
            <p className="text-gray-600">{distribution.status}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aid Type</h3>
            <p className="text-gray-600">{distribution.aidType}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery Channel</h3>
            <p className="text-gray-600">{distribution.deliveryChannel}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Beneficiaries</h3>
            <p className="text-gray-600">{distribution.beneficiaries.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
