/**
 * @fileoverview Distribution service using shared patterns
 */

import { distributionService } from '@aidonic/shared-services';
import { DistributionFilters, PaginationState } from '@aidonic/shared-types';
import { BaseService } from '@/shared/services/BaseService';
import {
  DistributionListState,
  DistributionDetailsState,
} from '../types/distribution.types';

export class DistributionService extends BaseService {
  /**
   * Fetch distributions with filters and pagination
   */
  async getDistributions(
    filters: DistributionFilters = {},
    pagination: Partial<PaginationState> = {}
  ): Promise<DistributionListState> {
    return this.executeApiCall(async () => {
      const response = await distributionService.getDistributions({
        ...filters,
        page: pagination.currentPage || 1,
        limit: pagination.itemsPerPage || 12,
      });

      return {
        distributions: response.data,
        loading: { isLoading: false },
        pagination: {
          currentPage: pagination.currentPage || 1,
          totalPages: Math.ceil(
            response.total / (pagination.itemsPerPage || 12)
          ),
          totalItems: response.total,
          itemsPerPage: pagination.itemsPerPage || 12,
        },
        filters,
      };
    }, 'fetch distributions');
  }

  /**
   * Fetch single distribution by ID
   */
  async getDistributionById(id: string): Promise<DistributionDetailsState> {
    this.validateRequired(id, 'Distribution ID');

    return this.executeApiCall(async () => {
      const response = await distributionService.getDistributionById(id);
      return {
        distribution: response.data,
        loading: { isLoading: false },
      };
    }, 'fetch distribution');
  }

  /**
   * Update distribution filters
   */
  updateFilters(
    currentFilters: DistributionFilters,
    newFilters: Partial<DistributionFilters>
  ): DistributionFilters {
    return { ...currentFilters, ...newFilters };
  }

  /**
   * Update pagination
   */
  updatePagination(
    currentPagination: PaginationState,
    updates: Partial<PaginationState>
  ): PaginationState {
    return { ...currentPagination, ...updates };
  }
}

export const distributionServiceInstance = new DistributionService();
