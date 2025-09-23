/**
 * Centralized data formatting utilities to eliminate duplication across components
 * This is the single source of truth for all data formatting in the application
 */

// Date formatting options
export type DateFormat =
  | 'short'
  | 'long'
  | 'time'
  | 'datetime'
  | 'iso'
  | 'relative';

// Currency formatting options
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'UGX' | 'KES' | 'TZS';

// Number formatting options
export type NumberFormat = 'integer' | 'decimal' | 'percentage' | 'compact';

/**
 * Format a date string into various display formats
 * @param dateString - The date string to format
 * @param format - The desired format type
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  format: DateFormat = 'short',
  locale: string = 'en-US'
): string => {
  const date = new Date(dateString);

  // Validate date
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const options: Intl.DateTimeFormatOptions = {};

  switch (format) {
    case 'short':
      options.year = 'numeric';
      options.month = 'short';
      options.day = 'numeric';
      break;
    case 'long':
      options.year = 'numeric';
      options.month = 'long';
      options.day = 'numeric';
      break;
    case 'time':
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'datetime':
      options.year = 'numeric';
      options.month = 'short';
      options.day = 'numeric';
      options.hour = '2-digit';
      options.minute = '2-digit';
      break;
    case 'iso':
      return date.toISOString();
    case 'relative':
      return getRelativeDate(date);
    default:
      options.year = 'numeric';
      options.month = 'short';
      options.day = 'numeric';
  }

  return date.toLocaleDateString(locale, options);
};

/**
 * Format a date and time string
 * @param dateString - The date string to format
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted date and time string
 */
export const formatDateTime = (
  dateString: string,
  locale: string = 'en-US'
): string => {
  return formatDate(dateString, 'datetime', locale);
};

/**
 * Format a number with various display options
 * @param num - The number to format
 * @param format - The desired format type
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted number string
 */
export const formatNumber = (
  num: number,
  format: NumberFormat = 'integer',
  locale: string = 'en-US'
): string => {
  if (isNaN(num)) {
    return '0';
  }

  const options: Intl.NumberFormatOptions = {};

  switch (format) {
    case 'integer':
      options.maximumFractionDigits = 0;
      break;
    case 'decimal':
      options.minimumFractionDigits = 2;
      options.maximumFractionDigits = 2;
      break;
    case 'percentage':
      options.style = 'percent';
      options.minimumFractionDigits = 1;
      options.maximumFractionDigits = 1;
      break;
    case 'compact':
      options.notation = 'compact';
      break;
    default:
      options.maximumFractionDigits = 0;
  }

  return new Intl.NumberFormat(locale, options).format(num);
};

/**
 * Format a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (defaults to 'USD')
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: CurrencyCode = 'USD',
  locale: string = 'en-US'
): string => {
  if (isNaN(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format a number with thousand separators (legacy function for backward compatibility)
 * @param num - The number to format
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted number string with thousand separators
 */
export const formatNumberWithSeparators = (
  num: number,
  locale: string = 'en-US'
): string => {
  return formatNumber(num, 'integer', locale);
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 * @param date - The date to compare against
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Relative time string
 */
export const getRelativeDate = (
  date: Date,
  _locale: string = 'en-US'
): string => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
};

/**
 * Format a file size in bytes to human readable format
 * @param bytes - The size in bytes
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted file size string
 */
export const formatFileSize = (
  bytes: number,
  _locale: string = 'en-US'
): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

/**
 * Format a phone number
 * @param phoneNumber - The phone number string
 * @param locale - The locale for formatting (defaults to 'en-US')
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (
  phoneNumber: string,
  _locale: string = 'en-US'
): string => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phoneNumber; // Return original if format is not recognized
};

/**
 * Validate if a string is a valid date
 * @param dateString - The date string to validate
 * @returns True if the string is a valid date
 */
export const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

/**
 * Validate if a string is a valid number
 * @param value - The value to validate
 * @returns True if the value is a valid number
 */
export const isValidNumber = (value: string | number): boolean => {
  return !isNaN(Number(value));
};
