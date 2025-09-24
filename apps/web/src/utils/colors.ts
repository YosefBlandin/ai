/**
 * @fileoverview Centralized color utilities for web application
 * Provides consistent color classes and utilities across all components
 */

/**
 * Centralized color class mappings for consistent styling
 * This eliminates hardcoded color classes throughout the application
 */
export const COLORS = {
  // Background colors
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    tertiary: 'bg-gray-100',
    loading: 'bg-gray-200',
    error: 'bg-red-50',
    success: 'bg-green-50',
    warning: 'bg-yellow-50',
    info: 'bg-blue-50',
  },

  // Text colors
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-600',
    tertiary: 'text-gray-500',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
    white: 'text-white',
  },

  // Border colors
  border: {
    primary: 'border-gray-200',
    secondary: 'border-gray-300',
    error: 'border-red-200',
    success: 'border-green-200',
    warning: 'border-yellow-200',
    info: 'border-blue-200',
  },

  // Button colors
  button: {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    error: 'bg-red-600 hover:bg-red-700 text-white',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
    outline: 'border border-gray-300 hover:bg-gray-50 text-gray-700',
  },

  // Status colors
  status: {
    planned: 'bg-blue-100 text-blue-800 border-blue-200',
    inProgress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    completed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  },

  // Interactive states
  interactive: {
    hover: 'hover:bg-gray-100',
    focus: 'focus:ring-2 focus:ring-blue-500',
    active: 'active:bg-gray-200',
  },
} as const;

/**
 * Get color classes for a specific status
 */
export const getStatusColors = (status: string) => {
  const statusMap: Record<string, string> = {
    Planned: COLORS.status.planned,
    'In Progress': COLORS.status.inProgress,
    Completed: COLORS.status.completed,
    Cancelled: COLORS.status.cancelled,
  };
  return statusMap[status] || COLORS.status.planned;
};

/**
 * Get button color classes
 */
export const getButtonColors = (
  variant:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'outline' = 'primary'
) => {
  return COLORS.button[variant];
};

/**
 * Get text color classes
 */
export const getTextColors = (
  variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'error'
    | 'success'
    | 'warning'
    | 'info'
    | 'white' = 'primary'
) => {
  return COLORS.text[variant];
};

/**
 * Get background color classes
 */
export const getBackgroundColors = (
  variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'loading'
    | 'error'
    | 'success'
    | 'warning'
    | 'info' = 'primary'
) => {
  return COLORS.background[variant];
};
