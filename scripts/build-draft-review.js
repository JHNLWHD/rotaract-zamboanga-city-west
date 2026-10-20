import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import assert from 'node:assert/strict';

export function prepareDraftReviewEnvironment(env) {
  const previewToken =
    env.CONTENTFUL_PREVIEW_TOKEN || env.VITE_CONTENTFUL_PREVIEW_TOKEN;
  assert(previewToken, 'CONTENTFUL_PREVIEW_TOKEN is required.');
  assert(
    env.CONTEXT !== 'production',
    'Draft review cannot build in production.'
  );
  if (env.NETLIFY === 'true') {
    assert.equal(
      env.CONTEXT,
      'branch-deploy',
      'Use the develop branch deploy.'
    );
    assert.equal(
      env.BRANCH,
      'develop',
      'Draft review is restricted to develop.'
    );
  }
  // Reuse the host's existing key without exposing it through Vite's env prefix.
  env.CONTENTFUL_PREVIEW_TOKEN = previewToken;
  delete env.VITE_CONTENTFUL_PREVIEW_TOKEN;
}

async function buildDraftReview() {
  prepareDraftReviewEnvironment(process.env);
  const { build } = await import('vite');
  await build({ mode: 'draft-review' });
  await copyFile('public/robots.dev.txt', 'dist/robots.txt');
  await copyFile('public/_headers.dev', 'dist/_headers');
  const rendered = spawnSync(
    process.execPath,
    ['scripts/prerender.js', '--draft-review'],
    {
      env: { ...process.env, NODE_ENV: 'development' },
      stdio: 'inherit',
    }
  );
  assert.equal(rendered.status, 0, 'Draft review prerender failed.');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildDraftReview().catch(error => {
    console.error('Draft review build failed:', error.message);
    process.exitCode = 1;
  });
}
