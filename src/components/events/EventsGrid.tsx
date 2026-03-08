import React from 'react';
import { Calendar } from 'lucide-react';
import EventCard from './EventCard';
import EmptyState from '../ui/EmptyState';
import { type Event } from '../../hooks/events/fetchEvents';

type EventsGridProps = {
  events: Event[] | undefined;
  onShareEvent: (event: Event) => void;
};

const EventsGrid: React.FC<EventsGridProps> = ({ events, onShareEvent }) => {
  if (!events || events.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No Events Scheduled"
        description="We're planning exciting events and activities for our Great West community. Stay tuned for upcoming fellowship meetings, training sessions, and community service events!"
        actionText="Follow us on social media to be the first to know about new events"
      />
    );
  }

  return (
    <div
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      role="list"
      aria-label="List of club events"
    >
      {events.map(event => (
        <EventCard key={event.id} event={event} onShare={onShareEvent} />
      ))}
    </div>
  );
};

export default EventsGrid;
