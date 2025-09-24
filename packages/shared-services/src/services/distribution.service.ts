/**
 * @fileoverview Distribution service for managing distribution data operations
 */

import {
  DistributionFilters,
  DistributionResponse,
  DistributionsResponse,
} from '@aidonic/shared-types';
import {
  IApiService,
  IChartService,
  IDistributionService,
  StatusChartData,
  TimelineChartData,
} from '../interfaces/api.interface';

/**
 * Service for orchestrating distribution-related operations
 */
export class DistributionService implements IDistributionService {
  private readonly apiService: IApiService;
  private readonly chartService: IChartService;

  constructor(apiService: IApiService, chartService: IChartService) {
    this.apiService = apiService;
    this.chartService = chartService;
  }

  /**
   * Get distributions with optional filtering and pagination
   */
  public async getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse> {
    return this.apiService.getDistributions(filters);
  }

  /**
   * Get a specific distribution by ID
   */
  public async getDistributionById(id: string): Promise<DistributionResponse> {
    return this.apiService.getDistributionById(id);
  }

  /**
   * Get status distribution data for charts
   * Delegates to chart service
   */
  public async getStatusDistribution(): Promise<StatusChartData[]> {
    return this.chartService.getStatusDistribution();
  }

  /**
   * Get timeline distribution data for charts
   * Delegates to chart service
   */
  public async getTimelineDistribution(): Promise<TimelineChartData[]> {
    return this.chartService.getTimelineDistribution();
  }

  /**
   * Get distribution statistics
   */
  public async getDistributionStats(): Promise<{
    totalDistributions: number;
    totalBeneficiaries: number;
    averageBeneficiaries: number;
    statusBreakdown: StatusChartData[];
  }> {
    try {
      const [distributions, statusBreakdown] = await Promise.all([
        this.getDistributions(),
        this.getStatusDistribution(),
      ]);

      const totalDistributions = distributions.total;
      const totalBeneficiaries = distributions.data.reduce(
        (sum, dist) => sum + dist.beneficiaries,
        0
      );
      const averageBeneficiaries =
        totalDistributions > 0
          ? Math.round(totalBeneficiaries / totalDistributions)
          : 0;

      return {
        totalDistributions,
        totalBeneficiaries,
        averageBeneficiaries,
        statusBreakdown,
      };
    } catch (error) {
      throw new Error(
        `Failed to get distribution stats: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}

// Note: This should be instantiated through ServiceFactory
// export const distributionService = new DistributionService();
