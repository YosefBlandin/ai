import React from 'react';
import { useDistribution } from '@/hooks/useDistribution';
import { DistributionDetailsPresenter } from '@/components/DistributionDetailsPresenter';

interface DistributionDetailsContainerProps {
  distributionId: string;
}

/**
 * Container for distribution details - handles data fetching and business logic
 */
export const DistributionDetailsContainer: React.FC<
  DistributionDetailsContainerProps
> = ({ distributionId }) => {
  const { distribution, loading, refresh } = useDistribution(distributionId);

  const headerIcon = (
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
      <span className="text-2xl font-bold text-blue-600">A</span>
    </div>
  );

  return (
    <DistributionDetailsPresenter
      distribution={distribution}
      loading={loading}
      headerIcon={headerIcon}
      onRefresh={refresh}
    />
  );
};
