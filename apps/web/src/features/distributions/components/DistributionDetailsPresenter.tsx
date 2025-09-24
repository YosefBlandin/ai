/**
 * @fileoverview DistributionDetailsPresenter component for displaying distribution details UI
 */

import React from 'react';
import { Distribution, LoadingState } from '@aidonic/shared-types';
import { Card } from '@/shared/components/ui';
import { DistributionDetailsGrid } from './DistributionDetailsGrid';
import { APP_TEXT } from '@aidonic/shared-utils';

interface DistributionDetailsPresenterProps {
  distribution: Distribution | null;
  loading: LoadingState;
  onRefresh?: () => void;
}

// Presenter component for distribution details display
export const DistributionDetailsPresenter: React.FC<
  DistributionDetailsPresenterProps
> = ({ distribution, loading, onRefresh }) => {
  if (loading.isLoading) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card padding="lg">
          <div className="animate-pulse">
            <div className="h-8 bg-background-tertiary rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-background-tertiary rounded w-1/2"></div>
              <div className="h-4 bg-background-tertiary rounded w-1/3"></div>
              <div className="h-4 bg-background-tertiary rounded w-1/4"></div>
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
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            {APP_TEXT.errors.loadingDistribution}
          </h1>
          <p className="text-error-500 mb-4">{loading.error}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md"
            >
              {APP_TEXT.navigation.tryAgain}
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
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            {APP_TEXT.errors.distributionNotFound}
          </h1>
          <p className="text-text-secondary">
            {APP_TEXT.errors.distributionNotFoundDescription}
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card padding="lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary">
            {APP_TEXT.titles.aidDistributionDetails}
          </h1>
        </div>

        <DistributionDetailsGrid distribution={distribution} />

        {distribution.beneficiaryList &&
          distribution.beneficiaryList.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {APP_TEXT.labels.beneficiaries} (
                {distribution.beneficiaryList.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {distribution.beneficiaryList.map(beneficiary => (
                  <div
                    key={beneficiary.id}
                    className="bg-background-primary rounded-lg p-4 border border-border-light"
                  >
                    <p className="font-medium text-text-primary">
                      {beneficiary.name}
                    </p>
                    <p className="text-sm text-text-secondary">
                      ID: {beneficiary.id}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
      </Card>
    </div>
  );
};
