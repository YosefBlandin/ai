/**
 * @fileoverview Analytics presenter component for displaying analytics UI
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';
import { PieChartDisplay } from './PieChartDisplay';
import { LineChartDisplay } from './LineChartDisplay';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { ChartData, TimelineData } from '../types/analytics.types';

interface AnalyticsPresenterProps {
  statusData: ChartData[];
  timelineData: TimelineData[];
  loading: boolean;
  error?: string;
  refresh: () => void;
}

export const AnalyticsPresenter: React.FC<AnalyticsPresenterProps> = ({
  statusData,
  timelineData,
  loading,
  error,
  refresh,
}) => {
  if (loading) {
    return <LoadingState onRefresh={refresh} />;
  }

  if (error) {
    return <ErrorState error={error} onRefresh={refresh} />;
  }

  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            {APP_TEXT.navigation.backToDistributions}
          </a>
        </div>

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            {APP_TEXT.titles.distributionAnalytics}
          </h1>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
          >
            {APP_TEXT.navigation.refresh}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PieChartDisplay data={statusData} title="Aid Distribution by Type" />
          <LineChartDisplay
            data={timelineData}
            title="Beneficiaries Over Time"
          />
        </div>
      </div>
    </div>
  );
};
