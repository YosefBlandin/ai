import { ApiService } from '../services/api.service';
import { DistributionFilters } from '@aidonic/shared-types';

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    apiService = new ApiService();
  });

  describe('getDistributions', () => {
    it('should return all distributions when no filters applied', async () => {
      const result = await apiService.getDistributions();
      
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('limit');
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should filter distributions by region', async () => {
      const filters: DistributionFilters = { region: 'West Nile' };
      const result = await apiService.getDistributions(filters);
      
      expect(result.data.every(dist => dist.region === 'West Nile')).toBe(true);
    });

    it('should filter distributions by status', async () => {
      const filters: DistributionFilters = { status: 'Completed' };
      const result = await apiService.getDistributions(filters);
      
      expect(result.data.every(dist => dist.status === 'Completed')).toBe(true);
    });

    it('should apply pagination correctly', async () => {
      const filters: DistributionFilters = { page: 1, limit: 2 };
      const result = await apiService.getDistributions(filters);
      
      expect(result.data.length).toBeLessThanOrEqual(2);
      expect(result.page).toBe(1);
      expect(result.limit).toBe(2);
    });

    it('should handle multiple filters', async () => {
      const filters: DistributionFilters = { 
        region: 'Eastern Province', 
        status: 'Completed',
        page: 1,
        limit: 5
      };
      const result = await apiService.getDistributions(filters);
      
      expect(result.data.every(dist => 
        dist.region === 'Eastern Province' && dist.status === 'Completed'
      )).toBe(true);
    });
  });

  describe('getDistributionById', () => {
    it('should return a specific distribution by ID', async () => {
      const result = await apiService.getDistributionById('dst--001');
      
      expect(result).toHaveProperty('data');
      expect(result.data.id).toBe('dst--001');
      expect(result.data.region).toBe('West Nile');
    });

    it('should throw error for non-existent ID', async () => {
      await expect(apiService.getDistributionById('non-existent')).rejects.toThrow();
    });
  });
});
