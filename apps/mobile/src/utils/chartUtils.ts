import { AidType } from '@aidonic/shared-types';

/**
 * Color mapping for different aid types
 */
const AID_TYPE_COLORS: Record<AidType, string> = {
  Food: '#3B82F6',
  Medical: '#10B981',
  Shelter: '#F59E0B',
  Clothing: '#EF4444',
  Education: '#8B5CF6',
};

/**
 * Get color for a specific aid type
 */
export const getAidTypeColor = (aidType: string): string => {
  return AID_TYPE_COLORS[aidType as AidType] || '#6B7280';
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
