import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Card component for consistent container styling
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '',
  padding = 'md'
}) => {
  const getPaddingClasses = () => {
    switch (padding) {
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      default:
        return 'p-6';
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${getPaddingClasses()} ${className}`}>
      {children}
    </div>
  );
};
