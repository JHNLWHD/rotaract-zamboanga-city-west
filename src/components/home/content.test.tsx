import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../../test/render';
import About from './About';
import Credentials from './Credentials';
import Hero from './Hero';
import Join from './Join';

const {
  fetchHeroContent,
  fetchAboutCommunity,
  fetchProjects,
  fetchAllAwards,
  fetchOfficers,
  fetchFoundationGiving,
} = vi.hoisted(() => ({
  fetchHeroContent: vi.fn(),
  fetchAboutCommunity: vi.fn(),
  fetchProjects: vi.fn(),
  fetchAllAwards: vi.fn(),
  fetchOfficers: vi.fn(),
  fetchFoundationGiving: vi.fn(),
}));

vi.mock('../../hooks/landing-page/heroSection', () => ({ fetchHeroContent }));
vi.mock('../../hooks/landing-page/aboutCommunity', () => ({
  fetchAboutCommunity,
}));
vi.mock('../../hooks/projects/fetchProjects', () => ({ fetchProjects }));
vi.mock('../../hooks/landing-page/awardsSection', () => ({ fetchAllAwards }));
vi.mock('../../hooks/officers/fetchOfficers', () => ({ fetchOfficers }));
vi.mock('../../hooks/foundationGiving/fetchFoundationGiving', () => ({
  fetchFoundationGiving,
}));

const project = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  title: `Project ${id}`,
  slug: id,
  shortDescription: `Description ${id}`,
  date: '2026-07-10',
  venue: 'Zamboanga City',
  impact: '100 people reached',
  partners: ['Partner'],
  category: 'Service',
  image: 'https://images.test/project.jpg',
  ...overrides,
});

describe('homepage content', () => {
  beforeEach(() => {
    fetchHeroContent.mockReset();
    fetchAboutCommunity.mockReset();
    fetchProjects.mockReset();
    fetchAllAwards.mockReset();
    fetchOfficers.mockReset();
    fetchFoundationGiving.mockReset();
  });

  it('renders Contentful hero copy and image metadata', async () => {
    fetchHeroContent.mockResolvedValue({
      badgeText: 'Institutional record',
      subTitle: '**Local service**, documented.',
      stats: [],
    });
    fetchAboutCommunity.mockResolvedValue({
      stats: [],
      ourStory: 'Story',
      image: {
        url: 'https://images.test/club.jpg',
        description: 'Great West members at a service project',
      },
    });

    renderRoute(<Hero />);

    expect(await screen.findByText('Institutional record')).toBeInTheDocument();
    expect(screen.getByText('Local service')).toHaveProperty(
      'tagName',
      'STRONG'
    );
    expect(
      screen.getByRole('img', {
        name: 'Great West members at a service project',
      })
    ).toHaveAttribute('src', 'https://images.test/club.jpg');
    expect(
      screen.getByRole('link', { name: /Get to Know Great West/ })
    ).toHaveAttribute('href', '#club-profile');
  });

  it('uses durable hero fallback copy and imagery', async () => {
    fetchHeroContent.mockResolvedValue(null);
    fetchAboutCommunity.mockResolvedValue(null);

    renderRoute(<Hero />);

    expect(await screen.findByText('Official club record')).toBeInTheDocument();
    expect(
      screen.getByText(/public record of the Great West/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /Members and partners/ })
    ).toHaveAttribute('src', expect.stringContaining('/lovable-uploads/'));
  });

  it('renders the loading, published, and unpublished club profile states', async () => {
    let resolveAbout: (value: unknown) => void = () => undefined;
    fetchAboutCommunity.mockReturnValue(
      new Promise(resolve => {
        resolveAbout = resolve;
      })
    );
    const first = renderRoute(<About />);
    expect(screen.getByText('Loading the club profile…')).toBeInTheDocument();

    resolveAbout({ stats: [], ourStory: 'We serve **Zamboanga City**.' });
    expect(await screen.findByText('Zamboanga City')).toHaveProperty(
      'tagName',
      'STRONG'
    );
    first.unmount();

    fetchAboutCommunity.mockResolvedValue(null);
    renderRoute(<About />);
    expect(
      await screen.findByText(/profile will appear here/)
    ).toBeInTheDocument();
  });

  it('renders complete public evidence from every record source', async () => {
    fetchProjects.mockResolvedValue([
      project('featured'),
      project('second'),
      project('third'),
    ]);
    fetchAllAwards.mockResolvedValue({
      awards: [
        { name: 'Outstanding Club', yearReceived: '2026' },
        { name: 'Service Citation', yearReceived: '2025' },
      ],
    });
    fetchOfficers.mockResolvedValue([
      {
        id: 'president',
        name: 'Jamie Cruz',
        position: 'President',
        term: '2026-2027',
        profileImage: 'https://images.test/president.jpg',
      },
    ]);
    fetchFoundationGiving.mockResolvedValue({
      currencyLabel: 'USD',
      asOfDate: '2026-04-10',
      rows: [
        { rotaryYearLabel: 'RY 2024-2025', sortOrder: 4, totalFund: 220 },
        { rotaryYearLabel: 'RY 2025-2026', sortOrder: 5, totalFund: 825 },
      ],
    });

    renderRoute(<Credentials />);

    expect(
      await screen.findByRole('heading', { name: 'Project featured' })
    ).toBeInTheDocument();
    expect(screen.getByText('Jamie Cruz')).toBeInTheDocument();
    expect(screen.getByText('Outstanding Club')).toBeInTheDocument();
    expect(screen.getByText('$825.00')).toBeInTheDocument();
    expect(screen.getByText('Description featured')).toBeInTheDocument();
    expect(screen.queryByText('100 people reached')).not.toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Project second/ })
    ).toHaveAttribute('href', '/projects/second');
  });

  it('renders honest placeholders when no evidence has been published', async () => {
    fetchProjects.mockResolvedValue([]);
    fetchAllAwards.mockResolvedValue(null);
    fetchOfficers.mockResolvedValue([]);
    fetchFoundationGiving.mockResolvedValue(null);

    renderRoute(<Credentials />);

    expect(
      await screen.findByText(/Project records will appear/)
    ).toBeInTheDocument();
    expect(screen.getByText(/current roster will appear/)).toBeInTheDocument();
    expect(
      screen.getByText(/Recognition records will appear/)
    ).toBeInTheDocument();
    expect(screen.getByText(/giving record will appear/)).toBeInTheDocument();
    expect(
      screen.getByText('No additional records published yet.')
    ).toBeInTheDocument();
  });

  it('shows a record error and retries all evidence sources', async () => {
    fetchProjects
      .mockRejectedValueOnce(new Error('Contentful unavailable'))
      .mockResolvedValueOnce([]);
    fetchAllAwards.mockResolvedValue(null);
    fetchOfficers.mockResolvedValue([]);
    fetchFoundationGiving.mockResolvedValue(null);
    const { user } = renderRoute(<Credentials />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Club records are temporarily unavailable.'
    );
    await user.click(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() => expect(fetchProjects).toHaveBeenCalledTimes(2));
    expect(
      await screen.findByText(/Project records will appear/)
    ).toBeInTheDocument();
  });

  it('keeps the seasonal application section absent while intake is closed', () => {
    const { container } = renderRoute(<Join />);
    expect(container).toBeEmptyDOMElement();
  });
});
