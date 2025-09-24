/**
 * @fileoverview ChartService for managing chart data
 */

import { chartService as sharedChartService } from '@aidonic/shared-services';

export class ChartService {
  async getStatusDistribution() {
    return sharedChartService.getAidTypeDistribution();
  }

  async getTimelineDistribution() {
    return sharedChartService.getTimelineDistribution();
  }
}

export const chartService = new ChartService();
