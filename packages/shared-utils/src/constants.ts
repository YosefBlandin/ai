/**
 * @fileoverview Centralized constants and static text for the application
 * This file contains all hardcoded text strings, making them easy to manage and translate in the future
 */

/**
 * Application-wide text constants
 * Organized by feature/component for easy maintenance
 */
export const APP_TEXT = {
  // Application titles and headers
  titles: {
    distributionOverview: 'Distribution Overview',
    distributionAnalytics: 'Distribution Analytics',
    distributionDetails: 'Distribution Details',
    aidDistributionDetails: 'Aid Distribution Details',
  },

  // Navigation and actions
  navigation: {
    backToDistributions: '← Back to Distributions',
    viewDetails: 'View Details',
    tryAgain: 'Try Again',
    refresh: 'Refresh',
    filters: 'Filters',
    done: 'Done',
    clearFilters: 'Clear Filters',
    goBackHome: 'Go back home',
  },

  // Form labels and fields
  labels: {
    region: 'Region',
    status: 'Status',
    date: 'Date',
    aidType: 'Aid Type',
    deliveryChannel: 'Delivery Channel',
    totalBeneficiaries: 'Total Beneficiaries',
    currentStatus: 'Current Status',
    basicInformation: 'Basic Information',
    statusInformation: 'Status Information',
    beneficiaries: 'Beneficiaries',
    actions: 'Actions',
  },

  // Loading and error messages
  loading: {
    distributions: 'Loading distributions...',
    distributionDetails: 'Loading distribution details...',
    charts: 'Loading charts...',
  },

  // Error messages
  errors: {
    generic: 'Error',
    loadingDistribution: 'Error Loading Distribution',
    distributionNotFound: 'Distribution Not Found',
    distributionNotFoundDescription:
      'The requested distribution could not be found.',
    networkError: 'Network request failed',
    tryAgain: 'Try Again',
    somethingWentWrong: 'Something went wrong',
    pageNotFound: 'Page not found',
  },

  // Empty states
  empty: {
    noDistributions: 'No distributions found.',
    noDistributionsFound: 'No distributions found',
  },

  // Status values
  status: {
    planned: 'Planned',
    inProgress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
  },

  // Region values
  regions: {
    all: 'All',
    westNile: 'West Nile',
    easternProvince: 'Eastern Province',
    northernRegion: 'Northern Region',
    centralRegion: 'Central Region',
    westernRegion: 'Western Region',
    southernRegion: 'Southern Region',
  },

  // Filter options
  filters: {
    allRegions: 'All Regions',
    allStatuses: 'All Statuses',
  },

  // Aid types
  aidTypes: {
    food: 'Food',
    medical: 'Medical',
    shelter: 'Shelter',
    clothing: 'Clothing',
    education: 'Education',
  },

  // Delivery channels
  deliveryChannels: {
    directDistribution: 'Direct Distribution',
    vouchers: 'Vouchers',
    cashTransfer: 'Cash Transfer',
    mobileMoney: 'Mobile Money',
  },

  // Chart labels
  charts: {
    statusDistribution: 'Status Distribution',
    timelineTrends: 'Timeline Trends',
    noData: 'No Data',
    aidTypeDistribution: 'Aid Type Distribution',
    beneficiariesTimeline: 'Beneficiaries Timeline',
  },

  // Statistics labels
  stats: {
    totalDistributions: 'Total Distributions',
    completed: 'Completed',
    totalBeneficiaries: 'Total Beneficiaries',
    beneficiaries: 'Beneficiaries',
  },

  // App branding
  branding: {
    appName: 'Aidonic',
  },

  // Aid type icons
  aidTypeIcons: {
    Food: '🍎',
    Medical: '🏥',
    Shelter: '🏠',
    Clothing: '👕',
    Education: '📚',
    default: '📦',
  },

  // Table headers
  table: {
    region: 'Region',
    date: 'Date',
    status: 'Status',
    beneficiaries: 'Beneficiaries',
    actions: 'Actions',
  },
} as const;

/**
 * Option arrays for dropdowns and filters
 * Centralized to prevent duplication across components
 */
export const OPTIONS = {
  regions: [
    { value: 'All', label: 'All Regions' },
    { value: 'West Nile', label: 'West Nile' },
    { value: 'Eastern Province', label: 'Eastern Province' },
    { value: 'Northern Region', label: 'Northern Region' },
    { value: 'Central Region', label: 'Central Region' },
    { value: 'Western Region', label: 'Western Region' },
    { value: 'Southern Region', label: 'Southern Region' },
  ],

  statuses: [
    { value: 'All', label: 'All Statuses' },
    { value: 'Planned', label: 'Planned' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Cancelled', label: 'Cancelled' },
  ],

  aidTypes: [
    { value: 'Food', label: 'Food' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Shelter', label: 'Shelter' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Education', label: 'Education' },
  ],

  deliveryChannels: [
    { value: 'Direct Distribution', label: 'Direct Distribution' },
    { value: 'Vouchers', label: 'Vouchers' },
    { value: 'Cash Transfer', label: 'Cash Transfer' },
    { value: 'Mobile Money', label: 'Mobile Money' },
  ],
} as const;

/**
 * Helper functions to get option arrays
 */
export const getRegionOptions = () => OPTIONS.regions;
export const getStatusOptions = () => OPTIONS.statuses;
export const getAidTypeOptions = () => OPTIONS.aidTypes;
export const getDeliveryChannelOptions = () => OPTIONS.deliveryChannels;

/**
 * Get icon for a specific aid type
 */
export const getAidTypeIcon = (aidType: string): string => {
  return (
    APP_TEXT.aidTypeIcons[aidType as keyof typeof APP_TEXT.aidTypeIcons] ||
    APP_TEXT.aidTypeIcons.default
  );
};

/**
 * Type definitions for better type safety
 */
export type AppTextKey = keyof typeof APP_TEXT;
export type RegionOption = (typeof OPTIONS.regions)[0];
export type StatusOption = (typeof OPTIONS.statuses)[0];
export type AidTypeOption = (typeof OPTIONS.aidTypes)[0];
export type DeliveryChannelOption = (typeof OPTIONS.deliveryChannels)[0];
