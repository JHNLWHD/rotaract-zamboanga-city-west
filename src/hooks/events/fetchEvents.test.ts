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

  it.each(['list', 'detail'])(
    'maps complete %s records and skips missing or broken gallery assets',
    async fetchInterface => {
      client.getEntries.mockResolvedValue({
        items: [
          {
            ...event('service-day', '2026-08-20', {
              status: 'registration_open',
              gallery: [
                link('gallery'),
                link('gallery-described'),
                link('gallery-broken'),
                link('gallery-empty'),
              ],
            }),
            sys: { id: 'service-day', updatedAt: '2026-08-18T12:00:00Z' },
          },
        ],
      });
      client.getAsset.mockImplementation(async (id: string) => {
        if (id === 'featured')
          return asset(id, '//images.ctfassets.net/space/featured.jpg?w=2000');
        if (id === 'invitation')
          return asset(id, 'https://images.test/invite.jpg');
        if (id === 'gallery')
          return asset(id, '//images.test/gallery.jpg', '', 'Gallery title');
        if (id === 'gallery-described')
          return asset(
            id,
            '//images.test/described.jpg',
            'Volunteers',
            'Title'
          );
        if (id === 'gallery-empty') return asset(id);
        throw new Error('broken gallery');
      });

      const result =
        fetchInterface === 'list'
          ? (await fetchEvents())?.[0]
          : await fetchEventBySlug('service-day');

      expect(result).toEqual({
        updatedAt: '2026-08-18T12:00:00Z',
        id: 'service-day',
        title: 'Event service-day',
        slug: 'service-day',
        description: 'Event details',
        date: '2026-08-20',
        time: '9:00 AM',
        venue: 'Zamboanga City',
        category: 'Service',
        status: 'registration_open',
        registrationUrl: 'https://forms.test/register',
        shareableLink: 'https://example.com/event',
        image: 'https://images.ctfassets.net/space/featured.jpg?w=2000',
        invitationImage: 'https://images.test/invite.jpg',
        highlights: ['Highlight'],
        agenda: ['Agenda'],
        requirements: ['Requirement'],
        gallery: [
          {
            id: 'gallery',
            url: 'https://images.test/gallery.jpg',
            caption: 'Gallery title',
            category: 'Service',
          },
          {
            id: 'gallery-described',
            url: 'https://images.test/described.jpg',
            caption: 'Volunteers',
            category: 'Service',
          },
        ],
      });
      expect(console.warn).toHaveBeenCalledTimes(1);
    }
  );

  it.each(['list', 'detail'])(
    'maps safe %s records from incomplete CMS entries',
    async fetchInterface => {
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

      const result =
        fetchInterface === 'list'
          ? (await fetchEvents())?.[0]
          : await fetchEventBySlug('incomplete');

      expect(result).toEqual({
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
      });
    }
  );

  it.each(['list', 'detail'])(
    'keeps %s records usable when all media requests fail',
    async fetchInterface => {
      client.getEntries.mockResolvedValue({
        items: [event('service-day', '2026-08-20')],
      });
      client.getAsset.mockRejectedValue(new Error('asset unavailable'));

      const result =
        fetchInterface === 'list'
          ? (await fetchEvents())?.[0]
          : await fetchEventBySlug('service-day');

      expect(result).toEqual(
        expect.objectContaining({
          image: '',
          invitationImage: undefined,
          gallery: [],
        })
      );
      expect(console.warn).toHaveBeenCalledTimes(5);
    }
  );

  it.each(['list', 'detail'])(
    'awaits %s media in field order and continues after an asset failure',
    async fetchInterface => {
      client.getEntries.mockResolvedValue({
        items: [
          event('service-day', '2026-08-20', {
            gallery: [link('gallery-first'), link('gallery-second')],
          }),
        ],
      });
      const error = new Error('invitation unavailable');
      let finishAsset: () => void;
      client.getAsset.mockImplementation(
        (id: string) =>
          new Promise((resolve, reject) => {
            finishAsset = () =>
              id === 'invitation'
                ? reject(error)
                : resolve(asset(id, `//images.test/${id}.jpg`));
          })
      );

      const pending =
        fetchInterface === 'list'
          ? fetchEvents().then(records => records?.[0])
          : fetchEventBySlug('service-day');

      for (const [index, id] of [
        'featured',
        'invitation',
        'gallery-first',
        'gallery-second',
      ].entries()) {
        await vi.waitFor(() =>
          expect(client.getAsset).toHaveBeenCalledTimes(index + 1)
        );
        expect(client.getAsset).toHaveBeenNthCalledWith(index + 1, id);
        finishAsset();
      }

      const result = await pending;
      expect(result?.invitationImage).toBeUndefined();
      expect(result?.gallery.map(({ id }) => id)).toEqual([
        'gallery-first',
        'gallery-second',
      ]);
      expect(console.warn).toHaveBeenCalledWith(
        'Could not fetch invitation image for event Event service-day:',
        error
      );
    }
  );

  it('paginates event records and sorts by Manila local start time', async () => {
    const withoutMedia = {
      featuredImage: undefined,
      invitationImage: undefined,
      gallery: [],
    };
    client.getEntries
      .mockResolvedValueOnce({
        total: 4,
        items: [
          event('past-later', '2026-08-19', {
            ...withoutMedia,
            time: '7:00 AM',
          }),
          event('future-later', '2026-08-19', {
            ...withoutMedia,
            time: '11:00 AM',
          }),
        ],
      })
      .mockResolvedValueOnce({
        items: [
          event('past-earlier', '2026-08-19', {
            ...withoutMedia,
            time: '6:00 AM',
          }),
          event('future-sooner', '2026-08-19', {
            ...withoutMedia,
            time: '9:00 AM',
          }),
        ],
      });

    const result = await fetchEvents(undefined, 'upcoming');

    expect(client.getEntries.mock.calls).toEqual([
      [
        {
          content_type: 'event',
          order: '-fields.date',
          'fields.status': 'upcoming',
        },
      ],
      [
        {
          content_type: 'event',
          order: '-fields.date',
          'fields.status': 'upcoming',
          skip: 2,
        },
      ],
    ]);
    expect(result?.map(({ slug }) => slug)).toEqual([
      'future-sooner',
      'future-later',
      'past-later',
      'past-earlier',
    ]);
    expect(client.getAsset).not.toHaveBeenCalled();
  });

  it('rethrows list failures', async () => {
    const error = new Error('Contentful unavailable');
    client.getEntries.mockRejectedValue(error);

    await expect(fetchEvents()).rejects.toBe(error);
    expect(console.error).toHaveBeenCalledWith('Error fetching events:', error);
    expect(client.getAsset).not.toHaveBeenCalled();
  });

  it('keeps refreshed event links within the deployed routes', async () => {
    const state = document.createElement('script');
    state.id = 'page-state';
    state.type = 'application/json';
    state.textContent = JSON.stringify({
      routes: ['/events/2026-08-20/service-day', '/events/2026-08-21/moved'],
    });
    document.body.appendChild(state);
    client.getEntries.mockResolvedValue({
      items: [
        event('new-event', '2026-08-22'),
        event('moved', '2026-08-23'),
        event('service-day', '2026-08-20', { title: 'Updated event title' }),
      ],
    });
    client.getAsset.mockResolvedValue({ fields: {} });
    try {
      const records = await fetchEvents();
      expect(records?.map(({ slug, title }) => ({ slug, title }))).toEqual([
        {
          slug: 'service-day',
          title: 'Updated event title',
        },
      ]);
    } finally {
      state.remove();
    }
  });

  it('returns an empty list and null detail for missing published events', async () => {
    client.getEntries.mockResolvedValue({ items: [] });

    await expect(fetchEvents()).resolves.toEqual([]);
    await expect(fetchEventBySlug('missing')).resolves.toBeNull();
    expect(client.getAsset).not.toHaveBeenCalled();
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
    const error = new Error('query failed');
    client.getEntries.mockRejectedValue(error);

    await expect(fetchEventBySlug('service-day')).rejects.toBe(error);
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching event by slug:',
      error
    );
    expect(client.getAsset).not.toHaveBeenCalled();
  });

  it('logs and rethrows detail mapping failures', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        event('service-day', '2026-08-20', {
          description: { content: {} },
          featuredImage: undefined,
          invitationImage: undefined,
          gallery: [],
        }),
      ],
    });

    await expect(fetchEventBySlug('service-day')).rejects.toBeInstanceOf(
      TypeError
    );
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching event by slug:',
      expect.any(TypeError)
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
