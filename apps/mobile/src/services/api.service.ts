import { Distribution, DistributionFilters, DistributionsResponse, DistributionResponse } from '@/types';

// Mock data for mobile app
const mockDistributions: Distribution[] = [
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
      { id: 'bnf--005', name: 'Carol Brown' }
    ]
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
      { id: 'bnf--001', name: 'Jane Doe' },
      { id: 'bnf--002', name: 'John Smith' },
      { id: 'bnf--003', name: 'Alice Johnson' }
    ]
  },
  {
    id: 'dst--003',
    region: 'Northern Region',
    date: '2025-06-12',
    status: 'In Progress',
    beneficiaries: 2000,
    aidType: 'Shelter',
    deliveryChannel: 'Cash Transfer',
    beneficiaryList: [
      { id: 'bnf--001', name: 'Jane Doe' },
      { id: 'bnf--002', name: 'John Smith' },
      { id: 'bnf--003', name: 'Alice Johnson' },
      { id: 'bnf--004', name: 'Bob Wilson' },
      { id: 'bnf--005', name: 'Carol Brown' },
      { id: 'bnf--006', name: 'David Lee' },
      { id: 'bnf--007', name: 'Emma Davis' }
    ]
  },
  {
    id: 'dst--004',
    region: 'Central Region',
    date: '2025-06-08',
    status: 'Completed',
    beneficiaries: 650,
    aidType: 'Clothing',
    deliveryChannel: 'Mobile Money',
    beneficiaryList: [
      { id: 'bnf--001', name: 'Jane Doe' },
      { id: 'bnf--002', name: 'John Smith' },
      { id: 'bnf--003', name: 'Alice Johnson' },
      { id: 'bnf--004', name: 'Bob Wilson' }
    ]
  },
  {
    id: 'dst--005',
    region: 'Western Region',
    date: '2025-06-20',
    status: 'Planned',
    beneficiaries: 1500,
    aidType: 'Education',
    deliveryChannel: 'Direct Distribution',
    beneficiaryList: [
      { id: 'bnf--001', name: 'Jane Doe' },
      { id: 'bnf--002', name: 'John Smith' },
      { id: 'bnf--003', name: 'Alice Johnson' },
      { id: 'bnf--004', name: 'Bob Wilson' },
      { id: 'bnf--005', name: 'Carol Brown' },
      { id: 'bnf--006', name: 'David Lee' }
    ]
  },
  {
    id: 'dst--006',
    region: 'West Nile',
    date: '2025-06-05',
    status: 'Cancelled',
    beneficiaries: 300,
    aidType: 'Food',
    deliveryChannel: 'Vouchers',
    beneficiaryList: [
      { id: 'bnf--001', name: 'Jane Doe' },
      { id: 'bnf--002', name: 'John Smith' }
    ]
  },
  {
    id: 'dst--007',
    region: 'Eastern Province',
    date: '2025-06-18',
    status: 'Completed',
    beneficiaries: 900,
    aidType: 'Medical',
    deliveryChannel: 'Direct Distribution',
    beneficiaryList: [
      { id: 'bnf--001', name: 'Jane Doe' },
      { id: 'bnf--002', name: 'John Smith' },
      { id: 'bnf--003', name: 'Alice Johnson' },
      { id: 'bnf--004', name: 'Bob Wilson' },
      { id: 'bnf--005', name: 'Carol Brown' }
    ]
  },
  {
    id: 'dst--008',
    region: 'Northern Region',
    date: '2025-06-22',
    status: 'Planned',
    beneficiaries: 1800,
    aidType: 'Shelter',
    deliveryChannel: 'Cash Transfer',
    beneficiaryList: [
      { id: 'bnf--001', name: 'Jane Doe' },
      { id: 'bnf--002', name: 'John Smith' },
      { id: 'bnf--003', name: 'Alice Johnson' },
      { id: 'bnf--004', name: 'Bob Wilson' },
      { id: 'bnf--005', name: 'Carol Brown' },
      { id: 'bnf--006', name: 'David Lee' },
      { id: 'bnf--007', name: 'Emma Davis' },
      { id: 'bnf--008', name: 'Frank Miller' }
    ]
  }
];

// API Service implementation following SOLID principles
export class ApiService {
  async getDistributions(filters?: DistributionFilters): Promise<DistributionsResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredData = [...mockDistributions];

    // Apply filters
    if (filters?.region) {
      filteredData = filteredData.filter(dist => dist.region === filters.region);
    }

    if (filters?.status) {
      filteredData = filteredData.filter(dist => dist.status === filters.status);
    }

    // Apply pagination
    const page = filters?.page || 1;
    const limit = filters?.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: filteredData.length,
      page,
      limit
    };
  }

  async getDistributionById(id: string): Promise<DistributionResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));

    const distribution = mockDistributions.find(dist => dist.id === id);
    
    if (!distribution) {
      throw new Error(`Distribution with id ${id} not found`);
    }

    return { data: distribution };
  }
}

// Singleton instance
export const apiService = new ApiService();
