import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../test/render';
import NotFound from './NotFound';

describe('NotFound', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('records the missing route and offers recovery paths', async () => {
    const back = vi
      .spyOn(window.history, 'back')
      .mockImplementation(() => undefined);
    const { user } = renderRoute(<NotFound />, '/missing-page');

    expect(console.error).toHaveBeenCalledWith(
      '404 Error: User attempted to access non-existent route:',
      '/missing-page'
    );
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Community Impact' })
    ).toHaveAttribute('href', '/projects');
    await waitFor(() => expect(document.title).toContain('Page Not Found'));

    await user.click(screen.getByRole('button', { name: /Go Back/ }));
    expect(back).toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: /Return to Home/ }));
    expect(window.location.pathname).toBe('/');
  });
});
