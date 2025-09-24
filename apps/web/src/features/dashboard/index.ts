/**
 * @fileoverview Dashboard feature exports
 */

// Components
export { DashboardPresenter } from './components/DashboardPresenter';
export { StatsOverview } from './components/StatsOverview';
export { DashboardHeader } from './components/DashboardHeader';
export { Sidebar } from './components/Sidebar';

// Containers
export { DashboardContainer } from './containers/DashboardContainer';

// Hooks
export { useDashboard } from './hooks/useDashboard';

// Services
export { dashboardService } from './services/dashboard.service';

// Types
export type {
  DashboardStats,
  DashboardState,
  DashboardProps,
} from './types/dashboard.types';
