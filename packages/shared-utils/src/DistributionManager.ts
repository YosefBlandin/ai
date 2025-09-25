/**
 * @fileoverview Platform-agnostic distribution data manager
 * Follows SOLID principles and DRY by centralizing distribution logic
 */

import {
  Distribution,
  DistributionFilters,
  LoadingState,
  PaginationState,
} from '@aidonic/shared-types';
import { distributionService } from '@aidonic/shared-services';

/**
 * Event types for distribution manager
 */
export interface DistributionManagerEvents {
  onLoadingChange: (loading: LoadingState) => void;
  onDistributionsChange: (distributions: Distribution[]) => void;
  onPaginationChange: (pagination: PaginationState) => void;
  onFiltersChange: (filters: DistributionFilters) => void;
  onError: (error: string) => void;
}

/**
 * Configuration for DistributionManager
 */
export interface DistributionManagerConfig {
  initialFilters?: DistributionFilters;
  itemsPerPage?: number;
  events: DistributionManagerEvents;
}

/**
 * Platform-agnostic distribution data manager
 * Handles all distribution-related business logic without React dependencies
 */
export class DistributionManager {
  private distributions: Distribution[] = [];
  private loading: LoadingState = { isLoading: false };
  private pagination: PaginationState;
  private filters: DistributionFilters;
  private events: DistributionManagerEvents;

  constructor(config: DistributionManagerConfig) {
    this.filters = config.initialFilters || {};
    this.pagination = {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: config.itemsPerPage || 10,
    };
    this.events = config.events;
  }

  /**
   * Get current distributions
   */
  getDistributions(): Distribution[] {
    return this.distributions;
  }

  /**
   * Get current loading state
   */
  getLoadingState(): LoadingState {
    return this.loading;
  }

  /**
   * Get current pagination state
   */
  getPaginationState(): PaginationState {
    return this.pagination;
  }

  /**
   * Get current filters
   */
  getFilters(): DistributionFilters {
    return this.filters;
  }

  /**
   * Fetch distributions from API
   */
  async fetchDistributions(): Promise<void> {
    try {
      this.setLoading({ isLoading: true });

      const response = await distributionService.getDistributions({
        ...this.filters,
        page: this.pagination.currentPage,
        limit: this.pagination.itemsPerPage,
      });

      this.distributions = response.data;
      this.pagination = {
        ...this.pagination,
        totalPages: Math.ceil(response.total / this.pagination.itemsPerPage),
        totalItems: response.total,
      };

      this.setLoading({ isLoading: false });
      this.events.onDistributionsChange(this.distributions);
      this.events.onPaginationChange(this.pagination);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to fetch distributions';

      this.setLoading({
        isLoading: false,
        error: errorMessage,
      });
      this.events.onError(errorMessage);
    }
  }

  /**
   * Update filters and reset pagination
   */
  updateFilters(newFilters: Partial<DistributionFilters>): void {
    const updatedFilters = { ...this.filters, ...newFilters };
    const filtersChanged =
      JSON.stringify(updatedFilters) !== JSON.stringify(this.filters);

    if (filtersChanged) {
      this.filters = updatedFilters;
      this.pagination = { ...this.pagination, currentPage: 1 };
      this.events.onFiltersChange(this.filters);
      this.events.onPaginationChange(this.pagination);
    }
  }

  /**
   * Change current page
   */
  changePage(page: number): void {
    if (page !== this.pagination.currentPage) {
      this.pagination = { ...this.pagination, currentPage: page };
      this.events.onPaginationChange(this.pagination);
    }
  }

  /**
   * Refresh distributions
   */
  async refresh(): Promise<void> {
    await this.fetchDistributions();
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

/**
 * Single distribution manager for individual distribution details
 */
export class SingleDistributionManager {
  private distribution: Distribution | null = null;
  private loading: LoadingState = { isLoading: false };
  private events: Pick<
    DistributionManagerEvents,
    'onLoadingChange' | 'onError'
  > & {
    onDistributionChange: (distribution: Distribution | null) => void;
  };

  constructor(events: SingleDistributionManager['events']) {
    this.events = events;
  }

  /**
   * Get current distribution
   */
  getDistribution(): Distribution | null {
    return this.distribution;
  }

  /**
   * Get current loading state
   */
  getLoadingState(): LoadingState {
    return this.loading;
  }

  /**
   * Fetch single distribution by ID
   */
  async fetchDistribution(id: string): Promise<void> {
    if (!id) return;

    try {
      this.setLoading({ isLoading: true });

      const response = await distributionService.getDistributionById(id);
      this.distribution = response.data;

      this.setLoading({ isLoading: false });
      this.events.onDistributionChange(this.distribution);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to fetch distribution';

      this.setLoading({
        isLoading: false,
        error: errorMessage,
      });
      this.events.onError(errorMessage);
    }
  }

  /**
   * Refresh current distribution
   */
  async refresh(id: string): Promise<void> {
    await this.fetchDistribution(id);
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
