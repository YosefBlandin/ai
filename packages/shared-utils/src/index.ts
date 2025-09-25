/**
 * @fileoverview Shared utilities package exports
 */

import { AidType, DeliveryChannel } from '@aidonic/shared-types';

// Re-export utilities
export * from './colorUtils';
export * from './semanticColors';
export * from './formatters';
export * from './constants';
export * from './errorHandling';

// Export new distribution management utilities
export * from './DistributionManager';
export * from './ChartManager';
export * from './hookFactories';

// Export chart configuration utilities
export * from './chartConfig';

// Color functions moved to colorUtils.ts

/**
 * Get icon name for a given aid type
 * @param aidType - The aid type to get icon for
 * @returns Icon name string for the aid type
 */
export const getAidTypeIcon = (aidType: AidType): string => {
  const iconMap = {
    Food: 'apple',
    Medical: 'heart',
    Shelter: 'home',
    Clothing: 'shirt',
    Education: 'book',
  };
  return iconMap[aidType] || 'package';
};

/**
 * Get icon name for a given delivery channel
 * @param channel - The delivery channel to get icon for
 * @returns Icon name string for the delivery channel
 */
export const getDeliveryChannelIcon = (channel: DeliveryChannel): string => {
  const iconMap = {
    'Direct Distribution': 'truck',
    Vouchers: 'credit-card',
    'Cash Transfer': 'smartphone',
    'Mobile Money': 'smartphone',
  };
  return iconMap[channel] || 'package';
};

/**
 * Validate email address format
 * @param email - Email address to validate
 * @returns True if email format is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 * @param phone - Phone number to validate
 * @returns True if phone number format is valid, false otherwise
 */
export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Group array items by a specific key
 * @param array - Array to group
 * @param key - Key to group by
 * @returns Object with grouped items
 */
export const groupBy = <T, K extends keyof T>(
  array: T[],
  key: K
): Record<string, T[]> => {
  return array.reduce(
    (groups, item) => {
      const group = String(item[key]);
      groups[group] = groups[group] || [];
      groups[group].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
};

/**
 * Sort array by a specific key
 * @param array - Array to sort
 * @param key - Key to sort by
 * @param direction - Sort direction (asc or desc)
 * @returns Sorted array
 */
export const sortBy = <T>(
  array: T[],
  key: keyof T,
  direction: 'asc' | 'desc' = 'asc'
): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Capitalize the first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate string to specified length with ellipsis
 * @param str - String to truncate
 * @param length - Maximum length
 * @returns Truncated string with ellipsis if needed
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

/**
 * Debounce function execution
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function execution
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 */
export const throttle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
