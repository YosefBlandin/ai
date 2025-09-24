/**
 * @fileoverview Base service class for mobile
 */

export abstract class BaseService {
  /**
   * Handle API errors consistently
   */
  protected handleError(error: unknown, context: string): never {
    // Error logging can be implemented here
    // console.error(`Error in ${context}:`, error);
    throw new Error(
      error instanceof Error
        ? error.message
        : `Failed to ${context.toLowerCase()}`
    );
  }

  /**
   * Execute API call with error handling
   */
  protected async executeApiCall<T>(
    apiCall: () => Promise<T>,
    context: string
  ): Promise<T> {
    try {
      return await apiCall();
    } catch (error) {
      this.handleError(error, context);
    }
  }

  /**
   * Transform data consistently
   */
  protected transformData<T, R>(data: T, transformer: (item: T) => R): R {
    return transformer(data);
  }

  /**
   * Validate required parameters
   */
  protected validateRequired(value: unknown, paramName: string): void {
    if (value === null || value === undefined || value === '') {
      throw new Error(`${paramName} is required`);
    }
  }
}
