import { ChartService } from '../services/chart.service';
import { MockApiService } from '../services/mock-api.service';

describe('ChartService', () => {
  let chartService: ChartService;

  beforeEach(() => {
    chartService = new ChartService(new MockApiService());
  });

  describe('getStatusDistribution', () => {
    it('should return status distribution data', async () => {
      const result = await chartService.getStatusDistribution();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      result.forEach(item => {
        expect(item).toHaveProperty('status');
        expect(item).toHaveProperty('count');
        expect(item).toHaveProperty('percentage');
        expect(typeof item.status).toBe('string');
        expect(typeof item.count).toBe('number');
        expect(typeof item.percentage).toBe('number');
        expect(item.percentage).toBeGreaterThanOrEqual(0);
        expect(item.percentage).toBeLessThanOrEqual(100);
      });
    });

    it('should have percentages that sum to 100', async () => {
      const result = await chartService.getStatusDistribution();
      const totalPercentage = result.reduce(
        (sum, item) => sum + item.percentage,
        0
      );

      expect(totalPercentage).toBe(100);
    });
  });

  describe('getTimelineDistribution', () => {
    it('should return timeline distribution data', async () => {
      const result = await chartService.getTimelineDistribution();

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);

      result.forEach(item => {
        expect(item).toHaveProperty('date');
        expect(item).toHaveProperty('count');
        expect(typeof item.date).toBe('string');
        expect(typeof item.count).toBe('number');
        expect(item.count).toBeGreaterThan(0);
      });
    });

    it('should return data sorted by date', async () => {
      const result = await chartService.getTimelineDistribution();

      for (let i = 1; i < result.length; i++) {
        const prevDate = new Date(result[i - 1].date);
        const currentDate = new Date(result[i].date);
        expect(prevDate.getTime()).toBeLessThanOrEqual(currentDate.getTime());
      }
    });
  });
});
