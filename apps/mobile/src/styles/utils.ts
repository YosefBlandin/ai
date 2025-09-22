import { StyleSheet, Platform } from 'react-native';
import { colors, spacing, typography, radius, shadows, statusColors, componentTokens } from './tokens';

// Mobile-specific style utilities using React Native StyleSheet
export const createMobileStyles = {
  // Button styles
  button: StyleSheet.create({
    base: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.md,
      ...shadows.sm,
    },
    primary: {
      backgroundColor: colors.primary[500],
    },
    secondary: {
      backgroundColor: colors.secondary[500],
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border.medium,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
    sm: {
      height: componentTokens.button.height.sm,
      paddingHorizontal: componentTokens.button.padding.sm.horizontal,
      paddingVertical: componentTokens.button.padding.sm.vertical,
    },
    md: {
      height: componentTokens.button.height.md,
      paddingHorizontal: componentTokens.button.padding.md.horizontal,
      paddingVertical: componentTokens.button.padding.md.vertical,
    },
    lg: {
      height: componentTokens.button.height.lg,
      paddingHorizontal: componentTokens.button.padding.lg.horizontal,
      paddingVertical: componentTokens.button.padding.lg.vertical,
    },
  }),
  
  // Card styles
  card: StyleSheet.create({
    base: {
      backgroundColor: colors.background.primary,
      borderRadius: componentTokens.card.borderRadius,
      borderWidth: componentTokens.card.borderWidth,
      borderColor: colors.border.light,
      padding: componentTokens.card.padding,
      ...shadows.md,
    },
    hover: {
      ...shadows.lg,
    },
  }),
  
  // Input styles
  input: StyleSheet.create({
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
    error: {
      borderColor: colors.error[500],
    },
  }),
  
  // Status badge styles
  statusBadge: StyleSheet.create({
    base: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: radius.full,
      borderWidth: 1,
    },
    planned: {
      backgroundColor: statusColors.planned.background,
      borderColor: statusColors.planned.border,
    },
    'in-progress': {
      backgroundColor: statusColors['in-progress'].background,
      borderColor: statusColors['in-progress'].border,
    },
    completed: {
      backgroundColor: statusColors.completed.background,
      borderColor: statusColors.completed.border,
    },
    cancelled: {
      backgroundColor: statusColors.cancelled.background,
      borderColor: statusColors.cancelled.border,
    },
  }),
  
  // Layout styles
  container: StyleSheet.create({
    base: {
      flex: 1,
      backgroundColor: colors.background.secondary,
    },
    section: {
      paddingVertical: spacing['2xl'],
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  
  // Typography styles
  text: StyleSheet.create({
    h1: {
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
      lineHeight: typography.lineHeight.tight * typography.fontSize['3xl'],
    },
    h2: {
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.bold,
      color: colors.text.primary,
      lineHeight: typography.lineHeight.tight * typography.fontSize['2xl'],
    },
    h3: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.semibold,
      color: colors.text.primary,
      lineHeight: typography.lineHeight.normal * typography.fontSize.lg,
    },
    body: {
      fontSize: typography.fontSize.sm,
      color: colors.text.primary,
      lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
    },
    secondary: {
      fontSize: typography.fontSize.sm,
      color: colors.text.secondary,
      lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
    },
    muted: {
      fontSize: typography.fontSize.sm,
      color: colors.text.tertiary,
      lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
    },
  }),
} as const;

// Status color helper
export const getStatusColor = (status: string) => {
  const statusMap: Record<string, keyof typeof createMobileStyles.statusBadge> = {
    'Planned': 'planned',
    'In Progress': 'in-progress',
    'Completed': 'completed',
    'Cancelled': 'cancelled',
  };
  return statusMap[status] || 'base';
};

// Status text color helper
export const getStatusTextColor = (status: string) => {
  const statusMap: Record<string, string> = {
    'Planned': statusColors.planned.text,
    'In Progress': statusColors['in-progress'].text,
    'Completed': statusColors.completed.text,
    'Cancelled': statusColors.cancelled.text,
  };
  return statusMap[status] || colors.text.primary;
};
