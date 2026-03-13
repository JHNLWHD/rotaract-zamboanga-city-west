import { useQuery } from '@tanstack/react-query';
import { fetchProjectBySlug, type Project } from './fetchProjects';

export const useProjectBySlug = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      if (!slug) {
        throw new Error('Slug is required');
      }
      const project = await fetchProjectBySlug(slug);
      if (!project) {
        throw new Error('Project not found');
      }
      return project;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
