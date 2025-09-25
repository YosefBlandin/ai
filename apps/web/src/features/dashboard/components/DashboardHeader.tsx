/**
 * @fileoverview Dashboard header
 */

import React from 'react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  onRefresh?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  title,
  subtitle,
  className,
}) => {
  return (
    <header
      className={`bg-background-primary border-b border-border-light ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
              {subtitle && (
                <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
