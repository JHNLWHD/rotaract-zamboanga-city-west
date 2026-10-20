import { act, render, screen } from '@testing-library/react';
import { renderToString } from 'react-dom/server';
import { hydrateRoot } from 'react-dom/client';
import { expect, it, vi } from 'vitest';
import { RenderTimeContext, useRenderTime } from './useRenderTime';

const Clock = () => <p>{useRenderTime()}</p>;

it('hydrates the snapshot time before showing the visit time', async () => {
  const errors = vi.spyOn(console, 'error').mockImplementation(() => undefined);
  vi.spyOn(Date, 'now').mockReturnValue(2000);
  const app = (
    <RenderTimeContext.Provider value={1000}>
      <Clock />
    </RenderTimeContext.Provider>
  );
  const container = document.createElement('div');
  container.innerHTML = renderToString(app);
  expect(container.textContent).toBe('1000');
  document.body.append(container);
  let root: ReturnType<typeof hydrateRoot>;
  await act(async () => {
    root = hydrateRoot(container, app);
  });
  expect(container.textContent).toBe('2000');
  expect(errors.mock.calls.flat().join(' ')).not.toMatch(
    /hydration|did not match/i
  );
  act(() => root.unmount());
  container.remove();
});

it('uses visit time when no snapshot exists', () => {
  vi.spyOn(Date, 'now').mockReturnValue(3000);
  render(<Clock />);
  expect(screen.getByText('3000')).toBeInTheDocument();
});
