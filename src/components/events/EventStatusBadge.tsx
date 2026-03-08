import React from 'react';
import { Badge } from '@/components/ui/badge';

type EventStatusBadgeProps = {
  status: string;
};

const EventStatusBadge: React.FC<EventStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'upcoming':
      return (
        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
          Upcoming
        </Badge>
      );
    case 'registration_open':
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          Registration Open
        </Badge>
      );
    case 'past':
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          Past Event
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-700 border-gray-200">
          Event
        </Badge>
      );
  }
};

export default EventStatusBadge;
