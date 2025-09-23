/**
 * @fileoverview ChartsPageContainer component for managing charts page logic
 */

import React from 'react';
import { useDistributions } from '@/hooks/useDistributions';
import { ChartsPagePresenter } from '@/components/ChartsPagePresenter';

// Container for charts page - handles data fetching and business logic
export const ChartsPageContainer: React.FC = () => {
  const { distributions } = useDistributions({});

  const aidTypeData = distributions.reduce(
    (acc, dist) => {
      const existing = acc.find(item => item.name === dist.aidType);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: dist.aidType, value: 1 });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  const timelineData = distributions
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(dist => ({
      month: new Date(dist.date).toLocaleDateString('en-US', {
        month: 'short',
      }),
      beneficiaries: dist.beneficiaries,
    }));

  const statusData = distributions.reduce(
    (acc, dist) => {
      const existing = acc.find(item => item.name === dist.status);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: dist.status, value: 1 });
      }
      return acc;
    },
    [] as { name: string; value: number }[]
  );

  return (
    <ChartsPagePresenter
      aidTypeData={aidTypeData}
      timelineData={timelineData}
      statusData={statusData}
    />
  );
};
