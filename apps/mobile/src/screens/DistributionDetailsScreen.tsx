/**
 * @fileoverview DistributionDetailsScreen component for displaying distribution details
 */

import React from 'react';
import { DistributionDetailsContainer } from '@/containers/DistributionDetailsContainer';
import { RouteProp } from '@aidonic/shared-types';

interface DistributionDetailsScreenProps {
  route: RouteProp;
}

/**
 * Screen component for displaying distribution details
 */
export const DistributionDetailsScreen: React.FC<
  DistributionDetailsScreenProps
> = ({ route }) => {
  const { distributionId } = route.params;
  return <DistributionDetailsContainer distributionId={distributionId} />;
};
