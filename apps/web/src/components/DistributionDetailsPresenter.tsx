/**
 * @fileoverview DistributionDetailsPresenter component for displaying distribution details UI
 */

import React from 'react';
import { Distribution } from '@aidonic/shared-types';
import { Card } from './atoms';
import { PageHeader } from './molecules';
import { DistributionDetailsGrid, BeneficiariesList } from './organisms';

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
            <div className="h-8 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Distribution
          </h1>
          <p className="text-red-600 mb-4">{loading.error}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Distribution Not Found
          </h1>
          <p className="text-gray-600">
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
