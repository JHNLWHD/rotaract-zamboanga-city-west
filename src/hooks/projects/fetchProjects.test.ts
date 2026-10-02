import { beforeEach, describe, expect, it, vi } from 'vitest';

const client = vi.hoisted(() => ({
  getEntries: vi.fn(),
  getAsset: vi.fn(),
}));

vi.mock('../contentfulClient', () => ({ default: { client } }));

import { fetchProjectBySlug, fetchProjects } from './fetchProjects';

const link = (id: string) => ({ sys: { id } });
const asset = (id: string, url?: string, description = '', title = '') => ({
  sys: { id },
  fields: { file: url ? { url } : undefined, description, title },
});
const project = (overrides: Record<string, unknown> = {}) => ({
  sys: { id: 'project-1' },
  fields: {
    title: 'Mangrove Day',
    slug: 'mangrove-day',
    shortDescription: 'A coastal project',
    description: {
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Project details',
              marks: [{ type: 'bold' }],
            },
          ],
        },
      ],
    },
    date: '2026-07-10',
    venue: 'Zamboanga City',
    impact: '100 seedlings',
    partners: ['Partner One'],
    facebookLink: 'https://facebook.com/post',
    shareableLink: 'https://example.com/project',
    featuredImage: link('featured'),
    category: 'Environment',
    hashtags: ['GreatWest'],
    highlights: ['Community-led'],
    gallery: [link('gallery-1'), link('gallery-broken'), link('gallery-empty')],
    bulletPoints: ['100 volunteers'],
    partnerLinks: {
      'en-US': [{ name: 'Partner One', url: 'https://partner.test' }],
    },
    ...overrides,
  },
});

describe('project Contentful fetchers', () => {
  beforeEach(() => {
    client.getEntries.mockReset();
    client.getAsset.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  it('queries and maps lightweight project records', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        project(),
        project({
          title: undefined,
          slug: undefined,
          shortDescription: undefined,
          date: undefined,
          venue: undefined,
          impact: undefined,
          featuredImage: undefined,
          partners: undefined,
          category: undefined,
        }),
      ],
    });
    client.getAsset.mockResolvedValue(
      asset('featured', '//images.test/featured.jpg')
    );

    const result = await fetchProjects(3, 'Environment');

    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'project',
      order: '-fields.date',
      limit: 3,
      'fields.category': 'Environment',
    });
    expect(result).toEqual([
      expect.objectContaining({
        id: 'project-1',
        title: 'Mangrove Day',
        image: 'https://images.test/featured.jpg',
        partners: ['Partner One'],
      }),
      expect.objectContaining({
        title: '',
        slug: '',
        shortDescription: '',
        date: '',
        venue: '',
        impact: '',
        partners: [],
        category: '',
        image: '',
      }),
    ]);
    expect(result?.[0]).not.toHaveProperty('gallery');
  });

  it('keeps project records usable when an image fails', async () => {
    client.getEntries.mockResolvedValue({ items: [project()] });
    client.getAsset.mockRejectedValue(new Error('asset unavailable'));

    await expect(fetchProjects()).resolves.toEqual([
      expect.objectContaining({ title: 'Mangrove Day', image: '' }),
    ]);
    expect(console.warn).toHaveBeenCalled();
  });

  it('rethrows list failures for React Query', async () => {
    client.getEntries.mockRejectedValue(new Error('Contentful unavailable'));

    await expect(fetchProjects()).rejects.toThrow('Contentful unavailable');
    expect(console.error).toHaveBeenCalled();
  });

  it('keeps refreshed project links within the deployed routes', async () => {
    const state = document.createElement('script');
    state.id = 'page-state';
    state.type = 'application/json';
    state.textContent = JSON.stringify({ routes: ['/projects/mangrove-day'] });
    document.body.appendChild(state);
    client.getEntries.mockResolvedValue({
      items: [
        project({ slug: 'new-project', featuredImage: undefined }),
        project({ title: 'Updated project title', featuredImage: undefined }),
      ],
    });
    try {
      const records = await fetchProjects();
      expect(records?.map(({ slug, title }) => ({ slug, title }))).toEqual([
        {
          slug: 'mangrove-day',
          title: 'Updated project title',
        },
      ]);
    } finally {
      state.remove();
    }
  });

  it('returns null when a project slug is not published', async () => {
    client.getEntries.mockResolvedValue({ items: [] });

    await expect(fetchProjectBySlug('missing')).resolves.toBeNull();
  });

  it('maps the complete project record and skips broken gallery assets', async () => {
    client.getEntries.mockResolvedValue({ items: [project()] });
    client.getAsset.mockImplementation(async (id: string) => {
      if (id === 'featured') return asset(id, '//images.test/featured.jpg');
      if (id === 'gallery-1')
        return asset(id, '//images.test/gallery.jpg', 'Planting day');
      if (id === 'gallery-empty') return asset(id);
      throw new Error('broken gallery image');
    });

    const result = await fetchProjectBySlug('mangrove-day');

    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'project',
      'fields.slug': 'mangrove-day',
      limit: 1,
    });
    expect(result).toEqual(
      expect.objectContaining({
        title: 'Mangrove Day',
        description: '**Project details**',
        image: 'https://images.test/featured.jpg',
        gallery: [
          {
            id: 'gallery-1',
            url: 'https://images.test/gallery.jpg',
            caption: 'Planting day',
            category: 'Environment',
          },
        ],
        partnerLinks: [{ name: 'Partner One', url: 'https://partner.test' }],
      })
    );
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('uses safe defaults when optional detail fields and images are absent', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        project({
          title: undefined,
          slug: undefined,
          shortDescription: undefined,
          description: undefined,
          date: undefined,
          venue: undefined,
          impact: undefined,
          partners: undefined,
          featuredImage: link('featured'),
          gallery: [link('gallery-untitled')],
          partnerLinks: 'invalid',
          category: undefined,
          shareableLink: undefined,
          hashtags: undefined,
          highlights: undefined,
          bulletPoints: undefined,
        }),
      ],
    });
    client.getAsset.mockImplementation(async (id: string) => {
      if (id === 'gallery-untitled') {
        return asset(id, '//images.test/untitled.jpg');
      }
      throw new Error('asset unavailable');
    });

    const result = await fetchProjectBySlug('mangrove-day');

    expect(result).toEqual(
      expect.objectContaining({
        title: '',
        slug: '',
        shortDescription: '',
        description: '',
        date: '',
        venue: '',
        impact: '',
        partners: [],
        shareableLink: '',
        image: '',
        category: '',
        hashtags: [],
        highlights: [],
        gallery: [
          {
            id: 'gallery-untitled',
            url: 'https://images.test/untitled.jpg',
            caption: '',
            category: 'General',
          },
        ],
        bulletPoints: [],
      })
    );
    expect(result?.partnerLinks).toBeUndefined();
  });

  it('rethrows detail failures for React Query', async () => {
    client.getEntries.mockRejectedValue(new Error('query failed'));

    await expect(fetchProjectBySlug('mangrove-day')).rejects.toThrow(
      'query failed'
    );
    expect(console.error).toHaveBeenCalled();
  });
});
