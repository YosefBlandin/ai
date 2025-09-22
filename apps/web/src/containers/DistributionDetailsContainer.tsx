import React from 'react';
import { useDistribution } from '@/hooks/useDistribution';
import { Card } from '@/components/atoms';
import { PageHeader } from '@/components/molecules';
import { DistributionDetailsGrid, BeneficiariesList } from '@/components/organisms';

interface DistributionDetailsContainerProps {
  distributionId: string;
}

export const DistributionDetailsContainer: React.FC<DistributionDetailsContainerProps> = ({
  distributionId
}) => {
  const { distribution, loading } = useDistribution(distributionId);

  if (loading.isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (!distribution) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Distribution Not Found</h1>
          <p className="text-gray-600">The requested distribution could not be found.</p>
        </Card>
      </div>
    );
  }

  const headerIcon = (
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
      <span className="text-2xl font-bold text-blue-600">A</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <Card padding="lg">
        <PageHeader
          title="Aid Distribution Details"
          icon={headerIcon}
        />

        <DistributionDetailsGrid distribution={distribution} />

        <BeneficiariesList 
          beneficiaries={distribution.beneficiaryList || []} 
        />
      </Card>
    </div>
  );
};
