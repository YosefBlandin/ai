/**
 * @fileoverview Error state
 */

import React from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';

interface ErrorStateProps {
  error: string;
  onRefresh: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRefresh }) => (
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
