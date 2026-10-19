import { expect, it } from 'vitest';
import { prepareDraftReviewEnvironment } from './build-draft-review';

it('allows local checks and develop branch builds with server-side credentials', () => {
  expect(() =>
    prepareDraftReviewEnvironment({ CONTENTFUL_PREVIEW_TOKEN: 'test' })
  ).not.toThrow();
  expect(() =>
    prepareDraftReviewEnvironment({
      CONTENTFUL_PREVIEW_TOKEN: 'test',
      NETLIFY: 'true',
      CONTEXT: 'branch-deploy',
      BRANCH: 'develop',
    })
  ).not.toThrow();
});

it.each([undefined, 'server-token'])(
  'removes the legacy Vite key while preserving server token precedence (%s)',
  serverToken => {
    const env = {
      CONTENTFUL_PREVIEW_TOKEN: serverToken,
      VITE_CONTENTFUL_PREVIEW_TOKEN: 'legacy-token',
    };
    prepareDraftReviewEnvironment(env);
    expect(env.CONTENTFUL_PREVIEW_TOKEN).toBe(serverToken || 'legacy-token');
    expect(env).not.toHaveProperty('VITE_CONTENTFUL_PREVIEW_TOKEN');
  }
);

it('rejects missing access, production, and other hosted contexts', () => {
  expect(() => prepareDraftReviewEnvironment({})).toThrow(
    'CONTENTFUL_PREVIEW_TOKEN'
  );
  for (const context of [
    { CONTEXT: 'production' },
    { NETLIFY: 'true', CONTEXT: 'branch-deploy', BRANCH: 'main' },
    { NETLIFY: 'true', CONTEXT: 'deploy-preview', BRANCH: 'develop' },
  ]) {
    expect(() =>
      prepareDraftReviewEnvironment({
        CONTENTFUL_PREVIEW_TOKEN: 'test',
        ...context,
      })
    ).toThrow();
  }
});
