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
    // Browser timers cannot safely schedule beyond roughly 24.8 days.
    staleTime: 24 * DAY,
    gcTime: Infinity,
  },
} as const;
