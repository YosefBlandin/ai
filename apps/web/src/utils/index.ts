// Re-export shared utilities and add web-specific utilities
export * from '@aidonic/shared-utils';

// Web-specific utility functions
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Web-specific status color classes for Tailwind
export const getStatusColorClass = (status: string): string => {
  const colors = {
    'Planned': 'bg-blue-100 text-blue-800 border-blue-200',
    'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Completed': 'bg-green-100 text-green-800 border-green-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
};
