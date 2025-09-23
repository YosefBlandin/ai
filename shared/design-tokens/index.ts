// Export all design tokens
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
export * from './radius';

// Status color mappings moved to @aidonic/shared-utils/colorUtils
// Use getStatusColorSet() for comprehensive color access

// Component-specific tokens
export const componentTokens = {
  button: {
    height: {
      sm: 32,
      md: 40,
      lg: 48,
    },
    padding: {
      sm: { horizontal: 12, vertical: 6 },
      md: { horizontal: 16, vertical: 8 },
      lg: { horizontal: 20, vertical: 12 },
    },
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  input: {
    height: 40,
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
  },
} as const;
