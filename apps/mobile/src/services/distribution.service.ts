import { Distribution, DistributionFilters, DistributionsResponse, DistributionResponse, DistributionStatus } from '@/types';
import { ApiService, apiService } from './api.service';

// Business logic service following Single Responsibility Principle
export class DistributionService {
  constructor(private apiService: ApiService) {}

  async getDistributions(filters?: DistributionFilters): Promise<DistributionsResponse> {
    return this.apiService.getDistributions(filters);
  }

  async getDistributionById(id: string): Promise<DistributionResponse> {
    return this.apiService.getDistributionById(id);
  }

  async getDistributionsByRegion(region: string): Promise<Distribution[]> {
    const response = await this.apiService.getDistributions({ region });
    return response.data;
  }

  async getDistributionsByStatus(status: DistributionStatus): Promise<Distribution[]> {
    const response = await this.apiService.getDistributions({ status });
    return response.data;
  }

  // Business logic methods
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

// Singleton instance
export const distributionService = new DistributionService(apiService);
