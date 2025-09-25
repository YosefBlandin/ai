'use client';

/**
 * @fileoverview Dashboard container
 */

import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import { DashboardPresenter } from '../components/DashboardPresenter';

export const DashboardContainer: React.FC = () => {
  const dashboardData = useDashboard();

  return (
    <DashboardPresenter {...dashboardData} onRefresh={dashboardData.refresh} />
  );
};
