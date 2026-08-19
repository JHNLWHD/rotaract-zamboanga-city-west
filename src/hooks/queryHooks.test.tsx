import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
  fetchProjectBySlug,
  fetchEventBySlug,
  fetchAllOfficers,
  fetchPastPresidents,
  fetchFoundationGiving,
} = vi.hoisted(() => ({
  fetchProjectBySlug: vi.fn(),
  fetchEventBySlug: vi.fn(),
  fetchAllOfficers: vi.fn(),
  fetchPastPresidents: vi.fn(),
  fetchFoundationGiving: vi.fn(),
}));
vi.mock('./projects/fetchProjects', () => ({ fetchProjectBySlug }));
vi.mock('./events/fetchEvents', () => ({ fetchEventBySlug }));
vi.mock('./officers/fetchOfficers', () => ({
  fetchAllOfficers,
  fetchPastPresidents,
}));
vi.mock('./foundationGiving/fetchFoundationGiving', () => ({
  fetchFoundationGiving,
}));

import { useEventBySlug } from './events/useEventBySlug';
import { useFoundationGiving } from './foundationGiving/useFoundationGiving';
import { useIsMobile } from './use-mobile';
import { useOfficers, usePastPresidents } from './officers/useOfficers';
import { useProjectBySlug } from './projects/useProjectBySlug';

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider
    client={
      new QueryClient({
        defaultOptions: { queries: { retryDelay: 0, gcTime: Infinity } },
      })
    }
  >
    {children}
  </QueryClientProvider>
);

describe('React Query hooks', () => {
  beforeEach(() => {
    fetchProjectBySlug.mockReset();
    fetchEventBySlug.mockReset();
    fetchAllOfficers.mockReset();
    fetchPastPresidents.mockReset();
    fetchFoundationGiving.mockReset();
  });

  it('loads project and event details by slug', async () => {
    fetchProjectBySlug.mockResolvedValue({ id: 'project-1' });
    fetchEventBySlug.mockResolvedValue({ id: 'event-1' });
    const project = renderHook(() => useProjectBySlug('project-1'), {
      wrapper,
    });
    const event = renderHook(() => useEventBySlug('event-1'), { wrapper });

    await waitFor(() => expect(project.result.current.isSuccess).toBe(true));
    await waitFor(() => expect(event.result.current.isSuccess).toBe(true));
    expect(fetchProjectBySlug).toHaveBeenCalledWith('project-1');
    expect(fetchEventBySlug).toHaveBeenCalledWith('event-1');
  });

  it('turns missing detail records into query errors', async () => {
    fetchProjectBySlug.mockResolvedValue(null);
    fetchEventBySlug.mockResolvedValue(null);
    const project = renderHook(() => useProjectBySlug('missing-project'), {
      wrapper,
    });
    const event = renderHook(() => useEventBySlug('missing-event'), {
      wrapper,
    });

    await waitFor(() =>
      expect(project.result.current.error).toEqual(
        new Error('Project not found')
      )
    );
    await waitFor(() =>
      expect(event.result.current.error).toEqual(new Error('Event not found'))
    );
    expect(fetchProjectBySlug).toHaveBeenCalledTimes(2);
    expect(fetchEventBySlug).toHaveBeenCalledTimes(2);
  });

  it('keeps missing slugs idle and rejects manual refetches', async () => {
    const project = renderHook(() => useProjectBySlug(undefined), { wrapper });
    const event = renderHook(() => useEventBySlug(undefined), { wrapper });
    expect(project.result.current.fetchStatus).toBe('idle');
    expect(event.result.current.fetchStatus).toBe('idle');
    expect(fetchProjectBySlug).not.toHaveBeenCalled();
    expect(fetchEventBySlug).not.toHaveBeenCalled();

    await act(async () => {
      await Promise.all([
        project.result.current.refetch(),
        event.result.current.refetch(),
      ]);
    });

    expect(project.result.current.error).toEqual(new Error('Slug is required'));
    expect(event.result.current.error).toEqual(new Error('Slug is required'));
    expect(fetchProjectBySlug).not.toHaveBeenCalled();
    expect(fetchEventBySlug).not.toHaveBeenCalled();
  });

  it('loads grouped officers, presidents, and foundation giving', async () => {
    fetchAllOfficers.mockResolvedValue({
      executive: [],
      directors: [],
      advisors: [],
    });
    fetchPastPresidents.mockResolvedValue([]);
    fetchFoundationGiving.mockResolvedValue({ rows: [] });
    const officers = renderHook(
      () => ({
        officers: useOfficers('2026-2027'),
        presidents: usePastPresidents(),
      }),
      { wrapper }
    );
    const foundation = renderHook(() => useFoundationGiving(), { wrapper });

    await waitFor(() =>
      expect(officers.result.current.officers.isSuccess).toBe(true)
    );
    await waitFor(() =>
      expect(officers.result.current.presidents.isSuccess).toBe(true)
    );
    await waitFor(() => expect(foundation.result.current.isSuccess).toBe(true));
    expect(fetchAllOfficers).toHaveBeenCalledWith('2026-2027');
    expect(fetchPastPresidents).toHaveBeenCalled();
    expect(fetchFoundationGiving).toHaveBeenCalled();
  });
});

describe('useIsMobile', () => {
  it('tracks the native media-query change event', () => {
    let onChange = () => undefined;
    const removeEventListener = vi.fn();
    vi.spyOn(window, 'matchMedia').mockReturnValue({
      matches: false,
      media: '(max-width: 767px)',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((_event, listener) => {
        onChange = listener as () => void;
      }),
      removeEventListener,
      dispatchEvent: vi.fn(),
    });
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      writable: true,
      value: 1024,
    });
    const hook = renderHook(() => useIsMobile());
    expect(hook.result.current).toBe(false);

    act(() => {
      window.innerWidth = 600;
      onChange();
    });
    expect(hook.result.current).toBe(true);

    hook.unmount();
    expect(removeEventListener).toHaveBeenCalledWith('change', onChange);
  });
});
