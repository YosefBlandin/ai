/**
 * API Configuration for different environments
 * Handles the differences between web and mobile environments
 */

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

// Common IP addresses to try for mobile development
const MOBILE_IP_CANDIDATES = [
  '192.168.100.7',  // Current detected IP
  '192.168.1.100',  // Common home router range
  '192.168.0.100',  // Common home router range
  '10.0.0.100',     // Common office network range
  '172.16.0.100',   // Common office network range
];

/**
 * Get the appropriate API configuration based on the environment
 */
export function getApiConfig(): ApiConfig {
  // Check if we're in a React Native environment
  const isReactNative = typeof navigator !== 'undefined' && 
    navigator.product === 'ReactNative';

  // Check if we're in a web environment
  const isWeb = typeof window !== 'undefined' && typeof document !== 'undefined';

  if (isReactNative) {
    // For React Native, try to use the first available IP
    // In a real app, you might want to implement IP discovery
    const mobileIP = MOBILE_IP_CANDIDATES[0];
    
    return {
      baseUrl: `http://${mobileIP}:3001`,
      timeout: 10000
    };
  }

  if (isWeb) {
    // For web, localhost works fine
    return {
      baseUrl: 'http://localhost:3001',
      timeout: 10000
    };
  }

  // Fallback for Node.js environments (testing, etc.)
  return {
    baseUrl: 'http://localhost:3001',
    timeout: 10000
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
