import { beforeEach, expect, it, vi } from 'vitest';
import { Helmet } from 'react-helmet';
import { render, screen, waitFor } from '@testing-library/react';
import {
  hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from './App';
import { RenderTimeContext } from './hooks/useRenderTime';
vi.mock('./components/ui/sonner', () => ({ Toaster: () => null }));
const cms = vi.hoisted(() => ({
  fetchProjects: vi.fn(),
  fetchProjectBySlug: vi.fn(),
  fetchEvents: vi.fn(),
  fetchAllAwards: vi.fn(),
  fetchHeroContent: vi.fn(),
  fetchAboutCommunity: vi.fn(),
  fetchOfficers: vi.fn(),
  fetchAllOfficers: vi.fn(),
  fetchPastPresidents: vi.fn(),
  fetchFoundationGiving: vi.fn(),
}));
vi.mock('./hooks/projects/fetchProjects', () => ({
  fetchProjects: cms.fetchProjects,
  fetchProjectBySlug: cms.fetchProjectBySlug,
}));
vi.mock('./hooks/events/fetchEvents', () => ({ fetchEvents: cms.fetchEvents }));
vi.mock('./hooks/landing-page/awardsSection', () => ({
  fetchAllAwards: cms.fetchAllAwards,
}));
vi.mock('./hooks/landing-page/heroSection', () => ({
  fetchHeroContent: cms.fetchHeroContent,
}));
vi.mock('./hooks/landing-page/aboutCommunity', () => ({
  fetchAboutCommunity: cms.fetchAboutCommunity,
}));
vi.mock('./hooks/officers/fetchOfficers', () => ({
  fetchOfficers: cms.fetchOfficers,
  fetchAllOfficers: cms.fetchAllOfficers,
  fetchPastPresidents: cms.fetchPastPresidents,
}));
vi.mock('./hooks/foundationGiving/fetchFoundationGiving', () => ({
  fetchFoundationGiving: cms.fetchFoundationGiving,
}));
import { loadPages, renderPage } from './prerender';

const project = {
  id: 'p1',
  slug: 'service-day',
  title: 'Service day',
  shortDescription: 'Local volunteers worked together.',
  date: '2026-07-10T00:00:00+08:00',
  updatedAt: '2026-08-10T01:00:00Z',
  description: 'A factual project report.',
  venue: 'Zamboanga City',
  impact: '',
  category: 'Service',
  partners: [],
  gallery: [],
  highlights: [],
  image: 'https://images.test/project.jpg',
};
const event = {
  id: 'e1',
  slug: 'induction',
  title: 'Induction',
  description: 'The annual ceremony.',
  date: '2026-08-01T00:00:00+08:00',
  time: '6:00 PM',
  venue: 'Zamboanga City',
  updatedAt: '2026-08-02T01:00:00Z',
  status: 'past',
  category: 'Ceremony',
  image: 'https://images.test/event.jpg',
  highlights: [],
  gallery: [],
  agenda: [],
  requirements: [],
};

beforeEach(() => {
  Object.values(cms).forEach(mock => mock.mockReset());
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  cms.fetchProjects.mockResolvedValue([project]);
  cms.fetchProjectBySlug.mockResolvedValue(project);
  cms.fetchEvents.mockResolvedValue([event]);
  cms.fetchAllAwards.mockResolvedValue({ awards: [] });
  cms.fetchHeroContent.mockResolvedValue({
    subTitle: 'Local service.',
    stats: [],
  });
  cms.fetchAboutCommunity.mockResolvedValue({
    ourStory: 'Our club history.',
    stats: [],
  });
  cms.fetchAllOfficers.mockResolvedValue({
    executive: [
      {
        id: 'o1',
        name: 'President Name',
        position: 'President',
        term: '2026-2027',
        category: 'Executive',
        displayOrder: 1,
        email: 'private@example.test',
        phone: 'private-phone',
      },
    ],
    directors: [],
    advisors: [],
  });
  cms.fetchPastPresidents.mockResolvedValue([]);
  cms.fetchFoundationGiving.mockResolvedValue({
    reportTitle: 'Club giving',
    subtitle: '',
    currencyLabel: 'USD',
    asOfDate: '2026-04-10',
    rows: [],
    faq: { annualFund: '', polioPlus: '', other: '', endowment: '' },
  });
});

it('renders the actual public routes with content, metadata and safe query snapshots', async () => {
  const pages = await loadPages();
  expect(pages.map(page => page.path)).toEqual([
    '/',
    '/projects',
    '/events',
    '/recognition',
    '/officers',
    '/foundation-giving',
    '/projects/service-day',
    '/events/2026-08-01/induction',
  ]);
  const routes = pages.map(page => page.path);
  for (const page of pages) {
    const rendered = renderPage(page, routes);
    const doc = new DOMParser().parseFromString(
      `<html><head>${rendered.head}</head><body>${rendered.body}</body></html>`,
      'text/html'
    );
    expect(doc.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(doc.querySelector('h1')?.textContent).toBeTruthy();
    expect(
      doc.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(`https://rotaract.rotaryzcwest.org${page.path}`);
    expect(rendered.body).not.toMatch(/Loading .*records?/);
    expect(rendered.state).not.toMatch(/private@example|private-phone/);
    const state = JSON.parse(rendered.state);
    expect(state.routes).toEqual(routes);
    expect(state.queries.length).toBeGreaterThan(0);
    expect(state.queries.every(query => query.state.dataUpdatedAt === 0)).toBe(
      true
    );
  }
  const detail = pages.find(
    page => page.path === '/events/2026-08-01/induction'
  )!;
  expect(renderPage(detail).head).toContain('2026-08-01T18:00:00+08:00');
  expect(detail.lastmod).toBe(event.updatedAt);
  expect(
    JSON.parse(renderPage({ path: '/404', queries: [] }, routes).state).routes
  ).toEqual(routes);
});

it.each([
  ['/', 'Service day'],
  ['/events', 'Induction'],
  ['/projects', 'Service day'],
  ['/recognition', 'No recognition records have been published yet.'],
  ['/officers', 'President Name'],
  ['/foundation-giving', 'Club giving'],
])(
  'keeps the hydrated %s snapshot visible when its refresh fails',
  async (path, visibleRecord) => {
    const pages = await loadPages();
    const page = pages.find(page => page.path === path)!;
    const rendered = renderPage(page);
    const state = JSON.parse(rendered.state);
    const client = new QueryClient({
      defaultOptions: {
        queries: { retry: false, retryDelay: 0, gcTime: Infinity },
      },
    });
    hydrate(client, state);
    Object.values(cms).forEach(mock =>
      mock.mockRejectedValue(new Error('CMS temporarily unavailable'))
    );
    const container = document.createElement('div');
    container.innerHTML = rendered.body;
    document.body.appendChild(container);

    const { unmount } = render(
      <RenderTimeContext.Provider value={state.renderedAt}>
        <QueryClientProvider client={client}>
          <MemoryRouter initialEntries={[path]}>
            <AppContent />
          </MemoryRouter>
        </QueryClientProvider>
      </RenderTimeContext.Provider>,
      { container, hydrate: true }
    );

    try {
      await waitFor(() => {
        for (const [key, data] of page.queries) {
          expect(client.getQueryState(key)?.status).toBe('error');
          expect(client.getQueryData(key)).toEqual(data);
        }
      });
      expect(screen.getByText(visibleRecord)).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    } finally {
      unmount();
      client.clear();
    }
  }
);

it.each([
  'fetchProjects',
  'fetchEvents',
  'fetchAllAwards',
  'fetchHeroContent',
  'fetchAboutCommunity',
  'fetchFoundationGiving',
] as const)('fails closed when %s cannot provide published data', async key => {
  cms[key].mockResolvedValue(null);
  await expect(loadPages()).rejects.toThrow('refusing an incomplete build');
});

it('fails if a listed project disappears or a CMS request fails', async () => {
  cms.fetchProjectBySlug.mockResolvedValue(null);
  await expect(loadPages()).rejects.toThrow('Project disappeared');
  cms.fetchEvents.mockRejectedValue(new Error('CMS offline'));
  await expect(loadPages()).rejects.toThrow('CMS offline');
});

it('refuses a page when a component query was not included in the snapshot', () => {
  expect(() => renderPage({ path: '/recognition', queries: [] })).toThrow(
    'Unresolved page data'
  );
});

it('escapes embedded CMS data and keeps metadata isolated between pages and failures', async () => {
  const payload = '</script><script>alert("bad")</script>';
  cms.fetchProjectBySlug.mockResolvedValue({ ...project, title: payload });
  const pages = await loadPages();
  const rendered = renderPage(
    pages.find(page => page.path === '/projects/service-day')!
  );
  expect(rendered.head).not.toContain(payload);
  expect(rendered.state).not.toContain('<');
  expect(JSON.parse(rendered.state).queries[0].state.data.title).toBe(payload);
  expect(() =>
    renderPage({
      path: '/recognition',
      queries: [[['recognition'], { awards: [{ image: null }] }]],
    })
  ).toThrow();
  const missing = renderPage({ path: '/404', queries: [] });
  expect(missing.head).toContain('noindex, nofollow');
  expect(missing.body).toContain('Page Not Found');
  expect(missing.head).not.toContain('alert');
  render(
    <Helmet>
      <title>Client metadata restored</title>
    </Helmet>
  );
  await waitFor(() => expect(document.title).toBe('Client metadata restored'));
});
