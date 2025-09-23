// Re-export shared utilities and add web-specific utilities
export * from '@aidonic/shared-utils';

// Web-specific utility functions
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ');
};

// Web-specific status color classes for Tailwind
// Note: getStatusColorClass is now available from @aidonic/shared-utils
