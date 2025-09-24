/**
 * @fileoverview LoadingSpinner component for displaying loading states
 */

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading spinner component for displaying loading states
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'sm',
  className = 'animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div
      className={`animate-spin rounded-full border-b-2 border-white ${sizeClasses[size]} ${className}`}
    />
  );
};
