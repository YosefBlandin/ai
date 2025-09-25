/**
 * @fileoverview Dashboard service for mobile
 */

import { distributionService } from '@aidonic/shared-services';
import { APP_TEXT } from '@aidonic/shared-utils';
import { BaseService } from '@/shared/services/BaseService';
import { DashboardStats } from '../types/dashboard.types';

export class DashboardService extends BaseService {
  /**
   * Fetch dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    return this.executeApiCall(async () => {
      const response = await distributionService.getDistributions({
        page: 1,
        limit: 1000,
      });

      return this.transformData(response.data, distributions => ({
        totalDistributions: distributions.length,
        totalBeneficiaries: distributions.reduce(
          (sum, dist) => sum + dist.beneficiaries,
          0
        ),
        activeDistributions: distributions.filter(
          dist =>
            dist.status === APP_TEXT.statusValues.inProgress ||
            dist.status === APP_TEXT.statusValues.planned
        ).length,
        completedDistributions: distributions.filter(
          dist => dist.status === APP_TEXT.statusValues.completed
        ).length,
      }));
    }, 'fetch dashboard stats');
  }
}

export const dashboardService = new DashboardService();
