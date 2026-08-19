import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const getEntries = vi.hoisted(() => vi.fn());
const createClient = vi.hoisted(() => vi.fn(() => ({ getEntries })));
vi.mock('contentful', () => ({ createClient }));

describe('Contentful client wrapper', () => {
  beforeEach(() => {
    getEntries.mockReset();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => vi.unstubAllEnvs());

  it('returns entry items', async () => {
    const { fetchEntries } = await import('./contentfulClient');
    getEntries.mockResolvedValue({ items: [{ sys: { id: 'entry-1' } }] });

    await expect(fetchEntries()).resolves.toEqual([{ sys: { id: 'entry-1' } }]);
    expect(createClient).toHaveBeenCalledWith(
      expect.objectContaining({ environment: 'master' })
    );
  });

  it('returns an empty list when Contentful fails', async () => {
    const { fetchEntries } = await import('./contentfulClient');
    getEntries.mockRejectedValue(new Error('network error'));

    await expect(fetchEntries()).resolves.toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it('uses the configured Contentful environment', async () => {
    vi.stubEnv('VITE_CONTENTFUL_ENVIRONMENT', 'staging');
    vi.resetModules();

    await import('./contentfulClient');

    expect(createClient).toHaveBeenLastCalledWith(
      expect.objectContaining({ environment: 'staging' })
    );
  });

  it('defaults to the master environment when the setting is blank', async () => {
    vi.stubEnv('VITE_CONTENTFUL_ENVIRONMENT', '');
    vi.resetModules();

    await import('./contentfulClient');

    expect(createClient).toHaveBeenLastCalledWith(
      expect.objectContaining({ environment: 'master' })
    );
  });
});
