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
import { Event } from '../data/events';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(event.shareableLink);
    toast.success('Event link copied to clipboard!');
    onClose();
  };

  const formatEventDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Share Event</h3>
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
                url={event.shareableLink}
                hashtag="#RotaractZamboangaCityWest"
              >
                <FacebookIcon size={40} round />
              </FacebookShareButton>
              
              <TwitterShareButton
                url={event.shareableLink}
                title={`${event.title} - ${event.description}`}
                hashtags={['RotaractZamboangaCityWest', 'RotaractEvent', 'ServiceAboveSelf']}
              >
                <TwitterIcon size={40} round />
              </TwitterShareButton>
              
              <WhatsappShareButton
                url={event.shareableLink}
                title={`${event.title} - ${event.description}\n\n📅 ${formatEventDate(event.date)}\n⏰ ${event.time}\n📍 ${event.venue}`}
              >
                <WhatsappIcon size={40} round />
              </WhatsappShareButton>
              
              <TelegramShareButton
                url={event.shareableLink}
                title={`${event.title} - ${event.description}`}
              >
                <TelegramIcon size={40} round />
              </TelegramShareButton>
              
              <EmailShareButton
                url={event.shareableLink}
                subject={`${event.title} - Rotaract Club of Zamboanga City West`}
                body={`Hi there!\n\nI'd like to invite you to join us for ${event.title}.\n\n${event.description}\n\nEvent Details:\n📅 Date: ${formatEventDate(event.date)}\n⏰ Time: ${event.time}\n📍 Venue: ${event.venue}\n\nFor more information and registration, please visit:`}
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
                value={event.shareableLink}
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