/**
 * @fileoverview Analytics feature types
 */

export interface ChartData {
  name: string;
  value: number;
}

export interface TimelineData {
  month: string;
  beneficiaries: number;
}

export interface AnalyticsState {
  statusData: ChartData[];
  timelineData: TimelineData[];
  loading: boolean;
  error?: string | null;
}

export interface AnalyticsFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  status?: string[];
  aidType?: string[];
}
