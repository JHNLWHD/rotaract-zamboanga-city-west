import { screen, waitFor, within } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorState from '../components/events/ErrorState';
import EventsGrid from '../components/events/EventsGrid';
import { renderRoute } from '../test/render';
import EventDetail from './EventDetail';
import Events from './Events';

const { fetchEvents, useEventBySlug } = vi.hoisted(() => ({
  fetchEvents: vi.fn(),
  useEventBySlug: vi.fn(),
}));
vi.mock('../hooks/events/fetchEvents', () => ({ fetchEvents }));
vi.mock('../hooks/events/useEventBySlug', () => ({ useEventBySlug }));
vi.mock('../components/ShareModal', () => ({
  default: ({
    isOpen,
    onClose,
    content,
  }: {
    isOpen: boolean;
    onClose: () => void;
    content: { title: string; shareableLink: string } | null;
  }) =>
    isOpen && content ? (
      <div
        role="dialog"
        aria-label="Share event"
        data-link={content.shareableLink}
      >
        {content.title}
        <button type="button" onClick={onClose}>
          Close share
        </button>
      </div>
    ) : null,
}));

const event = (
  id: string,
  date: string,
  overrides: Record<string, unknown> = {}
) => ({
  id,
  title: `Event ${id}`,
  slug: id,
  description: 'A **documented** club activity.',
  date,
  time: '9:00 AM',
  venue: 'Zamboanga City',
  category: 'Service',
  status: 'upcoming',
  registrationUrl: 'https://forms.test/register',
  shareableLink: `https://rotaract.test/events/${id}`,
  image: 'https://images.test/event.jpg',
  invitationImage: 'https://images.test/invitation.jpg',
  highlights: ['Community-led'],
  agenda: ['Opening program'],
  requirements: ['Bring water'],
  gallery: [
    {
      id: 'photo-1',
      url: 'https://images.test/gallery.jpg',
      caption: 'Volunteers',
      category: 'Service',
    },
    {
      id: 'photo-2',
      url: 'https://images.test/gallery-two.jpg',
      caption: '',
      category: 'Service',
    },
  ],
  ...overrides,
});

const detail = (
  state: Record<string, unknown>,
  path = '/events/2026-08-20/service-day'
) =>
  renderRoute(
    <Routes>
      <Route path="/events/:date/:slug" element={<EventDetail />} />
      <Route path="/events" element={<p>Events archive destination</p>} />
    </Routes>,
    path
  );

describe('Events archive', () => {
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(
      new Date('2026-08-19T00:00:00Z').getTime()
    );
    fetchEvents.mockReset();
  });
  afterEach(() => vi.restoreAllMocks());

  it('shows loading before published records arrive', async () => {
    let resolveEvents: (value: unknown[]) => void = () => undefined;
    fetchEvents.mockReturnValue(
      new Promise(resolve => {
        resolveEvents = resolve;
      })
    );
    renderRoute(<Events />, '/events');
    expect(screen.getByText('Loading event records…')).toBeInTheDocument();
    resolveEvents([]);
    expect(
      await screen.findByText('No event records have been published yet.')
    ).toBeInTheDocument();
  });

  it('shows an error and retries', async () => {
    fetchEvents
      .mockRejectedValueOnce(new Error('Archive unavailable'))
      .mockResolvedValueOnce([]);
    const { user } = renderRoute(<Events />, '/events');
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Archive unavailable'
    );
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    await waitFor(() => expect(fetchEvents).toHaveBeenCalledTimes(2));
    expect(
      await screen.findByText('No event records have been published yet.')
    ).toBeInTheDocument();
  });

  it('separates upcoming and past records and opens sharing', async () => {
    fetchEvents.mockResolvedValue([
      event('upcoming', '2026-08-20', { status: 'registration_open' }),
      event('future-two', '2026-08-21', {
        registrationUrl: undefined,
        image: '',
        time: '',
        venue: '',
        description: '',
      }),
      event('past', '2026-08-18'),
    ]);
    const { user } = renderRoute(<Events />, '/events');

    expect(await screen.findByText('2 events')).toBeInTheDocument();
    expect(screen.getByText('1 record')).toBeInTheDocument();
    expect(screen.getByText('Service · registration open')).toBeInTheDocument();
    expect(screen.getByText('Service · past')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Registration/ })).toHaveAttribute(
      'href',
      'https://forms.test/register'
    );
    expect(document.title).toBe(
      'Events | Rotaract Club of Zamboanga City West'
    );

    await user.click(screen.getAllByRole('button', { name: 'Share' })[0]);
    expect(
      screen.getByRole('dialog', { name: 'Share event' })
    ).toHaveTextContent('Event upcoming');
    await user.click(screen.getByRole('button', { name: 'Close share' }));
    expect(
      screen.queryByRole('dialog', { name: 'Share event' })
    ).not.toBeInTheDocument();
  });

  it('labels singular upcoming and plural past counts', async () => {
    fetchEvents.mockResolvedValue([
      event('upcoming', '2026-08-20'),
      event('past-one', '2026-08-18'),
      event('past-two', '2026-08-17'),
    ]);

    renderRoute(<Events />, '/events');

    expect(await screen.findByText('1 event')).toBeInTheDocument();
    expect(screen.getByText('2 records')).toBeInTheDocument();
  });

  it('states when no future event exists and omits an empty grid', async () => {
    fetchEvents.mockResolvedValue([event('past', '2026-08-18')]);
    renderRoute(<Events />, '/events');
    expect(
      await screen.findByText(/No upcoming event has been published/)
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Upcoming events' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Past activities' })
    ).toBeInTheDocument();

    const empty = renderRoute(
      <EventsGrid events={undefined} onShareEvent={vi.fn()} />
    );
    expect(empty.container).toBeEmptyDOMElement();
  });

  it('supports the generic and retrying error variants', () => {
    renderRoute(
      <ErrorState error="unavailable" onRetry={vi.fn()} isRetrying />
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please try again later.'
    );
    expect(
      screen.getByRole('button', { name: 'Trying again…' })
    ).toBeDisabled();
  });
});

