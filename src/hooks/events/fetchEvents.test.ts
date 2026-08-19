import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const client = vi.hoisted(() => ({
  getEntries: vi.fn(),
  getAsset: vi.fn(),
}));

vi.mock('../contentfulClient', () => ({ default: { client } }));

import {
  fetchEventBySlug,
  fetchEvents,
  fetchPastEvents,
  fetchUpcomingEvents,
} from './fetchEvents';

const link = (id: string) => ({ sys: { id } });
const asset = (id: string, url?: string, description = '', title = '') => ({
  sys: { id },
  fields: { file: url ? { url } : undefined, description, title },
});
const event = (
  id: string,
  date: string,
  overrides: Record<string, unknown> = {}
) => ({
  sys: { id },
  fields: {
    title: `Event ${id}`,
    slug: id,
    description: {
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Event details' }],
        },
      ],
    },
    date,
    time: '9:00 AM',
    venue: 'Zamboanga City',
    category: 'Service',
    status: 'upcoming',
    registrationUrl: 'https://forms.test/register',
    shareableLink: 'https://example.com/event',
    featuredImage: link('featured'),
    invitationImage: link('invitation'),
    highlights: ['Highlight'],
    agenda: ['Agenda'],
    requirements: ['Requirement'],
    gallery: [link('gallery'), link('gallery-broken'), link('gallery-empty')],
    ...overrides,
  },
});

