import { beforeEach, expect, it, vi } from 'vitest';

const { client, fetchAllAwards, fetchOfficers, fetchFoundationGiving } =
  vi.hoisted(() => ({
    client: { getEntries: vi.fn(), getAsset: vi.fn() },
    fetchAllAwards: vi.fn(),
    fetchOfficers: vi.fn(),
    fetchFoundationGiving: vi.fn(),
  }));
vi.mock('./contentfulClient', () => ({ default: { client } }));
vi.mock('./landing-page/awardsSection', () => ({ fetchAllAwards }));
vi.mock('./officers/fetchOfficers', () => ({ fetchOfficers }));
vi.mock('./foundationGiving/fetchFoundationGiving', () => ({
  fetchFoundationGiving,
}));

import { homepageEvidenceQuery } from './contentQueries';

beforeEach(() => {
  client.getEntries.mockReset();
  client.getAsset.mockReset();
  fetchAllAwards.mockReset().mockResolvedValue({ awards: [] });
  fetchOfficers.mockReset().mockResolvedValue([]);
  fetchFoundationGiving.mockReset().mockResolvedValue(null);
  const items = ['new', 'first', 'second', 'third', 'fourth'].map(slug => ({
    sys: { id: slug },
    fields: {
      slug,
      title: `Project ${slug}`,
      date: '2026-07-10',
      description: { content: [] },
      gallery: [{ sys: { id: `gallery-${slug}` } }],
    },
  }));
  client.getEntries.mockResolvedValue({ items, total: items.length });
});

it('selects three homepage projects after deployed-route filtering', async () => {
  const state = document.createElement('script');
  state.id = 'page-state';
  state.type = 'application/json';
  state.textContent = JSON.stringify({
    routes: ['first', 'second', 'third', 'fourth'].map(
      slug => `/projects/${slug}`
    ),
  });
  document.body.appendChild(state);

  try {
    const evidence = await homepageEvidenceQuery('2026-2027').queryFn();
    expect(evidence.projects?.map(project => project.slug)).toEqual([
      'first',
      'second',
      'third',
    ]);
    expect(client.getEntries).toHaveBeenCalledTimes(1);
    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'project',
      order: '-fields.date',
    });
    expect(client.getAsset).not.toHaveBeenCalled();
    for (const project of evidence.projects!) {
      expect(project).not.toHaveProperty('description');
      expect(project).not.toHaveProperty('gallery');
    }
    expect(fetchAllAwards).toHaveBeenCalledTimes(1);
    expect(fetchOfficers).toHaveBeenCalledTimes(1);
    expect(fetchOfficers).toHaveBeenCalledWith('2026-2027');
    expect(fetchFoundationGiving).toHaveBeenCalledTimes(1);
  } finally {
    state.remove();
  }
});

it('keeps route discovery unrestricted without a deployed snapshot', async () => {
  const evidence = await homepageEvidenceQuery('2026-2027').queryFn();
  expect(evidence.projects?.map(project => project.slug)).toEqual([
    'new',
    'first',
    'second',
  ]);
});
