/**
 * @fileoverview DistributionListScreen component for displaying the list of distributions
 */

import React from 'react';
import { DistributionListContainer } from '@/containers/DistributionListContainer';
import { NavigationProp } from '@aidonic/shared-types';

interface DistributionListScreenProps {
  navigation: NavigationProp;
}

/**
 * Screen component for displaying the list of distributions
 */
export const DistributionListScreen: React.FC<DistributionListScreenProps> = ({
  navigation,
}) => {
  const handleViewDetails = (id: string) => {
    navigation.navigate('DistributionDetails', { distributionId: id });
  };

  return <DistributionListContainer onViewDetails={handleViewDetails} />;
};
