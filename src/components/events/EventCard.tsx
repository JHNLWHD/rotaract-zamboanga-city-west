import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, ExternalLink, Share2 } from 'lucide-react';
import EventStatusBadge from './EventStatusBadge';
import { type Event } from '../../hooks/events/fetchEvents';

type EventCardProps = {
  event: Event;
  onShare: (event: Event) => void;
};

const EventCard: React.FC<EventCardProps> = ({ event, onShare }) => {
  const navigate = useNavigate();

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      role="listitem"
    >
      <div
        className="aspect-square bg-gradient-to-br from-cranberry-100 to-cranberry-200 flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={event.invitationImage || '/placeholder.svg'}
          alt={`${event.title} invitation`}
          className="w-full h-full object-cover"
          onError={e => {
            const target = e.target as HTMLImageElement;
            if (target.src !== window.location.origin + '/placeholder.svg') {
              target.src = '/placeholder.svg';
            }
          }}
        />
      </div>

      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-start justify-between mb-2">
          <div className="flex gap-2" role="group" aria-label="Event badges">
            <EventStatusBadge status={event.status} />
            <Badge className="bg-gray-100 text-gray-700 border-gray-200">
              {event.category}
            </Badge>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onShare(event)}
            className="flex items-center gap-2"
            aria-label={`Share ${event.title} event`}
          >
            <Share2 className="w-4 h-4" aria-hidden="true" />
            Share
          </Button>
        </div>
        <CardTitle className="text-xl mb-2 min-h-[3.5rem] flex items-start">
          <h3>{event.title}</h3>
        </CardTitle>
        <p className="text-gray-600 text-sm line-clamp-3">
          {event.description}
        </p>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col flex-grow">
        <div
          className="space-y-3 mb-4 flex-grow"
          role="group"
          aria-label="Event details"
        >
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" aria-hidden="true" />
            <span
              aria-label={`Event date: ${new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
            >
              {new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" aria-hidden="true" />
            <span aria-label={`Event time: ${event.time}`}>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" aria-hidden="true" />
            <span aria-label={`Event venue: ${event.venue}`}>
              {event.venue}
            </span>
          </div>
        </div>

        <div className="space-y-2 mt-auto">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/events/${event.date}/${event.slug}`)}
            aria-label={`View detailed information about ${event.title}`}
          >
            View Event Details
          </Button>
          {event.status !== 'past' && event.registrationUrl && (
            <Button
              className="w-full bg-cranberry-600 hover:bg-cranberry-700"
              onClick={() => window.open(event.registrationUrl, '_blank')}
              aria-label={`Register for ${event.title}`}
            >
              <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
              Register Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
