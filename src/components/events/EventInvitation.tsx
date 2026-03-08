import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, ImageIcon, Calendar } from 'lucide-react';
import { type Event } from '../../hooks/events/fetchEvents';

type EventInvitationProps = {
  event: Event;
  onDownload: () => void;
};

const EventInvitation: React.FC<EventInvitationProps> = ({
  event,
  onDownload,
}) => {
  return (
    <section className="px-6">
      <div className="max-w-4xl mx-auto">
        {event.invitationImage ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Event Invitation</span>
                {event.status !== 'past' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDownload}
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-auto max-w-md mx-auto bg-gradient-to-br from-cranberry-100 to-cranberry-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={event.invitationImage}
                  alt={`${event.title} invitation`}
                  className="w-full h-full object-cover"
                  onError={e => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden flex flex-col items-center justify-center text-cranberry-600">
                  <ImageIcon className="w-16 h-16 mb-2" />
                  <span className="text-sm">Invitation Image</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="aspect-video bg-gradient-to-br from-cranberry-100 to-cranberry-200 rounded-lg flex items-center justify-center mb-8">
            <Calendar className="w-24 h-24 text-cranberry-500" />
          </div>
        )}
      </div>
    </section>
  );
};

export default EventInvitation;
