'use client';

/**
 * @fileoverview Error boundary
 */

import React, { Component, ReactNode } from 'react';
import { APP_TEXT } from '@aidonic/shared-utils';
// Error fallback
const ErrorFallback: React.FC<{ error?: Error; onRetry?: () => void }> = ({
  error,
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h2 className="text-xl font-semibold text-error-500 mb-4">
      {APP_TEXT.errors.somethingWentWrong}
    </h2>
    {error && <p className="text-text-secondary mb-4">{error.message}</p>}
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-primary-500 text-text-inverse rounded hover:bg-primary-600"
      >
        {APP_TEXT.navigation.tryAgain}
      </button>
    )}
  </div>
);

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

// Error boundary
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(_error: Error, _errorInfo: React.ErrorInfo) {
    // Error logging can be implemented here if needed
    // console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <ErrorFallback
            error={this.state.error}
            onRetry={() => this.setState({ hasError: false, error: undefined })}
          />
        )
      );
    }

    return this.props.children;
  }
}
