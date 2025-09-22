// Shared component styling logic that can be used by both platforms
import { colors, spacing, typography, radius, componentTokens } from '../design-tokens';

// Shared button configuration
export const buttonConfig = {
  variants: {
    primary: {
      backgroundColor: colors.primary[500],
      textColor: colors.text.inverse,
      borderColor: colors.primary[500],
    },
    secondary: {
      backgroundColor: colors.secondary[500],
      textColor: colors.text.inverse,
      borderColor: colors.secondary[500],
    },
    outline: {
      backgroundColor: 'transparent',
      textColor: colors.text.primary,
      borderColor: colors.border.medium,
    },
    ghost: {
      backgroundColor: 'transparent',
      textColor: colors.text.primary,
      borderColor: 'transparent',
    },
  },
  sizes: {
    sm: {
      height: componentTokens.button.height.sm,
      paddingHorizontal: componentTokens.button.padding.sm.horizontal,
      paddingVertical: componentTokens.button.padding.sm.vertical,
      fontSize: typography.fontSize.sm,
    },
    md: {
      height: componentTokens.button.height.md,
      paddingHorizontal: componentTokens.button.padding.md.horizontal,
      paddingVertical: componentTokens.button.padding.md.vertical,
      fontSize: typography.fontSize.sm,
    },
    lg: {
      height: componentTokens.button.height.lg,
      paddingHorizontal: componentTokens.button.padding.lg.horizontal,
      paddingVertical: componentTokens.button.padding.lg.vertical,
      fontSize: typography.fontSize.base,
    },
  },
} as const;

// Shared card configuration
export const cardConfig = {
  base: {
    backgroundColor: colors.background.primary,
    borderRadius: componentTokens.card.borderRadius,
    borderWidth: componentTokens.card.borderWidth,
    borderColor: colors.border.light,
    padding: componentTokens.card.padding,
  },
  variants: {
    elevated: {
      shadowColor: colors.neutral[900],
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    flat: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
  },
} as const;

// Shared input configuration
export const inputConfig = {
  base: {
    height: componentTokens.input.height,
    paddingHorizontal: componentTokens.input.padding,
    paddingVertical: componentTokens.input.padding,
    borderWidth: componentTokens.input.borderWidth,
    borderColor: colors.border.medium,
    borderRadius: componentTokens.input.borderRadius,
    backgroundColor: colors.background.primary,
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
  },
  states: {
    focus: {
      borderColor: colors.primary[500],
      shadowColor: colors.primary[500],
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    error: {
      borderColor: colors.error[500],
    },
    disabled: {
      backgroundColor: colors.neutral[100],
      color: colors.text.tertiary,
    },
  },
} as const;

// Shared status badge configuration
export const statusBadgeConfig = {
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
  },
  variants: {
    planned: {
      backgroundColor: colors.primary[100],
      textColor: colors.primary[800],
      borderColor: colors.primary[200],
    },
    'in-progress': {
      backgroundColor: colors.warning[100],
      textColor: colors.warning[800],
      borderColor: colors.warning[200],
    },
    completed: {
      backgroundColor: colors.success[100],
      textColor: colors.success[800],
      borderColor: colors.success[200],
    },
    cancelled: {
      backgroundColor: colors.error[100],
      textColor: colors.error[800],
      borderColor: colors.error[200],
    },
  },
} as const;

// Shared typography configuration
export const typographyConfig = {
  headings: {
    h1: {
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      color: colors.text.primary,
    },
    h2: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
      color: colors.text.primary,
    },
    h3: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
      color: colors.text.primary,
    },
  },
  body: {
    base: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.lineHeight.normal,
      color: colors.text.primary,
    },
    secondary: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.lineHeight.normal,
      color: colors.text.secondary,
    },
    muted: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.lineHeight.normal,
      color: colors.text.tertiary,
    },
  },
} as const;
