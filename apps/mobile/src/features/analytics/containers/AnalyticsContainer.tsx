/**
 * @fileoverview Analytics container
 */

import React from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsPresenter } from '../components/AnalyticsPresenter';
import { AnalyticsFilters } from '../types/analytics.types';

interface AnalyticsContainerProps {
  filters?: AnalyticsFilters;
}

export const AnalyticsContainer: React.FC<AnalyticsContainerProps> = ({
  filters,
}) => {
  const analyticsData = useAnalytics(filters);

  return <AnalyticsPresenter {...analyticsData} />;
};
