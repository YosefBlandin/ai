/**
 * @fileoverview Standardized error handling utilities
 */

import { LoadingState } from '@aidonic/shared-types';

/**
 * Standardized error handler
 * @param error - The error that occurred
 * @param defaultMessage - Default error message if error is not an Error instance
 * @returns Standardized LoadingState with error
 */
export const createErrorState = (
  error: unknown,
  defaultMessage: string = 'An error occurred'
): LoadingState => {
  return {
    isLoading: false,
    error: error instanceof Error ? error.message : defaultMessage,
  };
};

/**
 * Format error message
 * @param error - The error to format
 * @param fallback - Fallback message if error cannot be formatted
 * @returns Formatted error message
 */
export const formatErrorMessage = (
  error: unknown,
  fallback: string = 'An unexpected error occurred'
): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }

  return fallback;
};

/**
 * Create a loading state with error cleared
 * @param isLoading - Whether currently loading
 * @returns LoadingState with cleared error
 */
export const createLoadingState = (isLoading: boolean): LoadingState => {
  return {
    isLoading,
    error: undefined,
  };
};

/**
 * Check if a loading state has an error
 * @param loading - Loading state to check
 * @returns True if there's an error
 */
export const hasError = (loading: LoadingState): boolean => {
  return Boolean(loading.error);
};

/**
 * Check if a loading state is currently loading
 * @param loading - Loading state to check
 * @returns True if currently loading
 */
export const isLoading = (loading: LoadingState): boolean => {
  return loading.isLoading;
};

/**
 * Create a retry handler that resets error state
 * @param setLoading - State setter function
 * @param retryFunction - Function to retry the operation
 * @returns Retry handler function
 */
export const createRetryHandler = (
  setLoading: (state: LoadingState) => void,
  retryFunction: () => void
) => {
  return () => {
    setLoading(createLoadingState(true));
    retryFunction();
  };
};
