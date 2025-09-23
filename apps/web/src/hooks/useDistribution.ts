import { useState, useEffect, useCallback } from 'react';
import { Distribution, LoadingState } from '@aidonic/shared-types';
import { distributionService } from '@aidonic/shared-services';

export const useDistribution = (id: string) => {
  const [distribution, setDistribution] = useState<Distribution | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: false });

  const fetchDistribution = useCallback(async () => {
    if (!id) return;

    setLoading({ isLoading: true });
    try {
      const response = await distributionService.getDistributionById(id);
      setDistribution(response.data);
      setLoading({ isLoading: false });
    } catch (error) {
      setLoading({
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      });
    }
  }, [id]);

  const refresh = useCallback(() => {
    fetchDistribution();
  }, [fetchDistribution]);

  useEffect(() => {
    fetchDistribution();
  }, [fetchDistribution]);

  return {
    distribution,
    loading,
    refresh,
  };
};
