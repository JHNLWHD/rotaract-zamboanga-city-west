import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Copy } from 'lucide-react';
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
  EmailIcon
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

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, content, contentType }) => {
  if (!isOpen || !content) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content.shareableLink);
    toast.success(`${contentType === 'event' ? 'Event' : 'Project'} link copied to clipboard!`);
    onClose();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
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
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{getShareTitle()}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-3">Share on social media:</p>
            <div className="grid grid-cols-5 gap-3">
              <FacebookShareButton
                url={content.shareableLink}
                hashtag="#RotaractZamboangaCityWest"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              
              <TwitterShareButton
                url={content.shareableLink}
                title={`${content.title} - ${content.description}`}
                hashtags={['RotaractZamboangaCityWest', contentType === 'event' ? 'RotaractEvent' : 'RotaractProject', 'ServiceAboveSelf']}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              
              <WhatsappShareButton
                url={content.shareableLink}
                title={getWhatsappMessage()}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              
              <TelegramShareButton
                url={content.shareableLink}
                title={`${content.title} - ${content.description}`}
              >
                <TelegramIcon size={40} round />
              </TelegramShareButton>
              
              <EmailShareButton
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
                value={content.shareableLink}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
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
      </div>
    </div>
  );
};

export default ShareModal; 