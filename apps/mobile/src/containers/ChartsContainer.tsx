/**
 * @fileoverview ChartsContainer component for managing charts logic
 */

import React from 'react';
import { useCharts } from '@aidonic/shared-hooks';
import { ChartsPresenter } from '@/components/ChartsPresenter';

// Container for charts - handles data fetching and business logic
export const ChartsContainer: React.FC = () => {
  const { statusData, timelineData, loading, refresh } = useCharts();

  return (
    <ChartsPresenter
      statusData={statusData}
      timelineData={timelineData}
      loading={loading}
      onRefresh={refresh}
    />
  );
};
