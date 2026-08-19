import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../test/render';
import Index from './Index';

vi.mock('../components/layout/Navbar', () => ({
  default: () => <nav>Navigation</nav>,
}));
vi.mock('../components/layout/Footer', () => ({
  default: () => <footer>Footer</footer>,
}));
vi.mock('../components/home/Hero', () => ({
  default: () => <section>Hero</section>,
}));
vi.mock('../components/home/Credentials', () => ({
  default: () => <section>Credentials</section>,
}));
vi.mock('../components/home/About', () => ({
  default: () => <section>About</section>,
}));
vi.mock('../components/home/Contact', () => ({
  default: () => <section>Contact</section>,
}));
vi.mock('../components/home/Join', () => ({
  default: () => <section>Join</section>,
}));

describe('Index', () => {
  it('composes the official club record and its SEO title', async () => {
    renderRoute(<Index />);

    expect(screen.getByRole('main')).toHaveTextContent(
      'HeroCredentialsAboutContactJoin'
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    await waitFor(() =>
      expect(document.title).toBe(
        'Rotaract Club of Zamboanga City West | Official Club Record'
      )
    );
  });
});
