'use client';

/**
 * @fileoverview Distribution details container for managing single distribution business logic
 */

import React from 'react';
import { useDistribution } from '../hooks/useDistribution';
import { DistributionDetailsPresenter } from '../components/DistributionDetailsPresenter';

interface DistributionDetailsContainerProps {
  distributionId: string;
}

export const DistributionDetailsContainer: React.FC<
  DistributionDetailsContainerProps
> = ({ distributionId }) => {
  const distributionData = useDistribution(distributionId);

  return <DistributionDetailsPresenter {...distributionData} />;
};
