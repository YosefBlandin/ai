import { Distribution, DistributionFilters, DistributionsResponse, DistributionResponse, DistributionStatus } from '@/types';
import { distributionService as sharedDistributionService } from '@aidonic/shared-services';

export class DistributionService {
  async getDistributions(filters?: DistributionFilters): Promise<DistributionsResponse> {
    return sharedDistributionService.getDistributions(filters);
  }

  async getDistributionById(id: string): Promise<DistributionResponse> {
    return sharedDistributionService.getDistributionById(id);
  }

  async getDistributionsByRegion(region: string): Promise<Distribution[]> {
    const response = await sharedDistributionService.getDistributions({ region });
    return response.data;
  }

  async getDistributionsByStatus(status: DistributionStatus): Promise<Distribution[]> {
    const response = await sharedDistributionService.getDistributions({ status });
    return response.data;
  }

  getStatusColor(status: DistributionStatus): string {
    const statusColors = {
      'Planned': '#3B82F6',
      'In Progress': '#F59E0B',
      'Completed': '#10B981',
      'Cancelled': '#EF4444'
    };
    return statusColors[status];
  }

  getAidTypeIcon(aidType: string): string {
    const icons = {
      'Food': '🍎',
      'Medical': '🏥',
      'Shelter': '🏠',
      'Clothing': '👕',
      'Education': '📚'
    };
    return icons[aidType as keyof typeof icons] || '📦';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatNumber(num: number): string {
    return num.toLocaleString();
  }
}

export const distributionService = new DistributionService();
