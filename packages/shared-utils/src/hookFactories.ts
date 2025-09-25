'use client';

/**
 * @fileoverview React hook factories for platform-agnostic data management
 * These factories create React hooks that use the platform-agnostic managers
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  Distribution,
  DistributionFilters,
  LoadingState,
  PaginationState,
} from '@aidonic/shared-types';
import { StatusChartData, TimelineChartData } from '@aidonic/shared-services';
import {
  DistributionManager,
  SingleDistributionManager,
} from './DistributionManager';
import { ChartManager } from './ChartManager';

/**
 * Hook factory for creating useDistributions hook
 * @param createManager - Function to create DistributionManager instance
 * @returns React hook for managing distributions
 */
export function createUseDistributionsHook(
  createManager: (config: {
    initialFilters?: DistributionFilters;
    itemsPerPage?: number;
    events: {
      onLoadingChange: (loading: LoadingState) => void;
      onDistributionsChange: (distributions: Distribution[]) => void;
      onPaginationChange: (pagination: PaginationState) => void;
      onFiltersChange: (filters: DistributionFilters) => void;
      onError: (error: string) => void;
    };
  }) => DistributionManager
) {
  return function useDistributions(initialFilters: DistributionFilters = {}) {
    const [distributions, setDistributions] = useState<Distribution[]>([]);
    const [loading, setLoading] = useState<LoadingState>({ isLoading: true });
    const [pagination, setPagination] = useState<PaginationState>({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 10,
    });
    const [filters, setFilters] = useState<DistributionFilters>(initialFilters);

    // Use ref to track if this is the initial render
    const isInitialRender = useRef(true);

    // Memoize event handlers to prevent infinite re-renders
    const eventHandlers = useMemo(
      () => ({
        onLoadingChange: setLoading,
        onDistributionsChange: setDistributions,
        onPaginationChange: setPagination,
        onFiltersChange: setFilters,
        onError: (_error: string) => {
          // Error handling can be implemented here
          // console.error('DistributionManager error:', _error);
        },
      }),
      []
    );

    // Create manager instance only once
    const manager = useMemo(() => {
      return createManager({
        initialFilters,
        events: eventHandlers,
      });
    }, []); // Empty dependency array - create only once

    // Update filters when initialFilters change (but not on initial render)
    useEffect(() => {
      if (!isInitialRender.current) {
        const currentFilters = manager.getFilters();
        const filtersChanged =
          JSON.stringify(initialFilters) !== JSON.stringify(currentFilters);

        if (filtersChanged) {
          manager.updateFilters(initialFilters);
        }
      } else {
        isInitialRender.current = false;
      }
    }, [initialFilters, manager]);

    const updateFilters = useCallback(
      (newFilters: Partial<DistributionFilters>) => {
        manager.updateFilters(newFilters);
      },
      [manager]
    );

    const changePage = useCallback(
      (page: number) => {
        manager.changePage(page);
      },
      [manager]
    );

    const refresh = useCallback(async () => {
      await manager.refresh();
    }, [manager]);

    // Initial fetch - only run once
    useEffect(() => {
      manager.fetchDistributions();
    }, [manager]);

    return {
      distributions,
      loading,
      pagination,
      filters,
      updateFilters,
      changePage,
      refresh,
    };
  };
}

/**
 * Hook factory for creating useDistribution hook
 * @param createManager - Function to create SingleDistributionManager instance
 * @returns React hook for managing single distribution
 */
export function createUseDistributionHook(
  createManager: (events: {
    onLoadingChange: (loading: LoadingState) => void;
    onDistributionChange: (distribution: Distribution | null) => void;
    onError: (error: string) => void;
  }) => SingleDistributionManager
) {
  return function useDistribution(id: string) {
    const [distribution, setDistribution] = useState<Distribution | null>(null);
    const [loading, setLoading] = useState<LoadingState>({ isLoading: false });

    // Memoize event handlers to prevent infinite re-renders
    const eventHandlers = useMemo(
      () => ({
        onLoadingChange: setLoading,
        onDistributionChange: setDistribution,
        onError: (_error: string) => {
          // Error handling can be implemented here
          // console.error('SingleDistributionManager error:', _error);
        },
      }),
      []
    );

    // Create manager instance only once
    const manager = useMemo(() => {
      return createManager(eventHandlers);
    }, []); // Empty dependency array - create only once

    const refresh = useCallback(async () => {
      if (id) {
        await manager.refresh(id);
      }
    }, [manager, id]);

    // Fetch distribution when ID changes
    useEffect(() => {
      if (id) {
        manager.fetchDistribution(id);
      }
    }, [manager, id]);

    return {
      distribution,
      loading,
      refresh,
    };
  };
}

/**
 * Hook factory for creating useCharts hook
 * @param createManager - Function to create ChartManager instance
 * @returns React hook for managing charts
 */
export function createUseChartsHook(
  createManager: (config: {
    events: {
      onLoadingChange: (loading: LoadingState) => void;
      onStatusDataChange: (statusData: StatusChartData[]) => void;
      onTimelineDataChange: (timelineData: TimelineChartData[]) => void;
      onError: (error: string) => void;
    };
  }) => ChartManager
) {
  return function useCharts() {
    const [statusData, setStatusData] = useState<StatusChartData[]>([]);
    const [timelineData, setTimelineData] = useState<TimelineChartData[]>([]);
    const [loading, setLoading] = useState<LoadingState>({ isLoading: true });

    // Memoize event handlers to prevent infinite re-renders
    const eventHandlers = useMemo(
      () => ({
        onLoadingChange: setLoading,
        onStatusDataChange: setStatusData,
        onTimelineDataChange: setTimelineData,
        onError: (_error: string) => {
          // Error handling can be implemented here
          // console.error('ChartManager error:', _error);
        },
      }),
      []
    );

    // Create manager instance only once
    const manager = useMemo(() => {
      return createManager({ events: eventHandlers });
    }, []); // Empty dependency array - create only once

    const refresh = useCallback(async () => {
      await manager.refresh();
    }, [manager]);

    // Initial fetch - only run once
    useEffect(() => {
      manager.fetchChartData();
    }, [manager]);

    return {
      statusData,
      timelineData,
      loading,
      refresh,
    };
  };
}
