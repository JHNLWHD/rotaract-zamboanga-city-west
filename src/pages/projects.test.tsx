import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProjectsGrid from '../components/projects/ProjectsGrid';
import ProjectsErrorState from '../components/projects/ProjectsErrorState';
import { renderRoute } from '../test/render';
import ProjectDetail from './ProjectDetail';
import Projects from './Projects';

const { fetchProjects, useProjectBySlug } = vi.hoisted(() => ({
  fetchProjects: vi.fn(),
  useProjectBySlug: vi.fn(),
}));
vi.mock('../hooks/projects/fetchProjects', () => ({ fetchProjects }));
vi.mock('../hooks/projects/useProjectBySlug', () => ({ useProjectBySlug }));
vi.mock('yet-another-react-lightbox', () => ({
  default: ({
    open,
    close,
    index,
  }: {
    open: boolean;
    close: () => void;
    index: number;
  }) =>
    open ? (
      <div role="dialog" aria-label="Project lightbox">
        Image {index + 1}
        <button type="button" onClick={close}>
          Close lightbox
        </button>
      </div>
    ) : null,
}));
vi.mock('../components/ShareModal', () => ({
  default: ({
    isOpen,
    onClose,
    content,
  }: {
    isOpen: boolean;
    onClose: () => void;
    content: { title: string };
  }) =>
    isOpen ? (
      <div role="dialog" aria-label="Share project">
        {content.title}
        <button type="button" onClick={onClose}>
          Close share
        </button>
      </div>
    ) : null,
}));

const listProject = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  title: `Project ${id}`,
  slug: id,
  shortDescription: `Description ${id}`,
  date: '2026-07-10',
  venue: 'Zamboanga City',
  impact: '100 people reached',
  partners: ['Partner One'],
  category: 'Service',
  image: 'https://images.test/project.jpg',
  ...overrides,
});

const detailProject = (overrides: Record<string, unknown> = {}) => ({
  ...listProject('service-day'),
  description: 'A **documented** service project.',
  facebookLink: 'https://facebook.com/project',
  shareableLink: 'https://rotaract.test/projects/service-day',
  hashtags: ['GreatWest'],
  highlights: ['Community-led'],
  gallery: [
    {
      id: 'photo-1',
      url: 'https://images.test/one.jpg',
      caption: 'Volunteers',
      category: 'Service',
    },
    {
      id: 'photo-2',
      url: 'https://images.test/two.jpg',
      caption: '',
      category: 'Service',
    },
  ],
  bulletPoints: [],
  partnerLinks: [
    { name: 'Partner One', url: 'https://partner.test' },
    { name: 'Partner Two' },
  ],
  ...overrides,
});

describe('Projects archive', () => {
  beforeEach(() => fetchProjects.mockReset());

  it('shows the loading state', async () => {
    let resolveProjects: (value: unknown[]) => void = () => undefined;
    fetchProjects.mockReturnValue(
      new Promise(resolve => {
        resolveProjects = resolve;
      })
    );
    renderRoute(<Projects />, '/projects');
    expect(screen.getByText('Loading project records…')).toBeInTheDocument();
    resolveProjects([]);
    expect(
      await screen.findByText('No project records have been published yet.')
    ).toBeInTheDocument();
  });

  it('shows an error and retries the archive query', async () => {
    fetchProjects
      .mockRejectedValueOnce(new Error('Archive unavailable'))
      .mockResolvedValueOnce([]);
    const { user } = renderRoute(<Projects />, '/projects');

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Archive unavailable'
    );
    await user.click(screen.getByRole('button', { name: 'Try again' }));

    await waitFor(() => expect(fetchProjects).toHaveBeenCalledTimes(2));
    expect(
      await screen.findByText('No project records have been published yet.')
    ).toBeInTheDocument();
  });

  it('renders a featured record and pluralized archive', async () => {
    fetchProjects.mockResolvedValue([
      listProject('featured'),
      listProject('archive-one'),
      listProject('archive-two', {
        image: '',
        category: '',
        venue: '',
        partners: [],
        shortDescription: 'Project archive-two',
      }),
    ]);
    renderRoute(<Projects />, '/projects');

    expect(
      await screen.findByRole('heading', { name: 'Project featured' })
    ).toBeInTheDocument();
    expect(screen.getByText('2 records')).toBeInTheDocument();
    expect(
      screen.getByRole('list', { name: 'Club project records' })
    ).toHaveTextContent('Project archive-one');
    expect(
      screen.queryByText('Description archive-two')
    ).not.toBeInTheDocument();
    expect(document.title).toBe(
      'Projects | Rotaract Club of Zamboanga City West'
    );
  });

  it('uses singular archive grammar', async () => {
    fetchProjects.mockResolvedValue([
      listProject('featured'),
      listProject('only'),
    ]);
    renderRoute(<Projects />, '/projects');
    expect(await screen.findByText('1 record')).toBeInTheDocument();
  });

  it('handles an empty grid and a non-Error failure message', () => {
    const first = renderRoute(<ProjectsGrid projects={undefined} />);
    expect(
      screen.getByText('No project records have been published yet.')
    ).toBeInTheDocument();
    first.unmount();

    const error = renderRoute(<ProjectsErrorState error="unavailable" />);
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please try again later.'
    );
    expect(
      screen.queryByRole('button', { name: 'Try again' })
    ).not.toBeInTheDocument();
    error.unmount();

    renderRoute(
      <ProjectsErrorState
        error={new Error('Unavailable')}
        onRetry={vi.fn()}
        isRetrying
      />
    );
    expect(
      screen.getByRole('button', { name: 'Trying again…' })
    ).toBeDisabled();
  });
});

