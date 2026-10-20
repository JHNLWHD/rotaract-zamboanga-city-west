import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { renderRoute } from '../../test/render';
import Footer from './Footer';
import Navbar from './Navbar';
import PageHeader from './PageHeader';

describe('shared page layout', () => {
  it('marks nested routes active and controls the mobile menu', async () => {
    const { user } = renderRoute(<Navbar />, '/projects/sample-project');

    const primary = screen.getByRole('navigation', {
      name: 'Primary navigation',
    });
    expect(primary.querySelector('a[aria-current="page"]')).toHaveTextContent(
      'Projects'
    );
    expect(screen.queryByText('Applications open')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    expect(
      screen.getByRole('navigation', { name: 'Mobile navigation' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );

    await user.click(
      screen
        .getByRole('navigation', { name: 'Mobile navigation' })
        .querySelector('a[href="/events"]')!
    );
    expect(
      screen.queryByRole('navigation', { name: 'Mobile navigation' })
    ).not.toBeInTheDocument();
  });

  it('only marks Home active at the root', () => {
    renderRoute(<Navbar />);

    const current = screen
      .getByRole('navigation', { name: 'Primary navigation' })
      .querySelector('a[aria-current="page"]');
    expect(current).toHaveTextContent('Home');
  });

  it('publishes the institutional footer record and navigation', () => {
    renderRoute(<Footer />);

    expect(screen.getByText(/Club ID 88047/)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Foundation giving' })
    ).toHaveAttribute('href', '/foundation-giving');
    expect(
      screen.getByRole('link', { name: 'Sponsoring Rotary club' })
    ).toHaveAttribute('href', 'https://rotaryzcwest.org/');
  });

  it('renders page record context with an optional date', () => {
    const { rerender } = renderRoute(
      <PageHeader
        eyebrow="Financial record"
        title="Foundation giving"
        description="Published figures"
        asOf="As of April 10, 2026"
      />
    );

    expect(
      screen.getByRole('heading', { name: 'Foundation giving' })
    ).toBeInTheDocument();
    expect(screen.getByText('As of April 10, 2026')).toBeInTheDocument();

    rerender(
      <PageHeader
        eyebrow="Financial record"
        title="Foundation giving"
        description="Published figures"
      />
    );
    expect(screen.queryByText('As of April 10, 2026')).not.toBeInTheDocument();
  });
});
