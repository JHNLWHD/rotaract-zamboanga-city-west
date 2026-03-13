import { useQuery } from '@tanstack/react-query';
import { fetchEventBySlug, type Event } from './fetchEvents';

export const useEventBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['event', slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error('Slug is required');
      }
      const event = await fetchEventBySlug(slug);
      if (!event) {
        throw new Error('Event not found');
      }
      return event;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
