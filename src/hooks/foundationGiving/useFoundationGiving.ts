import { useQuery } from '@tanstack/react-query';
import { cacheConfig } from '@/config/cache';
import { fetchFoundationGiving } from './fetchFoundationGiving';

export function useFoundationGiving() {
  return useQuery({
    queryKey: ['foundation-giving'],
    queryFn: () => fetchFoundationGiving(),
    ...cacheConfig.yearly,
  });
}
