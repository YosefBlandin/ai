/**
 * @fileoverview Loading state
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

interface LoadingStateProps {
  onRefresh: () => void;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  onRefresh: _onRefresh,
}) => (
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
      <h1 className="text-3xl font-bold mb-8">
        {APP_TEXT.titles.distributionAnalytics}
      </h1>
      <div className="text-center py-8">{APP_TEXT.loading.charts}</div>
    </div>
  </div>
);
