/**
 * @fileoverview Service factory for creating service instances
 */

import { getApiConfig } from '../config/api.config';
import {
  IApiService,
  IChartService,
  IDistributionService,
} from '../interfaces/api.interface';
import { ApiService } from '../services/api.service';
import { ChartService } from '../services/chart.service';
import { DistributionService } from '../services/distribution.service';
import { MockApiService } from '../services/mock-api.service';

/**
 * Factory for creating service instances
 */
export class ServiceFactory {
  private static apiServiceInstance: IApiService | null = null;
  private static chartServiceInstance: IChartService | null = null;
  private static distributionServiceInstance: IDistributionService | null =
    null;

  /**
   * Get or create API service instance
   */
  public static getApiService(baseUrl?: string): IApiService {
    if (!this.apiServiceInstance) {
      const config = getApiConfig();

      if (config.useMockData) {
        this.apiServiceInstance = new MockApiService();
      } else {
        this.apiServiceInstance = new ApiService(baseUrl);
      }
    }
    return this.apiServiceInstance;
  }

  /**
   * Get or create chart service instance
   */
  public static getChartService(baseUrl?: string): IChartService {
    if (!this.chartServiceInstance) {
      const apiService = this.getApiService(baseUrl);
      this.chartServiceInstance = new ChartService(apiService);
    }
    return this.chartServiceInstance;
  }

  /**
   * Get or create distribution service instance
   */
  public static getDistributionService(baseUrl?: string): IDistributionService {
    if (!this.distributionServiceInstance) {
      const apiService = this.getApiService(baseUrl);
      const chartService = this.getChartService(baseUrl);
      this.distributionServiceInstance = new DistributionService(
        apiService,
        chartService
      );
    }
    return this.distributionServiceInstance;
  }

  /**
   * Reset all service instances (useful for testing)
   */
  public static resetInstances(): void {
    this.apiServiceInstance = null;
    this.chartServiceInstance = null;
    this.distributionServiceInstance = null;
  }

  /**
   * Create a new distribution service with custom dependencies
   * Useful for testing or when you need different implementations
   */
  public static createDistributionService(
    apiService: IApiService,
    chartService: IChartService
  ): IDistributionService {
    return new DistributionService(apiService, chartService);
  }
}
