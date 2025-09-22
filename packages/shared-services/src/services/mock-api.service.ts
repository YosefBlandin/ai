import {
  Distribution,
  DistributionFilters,
  DistributionResponse,
  DistributionsResponse,
  DistributionStatus,
} from '@aidonic/shared-types';
import { IApiService } from '../interfaces/api.interface';

/**
 * Mock API Service for development when network is not available
 * This service provides the same interface as ApiService but uses local data
 */
export class MockApiService implements IApiService {
  private readonly mockData: Distribution[] = [
    {
      id: 'dst--001',
      region: 'West Nile',
      date: '2025-06-15',
      status: 'Planned' as DistributionStatus,
      beneficiaries: 1200,
      aidType: 'Food',
      deliveryChannel: 'Vouchers',
      beneficiaryList: [
        { id: 'bnf--001', name: 'Jane Doe' },
        { id: 'bnf--002', name: 'John Smith' },
        { id: 'bnf--003', name: 'Alice Johnson' },
        { id: 'bnf--004', name: 'Bob Wilson' },
      ],
    },
    {
      id: 'dst--002',
      region: 'Eastern Province',
      date: '2025-06-10',
      status: 'Completed' as DistributionStatus,
      beneficiaries: 850,
      aidType: 'Medical',
      deliveryChannel: 'Direct Distribution',
      beneficiaryList: [
        { id: 'bnf--005', name: 'Sarah Brown' },
        { id: 'bnf--006', name: 'Mike Davis' },
        { id: 'bnf--007', name: 'Emma Wilson' },
      ],
    },
    {
      id: 'dst--003',
      region: 'Northern Region',
      date: '2025-06-12',
      status: 'In Progress' as DistributionStatus,
      beneficiaries: 650,
      aidType: 'Shelter',
      deliveryChannel: 'Cash Transfer',
      beneficiaryList: [
        { id: 'bnf--008', name: 'David Miller' },
        { id: 'bnf--009', name: 'Lisa Garcia' },
      ],
    },
    {
      id: 'dst--004',
      region: 'Central Region',
      date: '2025-06-08',
      status: 'Completed' as DistributionStatus,
      beneficiaries: 950,
      aidType: 'Clothing',
      deliveryChannel: 'Mobile Money',
      beneficiaryList: [
        { id: 'bnf--010', name: 'Tom Anderson' },
        { id: 'bnf--011', name: 'Maria Rodriguez' },
        { id: 'bnf--012', name: 'James Taylor' },
      ],
    },
    {
      id: 'dst--005',
      region: 'Western Region',
      date: '2025-06-20',
      status: 'Planned',
      beneficiaries: 1100,
      aidType: 'Education',
      deliveryChannel: 'Vouchers',
      beneficiaryList: [
        { id: 'bnf--013', name: 'Anna White' },
        { id: 'bnf--014', name: 'Chris Lee' },
        { id: 'bnf--015', name: 'Sophie Chen' },
      ],
    },
    {
      id: 'dst--006',
      region: 'Southern Region',
      date: '2025-06-05',
      status: 'Cancelled' as DistributionStatus,
      beneficiaries: 0,
      aidType: 'Food',
      deliveryChannel: 'Direct Distribution',
      beneficiaryList: [],
    },
    {
      id: 'dst--007',
      region: 'West Nile',
      date: '2025-06-18',
      status: 'In Progress' as DistributionStatus,
      beneficiaries: 750,
      aidType: 'Medical',
      deliveryChannel: 'Vouchers',
      beneficiaryList: [
        { id: 'bnf--016', name: 'Peter Kim' },
        { id: 'bnf--017', name: 'Rachel Green' },
      ],
    },
    {
      id: 'dst--008',
      region: 'Eastern Province',
      date: '2025-06-22',
      status: 'Planned',
      beneficiaries: 1300,
      aidType: 'Shelter',
      deliveryChannel: 'Cash Transfer',
      beneficiaryList: [
        { id: 'bnf--018', name: 'Kevin Park' },
        { id: 'bnf--019', name: 'Laura Martinez' },
        { id: 'bnf--020', name: 'Daniel Kim' },
      ],
    },
  ];

  public async getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = [...this.mockData];

    // Apply region filter
    if (filters?.region) {
      filtered = filtered.filter(dist =>
        dist.region.toLowerCase().includes(filters.region?.toLowerCase() || '')
      );
    }

    // Apply status filter
    if (filters?.status) {
      filtered = filtered.filter(dist => dist.status === filters.status);
    }

    // Pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedDistributions = filtered.slice(startIndex, endIndex);

    return {
      data: paginatedDistributions,
      total: filtered.length,
      page,
      limit,
    };
  }

  public async getDistributionById(id: string): Promise<DistributionResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const distribution = this.mockData.find(dist => dist.id === id);

    if (!distribution) {
      throw new Error(`Distribution with id ${id} not found`);
    }

    return { data: distribution };
  }
}
