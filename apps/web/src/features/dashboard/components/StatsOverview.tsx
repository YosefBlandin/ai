/**
 * @fileoverview Stats overview
 */

import React from 'react';
import { formatNumber, APP_TEXT } from '@aidonic/shared-utils';
import { DashboardStats } from '../types/dashboard.types';

interface StatsOverviewProps {
  stats: DashboardStats;
  className?: string;
}

export const StatsOverview: React.FC<StatsOverviewProps> = React.memo(
  ({ stats, className }) => {
    const { totalDistributions, completedDistributions, totalBeneficiaries } =
      stats;

    return (
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
      >
        <div className="bg-background-primary rounded-xl border border-border-light p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {APP_TEXT.stats.totalDistributions}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {totalDistributions}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-background-primary rounded-xl border border-border-light p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {APP_TEXT.stats.completed}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {completedDistributions}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-background-primary rounded-xl border border-border-light p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-text-secondary mb-1">
                {APP_TEXT.stats.totalBeneficiaries}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {formatNumber(totalBeneficiaries)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
