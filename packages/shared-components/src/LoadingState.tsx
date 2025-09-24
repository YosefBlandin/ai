/**
 * @fileoverview Standardized loading state components
 */

import React from 'react';
import { LoadingState } from '@aidonic/shared-types';

interface LoadingStateProps {
  loading: LoadingState;
  onRetry?: () => void;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

/**
 * Standardized loading state wrapper component
 * Handles loading, error, and success states
 */
export const LoadingStateWrapper: React.FC<LoadingStateProps> = ({
  loading,
  onRetry,
  children,
  loadingComponent,
  errorComponent,
}) => {
  if (loading.isLoading) {
    return loadingComponent || <DefaultLoadingComponent />;
  }

  if (loading.error) {
    return (
      errorComponent || (
        <DefaultErrorComponent error={loading.error} onRetry={onRetry} />
      )
    );
  }

  return <>{children}</>;
};

interface DefaultLoadingComponentProps {
  message?: string;
}

/**
 * Default loading component
 */
export const DefaultLoadingComponent: React.FC<
  DefaultLoadingComponentProps
> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
      <span className="text-gray-600">{message}</span>
    </div>
  );
};

interface DefaultErrorComponentProps {
  error: string;
  onRetry?: () => void;
}

/**
 * Default error component
 */
export const DefaultErrorComponent: React.FC<DefaultErrorComponentProps> = ({
  error,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-500 mb-4">
        <svg
          className="w-12 h-12 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-gray-600 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
