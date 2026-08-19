import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../test/render';
import Recognition from './Recognition';

const fetchAllAwards = vi.hoisted(() => vi.fn());
vi.mock('../hooks/landing-page/awardsSection', () => ({ fetchAllAwards }));

describe('Recognition', () => {
  beforeEach(() => fetchAllAwards.mockReset());

  it('shows loading until the archive arrives', async () => {
    let resolveAwards: (value: unknown) => void = () => undefined;
    fetchAllAwards.mockReturnValue(
      new Promise(resolve => {
        resolveAwards = resolve;
      })
    );
    renderRoute(<Recognition />, '/recognition');
    expect(
      screen.getByText('Loading recognition records…')
    ).toBeInTheDocument();
    resolveAwards({ awards: [] });
    expect(
      await screen.findByText('No recognition records have been published yet.')
    ).toBeInTheDocument();
  });

  it('shows an error and retries', async () => {
    fetchAllAwards
      .mockRejectedValueOnce(new Error('Archive unavailable'))
      .mockResolvedValueOnce({ awards: [] });
    const { user } = renderRoute(<Recognition />, '/recognition');
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Recognition records are temporarily unavailable.'
    );
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    await waitFor(() => expect(fetchAllAwards).toHaveBeenCalledTimes(2));
    expect(
      await screen.findByText('No recognition records have been published yet.')
    ).toBeInTheDocument();
  });

  it('renders published evidence, descriptions, and source links', async () => {
    fetchAllAwards.mockResolvedValue({
      awards: [
        {
          name: 'Outstanding Club',
          shortDescription: 'District recognition',
          description: '',
          yearReceived: '2026',
          dateReceived: '2026-07-01',
          issuingOrganization: 'Rotary District 3850',
          sourceUrl: 'https://example.com/source',
          image: {
            url: '//images.test/certificate.jpg',
            description: 'Outstanding Club certificate',
          },
        },
        {
          name: 'Service Citation',
          shortDescription: '',
          description: 'For **documented service**.',
          yearReceived: '2025',
          dateReceived: '',
          issuingOrganization: '',
          sourceUrl: '',
          image: { url: 'https://images.test/citation.jpg', description: '' },
        },
      ],
    });

    renderRoute(<Recognition />, '/recognition');

    expect(
      await screen.findByRole('heading', { name: 'Outstanding Club' })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Issued by Rotary District 3850')
    ).toBeInTheDocument();
    expect(screen.getByText('District recognition')).toBeInTheDocument();
    expect(screen.getByText('documented service')).toHaveProperty(
      'tagName',
      'STRONG'
    );
    expect(
      screen.getByRole('link', { name: /View published source/ })
    ).toHaveAttribute('href', 'https://example.com/source');
    expect(
      screen.getByRole('img', { name: 'Outstanding Club certificate' })
    ).toHaveAttribute('src', 'https://images.test/certificate.jpg');
    expect(
      screen.getByRole('img', {
        name: 'Service Citation certificate or recognition',
      })
    ).toBeInTheDocument();
    expect(document.title).toBe(
      'Recognition | Rotaract Club of Zamboanga City West'
    );
  });
});
