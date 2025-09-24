/**
 * @fileoverview Dashboard service using shared patterns
 */

import { distributionService } from '@aidonic/shared-services';
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
        limit: 1000, // Get all for stats calculation
      });

      return this.transformData(response.data, distributions => ({
        totalDistributions: distributions.length,
        totalBeneficiaries: distributions.reduce(
          (sum, dist) => sum + dist.beneficiaries,
          0
        ),
        activeDistributions: distributions.filter(
          dist => dist.status === 'In Progress' || dist.status === 'Planned'
        ).length,
        completedDistributions: distributions.filter(
          dist => dist.status === 'Completed'
        ).length,
      }));
    }, 'fetch dashboard stats');
  }
}

export const dashboardService = new DashboardService();
