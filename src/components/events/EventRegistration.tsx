import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { type Event } from '../../hooks/events/fetchEvents';

type EventRegistrationProps = {
  event: Event;
};

const EventRegistration: React.FC<EventRegistrationProps> = ({ event }) => {
  if (event.status === 'past' || !event.registrationUrl) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button
        size="lg"
        className="bg-cranberry-600 hover:bg-cranberry-700 mb-8"
        onClick={() => window.open(event.registrationUrl, '_blank')}
      >
        <ExternalLink className="w-5 h-5 mr-2" />
        Register for this Event
      </Button>
    </div>
  );
};

export default EventRegistration;
