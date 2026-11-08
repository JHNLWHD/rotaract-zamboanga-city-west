import { afterEach, describe, expect, it, vi } from 'vitest';

describe('membership configuration', () => {
  afterEach(() => vi.resetModules());

  it.each([
    ['true', true],
    ['false', false],
    [undefined, false],
  ])('maps %s to %s', async (value, expected) => {
    vi.stubEnv('VITE_MEMBERSHIP_APPLICATIONS_OPEN', value);

    const config = await import('./membership');

    expect(config.APPLICATIONS_OPEN).toBe(expected);
    expect(config.MEMBERSHIP_APPLICATION_FORM).toMatch(
      /^https:\/\/forms\.gle\//
    );
  });
});
