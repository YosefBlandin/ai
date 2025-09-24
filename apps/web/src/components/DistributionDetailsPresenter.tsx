/**
 * @fileoverview DistributionDetailsPresenter component for displaying distribution details UI
 */

import React from 'react';
import { Distribution } from '@aidonic/shared-types';
import { Card } from './atoms';
import { PageHeader } from './molecules';
import { DistributionDetailsGrid, BeneficiariesList } from './organisms';
import { COLORS } from '@/utils';

interface DistributionDetailsPresenterProps {
  distribution: Distribution | null;
  loading: {
    isLoading: boolean;
    error?: string;
  };
  headerIcon: React.ReactNode;
  onRefresh?: () => void;
}

// Presenter component for distribution details display
export const DistributionDetailsPresenter: React.FC<
  DistributionDetailsPresenterProps
> = ({ distribution, loading, headerIcon, onRefresh }) => {
  if (loading.isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <div className="animate-pulse">
            <div
              className={`h-8 ${COLORS.background.loading} rounded mb-6`}
            ></div>
            <div className="space-y-4">
              <div
                className={`h-4 ${COLORS.background.loading} rounded w-1/2`}
              ></div>
              <div
                className={`h-4 ${COLORS.background.loading} rounded w-1/3`}
              ></div>
              <div
                className={`h-4 ${COLORS.background.loading} rounded w-1/4`}
              ></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <h1 className={`text-2xl font-bold ${COLORS.text.primary} mb-4`}>
            Error Loading Distribution
          </h1>
          <p className={`${COLORS.text.error} mb-4`}>{loading.error}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className={`px-4 py-2 ${COLORS.button.primary} rounded-md`}
            >
              Try Again
            </button>
          )}
        </Card>
      </div>
    );
  }

  if (!distribution) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <h1 className={`text-2xl font-bold ${COLORS.text.primary} mb-4`}>
            Distribution Not Found
          </h1>
          <p className={COLORS.text.secondary}>
            The requested distribution could not be found.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card padding="lg">
        <PageHeader title="Aid Distribution Details" icon={headerIcon} />

        <DistributionDetailsGrid distribution={distribution} />

        <BeneficiariesList beneficiaries={distribution.beneficiaryList || []} />
      </Card>
    </div>
  );
};
