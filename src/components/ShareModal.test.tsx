import type { ReactNode } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ShareModal from './ShareModal';

const toastSuccess = vi.hoisted(() => vi.fn());
vi.mock('sonner', () => ({ toast: { success: toastSuccess } }));
vi.mock('react-share', () => {
  const button =
    (name: string) =>
    ({
      children,
      title,
      body,
      hashtags,
    }: {
      children: ReactNode;
      title?: string;
      body?: string;
      hashtags?: string[];
    }) => (
      <button
        type="button"
        aria-label={name}
        data-title={title}
        data-body={body}
        data-hashtags={hashtags?.join(',')}
      >
        {children}
      </button>
    );
  const icon = (name: string) => () => <span>{name}</span>;
  return {
    FacebookShareButton: button('Facebook share'),
    TwitterShareButton: button('Twitter share'),
    WhatsappShareButton: button('WhatsApp share'),
    TelegramShareButton: button('Telegram share'),
    EmailShareButton: button('Email share'),
    FacebookIcon: icon('Facebook'),
    TwitterIcon: icon('Twitter'),
    WhatsappIcon: icon('WhatsApp'),
    TelegramIcon: icon('Telegram'),
    EmailIcon: icon('Email'),
  };
});

const event = {
  title: 'Service Day',
  description: 'A community activity',
  date: '2026-08-20',
  time: '9:00 AM',
  venue: 'Zamboanga City',
  shareableLink: 'https://rotaract.test/events/service-day',
};

describe('ShareModal', () => {
  beforeEach(() => {
    toastSuccess.mockReset();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn() },
    });
  });

  it('renders nothing until it has both an open state and content', () => {
    const onClose = vi.fn();
    const first = render(
      <ShareModal
        isOpen={false}
        onClose={onClose}
        content={event}
        contentType="event"
      />
    );
    expect(first.container).toBeEmptyDOMElement();
    first.rerender(
      <ShareModal isOpen onClose={onClose} content={null} contentType="event" />
    );
    expect(first.container).toBeEmptyDOMElement();
  });

  it('builds event share messages and copies the canonical link', async () => {
    const onClose = vi.fn();
    render(
      <ShareModal
        isOpen
        onClose={onClose}
        content={event}
        contentType="event"
      />
    );

    expect(screen.getByText('Share Event')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Twitter share' })
    ).toHaveAttribute(
      'data-hashtags',
      'RotaractZamboangaCityWest,RotaractEvent,ServiceAboveSelf'
    );
    expect(
      screen.getByRole('button', { name: 'WhatsApp share' })
    ).toHaveAttribute('data-title', expect.stringContaining('⏰ 9:00 AM'));
    expect(screen.getByRole('button', { name: 'Email share' })).toHaveAttribute(
      'data-body',
      expect.stringContaining('this event')
    );

    await userEvent.click(screen.getByRole('button', { name: /Copy/ }));

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      event.shareableLink
    );
    expect(toastSuccess).toHaveBeenCalledWith(
      'Event link copied to clipboard!'
    );
    expect(onClose).toHaveBeenCalled();
  });

  it('builds project messages and only closes from the backdrop', () => {
    const onClose = vi.fn();
    const project = { ...event, time: undefined };
    const { container } = render(
      <ShareModal
        isOpen
        onClose={onClose}
        content={project}
        contentType="project"
      />
    );

    expect(screen.getByText('Share Project')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Twitter share' })
    ).toHaveAttribute(
      'data-hashtags',
      'RotaractZamboangaCityWest,RotaractProject,ServiceAboveSelf'
    );
    expect(
      screen.getByRole('button', { name: 'WhatsApp share' })
    ).not.toHaveAttribute('data-title', expect.stringContaining('⏰'));
    expect(screen.getByRole('button', { name: 'Email share' })).toHaveAttribute(
      'data-body',
      expect.stringContaining('this project')
    );

    const panel = screen.getByText('Share Project').closest('.bg-white')!;
    fireEvent.click(panel);
    expect(onClose).not.toHaveBeenCalled();
    fireEvent.click(container.firstElementChild!);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('copies a project link with project-specific confirmation', async () => {
    const onClose = vi.fn();
    render(
      <ShareModal
        isOpen
        onClose={onClose}
        content={{ ...event, time: undefined }}
        contentType="project"
      />
    );

    await userEvent.click(screen.getByRole('button', { name: /Copy/ }));

    expect(toastSuccess).toHaveBeenCalledWith(
      'Project link copied to clipboard!'
    );
    expect(onClose).toHaveBeenCalledOnce();
  });
});
