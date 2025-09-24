/**
 * @fileoverview ChartsPageContainer component for managing charts page logic
 */

import React from 'react';
import { useCharts } from '@aidonic/shared-hooks';
import { ChartsPagePresenter } from '@/components/ChartsPagePresenter';

// Container for charts page - handles data fetching and business logic
export const ChartsPageContainer: React.FC = () => {
  const { statusData, timelineData, loading, refresh } = useCharts();

  // Transform data for the presenter
  const aidTypeData = statusData.map(item => ({
    name: item.status || 'Unknown',
    value: item.count,
  }));

  const transformedTimelineData = timelineData.map(item => ({
    month: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
    }),
    beneficiaries: item.count,
  }));

  const transformedStatusData = statusData.map(item => ({
    name: item.status || 'Unknown',
    value: item.count,
  }));

  return (
    <ChartsPagePresenter
      aidTypeData={aidTypeData}
      timelineData={transformedTimelineData}
      statusData={transformedStatusData}
      loading={loading}
      onRefresh={refresh}
    />
  );
};
