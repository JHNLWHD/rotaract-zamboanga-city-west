/**
 * Cache configuration for React Query
 * Based on content update frequency patterns
 */

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

export const cacheConfig = {
  // Events and Projects (updated monthly)
  monthly: {
    staleTime: 12 * HOUR,
    gcTime: 24 * HOUR,
  },

  // Officers and Homepage content (updated yearly)
  yearly: {
    staleTime: 30 * DAY,
    gcTime: 90 * DAY,
  },
} as const;
