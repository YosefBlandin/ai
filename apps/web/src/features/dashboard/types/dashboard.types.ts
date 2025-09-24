/**
 * @fileoverview Dashboard feature types
 */

export interface DashboardStats {
  totalDistributions: number;
  totalBeneficiaries: number;
  activeDistributions: number;
  completedDistributions: number;
}

export interface DashboardState {
  stats: DashboardStats;
  loading: boolean;
  error?: string | null;
}

export interface DashboardProps {
  stats: DashboardStats;
  loading: boolean;
  error?: string | null;
  onRefresh: () => void;
}
