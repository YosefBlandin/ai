/**
 * @fileoverview Platform-agnostic chart data manager
 * Follows SOLID principles and DRY by centralizing chart logic
 */

import { LoadingState } from '@aidonic/shared-types';
import {
  chartService,
  StatusChartData,
  TimelineChartData,
} from '@aidonic/shared-services';

/**
 * Event types for chart manager
 */
export interface ChartManagerEvents {
  onLoadingChange: (loading: LoadingState) => void;
  onStatusDataChange: (statusData: StatusChartData[]) => void;
  onTimelineDataChange: (timelineData: TimelineChartData[]) => void;
  onError: (error: string) => void;
}

/**
 * Configuration for ChartManager
 */
export interface ChartManagerConfig {
  events: ChartManagerEvents;
}

/**
 * Platform-agnostic chart data manager
 * Handles all chart-related business logic without React dependencies
 */
export class ChartManager {
  private statusData: StatusChartData[] = [];
  private timelineData: TimelineChartData[] = [];
  private loading: LoadingState = { isLoading: false };
  private events: ChartManagerEvents;

  constructor(config: ChartManagerConfig) {
    this.events = config.events;
  }

  /**
   * Get current status data
   */
  getStatusData(): StatusChartData[] {
    return this.statusData;
  }

  /**
   * Get current timeline data
   */
  getTimelineData(): TimelineChartData[] {
    return this.timelineData;
  }

  /**
   * Get current loading state
   */
  getLoadingState(): LoadingState {
    return this.loading;
  }

  /**
   * Fetch chart data from API
   */
  async fetchChartData(): Promise<void> {
    try {
      this.setLoading({ isLoading: true });

      const [status, timeline] = await Promise.all([
        chartService.getStatusDistribution(),
        chartService.getTimelineDistribution(),
      ]);

      this.statusData = status;
      this.timelineData = timeline;

      this.setLoading({ isLoading: false });
      this.events.onStatusDataChange(this.statusData);
      this.events.onTimelineDataChange(this.timelineData);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch chart data';

      this.setLoading({
        isLoading: false,
        error: errorMessage,
      });
      this.events.onError(errorMessage);
    }
  }

  /**
   * Refresh chart data
   */
  async refresh(): Promise<void> {
    await this.fetchChartData();
  }

  /**
   * Set loading state and notify listeners
   */
  private setLoading(loading: LoadingState): void {
    const loadingChanged =
      JSON.stringify(loading) !== JSON.stringify(this.loading);
    if (loadingChanged) {
      this.loading = loading;
      this.events.onLoadingChange(loading);
    }
  }
}
