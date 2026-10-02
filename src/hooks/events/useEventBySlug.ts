import { useQuery } from '@tanstack/react-query';
import { eventBySlugQuery } from '../contentQueries';

export const useEventBySlug = (slug: string | undefined) => {
  return useQuery(eventBySlugQuery(slug));
};
