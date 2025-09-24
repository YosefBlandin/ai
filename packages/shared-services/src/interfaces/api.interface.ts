import {
  DistributionFilters,
  DistributionResponse,
  DistributionsResponse,
  AidTypeChartData,
} from '@aidonic/shared-types';

/**
 * API service interfaces
 */
export interface IApiService {
  getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse>;
  getDistributionById(id: string): Promise<DistributionResponse>;
}

/**
 * Interface Segregation Principle (ISP)
 * Defines only the methods needed for chart data
 */
export interface IChartService {
  getStatusDistribution(): Promise<StatusChartData[]>;
  getAidTypeDistribution(): Promise<AidTypeChartData[]>;
  getTimelineDistribution(): Promise<TimelineChartData[]>;
}

/**
 * Interface Segregation Principle (ISP)
 * Defines only the methods needed for distribution business logic
 */
export interface IDistributionService {
  getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse>;
  getDistributionById(id: string): Promise<DistributionResponse>;
  getStatusDistribution(): Promise<StatusChartData[]>;
  getTimelineDistribution(): Promise<TimelineChartData[]>;
}

// Re-export types for convenience
export interface StatusChartData {
  status: string;
  count: number;
  percentage: number;
}

export interface TimelineChartData {
  date: string;
  count: number;
}
