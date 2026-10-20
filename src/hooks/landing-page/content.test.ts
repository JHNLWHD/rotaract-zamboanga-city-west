import { beforeEach, describe, expect, it, vi } from 'vitest';

const client = vi.hoisted(() => ({
  getEntries: vi.fn(),
  getEntry: vi.fn(),
  getAsset: vi.fn(),
}));
vi.mock('../contentfulClient', () => ({ default: { client } }));

import { fetchAboutCommunity } from './aboutCommunity';
import { fetchAllAwards, fetchAwards } from './awardsSection';
import { fetchHeroContent } from './heroSection';

const link = (id: string) => ({ sys: { id } });
const award = (overrides: Record<string, unknown> = {}) => ({
  fields: {
    name: 'Outstanding Club',
    shortDescription: 'District recognition',
    description: 'Award details',
    icon: 'trophy',
    yearReceived: '2026',
    issuingOrganization: 'Rotary District 3850',
    sourceUrl: 'https://example.com/source',
    color: 'cranberry',
    dateReceived: '2026-07-01',
    isFeatured: true,
    image: link('certificate'),
    ...overrides,
  },
});

describe('homepage Contentful fetchers', () => {
  beforeEach(() => {
    client.getEntries.mockReset();
    client.getEntry.mockReset();
    client.getAsset.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  it('maps hero copy and linked statistics', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        {
          fields: {
            badgeText: 'Official record',
            subTitle: 'Local service',
            stats: [link('stat-1')],
          },
        },
      ],
    });
    client.getEntry.mockResolvedValue({
      fields: { value: '15', description: 'Years of service' },
    });

    await expect(fetchHeroContent()).resolves.toEqual({
      badgeText: 'Official record',
      subTitle: 'Local service',
      stats: [{ value: '15', description: 'Years of service' }],
    });
  });

  it('maps hero copy without optional statistics', async () => {
    client.getEntries.mockResolvedValue({
      items: [{ fields: { badgeText: 'Official record', stats: undefined } }],
    });

    await expect(fetchHeroContent()).resolves.toEqual({
      badgeText: 'Official record',
      subTitle: undefined,
      stats: [],
    });
  });

  it('handles an empty or unavailable hero entry', async () => {
    client.getEntries.mockResolvedValueOnce({ items: [] });
    await expect(fetchHeroContent()).resolves.toBeNull();
    expect(console.warn).toHaveBeenCalled();

    client.getEntries.mockRejectedValueOnce(new Error('query failed'));
    await expect(fetchHeroContent()).rejects.toThrow('query failed');
    expect(console.error).toHaveBeenCalled();
  });

  it('maps the about story, linked stats, and image', async () => {
    client.getEntries.mockResolvedValue({
      items: [
        {
          fields: {
            stats: [link('stat-1'), link('stat-2')],
            ourStory: 'The Great West story',
            image: link('community'),
          },
        },
      ],
    });
    client.getEntry
      .mockResolvedValueOnce({
        fields: { value: '15', description: 'Years', icon: 'calendar' },
      })
      .mockResolvedValueOnce({
        fields: { value: undefined, description: undefined, icon: undefined },
      });
    client.getAsset.mockResolvedValue({
      fields: {
        file: { url: '//images.test/community.jpg' },
        title: 'Club members',
        description: 'Members serving together',
      },
    });

    await expect(fetchAboutCommunity()).resolves.toEqual({
      stats: [
        { value: '15', description: 'Years', icon: 'calendar' },
        { value: '', description: '', icon: '' },
      ],
      ourStory: 'The Great West story',
      image: {
        url: 'https://images.test/community.jpg',
        title: 'Club members',
        description: 'Members serving together',
      },
    });
  });

  it('maps an about entry without optional data', async () => {
    client.getEntries.mockResolvedValue({
      items: [{ fields: { stats: undefined, ourStory: undefined } }],
    });

    await expect(fetchAboutCommunity()).resolves.toEqual({
      stats: [],
      ourStory: '',
      image: undefined,
    });
  });

  it('handles an image without a file URL and unavailable about entries', async () => {
    client.getEntries.mockResolvedValueOnce({
      items: [{ fields: { stats: [], image: link('empty') } }],
    });
    client.getAsset.mockResolvedValueOnce({ fields: {} });
    await expect(fetchAboutCommunity()).resolves.toEqual(
      expect.objectContaining({
        image: { url: '', title: '', description: '' },
      })
    );

    client.getEntries.mockResolvedValueOnce({ items: [] });
    await expect(fetchAboutCommunity()).resolves.toBeNull();

    client.getEntries.mockRejectedValueOnce(new Error('query failed'));
    await expect(fetchAboutCommunity()).rejects.toThrow('query failed');
  });

  it('maps homepage awards with image and field defaults', async () => {
    client.getEntries.mockResolvedValue({
      items: [{ fields: { cards: [link('award-1'), link('award-2')] } }],
    });
    client.getEntry.mockResolvedValueOnce(award()).mockResolvedValueOnce(
      award({
        name: undefined,
        shortDescription: undefined,
        description: undefined,
        icon: undefined,
        yearReceived: undefined,
        issuingOrganization: undefined,
        sourceUrl: undefined,
        color: undefined,
        dateReceived: undefined,
        isFeatured: undefined,
        image: undefined,
      })
    );
    client.getAsset.mockResolvedValue({
      fields: {
        file: { url: '//images.test/certificate.jpg' },
        title: 'Certificate',
        description: 'Award certificate',
      },
    });

    const result = await fetchAwards();

    expect(result?.awards[0]).toEqual(
      expect.objectContaining({
        name: 'Outstanding Club',
        image: {
          url: '//images.test/certificate.jpg',
          title: 'Certificate',
          description: 'Award certificate',
        },
      })
    );
    expect(result?.awards[1]).toEqual(
      expect.objectContaining({
        name: '',
        icon: 'award',
        color: 'blue',
        isFeatured: false,
        image: { url: '', title: '', description: '' },
      })
    );
  });

  it('handles empty and unavailable homepage awards', async () => {
    client.getEntries.mockResolvedValueOnce({ items: [] });
    await expect(fetchAwards()).resolves.toBeNull();

    client.getEntries.mockRejectedValueOnce(new Error('query failed'));
    await expect(fetchAwards()).resolves.toBeNull();
  });

  it('maps awards when cards or asset files are missing', async () => {
    client.getEntries.mockResolvedValueOnce({
      items: [{ fields: { cards: undefined } }],
    });
    await expect(fetchAwards()).resolves.toEqual({ awards: [] });

    client.getEntries.mockResolvedValueOnce({
      items: [{ fields: { cards: [link('award-1')] } }],
    });
    client.getEntry.mockResolvedValueOnce(award());
    client.getAsset.mockResolvedValueOnce({ fields: {} });

    await expect(fetchAwards()).resolves.toEqual({
      awards: [
        expect.objectContaining({
          image: { url: '', title: undefined, description: undefined },
        }),
      ],
    });
  });

  it('maps all awards and rethrows archive failures', async () => {
    client.getEntries.mockResolvedValueOnce({
      items: [award({ image: undefined })],
    });

    await expect(fetchAllAwards()).resolves.toEqual({
      awards: [expect.objectContaining({ name: 'Outstanding Club' })],
    });
    expect(client.getEntries).toHaveBeenCalledWith({
      content_type: 'cardsAwards',
      order: '-fields.dateReceived',
    });

    client.getEntries.mockRejectedValueOnce(new Error('query failed'));
    await expect(fetchAllAwards()).rejects.toThrow('query failed');
  });
});
