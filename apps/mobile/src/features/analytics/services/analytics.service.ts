/**
 * @fileoverview Analytics service for mobile
 */

import { chartService } from '@aidonic/shared-services';
import { BaseService } from '@/shared/services/BaseService';
import {
  AnalyticsFilters,
  ChartData,
  TimelineData,
} from '../types/analytics.types';

export class AnalyticsService extends BaseService {
  /**
   * Fetch status distribution data
   */
  async getStatusDistribution(
    _filters?: AnalyticsFilters
  ): Promise<ChartData[]> {
    return this.executeApiCall(async () => {
      const response = await chartService.getStatusDistribution();
      return this.transformData(response, data =>
        data.map(item => ({
          name: item.status || 'Unknown',
          value: item.count,
        }))
      );
    }, 'fetch status distribution');
  }

  /**
   * Fetch timeline data
   */
  async getTimelineData(_filters?: AnalyticsFilters): Promise<TimelineData[]> {
    return this.executeApiCall(async () => {
      const response = await chartService.getTimelineDistribution();
      return this.transformData(response, data =>
        data.map(item => ({
          month: new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
          }),
          beneficiaries: item.count,
        }))
      );
    }, 'fetch timeline data');
  }

  /**
   * Fetch all analytics data
   */
  async getAllAnalyticsData(filters?: AnalyticsFilters) {
    return this.executeApiCall(async () => {
      const [statusData, timelineData] = await Promise.all([
        this.getStatusDistribution(filters),
        this.getTimelineData(filters),
      ]);

      return {
        statusData,
        timelineData,
        loading: false,
      };
    }, 'fetch analytics data');
  }
}

export const analyticsService = new AnalyticsService();
