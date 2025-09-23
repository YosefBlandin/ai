/**
 * @fileoverview Centralized color utilities for all color mappings
 */

import { DistributionStatus, AidType } from '@aidonic/shared-types';

/**
 * Centralized color utilities to eliminate duplication across components
 * This is the single source of truth for all color mappings in the application
 */

// Status color mappings - comprehensive color definitions
export const STATUS_COLORS = {
  Planned: {
    background: '#eff6ff',
    text: '#1e40af',
    border: '#dbeafe',
    solid: '#3b82f6',
    tailwind: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  'In Progress': {
    background: '#fffbeb',
    text: '#92400e',
    border: '#fef3c7',
    solid: '#f59e0b',
    tailwind: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  },
  Completed: {
    background: '#f0fdf4',
    text: '#166534',
    border: '#dcfce7',
    solid: '#10b981',
    tailwind: 'bg-green-100 text-green-800 border-green-200',
  },
  Cancelled: {
    background: '#fef2f2',
    text: '#991b1b',
    border: '#fee2e2',
    solid: '#ef4444',
    tailwind: 'bg-red-100 text-red-800 border-red-200',
  },
} as const;

// Aid type color mappings
export const AID_TYPE_COLORS = {
  Food: '#3B82F6',
  Medical: '#10B981',
  Shelter: '#F59E0B',
  Clothing: '#EF4444',
  Education: '#8B5CF6',
} as const;

// Type definitions for better type safety
export type StatusColorKey = keyof typeof STATUS_COLORS;
export type AidTypeColorKey = keyof typeof AID_TYPE_COLORS;

/**
 * Get status color for a given distribution status
 * @param status - The distribution status
 * @returns The solid color hex value for the status
 */
export const getStatusColor = (status: DistributionStatus): string => {
  return STATUS_COLORS[status]?.solid || '#6b7280';
};

/**
 * Get status background color for a given distribution status
 * @param status - The distribution status
 * @returns The background color hex value for the status
 */
export const getStatusBackgroundColor = (
  status: DistributionStatus
): string => {
  return STATUS_COLORS[status]?.background || '#f3f4f6';
};

/**
 * Get status text color for a given distribution status
 * @param status - The distribution status
 * @returns The text color hex value for the status
 */
export const getStatusTextColor = (status: DistributionStatus): string => {
  return STATUS_COLORS[status]?.text || '#6b7280';
};

/**
 * Get status border color for a given distribution status
 * @param status - The distribution status
 * @returns The border color hex value for the status
 */
export const getStatusBorderColor = (status: DistributionStatus): string => {
  return STATUS_COLORS[status]?.border || '#e5e7eb';
};

/**
 * Get aid type color for a given aid type
 * @param aidType - The aid type
 * @returns The color hex value for the aid type
 */
export const getAidTypeColor = (aidType: AidType): string => {
  return AID_TYPE_COLORS[aidType] || '#6b7280';
};

/**
 * Get Tailwind CSS classes for status styling (web only)
 * @param status - The distribution status
 * @returns The Tailwind CSS class string for the status
 */
export const getStatusColorClass = (status: DistributionStatus): string => {
  return (
    STATUS_COLORS[status]?.tailwind ||
    'bg-gray-100 text-gray-800 border-gray-200'
  );
};

/**
 * Get all status colors for a given status (useful for complex styling)
 * @param status - The distribution status
 * @returns Object containing all color variants for the status
 */
export const getStatusColorSet = (status: DistributionStatus) => {
  return (
    STATUS_COLORS[status] || {
      background: '#f3f4f6',
      text: '#6b7280',
      border: '#e5e7eb',
      solid: '#6b7280',
      tailwind: 'bg-gray-100 text-gray-800 border-gray-200',
    }
  );
};

/**
 * Check if a status is valid
 * @param status - The status to check
 * @returns True if the status is valid
 */
export const isValidStatus = (status: string): status is DistributionStatus => {
  return status in STATUS_COLORS;
};

/**
 * Check if an aid type is valid
 * @param aidType - The aid type to check
 * @returns True if the aid type is valid
 */
export const isValidAidType = (aidType: string): aidType is AidType => {
  return aidType in AID_TYPE_COLORS;
};
