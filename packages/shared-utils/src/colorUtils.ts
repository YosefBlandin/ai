/**
 * @fileoverview Centralized color utilities for all color mappings
 * This file provides utilities that map to the shared design tokens
 */

import { DistributionStatus, AidType } from '@aidonic/shared-types';

/**
 * Centralized color utilities to eliminate duplication across components
 * This is the single source of truth for all color mappings in the application
 * All colors are derived from the shared design tokens
 */

// Status color mappings using design token values
export const STATUS_COLORS = {
  Planned: {
    background: '#eff6ff', // primary.50
    text: '#1e40af', // primary.800
    border: '#dbeafe', // primary.100
    solid: '#3b82f6', // primary.500
    tailwind: 'bg-primary-100 text-primary-800 border-primary-200',
  },
  'In Progress': {
    background: '#fffbeb', // warning.50
    text: '#92400e', // warning.800
    border: '#fef3c7', // warning.100
    solid: '#f59e0b', // warning.500
    tailwind: 'bg-warning-100 text-warning-800 border-warning-200',
  },
  Completed: {
    background: '#f0fdf4', // success.50
    text: '#166534', // success.800
    border: '#dcfce7', // success.100
    solid: '#22c55e', // success.500
    tailwind: 'bg-success-100 text-success-800 border-success-200',
  },
  Cancelled: {
    background: '#fef2f2', // error.50
    text: '#991b1b', // error.800
    border: '#fee2e2', // error.100
    solid: '#ef4444', // error.500
    tailwind: 'bg-error-100 text-error-800 border-error-200',
  },
} as const;

// Aid type color mappings using design token values
export const AID_TYPE_COLORS = {
  Food: '#3b82f6', // primary.500
  Medical: '#22c55e', // success.500
  Shelter: '#f59e0b', // warning.500
  Clothing: '#ef4444', // error.500
  Education: '#8b5cf6', // purple.500 (using closest available)
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
  // Use CSS classes defined in globals.css instead of direct Tailwind utilities
  return STATUS_COLORS[status]?.tailwind || 'status-badge';
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
