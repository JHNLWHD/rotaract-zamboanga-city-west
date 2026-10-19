import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { prepareDraftReviewEnvironment } from './build-draft-review';

it.each([
  ['branch-deploy', 'build:draft-review'],
  ['deploy-preview', 'build:dev'],
])('routes Netlify %s to %s', (context, build) => {
  const config = readFileSync('netlify.toml', 'utf8');
  const command = config.match(/\[context.develop\]\ncommand = '(.+)'/)?.[1];
  expect(command).toBeDefined();
  const output = execFileSync(
    'sh',
    ['-c', `npm() { printf '%s\\n' "$*"; }\n${command}`],
    { env: { ...process.env, CONTEXT: context }, encoding: 'utf8' }
  );
  expect(output.trim().split('\n')).toEqual([
    'run test:coverage',
    'run lint:check',
    `run ${build}`,
  ]);
});

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
