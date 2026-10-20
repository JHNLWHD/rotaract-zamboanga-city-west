// @vitest-environment-options {"url":"http://localhost/"}
import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../../test/render';
import Contact from './Contact';

describe('Contact local preview', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => vi.useRealTimers());

  it('simulates a successful submission without a network request', async () => {
    const { container } = renderRoute(<Contact />);
    fireEvent.change(screen.getByLabelText('Full name'), {
      target: { value: 'Jamie Cruz' },
    });
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'jamie@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Subject'), {
      target: { value: 'Preview' },
    });
    fireEvent.change(screen.getByLabelText('Message'), {
      target: { value: 'Local form check' },
    });
    fireEvent.submit(container.querySelector('form')!);

    expect(screen.getByRole('button', { name: 'Sending…' })).toBeDisabled();
    await act(async () => vi.advanceTimersByTimeAsync(400));

    expect(screen.getByRole('status')).toHaveTextContent('Message sent');
    expect(fetch).not.toHaveBeenCalled();
  });
});
