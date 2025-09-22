import { AidTypeChartData, TimelineChartData, AidType } from '@/types';

// Mock data for charts
const mockDistributions = [
  {
    id: 'dst--001',
    region: 'West Nile',
    date: '2025-06-15',
    status: 'Planned' as const,
    beneficiaries: 1200,
    aidType: 'Food',
    deliveryChannel: 'Vouchers',
  },
  {
    id: 'dst--002',
    region: 'Eastern Province',
    date: '2025-06-10',
    status: 'Completed' as const,
    beneficiaries: 850,
    aidType: 'Medical',
    deliveryChannel: 'Direct Distribution',
  },
  {
    id: 'dst--003',
    region: 'Northern Region',
    date: '2025-06-12',
    status: 'In Progress' as const,
    beneficiaries: 2000,
    aidType: 'Shelter',
    deliveryChannel: 'Cash Transfer',
  },
  {
    id: 'dst--004',
    region: 'Central Region',
    date: '2025-06-08',
    status: 'Completed' as const,
    beneficiaries: 650,
    aidType: 'Clothing',
    deliveryChannel: 'Mobile Money',
  },
  {
    id: 'dst--005',
    region: 'Western Region',
    date: '2025-06-20',
    status: 'Planned' as const,
    beneficiaries: 1500,
    aidType: 'Education',
    deliveryChannel: 'Direct Distribution',
  },
  {
    id: 'dst--006',
    region: 'West Nile',
    date: '2025-06-05',
    status: 'Cancelled' as const,
    beneficiaries: 300,
    aidType: 'Food',
    deliveryChannel: 'Vouchers',
  },
  {
    id: 'dst--007',
    region: 'Eastern Province',
    date: '2025-06-18',
    status: 'Completed' as const,
    beneficiaries: 900,
    aidType: 'Medical',
    deliveryChannel: 'Direct Distribution',
  },
  {
    id: 'dst--008',
    region: 'Northern Region',
    date: '2025-06-22',
    status: 'Planned' as const,
    beneficiaries: 1800,
    aidType: 'Shelter',
    deliveryChannel: 'Cash Transfer',
  }
];

/**
 * Service for processing chart data
 */
export class ChartService {
  async getStatusDistribution(): Promise<AidTypeChartData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const aidTypeCounts = mockDistributions.reduce((acc, dist) => {
      acc[dist.aidType] = (acc[dist.aidType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const total = mockDistributions.length;
    
    return Object.entries(aidTypeCounts).map(([aidType, count]) => ({
      aidType: aidType as AidType,
      count,
      percentage: Math.round((count / total) * 100)
    }));
  }

  async getTimelineDistribution(): Promise<TimelineChartData[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    const timelineData = mockDistributions.reduce((acc, dist) => {
      const date = dist.date;
      acc[date] = (acc[date] || 0) + dist.beneficiaries;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(timelineData)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  getStatusColor(status: string): string {
    const colors = {
      'Food': '#3B82F6',
      'Medical': '#10B981',
      'Shelter': '#F59E0B',
      'Clothing': '#EF4444',
      'Education': '#8B5CF6'
    };
    return colors[status as keyof typeof colors] || '#6B7280';
  }
}

// Singleton instance
export const chartService = new ChartService();