describe('event Contentful fetchers', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-19T00:00:00Z'));
    client.getEntries.mockReset();
    client.getAsset.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => vi.useRealTimers());

  it('maps event media and sorts future then past records', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        event('future-later', '2026-09-10', {
          featuredImage: undefined,
          invitationImage: undefined,
          gallery: [],
        }),
        event('past-old', '2026-06-01', {
          featuredImage: undefined,
          invitationImage: undefined,
          gallery: [],
        }),
        event('future-sooner', '2026-08-20', {
          featuredImage: undefined,
          invitationImage: undefined,
          gallery: [],
        }),
        event('past-recent', '2026-08-18', {
          featuredImage: undefined,
          invitationImage: undefined,
          gallery: [],
        }),
      ],
    });

    const result = await fetchEvents(4, 'upcoming');

    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'event',
      order: '-fields.date',
      limit: 4,
      'fields.status': 'upcoming',
    });
    expect(result?.map(item => item.slug)).toEqual([
      'future-sooner',
      'future-later',
      'past-recent',
      'past-old',
    ]);
    expect(result?.[0]).toEqual(
      expect.objectContaining({
        description: 'Event details',
        image: '',
        invitationImage: undefined,
      })
    );
  });

  it('maps images and skips missing or broken gallery assets', async () => {
    client.getEntries.mockResolvedValue({
      items: [event('service-day', '2026-08-20')],
    });
    client.getAsset.mockImplementation(async (id: string) => {
      if (id === 'featured') return asset(id, '//images.test/featured.jpg');
      if (id === 'invitation')
        return asset(id, 'https://images.test/invite.jpg');
      if (id === 'gallery')
        return asset(id, '//images.test/gallery.jpg', '', 'Gallery title');
      if (id === 'gallery-empty') return asset(id);
      throw new Error('broken gallery');
    });

    const result = await fetchEvents();

    expect(result?.[0]).toEqual(
      expect.objectContaining({
        image: 'https://images.test/featured.jpg',
        invitationImage: 'https://images.test/invite.jpg',
        gallery: [
          {
            id: 'gallery',
            url: 'https://images.test/gallery.jpg',
            caption: 'Gallery title',
            category: 'Service',
          },
        ],
      })
    );
    expect(console.warn).toHaveBeenCalledTimes(1);
  });

  it('publishes safe list records from incomplete CMS entries', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        event('incomplete', '', {
          title: undefined,
          slug: undefined,
          description: undefined,
          time: undefined,
          venue: undefined,
          category: undefined,
          status: undefined,
          registrationUrl: undefined,
          shareableLink: undefined,
          featuredImage: undefined,
          invitationImage: undefined,
          highlights: undefined,
          agenda: undefined,
          requirements: undefined,
          gallery: [link('untitled')],
        }),
      ],
    });
    client.getAsset.mockResolvedValue(
      asset('untitled', '//images.test/untitled.jpg')
    );

    await expect(fetchEvents()).resolves.toEqual([
      {
        id: 'incomplete',
        title: '',
        slug: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        category: '',
        status: 'upcoming',
        registrationUrl: undefined,
        shareableLink: '',
        image: '',
        invitationImage: undefined,
        highlights: [],
        agenda: [],
        requirements: [],
        gallery: [
          {
            id: 'untitled',
            url: 'https://images.test/untitled.jpg',
            caption: '',
            category: 'General',
          },
        ],
      },
    ]);
  });

  it('keeps records usable when all media requests fail', async () => {
    client.getEntries.mockResolvedValue({
      items: [event('service-day', '2026-08-20')],
    });
    client.getAsset.mockRejectedValue(new Error('asset unavailable'));

    const result = await fetchEvents();

    expect(result?.[0]).toEqual(
      expect.objectContaining({
        image: '',
        invitationImage: undefined,
        gallery: [],
      })
    );
    expect(console.warn).toHaveBeenCalledTimes(5);
  });

  it('rethrows list failures', async () => {
    client.getEntries.mockRejectedValue(new Error('Contentful unavailable'));

    await expect(fetchEvents()).rejects.toThrow('Contentful unavailable');
    expect(console.error).toHaveBeenCalled();
  });

  it('returns null for an unpublished event slug', async () => {
    client.getEntries.mockResolvedValue({ items: [] });

    await expect(fetchEventBySlug('missing')).resolves.toBeNull();
  });

  it('maps a complete event detail record', async () => {
    client.getEntries.mockResolvedValue({
      items: [event('service-day', '2026-08-20')],
    });
    client.getAsset.mockImplementation(async (id: string) => {
      if (id === 'featured') return asset(id, '//images.test/featured.jpg');
      if (id === 'invitation') return asset(id, '//images.test/invite.jpg');
      if (id === 'gallery')
        return asset(id, '//images.test/gallery.jpg', 'Volunteers');
      if (id === 'gallery-empty') return asset(id);
      throw new Error('broken gallery');
    });

    const result = await fetchEventBySlug('service-day');

    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'event',
      'fields.slug': 'service-day',
      limit: 1,
    });
    expect(result).toEqual(
      expect.objectContaining({
        title: 'Event service-day',
        description: 'Event details',
        image: 'https://images.test/featured.jpg',
        invitationImage: 'https://images.test/invite.jpg',
        gallery: [
          expect.objectContaining({
            id: 'gallery',
            caption: 'Volunteers',
            category: 'Service',
          }),
        ],
      })
    );
  });

  it('uses detail defaults when fields and media are unavailable', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        event('service-day', '2026-08-20', {
          title: undefined,
          slug: undefined,
          description: undefined,
          date: undefined,
          time: undefined,
          venue: undefined,
          status: undefined,
          featuredImage: link('featured'),
          invitationImage: link('invitation'),
          category: undefined,
          shareableLink: undefined,
          highlights: undefined,
          agenda: undefined,
          requirements: undefined,
          gallery: [link('untitled')],
        }),
      ],
    });
    client.getAsset.mockImplementation(async (id: string) => {
      if (id === 'untitled') {
        return asset(id, '//images.test/untitled.jpg');
      }
      throw new Error('asset unavailable');
    });

    const result = await fetchEventBySlug('service-day');

    expect(result).toEqual(
      expect.objectContaining({
        title: '',
        slug: '',
        description: '',
        date: '',
        time: '',
        venue: '',
        status: 'upcoming',
        category: '',
        shareableLink: '',
        image: '',
        invitationImage: undefined,
        highlights: [],
        agenda: [],
        requirements: [],
        gallery: [
          {
            id: 'untitled',
            url: 'https://images.test/untitled.jpg',
            caption: '',
            category: 'General',
          },
        ],
      })
    );
  });

  it('rethrows detail failures', async () => {
    client.getEntries.mockRejectedValue(new Error('query failed'));

    await expect(fetchEventBySlug('service-day')).rejects.toThrow(
      'query failed'
    );
  });

  it('provides upcoming and past query shortcuts', async () => {
    client.getEntries.mockResolvedValue({ items: [] });

    await fetchUpcomingEvents();
    await fetchPastEvents(2);

    expect(client.getEntries).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ limit: 5, 'fields.status': 'upcoming' })
    );
    expect(client.getEntries).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ limit: 2, 'fields.status': 'past' })
    );
  });
});
