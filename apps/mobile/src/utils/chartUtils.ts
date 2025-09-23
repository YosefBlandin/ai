import { AidType } from '@aidonic/shared-types';
import { getAidTypeColor as getCentralizedAidTypeColor } from '@aidonic/shared-utils';

/**
 * Get color for a specific aid type
 * Re-exported from centralized color utilities
 */
export const getAidTypeColor = (aidType: string): string => {
  return getCentralizedAidTypeColor(aidType as AidType);
};

/**
 * Format date for chart labels
 */
export const formatChartDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return 'Invalid';
  }
};

/**
 * Safely parse and validate numeric values for charts
 */
export const safeParseNumber = (value: number | undefined | null): number => {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  return Math.max(0, Math.floor(value));
};

/**
 * Validate chart data item
 */
export const isValidChartData = <T extends { count?: number }>(
  item: T | null | undefined
): item is T & { count: number } => {
  return (
    item !== null &&
    item !== undefined &&
    typeof item.count === 'number' &&
    !isNaN(item.count) &&
    item.count >= 0
  );
};
