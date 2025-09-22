// Export all design tokens
export * from './colors';
export * from './spacing';
export * from './typography';
export * from './shadows';
export * from './radius';

// Status color mappings
export const statusColors = {
  planned: {
    background: '#eff6ff',
    text: '#1e40af',
    border: '#dbeafe',
  },
  'in-progress': {
    background: '#fffbeb',
    text: '#92400e',
    border: '#fef3c7',
  },
  completed: {
    background: '#f0fdf4',
    text: '#166534',
    border: '#dcfce7',
  },
  cancelled: {
    background: '#fef2f2',
    text: '#991b1b',
    border: '#fee2e2',
  },
} as const;

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
