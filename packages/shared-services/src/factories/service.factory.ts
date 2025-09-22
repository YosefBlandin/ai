import { IApiService, IChartService, IDistributionService } from '../interfaces/api.interface';
import { ApiService } from '../services/api.service';
import { ChartService } from '../services/chart.service';
import { DistributionService } from '../services/distribution.service';

/**
 * Factory Pattern
 * Creates service instances with proper dependencies
 * 
 * Single Responsibility Principle (SRP)
 * This class is only responsible for creating service instances
 * 
 * Dependency Inversion Principle (DIP)
 * Depends on abstractions, not concrete implementations
 */
export class ServiceFactory {
  private static apiServiceInstance: IApiService | null = null;
  private static chartServiceInstance: IChartService | null = null;
  private static distributionServiceInstance: IDistributionService | null = null;

  /**
   * Get or create API service instance (Singleton pattern)
   */
  public static getApiService(baseUrl?: string): IApiService {
    if (!this.apiServiceInstance) {
      this.apiServiceInstance = new ApiService(baseUrl);
    }
    return this.apiServiceInstance;
  }

  /**
   * Get or create chart service instance (Singleton pattern)
   */
  public static getChartService(): IChartService {
    if (!this.chartServiceInstance) {
      this.chartServiceInstance = new ChartService();
    }
    return this.chartServiceInstance;
  }

  /**
   * Get or create distribution service instance (Singleton pattern)
   * Automatically injects dependencies
   */
  public static getDistributionService(baseUrl?: string): IDistributionService {
    if (!this.distributionServiceInstance) {
      const apiService = this.getApiService(baseUrl);
      const chartService = this.getChartService();
      this.distributionServiceInstance = new DistributionService(apiService, chartService);
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
