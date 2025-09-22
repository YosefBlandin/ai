// Export interfaces
export * from './interfaces/api.interface';

// Export services
export { ApiService } from './services/api.service';
export { ChartService } from './services/chart.service';
export { DistributionService } from './services/distribution.service';

// Export data services
export { MockDataService } from './data/mock-data';

// Export factory
export { ServiceFactory } from './factories/service.factory';

// Export configuration
export * from './config/api.config';

// Export convenience instances
import { ServiceFactory } from './factories/service.factory';

/**
 * Pre-configured service instances for easy use
 * These are singletons and will be reused across the application
 */
export const apiService = ServiceFactory.getApiService();
export const chartService = ServiceFactory.getChartService();
export const distributionService = ServiceFactory.getDistributionService();
