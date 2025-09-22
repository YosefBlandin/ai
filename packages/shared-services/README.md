# @aidonic/shared-services

Shared services package for the Aidonic Aid Distribution Dashboard. This package provides business logic, data access, and API services that are shared between the web and mobile applications.

## Architecture

This package follows **SOLID principles** and implements several design patterns:

### SOLID Principles

- **Single Responsibility Principle (SRP)**: Each service has one reason to change
- **Open/Closed Principle (OCP)**: Services are open for extension, closed for modification
- **Liskov Substitution Principle (LSP)**: Implementations can be substituted for their interfaces
- **Interface Segregation Principle (ISP)**: Interfaces are focused and specific
- **Dependency Inversion Principle (DIP)**: Depends on abstractions, not concretions

### Design Patterns

- **Factory Pattern**: `ServiceFactory` creates service instances
- **Facade Pattern**: `DistributionService` provides a simplified interface
- **Singleton Pattern**: Services are reused across the application
- **Repository Pattern**: `ApiService` abstracts data access

## Services

### Core Services

#### `ApiService`
- **Responsibility**: API operations and data fetching
- **Interface**: `IApiService`
- **Features**: Mock data, filtering, pagination, error handling

#### `ChartService`
- **Responsibility**: Chart data processing and analytics
- **Interface**: `IChartService`
- **Features**: Status distribution, timeline data, data aggregation

#### `DistributionService`
- **Responsibility**: Business logic orchestration
- **Interface**: `IDistributionService`
- **Features**: Combines API and chart services, provides statistics

### Data Services

#### `MockDataService`
- **Responsibility**: Mock data provision
- **Features**: Sample distributions, filtering, pagination

## Usage

### Basic Usage

```typescript
import { distributionService } from '@aidonic/shared-services';

// Get distributions with filters
const distributions = await distributionService.getDistributions({
  region: 'West Nile',
  status: 'Planned',
  page: 1,
  limit: 10
});

// Get specific distribution
const distribution = await distributionService.getDistributionById('dst--001');

// Get chart data
const statusData = await distributionService.getStatusDistribution();
const timelineData = await distributionService.getTimelineDistribution();
```

### Advanced Usage

```typescript
import { ServiceFactory, ApiService, ChartService } from '@aidonic/shared-services';

// Create custom service instances
const apiService = ServiceFactory.getApiService('https://api.example.com');
const chartService = ServiceFactory.getChartService();
const distributionService = ServiceFactory.getDistributionService();

// Or create with custom dependencies
const customDistributionService = ServiceFactory.createDistributionService(
  apiService,
  chartService
);
```

## Testing

The package includes comprehensive tests for all services:

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

- **Unit Tests**: Individual service methods
- **Integration Tests**: Service interactions
- **Mock Tests**: Dependency injection testing
- **Error Handling**: Error scenarios and edge cases

## API Reference

### Interfaces

#### `IApiService`
```typescript
interface IApiService {
  getDistributions(filters?: DistributionFilters): Promise<DistributionsResponse>;
  getDistributionById(id: string): Promise<DistributionResponse>;
}
```

#### `IChartService`
```typescript
interface IChartService {
  getStatusDistribution(): Promise<StatusChartData[]>;
  getTimelineDistribution(): Promise<TimelineChartData[]>;
}
```

#### `IDistributionService`
```typescript
interface IDistributionService {
  getDistributions(filters?: DistributionFilters): Promise<DistributionsResponse>;
  getDistributionById(id: string): Promise<DistributionResponse>;
  getStatusDistribution(): Promise<StatusChartData[]>;
  getTimelineDistribution(): Promise<TimelineChartData[]>;
}
```

### Data Types

All data types are imported from `@aidonic/shared-types`:

- `Distribution`: Core distribution entity
- `DistributionFilters`: Filtering options
- `DistributionsResponse`: Paginated response
- `StatusChartData`: Chart data for status distribution
- `TimelineChartData`: Chart data for timeline

## Error Handling

All services include comprehensive error handling:

- **Network Errors**: Simulated network delays and failures
- **Validation Errors**: Input validation and type checking
- **Business Logic Errors**: Domain-specific error scenarios
- **Graceful Degradation**: Fallback behavior for failures

## Performance

- **Caching**: Service instances are cached and reused
- **Lazy Loading**: Services are created only when needed
- **Efficient Filtering**: Optimized data filtering algorithms
- **Memory Management**: Proper cleanup and resource management

## Dependencies

- `@aidonic/shared-types`: Type definitions
- `@aidonic/shared-utils`: Utility functions

## Development

### Adding New Services

1. Create interface in `src/interfaces/`
2. Implement service in `src/services/`
3. Add to factory in `src/factories/`
4. Export from `src/index.ts`
5. Add tests in `src/__tests__/`

### Modifying Existing Services

1. Update interface if needed
2. Update implementation
3. Update tests
4. Update documentation

## License

Private package for Aidonic project.
