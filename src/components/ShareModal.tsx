import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from 'react-share';

interface ShareableContent {
  title: string;
  description: string;
  date: string;
  venue: string;
  shareableLink: string;
  time?: string; // Optional for projects
  category?: string; // Optional for projects
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ShareableContent | null;
  contentType: 'event' | 'project';
}

const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  content,
  contentType,
}) => {
  const returnFocus = React.useRef<HTMLElement | null>(null);
  const dialogContent = React.useRef<HTMLDivElement | null>(null);
  if (!isOpen || !content) return null;

  const copyToClipboard = async () => {
    const panel = dialogContent.current!;
    try {
      await navigator.clipboard.writeText(content.shareableLink);
      if (!panel.isConnected) return;
      toast.success(
        `${contentType === 'event' ? 'Event' : 'Project'} link copied to clipboard!`
      );
      onClose();
    } catch {
      if (!panel.isConnected) return;
      toast.error('Could not copy the link. Please copy it manually.');
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getShareTitle = () => {
    return contentType === 'event' ? 'Share Event' : 'Share Project';
  };

  const getWhatsappMessage = () => {
    const baseMessage = `${content.title} - ${content.description}`;
    const details = `\n\n📅 ${formatDate(content.date)}${content.time ? `\n⏰ ${content.time}` : ''}\n📍 ${content.venue}`;
    return baseMessage + details;
  };

  const getEmailBody = () => {
    const baseBody = `Hi there!\n\nI'd like to share with you ${contentType === 'event' ? 'this event' : 'this project'}: ${content.title}.\n\n${content.description}\n\nDetails:\n📅 Date: ${formatDate(content.date)}${content.time ? `\n⏰ Time: ${content.time}` : ''}\n📍 Venue: ${content.venue}\n\nFor more information, please visit:`;
    return baseBody;
  };

  const getEmailSubject = () => {
    return `${content.title} - Rotaract Club of Zamboanga City West`;
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        ref={dialogContent}
        aria-modal="true"
        className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md grid-cols-1 gap-0 overflow-y-auto rounded-lg bg-white"
        onOpenAutoFocus={() => {
          returnFocus.current = document.activeElement as HTMLElement;
        }}
        onCloseAutoFocus={event => {
          // Page-owned Share buttons are outside DialogTrigger.
          event.preventDefault();
          returnFocus.current!.focus();
        }}
      >
        <DialogTitle className="mb-4">{getShareTitle()}</DialogTitle>

        <div className="space-y-4">
          <div>
            <DialogDescription className="mb-3 text-sm text-gray-600">
              Share on social media:
            </DialogDescription>
            <div className="grid grid-cols-5 gap-2">
              <FacebookShareButton
                aria-label="Share on Facebook"
                url={content.shareableLink}
                hashtag="#RotaractZamboangaCityWest"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>

              <TwitterShareButton
                aria-label="Share on X"
                url={content.shareableLink}
                title={`${content.title} - ${content.description}`}
                hashtags={[
                  'RotaractZamboangaCityWest',
                  contentType === 'event' ? 'RotaractEvent' : 'RotaractProject',
                  'ServiceAboveSelf',
                ]}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>

              <WhatsappShareButton
                aria-label="Share on WhatsApp"
                url={content.shareableLink}
                title={getWhatsappMessage()}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>

              <TelegramShareButton
                aria-label="Share on Telegram"
                url={content.shareableLink}
                title={`${content.title} - ${content.description}`}
              >
                <TelegramIcon size={40} round />
              </TelegramShareButton>

              <EmailShareButton
                aria-label="Share on Email"
                url={content.shareableLink}
                subject={getEmailSubject()}
                body={getEmailBody()}
              >
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 mb-2">Or copy link:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                aria-label="Link to share"
                value={content.shareableLink}
                readOnly
                className="min-w-0 flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-1"
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
