import { afterEach, expect, it, vi } from 'vitest';
import { draftQuery } from './draftQuery';

afterEach(() => {
  vi.unstubAllEnvs();
  document.getElementById('page-state')?.remove();
});

it('keeps draft records during browser refresh without calling Contentful', async () => {
  vi.stubEnv('MODE', 'draft-review');
  vi.stubEnv('SSR', false);
  const state = document.createElement('script');
  state.id = 'page-state';
  state.type = 'application/json';
  state.textContent = JSON.stringify({
    queries: [
      {
        queryKey: ['project', 'service'],
        state: { status: 'success', data: { title: 'Draft service' } },
      },
    ],
  });
  document.body.appendChild(state);
  const fetchRecord = vi.fn();
  await expect(
    draftQuery(['project', 'service'], fetchRecord)()
  ).resolves.toEqual({ title: 'Draft service' });
  expect(fetchRecord).not.toHaveBeenCalled();
  await expect(draftQuery(['event', 'missing'], fetchRecord)()).rejects.toThrow(
    'missing from the draft review snapshot'
  );
  expect(fetchRecord).not.toHaveBeenCalled();
  state.remove();
  await expect(draftQuery(['projects'], fetchRecord)()).rejects.toThrow(
    'missing from the draft review snapshot'
  );
  expect(fetchRecord).not.toHaveBeenCalled();
});

it.each([
  ['production', false],
  ['development', false],
  ['drafts', false],
  ['draft-review', true],
])('uses the normal record loader in %s with SSR=%s', async (mode, ssr) => {
  vi.stubEnv('MODE', mode);
  vi.stubEnv('SSR', ssr);
  const fetchRecord = vi.fn().mockResolvedValue(['record']);
  await expect(draftQuery(['projects'], fetchRecord)()).resolves.toEqual([
    'record',
  ]);
  expect(fetchRecord).toHaveBeenCalledOnce();
});
