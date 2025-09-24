/**
 * @fileoverview Shared types package exports
 */

// Core domain types - shared between web and mobile
export interface Beneficiary {
  id: string;
  name: string;
}

export interface Distribution {
  id: string;
  region: string;
  date: string;
  status: DistributionStatus;
  beneficiaries: number;
  aidType: AidType;
  deliveryChannel: DeliveryChannel;
  beneficiaryList?: Beneficiary[];
}

export type DistributionStatus =
  | 'Planned'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled';
export type AidType = 'Food' | 'Medical' | 'Shelter' | 'Clothing' | 'Education';
export type DeliveryChannel =
  | 'Direct Distribution'
  | 'Vouchers'
  | 'Cash Transfer'
  | 'Mobile Money';

// API Response types
export interface DistributionsResponse {
  data: Distribution[];
  total: number;
  page: number;
  limit: number;
}

export interface DistributionResponse {
  data: Distribution;
}

// Filter and state types
export interface DistributionFilters {
  region?: string;
  status?: DistributionStatus;
  aidType?: AidType;
  deliveryChannel?: DeliveryChannel;
  page?: number;
  limit?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Chart data types
export interface StatusChartData {
  status: DistributionStatus;
  count: number;
  percentage: number;
}

export interface AidTypeChartData {
  aidType: AidType;
  count: number;
  percentage: number;
}

export interface TimelineChartData {
  date: string;
  count: number;
}

// Navigation types (React Navigation specific)
export type RootStackParamList = {
  DistributionList: undefined;
  DistributionDetails: { distributionId: string };
  Charts: undefined;
};

// React Navigation types
export interface NavigationProp {
  navigate: <T extends keyof RootStackParamList>(
    screen: T,
    params?: RootStackParamList[T] extends undefined
      ? undefined
      : RootStackParamList[T]
  ) => void;
  goBack: () => void;
}

export interface RouteProp {
  params: {
    distributionId: string;
  };
}

// API Service interfaces
export interface ApiService {
  getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse>;
  getDistributionById(id: string): Promise<DistributionResponse>;
}

export interface ChartService {
  getStatusDistribution(): Promise<StatusChartData[]>;
  getTimelineDistribution(): Promise<TimelineChartData[]>;
}

export interface DistributionRepository {
  getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse>;
  getDistributionById(id: string): Promise<DistributionResponse>;
  updateDistribution(
    id: string,
    data: Partial<Distribution>
  ): Promise<Distribution>;
  deleteDistribution(id: string): Promise<void>;
}
