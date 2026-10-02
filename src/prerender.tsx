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
  projectsQuery,
  projectBySlugQuery,
  eventsQuery,
  eventBySlugQuery,
  recognitionQuery,
  heroContentQuery,
  aboutContentQuery,
  officersQuery,
  pastPresidentsQuery,
  foundationGivingQuery,
  homepageEvidenceQuery,
  assembleHomepageEvidence,
} from './hooks/contentQueries';
import { type Officer } from './hooks/officers/fetchOfficers';
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
  const rosterQuery = officersQuery(term);
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
    projectsQuery.queryFn(),
    eventsQuery.queryFn(),
    recognitionQuery.queryFn(),
    heroContentQuery.queryFn(),
    aboutContentQuery.queryFn(),
    rosterQuery.queryFn(),
    pastPresidentsQuery.queryFn(),
    foundationGivingQuery.queryFn(),
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
        [heroContentQuery.queryKey, hero],
        [aboutContentQuery.queryKey, about],
        [
          homepageEvidenceQuery(term).queryKey,
          assembleHomepageEvidence({
            projects,
            recognition,
            foundation,
            officers: [
              ...officers.executive,
              ...officers.directors,
              ...officers.advisors,
            ],
          }),
        ],
      ],
    },
    { path: '/projects', queries: [[projectsQuery.queryKey, projects]] },
    { path: '/events', queries: [[eventsQuery.queryKey, events]] },
    {
      path: '/recognition',
      queries: [[recognitionQuery.queryKey, recognition]],
    },
    {
      path: '/officers',
      queries: [
        [rosterQuery.queryKey, officers],
        [pastPresidentsQuery.queryKey, presidents],
      ],
    },
    {
      path: '/foundation-giving',
      queries: [[foundationGivingQuery.queryKey, foundation]],
    },
  ];

  for (const project of projects) {
    const record = await projectBySlugQuery(project.slug).queryFn();
    if (!record)
      throw new Error(`Project disappeared during build: ${project.slug}`);
    pages.push({
      path: `/projects/${record.slug}`,
      lastmod: record.updatedAt,
      queries: [[projectBySlugQuery(record.slug).queryKey, record]],
    });
  }
  for (const event of events) {
    pages.push({
      path: `/events/${event.date.slice(0, 10)}/${event.slug}`,
      lastmod: event.updatedAt,
      queries: [[eventBySlugQuery(event.slug).queryKey, event]],
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
