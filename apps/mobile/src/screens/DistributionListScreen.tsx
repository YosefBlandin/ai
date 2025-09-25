/**
 * @fileoverview Distribution list screen
 */

import React from 'react';
import { DistributionListContainer } from '@/features/distributions';
import { NavigationProp } from '@aidonic/shared-types';

interface DistributionListScreenProps {
  navigation: NavigationProp;
}

/**
 * Distribution list screen
 */
export const DistributionListScreen: React.FC<DistributionListScreenProps> = ({
  navigation,
}) => {
  const handleViewDetails = (id: string) => {
    navigation.navigate('DistributionDetails', { distributionId: id });
  };

  return <DistributionListContainer onViewDetails={handleViewDetails} />;
};
