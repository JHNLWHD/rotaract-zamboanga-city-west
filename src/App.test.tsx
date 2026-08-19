import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('@/components/ui/toaster', () => ({ Toaster: () => null }));
vi.mock('@/components/ui/sonner', () => ({ Toaster: () => null }));
vi.mock('@/components/ui/tooltip', () => ({
  TooltipProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('./pages/Index', () => ({ default: () => <h1>Home page</h1> }));
vi.mock('./pages/Projects', () => ({
  default: () => <h1>Projects page</h1>,
}));
vi.mock('./pages/ProjectDetail', () => ({
  default: () => <h1>Project detail page</h1>,
}));
vi.mock('./pages/Officers', () => ({
  default: () => <h1>Officers page</h1>,
}));
vi.mock('./pages/Events', () => ({ default: () => <h1>Events page</h1> }));
vi.mock('./pages/EventDetail', () => ({
  default: () => <h1>Event detail page</h1>,
}));
vi.mock('./pages/FoundationGiving', () => ({
  default: () => <h1>Foundation page</h1>,
}));
vi.mock('./pages/Recognition', () => ({
  default: () => <h1>Recognition page</h1>,
}));
vi.mock('./pages/NotFound', () => ({
  default: () => <h1>Not found page</h1>,
}));

describe('App routes', () => {
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
    vi.mocked(window.scrollTo).mockClear();
  });

  it.each([
    ['/', 'Home page'],
    ['/projects', 'Projects page'],
    ['/projects/sample-project', 'Project detail page'],
    ['/officers', 'Officers page'],
    ['/events', 'Events page'],
    ['/events/2026-08-19/sample-event', 'Event detail page'],
    ['/foundation-giving', 'Foundation page'],
    ['/recognition', 'Recognition page'],
    ['/missing', 'Not found page'],
  ])('renders %s', (path, heading) => {
    window.history.replaceState({}, '', path);

    render(<App />);

    expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
