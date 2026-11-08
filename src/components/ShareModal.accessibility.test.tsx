import { useState } from 'react';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { toast } from 'sonner';
import ShareModal from './ShareModal';

const ShareFlow = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Share record
      </button>
      <ShareModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        content={{
          title: 'Service Day',
          description: 'A community activity',
          date: '2026-08-20',
          venue: 'Zamboanga City',
          shareableLink: 'https://rotaract.test/events/service-day',
        }}
        contentType="event"
      />
    </>
  );
};

describe('Share dialog accessibility', () => {
  it('names real controls, contains keyboard focus and returns it after Escape', async () => {
    const user = userEvent.setup();
    render(<ShareFlow />);
    const opener = screen.getByRole('button', { name: 'Share record' });
    await user.tab();
    expect(opener).toHaveFocus();
    await user.keyboard('{Enter}');

    const dialog = screen.getByRole('dialog', { name: 'Share Event' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    const facebook = within(dialog).getByRole('button', {
      name: 'Share on Facebook',
    });
    for (const name of ['X', 'WhatsApp', 'Telegram', 'Email']) {
      expect(
        within(dialog).getByRole('button', { name: `Share on ${name}` })
      ).toBeInTheDocument();
    }
    expect(
      within(dialog).getByRole('textbox', { name: 'Link to share' })
    ).toHaveValue('https://rotaract.test/events/service-day');
    expect(facebook).toHaveFocus();

    const close = within(dialog).getByRole('button', {
      name: 'Close',
    });
    close.focus();
    await user.tab();
    expect(facebook).toHaveFocus();
    await user.tab({ shift: true });
    expect(close).toHaveFocus();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
    await waitFor(() => expect(opener).toHaveFocus());
  });

  it.each([true, false])(
    'ignores a settled write from a closed dialog (success: %s)',
    async succeeds => {
      const user = userEvent.setup();
      const toastError = vi.spyOn(toast, 'error').mockReturnValue(0);
      let finishCopy!: () => void;
      vi.spyOn(navigator.clipboard, 'writeText').mockReturnValueOnce(
        new Promise<void>((resolve, reject) => {
          finishCopy = () =>
            succeeds ? resolve() : reject(new Error('Clipboard access denied'));
        })
      );
      render(<ShareFlow />);
      const opener = screen.getByRole('button', { name: 'Share record' });
      await user.click(opener);
      await user.click(screen.getByRole('button', { name: 'Copy' }));
      await user.click(screen.getByRole('button', { name: 'Close' }));
      await waitFor(() => expect(opener).toHaveFocus());
      await user.click(opener);
      await act(async () => finishCopy());
      expect(
        screen.getByRole('dialog', { name: 'Share Event' })
      ).toBeInTheDocument();
      expect(toastError).not.toHaveBeenCalled();
    }
  );
});
