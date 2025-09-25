/**
 * @fileoverview Dashboard container
 */

import React from 'react';
import { DashboardPresenter } from '../components/DashboardPresenter';
import { useDashboard } from '../hooks/useDashboard';

export const DashboardContainer: React.FC = () => {
  const { stats, loading, error, refresh } = useDashboard();

  return (
    <DashboardPresenter
      stats={stats}
      loading={loading}
      error={error}
      onRefresh={refresh}
    />
  );
};
