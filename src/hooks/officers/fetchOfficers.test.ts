import { beforeEach, describe, expect, it, vi } from 'vitest';

const client = vi.hoisted(() => ({ getEntries: vi.fn(), getAsset: vi.fn() }));
vi.mock('../contentfulClient', () => ({ default: { client } }));

import {
  fetchAdvisors,
  fetchAllOfficers,
  fetchCurrentOfficers,
  fetchDirectors,
  fetchExecutiveBoard,
  fetchOfficers,
  fetchPastPresidents,
} from './fetchOfficers';

const officer = (overrides: Record<string, unknown> = {}) => ({
  sys: { id: 'officer-1' },
  fields: {
    name: 'Alex Rivera',
    position: 'President',
    term: '2026-2027',
    responsibilities: 'Leads the club',
    category: 'Executive',
    email: 'private@example.com',
    phone: '09170000000',
    profileImage: { sys: { id: 'portrait' } },
    socialMediaLinks: { facebook: 'https://facebook.com/alex' },
    displayOrder: 1,
    ...overrides,
  },
});

describe('officer Contentful fetchers', () => {
  beforeEach(() => {
    client.getEntries.mockReset();
    client.getAsset.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  it('queries and maps officers with optional media', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        officer(),
        officer({
          name: undefined,
          position: undefined,
          term: undefined,
          responsibilities: undefined,
          category: undefined,
          profileImage: undefined,
          socialMediaLinks: undefined,
          displayOrder: undefined,
        }),
      ],
    });
    client.getAsset.mockResolvedValue({
      fields: { file: { url: '//images.test/alex.jpg' } },
    });

    const result = await fetchOfficers('2026-2027', 'Executive');

    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'officer',
      order: 'fields.displayOrder',
      'fields.term': '2026-2027',
      'fields.category': 'Executive',
    });
    expect(result).toEqual([
      expect.objectContaining({
        name: 'Alex Rivera',
        profileImage: 'https://images.test/alex.jpg',
        socialMedia: { facebook: 'https://facebook.com/alex' },
      }),
      expect.objectContaining({
        name: '',
        position: '',
        term: '',
        responsibilities: '',
        category: 'Director',
        profileImage: undefined,
        displayOrder: 0,
      }),
    ]);
  });

  it('keeps an officer when the portrait fails', async () => {
    client.getEntries.mockResolvedValue({ items: [officer()] });
    client.getAsset.mockRejectedValue(new Error('asset unavailable'));

    await expect(fetchOfficers()).resolves.toEqual([
      expect.objectContaining({ name: 'Alex Rivera', profileImage: undefined }),
    ]);
    expect(console.warn).toHaveBeenCalled();
  });

  it('rethrows officer query failures', async () => {
    client.getEntries.mockRejectedValue(new Error('query failed'));

    await expect(fetchOfficers()).rejects.toThrow('query failed');
  });

  it('maps past presidents and defaults optional fields', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        {
          sys: { id: 'past-1' },
          fields: {
            term: '2025-2026',
            name: 'Jamie Cruz',
            status: 'current',
            displayOrder: 1,
          },
        },
        {
          sys: { id: 'past-2' },
          fields: {
            term: undefined,
            name: undefined,
            status: undefined,
            displayOrder: undefined,
          },
        },
      ],
    });

    const result = await fetchPastPresidents();

    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'pastPresident',
      order: 'fields.displayOrder',
    });
    expect(result).toEqual([
      {
        id: 'past-1',
        term: '2025-2026',
        name: 'Jamie Cruz',
        status: 'current',
        displayOrder: 1,
      },
      { id: 'past-2', term: '', name: '', status: undefined, displayOrder: 0 },
    ]);
  });

  it('rethrows past-president query failures', async () => {
    client.getEntries.mockRejectedValue(new Error('query failed'));

    await expect(fetchPastPresidents()).rejects.toThrow('query failed');
  });

  it('provides category and current-term shortcuts', async () => {
    client.getEntries.mockResolvedValue({ items: [] });

    await fetchExecutiveBoard('2026-2027');
    await fetchDirectors('2026-2027');
    await fetchAdvisors('2026-2027');
    await fetchCurrentOfficers();

    expect(client.getEntries.mock.calls.map(([query]) => query)).toEqual([
      expect.objectContaining({ 'fields.category': 'Executive' }),
      expect.objectContaining({ 'fields.category': 'Director' }),
      expect.objectContaining({ 'fields.category': 'Advisor' }),
      expect.objectContaining({ 'fields.term': '2026-2027' }),
    ]);
  });

  it('combines all officer categories', async () => {
    client.getEntries.mockImplementation(
      async (query: Record<string, string>) => ({
        items: [
          officer({
            category: query['fields.category'],
            profileImage: undefined,
          }),
        ],
      })
    );

    const result = await fetchAllOfficers('2026-2027');

    expect(result).toEqual({
      executive: [expect.objectContaining({ category: 'Executive' })],
      directors: [expect.objectContaining({ category: 'Director' })],
      advisors: [expect.objectContaining({ category: 'Advisor' })],
    });
  });

  it('rethrows combined category failures', async () => {
    client.getEntries.mockRejectedValue(new Error('query failed'));

    await expect(fetchAllOfficers()).rejects.toThrow('query failed');
  });
});
