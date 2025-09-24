/**
 * @fileoverview Distributions feature exports
 */

// Components
export { DistributionListPresenter } from './components/DistributionListPresenter';
export { DistributionDetailsPresenter } from './components/DistributionDetailsPresenter';
export { DistributionDetailsGrid } from './components/DistributionDetailsGrid';
export { BeneficiariesList } from './components/BeneficiariesList';

// Containers
export { DistributionListContainer } from './containers/DistributionListContainer';
export { DistributionDetailsContainer } from './containers/DistributionDetailsContainer';

// Hooks
export { useDistributions } from './hooks/useDistributions';
export { useDistribution } from './hooks/useDistribution';

// Services
export { distributionServiceInstance } from './services/distribution.service';

// Types
export type {
  DistributionListState,
  DistributionDetailsState,
  DistributionListProps,
  DistributionDetailsProps,
} from './types/distribution.types';
