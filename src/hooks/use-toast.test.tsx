import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { reducer, toast, useToast } from './use-toast';

const first = { id: '101', title: 'First', open: true };
const second = { id: '102', title: 'Second', open: true };

describe('toast state', () => {
  afterEach(() => vi.useRealTimers());

  it('adds, updates, dismisses, and removes toast records', () => {
    vi.useFakeTimers();
    expect(
      reducer({ toasts: [first] }, { type: 'ADD_TOAST', toast: second })
    ).toEqual({
      toasts: [second],
    });
    expect(
      reducer(
        { toasts: [first, second] },
        { type: 'UPDATE_TOAST', toast: { id: '101', title: 'Updated' } }
      )
    ).toEqual({ toasts: [{ ...first, title: 'Updated' }, second] });
    expect(
      reducer(
        { toasts: [first, second] },
        { type: 'DISMISS_TOAST', toastId: '101' }
      )
    ).toEqual({ toasts: [{ ...first, open: false }, second] });
    expect(
      reducer(
        { toasts: [first, second] },
        { type: 'REMOVE_TOAST', toastId: '101' }
      )
    ).toEqual({
      toasts: [second],
    });
    expect(reducer({ toasts: [first] }, { type: 'REMOVE_TOAST' })).toEqual({
      toasts: [],
    });
  });

  it('publishes toast controls to mounted listeners', () => {
    vi.useFakeTimers();
    const hook = renderHook(() => useToast());
    let controls: ReturnType<typeof toast>;

    act(() => {
      controls = toast({ title: 'Saved' });
    });
    expect(hook.result.current.toasts[0]).toEqual(
      expect.objectContaining({ title: 'Saved', open: true })
    );

    act(() => controls.update({ id: controls.id, title: 'Updated' }));
    expect(hook.result.current.toasts[0]).toEqual(
      expect.objectContaining({ title: 'Updated' })
    );

    act(() => hook.result.current.toasts[0].onOpenChange?.(false));
    expect(hook.result.current.toasts[0].open).toBe(false);

    act(() => {
      hook.result.current.dismiss();
      vi.runAllTimers();
    });
    expect(hook.result.current.toasts).toEqual([]);
  });
});
