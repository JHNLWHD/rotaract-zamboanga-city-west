import React from 'react';
import EventCard from './EventCard';
import { type Event } from '../../hooks/events/fetchEvents';

type EventsGridProps = {
  events: Event[] | undefined;
  onShareEvent: (event: Event) => void;
};

const EventsGrid: React.FC<EventsGridProps> = ({ events, onShareEvent }) => {
  if (!events?.length) return null;

  return (
    <div role="list" aria-label="Club event records">
      {events.map(event => (
        <EventCard key={event.id} event={event} onShare={onShareEvent} />
      ))}
    </div>
  );
};

export default EventsGrid;
