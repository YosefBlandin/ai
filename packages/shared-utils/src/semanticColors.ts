/**
 * @fileoverview Semantic color utilities for consistent color usage across the application
 * This file provides semantic color classes that map to design tokens, ensuring DRY principles
 * All classes reference the centralized design tokens defined in shared/design-tokens/colors.ts
 */

/**
 * Semantic color mappings for consistent usage across components
 * These classes should be used instead of hardcoded Tailwind color classes
 * All classes are derived from the shared design tokens
 */
export const SEMANTIC_COLORS = {
  // Background colors - using design token classes
  background: {
    primary: 'bg-background-primary',
    secondary: 'bg-background-secondary',
    tertiary: 'bg-background-tertiary',
  },

  // Text colors - using design token classes
  text: {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    tertiary: 'text-text-tertiary',
    inverse: 'text-text-inverse',
  },

  // Border colors - using design token classes
  border: {
    light: 'border-border-light',
    medium: 'border-border-medium',
    dark: 'border-border-dark',
  },

  // Primary color variants - using design token classes
  primary: {
    solid: 'bg-primary-500',
    light: 'bg-primary-100',
    text: 'text-primary-500',
    border: 'border-primary-200',
    hover: 'hover:bg-primary-600',
    focus: 'focus:ring-primary-500',
  },

  // Secondary color variants - using design token classes
  secondary: {
    solid: 'bg-secondary-500',
    light: 'bg-secondary-100',
    text: 'text-secondary-500',
    border: 'border-secondary-200',
    hover: 'hover:bg-secondary-600',
    focus: 'focus:ring-secondary-500',
  },

  // Status colors - using design token classes
  success: {
    solid: 'bg-success-500',
    light: 'bg-success-100',
    text: 'text-success-500',
    border: 'border-success-200',
    hover: 'hover:bg-success-600',
    focus: 'focus:ring-success-500',
  },

  warning: {
    solid: 'bg-warning-500',
    light: 'bg-warning-100',
    text: 'text-warning-500',
    border: 'border-warning-200',
    hover: 'hover:bg-warning-600',
    focus: 'focus:ring-warning-500',
  },

  error: {
    solid: 'bg-error-500',
    light: 'bg-error-100',
    text: 'text-error-500',
    border: 'border-error-200',
    hover: 'hover:bg-error-600',
    focus: 'focus:ring-error-500',
  },
} as const;

/**
 * Get semantic color class for any color type
 * @param colorType - The color type (background, text, border, primary, etc.)
 * @param variant - The color variant
 * @returns The semantic color class
 */
export const getSemanticColor = (
  colorType: keyof typeof SEMANTIC_COLORS,
  variant: string = 'primary'
): string => {
  const colorGroup = SEMANTIC_COLORS[colorType];
  if (typeof colorGroup === 'object' && variant in colorGroup) {
    return colorGroup[variant as keyof typeof colorGroup];
  }
  // Fallback for string values
  return typeof colorGroup === 'string' ? colorGroup : '';
};

/**
 * Common color combinations for consistent usage
 * These use the semantic color classes defined above
 */
export const COLOR_COMBINATIONS = {
  // Card styling using semantic classes
  card: 'bg-background-primary border-border-light text-text-primary',

  // Button styling using semantic classes
  button: {
    primary:
      'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500',
    secondary:
      'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
    outline:
      'border border-border-medium text-text-primary hover:bg-background-secondary focus:ring-primary-500',
    ghost:
      'text-text-primary hover:bg-background-secondary focus:ring-primary-500',
  },

  // Input styling using semantic classes
  input: {
    default:
      'border-border-medium focus:ring-primary-500 focus:border-primary-500',
    error: 'border-error-500 focus:ring-error-500 focus:border-error-500',
    success:
      'border-success-500 focus:ring-success-500 focus:border-success-500',
  },
} as const;
