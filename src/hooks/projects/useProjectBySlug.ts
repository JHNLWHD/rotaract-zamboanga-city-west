import { useQuery } from '@tanstack/react-query';
import { projectBySlugQuery } from '../contentQueries';

export const useProjectBySlug = (slug: string | undefined) => {
  return useQuery(projectBySlugQuery(slug));
};
