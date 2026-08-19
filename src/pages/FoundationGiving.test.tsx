import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../test/render';
import FoundationGiving from './FoundationGiving';

const useFoundationGiving = vi.hoisted(() => vi.fn());
vi.mock('../hooks/foundationGiving/useFoundationGiving', () => ({
  useFoundationGiving,
}));

const state = (overrides: Record<string, unknown> = {}) => ({
  data: undefined,
  isLoading: false,
  isError: false,
  error: undefined,
  refetch: vi.fn(),
  isFetching: false,
  ...overrides,
});

const report = (overrides: Record<string, unknown> = {}) => ({
  reportTitle: 'Five-year club giving',
  subtitle: 'Official Rotary Foundation record',
  currencyLabel: 'USD',
  asOfDate: '2026-04-10',
  rows: [
    {
      rotaryYearLabel: 'RY 2024-2025',
      sortOrder: 4,
      annualFund: 0,
      polioPlusFund: 220,
      otherFund: 0,
      endowmentFund: 0,
      totalFund: 220,
    },
    {
      rotaryYearLabel: 'RY 2025-2026',
      sortOrder: 5,
      annualFund: 0,
      polioPlusFund: 100,
      otherFund: 725,
      endowmentFund: 0,
      totalFund: 825,
    },
  ],
  faq: {
    annualFund:
      '# Annual overview\n\n- Sustains programs\n- [External source](https://rotary.org)',
    polioPlus: '## Polio overview\n\n1. Vaccination support',
    other: '### Other overview\n\n[Internal note](/projects)',
    endowment: '   ',
  },
  ...overrides,
});

describe('FoundationGiving', () => {
  beforeEach(() => useFoundationGiving.mockReset());

  it('shows the loading record', () => {
    useFoundationGiving.mockReturnValue(state({ isLoading: true }));
    const { container } = renderRoute(
      <FoundationGiving />,
      '/foundation-giving'
    );
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows an Error message and retries', async () => {
    const refetch = vi.fn();
    useFoundationGiving.mockReturnValue(
      state({ isError: true, error: new Error('Report unavailable'), refetch })
    );
    const { user } = renderRoute(<FoundationGiving />, '/foundation-giving');
    expect(screen.getByRole('alert')).toHaveTextContent('Report unavailable');
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(refetch).toHaveBeenCalled();
  });

  it('shows the generic retrying error state', () => {
    useFoundationGiving.mockReturnValue(
      state({ isError: true, error: 'unavailable', isFetching: true })
    );
    renderRoute(<FoundationGiving />, '/foundation-giving');
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Please try again later.'
    );
    expect(
      screen.getByRole('button', { name: 'Trying again…' })
    ).toBeDisabled();
  });

  it('states when no report has been published', () => {
    useFoundationGiving.mockReturnValue(state({ data: null }));
    renderRoute(<FoundationGiving />, '/foundation-giving');
    expect(
      screen.getByText('No foundation giving report is published yet.')
    ).toBeInTheDocument();
  });

  it('renders responsive figures, report date, and safe FAQ Markdown', () => {
    useFoundationGiving.mockReturnValue(state({ data: report() }));
    renderRoute(<FoundationGiving />, '/foundation-giving');

    expect(screen.getByText('Report as of April 10, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('RY 2025-2026')).toHaveLength(2);
    expect(screen.getAllByText('$825.00')).toHaveLength(2);
    expect(screen.getAllByText('$0.00')).toHaveLength(10);
    expect(
      screen.getByRole('heading', { name: 'Annual overview' })
    ).toHaveProperty('tagName', 'H4');
    expect(
      screen.getByRole('heading', { name: 'Polio overview' })
    ).toHaveProperty('tagName', 'H4');
    expect(
      screen.getByRole('heading', { name: 'Other overview' })
    ).toHaveProperty('tagName', 'H5');
    expect(
      screen.getByRole('link', { name: 'External source' })
    ).toHaveAttribute('target', '_blank');
    expect(
      screen.getByRole('link', { name: 'Internal note' })
    ).not.toHaveAttribute('target');
    expect(document.title).toContain('The Rotary Foundation Giving');
  });

  it('preserves an invalid published date instead of crashing', () => {
    useFoundationGiving.mockReturnValue(
      state({
        data: report({
          asOfDate: 'date pending',
          rows: [],
          faq: { annualFund: '', polioPlus: '', other: '', endowment: '' },
        }),
      })
    );
    renderRoute(<FoundationGiving />, '/foundation-giving');
    expect(screen.getByText('Report as of date pending')).toBeInTheDocument();
    expect(screen.getByText(/As of date pending/)).toBeInTheDocument();
  });

  it('omits an unpublished report date', () => {
    useFoundationGiving.mockReturnValue(
      state({
        data: report({
          asOfDate: '',
          rows: [],
          faq: { annualFund: '', polioPlus: '', other: '', endowment: '' },
        }),
      })
    );

    renderRoute(<FoundationGiving />, '/foundation-giving');

    expect(screen.queryByText(/Report as of/)).not.toBeInTheDocument();
    expect(screen.getByText('All amounts in USD.')).toBeInTheDocument();
  });
});
