/**
 * @fileoverview Distribution details page
 */

import React from 'react';
import { DistributionDetailsContainer } from '@/features/distributions';

interface DistributionDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DistributionDetailsPage({
  params,
}: DistributionDetailsPageProps) {
  const { id } = await params;
  return <DistributionDetailsContainer distributionId={id} />;
}
