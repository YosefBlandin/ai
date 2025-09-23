import React from 'react';
import { useDistribution } from '@/hooks/useDistribution';
import { DistributionDetailsPresenter } from '@/components/DistributionDetailsPresenter';
import { distributionService } from '@/services/distribution.service';
import { getStatusColor } from '@aidonic/shared-utils';

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

  const statusColor = distribution
    ? getStatusColor(distribution.status)
    : '#6B7280';
  const aidTypeIcon = distribution
    ? distributionService.getAidTypeIcon(distribution.aidType)
    : '📦';
  const formattedDate = distribution
    ? distributionService.formatDate(distribution.date)
    : '';
  const formattedBeneficiaries = distribution
    ? distributionService.formatNumber(distribution.beneficiaries)
    : '0';

  return (
    <DistributionDetailsPresenter
      distribution={distribution}
      loading={loading}
      statusColor={statusColor}
      aidTypeIcon={aidTypeIcon}
      formattedDate={formattedDate}
      formattedBeneficiaries={formattedBeneficiaries}
      onRefresh={refresh}
    />
  );
};
