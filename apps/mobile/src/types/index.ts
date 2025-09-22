// Core domain types - shared with web app
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

export type DistributionStatus = 'Planned' | 'In Progress' | 'Completed' | 'Cancelled';
export type AidType = 'Food' | 'Medical' | 'Shelter' | 'Clothing' | 'Education';
export type DeliveryChannel = 'Direct Distribution' | 'Vouchers' | 'Cash Transfer' | 'Mobile Money';

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

// Filter types
export interface DistributionFilters {
  region?: string;
  status?: DistributionStatus;
  page?: number;
  limit?: number;
}

// Chart data types
export interface StatusChartData {
  status: DistributionStatus;
  count: number;
  percentage: number;
}

export interface TimelineChartData {
  date: string;
  count: number;
}

// UI State types
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

// Navigation types
export type RootStackParamList = {
  DistributionList: undefined;
  DistributionDetails: { distributionId: string };
  Charts: undefined;
};
