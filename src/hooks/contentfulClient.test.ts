import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const getEntries = vi.hoisted(() => vi.fn());
const createClient = vi.hoisted(() => vi.fn(() => ({ getEntries })));
vi.mock('contentful', () => ({ createClient }));

describe('Contentful client wrapper', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.stubEnv('DEV', true);
    vi.stubEnv('MODE', 'development');
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

  it('uses draft entries and assets only in the explicit local preview mode', async () => {
    vi.stubEnv('MODE', 'drafts');
    vi.stubEnv('VITE_CONTENTFUL_PREVIEW_TOKEN', 'preview-test-token');

    await import('./contentfulClient');

    expect(createClient).toHaveBeenLastCalledWith(
      expect.objectContaining({
        host: 'preview.contentful.com',
        accessToken: 'preview-test-token',
      })
    );
  });

  it.each([
    [true, 'development'],
    [true, 'production'],
    [false, 'drafts'],
    [false, 'production'],
  ])('keeps published content when DEV=%s and MODE=%s', async (dev, mode) => {
    vi.stubEnv('DEV', dev);
    vi.stubEnv('MODE', mode);
    vi.stubEnv('VITE_CONTENTFUL_PREVIEW_TOKEN', 'preview-test-token');
    vi.stubEnv('VITE_CONTENTFUL_DELIVERY_TOKEN', 'delivery-test-token');

    await import('./contentfulClient');

    expect(createClient).toHaveBeenLastCalledWith(
      expect.objectContaining({
        host: 'cdn.contentful.com',
        accessToken: 'delivery-test-token',
      })
    );
  });

  it('fails clearly when preview access is missing instead of showing published content', async () => {
    vi.stubEnv('MODE', 'drafts');
    vi.stubEnv('VITE_CONTENTFUL_PREVIEW_TOKEN', '');

    await expect(import('./contentfulClient')).rejects.toThrow(
      'Draft preview requires VITE_CONTENTFUL_PREVIEW_TOKEN'
    );
  });

  it.each(['', 'review-env'])(
    'uses server-only preview access for records in environment %s while other sections stay published',
    async environment => {
      vi.stubEnv('MODE', 'draft-review');
      vi.stubEnv('SSR', true);
      vi.stubEnv('VITE_CONTENTFUL_ENVIRONMENT', environment);
      vi.stubEnv('CONTENTFUL_PREVIEW_TOKEN', 'server-preview-token');
      vi.stubEnv('VITE_CONTENTFUL_DELIVERY_TOKEN', 'delivery-test-token');
      const { default: contentful } = await import('./contentfulClient');

      expect(createClient).toHaveBeenCalledWith(
        expect.objectContaining({
          host: 'cdn.contentful.com',
          accessToken: 'delivery-test-token',
        })
      );
      expect(createClient).toHaveBeenLastCalledWith(
        expect.objectContaining({
          host: 'preview.contentful.com',
          accessToken: 'server-preview-token',
          environment: environment || 'master',
        })
      );
      expect(contentful.recordClient).not.toBe(contentful.client);
    }
  );

  it('never uses server preview access in the hosted review browser', async () => {
    vi.stubEnv('MODE', 'draft-review');
    vi.stubEnv('SSR', false);
    vi.stubEnv('CONTENTFUL_PREVIEW_TOKEN', 'server-preview-token');
    const { default: contentful } = await import('./contentfulClient');
    expect(createClient).toHaveBeenLastCalledWith(
      expect.objectContaining({ host: 'cdn.contentful.com' })
    );
    expect(contentful.recordClient).toBe(contentful.client);
  });

  it('stops a draft review build when server preview access is missing', async () => {
    vi.stubEnv('MODE', 'draft-review');
    vi.stubEnv('SSR', true);
    vi.stubEnv('CONTENTFUL_PREVIEW_TOKEN', '');
    await expect(import('./contentfulClient')).rejects.toThrow(
      'Draft review builds require CONTENTFUL_PREVIEW_TOKEN'
    );
  });
});
