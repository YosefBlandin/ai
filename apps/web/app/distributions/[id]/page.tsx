/**
 * @fileoverview Distribution details page
 */

import React from 'react';
import { DistributionDetailsContainer } from '@/features/distributions';

interface DistributionDetailsPageProps {
  params: {
    id: string;
  };
}

export default function DistributionDetailsPage({
  params,
}: DistributionDetailsPageProps) {
  return <DistributionDetailsContainer distributionId={params.id} />;
}
