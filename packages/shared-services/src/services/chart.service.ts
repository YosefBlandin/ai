import { Distribution, DistributionStatus } from '@aidonic/shared-types';
import { IChartService, StatusChartData, TimelineChartData } from '../interfaces/api.interface';
import { ServiceFactory } from '../factories/service.factory';

/**
 * Service for processing chart data from distributions
 */
export class ChartService implements IChartService {
  constructor() {}

  async getStatusDistribution(): Promise<StatusChartData[]> {
    try {
      const distributionService = ServiceFactory.getDistributionService();
      const response = await distributionService.getDistributions();
      const distributions = response.data;
      const aidTypeCounts = this.calculateAidTypeCounts(distributions);
      const total = distributions.length;

      return aidTypeCounts.map(({ aidType, count }) => ({
        status: aidType,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0
      }));
    } catch (error) {
      throw new Error(`Failed to get aid type distribution: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getTimelineDistribution(): Promise<TimelineChartData[]> {
    try {
      const distributionService = ServiceFactory.getDistributionService();
      const response = await distributionService.getDistributions();
      const distributions = response.data;
      const timelineData = this.calculateTimelineData(distributions);

      return timelineData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } catch (error) {
      throw new Error(`Failed to get timeline distribution: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private calculateAidTypeCounts(distributions: Distribution[]): Array<{ aidType: string; count: number }> {
    const aidTypeCounts = new Map<string, number>();

    distributions.forEach(distribution => {
      const currentCount = aidTypeCounts.get(distribution.aidType) || 0;
      aidTypeCounts.set(distribution.aidType, currentCount + 1);
    });

    return Array.from(aidTypeCounts.entries()).map(([aidType, count]) => ({
      aidType,
      count
    }));
  }

  private calculateTimelineData(distributions: Distribution[]): TimelineChartData[] {
    const dateBeneficiaries = new Map<string, number>();

    distributions.forEach(distribution => {
      const date = distribution.date;
      const currentBeneficiaries = dateBeneficiaries.get(date) || 0;
      dateBeneficiaries.set(date, currentBeneficiaries + distribution.beneficiaries);
    });

    return Array.from(dateBeneficiaries.entries()).map(([date, count]) => ({
      date,
      count
    }));
  }
}
