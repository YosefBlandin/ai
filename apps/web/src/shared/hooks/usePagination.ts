'use client';

/**
 * @fileoverview Shared pagination hook for common pagination patterns
 */

import { useState, useCallback } from 'react';

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface UsePaginationOptions {
  initialPage?: number;
  itemsPerPage?: number;
}

export function usePagination(
  totalItems: number,
  options: UsePaginationOptions = {}
) {
  const { initialPage = 1, itemsPerPage = 10 } = options;

  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: initialPage,
    totalPages: Math.ceil(totalItems / itemsPerPage),
    totalItems,
    itemsPerPage,
  });

  const changePage = useCallback((page: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: Math.max(1, Math.min(page, prev.totalPages)),
    }));
  }, []);

  const updateTotalItems = useCallback((total: number) => {
    setPagination(prev => ({
      ...prev,
      totalItems: total,
      totalPages: Math.ceil(total / prev.itemsPerPage),
    }));
  }, []);

  const reset = useCallback(() => {
    setPagination(prev => ({
      ...prev,
      currentPage: 1,
    }));
  }, []);

  return {
    pagination,
    changePage,
    updateTotalItems,
    reset,
  };
}
