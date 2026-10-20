import { screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../../test/render';

describe('open membership season', () => {
  afterEach(() => {
    vi.doUnmock('@/config/membership');
    vi.resetModules();
  });

  it('shows the application notice in the page and navigation', async () => {
    vi.doMock('@/config/membership', () => ({
      APPLICATIONS_OPEN: true,
      MEMBERSHIP_APPLICATION_FORM: 'https://forms.test/apply',
    }));
    const [{ default: Join }, { default: Navbar }] = await Promise.all([
      import('./Join'),
      import('../layout/Navbar'),
    ]);

    renderRoute(
      <>
        <Navbar />
        <Join />
      </>
    );

    expect(
      screen.getByRole('heading', { name: 'Membership applications are open' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /Open the application form/ })
    ).toHaveAttribute('href', 'https://forms.test/apply');
    expect(
      screen.getByRole('navigation', { name: 'Primary navigation' })
    ).toHaveTextContent('Applications open');
  });
});
