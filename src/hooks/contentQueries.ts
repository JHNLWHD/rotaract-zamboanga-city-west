import { cacheConfig } from '../config/cache';
import {
  fetchProjects,
  fetchProjectBySlug,
  type ProjectListItem,
} from './projects/fetchProjects';
import { fetchEvents, fetchEventBySlug } from './events/fetchEvents';
import { fetchHeroContent } from './landing-page/heroSection';
import { fetchAboutCommunity } from './landing-page/aboutCommunity';
import {
  fetchAllAwards,
  type HomepageAwardsSection,
} from './landing-page/awardsSection';
import {
  fetchAllOfficers,
  fetchOfficers,
  fetchPastPresidents,
  type Officer,
} from './officers/fetchOfficers';
import {
  fetchFoundationGiving,
  type FoundationGivingData,
} from './foundationGiving/fetchFoundationGiving';

export const heroContentQuery = {
  queryKey: ['heroContent'],
  queryFn: () => fetchHeroContent(),
  ...cacheConfig.yearly,
};

export const aboutContentQuery = {
  queryKey: ['aboutContent'],
  queryFn: () => fetchAboutCommunity(),
  ...cacheConfig.yearly,
};

export const projectsQuery = {
  queryKey: ['projects'],
  queryFn: () => fetchProjects(),
  ...cacheConfig.monthly,
};

export const eventsQuery = {
  queryKey: ['events'],
  queryFn: () => fetchEvents(),
  ...cacheConfig.monthly,
};

export const recognitionQuery = {
  queryKey: ['recognition'],
  queryFn: () => fetchAllAwards(),
  ...cacheConfig.yearly,
};

export const projectBySlugQuery = (slug: string | undefined) => ({
  queryKey: ['project', slug],
  queryFn: async () => {
    if (!slug) throw new Error('Slug is required');
    return fetchProjectBySlug(slug);
  },
  enabled: !!slug,
  staleTime: 5 * 60 * 1000,
  retry: 1,
});

export const eventBySlugQuery = (slug: string | undefined) => ({
  queryKey: ['event', slug],
  queryFn: async () => {
    if (!slug) throw new Error('Slug is required');
    return fetchEventBySlug(slug);
  },
  enabled: !!slug,
  staleTime: 5 * 60 * 1000,
  retry: 1,
});

export const officersQuery = (term?: string) => ({
  queryKey: ['officers', term],
  queryFn: () => fetchAllOfficers(term),
  staleTime: 10 * 60 * 1000,
  retry: 1,
});

export const pastPresidentsQuery = {
  queryKey: ['pastPresidents'],
  queryFn: () => fetchPastPresidents(),
  staleTime: 10 * 60 * 1000,
  retry: 1,
};

export const foundationGivingQuery = {
  queryKey: ['foundation-giving'],
  queryFn: () => fetchFoundationGiving(),
  ...cacheConfig.yearly,
};

type HomepageEvidence = {
  projects: ProjectListItem[] | null;
  recognition: HomepageAwardsSection | null;
  officers: Pick<
    Officer,
    | 'id'
    | 'name'
    | 'position'
    | 'term'
    | 'category'
    | 'profileImage'
    | 'displayOrder'
  >[];
  foundation: FoundationGivingData | null;
};

export const assembleHomepageEvidence = (records: HomepageEvidence) => ({
  ...records,
  // The list fetcher filters deployed routes before selecting these records.
  projects: records.projects?.slice(0, 3) ?? null,
});

export const homepageEvidenceQuery = (term: string) => ({
  queryKey: ['homepageEvidence', term],
  queryFn: async () => {
    const [projects, recognition, officers, foundation] = await Promise.all([
      projectsQuery.queryFn(),
      recognitionQuery.queryFn(),
      fetchOfficers(term),
      foundationGivingQuery.queryFn(),
    ]);
    return assembleHomepageEvidence({
      projects,
      recognition,
      officers,
      foundation,
    });
  },
  ...cacheConfig.monthly,
});
