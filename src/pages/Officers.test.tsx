import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../test/render';
import Officers from './Officers';

const { useOfficers, usePastPresidents } = vi.hoisted(() => ({
  useOfficers: vi.fn(),
  usePastPresidents: vi.fn(),
}));
vi.mock('../hooks/officers/useOfficers', () => ({
  useOfficers,
  usePastPresidents,
}));

const officer = (id: string, overrides: Record<string, unknown> = {}) => ({
  id,
  name: `Officer ${id}`,
  position: 'Director',
  term: '2026-2027',
  responsibilities: 'Club work',
  category: 'Director',
  email: 'private@example.com',
  phone: '09170000000',
  profileImage: 'https://images.test/officer.jpg',
  displayOrder: 1,
  ...overrides,
});

const hookState = (overrides: Record<string, unknown> = {}) => ({
  data: undefined,
  isLoading: false,
  isLoadingError: false,
  isFetching: false,
  refetch: vi.fn().mockResolvedValue(undefined),
  ...overrides,
});

describe('Officers', () => {
  beforeEach(() => {
    useOfficers.mockReset();
    usePastPresidents.mockReset();
  });

  it('loads until both current and presidential records settle', () => {
    useOfficers.mockReturnValue(hookState({ isLoading: true }));
    usePastPresidents.mockReturnValue(hookState());
    renderRoute(<Officers />, '/officers');
    expect(screen.getByText('Loading officer records…')).toBeInTheDocument();
  });

  it('retries both record sources after an error', async () => {
    const refetchOfficers = vi.fn().mockResolvedValue(undefined);
    const refetchPresidents = vi.fn().mockResolvedValue(undefined);
    useOfficers.mockReturnValue(
      hookState({ isLoadingError: true, refetch: refetchOfficers })
    );
    usePastPresidents.mockReturnValue(
      hookState({ refetch: refetchPresidents })
    );
    const { user } = renderRoute(<Officers />, '/officers');

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Officer records are temporarily unavailable.'
    );
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(refetchOfficers).toHaveBeenCalled();
    expect(refetchPresidents).toHaveBeenCalled();
  });

  it('disables retry while either source is fetching', () => {
    useOfficers.mockReturnValue(hookState({ isLoadingError: true }));
    usePastPresidents.mockReturnValue(hookState({ isFetching: true }));
    renderRoute(<Officers />, '/officers');
    expect(
      screen.getByRole('button', { name: 'Trying again…' })
    ).toBeDisabled();
  });

  it('renders grouped public leadership and presidential status labels', () => {
    useOfficers.mockReturnValue(
      hookState({
        data: {
          executive: [
            officer('president', {
              name: 'Jamie Cruz',
              position: 'President',
              category: 'Executive',
            }),
          ],
          directors: [
            officer('one'),
            officer('two', { profileImage: undefined }),
          ],
          advisors: [officer('advisor', { category: 'Advisor' })],
        },
      })
    );
    usePastPresidents.mockReturnValue(
      hookState({
        data: [
          {
            id: 'current',
            term: '2026-2027',
            name: 'Jamie Cruz',
            status: 'current',
          },
          {
            id: 'elect',
            term: '2027-2028',
            name: 'Alex Reyes',
            status: 'president_elect',
          },
          {
            id: 'future',
            term: '2028-2029',
            name: 'Sam Lee',
            status: 'future',
          },
          { id: 'past', term: '2025-2026', name: 'Taylor Lim' },
        ],
      })
    );

    renderRoute(<Officers />, '/officers');

    expect(screen.getAllByText('1 officer')).toHaveLength(2);
    expect(screen.getByText('2 officers')).toBeInTheDocument();
    expect(screen.getByText('Current term')).toBeInTheDocument();
    expect(screen.getByText('President-elect')).toBeInTheDocument();
    expect(screen.getByText('President-nominee')).toBeInTheDocument();
    expect(screen.getByText('4 terms')).toBeInTheDocument();
    expect(screen.queryByText('private@example.com')).not.toBeInTheDocument();
    expect(screen.queryByText('09170000000')).not.toBeInTheDocument();
    expect(document.title).toBe(
      'Officers | Rotaract Club of Zamboanga City West'
    );
  });

  it('omits leadership groups without published officers', () => {
    useOfficers.mockReturnValue(
      hookState({
        data: {
          executive: [officer('president', { category: 'Executive' })],
          directors: [],
          advisors: [],
        },
      })
    );
    usePastPresidents.mockReturnValue(hookState({ data: [] }));

    renderRoute(<Officers />, '/officers');

    expect(
      screen.getByRole('heading', { name: 'Executive board' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Directors' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Club advisors' })
    ).not.toBeInTheDocument();
  });

  it('publishes an explicit empty current roster without inventing leaders', () => {
    useOfficers.mockReturnValue(hookState({ data: null }));
    usePastPresidents.mockReturnValue(hookState({ data: [] }));
    renderRoute(<Officers />, '/officers');
    expect(
      screen.getByText('No current officer records have been published yet.')
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: 'Presidential record' })
    ).not.toBeInTheDocument();
  });
});
