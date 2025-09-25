/**
 * @fileoverview Chart service for processing and transforming chart data
 */

import { Distribution, AidType, AidTypeChartData } from '@aidonic/shared-types';
import {
  IApiService,
  IChartService,
  StatusChartData,
  TimelineChartData,
} from '../interfaces/api.interface';

/**
 * Service for processing chart data
 */
export class ChartService implements IChartService {
  constructor(private apiService: IApiService) {}

  async getStatusDistribution(): Promise<StatusChartData[]> {
    try {
      const response = await this.apiService.getDistributions();
      const distributions = response.data;
      const statusCounts = this.calculateStatusCounts(distributions);
      const total = distributions.length;

      return statusCounts.map(({ status, count }) => ({
        status,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }));
    } catch (error) {
      throw new Error(
        `Failed to get status distribution: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getTimelineDistribution(): Promise<TimelineChartData[]> {
    try {
      const response = await this.apiService.getDistributions();
      const distributions = response.data;
      const timelineData = this.calculateTimelineData(distributions);

      return timelineData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    } catch (error) {
      throw new Error(
        `Failed to get timeline distribution: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  async getAidTypeDistribution(): Promise<AidTypeChartData[]> {
    try {
      const response = await this.apiService.getDistributions();
      const distributions = response.data;
      const aidTypeCounts = this.calculateAidTypeCounts(distributions);
      const total = distributions.length;

      return aidTypeCounts.map(({ aidType, count }) => ({
        aidType: aidType as AidType,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }));
    } catch (error) {
      throw new Error(
        `Failed to get aid type distribution: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  private calculateStatusCounts(
    distributions: Distribution[]
  ): Array<{ status: string; count: number }> {
    const statusCounts = new Map<string, number>();

    distributions.forEach(distribution => {
      const currentCount = statusCounts.get(distribution.status) || 0;
      statusCounts.set(distribution.status, currentCount + 1);
    });

    return Array.from(statusCounts.entries()).map(([status, count]) => ({
      status,
      count,
    }));
  }

  private calculateAidTypeCounts(
    distributions: Distribution[]
  ): Array<{ aidType: string; count: number }> {
    const aidTypeCounts = new Map<string, number>();

    distributions.forEach(distribution => {
      const currentCount = aidTypeCounts.get(distribution.aidType) || 0;
      aidTypeCounts.set(distribution.aidType, currentCount + 1);
    });

    return Array.from(aidTypeCounts.entries()).map(([aidType, count]) => ({
      aidType,
      count,
    }));
  }

  private calculateTimelineData(
    distributions: Distribution[]
  ): TimelineChartData[] {
    const dateBeneficiaries = new Map<string, number>();

    distributions.forEach(distribution => {
      const date = distribution.date;
      const currentBeneficiaries = dateBeneficiaries.get(date) || 0;
      dateBeneficiaries.set(
        date,
        currentBeneficiaries + distribution.beneficiaries
      );
    });

    return Array.from(dateBeneficiaries.entries()).map(([date, count]) => ({
      date,
      count,
    }));
  }
}
