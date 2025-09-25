/**
 * @fileoverview API service for handling HTTP requests
 */

import {
  DistributionFilters,
  DistributionResponse,
  DistributionsResponse,
} from '@aidonic/shared-types';
import { getApiBaseUrl, getApiTimeout } from '../config/api.config';
import { IApiService } from '../interfaces/api.interface';

/**
 * Service for API operations
 */
export class ApiService implements IApiService {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || getApiBaseUrl();
    this.timeout = getApiTimeout();
  }

  /**
   * Get distributions with optional filtering and pagination
   */
  public async getDistributions(
    filters?: DistributionFilters
  ): Promise<DistributionsResponse> {
    try {
      const queryParams = new URLSearchParams();

      if (filters?.region) {
        queryParams.append('region', filters.region);
      }
      if (filters?.status) {
        queryParams.append('status', filters.status);
      }
      if (filters?.page) {
        queryParams.append('page', filters.page.toString());
      }
      if (filters?.limit) {
        queryParams.append('limit', filters.limit.toString());
      }

      const url = `${this.baseUrl}/api/distributions${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(
          'Request timeout - please check your network connection'
        );
      }
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          'Network error - please check if the JSON server is running and accessible'
        );
      }
      throw new Error(
        `Failed to fetch distributions: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  /**
   * Get a specific distribution by ID
   */
  public async getDistributionById(id: string): Promise<DistributionResponse> {
    try {
      const url = `${this.baseUrl}/api/distributions/${id}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Distribution with ID ${id} not found`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error(
          'Request timeout - please check your network connection'
        );
      }
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error(
          'Network error - please check if the JSON server is running and accessible'
        );
      }
      throw new Error(
        `Failed to fetch distribution ${id}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }
}
