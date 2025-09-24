/**
 * @fileoverview Distribution feature types
 */

import {
  Distribution,
  DistributionFilters,
  LoadingState,
  PaginationState,
} from '@aidonic/shared-types';

export interface DistributionListState {
  distributions: Distribution[];
  loading: LoadingState;
  pagination: PaginationState;
  filters: DistributionFilters;
}

export interface DistributionDetailsState {
  distribution: Distribution | null;
  loading: LoadingState;
}

export interface DistributionListProps {
  distributions: Distribution[];
  loading: LoadingState;
  pagination: PaginationState;
  filters: DistributionFilters;
  onFiltersChange: (filters: Partial<DistributionFilters>) => void;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

export interface DistributionDetailsProps {
  distribution: Distribution | null;
  loading: LoadingState;
  headerIcon?: React.ReactNode;
  onRefresh: () => void;
}