describe('Event detail', () => {
  beforeEach(() => {
    vi.spyOn(Date, 'now').mockReturnValue(
      new Date('2026-08-19T00:00:00Z').getTime()
    );
    useEventBySlug.mockReset();
  });
  afterEach(() => vi.restoreAllMocks());

  it('renders loading, error, and empty-result states', async () => {
    useEventBySlug.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    const loading = detail({});
    expect(screen.getByText('Loading event record…')).toBeInTheDocument();
    loading.unmount();

    useEventBySlug.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetching: true,
      refetch: vi.fn(),
    });
    const error = detail({});
    expect(
      screen.getByRole('heading', { name: 'Event temporarily unavailable' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Trying again…' })
    ).toBeDisabled();
    error.unmount();

    useEventBySlug.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    const missing = detail({});
    expect(
      screen.getByRole('heading', { name: 'Event Not Found' })
    ).toBeInTheDocument();
    await waitFor(() =>
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, follow'
      )
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    await missing.user.click(
      screen.getByRole('button', { name: /Back to Events/ })
    );
    expect(screen.getByText('Events archive destination')).toBeInTheDocument();
  });

  it('renders a future event, downloads its invitation, controls sharing, and supplies its record images to the gallery', async () => {
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => undefined);
    useEventBySlug.mockReturnValue({
      data: event('service-day', '2026-08-20', {
        status: 'registration_open',
        description: `**${'A'.repeat(230)}**`,
      }),
      isLoading: false,
      isError: false,
    });
    const { user } = detail({});

    expect(useEventBySlug).toHaveBeenCalledWith('service-day');
    expect(screen.getAllByText(/Registration open/)).toHaveLength(2);
    expect(
      screen.getByRole('link', { name: /Open registration/ })
    ).toHaveAttribute('href', 'https://forms.test/register');
    expect(screen.getByText('Community-led')).toBeInTheDocument();
    expect(screen.getByText('Opening program')).toBeInTheDocument();
    expect(screen.getByText('Bring water')).toBeInTheDocument();
    expect(screen.queryByText(`${'A'.repeat(217)}…`)).not.toBeInTheDocument();
    expect(screen.getByText('A'.repeat(230))).toBeInTheDocument();
    await waitFor(() =>
      expect(
        document.querySelector('meta[name="description"]')
      ).toHaveAttribute('content', `${'A'.repeat(217)}…`)
    );

    await user.click(
      screen.getByRole('button', { name: /Download invitation/ })
    );
    expect(click).toHaveBeenCalled();

    await user.click(screen.getByRole('button', { name: 'Share record' }));
    expect(screen.getByRole('dialog', { name: 'Share event' })).toHaveAttribute(
      'data-link',
      'https://rotaract.test/events/service-day'
    );
    await user.click(screen.getByRole('button', { name: 'Close share' }));

    const gallery = screen.getByRole('region', { name: 'Event gallery' });
    expect(
      within(gallery)
        .getAllByRole('img')
        .map(image => image.getAttribute('src'))
    ).toEqual([
      'https://images.test/gallery.jpg',
      'https://images.test/gallery-two.jpg',
    ]);
    expect(
      within(gallery).getByRole('img', {
        name: 'Event service-day gallery image',
      })
    ).toBeInTheDocument();
  });

  it('uses neutral past wording and preserves cached data during a refresh failure', async () => {
    useEventBySlug.mockReturnValue({
      data: event('past', '2026-08-18', {
        image: '',
        status: 'registration_open',
        highlights: [],
        agenda: [],
        requirements: [],
        gallery: [],
      }),
      isLoading: false,
      isError: true,
    });
    detail({}, '/events/2026-08-18/past');

    expect(screen.getAllByText(/Past event/)).toHaveLength(2);
    await waitFor(() =>
      expect(
        document.querySelector('script[type="application/ld+json"]')
      ).not.toBeNull()
    );
    const schema = JSON.parse(
      document.querySelector('script[type="application/ld+json"]')!.textContent!
    );
    expect(schema.startDate).toBe('2026-08-18T09:00:00+08:00');
    expect(schema).not.toHaveProperty('eventStatus');
    expect(
      screen.queryByRole('link', { name: /Open registration/ })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'Event past event record' })
    ).toHaveAttribute('src', 'https://images.test/invitation.jpg');
    expect(
      screen.queryByRole('img', { name: 'Event past invitation' })
    ).not.toBeInTheDocument();
  });

  it('uses editorial fallbacks and the canonical URL when optional fields are empty', async () => {
    useEventBySlug.mockReturnValue({
      data: event('minimal', '2026-08-20', {
        description: '',
        category: '',
        status: 'upcoming',
        time: '',
        registrationUrl: undefined,
        shareableLink: '',
        image: '',
        invitationImage: undefined,
        highlights: [],
        agenda: [],
        requirements: [],
        gallery: [],
      }),
      isLoading: false,
      isError: false,
    });
    const { user } = detail({}, '/events/stale-date/minimal');

    expect(screen.getByText('Event record')).toBeInTheDocument();
    expect(
      screen.queryByText('Published club event record.')
    ).not.toBeInTheDocument();
    expect(screen.getAllByText(/Upcoming/)).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Share record' }));
    expect(screen.getByRole('dialog', { name: 'Share event' })).toHaveAttribute(
      'data-link',
      'https://rotaract.rotaryzcwest.org/events/2026-08-20/minimal'
    );
  });
});
