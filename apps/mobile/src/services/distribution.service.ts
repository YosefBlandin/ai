import {
  Distribution,
  DistributionFilters,
  DistributionsResponse,
  DistributionResponse,
  DistributionStatus,
} from '@/types';
import { distributionService as sharedDistributionService } from '@aidonic/shared-services';
import { formatDate, formatNumber } from '@aidonic/shared-utils';

export class DistributionService {
  async getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse> {
    return sharedDistributionService.getDistributions(filters);
  }

  async getDistributionById(id: string): Promise<DistributionResponse> {
    return sharedDistributionService.getDistributionById(id);
  }

  async getDistributionsByRegion(region: string): Promise<Distribution[]> {
    const response = await sharedDistributionService.getDistributions({
      region,
    });
    return response.data;
  }

  async getDistributionsByStatus(
    status: DistributionStatus
  ): Promise<Distribution[]> {
    const response = await sharedDistributionService.getDistributions({
      status,
    });
    return response.data;
  }

  // Using centralized color utilities from @aidonic/shared-utils

  getAidTypeIcon(aidType: string): string {
    const icons = {
      Food: '🍎',
      Medical: '🏥',
      Shelter: '🏠',
      Clothing: '👕',
      Education: '📚',
    };
    return icons[aidType as keyof typeof icons] || '📦';
  }

  // Using centralized formatting functions
  formatDate: typeof formatDate = formatDate;
  formatNumber: typeof formatNumber = formatNumber;
}

export const distributionService = new DistributionService();
