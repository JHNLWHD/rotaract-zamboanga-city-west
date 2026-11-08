import { act, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderRoute } from '../../test/render';
import Contact from './Contact';

const completeForm = async (
  user: ReturnType<typeof import('@testing-library/user-event').default.setup>
) => {
  await user.type(screen.getByLabelText('Full name'), 'Jamie Cruz');
  await user.type(screen.getByLabelText('Email address'), 'jamie@example.com');
  await user.type(screen.getByLabelText('Subject'), 'Record correction');
  await user.type(
    screen.getByLabelText('Message'),
    'Please review this record.'
  );
};

describe('Contact', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('submits the Netlify form, confirms success, and clears fields', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 200 }));
    const { user } = renderRoute(<Contact />);
    await completeForm(user);
    let dismissToast = () => undefined;
    const setTimeout = window.setTimeout.bind(window);
    vi.spyOn(window, 'setTimeout').mockImplementation(
      (handler: TimerHandler, timeout?: number, ...args: unknown[]) => {
        if (timeout === 5000) {
          dismissToast = handler as () => void;
          return 1;
        }
        return setTimeout(handler, timeout, ...args);
      }
    );

    await user.click(screen.getByRole('button', { name: 'Send message' }));

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent('Message sent')
    );
    expect(fetch).toHaveBeenCalledWith(
      '/',
      expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('name=Jamie+Cruz'),
      })
    );
    expect(screen.getByLabelText('Full name')).toHaveValue('');

    act(() => dismissToast());
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('offers the club email when submission fails', async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 500 }));
    const { user } = renderRoute(<Contact />);
    await completeForm(user);

    await user.click(screen.getByRole('button', { name: 'Send message' }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Message could not be sent'
      )
    );
    expect(
      screen.getByRole('link', { name: 'raczambowest1@gmail.com' })
    ).toHaveAttribute('href', 'mailto:raczambowest1@gmail.com');
    await user.click(
      screen.getByRole('button', { name: 'Close notification' })
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
