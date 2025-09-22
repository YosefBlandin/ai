import { DistributionStatus, AidType, DeliveryChannel } from '@aidonic/shared-types';

// Date formatting utilities
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Number formatting utilities
export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

// Status utilities
export const getStatusColor = (status: DistributionStatus): string => {
  const statusColors = {
    'Planned': 'blue',
    'In Progress': 'yellow',
    'Completed': 'green',
    'Cancelled': 'red'
  };
  return statusColors[status] || 'gray';
};

export const getStatusTextColor = (status: DistributionStatus): string => {
  const textColors = {
    'Planned': '#1d4ed8',
    'In Progress': '#d97706',
    'Completed': '#16a34a',
    'Cancelled': '#dc2626'
  };
  return textColors[status] || '#6b7280';
};

// Aid type utilities
export const getAidTypeIcon = (aidType: AidType): string => {
  const iconMap = {
    'Food': 'apple',
    'Medical': 'heart',
    'Shelter': 'home',
    'Clothing': 'shirt',
    'Education': 'book'
  };
  return iconMap[aidType] || 'package';
};

export const getDeliveryChannelIcon = (channel: DeliveryChannel): string => {
  const iconMap = {
    'Direct Distribution': 'truck',
    'Vouchers': 'credit-card',
    'Cash Transfer': 'smartphone',
    'Mobile Money': 'smartphone'
  };
  return iconMap[channel] || 'package';
};

// Validation utilities
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// Array utilities
export const groupBy = <T, K extends keyof T>(array: T[], key: K): Record<string, T[]> => {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
};

export const sortBy = <T>(array: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];
    
    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};

// String utilities
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};