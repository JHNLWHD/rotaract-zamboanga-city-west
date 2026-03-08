import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Share2 } from 'lucide-react';
import { type Event } from '../../hooks/events/fetchEvents';
import EventStatusBadge from './EventStatusBadge';

type EventDetailHeaderProps = {
  event: Event;
  onShare: () => void;
};

const EventDetailHeader: React.FC<EventDetailHeaderProps> = ({
  event,
  onShare,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'fellowship':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'training':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'meeting':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'social':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'service':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'special':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
        <div className="flex gap-3">
          <EventStatusBadge status={event.status} />
          <Badge className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onShare}
          className="flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          Share Event
        </Button>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {event.title}
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-3 text-cranberry-500" />
          <div>
            <div className="font-medium">
              {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <Clock className="w-5 h-5 mr-3 text-cranberry-500" />
          <div>
            <div className="font-medium">{event.time}</div>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-3 text-cranberry-500" />
          <div>
            <div className="font-medium">{event.venue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailHeader;
