/**
 * @fileoverview Dashboard presenter
 */

import React from 'react';
import { DashboardProps } from '../types/dashboard.types';
import { StatsOverview } from './StatsOverview';
import { DashboardHeader } from './DashboardHeader';
import { Card, LoadingSpinner } from '@/shared/components/ui';
import { APP_TEXT } from '@aidonic/shared-utils';

export const DashboardPresenter: React.FC<DashboardProps> = ({
  stats,
  loading,
  error,
  onRefresh,
}) => {
  if (loading) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-8">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-text-secondary">
              {APP_TEXT.loading.dashboard}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-8">
            <p className="text-error-500 mb-4">{error}</p>
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
            >
              {APP_TEXT.navigation.tryAgain}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader
          title={APP_TEXT.titles.dashboard}
          onRefresh={onRefresh}
        />

        <div className="mt-8">
          <StatsOverview stats={stats} />
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Recent Activity
            </h3>
            <p className="text-text-secondary">
              Dashboard overview and recent distribution activities will be
              displayed here.
            </p>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary rounded-md">
                View All Distributions
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary rounded-md">
                View Analytics
              </button>
              <button className="w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-background-tertiary rounded-md">
                Export Data
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