describe('Project detail', () => {
  beforeEach(() => useProjectBySlug.mockReset());

  it('renders loading and a retryable CMS failure without claiming a missing record', async () => {
    useProjectBySlug.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    const loading = renderRoute(<ProjectDetail />, '/projects/service-day');
    expect(screen.getByText('Loading project record…')).toBeInTheDocument();
    loading.unmount();

    useProjectBySlug.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isFetching: false,
      refetch: vi.fn(),
    });
    const { user } = renderRoute(<ProjectDetail />, '/projects/service-day');
    expect(
      screen.getByRole('heading', { name: 'Project temporarily unavailable' })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(
      useProjectBySlug.mock.results.at(-1)?.value.refetch
    ).toHaveBeenCalledOnce();
  });

  it('treats an empty successful query as not found and returns to the archive', async () => {
    useProjectBySlug.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
    const { user } = renderRoute(<ProjectDetail />, '/projects/missing');
    await waitFor(() =>
      expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, follow'
      )
    );
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    await user.click(screen.getByRole('button', { name: /Back to Projects/ }));
    expect(window.location.pathname).toBe('/');
  });

  it('renders a complete record and controls share and gallery dialogs', async () => {
    const longDescription = 'A'.repeat(230);
    useProjectBySlug.mockReturnValue({
      data: detailProject({ shortDescription: longDescription }),
      isLoading: false,
      isError: true,
    });
    const { user } = renderRoute(<ProjectDetail />, '/projects/service-day');

    expect(
      screen.getByRole('heading', { name: 'Project service-day' })
    ).toBeInTheDocument();
    expect(screen.getByText('documented')).toHaveProperty('tagName', 'STRONG');
    expect(screen.getByText('Community-led')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Partner One/ })).toHaveAttribute(
      'href',
      'https://partner.test'
    );
    expect(screen.getByText('Partner Two')).toBeInTheDocument();
    expect(screen.queryByText(`${'A'.repeat(217)}…`)).not.toBeInTheDocument();
    await waitFor(() =>
      expect(
        document.querySelector('meta[name="description"]')
      ).toHaveAttribute('content', `${'A'.repeat(217)}…`)
    );

    await user.click(screen.getByRole('button', { name: 'Share record' }));
    expect(
      screen.getByRole('dialog', { name: 'Share project' })
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close share' }));
    expect(
      screen.queryByRole('dialog', { name: 'Share project' })
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Volunteers/ }));
    expect(
      screen.getByRole('dialog', { name: 'Project lightbox' })
    ).toHaveTextContent('Image 1');
    await user.click(screen.getByRole('button', { name: 'Close lightbox' }));
    expect(
      screen.queryByRole('dialog', { name: 'Project lightbox' })
    ).not.toBeInTheDocument();
  });

  it('uses outcome metadata and published partner names without repeating the outcome', async () => {
    useProjectBySlug.mockReturnValue({
      data: detailProject({
        shortDescription: 'Project service-day',
        image: '',
        category: '',
        highlights: [],
        gallery: [],
        partnerLinks: undefined,
        facebookLink: undefined,
      }),
      isLoading: false,
      isError: false,
    });
    const outcome = renderRoute(<ProjectDetail />, '/projects/service-day');

    expect(screen.getByText('Project record')).toBeInTheDocument();
    expect(screen.getAllByText('100 people reached')).toHaveLength(1);
    await waitFor(() =>
      expect(
        document.querySelector('meta[name="description"]')
      ).toHaveAttribute('content', '100 people reached')
    );
    expect(screen.getByText('Partner One')).toBeInTheDocument();
    expect(
      screen.queryByRole('img', { name: /project record/ })
    ).not.toBeInTheDocument();
    outcome.unmount();

    useProjectBySlug.mockReturnValue({
      data: detailProject({
        shortDescription: 'Project service-day',
        impact: '',
        image: '',
        highlights: [],
        gallery: [],
        partnerLinks: [],
        partners: [],
      }),
      isLoading: false,
      isError: false,
    });
    renderRoute(<ProjectDetail />, '/projects/service-day');
    await waitFor(() =>
      expect(
        document.querySelector('meta[name="description"]')
      ).toHaveAttribute(
        'content',
        'Published project record from the club archive.'
      )
    );
  });
});
