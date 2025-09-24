/**
 * API Configuration for different environments
 * Handles the differences between web and mobile environments
 */

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  useMockData?: boolean;
}

/**
 * Get the appropriate API configuration based on the environment
 */
export function getApiConfig(): ApiConfig {
  // Check if we're in a React Native environment
  const isReactNative =
    typeof navigator !== 'undefined' &&
    (navigator as unknown as { product: string }).product === 'ReactNative';

  // Check if we're in a web environment
  const isWeb =
    typeof window !== 'undefined' && typeof document !== 'undefined';

  if (isReactNative) {
    // For React Native, use mock data to avoid network issues with Expo tunnel
    // In production, you would use a real API endpoint
    return {
      baseUrl: 'http://localhost:3001', // Not used when useMockData is true
      timeout: 10000,
      useMockData: true,
    };
  }

  if (isWeb) {
    // For web, use mock data for consistency with mobile
    // In production, you would use a real API endpoint
    return {
      baseUrl: 'http://localhost:3001', // Not used when useMockData is true
      timeout: 10000,
      useMockData: true,
    };
  }

  // Fallback for Node.js environments (testing, etc.)
  return {
    baseUrl: 'http://localhost:3001',
    timeout: 10000,
  };
}

/**
 * Get the API base URL
 */
export function getApiBaseUrl(): string {
  return getApiConfig().baseUrl;
}

/**
 * Get the API timeout
 */
export function getApiTimeout(): number {
  return getApiConfig().timeout;
}
