/**
 * @fileoverview Shared chart configuration utilities for consistent styling across platforms
 */

import { colors } from '@aidonic/shared-design-tokens';

/**
 * Chart color palette using design tokens
 */
export const CHART_COLORS = {
  primary: colors.primary[500],
  secondary: colors.secondary[500],
  success: colors.success[500],
  warning: colors.warning[500],
  error: colors.error[500],
  info: colors.primary[400],

  // Extended palette for multiple data series
  palette: [
    colors.primary[500], // Blue
    colors.success[500], // Green
    colors.warning[500], // Orange
    colors.error[500], // Red
    colors.secondary[500], // Gray
    colors.primary[400], // Light Blue
    colors.success[400], // Light Green
    colors.warning[400], // Light Orange
  ],
} as const;

/**
 * Chart theme configuration
 */
export interface ChartTheme {
  backgroundColor: string;
  textColor: string;
  gridColor: string;
  tooltipBackground: string;
  tooltipBorder: string;
  tooltipText: string;
}

/**
 * Light theme configuration using design tokens
 */
export const LIGHT_THEME: ChartTheme = {
  backgroundColor: colors.background.primary,
  textColor: colors.text.primary,
  gridColor: colors.border.light,
  tooltipBackground: colors.neutral[800],
  tooltipBorder: colors.neutral[600],
  tooltipText: colors.text.inverse,
} as const;

/**
 * Chart dimensions configuration
 */
export interface ChartDimensions {
  width: number;
  height: number;
}

/**
 * Standard chart dimensions
 */
export const CHART_DIMENSIONS = {
  small: { width: 300, height: 200 },
  medium: { width: 400, height: 300 },
  large: { width: 600, height: 400 },
  responsive: { width: '100%', height: 320 },
} as const;

/**
 * Chart configuration factory for creating platform-specific chart configs
 */
export class ChartConfigFactory {
  /**
   * Create web chart configuration using Recharts
   */
  static createWebConfig(theme: ChartTheme = LIGHT_THEME) {
    return {
      colors: CHART_COLORS.palette,
      theme,
      dimensions: CHART_DIMENSIONS.responsive,
      tooltip: {
        backgroundColor: theme.tooltipBackground,
        border: `1px solid ${theme.tooltipBorder}`,
        borderRadius: '8px',
        color: theme.tooltipText,
      },
      grid: {
        strokeDasharray: '3 3',
        stroke: theme.gridColor,
      },
      axis: {
        tickColor: theme.textColor,
        tickLineColor: theme.gridColor,
        fontSize: 12,
      },
    };
  }

  /**
   * Create mobile chart configuration using react-native-chart-kit
   */
  static createMobileConfig(theme: ChartTheme = LIGHT_THEME) {
    return {
      backgroundColor: theme.backgroundColor,
      backgroundGradientFrom: theme.backgroundColor,
      backgroundGradientTo: theme.backgroundColor,
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(17, 24, 39, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: CHART_COLORS.primary,
      },
    };
  }

  /**
   * Create pie chart data with consistent colors for web (Recharts)
   */
  static createPieData<T extends { name: string; value: number }>(
    data: T[],
    _theme: ChartTheme = LIGHT_THEME
  ) {
    return data.map((item, index) => ({
      ...item,
      color: CHART_COLORS.palette[index % CHART_COLORS.palette.length],
    }));
  }

  /**
   * Create pie chart data with consistent colors for mobile (react-native-chart-kit)
   */
  static createMobilePieData<T extends { name: string; value: number }>(
    data: T[],
    theme: ChartTheme = LIGHT_THEME
  ) {
    // Validate and clean data
    const cleanData = data.filter(
      item =>
        item &&
        typeof item.value === 'number' &&
        !isNaN(item.value) &&
        isFinite(item.value) &&
        item.value >= 0
    );

    return cleanData.map((item, index) => ({
      name: item.name,
      population: item.value, // react-native-chart-kit uses 'population' key
      color: CHART_COLORS.palette[index % CHART_COLORS.palette.length],
      legendFontColor: theme.textColor,
      legendFontSize: 12,
    }));
  }

  /**
   * Create line chart data configuration
   */
  static createLineData<T extends { [key: string]: unknown }>(
    data: T[],
    dataKey: string,
    labelKey: string,
    _theme: ChartTheme = LIGHT_THEME
  ) {
    // Validate and clean data
    const cleanData = data.filter(
      item =>
        item &&
        typeof item[dataKey] === 'number' &&
        !isNaN(item[dataKey]) &&
        isFinite(item[dataKey]) &&
        item[dataKey] >= 0
    );

    return {
      labels: cleanData.map(item => item[labelKey]),
      datasets: [
        {
          data: cleanData.map(item => item[dataKey]),
          strokeWidth: 2,
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
        },
      ],
    };
  }
}

/**
 * Chart data transformer utilities for consistent data processing
 */
export class ChartDataTransformer {
  /**
   * Transform status data for pie charts
   */
  static transformStatusData(data: Array<{ status: string; count: number }>) {
    return data.map(item => ({
      name: item.status || 'Unknown',
      value: item.count,
    }));
  }

  /**
   * Transform timeline data for line charts
   */
  static transformTimelineData(data: Array<{ date: string; count: number }>) {
    return data.map(item => ({
      month: new Date(item.date).toLocaleDateString('en-US', {
        month: 'short',
      }),
      beneficiaries: item.count,
    }));
  }

  /**
   * Transform aid type data for pie charts
   */
  static transformAidTypeData(data: Array<{ name: string; value: number }>) {
    return data.map(item => ({
      name: item.name || 'Unknown',
      value: item.value,
    }));
  }
}
