import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Helmet } from 'react-helmet';
import {
  dehydrate,
  QueryClient,
  QueryClientProvider,
  type QueryKey,
} from '@tanstack/react-query';
import { AppContent } from './App';
import {
  fetchProjects,
  fetchProjectBySlug,
} from './hooks/projects/fetchProjects';
import { fetchEvents } from './hooks/events/fetchEvents';
import { fetchAllAwards } from './hooks/landing-page/awardsSection';
import { fetchHeroContent } from './hooks/landing-page/heroSection';
import { fetchAboutCommunity } from './hooks/landing-page/aboutCommunity';
import {
  fetchAllOfficers,
  fetchPastPresidents,
  type Officer,
} from './hooks/officers/fetchOfficers';
import { fetchFoundationGiving } from './hooks/foundationGiving/fetchFoundationGiving';
import { getCurrentTerm } from './data/officers';
import { serializeJson } from './utils/seo';
import { RenderTimeContext } from './hooks/useRenderTime';

export type Page = {
  path: string;
  queries: [QueryKey, unknown][];
  lastmod?: string;
};

// Only fields rendered by the public directory belong in the HTML snapshot.
const publicOfficer = ({
  id,
  name,
  position,
  term,
  category,
  profileImage,
  displayOrder,
}: Officer) => ({
  id,
  name,
  position,
  term,
  category,
  profileImage,
  displayOrder,
});

export async function loadPages(): Promise<Page[]> {
  const term = getCurrentTerm();
  const [
    projects,
    events,
    recognition,
    hero,
    about,
    roster,
    presidents,
    foundation,
  ] = await Promise.all([
    fetchProjects(),
    fetchEvents(),
    fetchAllAwards(),
    fetchHeroContent(),
    fetchAboutCommunity(),
    fetchAllOfficers(term),
    fetchPastPresidents(),
    fetchFoundationGiving(),
  ]);
  if (!projects || !events || !recognition || !hero || !about || !foundation) {
    throw new Error(
      'Required Contentful records are unavailable; refusing an incomplete build.'
    );
  }
  const officers = {
    executive: roster.executive.map(publicOfficer),
    directors: roster.directors.map(publicOfficer),
    advisors: roster.advisors.map(publicOfficer),
  };
  const pages: Page[] = [
    {
      path: '/',
      queries: [
        [['heroContent'], hero],
        [['aboutContent'], about],
        [
          ['homepageEvidence', term],
          {
            projects: projects.slice(0, 3),
            recognition,
            foundation,
            officers: [
              ...officers.executive,
              ...officers.directors,
              ...officers.advisors,
            ],
          },
        ],
      ],
    },
    { path: '/projects', queries: [[['projects'], projects]] },
    { path: '/events', queries: [[['events'], events]] },
    { path: '/recognition', queries: [[['recognition'], recognition]] },
    {
      path: '/officers',
      queries: [
        [['officers', term], officers],
        [['pastPresidents'], presidents],
      ],
    },
    {
      path: '/foundation-giving',
      queries: [[['foundation-giving'], foundation]],
    },
  ];

  for (const project of projects) {
    const record = await fetchProjectBySlug(project.slug);
    if (!record)
      throw new Error(`Project disappeared during build: ${project.slug}`);
    pages.push({
      path: `/projects/${record.slug}`,
      lastmod: record.updatedAt,
      queries: [[['project', record.slug], record]],
    });
  }
  for (const event of events) {
    pages.push({
      path: `/events/${event.date.slice(0, 10)}/${event.slug}`,
      lastmod: event.updatedAt,
      queries: [[['event', event.slug], event]],
    });
  }
  return pages;
}

export function renderPage(page: Page, routes?: string[]) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: Infinity } },
  });
  // Keep the snapshot visible while the browser refreshes published CMS data.
  for (const [key, data] of page.queries)
    client.setQueryData(key, data, { updatedAt: 0 });
  const renderedAt = Date.now();
  Helmet.canUseDOM = false;
  try {
    const body = renderToString(
      <RenderTimeContext.Provider value={renderedAt}>
        <QueryClientProvider client={client}>
          <StaticRouter location={page.path}>
            <AppContent />
          </StaticRouter>
        </QueryClientProvider>
      </RenderTimeContext.Provider>
    );
    const head = Helmet.renderStatic();
    if (
      client
        .getQueryCache()
        .getAll()
        .some(query => query.state.status !== 'success')
    ) {
      throw new Error(`Unresolved page data: ${page.path}`);
    }
    return {
      body,
      head:
        head.title.toString() +
        head.meta.toString() +
        head.link.toString() +
        head.script.toString(),
      state: serializeJson({ ...dehydrate(client), renderedAt, routes }),
    };
  } finally {
    Helmet.renderStatic();
    Helmet.canUseDOM = typeof window !== 'undefined';
    client.clear();
  }
}
