import { expect, it, vi } from 'vitest';
import { execFileSync } from 'node:child_process';

it.each([
  [
    'branch-deploy',
    'https://develop--club.netlify.app',
    'https://develop--club.netlify.app',
  ],
  [
    'deploy-preview',
    'https://deploy-preview-16--club.netlify.app',
    'https://deploy-preview-16--club.netlify.app',
  ],
  [
    'production',
    'https://club.netlify.app',
    'https://rotaract.rotaryzcwest.org',
  ],
  [undefined, undefined, 'https://rotaract.rotaryzcwest.org'],
  ['branch-deploy', undefined, 'https://rotaract.rotaryzcwest.org'],
])('sets the social image origin for %s builds', (context, url, expected) => {
  vi.stubEnv('CONTEXT', context);
  vi.stubEnv('DEPLOY_PRIME_URL', url);
  const output = execFileSync(
    process.execPath,
    [
      '--input-type=module',
      '-e',
      `
      import { loadConfigFromFile } from 'vite';
      const { config } = await loadConfigFromFile(
        { command: 'build', mode: 'production' }, 'vite.config.ts', undefined, 'silent'
      );
      process.stdout.write(config.define['import.meta.env.VITE_OG_IMAGE_ORIGIN']);
    `,
    ],
    { encoding: 'utf8' }
  );
  expect(JSON.parse(output)).toBe(expected);
});
