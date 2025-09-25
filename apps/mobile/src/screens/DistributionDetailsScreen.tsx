/**
 * @fileoverview Distribution details screen
 */

import React from 'react';
import { DistributionDetailsContainer } from '@/features/distributions';
import { RouteProp } from '@aidonic/shared-types';

interface DistributionDetailsScreenProps {
  route: RouteProp;
}

/**
 * Distribution details screen
 */
export const DistributionDetailsScreen: React.FC<
  DistributionDetailsScreenProps
> = ({ route }) => {
  const { distributionId } = route.params;
  return <DistributionDetailsContainer distributionId={distributionId} />;
};
