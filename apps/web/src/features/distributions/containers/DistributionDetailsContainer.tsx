'use client';

/**
 * @fileoverview Distribution details container
 */

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDistribution } from '../hooks/useDistribution';
import { DistributionDetailsPresenter } from '../components/DistributionDetailsPresenter';

interface DistributionDetailsContainerProps {
  distributionId: string;
}

export const DistributionDetailsContainer: React.FC<
  DistributionDetailsContainerProps
> = ({ distributionId }) => {
  const router = useRouter();
  const distributionData = useDistribution(distributionId);

  const handleBack = () => {
    router.back();
  };

  return (
    <DistributionDetailsPresenter {...distributionData} onBack={handleBack} />
  );
};
