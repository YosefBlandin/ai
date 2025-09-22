import { DistributionService } from '../services/distribution.service';
import { ApiService } from '../services/api.service';
import { ChartService } from '../services/chart.service';

describe('DistributionService', () => {
  let distributionService: DistributionService;
  let mockApiService: jest.Mocked<ApiService>;
  let mockChartService: jest.Mocked<ChartService>;

  beforeEach(() => {
    mockApiService = {
      getDistributions: jest.fn(),
      getDistributionById: jest.fn()
    } as any;

    mockChartService = {
      getStatusDistribution: jest.fn(),
      getTimelineDistribution: jest.fn()
    } as any;

    distributionService = new DistributionService(mockApiService, mockChartService);
  });

  describe('getDistributions', () => {
    it('should delegate to API service', async () => {
      const mockResponse = {
        data: [],
        total: 0,
        page: 1,
        limit: 10
      };
      mockApiService.getDistributions.mockResolvedValue(mockResponse);

      const result = await distributionService.getDistributions();

      expect(mockApiService.getDistributions).toHaveBeenCalled();
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getDistributionById', () => {
    it('should delegate to API service', async () => {
      const mockResponse = {
        data: {
          id: 'dst--001',
          region: 'West Nile',
          date: '2025-06-15',
          status: 'Planned' as const,
          beneficiaries: 1200,
          aidType: 'Food' as const,
          deliveryChannel: 'Vouchers' as const
        }
      };
      mockApiService.getDistributionById.mockResolvedValue(mockResponse);

      const result = await distributionService.getDistributionById('dst--001');

      expect(mockApiService.getDistributionById).toHaveBeenCalledWith('dst--001');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getStatusDistribution', () => {
    it('should delegate to chart service', async () => {
      const mockData = [
        { status: 'Planned', count: 2, percentage: 25 },
        { status: 'Completed', count: 4, percentage: 50 },
        { status: 'In Progress', count: 2, percentage: 25 }
      ];
      mockChartService.getStatusDistribution.mockResolvedValue(mockData);

      const result = await distributionService.getStatusDistribution();

      expect(mockChartService.getStatusDistribution).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe('getTimelineDistribution', () => {
    it('should delegate to chart service', async () => {
      const mockData = [
        { date: '2025-06-05', count: 1 },
        { date: '2025-06-10', count: 1 },
        { date: '2025-06-15', count: 1 }
      ];
      mockChartService.getTimelineDistribution.mockResolvedValue(mockData);

      const result = await distributionService.getTimelineDistribution();

      expect(mockChartService.getTimelineDistribution).toHaveBeenCalled();
      expect(result).toEqual(mockData);
    });
  });

  describe('getDistributionStats', () => {
    it('should return comprehensive statistics', async () => {
      const mockDistributions = {
        data: [
          { id: '1', region: 'A', date: '2025-06-15', status: 'Planned' as const, beneficiaries: 100, aidType: 'Food' as const, deliveryChannel: 'Vouchers' as const },
          { id: '2', region: 'B', date: '2025-06-10', status: 'Completed' as const, beneficiaries: 200, aidType: 'Medical' as const, deliveryChannel: 'Direct Distribution' as const }
        ],
        total: 2,
        page: 1,
        limit: 10
      };

      const mockStatusData = [
        { status: 'Planned', count: 1, percentage: 50 },
        { status: 'Completed', count: 1, percentage: 50 }
      ];

      mockApiService.getDistributions.mockResolvedValue(mockDistributions);
      mockChartService.getStatusDistribution.mockResolvedValue(mockStatusData);

      const result = await distributionService.getDistributionStats();

      expect(result).toEqual({
        totalDistributions: 2,
        totalBeneficiaries: 300,
        averageBeneficiaries: 150,
        statusBreakdown: mockStatusData
      });
    });
  });
});
