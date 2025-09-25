/**
 * @fileoverview Mock data service for development and testing
 */

import { Distribution } from '@aidonic/shared-types';

/**
 * Service for providing mock data
 */
export class MockDataService {
  private static readonly MOCK_DISTRIBUTIONS: Distribution[] = [
    {
      id: 'dst--001',
      region: 'West Nile',
      date: '2025-06-15',
      status: 'Planned',
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
      status: 'Completed',
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
      status: 'In Progress',
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
      status: 'Completed',
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
      status: 'Cancelled',
      beneficiaries: 0,
      aidType: 'Food',
      deliveryChannel: 'Direct Distribution',
      beneficiaryList: [],
    },
    {
      id: 'dst--007',
      region: 'West Nile',
      date: '2025-06-18',
      status: 'In Progress',
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

  /**
   * Get all mock distributions
   */
  public static getAllDistributions(): Distribution[] {
    return [...this.MOCK_DISTRIBUTIONS];
  }

  /**
   * Get a specific distribution by ID
   */
  public static getDistributionById(id: string): Distribution | undefined {
    return this.MOCK_DISTRIBUTIONS.find(dist => dist.id === id);
  }

  /**
   * Filter distributions based on criteria
   */
  public static filterDistributions(
    distributions: Distribution[],
    filters: {
      region?: string;
      status?: string;
      page?: number;
      limit?: number;
    }
  ): { data: Distribution[]; total: number; page: number; limit: number } {
    let filtered = [...distributions];

    // Apply region filter
    if (filters.region) {
      filtered = filtered.filter(dist =>
        dist.region.toLowerCase().includes(filters.region?.toLowerCase() || '')
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(dist => dist.status === filters.status);
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filtered.length,
      page,
      limit,
    };
  }
}
